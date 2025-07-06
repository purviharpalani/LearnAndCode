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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
const db_1 = require("./config/db");
const NewsFetcherScheduler_1 = require("./jobs/schedulers/NewsFetcherScheduler");
NewsFetcherScheduler_1.NewsFetcherScheduler.start();
// import { startNewsFetcherJob } from './jobs/schedulers/NewsFetcherScheduler';
const Logger_1 = require("./infrastructure/logger/Logger");
const errorHandler_1 = require("./middlewares/errorHandler");
// Routes
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const article_routes_1 = __importDefault(require("./routes/article.routes"));
dotenv_1.default.config();
const logger = Logger_1.Logger.getInstance();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Global Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Route Mounting
app.use('/auth', auth_routes_1.default);
app.use('/articles', article_routes_1.default);
// Global Error Handler
app.use(errorHandler_1.errorHandler);
// Server Bootstrap
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connectToDatabase)();
        // Start background jobs (cron, etc.)
        NewsFetcherScheduler_1.NewsFetcherScheduler.start();
        const server = (0, http_1.createServer)(app);
        // Production-safe tuning
        server.keepAliveTimeout = 60000; // 60 seconds
        server.headersTimeout = 65000;
        server.listen(PORT, () => {
            logger.info(`[Server] Listening on port ${PORT}`);
        });
    }
    catch (err) {
        logger.error('[Startup Error]', err);
        process.exit(1);
    }
}))();
