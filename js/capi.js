/**
 * Shared client-side half of the Pixel + Conversions API pair.
 * Every tracked event fires twice — once via fbq() (client pixel) and
 * once via /api/capi-event (server-side, using the pixel access token
 * that lives only in a Vercel env var) — sharing the same event_id so
 * Meta dedupes them into a single event instead of double-counting.
 */
(function (global) {
  "use strict";

  function getCookie(name) {
    const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
    return match ? decodeURIComponent(match[1]) : undefined;
  }

  function generateEventId() {
    if (global.crypto && global.crypto.randomUUID) return global.crypto.randomUUID();
    return "evt_" + Date.now() + "_" + Math.random().toString(36).slice(2);
  }

  function sendServerEvent(eventName, eventId, extra) {
    const payload = Object.assign(
      {
        event_name: eventName,
        event_id: eventId,
        event_source_url: global.location.href,
        fbp: getCookie("_fbp"),
        fbc: getCookie("_fbc"),
      },
      extra || {}
    );
    // Fire-and-forget: never blocks the CTA navigation. Failures are
    // logged to the console (not surfaced to the user) so they're
    // visible in devtools while debugging, without breaking the click.
    fetch("/api/capi-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    })
      .then((res) => {
        if (!res.ok) {
          res
            .json()
            .catch(() => ({}))
            .then((body) => console.warn("[capi] server event failed:", res.status, body));
        }
      })
      .catch((err) => console.warn("[capi] server event request failed:", err.message));
  }

  // explicitEventId lets callers (e.g. the Tally/cal.com redirect
  // pages) reuse an ID that a webhook will also use for the same
  // underlying event (Tally's submissionId, cal.com's booking uid),
  // so the browser event and the webhook's server event dedupe into
  // one instead of double-counting.
  function trackDual(eventName, extra, explicitEventId) {
    const eventId = explicitEventId || generateEventId();
    if (typeof fbq === "function") {
      fbq("track", eventName, {}, { eventID: eventId });
    }
    sendServerEvent(eventName, eventId, extra);
  }

  global.NatzachCapi = { trackDual, generateEventId, sendServerEvent, getCookie };
})(window);
