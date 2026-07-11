/**
 * Tally webhook receiver -- fires Lead server-side the moment a real
 * submission happens (Tally calls this endpoint directly), independent
 * of whether the visitor's browser completes the thank-you.html
 * redirect. Only a request carrying the correct ?token= (set in
 * Tally's webhook URL, checked against TALLY_WEBHOOK_TOKEN) is honored.
 *
 * Uses Tally's submissionId as the event_id -- matching what
 * thank-you.html uses client-side if Tally's redirect passes
 * ?submission_id= through -- so Meta dedupes the browser+webhook pair
 * into a single event, same pattern already proven for
 * InitiateCheckout.
 */
const { sendToMeta, sha256 } = require("./_lib/meta-capi");
const { isAuthorized } = require("./_lib/webhook-auth");

function extractEmail(fields) {
  const list = fields || [];
  const byType = list.find((f) => f.type === "INPUT_EMAIL" || f.type === "EMAIL");
  if (byType && byType.value) return Array.isArray(byType.value) ? byType.value[0] : byType.value;
  const emailLike = list.find((f) => typeof f.value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value));
  return emailLike ? emailLike.value : undefined;
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const auth = isAuthorized(req, "TALLY_WEBHOOK_TOKEN");
  if (!auth.ok) {
    console.error("[tally-webhook] unauthorized:", auth.reason);
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (err) {
      console.error("[tally-webhook] invalid JSON body:", err.message);
      res.status(400).json({ error: "Invalid JSON" });
      return;
    }
  }

  console.log("[tally-webhook] received payload:", JSON.stringify(body));

  const data = body && body.data;
  const submissionId = data && (data.submissionId || data.responseId);
  if (!submissionId) {
    console.error("[tally-webhook] no submissionId/responseId in payload -- check the logged payload above and adjust extraction");
    res.status(400).json({ error: "Unexpected payload shape" });
    return;
  }

  const email = extractEmail(data.fields);
  const user_data = {};
  if (email) user_data.em = [sha256(email)];

  const result = await sendToMeta({
    logPrefix: "[tally-webhook]",
    event_name: "Lead",
    event_id: submissionId,
    user_data,
  });

  // Always 200 to Tally so it doesn't retry-storm over a Meta-side
  // hiccup -- the actual outcome is visible in Vercel Logs.
  res.status(200).json({ received: true, metaOk: result.ok });
};
