import axios from 'axios';
import readlineSync from 'readline-sync';
import { sessionManager } from '../utils/sessionManager';

export async function saveArticle() {
  const session = sessionManager.getSession();
  const articleId = readlineSync.question('Enter Article ID to save: ');

  try {
    const response = await axios.post(
      'http://localhost:3000/articles/save',
      { articleId: Number(articleId) },
      {
        headers: {
          Authorization: `Session ${session?.sessionToken}`,
        },
      }
    );
    console.log(response.data.message);
  } catch (error: any) {
    console.error('Failed to save article:', error.response?.data?.error || error.message);
  }
}
