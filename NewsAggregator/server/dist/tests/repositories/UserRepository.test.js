"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const UserRepository_1 = require("../../repositories/UserRepository");
const db_1 = require("../../config/db");
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
        db_1.AppDataSource.getRepository.mockReturnValue(mockRepo);
        jest.clearAllMocks();
    });
    it('should return true if user with email or username exists', () => __awaiter(void 0, void 0, void 0, function* () {
        mockRepo.findOne.mockResolvedValue({ id: 1 });
        const exists = yield UserRepository_1.UserRepository.existsByEmailOrUsername('test@email.com', 'testuser');
        expect(exists).toBe(true);
    }));
    it('should return false if user does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        mockRepo.findOne.mockResolvedValue(null);
        const exists = yield UserRepository_1.UserRepository.existsByEmailOrUsername('no@user.com', 'nouser');
        expect(exists).toBe(false);
    }));
});
