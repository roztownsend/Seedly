import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";

const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseUrl) {
  console.error("SUPABASE_URL enviroment variable is not set");
}

if (!supabaseServiceRoleKey) {
  console.error("SUPBASE_SERVICE_ROLE_KEY enviroment variable is not set");
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

if (supabaseUrl && supabaseServiceRoleKey) {
  console.log("Supabase admin client initialize for backend operations,");
}
