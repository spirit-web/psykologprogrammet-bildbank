import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jxhmuucbxxulvpdwgspk.supabase.co";

const supabaseKey =
"sb_publishable_pNZSsnwsOImyElR45K5UTw_CiBgfd0y";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);