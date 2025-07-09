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
exports.NotificationScheduler = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const NotificationJobService_1 = require("../services/NotificationJobService");
const Logger_1 = require("../../infrastructure/logger/Logger");
class NotificationScheduler {
    static start() {
        this.logger.info('[NotificationScheduler] Starting...');
        node_cron_1.default.schedule('0 */3 * * *', () => __awaiter(this, void 0, void 0, function* () {
            this.logger.info('[NotificationScheduler] Running...');
            try {
                yield this.service.run();
                this.logger.info('[NotificationScheduler] Notification cycle complete.');
            }
            catch (err) {
                this.logger.error('[NotificationScheduler] Error', { message: err.message, stack: err.stack });
            }
        }));
    }
}
exports.NotificationScheduler = NotificationScheduler;
NotificationScheduler.logger = Logger_1.Logger.getInstance();
NotificationScheduler.service = new NotificationJobService_1.NotificationJobService();
