import { fileURLToPath } from 'node:url';
import { randomUtils } from '../../utils/randomUtils.js';

/**
 * Test data for the Maintenance module.
 *
 * Follows the shape of expenseTestData.js - static helpers, no instances - so the two read
 * the same way at the call site.
 */
export class TestData {
    /**
     * The category tiles that ship with every account. The add form also lists categories the
     * QA account has accumulated over time ("coffee machine issue", "Tea machine"), which are
     * deliberately excluded - they are one account's leftovers, not a stable fixture.
     *
     * Names go straight into the `#category-radio-<name>` id, so anything added here has to
     * match the app's label exactly.
     */
    static categories = ['A/C', 'Appliance', 'Electrical', 'Heat', 'Kitchen', 'Plumbing', 'Other'];

    static ticketTitle() {
        return `Auto Maintenance ${randomUtils.generateRandomNumber(6)}`;
    }

    static description() {
        return `Raised by the automation suite - ${randomUtils.randomAlphabets(20)}`;
    }

    static category() {
        return randomUtils.getRandomValueFromArray(this.categories);
    }

    static vendorEmail() {
        return `automation.vendor.${randomUtils.generateRandomNumber(6)}@yopmail.com`;
    }

    /**
     * A minimal 1x1 PNG checked into the repo for the create-flow's photo upload.
     *
     * Resolved from import.meta.url rather than a hardcoded absolute path, so it still finds
     * the file when the suite runs from a different machine or CI checkout path.
     */
    static defaultImagePath = fileURLToPath(new URL('../assets/maintenance-photo.png', import.meta.url));
}
