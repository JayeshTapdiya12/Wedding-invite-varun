// ============================================================
//  CORE WEDDING CONTENT  — edit this file to customise the site.
//  Events live in eventsData.js, photos in galleryData.js.
// ============================================================

export const weddingData = {
  groom: {
    firstName: "Varun",
    lastName: "Kabra",
    fullName: "Varun Kabra",
    parents: "Son of Smt. Preeti & Shri Anand Kabra",
    monogram: "V",
    hindiName: "वरुण", // shown when a guest switches the site to Hindi
  },
  bride: {
    firstName: "Radhika",
    lastName: "Rathi",
    fullName: "Radhika Rathi",
    parents: "Daughter of Smt. Priyanka ji & Shri Saurabh ji Rathi",
    monogram: "R",
    hindiName: "राधिका",
  },
  hashtag: "#jabVmetR",
  // "+05:30" = India Standard Time, so the countdown is right for every guest
  weddingDateISO: "2026-12-14T17:30:00+05:30", // Panigrahan (the wedding ceremony), 5:30 PM IST,
  dateRange: "13th & 14th December 2026",
  city: "Indore, Madhya Pradesh",
  blessingQuote: "॥ श्री गणेशाय नमः ॥",
  inviteMessage:
    "With the blessings of the Almighty and our beloved elders, the Kabra & Rathi families cordially solicit your gracious presence at the Parinayotsav of",

  // ---------- SEO / sharing (also edit the tags in index.html) ----------
  seo: {
    title: "Varun & Radhika | Wedding Invitation",
    description: "You are cordially invited to the wedding of Varun Kabra & Radhika Rathi, 13th & 14th December 2026, Indore.",
  },

  // ---------- Hero photograph ----------
  // Replace with your own: put a landscape photo at /public/photos/hero.jpg and use "/photos/hero.jpg"
  heroImage: "/photos/neer3964.jpg",
  // The first screen shows these as a slow cross-fading slideshow, with NO text on the photos.
  // `pos` is where the photo is anchored when it is cropped (x% y%): keep the couple in view.
  heroPhotos: [
    { src: "/photos/neer3964.jpg", pos: "58% 50%", alt: "Varun and Radhika framed by a carved stone arch" },
    { src: "/photos/neer3911.jpg", pos: "50% 38%", alt: "Varun and Radhika by the river" },
    { src: "/photos/dsc00485.jpg", pos: "56% 50%", alt: "Varun and Radhika beside a painted elephant mural" },
    { src: "/photos/neer4543.jpg", pos: "52% 62%", alt: "Varun and Radhika walking hand in hand on the hills" },
  ],

  // ---------- Gen-Z opening: tap-to-play -> group chat -> "WE'RE GETTING MARRIED" slam -> title card ----------
  intro: {
    enabled: true, // set false to skip the intro completely
    gateLine: "jab V met R", // big title on the tap-to-play screen
    gateSub: "episode 01 · the wedding of the year",
    production: "A KABRA × RATHI PRODUCTION",
    chatTitle: "jab V met R 💘",
    chatSub: "2 people · 400 aunties lurking",
    // "groom" messages appear on the right (sent), "bride" on the left. Edit freely, any number of messages.
    chat: [
      { from: "groom", text: "ok so… i have news 👀" },
      { from: "bride", text: "omg just say it already" },
      { from: "groom", text: "we're getting MARRIED 💍" },
      { from: "bride", text: "FINALLY 😭🎉 tell everyone" },
    ],
    slam: ["WE'RE", "GETTING", "MARRIED"],
    tapeA: "SAVE THE DATE ✦ 13–14 DEC 2026 ✦ INDORE ✦ ",
    tapeB: "#jabVmetR ✦ KABRA × RATHI ✦ WEDDING SZN ✦ ",
  },

  // ---------- Music ----------
  // "" = built-in synthesised Indian-classical ambience (no file needed).
  // Or put your song in /public/music/ and use e.g. "/music/song.mp3"
  music: { file: "" },

  // ---------- Videos ----------
  // type "file"    -> put the MP4 in /public/videos and set src: "/videos/teaser.mp4"
  // type "youtube" -> youtubeId only, e.g. "dQw4w9WgXcQ"
  // type "vimeo"   -> vimeoId only, e.g. "76979871"
  videoSection: {
    eyebrow: "Cinematic Moments",
    heading: "Our Moments, Our Memories",
    caption: "Some moments are too beautiful to be captured in words.",
  },
  videos: [
    {
      id: "teaser",
      title: "Save The Date",
      kind: "Cinematic Teaser",
      type: "file",
      src: "/videos/teaser.mp4",
      poster: "/photos/neer4909.jpg",
    },
    {
      id: "prewedding",
      title: "Pre-Wedding Film",
      kind: "The Shoot",
      type: "youtube",
      youtubeId: "",
      poster: "/photos/neer4543.jpg",
    },
    {
      id: "family",
      title: "Family Blessings",
      kind: "From The Families",
      type: "file",
      src: "/videos/family.mp4",
      poster: "/photos/neer4319.jpg",
    },
  ],

  // ---------- Venue ----------
  venue: {
    eyebrow: "Venue & Location",
    heading: "Find Your Way to Our Celebration",
    name: "The Exotica",
    address: "Mangliya Sadak, Bypass Road, Indore, Madhya Pradesh 453771",
    image: "/illustrations/venue.jpg",
    // Search text for the embedded map and Get Directions. Replace with the exact venue name/address,
    // or paste a full Google Maps embed URL into mapEmbedUrl / a share link into directionsUrl.
    mapQuery: "The Exotica, Indore",
    mapEmbedUrl: "",
    directionsUrl: "https://maps.app.goo.gl/4QpY2GEMtEkKPLEM7",
    note: "",
  },

  // ---------- Web app connection (there is no RSVP form any more) ----------
  // The time capsule and the "link opened" counter send to this address (see README, "Google Sheet").
  // Leave endpoint empty and they honestly say "not sent". `whatsappNumber` is an optional fallback for the capsule.
  rsvp: {
    endpoint: "", // e.g. "https://formspree.io/f/xxxxxxx"
    provider: "json", // "json" | "apps-script"
    headers: {}, // extra headers, e.g. Supabase: { apikey: "...", Authorization: "Bearer ..." }
    whatsappNumber: "", // fallback if no endpoint: digits only with country code, e.g. "919876543210"
  },

  // ---------- Phases: the site changes by itself around the wedding ----------
  // before -> normal invitation | during -> live-stream + photo album appear | after -> thank-you mode
  // (countdown, RSVP, FAQ and travel hide; the photo album moves to the top).
  // mode "auto" follows the two dates; or force "before" | "during" | "after".
  // To preview a phase, open the site with ?phase=after on the end of the address.
  phase: {
    mode: "auto",
    startISO: "2026-12-13T00:00:00+05:30",
    endISO: "2026-12-15T06:00:00+05:30",
    afterTitle: "Thank you for celebrating with us",
    afterText: "Your blessings and your presence made our wedding everything we dreamed of. We are so grateful.",
  },

  // ---------- Voice note (plays in the Our Story section) ----------
  // Record a short message on a phone, save as MP3, put it in /public/audio/ and set src: "/audio/note.mp3". Hidden while src is empty.
  voiceNote: {
    src: "",
    title: "A note from us",
    caption: "Press play to hear a message from Varun & Radhika.",
  },

  // ---------- Live stream (appears only when enabled) ----------
  liveStream: {
    enabled: false,
    eyebrow: "Join From Anywhere",
    heading: "Watch the Wedding Live",
    note: "Cannot be there in person? Be with us, wherever you are.",
    startISO: "2026-12-14T17:30:00+05:30",
    youtubeId: "", // id of the YouTube live / unlisted video
  },

  // ---------- Couple quiz (turn on after writing real questions) ----------
  quiz: {
    enabled: false,
    eyebrow: "Just For Fun",
    heading: "How Well Do You Know Us?",
    // answer = index (starting at 0) of the correct option. These are SAMPLES: replace them.
    questions: [
      { q: "SAMPLE: Where did Varun and Radhika first meet?", options: ["At a cafe", "At a wedding", "Through family", "On a trip"], answer: 0 },
      { q: "SAMPLE: Who said \"I love you\" first?", options: ["Varun", "Radhika", "Both together", "Nobody remembers"], answer: 1 },
      { q: "SAMPLE: What is their favourite thing to do together?", options: ["Travel", "Cook", "Watch movies", "Eat out"], answer: 3 },
    ],
  },

  // ---------- Shared photo album (Google Photos / Drive / iCloud link) ----------
  // Create a shared album that anyone with the link can add to, and paste the link. Hidden while url is empty.
  album: {
    url: "",
    eyebrow: "Memories Together",
    heading: "Share Your Photos",
    text: "Add your photos and videos from the celebrations to our shared album, so everyone can relive the day.",
    button: "Open the shared album",
  },

  // ---------- Live wishes wall (needs a backend that can be READ, see README) ----------
  wishesWall: {
    enabled: false,
    heading: "Blessings & Wishes",
    readUrl: "", // e.g. a Supabase view URL, or an Apps Script web-app URL that returns JSON
    headers: {},
  },

  // ---------- Travel & stay ----------
  // Edit freely. Cards with empty text are hidden. Hotels: add the ones you are recommending.
  travel: {
    eyebrow: "Getting There",
    heading: "Travel & Stay",
    intro: "Everything you need to reach Indore and settle in comfortably.",
    cards: [
      { icon: "plane", title: "By Air", text: "Devi Ahilya Bai Holkar Airport (IDR) is Indore's airport and is connected to many major cities. Pre-booked cabs make the ride into town easy." },
      { icon: "train", title: "By Train", text: "Indore Junction is the main railway station, with trains from across the country. Cabs and autos are available outside." },
      { icon: "car", title: "By Road", text: "The Exotica is on Mangliya Sadak, Bypass Road, Indore. Use Get Directions on the Venue page for the exact route." },
      { icon: "weather", title: "What To Pack", text: "December evenings in Indore are cool. Carry a light shawl or jacket for the late-night festivities." },
    ],
    stayHeading: "Where To Stay",
    hotels: [
      // Add hotels you recommend, like:  { name: "Hotel name", area: "Area", note: "Short note" },
    ],
    contact: { label: "Need help getting here?", name: "", phone: "" }, // phone like "+919876543210"; hidden while empty
  },

  // ---------- Closing ----------
  closing: {
    line: "Two Hearts, One Beautiful Journey, A Lifetime of Togetherness.",
    footer: "Made with love, for a celebration of forever.",
  },

  familyHosts: [
    { role: "Groom's Family", names: "Smt. Preeti & Shri Anand Kabra", title: "Parents of Varun" },
    { role: "Bride's Family", names: "Smt. Priyanka ji & Shri Saurabh ji Rathi", title: "Parents of Radhika" },
    { role: "Warmly Hosted By", names: "The Entire Kabra & Rathi Parivaar", title: "Awaiting Your Presence" },
  ],
};
