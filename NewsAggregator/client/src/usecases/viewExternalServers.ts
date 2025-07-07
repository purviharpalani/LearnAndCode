import { ApiService } from '../services/ApiService';

export async function viewExternalServers(): Promise<void> {
  try {
    const servers = await ApiService.getExternalServerStatus();
    console.log('\n=== External Servers Status ===');
    servers.forEach((s: any, i: number) => {
      const status = s.is_active ? '✅ Active' : '❌ Inactive';
      console.log(`${i + 1}. ${s.name} - ${status} - Last Accessed: ${s.last_accessed}`);
    });
  } catch (err: any) {
    console.error('Failed to fetch external server status:', err.message);
  }
}
