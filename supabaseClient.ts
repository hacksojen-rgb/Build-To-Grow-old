
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

// Real credentials provided by the user
const supabaseUrl = 'https://vdbzacihjdbmeidtddxs.supabase.co';
const supabaseAnonKey = 'sb_publishable_zFZhTikK53znkTPPyHWoww_icVul99S';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
