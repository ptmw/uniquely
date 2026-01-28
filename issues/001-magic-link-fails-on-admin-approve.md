# Magic Link Fails on Admin Approve

**Type**: Bug
**Priority**: High (blocks core admin flow)
**Effort**: Small
**Status**: Fixed

---

## TL;DR

Admin approval throws "Failed to send magic link" because the API route uses the anon key instead of the service role key.

## Current Behavior

Clicking "Approve" in admin panel → error "Failed to send magic link"

## Expected Behavior

Magic link email sent successfully to the approved user.

## Root Cause

`app/api/admin/approve/route.ts:36` calls `signInWithOtp()` using the anon key (via `lib/supabase.ts`). Server-side auth operations typically require the `SUPABASE_SERVICE_ROLE_KEY` for elevated permissions.

## Other Possible Causes

- `NEXT_PUBLIC_BASE_URL` not set → redirect URL might be malformed
- Redirect URL not whitelisted in Supabase Auth settings (check Dashboard → Authentication → URL Configuration)
- Supabase email rate limiting

## Files to Touch

- `lib/supabase.ts` — add server-side client with service role key
- `app/api/admin/approve/route.ts` — use server client instead of anon client

## Fix Approach

1. Add `SUPABASE_SERVICE_ROLE_KEY` to `.env.local` (get from Supabase Dashboard → Settings → API)
2. Create a separate server-side Supabase client that uses the service role key
3. Use that client in the approve API route for auth operations
