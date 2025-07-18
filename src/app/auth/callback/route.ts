import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')

  console.log('OAuth callback route handler called')
  console.log('URL:', requestUrl.toString())
  console.log('Code:', code ? 'present' : 'missing')
  console.log('Error:', error)

  if (error) {
    console.error('OAuth error:', error)
    return NextResponse.redirect(`${requestUrl.origin}?error=${error}`)
  }

  if (code) {
    try {
      const cookieStore = cookies()
      const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
      
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (exchangeError) {
        console.error('Code exchange error:', exchangeError)
        return NextResponse.redirect(`${requestUrl.origin}?error=auth_failed`)
      }
      
      console.log('OAuth code exchange successful', data?.user?.email)
      
      // Create a response that redirects to home
      const response = NextResponse.redirect(requestUrl.origin)
      
      // Set a success flag in the URL
      const redirectUrl = new URL(requestUrl.origin)
      redirectUrl.searchParams.set('auth', 'success')
      
      return NextResponse.redirect(redirectUrl.toString())
    } catch (err) {
      console.error('Callback processing error:', err)
      return NextResponse.redirect(`${requestUrl.origin}?error=callback_failed`)
    }
  }

  // No code parameter - redirect to home
  console.log('No code parameter found, redirecting to home')
  return NextResponse.redirect(requestUrl.origin)
}

