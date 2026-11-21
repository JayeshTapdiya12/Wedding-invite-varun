// =====================================================================
//  EXTRAS: couple photo reveal, photo-stack, share button, photo frame, easter egg
//  Photos live in /public/photos (e.g. "/photos/dsc00400.jpg"). Swap any of them for your own.
//  (put the files in the /public/photos folder). Portrait photos (4:5) work best.
// =====================================================================
export const extrasData = {
  couple: {
    eyebrow: "Two Hearts, One Story",
    heading: "Varun & Radhika",
    line: "Two families, one celebration.",
    groomPhoto: "/photos/dsc00400.jpg",
    bridePhoto: "/photos/neer4605.jpg",
    groomCaption: "Our beginning",
    brideCaption: "Our forever",
  },

  // Pinned photo stack: the page holds still while these photos fade from one to the next.
  stack: {
    eyebrow: "Moments Together",
    photos: [
      { src: "/photos/neer4543.jpg", caption: "Where it all began" },
      { src: "/photos/neer4761.jpg", caption: "Every road, together" },
      { src: "/photos/neer4909.jpg", caption: "The yes" },
      { src: "/photos/neer4912.jpg", caption: "And now, forever" },
    ],
  },

  share: {
    heading: "Share this invitation",
    text: "Know someone who should be here? Send them the invitation.",
    button: "Share on WhatsApp",
    message: "You are invited to the wedding of Varun & Radhika, 13th & 14th December 2026, Indore. #jabVmetR",
  },

  booth: {
    eyebrow: "Make It Yours",
    heading: "Wedding Selfie Frame",
    text: "Add your photo to a wedding frame and share it with #jabVmetR. Your photo stays on your phone and is never uploaded.",
  },

  // Tap the couple's names 5 times for a surprise.
  easterEgg: {
    message: "You found the secret! See you at the wedding 💛",
  },
};
