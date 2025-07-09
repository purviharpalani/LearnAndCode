import { AppDataSource } from '../config/db';
import { ArticleReaction, User, NewsArticle } from '../entities';
import { Repository } from 'typeorm';

export class ArticleReactionRepository {
  private static get repo(): Repository<ArticleReaction> {
    return AppDataSource.getRepository(ArticleReaction);
  }

  static async findByUserAndArticle(userId: number, articleId: number): Promise<ArticleReaction | null> {
    return await this.repo.findOne({
      where: { user: { id: userId }, article: { id: articleId } },
    });
  }

  static async save(reaction: Partial<ArticleReaction>): Promise<ArticleReaction> {
    const entity = this.repo.create(reaction);
    return await this.repo.save(entity);
  }

  static async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  static async react(user: User, article: NewsArticle, isLike: boolean): Promise<void> {
    const existing = await this.repo.findOne({ where: { user: { id: user.id }, article: { id: article.id } } });

    if (existing) {
      throw new Error('You have already reacted to this article.');
    }

    const reaction = this.repo.create({
      user: { id: user.id },
      article: { id: article.id },
      type: isLike ? 'like' : 'dislike'
    });
    await this.repo.save(reaction);

    const articleRepo = AppDataSource.getRepository(NewsArticle);
    if (isLike) {
      await articleRepo.increment({ id: article.id }, 'likes', 1);
    } else {
      await articleRepo.increment({ id: article.id }, 'dislikes', 1);
    }
  }
}
