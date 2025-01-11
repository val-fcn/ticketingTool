import { supabase } from "~/utils/supabase";

export default defineEventHandler(async (event: any) => {
  const { data, error } = await supabase
    .from("ticket")
    .select("*")
    .eq("id", event.context.params.id);
  if (error) throw error;
  return data;
  });