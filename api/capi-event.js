/**
 * Server-side Meta Conversions API relay for browser-originated events.
 * Runs as a Vercel serverless function (zero-config: any file under
 * /api is auto-detected).
 *
 * Called from js/capi.js alongside the client-side fbq() pixel call,
 * sharing the same event_id so Meta dedupes the two into one event.
 */
const { sendToMeta, sha256 } = require("./_lib/meta-capi");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (err) {
      console.error("[capi-event] failed to parse request body:", err.message);
      res.status(400).json({ error: "Invalid JSON body" });
      return;
    }
  }

  const { event_name, event_id, event_source_url, email, phone, fbp, fbc, custom_data } = body || {};
  if (!event_name || !event_id) {
    console.error("[capi-event] missing event_name/event_id in body:", JSON.stringify(body));
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

  const result = await sendToMeta({
    logPrefix: "[capi-event]",
    event_name,
    event_id,
    event_source_url,
    user_data,
    custom_data,
  });

  res.status(result.ok ? 200 : 502).json(result.body);
};
