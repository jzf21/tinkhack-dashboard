import { createClient, SupabaseClient } from '@supabase/supabase-js'


// Load environment variables from the .env file


// Retrieve the Supabase URL and key from environment variables
const supabaseUrl: string = process.env.SUPABASE_URL || ''
const supabaseKey: string = process.env.SUPABASE_KEY || ''

// Initialize Supabase client with the retrieved URL and key
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey)
