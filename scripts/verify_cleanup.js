
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function verify() {
  console.log('Verifying cleanup...');
  
  const { count: regCount } = await supabase.from('registrations').select('*', { count: 'exact', head: true });
  console.log('Registrations count:', regCount);

  const { count: cashCount } = await supabase.from('manual_cash_entries').select('*', { count: 'exact', head: true });
  console.log('Manual cash entries count:', cashCount);

  const { count: rateCount } = await supabase.from('rate_limits').select('*', { count: 'exact', head: true });
  console.log('Rate limits count:', rateCount);

  if (regCount === 0 && cashCount === 0 && rateCount === 0) {
    console.log('All target tables verified empty.');
  } else {
    console.log('Warning: Some tables still contain data!');
  }
}

verify().catch(console.error);
