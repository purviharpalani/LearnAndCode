"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startAllJobs = startAllJobs;
const NewsFetcherScheduler_1 = require("./schedulers/NewsFetcherScheduler");
const NotificationScheduler_1 = require("./schedulers/NotificationScheduler");
function startAllJobs() {
    NewsFetcherScheduler_1.NewsFetcherScheduler.start();
    NotificationScheduler_1.NotificationScheduler.start();
}
