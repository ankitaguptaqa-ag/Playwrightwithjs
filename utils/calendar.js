const Month_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export class Calendar {
    constructor(page) {
        this.page = page;

        this.locators = {
            previousMonthButton: '//button[@aria-label="Previous month"]',
            nextMonthButton: '//button[@aria-label="Next month"]',
            yearSelectionButton: '//button[contains(@class,"mat-calendar-period-button")]',

            getGivenDate(date) {
                return `//button/span[text()= " ${date} "]`;
            },
            getGivenYear(year) {
                return `//button/span[text()= " ${year} "]`;
            },
            getGivenMonth(month) {
                return `//button/span[text()= " ${month} "]`;
            },
        };
    }

    getCurrentMonthAbbr() {
        return Month_ABBR[new Date().getMonth()];
    }

    async selectToday() {
        const todayDate = this.page.locator('button[aria-current="date"]');
        await todayDate.waitFor({ state: 'visible', timeout: 50000 });
        await todayDate.click();
        const today = new Date();
        console.log(`Selected today: ${this.getCurrentMonthAbbr()} ${today.getDate()} , ${today.getFullYear()}`);
    }

    async setNextMonthGivenDate(dateToSelect) {
        await this.page.locator(this.locators.nextMonthButton).click();
        await this.page.locator(this.locators.getGivenDate(dateToSelect)).waitFor({ state: 'visible', timeout: 50000 });
        await this.page.locator(this.locators.getGivenDate(dateToSelect)).click();
        console.log(`Selected date: ${this.getCurrentMonthAbbr()} ${dateToSelect} , ${new Date().getFullYear()}`);
    }

    async selectPreviousMonthGivenDate(dateToSelect) {
        await this.page.locator(this.locators.previousMonthButton).click();
        await this.page.locator(this.locators.getGivenDate(dateToSelect)).waitFor({ state: 'visible', timeout: 50000 });
        await this.page.locator(this.locators.getGivenDate(dateToSelect)).click();
        console.log(`Selected date: ${this.getCurrentMonthAbbr()} ${dateToSelect} , ${new Date().getFullYear()}`);
    }

    async setSameDateOfNextYear() {
        console.log('Setting same date for next year');
        const today = new Date();
        const nextYear = today.getFullYear() + 1;
        const currentDay = today.getDate();
        const currentMonth = this.getCurrentMonthAbbr();

        await this.page.locator(this.locators.yearSelectionButton).click();
        await this.page.locator(this.locators.getGivenYear(nextYear)).click();
        await this.page.locator(this.locators.getGivenMonth(currentMonth)).click();

        if (currentDay === 1) {
            await this.page.locator(this.locators.previousMonthButton).click();
            await this.page.locator(this.locators.getGivenDate(2)).click();
            await this.page.locator(this.locators.getGivenDate(30)).click();
        } else {
            await this.page.locator(this.locators.getGivenDate(currentDay)).click();
        }
        console.log(`Selected date: ${currentMonth} ${currentDay} , ${nextYear}`);
    }

    async setLastDateOfFutureSixMonth() {
        console.log('Setting last date of month after 6 months from current month');
        const target = new Date(new Date().getFullYear(), new Date().getMonth() + 7, 0);
        const targetMonth = Month_ABBR[target.getMonth()];
        const targetYear = target.getFullYear();
        const lastDay = target.getDate();

        await this.page.locator(this.locators.yearSelectionButton).click();
        await this.page.locator(this.locators.getGivenYear(targetYear)).click();
        await this.page.locator(this.locators.getGivenMonth(targetMonth)).click();
        await this.page.locator(this.locators.getGivenDate(lastDay)).click();
        console.log(`Selected date: ${targetMonth} ${lastDay} , ${targetYear}`);
    }

    async selectDateByOffSet(daysOffset) {
        if (daysOffset === 0) {
            await this.selectToday();
            return;
        }

        const today = new Date();
        const target = new Date(today);
        target.setDate(today.getDate() + daysOffset);
        const targetDay = target.getDate();

        if (target.getMonth() !== today.getMonth() || target.getFullYear() !== today.getFullYear()) {
            await this.page.locator(this.locators.nextMonthButton).click();
        }
        await this.page.locator(this.locators.getGivenDate(targetDay)).click();
        console.log(`Selected date: ${this.getCurrentMonthAbbr()} ${targetDay} , ${target.getFullYear()}`);
    }

    async setDateForGivenMonth(month, day) {
        const today = new Date();
        const targetYear = month < today.getMonth() + 1 ? today.getFullYear() + 1 : today.getFullYear();
        const targetMonth = Month_ABBR[month - 1];

        await this.page.locator(this.locators.yearSelectionButton).click();
        await this.page.locator(this.locators.getGivenYear(targetYear)).click();
        await this.page.locator(this.locators.getGivenMonth(targetMonth)).click();
        await this.page.locator(this.locators.getGivenDate(day)).click();
        console.log(`Selected date: ${targetMonth} ${day} , ${targetYear}`);
    }
}
