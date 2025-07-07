// client/usecases/deleteExternalServer.ts
import readlineSync from 'readline-sync';
import { ApiService } from '../services/ApiService';
import { Validator } from '../utils/validator';

export async function deleteExternalServer(): Promise<void> {
  const id = readlineSync.questionInt('Enter ID of the server to delete: ');

  if (!Validator.isPositiveNumber(id)) {
    console.log('Invalid ID.');
    return;
  }

  const confirm = readlineSync.keyInYN(`Are you sure you want to delete server ID ${id}?`);
  if (!confirm) return;

  try {
    await ApiService.deleteExternalServer(id);
    console.log(`External server ${id} deleted successfully.`);
  } catch (err: any) {
    console.error('Failed to delete external server:', err.message);
  }
}
