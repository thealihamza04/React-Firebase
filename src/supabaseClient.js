import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABSE_PROJECT_ID;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_PUBLIC_KEY;

console.log("supabaseUrl: ", supabaseUrl, "  supabaseAnonKey:", supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);