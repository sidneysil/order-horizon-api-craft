// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ksrwhomesacpsaroenpu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzcndob21lc2FjcHNhcm9lbnB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMDU3NTQsImV4cCI6MjA2NTY4MTc1NH0.Ox_lS3KI8iLLhv9s_1fnU63XNc6BH3lzVuhdMt1is4M";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);