// @ts-nocheck
import 'jest';
import { NewsFetchJobService } from '../../jobs/services/NewsFetchJobService';
import { NewsService } from '../../modules/news/services/NewsService';

jest.mock('../../src/modules/news/services/NewsService');

describe('NewsFetchJobService', () => {
  it('should call fetchFromAllSources()', async () => {
    const mockFetch = jest.fn();
    (NewsService as jest.Mock).mockImplementation(() => ({
      fetchFromAllSources: mockFetch
    }));

    const jobService = new NewsFetchJobService();
    await jobService.run();

    expect(mockFetch).toHaveBeenCalled();
  });
});
