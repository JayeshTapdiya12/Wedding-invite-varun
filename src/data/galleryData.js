// Photo gallery (real photos live in /public/photos; thumbnails in /public/photos/thumb).
// `ratio` (width / height) sets the tile shape so the masonry feels editorial. Keep it close to the real photo.
// `thumb` is the small version used in the grid; the full `src` opens in the lightbox.

export const galleryHeading = {
  eyebrow: "Captured Memories",
  heading: "Moments to Remember",
};

export const galleryCategories = ["All Moments", "Cinema Date", "Windmill Hills", "Picnic & Night", "Heritage Doors", "Riverside & Temples"];

const ph = (name) => ({ src: `/photos/${name}.jpg`, thumb: `/photos/thumb/${name}.jpg` });

export const galleryData = [
  { id: 1, category: "Riverside & Temples", ratio: 1.5, ...ph("neer3964"), caption: "A promise for every tomorrow" },
  { id: 2, category: "Cinema Date", ratio: 0.667, ...ph("neer4441"), caption: "Front row to forever" },
  { id: 3, category: "Heritage Doors", ratio: 0.667, ...ph("dsc00400"), caption: "A quiet moment before the celebration" },
  { id: 4, category: "Windmill Hills", ratio: 1.5, ...ph("neer4543"), caption: "Every road, hand in hand" },
  { id: 5, category: "Riverside & Temples", ratio: 0.667, ...ph("neer3911"), caption: "Golden light, golden hearts" },
  { id: 6, category: "Cinema Date", ratio: 1.5, ...ph("neer4463"), caption: "Two hearts, one story" },
  { id: 7, category: "Picnic & Night", ratio: 0.667, ...ph("neer4747"), caption: "Her smile, his favourite view" },
  { id: 8, category: "Heritage Doors", ratio: 1.5, ...ph("dsc00485"), caption: "Our city, our love" },
  { id: 9, category: "Windmill Hills", ratio: 0.667, ...ph("neer4605"), caption: "Wind in our hair, you in my arms" },
  { id: 10, category: "Riverside & Temples", ratio: 0.667, ...ph("neer4201"), caption: "Written in stone, sealed in love" },
  { id: 11, category: "Picnic & Night", ratio: 1.5, ...ph("neer4761"), caption: "Laughing through the picnic" },
  { id: 12, category: "Cinema Date", ratio: 1.5, ...ph("neer4319"), caption: "Every glance, a scene from a film" },
  { id: 13, category: "Heritage Doors", ratio: 1.5, ...ph("dsc00491"), caption: "Behind every old door, a new beginning" },
  { id: 14, category: "Windmill Hills", ratio: 0.667, ...ph("neer4643"), caption: "Twinning, always" },
  { id: 15, category: "Riverside & Temples", ratio: 1.5, ...ph("neer4018"), caption: "The palace of our memories" },
  { id: 16, category: "Picnic & Night", ratio: 1.5, ...ph("neer4909"), caption: "City lights, and only you" },
  { id: 17, category: "Riverside & Temples", ratio: 0.667, ...ph("neer4142"), caption: "A step closer, every day" },
  { id: 18, category: "Cinema Date", ratio: 1.5, ...ph("neer4408"), caption: "The best scene of all" },
  { id: 19, category: "Picnic & Night", ratio: 1.5, ...ph("neer4912"), caption: "Forehead to forehead, forever" },
];
