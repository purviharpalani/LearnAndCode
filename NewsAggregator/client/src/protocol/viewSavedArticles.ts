import axios from 'axios';
import { sessionManager } from '../utils/sessionManager';

export async function viewSavedArticles() {
  const session = sessionManager.getSession();

  try {
    const response = await axios.get('http://localhost:3000/articles/saved', {
      headers: {
        Authorization: `Session ${session?.sessionToken}`,
      },
    });

    console.log('\n=== Saved Articles ===');
    response.data.forEach((article: any) => {
      console.log(`Title: ${article.title}`);
      console.log(`Source: ${article.source}`);
      console.log(`URL: ${article.url}`);
      console.log('---');
    });
  } catch (error: any) {
    console.error('Failed to fetch saved articles:', error.response?.data?.error || error.message);
  }
}
