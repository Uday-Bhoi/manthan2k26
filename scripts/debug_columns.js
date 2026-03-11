
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugSchema() {
  console.log('Fetching one event to check columns...');
  const { data: event, error: eventErr } = await supabase.from('events').select('*').limit(1).single();
  if (eventErr) console.error('Events error:', eventErr);
  else console.log('Event columns:', Object.keys(event));

  console.log('Fetching one rate limit to check columns...');
  const { data: rl, error: rlErr } = await supabase.from('rate_limits').select('*').limit(1).single();
  if (rlErr) {
      if (rlErr.code === 'PGRST116') console.log('rate_limits table is empty, cannot check columns easily via select.');
      else console.error('rate_limits error:', rlErr);
  } else {
      console.log('rate_limits columns:', Object.keys(rl));
      console.log('rate_limits ID value:', rl.id, typeof rl.id);
  }
}

debugSchema().catch(console.error);
