import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false }
});

(async () => {
  try {
    // Minimal SELECT – räcker att göra en fråga
    const { data, error } = await supabase
      .from('antagning_keepalive')
      .select('id')
      .limit(1);

    if (error) {
      console.error('Supabase keep-alive error:', error.message);
      process.exit(1);
    }

    console.log('Supabase keep-alive OK. Rows:', data?.length ?? 0);
  } catch (e) {
    console.error('Unexpected error in keep-alive:', e);
    process.exit(1);
  }
})();
