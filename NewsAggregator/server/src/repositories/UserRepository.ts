import { AppDataSource } from '../config/db';
import { User } from '../entities/User';
import { Repository } from 'typeorm';

export class UserRepository {
  private static get repo(): Repository<User> {
    return AppDataSource.getRepository(User);
  }

  static create(userData: Partial<User>): User {
    return this.repo.create(userData);
  }

  static async save(userData: Partial<User>): Promise<User> {
    const user = this.repo.create(userData);
    return await this.repo.save(user);
  }

  static async findOneBy(condition: Partial<User>): Promise<User | null> {
    return await this.repo.findOne({ where: condition });
  }

  static async existsByEmailOrUsername(email: string, username: string): Promise<boolean> {
    const existing = await this.repo.findOne({
      where: [{ email }, { username }],
    });
    return !!existing;
  }

  static async findById(id: number): Promise<User | null> {
    return await this.repo.findOne({ where: { id } });
  }

    static async findAllWithPreferences(): Promise<User[]> {
        return await this.repo.find({
            where: { is_active: true },
            relations: ['notificationPreferences'],
        });
    }

}
