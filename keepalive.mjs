import fetch from "node-fetch";

const url = process.env.SUPABASE_URL;        // https://xxxx.supabase.co
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const endpoint = `${url}/rest/v1/rpc/ping_keepalive`;

(async () => {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": key,
        "Authorization": `Bearer ${key}`
      },
      body: JSON.stringify({})
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Supabase keep-alive FAIL:", res.status, text);
      process.exit(1);
    }

    console.log("Supabase keep-alive OK:", await res.text());
  } catch (err) {
    console.error("Unexpected keep-alive error:", err);
    process.exit(1);
  }
})();
