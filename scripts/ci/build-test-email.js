/**
 * Turns Playwright's JSON report into an email message that can be piped straight into curl's
 * SMTP support, so CI needs no third-party mail action.
 *
 * Reads:  test-results/results.json (the json reporter's output - see playwright.config.js)
 * Writes: test-results/email.txt    (RFC 5322 message: headers + HTML body)
 *
 * Environment (all optional except the addresses, which CI supplies from repo secrets):
 *   MAIL_FROM, MAIL_TO - sender/recipient
 *   RUN_URL, BRANCH, COMMIT, REPO - run metadata shown at the top of the email
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

const RESULTS_FILE = 'test-results/results.json';
const EMAIL_FILE = 'test-results/email.txt';

const env = (name, fallback = '') => process.env[name] || fallback;

const escapeHtml = (value) =>
    String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

/** Playwright nests suites arbitrarily deep; flatten to one entry per test case. */
function collectSpecs(suite, file = suite.file) {
    const specs = (suite.specs || []).map((spec) => {
        // with retries on, the last result is the one that decided the outcome
        const results = (spec.tests || []).flatMap((test) => test.results || []);
        const last = results[results.length - 1] || {};
        return {
            title: spec.title,
            file: spec.file || file,
            line: spec.line,
            ok: spec.ok,
            status: last.status || 'unknown',
            attempts: results.length,
            durationMs: results.reduce((total, result) => total + (result.duration || 0), 0),
            error: (last.error && last.error.message) || '',
        };
    });

    const nested = (suite.suites || []).flatMap((child) => collectSpecs(child, child.file || file));
    return [...specs, ...nested];
}

function statusOf(spec) {
    if (spec.status === 'skipped') return { label: 'skipped', mark: '–', colour: '#6b7280' };
    if (spec.ok) {
        // passed, but not on the first attempt
        return spec.attempts > 1
            ? { label: 'flaky', mark: '!', colour: '#b45309' }
            : { label: 'passed', mark: '✓', colour: '#15803d' };
    }
    return { label: 'failed', mark: '✗', colour: '#b91c1c' };
}

function buildHtml(specs, meta) {
    const counts = specs.reduce((totals, spec) => {
        const { label } = statusOf(spec);
        totals[label] = (totals[label] || 0) + 1;
        return totals;
    }, {});

    const failed = specs.filter((spec) => !spec.ok && spec.status !== 'skipped');
    const headline = failed.length ? `${failed.length} failed` : 'All tests passed';

    const rows = specs
        .map((spec) => {
            const { mark, label, colour } = statusOf(spec);
            const seconds = (spec.durationMs / 1000).toFixed(1);
            const retried = spec.attempts > 1 ? ` (${spec.attempts} attempts)` : '';
            return `
        <tr>
          <td style="padding:6px 10px;border-bottom:1px solid #e5e7eb;color:${colour};font-weight:600;white-space:nowrap">${mark} ${label}</td>
          <td style="padding:6px 10px;border-bottom:1px solid #e5e7eb">${escapeHtml(spec.title)}<br>
              <span style="color:#6b7280;font-size:12px">${escapeHtml(spec.file || '')}${spec.line ? ':' + spec.line : ''}</span></td>
          <td style="padding:6px 10px;border-bottom:1px solid #e5e7eb;color:#6b7280;white-space:nowrap">${seconds}s${retried}</td>
        </tr>`;
        })
        .join('');

    const failureDetail = failed.length
        ? `<h3 style="margin:24px 0 8px">Failures</h3>` +
          failed
              .map(
                  (spec) => `
        <p style="margin:0 0 4px"><strong>${escapeHtml(spec.title)}</strong></p>
        <pre style="background:#f3f4f6;padding:10px;border-radius:6px;overflow-x:auto;font-size:12px;white-space:pre-wrap">${escapeHtml(
            spec.error.slice(0, 2000),
        )}</pre>`,
              )
              .join('')
        : '';

    const summaryLine = Object.entries(counts)
        .map(([label, count]) => `${count} ${label}`)
        .join(' · ');

    return `<!doctype html>
<html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#111827;line-height:1.45">
  <h2 style="margin:0 0 4px">${escapeHtml(headline)}</h2>
  <p style="margin:0 0 16px;color:#6b7280">${escapeHtml(summaryLine)}</p>
  <p style="margin:0 0 16px;font-size:13px">
    ${meta.repo ? `Repo: ${escapeHtml(meta.repo)}<br>` : ''}
    ${meta.branch ? `Branch: ${escapeHtml(meta.branch)}<br>` : ''}
    ${meta.commit ? `Commit: ${escapeHtml(meta.commit.slice(0, 8))}<br>` : ''}
    ${meta.runUrl ? `<a href="${escapeHtml(meta.runUrl)}">Open the run in GitHub Actions</a>` : ''}
  </p>
  <table style="border-collapse:collapse;width:100%;font-size:14px">
    <thead><tr>
      <th align="left" style="padding:6px 10px;border-bottom:2px solid #d1d5db">Result</th>
      <th align="left" style="padding:6px 10px;border-bottom:2px solid #d1d5db">Test</th>
      <th align="left" style="padding:6px 10px;border-bottom:2px solid #d1d5db">Time</th>
    </tr></thead>
    <tbody>${rows}</tbody>
  </table>
  ${failureDetail}
  <p style="margin-top:24px;color:#6b7280;font-size:12px">
    The full HTML report, with traces and screenshots, is attached to the run as the
    <code>playwright-report</code> artifact.
  </p>
</body></html>`;
}

function main() {
    let report;
    try {
        report = JSON.parse(readFileSync(RESULTS_FILE, 'utf8'));
    } catch (error) {
        console.error(`Could not read ${RESULTS_FILE}: ${error.message}`);
        process.exit(1);
    }

    const specs = (report.suites || []).flatMap((suite) => collectSpecs(suite));
    if (specs.length === 0) {
        console.error('No tests found in the report - not building an email.');
        process.exit(1);
    }

    const counts = specs.reduce((totals, spec) => {
        const { label } = statusOf(spec);
        totals[label] = (totals[label] || 0) + 1;
        return totals;
    }, {});
    const meta = {
        repo: env('REPO'),
        branch: env('BRANCH'),
        commit: env('COMMIT'),
        runUrl: env('RUN_URL'),
    };

    // Flaky is called out separately: a test that only passed on its second attempt is not
    // the same as one that passed, and rolling them together hides the thing worth chasing.
    const tally = ['passed', 'flaky', 'failed', 'skipped']
        .filter((label) => counts[label])
        .map((label) => `${counts[label]} ${label}`)
        .join(', ');
    const subject =
        `[${counts.failed ? 'FAILED' : 'PASSED'}] Playwright: ${tally}` +
        (meta.branch ? ` on ${meta.branch}` : '');

    // Headers and body in one file, ready for `curl --upload-file`. Base64 keeps the ✓/✗ marks
    // intact through SMTP, which is 7-bit by default.
    const html = buildHtml(specs, meta);
    const message = [
        `From: ${env('MAIL_FROM')}`,
        `To: ${env('MAIL_TO')}`,
        `Subject: ${subject}`,
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
        '',
        Buffer.from(html, 'utf8').toString('base64').replace(/(.{76})/g, '$1\r\n'),
        '',
    ].join('\r\n');

    mkdirSync(dirname(EMAIL_FILE), { recursive: true });
    writeFileSync(EMAIL_FILE, message);
    console.log(`${subject}\nWrote ${EMAIL_FILE}`);
}

main();
