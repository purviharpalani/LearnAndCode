// @ts-nocheck
import { UserRepository } from '../../repositories/UserRepository';
import { AppDataSource } from '../../config/db';
import { User } from '../../entities/User';

jest.mock('../../src/config/db', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

const mockRepo = {
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

describe('UserRepository', () => {
  beforeEach(() => {
    (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepo);
    jest.clearAllMocks();
  });

  it('should return true if user with email or username exists', async () => {
    mockRepo.findOne.mockResolvedValue({ id: 1 });
    const exists = await UserRepository.existsByEmailOrUsername('test@email.com', 'testuser');
    expect(exists).toBe(true);
  });

  it('should return false if user does not exist', async () => {
    mockRepo.findOne.mockResolvedValue(null);
    const exists = await UserRepository.existsByEmailOrUsername('no@user.com', 'nouser');
    expect(exists).toBe(false);
  });
});
