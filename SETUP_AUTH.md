# Authentication System Setup Guide

This guide details how to set up, configure, and deploy the new Authentication system for Vrushali Desert Spot.

## 1. Environment Variables

Copy the provided `.env.example` to `.env.local` and fill in your actual credentials.

### PostgreSQL (Prisma)
- The system uses Prisma ORM with PostgreSQL.
- You can provision a free Postgres database using Vercel Postgres, Supabase, or Neon.
- Update `DATABASE_URL` with your connection string.

### NextAuth / Auth.js
- Generate a strong `NEXTAUTH_SECRET` by running: `openssl rand -base64 32` or via https://generate-secret.vercel.app/32.

### Google OAuth
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project.
3. Go to **APIs & Services > Credentials**.
4. Create OAuth client ID (Web application).
5. Set Authorized redirect URIs to:
   - Local: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://your-vercel-domain.vercel.app/api/auth/callback/google`
6. Copy the Client ID and Client Secret to your `.env.local`.

### Twilio (Phone OTP)
1. Sign up at [Twilio](https://console.twilio.com/).
2. Get a Twilio phone number.
3. Copy your **Account SID** and **Auth Token**.
4. Put them in `.env.local`.
*(Note: If left empty, the OTP system will fallback to logging the code in the terminal for local development).*

### Resend (Forgot Password)
1. Sign up at [Resend](https://resend.com/).
2. Verify your sending domain.
3. Generate an API Key and add it to `.env.local`.
*(Note: If left empty, the reset links will be logged in the terminal).*

## 2. Database Migrations

Before starting the app, push the schema to your database:

```bash
npx prisma db push
# OR
npx prisma migrate dev --name init
```

## 3. Deployment to Vercel

1. Push your code to GitHub.
2. In the Vercel Dashboard, go to your project **Settings > Environment Variables**.
3. Add ALL the environment variables from your `.env.local`.
4. Trigger a new deployment.
5. In your Google Cloud Console, ensure you add the newly generated Vercel production URL to the OAuth redirect URIs.

## 4. Testing Instructions

- **Sign up via Email**: Navigate to `/register`, create an account, then sign in at `/login`.
- **Sign up via Phone**: Navigate to `/login`, switch to the Phone tab, enter your number, and submit. If Twilio isn't configured, check your terminal for the simulated OTP.
- **Google Sign-In**: Click the "Sign in with Google" button. Ensure `NEXT_PUBLIC_APP_URL` and OAuth URIs are configured properly.
- **Forgot Password**: Click "Forgot password?" on the login screen. Check your email (or terminal) for the reset link.
- **Protected Routes**: Access `/profile`. If not logged in, you will be redirected to `/login`.
