// src/modules/admin/controllers/NewsCategoryController.ts
import { Request, Response } from 'express';
import { NewsCategoryRepository } from '../../../repositories/NewsCategoryRepository';

export class NewsCategoryController {
  static async create(req: Request, res: Response) {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Invalid category name' });
    }

    const exists = await NewsCategoryRepository.exists(name);
    if (exists) {
      return res.status(409).json({ error: 'Category already exists' });
    }

    const category = await NewsCategoryRepository.add(name);
    res.status(201).json(category);
  }
}
