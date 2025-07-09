
import readlineSync from 'readline-sync';
import { ApiService } from '../services/ApiService';
import { Validator } from '../utils/validator';

export async function updateServerDetails(): Promise<void> {
  const id = readlineSync.questionInt('Enter External Server ID: ');

  if (!Validator.isPositiveNumber(id)) {
    console.log('Invalid Server ID.');
    return;
  }

  const apiKey = readlineSync.question('Enter updated API key: ').trim();

  if (!Validator.isNonEmptyString(apiKey)) {
    console.log('API Key cannot be empty.');
    return;
  }

  try {
    await ApiService.updateExternalServer(id, { api_key: apiKey });
    console.log('Server API key updated successfully.');
  } catch (err: any) {
    console.error('Failed to update server:', err.message);
  }
}
