import { supabase } from "~/utils/supabase";

export default defineEventHandler(async (event) => {
  const { data, error } = await supabase
    .from("project")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
});