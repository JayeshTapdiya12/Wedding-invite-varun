// Wedding festivities. `motif` picks the decorative illustration: marigold | mandala | arch | lotus
// Leave `mapLink` empty to auto-generate a Google Maps search link from venue + address,
// or paste the exact Google Maps share link for the venue.

export const eventsHeading = {
  eyebrow: "Join the Celebration",
  heading: "The Wedding Festivities",
  intro: "Two days of colour, music, ritual and love. Dress codes are a gentle suggestion to match the mood of each evening.",
};

export const eventsData = [
  {
    id: "mehendi",
    photos: [ // these photos slowly zoom and cross-fade on the event card
      { src: "/photos/neer4747.jpg", pos: "42% 40%" },
      { src: "/photos/neer4761.jpg", pos: "50% 45%" },
      { src: "/photos/neer4605.jpg", pos: "50% 40%" },
    ],
    short: "Mehendi & Haldi",
    day: "Day One • Sunday",
    date: "December 13, 2026",
    title: "Mehendi & Haldi Utsav",
    time: "11:00 AM Onwards",
    startISO: "2026-12-13T11:00:00+05:30", // used by Add to Calendar
    durationMin: 240, // how long the calendar entry lasts, adjust freely
    venue: "The Heritage Courtyard",
    address: "Main Lawn, Indore",
    description:
      "A sun-washed morning of henna, turmeric and laughter. Come hungry, dressed in yellows and greens, and ready to be smeared with love.",
    theme: "marigold",
    motif: "marigold",
    dressCode: "Marigold Yellow, Sage Green & Floral Pastels",
    swatches: [
      { name: "Marigold", hex: "#F59E0B" },
      { name: "Mehendi Green", hex: "#15803D" },
      { name: "Ivory Silk", hex: "#FDE68A" },
    ],
    mapLink: "",
  },
  {
    id: "sangeet",
    photos: [ // these photos slowly zoom and cross-fade on the event card
      { src: "/photos/neer4441.jpg", pos: "50% 35%" },
      { src: "/photos/neer4319.jpg", pos: "50% 40%" },
      { src: "/photos/neer4408.jpg", pos: "55% 40%" },
    ],
    short: "Sangeet",
    day: "Day One • Sunday Night",
    date: "December 13, 2026",
    title: "Sangeet & Royal Mehfil",
    time: "7:30 PM Onwards",
    startISO: "2026-12-13T19:30:00+05:30", // used by Add to Calendar
    durationMin: 240, // how long the calendar entry lasts, adjust freely
    venue: "Darbar Crystal Ballroom",
    address: "Grand Palace Hotel, Indore",
    description:
      "An evening of performances, music and a dance floor that does not close. Dress to shimmer: the families have been rehearsing for weeks.",
    theme: "forest",
    motif: "mandala",
    dressCode: "Indo-Western Glamour, Velvet & Shimmer",
    swatches: [
      { name: "Royal Emerald", hex: "#064E3B" },
      { name: "Midnight Blue", hex: "#1E1B4B" },
      { name: "Champagne Gold", hex: "#D4AF37" },
    ],
    mapLink: "",
  },
  {
    id: "baraat",
    photos: [ // these photos slowly zoom and cross-fade on the event card
      { src: "/photos/dsc00485.jpg", pos: "66% 50%" },
      { src: "/photos/dsc00491.jpg", pos: "50% 45%" },
      { src: "/photos/dsc00400.jpg", pos: "50% 40%" },
    ],
    short: "Baraat & Varmala",
    day: "Day Two • Monday",
    date: "December 14, 2026",
    title: "Shahi Baraat & Varmala",
    time: "6:30 PM Onwards",
    startISO: "2026-12-14T18:30:00+05:30", // used by Add to Calendar
    durationMin: 270, // how long the calendar entry lasts, adjust freely
    venue: "The Royal Palace Lawns",
    address: "Imperial Gardens, Indore",
    description:
      "The groom arrives in royal style, with dhol, dance and the whole parivaar. Then the varmala, and the first moment as a couple.",
    theme: "blush",
    motif: "arch",
    dressCode: "Traditional Royal Ethnic, Bandhgalas & Sarees",
    swatches: [
      { name: "Crimson Maroon", hex: "#7F1D1D" },
      { name: "Antique Gold", hex: "#B45309" },
      { name: "Blush Rose", hex: "#BE185D" },
    ],
    mapLink: "",
  },
  {
    id: "phere",
    photos: [ // these photos slowly zoom and cross-fade on the event card
      { src: "/photos/neer4201.jpg", pos: "50% 72%" },
      { src: "/photos/neer4142.jpg", pos: "50% 40%" },
      { src: "/photos/neer4018.jpg", pos: "58% 62%" },
    ],
    short: "Pheras",
    day: "Day Two • Auspicious Night",
    date: "December 14, 2026",
    title: "Pheras & Blessings",
    time: "11:15 PM Onwards",
    startISO: "2026-12-14T23:15:00+05:30", // used by Add to Calendar
    durationMin: 180, // how long the calendar entry lasts, adjust freely
    venue: "The Mandap Pavilion",
    address: "Imperial Gardens, Indore",
    description:
      "Seven vows around the sacred fire, at the muhurat chosen by the elders. The quietest and most important hour of the weekend.",
    theme: "ivory",
    motif: "lotus",
    dressCode: "Traditional Silk & Heritage Attire",
    swatches: [
      { name: "Sindoor Red", hex: "#991B1B" },
      { name: "Saffron", hex: "#D97706" },
      { name: "Pearl Cream", hex: "#FEF3C7" },
    ],
    mapLink: "",
  },
];
