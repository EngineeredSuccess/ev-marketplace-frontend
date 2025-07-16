import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

if ((!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder')) && typeof window !== 'undefined') {
  console.warn('Missing Supabase environment variables. Some features may not work.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)