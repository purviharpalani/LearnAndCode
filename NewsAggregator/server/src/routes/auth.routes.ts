// // src/routes/auth.routes.ts
import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);

export default router;
// auth.routes.ts
// import { Router, Request, Response, NextFunction } from 'express';
// import { UserRepository } from '../repositories/UserRepository';
// import bcrypt from 'bcrypt';

// const router = Router();

// router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     console.log('Signup request received:', req.body);
    
//     const { email, username, password } = req.body;

//     // Validate required fields
//     if (!email || !username || !password) {
//       return res.status(400).json({ 
//         error: 'Email, username, and password are required' 
//       });
//     }

//     // Check if user already exists
//     console.log('Checking if user exists...');
//     const userExists = await UserRepository.exists(email, username);
    
//     if (userExists) {
//       return res.status(409).json({ 
//         error: 'User with this email or username already exists' 
//       });
//     }

//     // Hash password
//     console.log('Hashing password...');
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // Create user
//     console.log('Creating user...');
//     const newUser = await UserRepository.save({
//       email,
//       username,
//       password_hash: hashedPassword,
//       // Add other required fields based on your User entity
//     });

//     console.log('User created successfully:', newUser.id);

//     // Return success (don't return password)
//     const { password_hash: _, ...userResponse } = newUser;
//     res.status(201).json({
//       message: 'User created successfully',
//       user: userResponse
//     });

//   } catch (error) {
//     console.error('Signup error details:', error);
//     console.error('Error stack:', error instanceof Error ? error.stack : 'Unknown error');
    
//     res.status(500).json({ 
//       error: 'Internal server error',
//       details: error instanceof Error ? error.message : 'Unknown error'
//     });
//   }
// });

// export default router;