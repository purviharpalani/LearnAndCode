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
exports.SavedArticle = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const NewsArticle_1 = require("./NewsArticle");
let SavedArticle = class SavedArticle {
};
exports.SavedArticle = SavedArticle;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SavedArticle.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SavedArticle.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SavedArticle.prototype, "article_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, user => user.savedArticles),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", User_1.User)
], SavedArticle.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => NewsArticle_1.NewsArticle),
    (0, typeorm_1.JoinColumn)({ name: 'article_id' }),
    __metadata("design:type", NewsArticle_1.NewsArticle)
], SavedArticle.prototype, "article", void 0);
exports.SavedArticle = SavedArticle = __decorate([
    (0, typeorm_1.Entity)('saved_articles')
], SavedArticle);
