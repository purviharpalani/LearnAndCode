"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
class Validator {
    static isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    static isValidDate(dateStr) {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(dateStr))
            return false;
        const date = new Date(dateStr);
        return !isNaN(date.getTime());
    }
    static isPositiveNumber(input) {
        const num = typeof input === 'string' ? parseInt(input, 10) : input;
        return !isNaN(num) && num > 0;
    }
    static isNonEmptyString(value) {
        return typeof value === 'string' && value.trim().length > 0;
    }
    static isValidCategory(category, validCategories) {
        return validCategories.includes(category.toLowerCase());
    }
    static isDateRangeValid(start, end) {
        return new Date(start) <= new Date(end);
    }
    static isNonEmpty(input) {
        return input.trim().length > 0;
    }
}
exports.Validator = Validator;
