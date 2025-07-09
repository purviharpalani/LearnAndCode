// src/index.ts
import dotenv from 'dotenv';
dotenv.config();
import { AuthMenu } from './menus/AuthMenu';

(async () => {
  const menu = new AuthMenu();
  await menu.run();
})();
