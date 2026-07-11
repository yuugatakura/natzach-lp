/**
 * Shared Meta Conversions API relay, used by capi-event.js (browser
 * pairing) and the tally-webhook.js / calcom-webhook.js server-side
 * event sources. Pixel ID and access token come only from Vercel env
 * vars -- never present in source.
 */
const crypto = require("crypto");

const API_VERSION = "v25.0";

function sha256(value) {
  return crypto.createHash("sha256").update(String(value).trim().toLowerCase()).digest("hex");
}

/**
 * Set META_TEST_EVENT_CODE in Vercel to route events into Meta's Test
 * Events tool for verification; unset it (or leave empty) for normal
 * production reporting. Toggling this needs a redeploy to take effect
 * but no code change.
 */
async function sendToMeta({ logPrefix, event_name, event_id, event_time, event_source_url, user_data, custom_data }) {
  const pixelId = (process.env.META_PIXEL_ID || "").trim();
  const accessToken = (process.env.META_CAPI_ACCESS_TOKEN || "").trim();
  const testEventCode = (process.env.META_TEST_EVENT_CODE || "").trim();

  if (!pixelId || !accessToken) {
    console.error(`${logPrefix} missing META_PIXEL_ID/META_CAPI_ACCESS_TOKEN`);
    return { ok: false, status: 500, body: { error: "Server not configured" } };
  }

  const payload = {
    data: [
      {
        event_name,
        event_id,
        event_time: event_time || Math.floor(Date.now() / 1000),
        action_source: "website",
        ...(event_source_url ? { event_source_url } : {}),
        user_data: user_data || {},
        ...(custom_data ? { custom_data } : {}),
      },
    ],
    ...(testEventCode ? { test_event_code: testEventCode } : {}),
  };

  console.log(`${logPrefix} sending to Meta:`, JSON.stringify(payload));

  try {
    const metaRes = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }
    );
    const result = await metaRes.json();
    if (metaRes.ok) {
      console.log(`${logPrefix} Meta response OK:`, metaRes.status, JSON.stringify(result));
    } else {
      console.error(`${logPrefix} Meta response ERROR:`, metaRes.status, JSON.stringify(result));
    }
    return { ok: metaRes.ok, status: metaRes.status, body: result };
  } catch (err) {
    console.error(`${logPrefix} request to Meta failed:`, err.message);
    return { ok: false, status: 502, body: { error: "Failed to reach Meta", detail: err.message } };
  }
}

module.exports = { sendToMeta, sha256 };
