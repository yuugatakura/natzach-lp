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

const API_VERSION = "v25.0";
// TEMPORARY: routes events into Meta's Test Events tool so they can be
// verified in real time. Remove once server events are confirmed
// arriving, so production traffic stops being tagged as test data.
const TEST_EVENT_CODE = "TEST92259";

function sha256(value) {
  return crypto.createHash("sha256").update(String(value).trim().toLowerCase()).digest("hex");
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !accessToken) {
    console.error("[capi-event] missing config", {
      hasPixelId: Boolean(pixelId),
      hasAccessToken: Boolean(accessToken),
    });
    res.status(500).json({ error: "META_PIXEL_ID and/or META_CAPI_ACCESS_TOKEN not configured" });
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
    ...(TEST_EVENT_CODE ? { test_event_code: TEST_EVENT_CODE } : {}),
  };

  const url = `https://graph.facebook.com/${API_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`;
  console.log("[capi-event] sending to Meta:", JSON.stringify(payload));

  try {
    const metaRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await metaRes.json();

    if (metaRes.ok) {
      console.log("[capi-event] Meta response OK:", metaRes.status, JSON.stringify(result));
    } else {
      console.error("[capi-event] Meta response ERROR:", metaRes.status, JSON.stringify(result));
    }

    res.status(metaRes.ok ? 200 : 502).json(result);
  } catch (err) {
    console.error("[capi-event] request to Meta failed:", err.message);
    res.status(502).json({ error: "Failed to reach Meta", detail: err.message });
  }
};
