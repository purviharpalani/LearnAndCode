import { AppDataSource } from '../config/db';
import { User } from '../entities/User';

export class UserRepository {
  private static getRepo() {
    return AppDataSource.getRepository(User);
  }

  static create(data: Partial<User>): User {
    return this.getRepo().create(data);
  }

  static async save(user: Partial<User>): Promise<User> {
    const newUser = this.getRepo().create(user); 
    return await this.getRepo().save(newUser);   
  }

  static async findOne(condition: Partial<User>): Promise<User | null> {
    return await this.getRepo().findOne({ where: condition });
  }

  static async exists(email: string, username: string): Promise<boolean> {
    const existing = await this.getRepo().findOne({
      where: [{ email }, { username }],
    });
    return !!existing;
  }
}
