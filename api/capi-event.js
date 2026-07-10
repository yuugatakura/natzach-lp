/**
 * Server-side Meta Conversions API relay. Runs as a Vercel serverless
 * function (zero-config: any file under /api is auto-detected). The
 * pixel access token lives only in the META_CAPI_ACCESS_TOKEN Vercel
 * environment variable — never in source, never shipped to the browser.
 *
 * Called from js/capi.js alongside the client-side fbq() pixel call,
 * sharing the same event_id so Meta dedupes the two into one event.
 */
const crypto = require("crypto");

const PIXEL_ID = "1744295743583836";
const API_VERSION = "v21.0";

function sha256(value) {
  return crypto.createHash("sha256").update(String(value).trim().toLowerCase()).digest("hex");
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!accessToken) {
    res.status(500).json({ error: "META_CAPI_ACCESS_TOKEN is not configured" });
    return;
  }

  const { event_name, event_id, event_source_url, email, phone, fbp, fbc, custom_data } = req.body || {};
  if (!event_name || !event_id) {
    res.status(400).json({ error: "event_name and event_id are required" });
    return;
  }

  const forwardedFor = req.headers["x-forwarded-for"];
  const user_data = {
    client_ip_address: forwardedFor ? forwardedFor.split(",")[0].trim() : undefined,
    client_user_agent: req.headers["user-agent"],
  };
  if (email) user_data.em = [sha256(email)];
  if (phone) user_data.ph = [sha256(String(phone).replace(/\D/g, ""))];
  if (fbp) user_data.fbp = fbp;
  if (fbc) user_data.fbc = fbc;

  const payload = {
    data: [
      {
        event_name,
        event_id,
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_source_url,
        user_data,
        ...(custom_data ? { custom_data } : {}),
      },
    ],
  };

  try {
    const metaRes = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(accessToken)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const result = await metaRes.json();
    res.status(metaRes.ok ? 200 : 502).json(result);
  } catch (err) {
    res.status(502).json({ error: "Failed to reach Meta" });
  }
};
