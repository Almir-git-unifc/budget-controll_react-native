import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(
    'https://fake-simulate-company.supabase.co', 
    'fake-sInR5cCI6IkpXVCJ9.hdynMn0.NxXJi_AhgdtqcF-p0o-public-anon-key'
);