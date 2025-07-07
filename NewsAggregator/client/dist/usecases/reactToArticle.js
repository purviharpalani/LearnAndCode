"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactToArticle = reactToArticle;
const readline_sync_1 = __importDefault(require("readline-sync"));
const httpClient_1 = require("../utils/httpClient");
async function reactToArticle() {
    const articleId = readline_sync_1.default.questionInt('Enter Article ID to react: ');
    const reaction = readline_sync_1.default.keyInSelect(['like', 'dislike'], 'Choose your reaction:', { cancel: false });
    const reactionType = ['like', 'dislike'][reaction];
    try {
        await httpClient_1.httpClient.post('/articles/react', {
            articleId,
            reaction: reactionType
        });
        console.log(`Successfully recorded your ${reactionType}.`);
    }
    catch (err) {
        console.error('Error reacting to article:', err.response?.data?.error || err.message);
    }
}
