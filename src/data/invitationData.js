// =====================================================================
//  FROM THE PRINTED INVITATION: the pages, the two families and the contact numbers.
//  Everything here is copied from the card. To change a number, edit it here.
//  PRIVACY: this website is public, so these phone numbers are visible to anyone who opens it.
//  Delete any line you do not want published (they are also printed on the invitation itself).
// =====================================================================

export const invitationHeading = {
  eyebrow: "परिणयोत्सव",
  heading: "Our Wedding Invitation",
  lead: "The card, exactly as it was sent to our families. Turn the pages, or download it to keep.",
};

// Pages of public/documents/Varun-Radhika-Invitation.pdf, as pictures in public/invitation
export const invitationPages = [
  { src: "/invitation/page-01.jpg", label: "The invitation" },
  { src: "/invitation/page-02.jpg", label: "Mangal Parinay" },
  { src: "/invitation/page-03.jpg", label: "13th December: Shubharambh" },
  { src: "/invitation/page-04.jpg", label: "13th December: Carnival" },
  { src: "/invitation/page-05.jpg", label: "13th December: Sagai" },
  { src: "/invitation/page-06.jpg", label: "13th December: Aashirwad Samaroh" },
  { src: "/invitation/page-07.jpg", label: "14th December: Mayra" },
  { src: "/invitation/page-08.jpg", label: "14th December: Mangal Parinay" },
  { src: "/invitation/page-09.jpg", label: "The venue" },
  { src: "/invitation/page-10.jpg", label: "With our families" },
  { src: "/invitation/page-11.jpg", label: "Contacts" },
];
export const invitationPdf = "/documents/Varun-Radhika-Invitation.pdf";

export const familiesHeading = {
  eyebrow: "Mangal Parinay",
  heading: "Our Families",
  lead: "With the blessings of the Almighty and the elders, a joyous occasion has come to our families.",
};

export const families = [
  {
    side: "Groom's Family",
    name: "Varun",
    hindi: "वरुण",
    lines: [
      "Grandson of Smt. Dr. Puran Kanta Kabra & Shri Ramkrishna Kabra",
      "Son of Smt. Preeti & Shri Anand Kabra",
    ],
  },
  {
    side: "Bride's Family",
    name: "Radhika",
    hindi: "राधिका",
    lines: [
      "Granddaughter of Smt. Pushpadevi ji & Shri Sureshchand ji Rathi",
      "Daughter of Smt. Priyanka ji & Shri Saurabh ji Rathi",
    ],
  },
];

// Names exactly as printed (in Hindi). They are shown in both languages.
export const welcomeLists = [
  { title: "प्रतीक्षारत", english: "Awaiting your presence", names: ["सौ. डॉ. पूरण कांता काबरा - रामकृष्ण काबरा", "सौ. प्रीति काबरा - आनंद काबरा"] },
  { title: "दर्शनाभिलाषी", english: "With warm regards", names: ["सौ. लक्ष्मी देवी - श्री बालकृष्ण", "श्री जयकृष्ण", "श्रीमती शशि", "श्रीमती शारदा", "श्रीमती उषा", "श्रीमती वीणा (मुंबई)", "सौ. सरिता - डॉ. प्रवीण", "सौ. विनीता - मनीष"] },
  { title: "स्वागतातुर", english: "Eagerly welcoming you", names: ["सौ. गीता - मनोज", "सौ. सरोज - राजीव", "सौ. रुचि - मनीष", "मनमोहन", "सौ. सारिका - अतुल", "सौ. पूजा - घनश्याम", "सौ. पूजा - रूपेश", "डॉ. मिलन - डॉ. सागर", "सौ. आकांक्षा - सार्थक"] },
  { title: "युवा मेज़बान", english: "Young hosts", names: ["चाहत - रिया - अक्षत - आदित्य - अंशुमन", "प्रथम - शाश्वी"] },
  { title: "स्नेहिल मनुहार", english: "Samast Kabra Parivar", names: ["सौ. वीणा - श्री गोपाल जी अजमेरा", "सौ. दीपाली - श्री श्याम जी मंत्री", "सौ. डॉ. कविता - सीए नितिन जी गांधी"] },
];

export const contactsHeading = { eyebrow: "Need Help?", heading: "Who to Call", lead: "Our family is happy to help with anything, from directions to arrangements." };

// phone = digits with country code 91 (used for the call and WhatsApp buttons). Remove any line to hide it.
export const contacts = [
  { name: "Ramkrishna Kabra", hindi: "रामकृष्ण काबरा", place: "Indore", phone: "919303260050", shown: "93032 60050" },
  { name: "Anand Kabra", hindi: "आनंद काबरा", place: "Hyderabad", phone: "919052777743", shown: "90527 77743" },
  { name: "Nitin Ji Gandhi", hindi: "नितिन जी गांधी", place: "", phone: "919850364027", shown: "98503 64027" },
  { name: "Suyash Tapadiya", hindi: "सुयश तापड़िया", place: "", phone: "918359838283", shown: "83598 38283" },
  { name: "Jayesh Tapadiya", hindi: "जयेश तापड़िया", place: "", phone: "917869148854", shown: "78691 48854" },
  { name: "Aditya Gandhi", hindi: "आदित्य गांधी", place: "", phone: "919309352512", shown: "93093 52512" },
  { name: "Rajeev Kabra", hindi: "राजीव काबरा", place: "", phone: "919425058316", shown: "94250 58316" },
];
