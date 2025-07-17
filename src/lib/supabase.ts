import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a function to get the Supabase client
export const getSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables:', {
      url: supabaseUrl ? 'present' : 'missing',
      key: supabaseAnonKey ? 'present' : 'missing'
    })
    throw new Error('Missing Supabase environment variables. Please check your Vercel environment configuration.')
  }
  return createClient(supabaseUrl, supabaseAnonKey)
}

// Create a mock client for when environment variables are missing
const createMockClient = () => ({
  auth: {
    signInWithOAuth: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
    signInWithOtp: () => Promise.resolve({ error: { message: 'Supabase not configured' } }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signOut: () => Promise.resolve({ error: null })
  },
  from: () => ({
    select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) }) }),
    insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) }) }),
    update: () => ({ eq: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) }) }) })
  })
})

// Export the client for backward compatibility
export const supabase = (() => {
  try {
    return getSupabaseClient()
  } catch (error) {
    // During build time or when env vars are missing, return a mock client
    if (typeof window === 'undefined') {
      console.warn('Supabase client not available during build time')
      return null as any
    }
    console.warn('Supabase environment variables not configured, using mock client')
    return createMockClient() as any
  }
})()