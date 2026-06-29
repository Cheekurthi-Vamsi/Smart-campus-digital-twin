import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { createClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import authRoutes from './authRoutes.js';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 4000;
const clerkSecretKey =
  process.env.CLERK_SECRET_KEY ||
  process.env.CLERK_STUDENT_SECRET_KEY ||
  process.env.CLERK_FACULTY_SECRET_KEY;

if (!clerkSecretKey) {
  throw new Error('Missing Clerk secret key environment variable. Set CLERK_SECRET_KEY, CLERK_STUDENT_SECRET_KEY, or CLERK_FACULTY_SECRET_KEY.');
}

const clerkAuth = createClerkExpressWithAuth({ secretKey: clerkSecretKey });

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173', credentials: true }));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false,
  })
);
app.use(clerkAuth());

app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(port, () => {
  console.log(`Auth server running on http://localhost:${port}`);
});
