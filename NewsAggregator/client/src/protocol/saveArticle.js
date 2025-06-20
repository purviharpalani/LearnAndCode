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
exports.saveArticle = saveArticle;
const axios_1 = __importDefault(require("axios"));
const readline_sync_1 = __importDefault(require("readline-sync"));
const sessionManager_1 = require("../utils/sessionManager");
function saveArticle() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const session = sessionManager_1.sessionManager.getSession();
        const articleId = readline_sync_1.default.question('Enter Article ID to save: ');
        try {
            const response = yield axios_1.default.post('http://localhost:3000/articles/save', { articleId: Number(articleId) }, {
                headers: {
                    Authorization: `Session ${session === null || session === void 0 ? void 0 : session.sessionToken}`,
                },
            });
            console.log(response.data.message);
        }
        catch (error) {
            console.error('Failed to save article:', ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || error.message);
        }
    });
}
