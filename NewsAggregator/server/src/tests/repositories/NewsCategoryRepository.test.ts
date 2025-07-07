import { AppDataSource } from '../../config/db';
import { NewsCategoryRepository } from '../../repositories/NewsCategoryRepository';
import { NewsCategory } from '../../entities/NewsCategory';

describe('NewsCategoryRepository', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('should toggle visibility of category', async () => {
    const category = await AppDataSource.getRepository(NewsCategory).save({ name: 'TestCat' });
    await NewsCategoryRepository.toggleVisibility(category.id, true);

    const updated = await AppDataSource.getRepository(NewsCategory).findOneBy({ id: category.id });
    expect(updated?.is_hidden).toBe(true);
  });

  it('should find hidden categories', async () => {
    const hidden = await NewsCategoryRepository.findHidden();
    expect(hidden.some(cat => cat.is_hidden)).toBe(true);
  });
});
