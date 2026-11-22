// =====================================================================
//  WARDROBE PLANNER, from the official planner picture (public/wardrobe/wardrobe.jpg).
//  The colours are inspiration, not rules. Edit freely.
// =====================================================================

export const wardrobeHeading = {
  eyebrow: "Dress For The Memories",
  heading: "The Celebration Edit",
  lead: "A little inspiration to make every celebration as beautiful and memorable as the occasion itself.",
};

export const wardrobePoster = {
  src: "/wardrobe/wardrobe.jpg",
  alt: "The official wardrobe planner: four couples dressed for Carnival, Reception, Mayra and the wedding",
  title: "The official planner",
  note: "Dress | Celebrate | Be a part of our story",
};

export const wardrobeCards = [
  {
    id: "carnival", event: "carnival", date: "13th December", time: "10:30 AM onwards", name: "Carnival", hindi: "कार्निवल",
    code: "Pastel Colours", edit: "The Pastel Affair", image: "/wardrobe/w-carnival.jpg",
    text: "Bright, playful and colourful outfits to match the fun carnival vibes.",
    ideas: "Lehengas, kurta sets, light sherwanis and co-ord sets in pastel tones.",
    swatches: [["Lavender", "#C9B9E4"], ["Blush", "#F1C9CE"], ["Sage", "#B9D3BC"], ["Powder blue", "#B7D2E6"], ["Cream", "#EFE3CF"]],
  },
  {
    id: "reception", event: "aashirwad", date: "13th December", time: "8:00 PM onwards", name: "Reception", hindi: "आशीर्वाद समारोह",
    code: "Formals", edit: "An Evening of Elegance", image: "/wardrobe/w-reception.jpg",
    text: "Elegant and sophisticated evening attire.",
    ideas: "Suits, blazers and tuxedos for men. Gowns, Indian formals or stylish sarees and lehengas for women.",
    swatches: [["Black", "#1F1D1D"], ["Navy", "#34405F"], ["Charcoal", "#6B6865"], ["Rose beige", "#CDB1A7"], ["Sand", "#E2CFB4"]],
  },
  {
    id: "mayra", event: "mayra", date: "14th December", time: "9:00 AM onwards", name: "Mayra", hindi: "मायरा",
    code: "Ethnic Dress", edit: "Rooted in Tradition", image: "/wardrobe/w-mairya.jpg",
    text: "Traditional ethnic outfits in vibrant colours to celebrate this special tradition.",
    ideas: "Kurtas, sherwanis, bandhgala, lehenga, saree and anarkali in bright festive tones.",
    swatches: [["Orange", "#D9731F"], ["Amber", "#E29A2E"], ["Gold", "#D8B16A"], ["Cream", "#EDDDC4"]],
  },
  {
    id: "phere", event: "panigrahan", date: "14th December", time: "5:30 PM onwards", name: "Wedding Phere", hindi: "पाणिग्रहण",
    code: "Traditional", edit: "Timeless Traditions", image: "/wardrobe/w-phere.jpg",
    text: "Traditional attire for a sacred and special occasion.",
    ideas: "Kurtas, sherwanis and bandhgalas for men. Lehengas, sarees and traditional outfits for women in rich, elegant tones.",
    swatches: [["Deep red", "#8F1D2C"], ["Red", "#B8282F"], ["Gold", "#D0A85C"], ["Cream", "#EDDDC4"]],
  },
];
