// =====================================================================
//  WEDDING FESTIVITIES, taken from the printed invitation (Parinayotsav).
//  Times and names are exactly as on the card. Things the card does NOT say are left out rather than guessed:
//    - Toran has no time on the card, so it shows "On the baraat's arrival" and has no calendar button.
//    - durationMin (how long a calendar entry lasts) is only an estimate. Change it freely.
//  `tagline` is the editable creative title. `illustration` is a picture cropped from the invitation (public/illustrations).
// =====================================================================

export const eventsHeading = {
  eyebrow: "Two Days. Countless Memories.",
  heading: "The Celebrations of Forever",
  intro: "Come together for two beautiful days of traditions, laughter, music, celebration and unforgettable moments.",
};

export const dayHeadings = [
  { day: 1, label: "Day One", weekday: "Sunday", date: "13th December 2026", numeral: "13", hindi: "शुभारंभ", theme: "A Celebration of Love", note: "Vinayak Sthapana and Kalash" },
  { day: 2, label: "Day Two", weekday: "Monday", date: "14th December 2026", numeral: "14", hindi: "मंगल परिणय", theme: "The Beginning of Forever", note: "The sacred rites of marriage" },
];

const VENUE = "The Exotica";
const ADDRESS = "Mangliya Sadak, Bypass Road, Indore, Madhya Pradesh 453771";

export const eventsData = [
  {
    id: "vinayak", day: 1, hindi: "विनायक स्थापना", title: "Vinayak Sthapana", subtitle: "Mangalarambh",
    tagline: "A Divine Beginning", short: "Vinayak Sthapana",
    date: "13th December 2026", time: "8:00 AM", startISO: "2026-12-13T08:00:00+05:30", durationMin: 60,
    venue: VENUE, address: ADDRESS, illustration: "/illustrations/vinayak.jpg",
    description: "The celebrations begin by invoking Lord Ganesha, the remover of obstacles, and seeking his blessings for everything to come.",
    dressCode: "", mapLink: "",
  },
  {
    id: "kalash", day: 1, hindi: "कलश", title: "Kalash", subtitle: "Shubh Aahvan",
    tagline: "The Sacred Prelude", short: "Kalash",
    date: "13th December 2026", time: "9:00 AM", startISO: "2026-12-13T09:00:00+05:30", durationMin: 60,
    venue: VENUE, address: ADDRESS, illustration: "/illustrations/kalash.jpg",
    description: "A sacred kalash is installed to welcome all that is auspicious into the celebrations.",
    dressCode: "", mapLink: "",
  },
  {
    id: "carnival", day: 1, hindi: "कार्निवल", title: "Carnival", subtitle: "Anandotsav",
    tagline: "The Colours of Us", short: "Carnival",
    date: "13th December 2026", time: "10:30 AM", startISO: "2026-12-13T10:30:00+05:30", durationMin: 240,
    venue: VENUE, address: ADDRESS, illustration: "/illustrations/carnival.jpg",
    description: "A festival of joy, colour and play. Come relaxed, come cheerful and come ready to celebrate.",
    dressCode: "Pastel Colours", mapLink: "",
  },
  {
    id: "sagai", day: 1, hindi: "सगाई", title: "Sagai", subtitle: "Prem Bandhan",
    tagline: "The Golden Promise", short: "Sagai",
    date: "13th December 2026", time: "3:30 PM", startISO: "2026-12-13T15:30:00+05:30", durationMin: 120,
    venue: VENUE, address: ADDRESS, illustration: "/illustrations/sagai.jpg",
    description: "Rings are exchanged and the promise is made, in front of the people who matter most.",
    dressCode: "", mapLink: "",
  },
  {
    id: "aashirwad", day: 1, hindi: "आशीर्वाद समारोह", title: "Aashirwad Samaroh", subtitle: "Swaruchi Bhoj",
    tagline: "An Evening of Grace", short: "Aashirwad Samaroh",
    date: "13th December 2026", time: "8:00 PM", startISO: "2026-12-13T20:00:00+05:30", durationMin: 180,
    venue: VENUE, address: ADDRESS, illustration: "/illustrations/aashirwad.jpg",
    description: "An elegant evening of blessings, followed by a dinner of your choice.",
    dressCode: "Formals", mapLink: "",
  },
  {
    id: "mayra", day: 2, hindi: "मायरा", title: "Mayra", subtitle: "Nihal Sneh",
    tagline: "The Embrace of Tradition", short: "Mayra",
    date: "14th December 2026", time: "9:00 AM", startISO: "2026-12-14T09:00:00+05:30", durationMin: 120,
    venue: VENUE, address: ADDRESS, illustration: "/illustrations/mayra.jpg",
    description: "The maternal family brings gifts, blessings and love for the wedding.",
    host: "Nanihal side: Shri Govinddas ji, Shri Mohanlal ji, Shri Muralidhar ji, Shri Shyam Sundar ji, Shri Ashish ji and Shri Rakesh ji Tapadiya, and the entire Tapadiya family, Loharda, Indore.",
    dressCode: "Ethnic", mapLink: "",
  },
  {
    id: "varnikasi", day: 2, hindi: "वर निकासी", title: "Var Nikasi", subtitle: "Shubh Prasthan",
    tagline: "The Royal Procession", short: "Var Nikasi",
    date: "14th December 2026", time: "3:00 PM", startISO: "2026-12-14T15:00:00+05:30", durationMin: 90,
    venue: VENUE, address: ADDRESS, illustration: "/illustrations/varnikasi.jpg",
    description: "The groom sets out in procession, with music, dancing and the whole family beside him.",
    dressCode: "", mapLink: "",
  },
  {
    id: "toran", day: 2, hindi: "तोरण", title: "Toran", subtitle: "",
    tagline: "At the Threshold of Forever", short: "Toran",
    date: "14th December 2026", time: "On the baraat's arrival", startISO: "", durationMin: 0,
    venue: VENUE, address: ADDRESS, illustration: "/illustrations/venue.jpg",
    description: "At the auspicious hour the baraat arrives at The Exotica with music and celebration, and is welcomed with the toran.",
    host: "Welcomed by Shri Sureshchand ji, Shri Saurabh ji and Shri Sandeep ji Rathi.",
    dressCode: "", mapLink: "",
  },
  {
    id: "panigrahan", day: 2, hindi: "पाणिग्रहण", title: "Panigrahan", subtitle: "Agni Sakshi",
    tagline: "Seven Vows, One Forever", short: "Panigrahan",
    date: "14th December 2026", time: "5:30 PM", startISO: "2026-12-14T17:30:00+05:30", durationMin: 120,
    venue: VENUE, address: ADDRESS, illustration: "/illustrations/panigrahan.jpg",
    description: "The sacred wedding rites, with the fire as witness. The heart of the whole celebration.",
    dressCode: "Traditional", mapLink: "",
  },
  {
    id: "bhoj", day: 2, hindi: "स्वरुचि भोज", title: "Wedding Dinner", subtitle: "Swaruchi Bhoj",
    tagline: "A Feast of Forever", short: "Wedding Dinner",
    date: "14th December 2026", time: "7:00 PM", startISO: "2026-12-14T19:00:00+05:30", durationMin: 150,
    venue: VENUE, address: ADDRESS, illustration: "",
    description: "A feast of your choice, shared with the newly married couple and both families.",
    dressCode: "", mapLink: "",
  },
];
