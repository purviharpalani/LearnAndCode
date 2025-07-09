// client/usecases/viewServerDetails.ts
import readlineSync from 'readline-sync';
import { ApiService } from '../services/ApiService';
import { Validator } from '../utils/validator';

export async function viewServerDetails(): Promise<void> {
  const id = readlineSync.questionInt('Enter External Server ID: ');

  if (!Validator.isPositiveNumber(id)) {
    console.log('Invalid Server ID.');
    return;
  }

  try {
    const server = await ApiService.getServerById(id);
    console.log(`\n=== Server Details ===`);
    console.log(`ID: ${server.id}`);
    console.log(`Name: ${server.name}`);
    console.log(`Status: ${server.is_active ? 'Active' : 'Inactive'}`);
    console.log(`API Key: ${server.api_key}`);
    console.log(`Last Accessed: ${server.last_accessed}`);
  } catch (err: any) {
    console.error('Failed to fetch external server details:', err.message);
  }
}
