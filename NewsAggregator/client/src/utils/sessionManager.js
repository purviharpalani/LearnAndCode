"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionManager = void 0;
let currentSession = null;
exports.sessionManager = {
    setSession(session) {
        currentSession = session;
    },
    getSession() {
        return currentSession;
    },
    clearSession() {
        currentSession = null;
    }
};
