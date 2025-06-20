"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationConfigRepository = void 0;
const db_1 = require("../config/db");
const NotificationConfig_1 = require("../entities/NotificationConfig");
exports.NotificationConfigRepository = db_1.AppDataSource.getRepository(NotificationConfig_1.NotificationConfig);
