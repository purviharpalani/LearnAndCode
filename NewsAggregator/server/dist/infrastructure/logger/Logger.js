"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const winston_1 = __importDefault(require("winston"));
class Logger {
    constructor() { }
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = winston_1.default.createLogger({
                level: 'info',
                format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.printf(({ level, message, timestamp }) => {
                    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
                })),
                transports: [new winston_1.default.transports.Console()],
            });
        }
        return Logger.instance;
    }
}
exports.Logger = Logger;
