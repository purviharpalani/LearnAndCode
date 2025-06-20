import { AppDataSource } from '../config/db';
import { UserSession } from '../entities/UserSession';

export const SessionRepository = {
  async findByToken(token: string) {
    return await AppDataSource.getRepository(UserSession).findOne({
      where: { session_token: token },
      relations: ['user'],
    });
  }
};
