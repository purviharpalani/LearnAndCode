import readlineSync from 'readline-sync';
import { ApiService } from '../services/ApiService';
import { Validator } from '../utils/validator';

export async function signupUser(): Promise<void> {
  const email = readlineSync.questionEMail('Email: ');
  if (!Validator.isValidEmail(email)) {
    console.log('Invalid email format.');
    return;
    }
  const username = readlineSync.question('Username: ');
  const password = readlineSync.question('Password: ', { hideEchoBack: true });

  try {
    const res = await ApiService.signup({ email, username, password });
    console.log('Account created! Your user ID is:', res.userId);
  } catch (err: any) {
    console.error('Signup failed:', err.message);
  }
}
