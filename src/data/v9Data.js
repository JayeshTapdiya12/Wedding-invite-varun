// =====================================================================
//  v9 FEATURES: stories, swipe game, love map, Indore guide, table finder, weather, song requests,
//  time capsule, thank-you page, offline app, link tracking.
//  Everything you can edit is in this file. Anything marked SAMPLE is a placeholder: replace it.
// =====================================================================

export const v9Data = {
  // ---------- Stories (Instagram-style, built automatically from the gallery categories) ----------
  stories: {
    eyebrow: "Tap Through",
    heading: "Our Stories",
    lead: "Tap a circle and watch our story, one moment at a time.",
    secondsPerSlide: 4.5,
  },

  // ---------- Swipe game ----------
  swipe: {
    eyebrow: "Just For Fun",
    heading: "Swipe Right on Us",
    lead: "Swipe right if you love the photo. Swipe left if you... well, try it.",
    // The photos come from the gallery (galleryData.js). `count` = how many cards.
    count: 8,
    finish: "Every single photo got a heart. We knew you had taste.",
    // What happens when someone swipes left. It always turns into a heart.
    leftReply: "Nice try. It's a heart anyway.",
  },

  // ---------- Love map (a hand-drawn route through the places that mattered) ----------
  // A drawn story map, not a GPS map. Put the stops in order. `x`/`y` are positions inside a 400 x 620 canvas.
  loveMap: {
    eyebrow: "Our Route",
    heading: "The Road That Led Here",
    lead: "Four places in Indore that quietly became ours.",
    stops: [
      { x: 90, y: 70, emoji: "🎬", title: "The Cinema", text: "Front row seats, and neither of us remembers the film. We remember the popcorn and the pretending not to look.", photo: "/photos/neer4441.jpg" },
      { x: 290, y: 220, emoji: "🌬️", title: "The Windmill Hills", text: "Long drive, strong wind, and a view that made us both go quiet. The day we knew this was something real.", photo: "/photos/neer4543.jpg" },
      { x: 110, y: 380, emoji: "🏰", title: "Rajwada", text: "Old doors, older stories, and the first time we imagined the city as ours together.", photo: "/photos/dsc00485.jpg" },
      { x: 280, y: 540, emoji: "🛕", title: "The River Temple", text: "Where we asked for blessings, quietly, before we asked anyone else.", photo: "/photos/neer3911.jpg" },
    ],
  },

  // ---------- Teaser video at the very top (hidden while src is empty) ----------
  // Put a short muted clip (10-20 seconds, under 8 MB) in /public/videos and set src: "/videos/teaser-loop.mp4".
  teaser: {
    src: "",
    poster: "/photos/neer3964.jpg",
    eyebrow: "A Little Preview",
    caption: "Ten seconds of us. The full story is below.",
  },

  // ---------- Indore guide (for guests from out of town) ----------
  // SAMPLE content from general knowledge. Please have family check the places and timings before you share the site.
  guide: {
    eyebrow: "Welcome to Indore",
    heading: "What to Eat & See",
    lead: "Our city is famous for two things: food and hospitality. Here is where we would take you.",
    note: "Timings and openings change. Please check before you go.",
    tabs: [
      {
        id: "eat",
        label: "Eat",
        items: [
          { name: "Poha & Jalebi", area: "Everywhere, early morning", text: "The Indori breakfast. Soft poha with sev, a squeeze of lemon, and hot jalebi on the side.", map: "Poha jalebi Indore" },
          { name: "Sarafa Bazaar", area: "Old city, after 8 pm", text: "A jewellery market by day that turns into a street-food paradise at night. Try garadu, bhutte ka kees and malpua.", map: "Sarafa Bazaar Indore" },
          { name: "Chappan Dukan", area: "New Palasia", text: "A lane of 56 shops with Indore's famous chaat, kachori, dahi vada and sweets.", map: "Chappan Dukan Indore" },
          { name: "Indori Namkeen", area: "Any sweet shop", text: "Bring some home. Sev, mixture and ratlami sev travel well in a sealed box.", map: "Namkeen shop Indore" },
        ],
      },
      {
        id: "see",
        label: "See",
        items: [
          { name: "Rajwada Palace", area: "Old city", text: "The seven-storey Holkar palace. The courtyard is lovely at golden hour.", map: "Rajwada Indore" },
          { name: "Lal Bagh Palace", area: "Near Kanadia Road", text: "A grand royal residence with gardens and old-world interiors.", map: "Lal Bagh Palace Indore" },
          { name: "Khajrana Ganesh Temple", area: "Khajrana", text: "One of the city's most loved temples. A good first stop to seek blessings.", map: "Khajrana Ganesh Temple Indore" },
          { name: "Patalpani Waterfall", area: "About 35 km away", text: "A green day trip, best after the rains. Check road and season first.", map: "Patalpani Waterfall" },
        ],
      },
      {
        id: "day",
        label: "Day trips",
        items: [
          { name: "Ujjain", area: "About 55 km", text: "Mahakaleshwar Temple and the ghats of the Shipra. Allow a full day and an early start.", map: "Mahakaleshwar Ujjain" },
          { name: "Omkareshwar", area: "About 80 km", text: "A sacred island temple on the Narmada. Good for a peaceful morning.", map: "Omkareshwar" },
          { name: "Mandu", area: "About 95 km", text: "Ruined palaces and wide green views. Worth it if you have an extra day.", map: "Mandu Madhya Pradesh" },
        ],
      },
    ],
    tips: [
      "December evenings in Indore are cool. Carry a light shawl or jacket.",
      "Cabs and autos are easy to find. Pre-book from the airport or station.",
      "Plenty of street food is vegetarian. Ask for no onion or garlic if you need it.",
    ],
  },

  // ---------- Table / room finder ----------
  // Shows only from `showFrom` ("before" = always, "during" = on the wedding days). Guests type their name.
  // PRIVACY: names in this list are readable in the website code. Use first names or family names only, no phone numbers.
  // SAMPLE rows below: replace them, or set enabled to false.
  seating: {
    enabled: true,
    showFrom: "during",
    eyebrow: "On the Day",
    heading: "Find Your Table",
    lead: "Type your name to find your table and your room.",
    placeholder: "Type your name",
    empty: "We could not find that name. Please ask any member of the family at the welcome desk.",
    guests: [
      { name: "Sharma Family", table: "Table 4", room: "Room 201", note: "Near the stage" },
      { name: "Mehta Ji & Family", table: "Table 2", room: "Room 305", note: "" },
      { name: "College Friends", table: "Table 9", room: "Rooms 110 to 114", note: "Dance floor side" },
    ],
  },

  // ---------- Weather ----------
  // Real forecast from Open-Meteo (free, no key). A forecast exists only for the next ~16 days, so before that
  // it shows typical December weather. Nothing is sent about the guest.
  weather: {
    enabled: true,
    eyebrow: "Pack Smart",
    heading: "Indore Weather",
    latitude: 22.7196,
    longitude: 75.8577,
    dates: ["2026-12-13", "2026-12-14"],
    typical: "December in Indore: pleasant afternoons around 27°C, cool evenings and nights around 12°C.",
    packing: "Light cottons for the day, a shawl or jacket for the evenings.",
  },

  // ---------- Song requests (collected like RSVPs, see README) ----------
  songs: {
    enabled: true,
    eyebrow: "Your Playlist",
    heading: "What Should We Dance To?",
    lead: "Request a song for the Sangeet. The DJ will see every request.",
    max: 3,
    thanks: "Added to the playlist. Request another?",
  },

  // ---------- Time capsule ----------
  // Guests write a note now. It is meant to be opened on the first anniversary.
  capsule: {
    enabled: true,
    eyebrow: "A Letter to the Future",
    heading: "Time Capsule",
    lead: "Write a note to Varun & Radhika. We will open the capsule on our first anniversary.",
    openISO: "2027-12-14T00:00:00+05:30",
    openLabel: "14th December 2027",
    readUrl: "", // after the date, set this to the same web-app URL; notes appear as a wall (see README)
    thanks: "Sealed in the capsule. See you on our first anniversary.",
  },

  // ---------- Thank-you page (shown automatically after the wedding) ----------
  thanks: {
    eyebrow: "With Gratitude",
    heading: "Thank You, From Our Hearts",
    text: "You made our wedding everything we dreamed of. Here are a few things to take home.",
    filmUrl: "", // link to the wedding highlight film (YouTube / Drive). Hidden while empty.
    filmButton: "Watch the wedding film",
    cardMessage: "Thank you for celebrating with us.",
    // Favourite photos guests can download in full size (from /public/photos)
    downloads: ["neer3964", "neer4201", "neer4543", "dsc00485", "neer4912", "neer4605"],
  },

  // ---------- Link-opened tracking (anonymous: only the personal-link name is recorded) ----------
  // Needs the same web-app URL as the RSVP. Records "who opened their link" so you can send reminders to the rest.
  tracking: { enabled: true },

  // ---------- Reminder messages (used by `npm run reminders`) ----------
  reminders: [
    { id: "30days", daysBefore: 30, text: "Namaste {name} 🙏\nOnly 30 days to go for Varun & Radhika's wedding (13th & 14th Dec, Indore)! Please RSVP and see all the details here:\n{link}" },
    { id: "7days", daysBefore: 7, text: "Namaste {name} 🙏\nJust 7 days to go! Travel, stay and the weather are all on your invitation page:\n{link}" },
    { id: "1day", daysBefore: 1, text: "Namaste {name} 🙏\nTomorrow is the day! The venue, timings and directions are here:\n{link}\nCan't wait to see you." },
  ],
};
