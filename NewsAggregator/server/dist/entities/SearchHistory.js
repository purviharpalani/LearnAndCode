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
exports.SearchHistory = void 0;
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const User_1 = require("./User");
let SearchHistory = class SearchHistory {
};
exports.SearchHistory = SearchHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SearchHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SearchHistory.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SearchHistory.prototype, "search_query", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SearchHistory.prototype, "results_count", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SearchHistory.prototype, "searched_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, user => user.searchHistory),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", User_1.User)
], SearchHistory.prototype, "user", void 0);
exports.SearchHistory = SearchHistory = __decorate([
    (0, typeorm_1.Entity)('search_history')
], SearchHistory);
