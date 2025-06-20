import readlineSync from 'readline-sync';
import { httpClient } from '../utils/httpClient';

export async function signupUser() {
  console.log('\n=== Sign Up ===');

  const username = readlineSync.question('Username: ');
  const email = readlineSync.questionEMail('Email: ');
  const password = readlineSync.question('Password: ', { hideEchoBack: true });
  const role = readlineSync.question('Role (user/admin): ');

  try {
    const response = await httpClient.post('/auth/signup', {
      username,
      email,
      password,
      role
    });

    console.log('Signup Success:', response.data);
  } catch (err: any) {
    if (err.response) {
      console.error('Signup Failed:', err.response.data.error);
    } else {
      console.error('Network/Error:', err.message);
    }
  }
}
