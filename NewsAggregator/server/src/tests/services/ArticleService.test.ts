

import { ArticleService } from '../../modules/articles/services/ArticleService';
import { NewsArticleRepository, SavedArticleRepository } from '../../repositories';
import { NewsArticle, SavedArticle, User } from '../../entities';
import { CustomError } from '../../core/errors/CustomError';

jest.mock('../../../src/repositories/NewsArticleRepository');
jest.mock('../../../src/repositories/SavedArticleRepository');

describe('ArticleService', () => {
  const service = new ArticleService();
  const mockUser: User = { id: 1 } as User;
  const mockArticle: NewsArticle = {
    id: 123,
    title: 'Sample',
    url: 'http://example.com',
    source: 'Test',
    category: 'tech',
    created_at: new Date(),
  } as NewsArticle;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should save article if not already saved', async () => {
    (NewsArticleRepository.findById as jest.Mock).mockResolvedValue(mockArticle);
    (SavedArticleRepository.findByUserAndArticle as jest.Mock).mockResolvedValue(null);
    (SavedArticleRepository.save as jest.Mock).mockResolvedValue({});

    await service.saveArticle(mockUser, mockArticle.id);

    expect(SavedArticleRepository.save).toHaveBeenCalledWith(mockUser, mockArticle);
  });

  it('should throw error if article already saved', async () => {
    (NewsArticleRepository.findById as jest.Mock).mockResolvedValue(mockArticle);
    (SavedArticleRepository.findByUserAndArticle as jest.Mock).mockResolvedValue({} as SavedArticle);

    await expect(service.saveArticle(mockUser, mockArticle.id)).rejects.toThrow(CustomError);
  });

  it('should return saved articles', async () => {
    const savedArticles = [{ article: mockArticle }] as SavedArticle[];
    (SavedArticleRepository.findByUser as jest.Mock).mockResolvedValue(savedArticles);

    const result = await service.getSavedArticles(mockUser);

    expect(result).toEqual([mockArticle]);
  });

  it('should return true if article is saved', async () => {
    (SavedArticleRepository.findByUserAndArticle as jest.Mock).mockResolvedValue({} as SavedArticle);
    const result = await service.isArticleSaved(mockUser.id, mockArticle.id);
    expect(result).toBe(true);
  });

  it('should return false if article is not saved', async () => {
    (SavedArticleRepository.findByUserAndArticle as jest.Mock).mockResolvedValue(null);
    const result = await service.isArticleSaved(mockUser.id, mockArticle.id);
    expect(result).toBe(false);
  });
});
