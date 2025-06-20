// src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/db';

import authRoutes from './routes/auth.routes';
import articleRoutes from './routes/article.routes';
import { startNewsFetcherJob } from './jobs/newsFetcherJob';

dotenv.config();

const app = express();

app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/articles', articleRoutes);

// Start Express server only (no DB)
const PORT = process.env.PORT || 3000;
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`[Server] Listening on port ${PORT}`);
  });
});