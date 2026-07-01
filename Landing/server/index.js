import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { createClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import authRoutes from './authRoutes.js';
import webhookRoutes from './webhookRoutes.js';
import testRoutes from './testRoutes.js';
import { initSocketServer } from './socketHandler.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const port = process.env.SERVER_PORT || 4000;

const clerkSecretKey =
  process.env.CLERK_SECRET_KEY ||
  process.env.CLERK_STUDENT_SECRET_KEY ||
  process.env.CLERK_FACULTY_SECRET_KEY;

if (!clerkSecretKey) {
  throw new Error('Missing Clerk secret key environment variable. Set CLERK_SECRET_KEY, CLERK_STUDENT_SECRET_KEY, or CLERK_FACULTY_SECRET_KEY.');
}

const clerkAuth = createClerkExpressWithAuth({ secretKey: clerkSecretKey });

// Middleware to parse JSON, preserving the rawBody string for Clerk/svix webhooks signature checks
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// Register Clerk Webhooks first (no Clerk authorization header, uses svix signatures)
app.use('/api/webhooks', webhookRoutes);

// Apply Clerk Authentication Middleware to subsequent routes
app.use(clerkAuth());

// Register API routes
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Initialize Socket.io Server
initSocketServer(httpServer, corsOptions);

httpServer.listen(port, () => {
  console.log(`Smart Campus Server running on http://localhost:${port}`);
});
