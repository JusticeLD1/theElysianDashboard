import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// The 'export' keyword on this line is the crucial part
export const supabase = createClient(supabaseUrl, supabaseAnonKey)