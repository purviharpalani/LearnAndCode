"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRequestLogRepository = void 0;
const db_1 = require("../config/db");
const ApiRequestLog_1 = require("../entities/ApiRequestLog");
exports.ApiRequestLogRepository = db_1.AppDataSource.getRepository(ApiRequestLog_1.ApiRequestLog);
