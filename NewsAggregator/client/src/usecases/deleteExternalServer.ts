import readlineSync from 'readline-sync';
import { ApiService } from '../services/ApiService';

export async function deleteExternalServer(): Promise<void> {
  try {
    const servers = await ApiService.getAllExternalServers();

    console.log('\n=== External Servers ===');
    servers.forEach((s, idx) => {
      console.log(`${idx + 1}. ${s.name}`);
    });

    const index = readlineSync.questionInt('\nSelect server to delete: ') - 1;
    if (index < 0 || index >= servers.length) {
      console.log('Invalid selection.');
      return;
    }

    const server = servers[index];
    const confirm = readlineSync.keyInYNStrict(`Are you sure you want to delete "${server.name}"?`);
    if (!confirm) {
      console.log('Deletion cancelled.');
      return;
    }

    await ApiService.deleteExternalServer(server.id);
    console.log(`"${server.name}" deleted successfully.`);
  } catch (err: any) {
    console.error('Failed to delete server:', err.message);
  }
}
