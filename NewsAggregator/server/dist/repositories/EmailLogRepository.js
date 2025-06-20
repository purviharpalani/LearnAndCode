"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailLogRepository = void 0;
const db_1 = require("../config/db");
const EmailLog_1 = require("../entities/EmailLog");
exports.EmailLogRepository = db_1.AppDataSource.getRepository(EmailLog_1.EmailLog);
