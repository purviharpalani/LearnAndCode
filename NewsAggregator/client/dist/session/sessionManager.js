"use strict";
// src/session/sessionManager.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionManager = void 0;
class SessionManager {
    constructor() {
        this.session = null;
    }
    static getInstance() {
        if (!SessionManager.instance) {
            SessionManager.instance = new SessionManager();
        }
        return SessionManager.instance;
    }
    setSession(session) {
        this.session = session;
    }
    getSession() {
        return this.session;
    }
    clearSession() {
        this.session = null;
    }
    getToken() {
        return this.session?.sessionToken ?? null;
    }
    isLoggedIn() {
        return !!this.session;
    }
    isAdmin() {
        return this.session?.role === 'admin';
    }
}
exports.sessionManager = SessionManager.getInstance();
