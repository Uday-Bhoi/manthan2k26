
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanup() {
  console.log('Starting final database cleanup...');

  // 1. Clear registrations
  console.log('Clearing registrations...');
  const { error: regError } = await supabase
    .from('registrations')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');
  
  if (regError) console.error('Error clearing registrations:', regError);
  else console.log('Successfully cleared registrations.');

  // 2. Clear manual cash entries
  console.log('Clearing manual cash entries...');
  const { error: cashError } = await supabase
    .from('manual_cash_entries')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');
  
  if (cashError) console.error('Error clearing manual cash entries:', cashError);
  else console.log('Successfully cleared manual cash entries.');

  // 3. Clear rate limits
  console.log('Clearing rate limits...');
  const { error: rateError } = await supabase
    .from('rate_limits')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');
  
  if (rateError) {
      console.log('UUID clear failed, trying numeric clear for rate_limits...');
      const { error: rateError2 } = await supabase
        .from('rate_limits')
        .delete()
        .neq('id', -1);
      if (rateError2) console.log('Notice: rate_limits table already empty or has different ID schema.');
      else console.log('Successfully cleared rate limits (numeric ID).');
  } else {
      console.log('Successfully cleared rate limits.');
  }

  console.log('Database cleanup complete.');
}

cleanup().catch(console.error);
