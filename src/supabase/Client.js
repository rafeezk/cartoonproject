import { createClient } from "@supabase/supabase-js";

const projectUrl = import.meta.env.VITE_SUPABASE_URL;
const apikey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(projectUrl, apikey)