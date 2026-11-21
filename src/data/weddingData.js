// ============================================================
//  CORE WEDDING CONTENT  — edit this file to customise the site.
//  Events live in eventsData.js, photos in galleryData.js.
// ============================================================

export const weddingData = {
  groom: {
    firstName: "Varun",
    lastName: "Kabra",
    fullName: "Varun Kabra",
    parents: "Son of Smt. & Shri Kabra", // Update with parents' first names
    monogram: "V",
    hindiName: "वरुण", // shown when a guest switches the site to Hindi
  },
  bride: {
    firstName: "Radhika",
    lastName: "Rathi",
    fullName: "Radhika Rathi",
    parents: "Daughter of Smt. & Shri Rathi", // Update with parents' first names
    monogram: "R",
    hindiName: "राधिका",
  },
  hashtag: "#jabVmetR",
  // "+05:30" = India Standard Time, so the countdown is right for every guest
  weddingDateISO: "2026-12-14T19:30:00+05:30",
  dateRange: "13th & 14th December 2026",
  city: "Indore, Madhya Pradesh",
  blessingQuote: "॥ श्री गणेशाय नमः ॥",
  inviteMessage:
    "With the blessings of the Almighty and our beloved elders, the Kabra & Rathi families cordially solicit your gracious presence at the royal union of",

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

  // ---------- Our Story ----------
  // Placeholder text + photos — replace with your own. layout: "split-left" | "split-right" | "wide"
  story: {
    eyebrow: "Our Story",
    heading: "A Story Written in the Stars",
    chapters: [
      {
        id: "met",
        kicker: "How we met",
        title: "A Chai, A Table, A Conversation",
        text: "A mutual friend, a crowded café and a conversation that refused to end. Neither of them knew it yet, but that evening quietly rearranged everything that came after.",
        image: "/photos/neer3911.jpg",
        layout: "split-left",
      },
      {
        id: "first",
        kicker: "The first meeting",
        title: "When Hello Became Home",
        text: "The first meeting was supposed to be ten minutes. It lasted until the café closed. By the time they said goodbye, both were already planning the next hello.",
        image: "/photos/neer4201.jpg",
        layout: "split-right",
      },
      {
        id: "journey",
        kicker: "The journey together",
        title: "Every Road, a Little Brighter",
        text: "Late-night calls, long drives and two families slowly becoming one. Through every season, they chose each other, and every road felt a little brighter for it.",
        image: "/photos/neer4463.jpg",
        layout: "wide",
      },
      {
        id: "proposal",
        kicker: "The proposal",
        title: "One Question, One Yes",
        text: "Under a sky full of stars, with a trembling voice and a ring held tight, one question was asked. The answer came before he finished.",
        image: "/photos/neer4912.jpg",
        layout: "split-left",
      },
      {
        id: "announce",
        kicker: "The announcement",
        title: "Now, We Celebrate",
        text: "With the blessings of both families, the date is set. Two days of rituals, music and love, and we cannot imagine them without you.",
        image: "/photos/neer4605.jpg",
        layout: "split-right",
      },
    ],
  },

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
    address: "The Exotica, Indore, Madhya Pradesh",
    image: "/photos/dsc00491.jpg",
    // Search text for the embedded map and Get Directions. Replace with the exact venue name/address,
    // or paste a full Google Maps embed URL into mapEmbedUrl / a share link into directionsUrl.
    mapQuery: "The Exotica, Indore",
    mapEmbedUrl: "",
    directionsUrl: "https://maps.app.goo.gl/4QpY2GEMtEkKPLEM7",
    note: "Valet parking and shuttle service will be available from the Grand Palace Hotel on both evenings.",
  },

  // ---------- RSVP ----------
  // See README.md ("RSVP setup") and src/lib/rsvpApi.js for Formspree / Supabase / Firebase / Apps Script recipes.
  rsvp: {
    eyebrow: "Kindly Respond",
    heading: "Be a Part of Our Celebration",
    replyBy: "Kindly reply by 20th November 2026",
    endpoint: "", // e.g. "https://formspree.io/f/xxxxxxx"
    provider: "json", // "json" | "apps-script"
    headers: {}, // extra headers, e.g. Supabase: { apikey: "...", Authorization: "Bearer ..." }
    whatsappNumber: "", // fallback if no endpoint: digits only with country code, e.g. "919876543210"
    mealOptions: ["Vegetarian", "Jain", "No Onion / No Garlic", "Other"],
    maxGuests: 10,
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
    heading: "Watch the Pheras Live",
    note: "Cannot be there in person? Be with us, wherever you are.",
    startISO: "2026-12-14T23:15:00+05:30",
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
      { icon: "car", title: "By Road", text: "Valet parking and shuttle service will be available from the Grand Palace Hotel on both evenings." },
      { icon: "weather", title: "What To Pack", text: "December evenings in Indore are cool. Carry a light shawl or jacket for the late-night festivities." },
    ],
    stayHeading: "Where To Stay",
    hotels: [
      { name: "Grand Palace Hotel", area: "Indore", note: "Hosting the Sangeet." }, // add more recommended hotels as extra lines like this one,
    ],
    contact: { label: "Need help getting here?", name: "", phone: "" }, // phone like "+919876543210"; hidden while empty
  },

  // ---------- FAQ ----------
  faq: {
    eyebrow: "Good To Know",
    heading: "Questions, Answered",
    items: [
      { q: "What should I wear?", a: "Each festival has a suggested colour palette. You will find the dress code on every event card. Traditional Indian or Indo-western outfits are perfect for all four events." },
      { q: "Can I bring my family?", a: "Please add the number of guests in your RSVP so we can plan seating and food." },
      { q: "Is there parking at the venue?", a: "Valet parking and shuttle service will be available from the Grand Palace Hotel on both evenings." },
      { q: "Where can I stay?", a: "See the Travel & Stay section above for recommended places and how to reach Indore." },
      { q: "Can I take photos?", a: "Please do. We would love to see the celebrations through your eyes. A shared album link will be added to this website." },
      { q: "When should I reply?", a: "Kindly reply by 20th November 2026 using the RSVP form." },
    ],
  },

  // ---------- Closing ----------
  closing: {
    line: "Two Hearts, One Beautiful Journey, A Lifetime of Togetherness.",
    footer: "Made with love, for a celebration of forever.",
  },

  familyHosts: [
    { role: "Groom's Parents", names: "Smt. & Shri Kabra", title: "The Pillars of Strength" },
    { role: "Bride's Parents", names: "Smt. & Shri Rathi", title: "With Boundless Love" },
    { role: "Warmly Hosted By", names: "The Entire Kabra & Rathi Parivaar", title: "Awaiting Your Presence" },
  ],
};
