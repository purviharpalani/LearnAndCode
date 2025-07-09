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
exports.connectToDatabase = exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Logger_1 = require("../infrastructure/logger/Logger");
const logger = Logger_1.Logger.getInstance();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'Purvi@123',
    database: process.env.DB_NAME || 'news_aggregation',
    entities: [__dirname + '/../entities/*.{js,ts}'],
    synchronize: true,
    logging: false,
});
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('DB Config:', {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            pass: process.env.DB_PASS,
            name: process.env.DB_NAME,
        });
        yield exports.AppDataSource.initialize();
        logger.info('[DB] Connection established successfully');
    }
    catch (err) {
        logger.error('[DB] Failed to connect to database', err);
        process.exit(1);
    }
});
exports.connectToDatabase = connectToDatabase;
