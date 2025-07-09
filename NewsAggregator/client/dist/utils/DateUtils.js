"use strict";
// src/utils/DateUtils.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtils = void 0;
class DateUtils {
    static getCurrentFormattedDate() {
        return new Date().toLocaleDateString('en-GB');
    }
    static getCurrentFormattedTime() {
        return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
    static getCurrentDetailedDate() {
        return new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    }
    static getCurrentDetailedTime() {
        return new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    }
    static getCurrentDateTimeForHeadlines() {
        const now = new Date();
        return {
            date: now.toLocaleDateString('en-GB'),
            time: now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        };
    }
}
exports.DateUtils = DateUtils;
