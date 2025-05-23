import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

// Get environment variables
const supabaseUrl = "https://tinijfasueswsfxdoffb.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpbmlqZmFzdWVzd3NmeGRvZmZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MTIyMDIsImV4cCI6MjA2MzQ4ODIwMn0.4leZ7Ycyz7IUGrYoZXTamXqpy3TVyvxUruCiEEyfnhc";

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.",
  );
}

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
