# Uniquely - Quick Setup Guide

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- Git initialized in this directory

## Quick Start (5 minutes)

### 1. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to initialize (takes ~2 minutes)
3. Go to **SQL Editor** in the Supabase dashboard
4. Copy the entire contents of `supabase/migrations/001_waitlist.sql`
5. Paste into SQL Editor and click **Run**

### 2. Enable Magic Link Authentication

1. In Supabase dashboard, go to **Authentication** > **Providers**
2. Make sure **Email** is enabled
3. **IMPORTANT:** Disable "Confirm email" for testing (you can re-enable later)
4. Click **Save**

### 3. Get Your Supabase Credentials

1. Go to **Settings** > **API** in Supabase dashboard
2. Copy your **Project URL** (looks like `https://xxx.supabase.co`)
3. Copy your **anon/public** key (starts with `eyJ...`)

### 4. Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in your values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_ADMIN_PASSWORD=admin123
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 5. Install Dependencies & Run

```bash
npm install
npm run dev
```

Visit **http://localhost:3000**

## Testing the Complete Flow

### Test 1: Waitlist Signup
1. Visit http://localhost:3000
2. Fill out the form with your email
3. Submit
4. You should see success message

### Test 2: Check Supabase
1. Go to Supabase dashboard > **Table Editor** > `waitlist`
2. You should see your email with status "pending"

### Test 3: Admin Panel
1. Visit http://localhost:3000/admin
2. Enter password: `admin123`
3. You should see your signup in the table

### Test 4: Approve & Magic Link
1. In admin panel, click **Approve** on your signup
2. Check your email inbox (and spam folder!)
3. Click the magic link in the email
4. You should be redirected to http://localhost:3000/app
5. You should see the welcome page

### Test 5: Session Persistence
1. Close the browser tab
2. Visit http://localhost:3000/app again
3. You should still be logged in

## Troubleshooting

### "Missing Supabase environment variables" error
- Make sure you created `.env.local` (not just `.env.example`)
- Restart the dev server after creating `.env.local`

### Magic link not received
- Check spam folder
- Go to Supabase dashboard > **Authentication** > **Logs** to see if email was sent
- Make sure "Confirm email" is disabled in Supabase Auth settings
- Supabase's default SMTP has rate limits - wait a minute and try again

### Magic link says "invalid token"
- Links expire after 1 hour
- Each link can only be used once
- Request a new one from admin panel

### Admin password not working
- Make sure `NEXT_PUBLIC_ADMIN_PASSWORD` is set in `.env.local`
- Default is `admin123`
- Restart dev server after changing

### TypeScript errors
- Run `npm install` to ensure all dependencies are installed
- Try `rm -rf .next && npm run dev` to clear Next.js cache

## Next Steps

### Before Deploying to Production

1. **Change admin password** in `.env.local`
2. **Set up custom domain** for your Netlify deployment
3. **Update Supabase redirect URLs**:
   - Go to Supabase > Authentication > URL Configuration
   - Add your production domain: `https://yourdomain.com/api/auth/callback`
4. **Customize email templates** in Supabase > Authentication > Email Templates
5. **Set up custom SMTP** (optional) for better email deliverability

### Deploy to Vercel

See [README.md](README.md) for full deployment instructions.

## File Structure Quick Reference

```
uniquely/
├── app/
│   ├── page.tsx              # Main splash page
│   ├── admin/page.tsx        # Admin panel
│   ├── app/page.tsx          # Post-login app page
│   └── api/
│       ├── waitlist/         # Signup endpoint
│       ├── admin/approve/    # Approval endpoint
│       └── auth/callback/    # Magic link handler
├── components/
│   ├── LetterHero.tsx        # Mark's letter
│   ├── WaitlistForm.tsx      # Signup form
│   └── AdminTable.tsx        # Admin table
└── supabase/
    └── migrations/           # Database setup SQL
```

## Support

Questions? Check out the full [README.md](README.md) or reach out!
