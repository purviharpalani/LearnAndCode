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
exports.ExternalServerController = void 0;
const ExternalServerRepository_1 = require("../../../repositories/ExternalServerRepository");
class ExternalServerController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const servers = yield ExternalServerRepository_1.ExternalServerRepository.getAll();
                return res.json(servers);
            }
            catch (err) {
                return res.status(500).json({ error: 'Failed to fetch external servers' });
            }
        });
    }
    static getStatusSummary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const statuses = yield ExternalServerRepository_1.ExternalServerRepository.getStatusSummary();
                return res.json(statuses);
            }
            catch (err) {
                return res.status(500).json({ error: 'Failed to fetch status summary' });
            }
        });
    }
    static getAllStatuses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const servers = yield ExternalServerRepository_1.ExternalServerRepository.getStatusList();
                return res.json(servers);
            }
            catch (err) {
                return res.status(500).json({ error: 'Failed to fetch external servers.' });
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({ error: 'Invalid server ID' });
            }
            try {
                const server = yield ExternalServerRepository_1.ExternalServerRepository.findById(id);
                if (!server) {
                    return res.status(404).json({ error: 'Server not found' });
                }
                return res.json(server);
            }
            catch (err) {
                return res.status(500).json({ error: 'Failed to fetch server details' });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id, 10);
            const { api_key } = req.body;
            if (isNaN(id) || !api_key) {
                return res.status(400).json({ error: 'Invalid input' });
            }
            try {
                const existing = yield ExternalServerRepository_1.ExternalServerRepository.findById(id);
                if (!existing) {
                    return res.status(404).json({ error: 'Server not found' });
                }
                yield ExternalServerRepository_1.ExternalServerRepository.updateApiKey(id, api_key);
                return res.json({ message: 'API key updated successfully' });
            }
            catch (err) {
                return res.status(500).json({ error: 'Failed to update server' });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({ error: 'Invalid server ID' });
            }
            try {
                const existing = yield ExternalServerRepository_1.ExternalServerRepository.findById(id);
                if (!existing) {
                    return res.status(404).json({ error: 'Server not found' });
                }
                yield ExternalServerRepository_1.ExternalServerRepository.deleteById(id);
                return res.json({ message: 'External server deleted successfully' });
            }
            catch (err) {
                return res.status(500).json({ error: 'Failed to delete server' });
            }
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newServer = yield ExternalServerRepository_1.ExternalServerRepository.createExternalServer(req.body);
                res.status(201).json(newServer);
            }
            catch (error) {
                console.error("Error creating external server:", error);
                res.status(500).json({ error: "Failed to create external server" });
            }
        });
    }
    static getStatusList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const servers = yield ExternalServerRepository_1.ExternalServerRepository.getStatusList();
                res.json(servers);
            }
            catch (err) {
                console.error('[Admin:getStatusList]', err);
                res.status(500).json({ error: 'Failed to fetch external server status' });
            }
        });
    }
}
exports.ExternalServerController = ExternalServerController;
