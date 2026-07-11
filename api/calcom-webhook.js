/**
 * cal.com webhook receiver -- fires Schedule server-side the moment a
 * real booking is created, independent of whether the browser
 * completes the booked.html redirect. Only a request carrying the
 * correct ?token= (set in cal.com's webhook URL, checked against
 * CALCOM_WEBHOOK_TOKEN) is honored.
 *
 * Uses cal.com's booking uid as the event_id -- matching what
 * booked.html uses client-side (cal.com appends ?uid= to its redirect
 * by default) -- so Meta dedupes the browser+webhook pair into a
 * single event, same pattern already proven for InitiateCheckout.
 */
const { sendToMeta, sha256 } = require("./_lib/meta-capi");
const { isAuthorized } = require("./_lib/webhook-auth");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const auth = isAuthorized(req, "CALCOM_WEBHOOK_TOKEN");
  if (!auth.ok) {
    console.error("[calcom-webhook] unauthorized:", auth.reason);
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (err) {
      console.error("[calcom-webhook] invalid JSON body:", err.message);
      res.status(400).json({ error: "Invalid JSON" });
      return;
    }
  }

  console.log("[calcom-webhook] received payload:", JSON.stringify(body));

  if (body && body.triggerEvent && body.triggerEvent !== "BOOKING_CREATED") {
    res.status(200).json({ received: true, skipped: body.triggerEvent });
    return;
  }

  const bookingPayload = body && body.payload;
  const uid = bookingPayload && bookingPayload.uid;
  if (!uid) {
    console.error("[calcom-webhook] no payload.uid -- check the logged payload above and adjust extraction");
    res.status(400).json({ error: "Unexpected payload shape" });
    return;
  }

  const attendee = bookingPayload.attendees && bookingPayload.attendees[0];
  const email = attendee && attendee.email;
  const user_data = {};
  if (email) user_data.em = [sha256(email)];

  const result = await sendToMeta({
    logPrefix: "[calcom-webhook]",
    event_name: "Schedule",
    event_id: uid,
    user_data,
  });

  res.status(200).json({ received: true, metaOk: result.ok });
};
