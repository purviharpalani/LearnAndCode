"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const AuthMenu_1 = require("./menus/AuthMenu");
(async () => {
    const menu = new AuthMenu_1.AuthMenu();
    await menu.run();
})();
