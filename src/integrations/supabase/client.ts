/*

// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://izdpperqgukkzpnkrxfw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6ZHBwZXJxZ3Vra3pwbmtyeGZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxMjM5MzksImV4cCI6MjA1MzY5OTkzOX0.vyjMNBb3btjSRUdA1EP8FVn5VshpVKc6DUMmzmM_ALo";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

//const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
//export default supabase;
*/

// supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://izdpperqgukkzpnkrxfw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6ZHBwZXJxZ3Vra3pwbmtyeGZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxMjM5MzksImV4cCI6MjA1MzY5OTkzOX0.vyjMNBb3btjSRUdA1EP8FVn5VshpVKc6DUMmzmM_ALo';

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };