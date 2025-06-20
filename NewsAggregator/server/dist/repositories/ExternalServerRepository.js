"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalServerRepository = void 0;
const db_1 = require("../config/db");
const ExternalServer_1 = require("../entities/ExternalServer");
exports.ExternalServerRepository = db_1.AppDataSource.getRepository(ExternalServer_1.ExternalServer);
