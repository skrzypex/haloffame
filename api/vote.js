import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL = "https://qbdlvfnffitqxvrbigxz.supabase.co",  
  process.env.SUPABASE_SERVICE_ROLE_KEY = "sb_secret_gusk1PA8OJeU5agDCCAEQg_CRWG53vH"
);

export default async function handler(req, res) {
  if(req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  const { participant, category } = req.body;
  if(!participant || !category) return res.status(400).json({error:'Brak danych'});

  try{
    const { data, error } = await supabase
      .from('votes')
      .update({ votes: supabase.raw('votes + 1') })
      .eq('participant', participant)
      .eq('category', category);

    if(error) throw error;
    res.status(200).json({ success: true });
  } catch(err){
    res.status(500).json({ error: err.message });
  }
}
