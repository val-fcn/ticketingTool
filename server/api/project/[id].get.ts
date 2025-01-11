import { supabase } from "~/utils/supabase";


export default defineEventHandler(async (event) => {
  const { data, error } = await supabase
    .from('project')
    .select('*')
    .eq('id', event.context.params?.id || {})
    .single()
  
  if (error) throw error;
  return data
})