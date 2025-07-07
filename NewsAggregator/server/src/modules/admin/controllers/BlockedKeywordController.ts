import { Request, Response } from 'express';
import { BlockedKeywordRepository } from '../../../repositories/BlockedKeywordRepository';

export class BlockedKeywordController {
  static async getAll(req: Request, res: Response) {
    const keywords = await BlockedKeywordRepository.getAll();
    res.json(keywords);
  }

  static async add(req: Request, res: Response) {
    const { keyword } = req.body;
    if (!keyword || typeof keyword !== 'string') {
      return res.status(400).json({ error: 'Invalid keyword' });
    }

    const result = await BlockedKeywordRepository.add(keyword);
    res.status(201).json(result);
  }

  static async remove(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

    await BlockedKeywordRepository.remove(id);
    res.json({ message: 'Keyword removed successfully' });
  }
}
