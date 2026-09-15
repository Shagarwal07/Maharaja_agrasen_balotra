export interface ScheduleEvent {
  id: string;
  date: string;
  dateIso: string;
  dayLabelHi: string;
  dayLabelEn: string;
  time: string;
  time24: string;
  slotType: 'morning' | 'afternoon' | 'evening' | 'night';
  competition: string;
  competitionHi: string;
  category: string;
  categoryHi: string;
  venue: string;
  venueHi: string;
  isCompetition: boolean;
  inAppBadge?: boolean;
  description: string;
  descriptionHi: string;
  // Official Inner Details from Mobile App
  tagline?: string;
  aboutText?: string;
  bulletTitle?: string;
  bulletPoints?: string[];
  sections?: { title: string; points?: string[]; text?: string }[];
  footerNote?: string;
  ctaButton?: { label: string; actionUrl?: string };
  wallpaperUrl?: string;
}

export const JAYANTI_SCHEDULE: ScheduleEvent[] = [
  // --- 29 September (Tuesday) ---
  {
    id: "evt-01",
    date: "29 Sep",
    dateIso: "2026-09-29",
    dayLabelHi: "मंगलवार, 29 सितम्बर",
    dayLabelEn: "Tuesday, 29 September",
    time: "7:00 PM",
    time24: "19:00",
    slotType: "evening",
    competition: "Sundarkand Path",
    competitionHi: "सुन्दरकाण्ड पाठ",
    category: "Devotional Inauguration",
    categoryHi: "धार्मिक शुभारंभ",
    venue: "Vrindavan Bagechi",
    venueHi: "वृन्दावन बगीची",
    isCompetition: false,
    inAppBadge: false,
    description: "Sacred Sundarkand recitation and Mangal deepotsav to usher in Maharaja Agrasen Jayanti Mahotsav with divine blessings.",
    descriptionHi: "महाराजा अग्रसेन जयंती महोत्सव के शुभारंभ पर संगीतमय सुन्दरकाण्ड पाठ एवं पावन दीप प्रज्वलन।",
    wallpaperUrl: "/wallpapers/sundarkand.jpg",
    tagline: "An evening of collective recitation to open the Mahotsav...",
    aboutText: "The Mahotsav opens with a Sunderkand Path — the whole community seated together, reciting as one voice. It is the quietest evening of the month and, for many families, the one they come back for.\n\nYou do not need to know the verses. Copies are shared, the pace is unhurried, and most people simply follow along.",
    bulletTitle: "Coming along",
    bulletPoints: [
      "Open to everyone — men, women and children. No registration.",
      "Come a little early if you would like a place near the front.",
      "Children are welcome; the hall stays calm enough for them to sit through it.",
      "Prasad is distributed at the close."
    ],
    ctaButton: { label: "Navigate to Venue" }
  },

  // --- 30 September (Wednesday) ---
  {
    id: "evt-02",
    date: "30 Sep",
    dateIso: "2026-09-30",
    dayLabelHi: "बुधवार, 30 सितम्बर",
    dayLabelEn: "Wednesday, 30 September",
    time: "2:00 PM",
    time24: "14:00",
    slotType: "afternoon",
    competition: "Religious Quiz (Daily)",
    competitionHi: "धार्मिक प्रश्नोत्तरी (प्रतिदिन)",
    category: "Online Quiz",
    categoryHi: "ऑनलाइन प्रश्नोत्तरी",
    venue: "Online",
    venueHi: "ऑनलाइन (मोबाइल ऐप)",
    isCompetition: true,
    inAppBadge: true,
    description: "Daily in-app religious and cultural quiz testing knowledge on Agrawal heritage, Vedic traditions, and history.",
    descriptionHi: "मोबाइल ऐप पर प्रतिदिन दोपहर आयोजित होने वाली विशेष धार्मिक एवं अग्र-इतिहास प्रश्नोत्तरी।",
    wallpaperUrl: "/wallpapers/religious_quiz.jpg",
    tagline: "A friendly contest of scripture and tradition",
    aboutText: "A quiz drawn from scripture, festivals and the traditions the community grew up with. It is played for enjoyment, not to catch anyone out — the questions reward listening at home more than study.",
    bulletTitle: "Taking part",
    bulletPoints: [
      "Contestants are selected on the day from those who come forward.",
      "Everyone else takes part from the audience — the hall usually answers louder than the stage.",
      "Younger participants are grouped separately from adults."
    ],
    footerNote: "Exact format, timings and judging will be announced by the committee before the event. Please check this page again closer to the date.",
    ctaButton: { label: "Play today's quiz" }
  },

  // --- 1 October (Thursday) ---
  {
    id: "evt-03",
    date: "1 Oct",
    dateIso: "2026-10-01",
    dayLabelHi: "गुरुवार, 1 अक्टूबर",
    dayLabelEn: "Thursday, 1 October",
    time: "7:00 PM",
    time24: "19:00",
    slotType: "evening",
    competition: "Cricket Auction",
    competitionHi: "क्रिकेट ऑक्शन",
    category: "Sports Tournament",
    categoryHi: "खेलकूद प्रतियोगिता",
    venue: "Vrindavan Bagechi",
    venueHi: "वृन्दावन बगीची",
    isCompetition: true,
    inAppBadge: false,
    description: "Live bidding auction of cricket tournament players representing various community wards and teams.",
    descriptionHi: "अग्रसेन क्रिकेट टूर्नामेंट हेतु खिलाड़ियों का भव्य ऑक्शन एवं टीम चयन कार्यक्रम।",
    wallpaperUrl: "/wallpapers/cricket_auction.jpg",
    tagline: "Teams are built for the Mahotsav cricket tournament",
    aboutText: "The evening the cricket teams are put together. Registered players go under the hammer, team owners bid, and the tournament squads take shape in front of everyone.\n\nIt is as much an entertainment as a selection — expect loud bidding and louder reactions.",
    bulletTitle: "Who should come",
    bulletPoints: [
      "Every registered player, to see where they land.",
      "Team owners and their advisors.",
      "Anyone who enjoys the theatre of it — the hall is open to all."
    ],
    ctaButton: { label: "Navigate to Venue" }
  },

  // --- 3 October (Saturday) ---
  {
    id: "evt-04",
    date: "3 Oct",
    dateIso: "2026-10-03",
    dayLabelHi: "शनिवार, 3 अक्टूबर",
    dayLabelEn: "Saturday, 3 October",
    time: "10:00 AM",
    time24: "10:00",
    slotType: "morning",
    competition: "Medical Seminar",
    competitionHi: "मेडिकल सेमिनार",
    category: "Health & Wellness",
    categoryHi: "स्वास्थ्य एवं परामर्श",
    venue: "Laghu Udyog Mandal",
    venueHi: "लघु उद्योग मंडल",
    isCompetition: false,
    inAppBadge: false,
    description: "Specialist doctor consultations, general health check-up camp, and life-saving blood donation drive.",
    descriptionHi: "वरिष्ठ चिकित्सकों द्वारा निःशुल्क स्वास्थ्य परामर्श, जीवनशैली सुधार एवं स्वास्थ्य जांच शिविर।",
    wallpaperUrl: "/wallpapers/medical_seminar.jpg",
    tagline: "मेडीकल सेमिनार - Health & Wellness Consultation",
    aboutText: "Free health consultations, medical guidance, and preventive care checks by renowned community doctors and specialists across general medicine, cardiology, diabetes, pediatrics and lifestyle wellness.",
    bulletTitle: "Useful to know",
    bulletPoints: [
      "Free medical checkup and doctor consultation open for all.",
      "Blood sugar, blood pressure, and preliminary diagnostics available.",
      "Seniors and families are encouraged to attend."
    ],
    ctaButton: { label: "Navigate to Venue" }
  },

  // --- 4 October (Sunday) ---
  {
    id: "evt-05",
    date: "4 Oct",
    dateIso: "2026-10-04",
    dayLabelHi: "रविवार, 4 अक्टूबर",
    dayLabelEn: "Sunday, 4 October",
    time: "12:00 PM",
    time24: "12:00",
    slotType: "afternoon",
    competition: "Agrasen Udyam Sangam & e-Mitra Camp",
    competitionHi: "अग्रसेन उद्यम संगम व ई-मित्र कैम्प",
    category: "Business & Citizen Services",
    categoryHi: "व्यापार एवं जनसेवा",
    venue: "Vrindavan Bagechi",
    venueHi: "वृन्दावन बगीची",
    isCompetition: false,
    inAppBadge: false,
    description: "Entrepreneurship network confluence, business mentoring, and dedicated e-Mitra civic assistance camp for community families.",
    descriptionHi: "युवा उद्यमियों हेतु बिजनेस नेटवर्किंग सम्मेलन एवं समस्त सरकारी योजनाओं हेतु विशेष ई-मित्र सेवा शिविर।",
    wallpaperUrl: "/wallpapers/udyam_sangam.jpg",
    tagline: "Community businesses on display, with an eMitra helpdesk",
    aboutText: "A day for the community to see what the community makes. Local businesses take stalls — textiles, trade, services, produce — and families walk through, meet the people behind them, and buy where they like.\n\nAn eMitra camp runs alongside for anyone who needs help with documents and online applications.",
    bulletTitle: "Useful to know",
    bulletPoints: [
      "Free entry, open through the day.",
      "Stall enquiries go through the committee.",
      "Bring your documents if you intend to use the eMitra desk."
    ],
    ctaButton: { label: "Navigate to Venue" }
  },

  // --- 5 October (Monday) ---
  {
    id: "evt-06",
    date: "5 Oct",
    dateIso: "2026-10-05",
    dayLabelHi: "सोमवार, 5 अक्टूबर",
    dayLabelEn: "Monday, 5 October",
    time: "6:00 PM",
    time24: "18:00",
    slotType: "evening",
    competition: "Haat Mela",
    competitionHi: "हॉट मेला",
    category: "Fair & Exhibition",
    categoryHi: "पारिवारिक आनंद मेला",
    venue: "Juri Resort",
    venueHi: "जूरी रिसॉर्ट",
    isCompetition: false,
    inAppBadge: false,
    description: "Vibrant family fair featuring women-led handicraft stalls, traditional Rajasthani food bazaar, rides, and games.",
    descriptionHi: "महिला गृह-उद्योगी प्रदर्शनी, पारंपरिक स्वादों का मेला, झूले एवं पारिवारिक मनोरंजन के साथ भव्य हॉट मेला।",
    wallpaperUrl: "/wallpapers/haat_mela.jpg",
    tagline: "An open-air bazaar for the whole family",
    aboutText: "A haat mela in the old sense — stalls of cloth, bangles, toys, household things and street food, laid out in the open with families wandering between them. Less an event than an evening out.",
    bulletTitle: "Good to know",
    bulletPoints: [
      "Free entry; come and go as you please.",
      "Bring cash — most stalls are small traders.",
      "Best in the late afternoon and evening, once it cools."
    ],
    ctaButton: { label: "Navigate to Venue" }
  },

  // --- 6 October (Tuesday) ---
  {
    id: "evt-07",
    date: "6 Oct",
    dateIso: "2026-10-06",
    dayLabelHi: "मंगलवार, 6 अक्टूबर",
    dayLabelEn: "Tuesday, 6 October",
    time: "7:00 PM",
    time24: "19:00",
    slotType: "evening",
    competition: "Housie",
    competitionHi: "हाउजी (पारिवारिक खेल)",
    category: "Family Entertainment",
    categoryHi: "पारिवारिक गेम शो",
    venue: "Vrindavan Bagechi",
    venueHi: "वृन्दावन बगीची",
    isCompetition: true,
    inAppBadge: true,
    description: "Grand family Housie game night with live app synchronization and exciting prizes for participating families.",
    descriptionHi: "सैकड़ों परिवारों के साथ संगीतमय हाउजी (तम्बोला) प्रतियोगिता एवं आकर्षक पुरस्कार वितरण।",
    wallpaperUrl: "/wallpapers/housie.jpg",
    tagline: "The Mahotsav's biggest evening of numbers and nerves",
    aboutText: "Housie night fills the hall like nothing else in the month. Tickets in hand, pen ready, everyone waits on the next number — and the room goes quiet in a way it never does otherwise.",
    bulletTitle: "How it works",
    bulletPoints: [
      "Tickets are physical paper tickets, bought in person at the venue. There is no ticket sale in the app.",
      "The app can show a replica of your ticket and follow the numbers as they are called.",
      "A claim is only valid when the paper ticket is checked at the venue.",
      "Come early — tickets sell out, and seats near the front go first."
    ],
    ctaButton: { label: "Buy Housie ticket" }
  },

  // --- 9 October (Friday) ---
  {
    id: "evt-08",
    date: "9 Oct",
    dateIso: "2026-10-09",
    dayLabelHi: "शुक्रवार, 9 अक्टूबर",
    dayLabelEn: "Friday, 9 October",
    time: "4:00 PM",
    time24: "16:00",
    slotType: "afternoon",
    competition: "AI Workshop & Virtual Champs",
    competitionHi: "एआई वर्कशॉप एवं वर्चुअल चैंप्स",
    category: "Tech & Innovation",
    categoryHi: "तकनीक एवं नवाचार",
    venue: "Vrindavan Bagechi",
    venueHi: "वृन्दावन बगीची",
    isCompetition: true,
    inAppBadge: false,
    description: "Hands-on Artificial Intelligence learning workshop for students and youth, followed by esports and gaming championship.",
    descriptionHi: "विद्यार्थियों हेतु आधुनिक आर्टिफिशियल इंटेलिजेंस कार्यशाला एवं रोमांचक वर्चुअल गेमिंग प्रतियोगिता।",
    wallpaperUrl: "/wallpapers/ai_workshop.jpg",
    tagline: "AI Workshop & Virtual Champs for youth and students",
    aboutText: "An interactive technology workshop introducing students to practical Artificial Intelligence tools, creative generation, coding foundations, and virtual championship games.",
    bulletTitle: "Useful to know",
    bulletPoints: [
      "Open to students from Class 6 to college.",
      "No coding background required.",
      "Bring a charged smartphone or tablet if possible."
    ],
    ctaButton: { label: "Navigate to Venue" }
  },

  // --- 9 October (Friday) ---
  {
    id: "evt-09",
    date: "9 Oct",
    dateIso: "2026-10-09",
    dayLabelHi: "शुक्रवार, 9 अक्टूबर",
    dayLabelEn: "Friday, 9 October",
    time: "6:00 PM",
    time24: "18:00",
    slotType: "evening",
    competition: "Shiksha Samman & Samvad",
    competitionHi: "शिक्षा सम्मान एवं संवाद",
    category: "Merit Felicitation",
    categoryHi: "प्रतिभा सम्मान समारोह",
    venue: "Vrindavan Bagechi",
    venueHi: "वृन्दावन बगीची",
    isCompetition: false,
    inAppBadge: true,
    description: "Honoring academic achievers, competitive exam toppers, and young talents followed by career mentorship dialogue.",
    descriptionHi: "बोर्ड व प्रतियोगी परीक्षाओं में उत्कृष्ट प्रदर्शन करने वाले मेधावी छात्र-छात्राओं का भव्य सम्मान एवं कैरियर मार्गदर्शन।",
    wallpaperUrl: "/wallpapers/shiksha_samman.jpg",
    tagline: "Honouring the community's students, and hearing from them",
    aboutText: "The community's bright students are felicitated on stage — not only the toppers, but everyone whose year deserves marking. A samvad follows, where students and elders talk to each other rather than at each other.\n\nFor many parents this is the evening of the Mahotsav.",
    bulletTitle: "For students and parents",
    bulletPoints: [
      "Entries are submitted through the app's Shiksha Samman section.",
      "A marksheet must be photographed live in the app — saved image files are not accepted, so that results cannot be edited before submission.",
      "Entries are verified by the committee before the ceremony."
    ],
    ctaButton: { label: "Submit student details" }
  },

  // --- 11 October (Sunday - Agrasen Jayanti Main Day) ---
  {
    id: "evt-10",
    date: "11 Oct",
    dateIso: "2026-10-11",
    dayLabelHi: "रविवार, 11 अक्टूबर (मुख्य जयंती)",
    dayLabelEn: "Sunday, 11 October (Main Jayanti)",
    time: "7:00 AM",
    time24: "07:00",
    slotType: "morning",
    competition: "Flag Hoisting & Havan",
    competitionHi: "ध्वजारोहण एवं हवन",
    category: "Auspicious Ceremony",
    categoryHi: "मंगल ध्वजारोहण व महाहवन",
    venue: "Vrindavan Bagechi",
    venueHi: "वृन्दावन बगीची",
    isCompetition: false,
    inAppBadge: false,
    description: "Ceremonial hoisting of the royal Agroha flag followed by 18 Gotra Maha Yagya and sacred Vedic Havan.",
    descriptionHi: "अग्र-कुल ध्वजारोहण, मंगल कलश स्थापना एवं 18 गोत्रों के निमित्त आहुतियों के साथ पावन महाहवन।",
    wallpaperUrl: "/wallpapers/havan.jpg",
    tagline: "Jayanti day begins — flag, fire and the first prayers",
    aboutText: "Jayanti day opens at first light. The flag is raised, the havan is lit, and the community gathers around it before the streets fill for the procession.\n\nIt is the smallest gathering of the day and the one that sets its tone.",
    bulletTitle: "If you are coming",
    bulletPoints: [
      "Reach early — this begins before the rest of the day's events.",
      "Traditional dress is customary.",
      "Sit where you can; there is no seating order.",
      "The Grand Procession follows from here, so many families stay on."
    ],
    ctaButton: { label: "Navigate to Venue" }
  },
  {
    id: "evt-11",
    date: "11 Oct",
    dateIso: "2026-10-11",
    dayLabelHi: "रविवार, 11 अक्टूबर (मुख्य जयंती)",
    dayLabelEn: "Sunday, 11 October (Main Jayanti)",
    time: "9:00 AM",
    time24: "09:00",
    slotType: "morning",
    competition: "Grand Procession",
    competitionHi: "विशाल जुलूस (भव्य शोभायात्रा)",
    category: "Royal Chariot Yatra",
    categoryHi: "भव्य रथ यात्रा व झांकियां",
    venue: "From Vrindavan Bagechi",
    venueHi: "वृन्दावन बगीची से नगर भ्रमण",
    isCompetition: false,
    inAppBadge: false,
    description: "Grand city procession with royal chariot of Maharaja Agrasen, 18 gotra tableaus, brass bands, and flower showers.",
    descriptionHi: "महाराजा अग्रसेन जी के सुसज्जित स्वर्ण रथ, 18 गोत्र झांकियों, बैंड-बाजों एवं पुष्पवर्षा के साथ विशाल शोभायात्रा।",
    wallpaperUrl: "/wallpapers/grand_procession.jpg",
    tagline: "Jayanti morning — the whole community on the street",
    aboutText: "The Grand Procession is the heart of Agrasen Jayanti. It is the one morning in the year when the whole community leaves its homes and shops and walks together through Balotra — behind the decorated chariot, to the sound of dhol and folk song, under marigolds strung across the street.\n\nIt is not a performance to be watched. Everyone walks.",
    sections: [
      {
        title: "What to expect",
        points: [
          "Folk musicians and drummers lead the procession.",
          "The decorated chariot follows, garlanded and lit.",
          "Families walk behind it, neighbourhood by neighbourhood.",
          "The route passes through the main bazaar, where shops and homes welcome the procession."
        ]
      },
      {
        title: "Taking part",
        points: [
          "Open to every member of the community. No registration and no fee — simply reach the assembly point.",
          "Traditional dress is encouraged. Many families dress in saffron, red and gold.",
          "Children are very welcome, but please keep them with an adult for the whole route.",
          "Guests and friends from outside the community are welcome to join."
        ]
      },
      {
        title: "Before you come",
        points: [
          "Reach Vrindavan Bagechi by 8:30 AM. The procession leaves at 9:00 sharp.",
          "Wear comfortable footwear — the route is walked from start to finish.",
          "Carry water. October mornings are pleasant, but the walk is long and the sun climbs.",
          "Please leave two-wheelers and cars outside the procession line."
        ]
      },
      {
        title: "If walking is difficult",
        text: "Elders and anyone who cannot manage the full route are warmly encouraged to come anyway and join at the closing point, or to watch from along the bazaar. Please tell a volunteer if you need a place to sit.\n\nCommittee volunteers will be present along the route. If you are separated from your family, ask any volunteer for help."
      }
    ],
    ctaButton: { label: "Navigate to Venue" }
  },
  {
    id: "evt-12",
    date: "11 Oct",
    dateIso: "2026-10-11",
    dayLabelHi: "रविवार, 11 अक्टूबर (मुख्य जयंती)",
    dayLabelEn: "Sunday, 11 October (Main Jayanti)",
    time: "7:00 PM",
    time24: "19:00",
    slotType: "evening",
    competition: "Cultural Evening",
    competitionHi: "सांस्कृतिक संध्या",
    category: "Grand Cultural Night",
    categoryHi: "भव्य सांस्कृतिक संध्या व महाआरती",
    venue: "Vrindavan Bagechi",
    venueHi: "वृन्दावन बगीची",
    isCompetition: false,
    inAppBadge: false,
    description: "Soulful musical night, dance drama on Maharaja Agrasen's life, prize distribution, and concluding 1008 Deep Maha Aarti.",
    descriptionHi: "महाराजा अग्रसेन जीवन गाथा पर आधारित भव्य नाट्य मंचन, पुरस्कार वितरण एवं 1008 दीपों से महाआरती।",
    wallpaperUrl: "/wallpapers/cultural_evening.jpg",
    tagline: "The community's own stage — dance, music and drama",
    aboutText: "The evening of Jayanti day belongs to the stage. Children who have rehearsed for weeks, folk dance, music, and the occasional skit that the whole town quotes for a year afterwards.\n\nPerformers are from the community itself — this is not a hired show.",
    bulletTitle: "For the audience",
    bulletPoints: [
      "Open to all, no ticket.",
      "Come early for seats; it fills quickly after dark.",
      "Bring something warm — October evenings turn cool by the end."
    ],
    ctaButton: { label: "Navigate to Venue" }
  },

  // --- 13 October (Tuesday) ---
  {
    id: "evt-13",
    date: "13 Oct",
    dateIso: "2026-10-13",
    dayLabelHi: "मंगलवार, 13 अक्टूबर",
    dayLabelEn: "Tuesday, 13 October",
    time: "11:00 AM",
    time24: "11:00",
    slotType: "morning",
    competition: "Community Feast",
    competitionHi: "सामूहिक भोज (प्रसादी)",
    category: "Mahaprasad",
    categoryHi: "महाप्रसादी व स्नेह मिलन",
    venue: "Vrindavan Bagechi",
    venueHi: "वृन्दावन बगीची",
    isCompetition: false,
    inAppBadge: false,
    description: "Sacred community feast (Prasadi) bringing together thousands of community members in the spirit of unity and harmony.",
    descriptionHi: "महाराजा अग्रसेन जी के पावन भोग उपरांत समस्त समाज बंधुओं का समरसता व सद्भाव के साथ सामूहिक स्नेह भोज।",
    wallpaperUrl: "/wallpapers/community_feast.jpg",
    tagline: "The Mahotsav closes the way it should — everyone eating together",
    aboutText: "The month closes with the whole community eating together. Long rows on the floor, thalis, volunteers moving down the lines, and no seating by status — you sit where there is space.\n\nIf you attend only one thing all month, the elders would tell you to make it this.",
    bulletTitle: "Coming along",
    bulletPoints: [
      "Open to every family. No registration, no charge.",
      "Come on time — serving happens in sittings, and later ones are rushed.",
      "Volunteers are always needed; tell the committee if you can help serve."
    ],
    ctaButton: { label: "Navigate to Venue" }
  }
];

