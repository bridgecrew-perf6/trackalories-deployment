"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getDay = () => {
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let completeDate = (day + "/" + month + "/" + year);
    return completeDate;
};
exports.default = getDay;
