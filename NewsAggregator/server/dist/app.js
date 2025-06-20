"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const article_routes_1 = __importDefault(require("./routes/article.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Routes
app.use('/auth', auth_routes_1.default);
app.use('/articles', article_routes_1.default);
// Start Express server only (no DB)
const PORT = process.env.PORT || 3000;
(0, db_1.connectToDatabase)().then(() => {
    app.listen(PORT, () => {
        console.log(`[Server] Listening on port ${PORT}`);
    });
});
