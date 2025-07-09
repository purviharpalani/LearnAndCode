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
const NotificationJobService_1 = require("../../jobs/services/NotificationJobService");
const db_1 = require("../../config/db");
const MailService_1 = require("../../infrastructure/mail/MailService");
jest.mock('../../src/config/db', () => ({
    AppDataSource: {
        getRepository: jest.fn(() => ({
            find: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
        })),
    },
}));
jest.mock('../../src/infrastructure/mail/MailService', () => ({
    MailService: {
        send: jest.fn(),
    },
}));
describe('NotificationJobService', () => {
    it('should complete without errors when no users', () => __awaiter(void 0, void 0, void 0, function* () {
        const service = new NotificationJobService_1.NotificationJobService();
        const userRepo = db_1.AppDataSource.getRepository('User');
        userRepo.find.mockResolvedValue([]);
        yield expect(service.run()).resolves.not.toThrow();
    }));
    it('should send mail if articles match', () => __awaiter(void 0, void 0, void 0, function* () {
        const service = new NotificationJobService_1.NotificationJobService();
        const user = {
            id: 1,
            email: 'user@example.com',
            notificationPreferences: [
                { category: 'technology', enabled: true }
            ]
        };
        const article = {
            id: 10,
            category: 'technology',
            title: 'AI Revolution',
            description: 'Big shift',
            url: 'http://example.com',
            created_at: new Date()
        };
        const userRepo = db_1.AppDataSource.getRepository('User');
        const articleRepo = db_1.AppDataSource.getRepository('NewsArticle');
        const notifRepo = db_1.AppDataSource.getRepository('Notification');
        userRepo.find.mockResolvedValue([user]);
        articleRepo.find.mockResolvedValue([article]);
        notifRepo.findOneBy.mockResolvedValue(undefined);
        notifRepo.create.mockImplementation((obj) => obj);
        notifRepo.save.mockResolvedValue(undefined);
        yield service.run();
        expect(MailService_1.MailService.send).toHaveBeenCalledWith('user@example.com', expect.stringContaining('News Digest'), expect.stringContaining(article.title));
    }));
});
