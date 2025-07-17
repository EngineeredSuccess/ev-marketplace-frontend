# Authentication Issues Fix Guide

## 🚨 Critical Issues Found

### 1. Supabase Project Mismatch
- **Local Environment**: `nhzalkqwpwcnnggrpqyo.supabase.co`
- **Production Environment**: `ocytznbgqshklzafjbjj.supabase.co`

**This means your production site is using a different Supabase project!**

### 2. OAuth Providers Not Configured
- Google OAuth redirects to broken URL
- Apple OAuth does nothing
- Magic links not sending emails

## 🔧 Required Fixes

### Step 1: Fix Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Navigate to your project settings
3. Go to Environment Variables
4. Update these variables to match your local `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://nhzalkqwpwcnnggrpqyo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oemFsa3F3cHdjbm5nZ3JwcXlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MDY1MzksImV4cCI6MjA2NzQ4MjUzOX0.IrnhqEIHfyp6ubvOcK9bgg2uDCatz5-WEUj13mpTX30
```

4. Redeploy your application after updating environment variables

### Step 2: Configure OAuth in Supabase Dashboard

#### Google OAuth Setup:
1. Go to https://supabase.com/dashboard/project/nhzalkqwpwcnnggrpqyo/auth/providers
2. Enable Google provider
3. Add these redirect URLs:
   - `https://nhzalkqwpwcnnggrpqyo.supabase.co/auth/v1/callback`
   - `https://www.ivimarket.pl/auth/callback`
4. Configure Google OAuth credentials:
   - Get Client ID and Client Secret from Google Cloud Console
   - Add authorized redirect URIs in Google Console:
     - `https://nhzalkqwpwcnnggrpqyo.supabase.co/auth/v1/callback`

#### Apple OAuth Setup:
1. In the same Supabase Auth providers page
2. Enable Apple provider
3. Configure Apple OAuth credentials from Apple Developer Console
4. Add redirect URLs similar to Google

### Step 3: Configure Email Settings

1. Go to https://supabase.com/dashboard/project/nhzalkqwpwcnnggrpqyo/auth/templates
2. Configure email templates for magic links
3. Set up SMTP settings or use Supabase's default email service
4. Test magic link functionality

### Step 4: Update Site URL in Supabase

1. Go to https://supabase.com/dashboard/project/nhzalkqwpwcnnggrpqyo/auth/url-configuration
2. Set Site URL to: `https://www.ivimarket.pl`
3. Add redirect URLs:
   - `https://www.ivimarket.pl/auth/callback`
   - `https://www.ivimarket.pl/**`

## 🧪 Testing Steps

After making these changes:

1. **Test Google OAuth**:
   - Click "Continue with Google"
   - Should redirect to Google login
   - After login, should return to your site with user authenticated

2. **Test Apple OAuth**:
   - Click "Continue with Apple"
   - Should redirect to Apple login
   - After login, should return to your site

3. **Test Magic Link**:
   - Enter email address
   - Click send magic link
   - Check email for magic link
   - Click link to authenticate

## 🔍 Debugging

If issues persist:

1. Check browser console for errors
2. Check Supabase logs in dashboard
3. Verify environment variables are correctly set in Vercel
4. Ensure OAuth credentials are correctly configured

## 📝 Current Code Status

The authentication code is properly implemented and ready to work once the configuration issues are resolved:

- ✅ OAuth service with proper error handling
- ✅ Magic link service
- ✅ Callback handling with retry logic
- ✅ Auth state management
- ✅ TypeScript types aligned
- ✅ Phone verification removed as requested

The issue is purely configuration-related, not code-related.