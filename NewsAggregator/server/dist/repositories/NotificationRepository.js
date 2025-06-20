"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRepository = void 0;
const db_1 = require("../config/db");
const Notification_1 = require("../entities/Notification");
exports.NotificationRepository = db_1.AppDataSource.getRepository(Notification_1.Notification);
