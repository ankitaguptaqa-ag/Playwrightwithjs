export class TestData {
    static randomNumber(length = 6) {
        return Math.floor(Math.random() * Math.pow(10, length));
    }

    static randomAlphabets(length = 6) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        return result;
    }

    static vendorName() {
        return `Vendor_${this.randomNumber()}`;
    }

    static firstName() {
        return `Pamm_${this.randomNumber()}`;
    }

    static lastName() {
        return `leo_${this.randomNumber()}`;
    }

    static email() {
        return `swap_${this.randomNumber()}@yopmail.com`;
    }

    static phoneNumber() {
        return `+91${this.randomNumber(10).toString().padStart(10, '0')}`;
    }

    static zip() {
        return `${this.randomNumber(5).toString().padStart(5, '0')}`;
    }

    static city() {
        const cities = ['Phoenix', 'Dallas', 'Austin', 'Miami', 'Texas', 'Florida', 'New York', 'Orlando', 'Tampa', 'Atlanta'];
        return cities[Math.floor(Math.random() * cities.length)];
    }

    static state() {
        const states = [
            'California',
            'Texas',
            'Florida',
            'New York',
            'Pennsylvania',
            'Arizona',
            'Washington',
            'Colorado',
            'Virginia',
            'Massachusetts',
        ];
        return states[Math.floor(Math.random() * states.length)];
    }

    static addressLine1() {
        const streets = ['Main Street', 'Oak Avenue', 'Elm Road', 'Pine Lane', 'Maple Drive', 'Cedar Street', 'Birch Avenue', 'Willow Road'];
        const streetNumber = this.randomNumber(4);
        const streetName = streets[Math.floor(Math.random() * streets.length)];
        return `${streetNumber} ${streetName}`;
    }

    static addressLine2() {
        const suiteTypes = ['Suite', 'Apt', 'Unit', 'Floor'];
        const suiteType = suiteTypes[Math.floor(Math.random() * suiteTypes.length)];
        const suiteNumber = this.randomNumber(3);
        const suiteLetters = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Random letter A-Z
        return `${suiteType} ${suiteNumber}${suiteLetters}`;
    }
}
