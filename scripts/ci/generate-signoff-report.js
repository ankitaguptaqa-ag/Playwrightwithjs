/**
 * Builds a QA sign-off dashboard (HTML) from Playwright's JSON results.
 *
 * Usage:  node scripts/ci/generate-signoff-report.js [path-to-results.json]
 * Output: test-results/sign-off-report.html, plus a summary table appended to
 *         GITHUB_STEP_SUMMARY when running in CI.
 *
 * Environment (optional): BRANCH, COMMIT, TEST_ENV, GITHUB_SERVER_URL,
 * GITHUB_REPOSITORY, GITHUB_RUN_ID - all shown in the dashboard header.
 */

import { readFileSync, writeFileSync, appendFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';

const resultsPath = process.argv[2] || join('test-results', 'results.json');
const outputDir = dirname(resultsPath);
const htmlPath = join(outputDir, 'sign-off-report.html');

if (!existsSync(resultsPath)) {
    console.error(`Results file not found: ${resultsPath}`);
    process.exit(1);
}

const results = JSON.parse(readFileSync(resultsPath, 'utf8'));

const escapeHtml = (value) =>
    String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

function formatDuration(ms) {
    if (!ms) return 'n/a';
    if (ms < 1000) return `${Math.round(ms)}ms`;
    const secs = Math.round(ms / 1000);
    if (secs < 60) return `${secs}s`;
    return `${Math.floor(secs / 60)}m ${secs % 60}s`;
}

/** Playwright nests suites arbitrarily deep, so walk the whole tree rather than a fixed depth. */
function collectSpecs(suite, file = suite.file, trail = []) {
    const groupTrail = trail.filter(Boolean);
    const specs = (suite.specs || []).map((spec) => {
        const attempts = (spec.tests || []).flatMap((test) => test.results || []);
        const last = attempts[attempts.length - 1] || {};
        return {
            file: spec.file || file || 'unknown',
            group: groupTrail.join(' > '),
            test: spec.title,
            ok: spec.ok,
            status: last.status || 'unknown',
            attempts: attempts.length,
            durationMs: attempts.reduce((total, r) => total + (r.duration || 0), 0),
            error: (last.error && last.error.message ? last.error.message.split('\n')[0] : '') || '',
        };
    });
    const nested = (suite.suites || []).flatMap((child) =>
        collectSpecs(child, child.file || file, [...trail, child.title]),
    );
    return [...specs, ...nested];
}

/**
 * A test that only passed on its second attempt is not the same as one that passed, and a
 * skipped test is not a pass either - counting either as "passed" is how a report ends up
 * claiming a clean run that wasn't.
 */
function stateOf(spec) {
    if (spec.status === 'skipped') return 'skipped';
    if (!spec.ok) return 'failed';
    return spec.attempts > 1 ? 'flaky' : 'passed';
}

const allSpecs = (results.suites || []).flatMap((suite) => collectSpecs(suite));
if (allSpecs.length === 0) {
    console.error('No tests found in the report.');
    process.exit(1);
}

allSpecs.forEach((spec) => {
    spec.state = stateOf(spec);
});

const counts = allSpecs.reduce((totals, spec) => {
    totals[spec.state] = (totals[spec.state] || 0) + 1;
    return totals;
}, {});
const passed = counts.passed || 0;
const flaky = counts.flaky || 0;
const failed = counts.failed || 0;
const skipped = counts.skipped || 0;
const total = allSpecs.length;
const executed = total - skipped;
// pass rate is over tests that actually ran; flaky counts as a pass, but is reported separately
const passRate = executed > 0 ? (((passed + flaky) / executed) * 100).toFixed(1) : '0.0';
const duration = formatDuration(
    (results.stats && results.stats.duration) || allSpecs.reduce((t, s) => t + s.durationMs, 0),
);

const byFile = {};
for (const spec of allSpecs) {
    const key = spec.file;
    byFile[key] = byFile[key] || { total: 0, passed: 0, flaky: 0, failed: 0, skipped: 0 };
    byFile[key].total++;
    byFile[key][spec.state]++;
}

const shortName = (file) => file.replace(/\.spec\.js$/, '').replace(/.*[\\/]/, '');

const branch = process.env.BRANCH || process.env.GITHUB_REF_NAME || 'local';
const commit = (process.env.COMMIT || '').slice(0, 8);
const testEnv = process.env.TEST_ENV || 'QA (qa-my.innago.com)';
const now = new Date();
const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
const runUrl =
    process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY && process.env.GITHUB_RUN_ID
        ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
        : '';

// Flaky blocks a clean GO: the suite runs against a shared QA account, and a test that needed
// a retry is exactly the signal that gets ignored until it fails for real.
const verdict = failed > 0 ? (Number(passRate) >= 90 ? 'CONDITIONAL GO' : 'NO-GO') : flaky > 0 ? 'GO WITH NOTES' : 'GO';
const verdictColour = failed > 0 ? (Number(passRate) >= 90 ? '#f59e0b' : '#dc2626') : flaky > 0 ? '#f59e0b' : '#0d9488';
const verdictText =
    failed > 0
        ? `${failed} test(s) failed (${passRate}% pass rate). Review the failures below before sign-off.`
        : flaky > 0
          ? `All tests passed, but ${flaky} needed a retry. Worth a look before sign-off.`
          : 'All tests passed on the first attempt. Cleared for sign-off.';

const badge = (state) => `<span class="badge badge-${state}">${state.toUpperCase()}</span>`;

const failedSpecs = allSpecs.filter((spec) => spec.state === 'failed');
const flakySpecs = allSpecs.filter((spec) => spec.state === 'flaky');

const attentionRows = [...failedSpecs, ...flakySpecs]
    .map(
        (spec, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${badge(spec.state)}</td>
          <td>${escapeHtml(shortName(spec.file))}</td>
          <td>${escapeHtml(spec.test)}</td>
          <td class="error-msg">${escapeHtml((spec.error || (spec.state === 'flaky' ? `passed on attempt ${spec.attempts}` : '')).slice(0, 160))}</td>
        </tr>`,
    )
    .join('');

const allRows = allSpecs
    .map(
        (spec, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${escapeHtml(shortName(spec.file))}</td>
          <td>${escapeHtml(spec.test)}</td>
          <td>${formatDuration(spec.durationMs)}</td>
          <td>${spec.attempts > 1 ? spec.attempts : '1'}</td>
          <td>${badge(spec.state)}</td>
        </tr>`,
    )
    .join('');

const fileBars = Object.entries(byFile)
    .map(([file, c]) => {
        const pct = c.total ? (((c.passed + c.flaky) / c.total) * 100).toFixed(0) : '0';
        const seg = (count, cls, label) =>
            count > 0 ? `<div class="bar-seg ${cls}" style="width:${(count / c.total) * 100}%">${count} ${label}</div>` : '';
        return `
        <div class="file-bar">
          <div class="file-bar-label" title="${escapeHtml(file)}">${escapeHtml(shortName(file))}</div>
          <div class="file-bar-track">
            ${seg(c.passed, 'seg-passed', 'passed')}${seg(c.flaky, 'seg-flaky', 'flaky')}${seg(c.failed, 'seg-failed', 'failed')}${seg(c.skipped, 'seg-skipped', 'skipped')}
          </div>
          <div class="file-bar-pct">${pct}%</div>
        </div>`;
    })
    .join('');

const fileNames = Object.keys(byFile).map(shortName);
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>QA Sign-off Dashboard &mdash; Innago PO Portal</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; background: #f0f4f8; color: #1e293b; }
  .header { background: linear-gradient(135deg, #0d4f4f 0%, #0d9488 100%); color: #fff; padding: 28px 40px; }
  .header h1 { font-size: 26px; font-weight: 700; margin-bottom: 4px; }
  .header .subtitle { font-size: 13px; opacity: 0.85; }
  .header .subtitle span { margin-right: 16px; }
  .accent-bar { height: 4px; background: linear-gradient(90deg, #0d9488, #2dd4bf, #0d9488); }
  .container { max-width: 1200px; margin: 0 auto; padding: 24px 20px 40px; }
  .cards { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; margin-bottom: 28px; }
  .card { background: #fff; border-radius: 10px; padding: 22px 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); border-left: 4px solid #94a3b8; }
  .card.pass { border-left-color: #0d9488; } .card.pass .card-value { color: #0d9488; }
  .card.flaky { border-left-color: #f59e0b; } .card.flaky .card-value { color: #f59e0b; }
  .card.fail { border-left-color: #dc2626; } .card.fail .card-value { color: #dc2626; }
  .card .card-value { font-size: 34px; font-weight: 800; line-height: 1.1; color: #334155; }
  .card .card-label { font-size: 13px; color: #64748b; margin-top: 4px; }
  .verdict { background: #fff; border-radius: 10px; padding: 18px 24px; margin-bottom: 28px; display: flex; align-items: center; gap: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); border-left: 5px solid ${verdictColour}; flex-wrap: wrap; }
  .verdict-badge { font-size: 15px; font-weight: 700; color: #fff; background: ${verdictColour}; padding: 6px 18px; border-radius: 6px; letter-spacing: 0.5px; white-space: nowrap; }
  .verdict-text { font-size: 14px; color: #475569; }
  .section { background: #fff; border-radius: 10px; padding: 24px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
  .section h2 { font-size: 17px; font-weight: 700; color: #0f172a; margin-bottom: 18px; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0; }
  .charts-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
  .chart-box { background: #fff; border-radius: 10px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
  .chart-box h3 { font-size: 15px; font-weight: 700; color: #0f172a; margin-bottom: 14px; text-align: center; }
  .table-scroll { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th { background: #f1f5f9; padding: 10px 12px; text-align: left; font-weight: 600; color: #475569; border-bottom: 2px solid #e2e8f0; white-space: nowrap; }
  td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; vertical-align: top; }
  tr:hover { background: #f8fafc; }
  .error-msg { color: #dc2626; font-size: 12px; max-width: 340px; word-break: break-word; }
  .badge { padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; white-space: nowrap; }
  .badge-passed { background: #dcfce7; color: #166534; }
  .badge-flaky { background: #fef3c7; color: #92400e; }
  .badge-failed { background: #fef2f2; color: #991b1b; }
  .badge-skipped { background: #f1f5f9; color: #475569; }
  .footer { text-align: center; padding: 20px; color: #94a3b8; font-size: 12px; }
  .file-bar { display: flex; align-items: center; margin-bottom: 10px; }
  .file-bar-label { width: 200px; font-size: 13px; font-weight: 500; color: #334155; text-align: right; padding-right: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .file-bar-track { flex: 1; display: flex; height: 28px; border-radius: 4px; overflow: hidden; background: #f1f5f9; }
  .bar-seg { display: flex; align-items: center; justify-content: center; color: #fff; font-size: 12px; font-weight: 600; min-width: 30px; }
  .seg-passed { background: #0d9488; } .seg-flaky { background: #f59e0b; }
  .seg-failed { background: #dc2626; } .seg-skipped { background: #94a3b8; }
  .file-bar-pct { width: 70px; text-align: right; font-size: 13px; font-weight: 600; color: #334155; padding-left: 10px; }
  @media (max-width: 900px) { .cards { grid-template-columns: repeat(2, 1fr); } .charts-row { grid-template-columns: 1fr; } }
</style>
</head>
<body>

<div class="header">
  <h1>QA Sign-off Dashboard &mdash; Innago PO Portal</h1>
  <div class="subtitle">
    <span>Environment: ${escapeHtml(testEnv)}</span>
    <span>Browser: Chromium</span>
    <span>Regression executed via Playwright automation</span>
  </div>
</div>
<div class="accent-bar"></div>

<div class="container">

  <div class="cards">
    <div class="card"><div class="card-value">${total}</div><div class="card-label">Test cases</div></div>
    <div class="card ${Number(passRate) < 100 ? 'flaky' : 'pass'}"><div class="card-value">${passRate}%</div><div class="card-label">Pass rate (of ${executed} run)</div></div>
    <div class="card pass"><div class="card-value">${passed}</div><div class="card-label">Passed first try</div></div>
    <div class="card ${flaky > 0 ? 'flaky' : ''}"><div class="card-value">${flaky}</div><div class="card-label">Flaky (passed on retry)</div></div>
    <div class="card ${failed > 0 ? 'fail' : ''}"><div class="card-value">${failed}</div><div class="card-label">Failed</div></div>
  </div>

  <div class="verdict">
    <span class="verdict-badge">${verdict}</span>
    <span class="verdict-text">
      ${escapeHtml(verdictText)}
      &nbsp;&bull;&nbsp; Branch: <strong>${escapeHtml(branch)}</strong>
      ${commit ? `&nbsp;&bull;&nbsp; Commit: <strong>${escapeHtml(commit)}</strong>` : ''}
      &nbsp;&bull;&nbsp; ${dateStr} at ${timeStr}
      &nbsp;&bull;&nbsp; Duration: ${duration}
      ${runUrl ? `&nbsp;&bull;&nbsp; <a href="${runUrl}" style="color:#0d9488;">View CI run</a>` : ''}
    </span>
  </div>

  <div class="section">
    <h2>Execution Coverage &mdash; Results by Spec File</h2>
    ${fileBars}
  </div>

  <div class="charts-row">
    <div class="chart-box">
      <h3>Result Distribution</h3>
      <canvas id="donutChart" height="220"></canvas>
    </div>
    <div class="chart-box">
      <h3>Results by Spec File</h3>
      <canvas id="barChart" height="220"></canvas>
    </div>
  </div>

  <div class="section">
    <h2>${failed + flaky > 0 ? `Needs Attention &mdash; ${failed} failed, ${flaky} flaky` : 'Needs Attention'}</h2>
    <div class="table-scroll">
      <table>
        <thead><tr><th>#</th><th>State</th><th>Module</th><th>Test</th><th>Detail</th></tr></thead>
        <tbody>${
            attentionRows ||
            '<tr><td colspan="5" style="text-align:center;color:#0d9488;padding:20px;">Nothing to review &mdash; every test passed on its first attempt</td></tr>'
        }</tbody>
      </table>
    </div>
  </div>

  <div class="section">
    <h2>All Test Cases &mdash; ${total} total</h2>
    <div class="table-scroll">
      <table>
        <thead><tr><th>#</th><th>Module</th><th>Test</th><th>Time</th><th>Attempts</th><th>Status</th></tr></thead>
        <tbody>${allRows}</tbody>
      </table>
    </div>
  </div>

</div>

<div class="footer">Generated from Playwright results &bull; Innago PO Portal regression &bull; ${dateStr} ${timeStr}</div>

<script>
  if (window.Chart) {
    new Chart(document.getElementById('donutChart'), {
      type: 'doughnut',
      data: {
        labels: ['Passed', 'Flaky', 'Failed', 'Skipped'],
        datasets: [{ data: [${passed}, ${flaky}, ${failed}, ${skipped}], backgroundColor: ['#0d9488', '#f59e0b', '#dc2626', '#94a3b8'], borderWidth: 0, hoverOffset: 6 }],
      },
      options: { cutout: '65%', plugins: { legend: { position: 'bottom', labels: { padding: 16, font: { size: 13 } } } } },
    });
    new Chart(document.getElementById('barChart'), {
      type: 'bar',
      data: {
        labels: ${JSON.stringify(fileNames)},
        datasets: [
          { label: 'Passed', data: ${JSON.stringify(Object.values(byFile).map((c) => c.passed))}, backgroundColor: '#0d9488', borderRadius: 3 },
          { label: 'Flaky', data: ${JSON.stringify(Object.values(byFile).map((c) => c.flaky))}, backgroundColor: '#f59e0b', borderRadius: 3 },
          { label: 'Failed', data: ${JSON.stringify(Object.values(byFile).map((c) => c.failed))}, backgroundColor: '#dc2626', borderRadius: 3 },
        ],
      },
      options: {
        indexAxis: 'y',
        scales: { x: { stacked: true, beginAtZero: true, grid: { display: false } }, y: { stacked: true, grid: { display: false } } },
        plugins: { legend: { position: 'bottom', labels: { padding: 16, font: { size: 13 } } } },
      },
    });
  }
</script>

</body>
</html>`;

mkdirSync(outputDir, { recursive: true });
writeFileSync(htmlPath, html, 'utf8');
console.log(`Dashboard written to: ${htmlPath}`);
console.log(`Verdict: ${verdict} | Pass rate: ${passRate}% | ${passed} passed, ${flaky} flaky, ${failed} failed, ${skipped} skipped`);

if (process.env.GITHUB_STEP_SUMMARY) {
    const rows = [
        ['**Verdict**', verdict],
        ['**Pass rate**', `${passRate}% (of ${executed} executed)`],
        ['**Passed first try**', passed],
        ['**Flaky**', flaky],
        ['**Failed**', failed],
        ['**Skipped**', skipped],
        ['**Duration**', duration],
    ];
    let md = `## QA Sign-off Dashboard\n\n| Metric | Value |\n|--------|-------|\n`;
    md += rows.map(([label, value]) => `| ${label} | ${value} |`).join('\n');
    md += '\n\n';

    if (failedSpecs.length + flakySpecs.length > 0) {
        md += `### Needs attention\n\n| State | Module | Test |\n|-------|--------|------|\n`;
        md += [...failedSpecs, ...flakySpecs]
            .map((spec) => `| ${spec.state} | ${shortName(spec.file)} | ${spec.test} |`)
            .join('\n');
        md += '\n';
    } else {
        md += '_Every test passed on its first attempt._\n';
    }
    md += `\n> Download the **sign-off-report** artifact for the full dashboard.\n`;
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, md);
    console.log('Summary appended to GitHub Step Summary');
}
