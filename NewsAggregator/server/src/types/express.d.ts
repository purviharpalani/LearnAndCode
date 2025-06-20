import { User } from '../entities/User'; // adjust path as needed

declare global {
  namespace Express {
    interface Request {
      user?: User;  // or non-optional if you prefer
    }
  }
}