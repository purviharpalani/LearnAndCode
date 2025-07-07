import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { connectToDatabase } from './config/db';
import { NewsFetcherScheduler } from './jobs/schedulers/NewsFetcherScheduler';

dotenv.config();

// import { startNewsFetcherJob } from './jobs/schedulers/NewsFetcherScheduler';
import { Logger } from './infrastructure/logger/Logger';
import { errorHandler } from './middlewares/errorHandler';

// Routes
import authRoutes from './routes/auth.routes';
import articleRoutes from './routes/article.routes';
import adminRoutes from './routes/admin.routes';



const logger = Logger.getInstance();
const app = express();
const PORT = process.env.PORT || 3000;

// Global Middleware
app.use(cors());
app.use(express.json());

// Route Mounting
app.use('/auth', authRoutes);
app.use('/articles', articleRoutes);
app.use('/admin', adminRoutes);

// Global Error Handler
app.use(errorHandler);

// Server Bootstrap
(async () => {
  try {
    await connectToDatabase();

    // Start background jobs (cron, etc.)
    NewsFetcherScheduler.start();

    const server = createServer(app);

    // Production-safe tuning
    server.keepAliveTimeout = 60_000; // 60 seconds
    server.headersTimeout = 65_000;

    server.listen(PORT, () => {
      logger.info(`[Server] Listening on port ${PORT}`);
    });
  } catch (err) {
    logger.error('[Startup Error]', err);
    process.exit(1);
  }
})();
