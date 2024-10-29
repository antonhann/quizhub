// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Access environment variables with `import.meta.env`
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY.trim();

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase environment variables are missing or invalid.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
