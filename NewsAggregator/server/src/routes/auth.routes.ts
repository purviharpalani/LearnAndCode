import { Router } from 'express';
import { AuthController } from '../modules/auth/controllers/AuthController';

const router = Router();

router.post('/signup', (req, res, next) => {
  AuthController.signup(req, res).catch(next);
});

router.post('/login', (req, res, next) => {
  AuthController.login(req, res).catch(next);
});

export default router;
