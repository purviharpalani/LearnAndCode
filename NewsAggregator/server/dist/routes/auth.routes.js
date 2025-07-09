"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../modules/auth/controllers/AuthController");
const router = (0, express_1.Router)();
router.post('/signup', (req, res, next) => {
    AuthController_1.AuthController.signup(req, res).catch(next);
});
router.post('/login', (req, res, next) => {
    AuthController_1.AuthController.login(req, res).catch(next);
});
exports.default = router;
