// src/modules/admin/controllers/NewsCategoryController.ts
import { Request, Response } from 'express';
import { NewsCategoryRepository } from '../../../repositories/NewsCategoryRepository';

export class NewsCategoryController {
  static async addCategory(req: Request, res: Response) {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    try {
      await NewsCategoryRepository.add(name);
      res.status(201).json({ message: 'Category added' });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to add category' });
    }
  }
}
