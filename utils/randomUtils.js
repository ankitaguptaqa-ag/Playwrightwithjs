export const randomUtils = {
    randomAlphabets(length) {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let randomString = '';
        for (let i = 0; i < length; i++) {
            const rnum = Math.floor(Math.random() * characters.length);
            randomString += characters.substring(rnum, rnum + 1);
        }
        return randomString;
    },


    generateRandomNumber(length) {
        const numbers = '123456789';
        let randomString = '';
        for (let i = 0; i < length; i++) {
            const rnum = Math.floor(Math.random() * numbers.length);
            randomString += numbers.substring(rnum, rnum + 1);
        }
        return randomString;
    },


    getRandomValueFromArray(arrayList) {
        const randomIndex = Math.floor(Math.random() * arrayList.length);
        return arrayList[randomIndex];
    },


    randomAlphabetsWithNumberSpace(maxLength = 100) {
        const charc = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ';
        let randomString = '';
        for (let i = 0; i < maxLength; i++) {
            const rnum = Math.floor(Math.random() * charc.length);
            randomString += charc.charAt(rnum);
        }
        return randomString;
    },
};


