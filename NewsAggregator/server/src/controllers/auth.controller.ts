// // // src/controllers/auth.controller.ts
// // import { Request, Response } from 'express';
// // import bcrypt from 'bcryptjs';
// // import { v4 as uuidv4 } from 'uuid';
// // import { AppDataSource } from '../data-source';
// // import { User } from '../entities/User';
// // import { UserSession } from '../entities/UserSession';
// // import { UserRepository } from '../repositories/UserRepository';

// // const sessionRepo = AppDataSource.getRepository(UserSession);

// // export class AuthController {
// //     static async signup(req: Request, res: Response) {
// //     const { email, username, password, role } = req.body;

// //     try {
// //         const existing = await UserRepository.exists(email, username);

// //         if (existing) {
// //         res.status(400).json({ error: 'User already exists' });
// //         return;
// //         }

// //         const password_hash = await bcrypt.hash(password, 10);
// //         const user = UserRepository.create({ email, username, password_hash, role });
// //         await UserRepository.save({
// //             email,
// //             username,
// //             password_hash,
// //             role,});

// //         res.status(201).json({ message: 'User created successfully' });
// //     } catch (err) {
// //         console.error('[SIGNUP ERROR]', err);
// //         res.status(500).json({ error: 'Internal server error' });
// //     }
// // }
// import { Request, Response } from 'express';
// import bcrypt from 'bcryptjs';
// import { v4 as uuidv4 } from 'uuid';
// import { AppDataSource } from '../data-source'; // Fixed import path
// import { User } from '../entities/User';
// import { UserSession } from '../entities/UserSession';
// import { UserRepository } from '../repositories/UserRepository';

// export class AuthController {
//   // Get session repository dynamically instead of at module level
//   private static getSessionRepo() {
//     return AppDataSource.getRepository(UserSession);
//   }

//   static async signup(req: Request, res: Response) {
//     const { email, username, password, role } = req.body;

//     try {
//       console.log('Signup request:', { email, username, role }); // Debug log

//       // Validate required fields
//       if (!email || !username || !password) {
//         res.status(400).json({ error: 'Email, username, and password are required' });
//         return;
//       }

//       const existing = await UserRepository.exists(email, username);

//       if (existing) {
//         res.status(400).json({ error: 'User already exists' });
//         return;
//       }

//       const password_hash = await bcrypt.hash(password, 10);
      
//       // Create and save user
//       const savedUser = await UserRepository.save({
//         email,
//         username,
//         password_hash, // Make sure your User entity has this field
//         role: role || 'user', // Default role if not provided
//       });

//       console.log('User created successfully:', savedUser.id); // Debug log

//       res.status(201).json({ 
//         message: 'User created successfully',
//         userId: savedUser.id 
//       });
//     } catch (err) {
//       console.error('[SIGNUP ERROR]', err);
//       console.error('Error details:', err instanceof Error ? err.message : 'Unknown error');
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }


// //   static async login(req: Request, res: Response): Promise<void> {
// //   const { email, password } = req.body;

// //   try {
// //     const user = await UserRepository.findOne({ email });

// //     if (!user || !user.is_active) {
// //       res.status(401).json({ error: 'Invalid credentials' });
// //       return;
// //     }

// //     const isMatch = await bcrypt.compare(password, user.password_hash);
// //     if (!isMatch) {
// //       res.status(401).json({ error: 'Invalid credentials' });
// //       return;
// //     }

// //     const sessionToken = uuidv4();
// //     const session = sessionRepo.create({ session_token: sessionToken, user });
// //     await sessionRepo.save(session);

// //     res.json({
// //       userId: user.id,
// //       username: user.username,
// //       role: user.role,
// //       sessionToken,
// //     });
// //   } catch (err) {
// //     console.error('[LOGIN ERROR]', err);
// //     res.status(500).json({ error: 'Internal server error' });
// //   }
// // }
// // }
// static async login(req: Request, res: Response): Promise<void> {
//     const { email, password } = req.body;

//     try {
//       console.log('Login attempt for:', email); // Debug log

//       if (!email || !password) {
//         res.status(400).json({ error: 'Email and password are required' });
//         return;
//       }

//       const user = await UserRepository.findOne({ email });

//       if (!user || !user.is_active) {
//         res.status(401).json({ error: 'Invalid credentials' });
//         return;
//       }

//       const isMatch = await bcrypt.compare(password, user.password_hash);
//       if (!isMatch) {
//         res.status(401).json({ error: 'Invalid credentials' });
//         return;
//       }

//       const sessionToken = uuidv4();
//       const sessionRepo = this.getSessionRepo(); // Get repository dynamically
//       const session = sessionRepo.create({ session_token: sessionToken, user });
//       await sessionRepo.save(session);

//       res.json({
//         userId: user.id,
//         username: user.username,
//         role: user.role,
//         sessionToken,
//       });
//     } catch (err) {
//       console.error('[LOGIN ERROR]', err);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }
// }


// controllers/auth.controller.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { AppDataSource } from '../config/db';
import { User } from '../entities/User';
import { UserSession } from '../entities/UserSession';

export class AuthController {
  static async signup(req: Request, res: Response) {
    const { email, username, password, role } = req.body;

    try {
      console.log('Signup request:', { email, username, role });

      // Validate required fields
      if (!email || !username || !password) {
        res.status(400).json({ error: 'Email, username, and password are required' });
        return;
      }

      // Get User repository directly from AppDataSource
      const userRepo = AppDataSource.getRepository(User);
      console.log('User repository obtained successfully');

      // Check if user already exists
      console.log('Checking if user exists...');
      const existingUser = await userRepo.findOne({
        where: [{ email }, { username }]
      });

      if (existingUser) {
        res.status(400).json({ error: 'User already exists' });
        return;
      }

      console.log('User does not exist, proceeding with creation...');

      // Hash password
      const password_hash = await bcrypt.hash(password, 10);
      console.log('Password hashed successfully');

      // Create user directly with repository
      const newUser = userRepo.create({
        email,
        username,
        password_hash,
        role: role || 'user',
        is_active: true
      });

      console.log('User entity created, saving...');
      const savedUser = await userRepo.save(newUser);
      console.log('User saved successfully:', savedUser.id);

      res.status(201).json({ 
        message: 'User created successfully',
        userId: savedUser.id 
      });

    } catch (err) {
      console.error('[SIGNUP ERROR]', err);
      console.error('Error name:', err?.constructor?.name);
      console.error('Error message:', (err as Error)?.message);
      console.error('Error stack:', (err as Error)?.stack);
      
      res.status(500).json({ 
        error: 'Internal server error',
        details: err instanceof Error ? err.message : 'Unknown error'
      });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
      }

      // Get User repository directly
      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOne({ where: { email } });

      if (!user || !user.is_active) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      const sessionToken = uuidv4();
      const sessionRepo = AppDataSource.getRepository(UserSession);
      const session = sessionRepo.create({ session_token: sessionToken, user, expires_at: new Date(Date.now() + 2 * 60 * 60 * 1000), is_active: true });
      await sessionRepo.save(session);

      res.json({
        userId: user.id,
        username: user.username,
        role: user.role,
        sessionToken,
      });
    } catch (err) {
      console.error('[LOGIN ERROR]', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}