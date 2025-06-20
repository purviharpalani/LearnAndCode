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
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewSavedArticles = viewSavedArticles;
// client/protocol/viewSaved.ts
const httpClient_1 = require("../utils/httpClient");
function viewSavedArticles() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const res = yield httpClient_1.httpClient.get('/articles/saved');
            const saved = res.data;
            if (!saved.length) {
                console.log('You have not saved any articles yet.');
                return;
            }
            console.log('\n=== Saved Articles ===');
            saved.forEach((entry, index) => {
                const article = entry.article;
                console.log(`\n#${index + 1}`);
                console.log(`Title: ${article.title}`);
                console.log(`Source: ${article.source}`);
                console.log(`URL: ${article.url}`);
                console.log(`Category: ${article.category}`);
                console.log(`Saved At: ${entry.saved_at}`);
            });
        }
        catch (err) {
            console.error('Failed to fetch saved articles:', ((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || err.message);
        }
    });
}
