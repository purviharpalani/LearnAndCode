import { Request, Response } from 'express';
import { NewsCategoryRepository } from '../repositories/NewsCategoryRepository';

export class NewsCategoryController {

  static async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    const category = await NewsCategoryRepository.add(name);
    return res.status(201).json(category);
  }

  // static async toggleVisibility(req: Request, res: Response) {
  //   const id = Number(req.params.id);
  //   const { hide } = req.body;

  //   if (isNaN(id)) return res.status(400).json({ error: 'Invalid category ID' });

  //   try {
  //     await NewsCategoryRepository.toggleVisibility(id, hide);
  //     res.json({ message: `Category ${hide ? 'hidden' : 'unhidden'} successfully.` });
  //   } catch (err: any) {
  //     res.status(500).json({ error: 'Failed to toggle category visibility' });
  //   }
  // }

  // static async getHiddenCategories(req: Request, res: Response) {
  //   try {
  //     const hidden = await NewsCategoryRepository.getHidden();
  //     res.json(hidden);
  //   } catch (err: any) {
  //     res.status(500).json({ error: 'Failed to fetch hidden categories' });
  //   }
  // }

}
