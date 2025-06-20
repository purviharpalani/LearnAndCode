import readlineSync from 'readline-sync';
import { httpClient } from '../utils/httpClient';
import { sessionManager } from '../utils/sessionManager';

export async function loginUser() {
  const email = readlineSync.questionEMail('Email: ');
  const password = readlineSync.question('Password: ', { hideEchoBack: true });

  try {
    const res = await httpClient.post('/auth/login', { email, password });
    sessionManager.setSession(res.data);
    console.log(`Logged in as ${res.data.username}`);
  } catch (err: any) {
    console.error('Login Failed:', err.response?.data?.error || err.message);
  }
}
