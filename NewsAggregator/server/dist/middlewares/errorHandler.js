"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const Logger_1 = require("../infrastructure/logger/Logger");
const CustomError_1 = require("../core/errors/CustomError");
const logger = Logger_1.Logger.getInstance();
function errorHandler(err, req, res, next) {
    logger.error('[Global Error Handler]', err);
    if (err instanceof CustomError_1.CustomError) {
        res.status(err.statusCode).json({ error: err.message });
    }
    else {
        res.status(500).json({ error: 'Internal server error' });
    }
}
