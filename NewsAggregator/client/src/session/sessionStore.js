"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.username = exports.userId = exports.sessionToken = void 0;
exports.setSession = setSession;
exports.clearSession = clearSession;
// client/session/sessionStore.ts
exports.sessionToken = '';
exports.userId = 0;
exports.username = '';
function setSession(token, id, name) {
    exports.sessionToken = token;
    exports.userId = id;
    exports.username = name;
}
function clearSession() {
    exports.sessionToken = '';
    exports.userId = 0;
    exports.username = '';
}
