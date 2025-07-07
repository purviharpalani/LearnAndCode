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
exports.ArticleReport = void 0;
const typeorm_1 = require("typeorm");
const NewsArticle_1 = require("./NewsArticle");
const User_1 = require("./User");
let ArticleReport = class ArticleReport {
};
exports.ArticleReport = ArticleReport;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ArticleReport.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => NewsArticle_1.NewsArticle, (article) => article.reports, { onDelete: 'CASCADE' }),
    __metadata("design:type", NewsArticle_1.NewsArticle)
], ArticleReport.prototype, "article", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.reports, { onDelete: 'CASCADE' }),
    __metadata("design:type", User_1.User)
], ArticleReport.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ArticleReport.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ArticleReport.prototype, "reported_at", void 0);
exports.ArticleReport = ArticleReport = __decorate([
    (0, typeorm_1.Entity)('article_reports')
], ArticleReport);
