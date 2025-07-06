// src/modules/admin/controllers/ExternalServerController.ts
import { Request, Response } from 'express';
import { ExternalServerRepository } from '../../../repositories/ExternalServerRepository';

export class ExternalServerController {
  // ✅ Get all external servers
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const servers = await ExternalServerRepository.getAll();
      return res.json(servers);
    } catch (err: any) {
      return res.status(500).json({ error: 'Failed to fetch external servers' });
    }
  }

  // ✅ Get summarized status list
  static async getStatusSummary(req: Request, res: Response): Promise<Response> {
    try {
      const statuses = await ExternalServerRepository.getStatusSummary();
      return res.json(statuses);
    } catch (err: any) {
      return res.status(500).json({ error: 'Failed to fetch status summary' });
    }
  }

  // ✅ Only specific fields (ID, status, last_accessed)
  static async getAllStatuses(req: Request, res: Response): Promise<Response> {
    try {
      const servers = await ExternalServerRepository.getStatusList();
      return res.json(servers);
    } catch (err: any) {
      return res.status(500).json({ error: 'Failed to fetch external servers.' });
    }
  }

  // ✅ Get server by ID
  static async getById(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid server ID' });
    }

    try {
      const server = await ExternalServerRepository.findById(id);
      if (!server) {
        return res.status(404).json({ error: 'Server not found' });
      }
      return res.json(server);
    } catch (err: any) {
      return res.status(500).json({ error: 'Failed to fetch server details' });
    }
  }

  // ✅ Update API key by ID
  static async update(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);
    const { api_key } = req.body;

    if (isNaN(id) || !api_key) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    try {
      const existing = await ExternalServerRepository.findById(id);
      if (!existing) {
        return res.status(404).json({ error: 'Server not found' });
      }

      await ExternalServerRepository.updateApiKey(id, api_key);
      return res.json({ message: 'API key updated successfully' });
    } catch (err: any) {
      return res.status(500).json({ error: 'Failed to update server' });
    }
  }

  // ✅ Delete server
  static async delete(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid server ID' });
    }

    try {
      const existing = await ExternalServerRepository.findById(id);
      if (!existing) {
        return res.status(404).json({ error: 'Server not found' });
      }

      await ExternalServerRepository.delete(id);
      return res.json({ message: 'External server deleted successfully' });
    } catch (err: any) {
      return res.status(500).json({ error: 'Failed to delete server' });
    }
  }
}
