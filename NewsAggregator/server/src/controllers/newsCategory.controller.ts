// src/controllers/newsCategory.controller.ts
import { Request, Response } from 'express';
import { NewsCategoryRepository } from '../repositories/NewsCategoryRepository';

export class NewsCategoryController {
  static async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    const category = await NewsCategoryRepository.add(name);
    return res.status(201).json(category);
  }
}
