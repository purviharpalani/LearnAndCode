"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRequestLog = void 0;
const typeorm_1 = require("typeorm");
const ExternalServer_1 = require("./ExternalServer");
let ApiRequestLog = class ApiRequestLog {
};
exports.ApiRequestLog = ApiRequestLog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ApiRequestLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ApiRequestLog.prototype, "server_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ApiRequestLog.prototype, "endpoint", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ApiRequestLog.prototype, "request_params", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ApiRequestLog.prototype, "response_code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ApiRequestLog.prototype, "response_body", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ApiRequestLog.prototype, "request_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ApiRequestLog.prototype, "error_message", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ApiRequestLog.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ExternalServer_1.ExternalServer),
    (0, typeorm_1.JoinColumn)({ name: 'server_id' }),
    __metadata("design:type", ExternalServer_1.ExternalServer)
], ApiRequestLog.prototype, "server", void 0);
exports.ApiRequestLog = ApiRequestLog = __decorate([
    (0, typeorm_1.Entity)('api_request_logs')
], ApiRequestLog);
