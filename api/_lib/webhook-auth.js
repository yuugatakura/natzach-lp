/**
 * Shared-secret check for webhook endpoints: the secret lives as a
 * ?token= query param on the webhook URL configured in Tally/cal.com's
 * dashboard, checked against a Vercel env var of the same name passed
 * in. Simpler than verifying Tally's/cal.com's HMAC signature, which
 * needs the exact raw request bytes -- not reliably available here
 * alongside Vercel's auto-parsed req.body -- but equally effective at
 * stopping an outsider from POSTing fake events at the endpoint.
 */
function isAuthorized(req, envVarName) {
  const expected = (process.env[envVarName] || "").trim();
  if (!expected) {
    return { ok: false, reason: `${envVarName} not configured` };
  }
  const provided = (req.query && req.query.token) || "";
  if (!provided) {
    return { ok: false, reason: "missing token query param" };
  }
  return { ok: provided === expected, reason: provided === expected ? null : "token mismatch" };
}

module.exports = { isAuthorized };
