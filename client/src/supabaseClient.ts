// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Access environment variables with `import.meta.env`
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Anon Key:", supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase environment variables are missing or invalid.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
