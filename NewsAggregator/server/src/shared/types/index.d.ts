// src/shared/types/index.d.ts
import { User } from '../../../entities/User';
import { JwtPayload } from '../../middlewares/auth.middleware';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
