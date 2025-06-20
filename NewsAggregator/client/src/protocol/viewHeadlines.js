"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewHeadlines = viewHeadlines;
const axios_1 = __importDefault(require("axios"));
const sessionManager_1 = require("../utils/sessionManager");
function viewHeadlines() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const session = sessionManager_1.sessionManager.getSession();
            if (!session) {
                console.log('No active session. Please log in.');
                return;
            }
            const response = yield axios_1.default.get('http://localhost:3000/articles', {
                headers: {
                    Authorization: `Session ${session.sessionToken}`,
                },
            });
            console.log('\n=== Headlines ===');
            response.data.forEach((article) => {
                console.log(`ID: ${article.id}`);
                console.log(`Title: ${article.title}`);
                console.log(`Source: ${article.source}`);
                console.log(`Category: ${article.category}`);
                console.log('---');
            });
        }
        catch (err) {
            console.error('Failed to fetch headlines:', ((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || err.message);
        }
    });
}
