// =====================================================================
//  PERSONALISED INVITATION LINKS
//  A guest opens   https://your-site.com/?g=sharma-family
//  and sees "Dear Sharma Family", only the events they are invited to, their name pre-filled in the RSVP,
//  and (optionally) the site in Hindi. Visitors with a plain link see everything.
//
//  slug   : lowercase letters, numbers and dashes only.
//  name   : how you want to greet them.   nameHi: optional Hindi spelling for the greeting.
//  events : "all"  or a list of event ids from eventsData.js  ->  ["mehendi", "sangeet", "baraat", "phere"]
//  lang   : optional "hi" to open the site in Hindi for that guest.
//
//  The three entries below are EXAMPLES: delete them and add your own.
//  Run  `npm run links -- https://your-site.com`  to print a ready-to-send link for every guest.
//
//  Privacy note: this list is part of the website's code, so anyone technical could read the guest NAMES in it.
//  Don't put phone numbers or addresses here.
// =====================================================================

export const guestsData = {
  "sharma-family": { name: "Sharma Family", events: "all" },
  "mehta-ji": { name: "Mehta Ji & Family", nameHi: "मेहता जी एवं परिवार", events: ["baraat", "phere"], lang: "hi" },
  "college-friends": { name: "Our dearest friends", events: ["mehendi", "sangeet", "baraat"] },
};
