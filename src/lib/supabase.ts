import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a function to get the Supabase client
export const getSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }
  return createClient(supabaseUrl, supabaseAnonKey)
}

// Export the client for backward compatibility, but only create it when needed
export const supabase = (() => {
  try {
    return getSupabaseClient()
  } catch (error) {
    // During build time, return a mock client to prevent build failures
    if (typeof window === 'undefined') {
      console.warn('Supabase client not available during build time')
      return null as any
    }
    throw error
  }
})()