# Uniquely - Splash Page

AI-powered website builder for creators. Build uniquely, not templated.

## Project Overview

This is the splash page and waitlist system for Uniquely. Features:

- **Punk/DIY aesthetic** splash page with Mark Daisy's letter
- **Waitlist signup** with email + optional "what to create" field
- **Admin panel** to review and approve signups
- **Magic link authentication** for approved users
- **Protected /app route** for logged-in users

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS 4
- Supabase (Database + Auth)
- Vercel (Hosting)

## Setup Instructions

### 1. Install Dependencies

```bash
cd /Users/pmw/jomo/uniquely
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In the SQL Editor, run the migration from `supabase/migrations/001_waitlist.sql`
3. Copy your project URL and anon key from Settings > API

### 3. Configure Environment Variables

Create a `.env.local` file:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Enable Magic Link Auth in Supabase

1. Go to Authentication > Providers in Supabase dashboard
2. Enable "Email" provider
3. Disable "Confirm email" (for demo purposes)
4. Save changes

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## User Flow

### 1. Splash Page (/)
- User reads Mark's letter
- Fills out waitlist form (email + optional idea)
- Receives confirmation message

### 2. Admin Panel (/admin)
- Protected with password (set in env var)
- View all signups
- Approve/reject users
- Approved users receive magic link via email

### 3. Magic Link
- User clicks link in email
- Redirects to `/api/auth/callback`
- Creates session and redirects to `/app`

### 4. App Page (/app)
- Protected route (requires auth)
- Shows welcome message
- "Coming soon" placeholder for actual product

## Deployment to Vercel

### 1. Push to Git

```bash
cd /Users/pmw/jomo/uniquely
git init
git add .
git commit -m "Initial commit: Uniquely splash page"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" > "Project"
3. Import your Git repository
4. Vercel will automatically detect Next.js - just click "Deploy"

### 3. Add Environment Variables in Vercel

Go to Project Settings > Environment Variables and add:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
NEXT_PUBLIC_BASE_URL=https://your-site.vercel.app
```

**Important:** After adding env vars, redeploy from the Deployments tab.

### 4. Update Supabase Redirect URLs

1. Go to Supabase dashboard > Authentication > URL Configuration
2. Add your Vercel URL to "Redirect URLs":
   - `https://your-site.vercel.app/api/auth/callback`
   - `http://localhost:3000/api/auth/callback` (for local dev)

### 5. Deploy

Vercel deploys automatically on every push to main. You can also trigger manual deployments from the dashboard.

## File Structure

```
uniquely/
├── app/
│   ├── admin/           # Admin panel page
│   ├── app/             # Post-login app page
│   ├── api/
│   │   ├── waitlist/    # Signup API
│   │   ├── admin/       # Approval API
│   │   └── auth/        # Magic link callback
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Splash page
│   └── globals.css      # Global styles
├── components/
│   ├── LetterHero.tsx   # Mark's letter
│   ├── WaitlistForm.tsx # Signup form
│   └── AdminTable.tsx   # Admin table
├── lib/
│   └── supabase.ts      # Supabase client
├── types/
│   └── database.ts      # Database types
└── supabase/
    └── migrations/      # SQL migrations
```

## Admin Access

Visit `/admin` and enter the password from your `NEXT_PUBLIC_ADMIN_PASSWORD` env var.

Default for local dev: `admin123`

**IMPORTANT:** Change this before deploying to production!

## Testing the Flow

1. Visit splash page → submit email
2. Check Supabase dashboard → verify entry in `waitlist` table
3. Visit `/admin` → approve the user
4. Check email → click magic link
5. Should redirect to `/app` and show welcome page

## Troubleshooting

### Magic links not sending
- Check Supabase email settings in Authentication > Email Templates
- Verify SMTP is configured (Supabase provides default)
- Check spam folder

### Auth callback errors
- Verify `NEXT_PUBLIC_BASE_URL` is set correctly
- Check Supabase redirect URLs include your domain
- Look at browser console for errors

### Admin password not working
- Make sure `NEXT_PUBLIC_ADMIN_PASSWORD` is set in `.env.local`
- Restart dev server after changing env vars

## Next Steps

- [ ] Add custom domain
- [ ] Customize Supabase email templates
- [ ] Add analytics
- [ ] Implement actual product at `/app`
- [ ] Add social sharing meta tags
- [ ] Implement referral system (optional)

## Support

Questions? Reach out to hello@uniquely.com
