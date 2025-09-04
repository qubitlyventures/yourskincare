import { createClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl) {
  throw new Error('Missing VITE_SUPABASE_URL environment variable')
}

if (!supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      waitlist_users: {
        Row: {
          id: string
          name: string | null
          email: string
          country: string | null
          skin_type: string | null
          concerns: string[] | null
          signup_date: string
          source: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name?: string | null
          email: string
          country?: string | null
          skin_type?: string | null
          concerns?: string[] | null
          signup_date?: string
          source?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          email?: string
          country?: string | null
          skin_type?: string | null
          concerns?: string[] | null
          signup_date?: string
          source?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}