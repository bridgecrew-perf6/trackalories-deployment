"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isString = (string) => {
    return typeof string === 'string';
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isNumber = (number) => {
    return typeof number === 'number';
};
exports.default = { isString, isDate, isNumber };
