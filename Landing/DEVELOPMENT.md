# CampusTwin Authentication System - Setup & Development

## Prerequisites

- Node.js 20.9.0 or higher
- MongoDB Atlas account (or local MongoDB)
- Clerk account with separate apps for Student and Professor roles

## Environment Setup

### 1. Clerk Configuration

Create two separate Clerk applications:
- **Student App**: For student authentication
- **Professor/Faculty App**: For faculty authentication

Copy the keys from Clerk Dashboard:
- Publishable keys (starts with `pk_`)
- Secret keys (starts with `sk_`)

### 2. Update .env.local

Edit `.env.local` with your actual credentials:

```env
# Clerk - Student App
VITE_CLERK_STUDENT_PUBLISHABLE_KEY=pk_test_YOUR_STUDENT_KEY
CLERK_STUDENT_SECRET_KEY=sk_test_YOUR_STUDENT_SECRET

# Clerk - Professor App (optional, can use same app)
VITE_CLERK_PROFESSOR_PUBLISHABLE_KEY=pk_test_YOUR_PROFESSOR_KEY
CLERK_SECRET_KEY=sk_test_YOUR_SHARED_SECRET

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
MONGO_DB_NAME=campustwin

# Server & Frontend
VITE_API_BASE_URL=http://localhost:4000/api
SERVER_PORT=4000
FRONTEND_ORIGIN=http://localhost:5173
```

### 3. Install Dependencies

```bash
npm install
```

## Running Development Environment

### Terminal 1: Start the Frontend (Vite)

```bash
npm run dev
```

Frontend will be available at: `http://localhost:5173`

### Terminal 2: Start the Backend (Express Server)

```bash
npm run dev:server
```

Backend will be running at: `http://localhost:4000`

## Authentication Flow

### Student Login Flow
1. User clicks "Get Started" on landing page
2. Selects "Student" role
3. Completes Clerk sign-up/sign-in
4. Backend creates MongoDB student profile with:
   - Roll number
   - College password (hashed)
   - Department, year, section
   - Security questions (hashed answers)
5. User redirected to Student Dashboard

### Professor Login Flow
1. User clicks "Get Started" on landing page
2. Selects "Faculty" role
3. Completes Clerk sign-up/sign-in with separate Clerk app
4. Backend creates MongoDB professor profile with:
   - Employee ID
   - Department
   - Designation
5. User redirected to Faculty Dashboard

## API Endpoints

All endpoints require Clerk authentication (Bearer token).

### Student Endpoints
- `POST /api/auth/student/register` - Register new student
- `POST /api/auth/student/verify-credentials` - Verify roll number + password
- `POST /api/auth/student/forgot-password` - Get security questions
- `POST /api/auth/student/verify-security-answers` - Verify security answers
- `POST /api/auth/student/reset-password` - Reset password

### Professor Endpoints
- `POST /api/auth/professor/register` - Register new professor
- `GET /api/auth/session-status` - Check authenticated session

## File Structure

```
Landing/
├── src/
│   ├── components/
│   │   ├── LoginPortal.tsx          # Role selection & Clerk integration
│   │   ├── StudentPortal.tsx        # Student dashboard
│   │   ├── FacultyPortal.tsx        # Faculty dashboard
│   │   └── ...
│   ├── lib/
│   │   ├── api.ts                   # Frontend API helpers
│   │   ├── supabase.ts              # Supabase/mock auth (legacy)
│   │   └── utils.ts
│   ├── App.tsx                      # Main app routing & Clerk provider
│   └── main.tsx
├── server/
│   ├── index.js                     # Express server entry
│   ├── authRoutes.js                # Auth API routes
│   └── mongoClient.js               # MongoDB connection
├── .env                             # Default environment config
├── .env.local                       # Local overrides (gitignored)
└── package.json
```

## Security Notes

- All passwords are hashed with bcrypt (SALT_ROUNDS=12)
- Security question answers are hashed (never stored in plaintext)
- Clerk handles session token verification
- Rate limiting enabled on all routes (120 requests per 15 minutes)
- CORS restricted to FRONTEND_ORIGIN

## Troubleshooting

### Build errors
```bash
npm run build
```

### Clear cache
```bash
rm -rf node_modules dist
npm install
npm run build
```

### MongoDB connection issues
- Verify MONGODB_URI is correct
- Check MongoDB Atlas IP whitelist includes your IP
- Ensure MONGO_DB_NAME matches your database name

### Clerk authentication not working
- Verify CLERK_SECRET_KEY is set in .env.local
- Check Clerk Dashboard for webhook events
- Ensure publishable keys match your Clerk app

## Production Deployment

1. Build frontend:
   ```bash
   npm run build
   ```

2. Set environment variables on hosting platform

3. Run backend server:
   ```bash
   npm run dev:server
   ```

4. Serve frontend static files from `dist/` directory

## Next Steps

- [ ] Implement email verification
- [ ] Add 2FA for security
- [ ] Create admin dashboard
- [ ] Set up webhooks for Clerk events
- [ ] Implement audit logging
- [ ] Add profile completion flow
