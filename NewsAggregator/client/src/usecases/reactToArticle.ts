import readlineSync from 'readline-sync';
import { httpClient } from '../utils/httpClient';

export async function reactToArticle(): Promise<void> {
  const articleId = readlineSync.questionInt('Enter Article ID to react: ');
  const reaction = readlineSync.keyInSelect(['like', 'dislike'], 'Choose your reaction:', { cancel: false });
  const reactionType = ['like', 'dislike'][reaction];

  try {
    await httpClient.post('/articles/react', {
      articleId,
      reaction: reactionType
    });
    console.log(`Successfully recorded your ${reactionType}.`);
  } catch (err: any) {
    console.error('Error reacting to article:', err.response?.data?.error || err.message);
  }
}
