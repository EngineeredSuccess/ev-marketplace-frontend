# Supabase OAuth Provider Configuration Fix

## 🎯 Current Status

✅ **Environment variables fixed** - Debug shows `"supabaseKey": "Present"`
❌ **Supabase OAuth provider not configured** - Still getting "Supabase not configured" error

## 🔧 Required Fix: Configure Google OAuth in Supabase

### Step 1: Go to Supabase Auth Providers
1. Visit: https://supabase.com/dashboard/project/nhzalkqwpwcnnggrpqyo/auth/providers
2. Find **Google** in the list of providers
3. Click on **Google** to configure it

### Step 2: Enable and Configure Google Provider
1. **Toggle ON** the Google provider (if it's off)
2. **Add your Google OAuth credentials**:

   **Client ID:**
   ```
   685595895689-f9b8lompdfcsb0drnqlbmdi861hpv0b5.apps.googleusercontent.com
   ```

   **Client Secret:**
   ```
   [Get this from your Google Cloud Console - the secret you configured earlier]
   ```

3. **Click Save**

### Step 3: Verify Redirect URLs in Supabase
1. In the same Google provider settings
2. Make sure the **Redirect URL** shows:
   ```
   https://nhzalkqwpwcnnggrpqyo.supabase.co/auth/v1/callback
   ```
3. This should match what you have in Google Cloud Console

### Step 4: Check Site URL Configuration
1. Go to: https://supabase.com/dashboard/project/nhzalkqwpwcnnggrpqyo/auth/url-configuration
2. Set **Site URL** to:
   ```
   https://www.ivimarket.pl
   ```
3. Add **Additional Redirect URLs**:
   ```
   https://www.ivimarket.pl/auth/callback
   https://www.ivimarket.pl/**
   ```

## 🔍 Common Issues

### Issue 1: Google Provider Not Enabled
- **Symptom**: "Provider not enabled" error
- **Fix**: Toggle ON the Google provider in Supabase

### Issue 2: Missing Client ID/Secret
- **Symptom**: "Invalid client credentials" error
- **Fix**: Copy Client ID and Secret from Google Cloud Console to Supabase

### Issue 3: Incorrect Redirect URL
- **Symptom**: "redirect_uri_mismatch" error
- **Fix**: Ensure redirect URLs match between Google Cloud Console and Supabase

## 📋 Verification Steps

After configuration:
1. **Test Google OAuth**:
   - Click "Kontynuuj z Google"
   - Should redirect to Google login (no error popup)
   - After Google login, should return to your site

2. **Check for Success**:
   - No more "Supabase not configured" error
   - Successful redirect to Google
   - User authenticated after Google login

## 🎯 Expected Flow

1. User clicks "Kontynuuj z Google" ✅
2. Redirects to Google OAuth ✅
3. User logs in with Google ✅
4. Google redirects to Supabase callback ✅
5. Supabase redirects to your site ✅
6. User is logged in ✅

## 🚨 If Still Not Working

If you still get errors after configuring:
1. **Check Supabase logs**: Go to Logs section in Supabase dashboard
2. **Verify Google Cloud Console**: Ensure both redirect URIs are added
3. **Double-check credentials**: Client ID and Secret must match exactly

The environment variables are now working, so this OAuth provider configuration should be the final step to make Google authentication work!