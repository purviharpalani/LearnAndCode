import readlineSync from 'readline-sync';
import { ApiService } from '../services/ApiService';
import { sessionManager } from '../session/sessionManager';

export async function loginUser(): Promise<void> {
  const email = readlineSync.questionEMail('Email: ');
  const password = readlineSync.question('Password: ', { hideEchoBack: true });

  try {
    const user = await ApiService.login({ email, password });
    sessionManager.setSession(user);
    console.log(`\nWelcome, ${user.username}!`);
  } catch (err: any) {
    console.error('Login failed:', err.message);
  }
}
