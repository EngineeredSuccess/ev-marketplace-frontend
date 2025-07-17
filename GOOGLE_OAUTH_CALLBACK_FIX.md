# Google OAuth Callback URL Fix

## 🚨 Issue Identified

The error "Google OAuth error: Supabase not configured" occurs because the Google OAuth redirect URLs are not properly configured.

## 🔧 Required Fix

### Step 1: Add Redirect URIs in Google Cloud Console

In your Google Cloud Console (as shown in your screenshot), you need to add **both** callback URLs:

**Current (I can see you have):**
```
https://nhzalkqwpwcnnggrpqyo.supabase.co/auth/v1/callback
```

**Missing (you need to add):**
```
https://www.ivimarket.pl/auth/callback
```

### Step 2: Complete Google Cloud Console Configuration

1. Go to Google Cloud Console → APIs & Services → Credentials
2. Click on your OAuth 2.0 Client ID
3. In the "Authorized redirect URIs" section, add:
   ```
   https://www.ivimarket.pl/auth/callback
   ```
4. Click "Save"

### Step 3: Verify Supabase Configuration

In your Supabase dashboard:

1. Go to: https://supabase.com/dashboard/project/nhzalkqwpwcnnggrpqyo/auth/providers
2. Click on Google provider
3. Make sure these fields are filled:
   - **Client ID**: `685595895689-f9b8lompdfcsb0drnqlbmdi861hpv0b5.apps.googleusercontent.com` (from your screenshot)
   - **Client Secret**: (the secret from Google Cloud Console)
4. In the redirect URL section, ensure you have:
   ```
   https://www.ivimarket.pl/auth/callback
   ```

### Step 4: Check Site URL in Supabase

1. Go to: https://supabase.com/dashboard/project/nhzalkqwpwcnnggrpqyo/auth/url-configuration
2. Set **Site URL** to: `https://www.ivimarket.pl`
3. Add **Redirect URLs**:
   ```
   https://www.ivimarket.pl/auth/callback
   https://www.ivimarket.pl/**
   ```

## 🧪 Testing After Fix

1. Go to https://www.ivimarket.pl
2. Click "Zaloguj się" (Login)
3. Click "Continue with Google"
4. Should redirect to Google login
5. After Google login, should redirect back to your site

## 🔍 Common Issues

### Issue 1: "redirect_uri_mismatch"
- **Cause**: Missing redirect URI in Google Cloud Console
- **Fix**: Add `https://www.ivimarket.pl/auth/callback` to Google OAuth settings

### Issue 2: "Supabase not configured"
- **Cause**: Missing Client ID/Secret in Supabase
- **Fix**: Copy credentials from Google Cloud Console to Supabase

### Issue 3: "Invalid redirect URL"
- **Cause**: Site URL not set in Supabase
- **Fix**: Set site URL to `https://www.ivimarket.pl` in Supabase

## 📋 Checklist

- [ ] Add `https://www.ivimarket.pl/auth/callback` to Google Cloud Console
- [ ] Verify Client ID/Secret in Supabase Google provider settings
- [ ] Set Site URL to `https://www.ivimarket.pl` in Supabase
- [ ] Add redirect URLs in Supabase URL configuration
- [ ] Test Google OAuth flow

Once these steps are completed, the Google OAuth should work properly.