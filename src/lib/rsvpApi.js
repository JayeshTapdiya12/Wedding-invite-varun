// =====================================================================
//  RSVP  —  INTEGRATION POINT
// =====================================================================
//  The form never pretends to submit. submitRsvp() returns:
//     { ok: true,  via: "endpoint" | "whatsapp" }   a real delivery happened
//     { ok: false, code: "NOT_CONFIGURED" }         nothing is connected yet
//     { ok: false, code: "NETWORK" | "SERVER" }     delivery failed
//
//  Configure ONE of these in src/data/weddingData.js -> rsvp:
//
//  1) Formspree (easiest, free tier, emails you each RSVP)
//       endpoint: "https://formspree.io/f/xxxxxxx"
//
//  2) Google Sheets via Apps Script (free, every RSVP becomes a row)
//       - Create a Sheet -> Extensions -> Apps Script, paste:
//           function doPost(e) {
//             const d = JSON.parse(e.postData.contents);
//             SpreadsheetApp.getActiveSheet().appendRow([
//               new Date(), d.name, d.phone, d.attending, d.guests, d.events.join(", "), d.meal, d.wishes
//             ]);
//             return ContentService.createTextOutput("ok");
//           }
//       - Deploy -> New deployment -> Web app -> access "Anyone" -> copy the URL
//       - endpoint: "<that URL>",  provider: "apps-script"
//
//  3) Supabase (REST, no SDK needed)
//       - Create table `rsvps` (columns match the payload below) and allow anonymous INSERT with RLS
//       - endpoint: "https://<project>.supabase.co/rest/v1/rsvps"
//         headers: { apikey: "<anon key>", Authorization: "Bearer <anon key>", Prefer: "return=minimal" }
//       - Column names must match the payload keys (name, phone, attending, guests, events, meal, wishes)
//
//  4) Firebase
//       - Deploy a small Cloud Function (HTTPS) that writes the JSON body to Firestore, then
//         endpoint: "https://<region>-<project>.cloudfunctions.net/rsvp"
//
//  5) Your own API: any URL that accepts POST application/json.
//
//  6) No backend at all: set whatsappNumber ("919876543210"). Submitting opens WhatsApp with the
//     RSVP pre-filled and the guest taps Send. This is a real, working fallback.
// =====================================================================

import { weddingData } from "../data/weddingData";

export function buildPayload(values) {
  return {
    name: values.name.trim(),
    phone: values.phone.replace(/[\s-]/g, ""),
    attending: values.attending === "yes" ? "Joyfully Accept" : "Regretfully Decline",
    guests: values.attending === "yes" ? Number(values.guests) : 0,
    events: values.attending === "yes" ? values.events : [],
    meal: values.attending === "yes" ? (values.meal === "Other" && values.mealOther ? values.mealOther.trim() : values.meal) : "",
    wishes: values.wishes.trim(),
    invite: values.invite || "", // which personalised link they came from (empty = plain link)
    submittedAt: new Date().toISOString(),
  };
}

// Reads wishes for the "Blessings & Wishes" wall. Needs a URL that returns JSON rows with `name` and `wishes`:
//   Supabase: create a VIEW with only the columns and rows you want public, e.g.
//     create view public_wishes as select name, wishes from rsvps where wishes <> '' and approved = true order by submitted_at desc;
//     then readUrl = "https://<project>.supabase.co/rest/v1/public_wishes?select=name,wishes&limit=50"
//     and headers = { apikey: "<anon key>" }   (grant select on the view to anon, keep the table itself private)
//   Apps Script: a doGet() that returns ContentService JSON of the same shape.
// Only publish rows you have approved: anyone can submit text through the RSVP form.
export async function fetchWishes() {
  const { readUrl, headers } = weddingData.wishesWall;
  if (!readUrl) return [];
  const res = await fetch(readUrl, { headers: { Accept: "application/json", ...(headers || {}) } });
  if (!res.ok) throw new Error(`wishes ${res.status}`);
  const data = await res.json();
  const rows = Array.isArray(data) ? data : Array.isArray(data?.wishes) ? data.wishes : [];
  return rows
    .filter((r) => r && typeof r.wishes === "string" && r.wishes.trim())
    .slice(0, 50)
    .map((r) => ({ name: String(r.name || "A well-wisher").slice(0, 60), text: r.wishes.trim().slice(0, 500) }));
}

const whatsappText = (p) =>
  [
    `*RSVP – ${weddingData.groom.firstName} & ${weddingData.bride.firstName}*`,
    `Name: ${p.name}`,
    `Phone: ${p.phone}`,
    `Response: ${p.attending}`,
    p.guests ? `Guests: ${p.guests}` : "",
    p.events.length ? `Events: ${p.events.join(", ")}` : "",
    p.meal ? `Meal: ${p.meal}` : "",
    p.wishes ? `Wishes: ${p.wishes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

export async function submitRsvp(values) {
  const { endpoint, provider, headers, whatsappNumber } = weddingData.rsvp;
  const payload = buildPayload(values);

  if (endpoint) {
    try {
      const isScript = provider === "apps-script";
      const res = await fetch(endpoint, {
        method: "POST",
        // Apps Script web apps don't answer CORS preflights, so send a "simple" request and don't read the reply.
        ...(isScript
          ? { mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" } }
          : { headers: { "Content-Type": "application/json", Accept: "application/json", ...headers } }),
        body: JSON.stringify(payload),
      });
      if (isScript) return { ok: true, via: "endpoint" };
      if (!res.ok) return { ok: false, code: "SERVER" };
      return { ok: true, via: "endpoint" };
    } catch {
      return { ok: false, code: "NETWORK" };
    }
  }

  if (whatsappNumber) {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText(payload))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    return { ok: true, via: "whatsapp" };
  }

  return { ok: false, code: "NOT_CONFIGURED" };
}
