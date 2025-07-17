# Google OAuth Setup for Supabase

## Current Issue
The Google OAuth flow is not working properly - it shows a popup but then falls back to a manual registration form instead of completing the OAuth authentication.

## Required Supabase Configuration

### 1. Enable Google Provider in Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to Authentication > Providers
3. Enable Google provider
4. Configure the following settings:

### 2. Google OAuth Credentials
You need to set up Google OAuth credentials in Google Cloud Console:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials > Create Credentials > OAuth 2.0 Client ID
5. Set Application type to "Web application"
6. Add authorized redirect URIs:
   - `https://nhzalkqwpwcnnggrpqyo.supabase.co/auth/v1/callback`
   - `http://localhost:3000/auth/callback` (for development)

### 3. Supabase Configuration
In your Supabase dashboard under Authentication > Providers > Google:
- Client ID: [Your Google OAuth Client ID]
- Client Secret: [Your Google OAuth Client Secret]

### 4. Site URL Configuration
In Supabase Authentication > Settings:
- Site URL: `https://ivimarket.pl` (production)
- Additional redirect URLs:
  - `http://localhost:3000/auth/callback`
  - `https://ivimarket.pl/auth/callback`

## Testing Steps
1. Ensure Google provider is enabled in Supabase
2. Verify OAuth credentials are correctly configured
3. Check that redirect URLs match exactly
4. Test the flow with console logging enabled

## Common Issues
- Redirect URI mismatch
- Google provider not enabled in Supabase
- Missing or incorrect OAuth credentials
- Site URL not configured properly