import axios from 'axios';
import { sessionManager } from '../utils/sessionManager';

export async function viewHeadlines() {
  try {
    const session = sessionManager.getSession();
    if (!session) {
      console.log('No active session. Please log in.');
      return;
    }

    const response = await axios.get('http://localhost:3000/articles', {
      headers: {
        Authorization: `Session ${session.sessionToken}`,
      },
    });

    console.log('\n=== Headlines ===');
    response.data.forEach((article: any) => {
      console.log(`ID: ${article.id}`);
      console.log(`Title: ${article.title}`);
      console.log(`Source: ${article.source}`);
      console.log(`Category: ${article.category}`);
      console.log('---');
    });
  } catch (err: any) {
    console.error('Failed to fetch headlines:', err.response?.data?.error || err.message);
  }
}
