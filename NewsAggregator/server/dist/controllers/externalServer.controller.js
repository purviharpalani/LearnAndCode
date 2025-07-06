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
const ExternalServerRepository_1 = require("../repositories/ExternalServerRepository");
class ExternalServerController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const servers = yield ExternalServerRepository_1.ExternalServerRepository.getAll();
            return res.json(servers);
        });
    }
    static getStatusSummary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const servers = yield ExternalServerRepository_1.ExternalServerRepository.getStatusSummary();
            return res.json(servers);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const data = req.body;
            yield ExternalServerRepository_1.ExternalServerRepository.update(id, data);
            return res.json({ message: 'Updated successfully' });
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            yield ExternalServerRepository_1.ExternalServerRepository.delete(id);
            return res.json({ message: 'Deleted successfully' });
        });
    }
}
exports.ExternalServerController = ExternalServerController;
