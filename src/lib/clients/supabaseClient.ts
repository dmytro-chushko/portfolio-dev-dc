import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
const supabaseApiKey = process.env.SUPABASE_ANON_API_KEY;
const storageClient = createClient(supabaseUrl, supabaseApiKey);

export default storageClient;
