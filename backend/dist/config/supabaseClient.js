"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabaseAdmin = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
if (!supabaseUrl) {
    console.error("SUPABASE_URL enviroment variable is not set");
}
if (!supabaseServiceRoleKey) {
    console.error("SUPBASE_SERVICE_ROLE_KEY enviroment variable is not set");
}
exports.supabaseAdmin = (0, supabase_js_1.createClient)(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});
if (supabaseUrl && supabaseServiceRoleKey) {
    console.log("Supabase admin client initialize for backend operations,");
}
