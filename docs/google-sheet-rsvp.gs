/**
 * FREE RSVP BACKEND: Google Sheet + Apps Script
 *
 * 1. Create a new Google Sheet. In row 1 type these headings:
 *    Time | Name | Phone | Response | Guests | Events | Meal | Wishes | Invite link | Approved
 * 2. In the Sheet: Extensions -> Apps Script. Delete everything and paste this file.
 * 3. Click Deploy -> New deployment -> type "Web app".
 *      Execute as: Me      Who has access: Anyone
 *    Click Deploy and allow access. Copy the "Web app URL".
 * 4. In src/data/weddingData.js -> rsvp set:
 *      endpoint: "<the web app URL>",
 *      provider: "apps-script",
 * 5. If you edit this script later, use Deploy -> Manage deployments -> edit -> New version.
 *
 * New tabs "Songs", "Capsule" and "Opened" are created automatically when the first song request, time-capsule note
 * or personal-link open arrives. After editing this script: Deploy -> Manage deployments -> edit -> New version.
 *
 * Optional wishes wall: use the "Approved" column (J) and type YES for wishes you want shown publicly,
 * then set wishesWall.readUrl to the same web app URL and wishesWall.enabled to true.
 */
function doPost(e) {
  var d = JSON.parse(e.postData.contents);
  var type = d.type || "rsvp";
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // Song requests, time-capsule notes and "link opened" pings each get their own tab (created automatically).
  if (type === "song")    return add_(ss, "Songs",   ["Time", "Song", "Artist", "Name", "Invite link"], [new Date(), d.song, d.artist, d.name, d.invite || ""]);
  if (type === "capsule") return add_(ss, "Capsule", ["Time", "Name", "Note", "Invite link", "Public (type YES)"], [new Date(), d.name, d.note, d.invite || ""]);
  if (type === "open")    return add_(ss, "Opened",  ["Time", "Invite link"], [new Date(), d.invite || ""]);

  // RSVP (the first tab)
  ss.getSheets()[0].appendRow([
    new Date(), d.name, d.phone, d.attending, d.guests,
    (d.events || []).join(", "), d.meal, d.wishes, d.invite || ""
  ]);
  return ContentService.createTextOutput("ok");
}

function add_(ss, tab, heads, row) {
  var sh = ss.getSheetByName(tab) || ss.insertSheet(tab);
  if (sh.getLastRow() === 0) sh.appendRow(heads);
  sh.appendRow(row.map(function (v) { return typeof v === "string" && /^[=+\-@]/.test(v) ? "'" + v : v; })); // stop formula injection
  return ContentService.createTextOutput("ok");
}

// ?kind=capsule -> time-capsule notes (only after you set them public: type YES in column E of the Capsule tab).
// Otherwise: wishes marked YES in column J (Approved) of the first tab.
function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var out;
  if (e && e.parameter && e.parameter.kind === "capsule") {
    var cs = ss.getSheetByName("Capsule");
    var crows = cs ? cs.getDataRange().getValues().slice(1) : [];
    out = crows.filter(function (r) { return r[2] && String(r[4]).toUpperCase() === "YES"; })
      .slice(0, 100).map(function (r) { return { name: r[1], note: r[2] }; });
  } else {
    var rows = ss.getSheets()[0].getDataRange().getValues().slice(1);
    out = rows.filter(function (r) { return r[7] && String(r[9]).toUpperCase() === "YES"; })
      .reverse().slice(0, 50).map(function (r) { return { name: r[1], wishes: r[7] }; });
  }
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}