export function generateWhatsAppLink(event: ScheduleEvent): string {
  const text = `🎉 *Agrasen Jayanti 2026 Event Invitation* 🎉\n\n📌 *${event.competition}* (${event.competitionHi})\n📅 *Date:* ${event.date} 2026 (${event.dayLabelEn})\n⏰ *Time:* ${event.time}\n📍 *Venue:* ${event.venue}\n🏷️ *Category:* ${event.category}\n\n👉 Full schedule & live tracker: ${typeof window !== 'undefined' ? window.location.origin : 'https://agrasenjayanti.org'}\n॥ जय श्री अग्रसेन ॥`;
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
}

export function generateGoogleCalendarUrl(event: ScheduleEvent): string {
  const startTime = `${event.dateIso.replace(/-/g, '')}T${event.time24.replace(':', '')}00`;
  const startHour = parseInt(event.time24.split(':')[0], 10);
  const endHour = (startHour + 2).toString().padStart(2, '0');
  const endTime = `${event.dateIso.replace(/-/g, '')}T${endHour}${event.time24.split(':')[1]}00`;

  const details = `${event.description}\nCategory: ${event.category}\nVenue: ${event.venue}`;
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.competition + ' - Agrasen Jayanti 2026')}&dates=${startTime}/${endTime}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(event.venue)}`;
}
