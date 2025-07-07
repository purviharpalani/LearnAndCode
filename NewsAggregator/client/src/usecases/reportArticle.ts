import readlineSync from 'readline-sync';
import { ApiService } from '../services/ApiService';
import { Validator } from '../utils/validator';

export async function reportArticle(): Promise<void> {
    const articleId = readlineSync.questionInt('Enter Article ID to report: ');
    const reason = readlineSync.question('Enter reason for reporting: ').trim();

    if (!Validator.isPositiveNumber(articleId)) {
        console.log('Invalid article ID.');
        return;
    }

    if (!Validator.isNonEmptyString(reason)) {
        console.log('Reason cannot be empty.');
        return;
    }

    try {
        await ApiService.reportArticle(articleId, reason);
        console.log('Report submitted successfully.');
    } catch (err: any) {
        console.error('Failed to report article:', err.message);
    }
}
