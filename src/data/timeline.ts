export interface TimelineNode {
  id: string;
  yearEra: string;
  titleEn: string;
  titleHi: string;
  locationEn: string;
  locationHi: string;
  significanceEn: string;
  significanceHi: string;
  icon: string;
  detailsEn: string;
  detailsHi: string;
}

export const TIMELINE_DATA: TimelineNode[] = [
  {
    id: "tl-01",
    yearEra: "Suryavanshi Lineage",
    titleEn: "Birth & Divine Lineage at Pratapnagar",
    titleHi: "सूर्यवंश में जन्म व प्रताप नगर का राज्य",
    locationEn: "Pratapnagar (Punjab/Haryana Border)",
    locationHi: "प्रतापनगर",
    significanceEn: "Descendant of King Mandhata & Lord Rama's son Kusha",
    significanceHi: "श्री राम के सुपुत्र कुश के 34वें वंशज",
    icon: "☀️",
    detailsEn: "Born to King Vallabh Sen and Queen Bhagvati Devi. Maharaja Agrasen was endowed with noble Kshatriya virtues, exceptional diplomatic foresight, and profound compassion for all living beings.",
    detailsHi: "राजा वल्लभ सेन एवं महारानी भगवती देवी के ज्येष्ठ पुत्र के रूप में अवतरण। बाल्यकाल से ही शास्त्र और शस्त्र विद्या में पारंगत तथा प्रजावत्सल।"
  },
  {
    id: "tl-02",
    yearEra: "Swayamvara & Alliance",
    titleEn: "Wedding to Princess Madhavi",
    titleHi: "नागराज पुत्री राजकुमारी माधवी से स्वयंवर",
    locationEn: "Nagavansha Kingdom",
    locationHi: "नागलोक / नाग प्रदेश",
    significanceEn: "Alliance uniting Suryavanshi and Nagavanshi dynasties",
    significanceHi: "सूर्यवंश व नागवंश का ऐतिहासिक सामंजस्य",
    icon: "👑",
    detailsEn: "In an auspicious Swayamvara, Princess Madhavi chose Maharaja Agrasen over Devraj Indra, admiring his sublime modesty, inner nobility, and sovereign virtue.",
    detailsHi: "राजकुमारी माधवी ने देवराज इंद्र के स्थान पर महाराजा अग्रसेन के शील, शौर्य और धर्मपरायणता को देखकर वरमाला पहनाई।"
  },
  {
    id: "tl-03",
    yearEra: "Divine Penance",
    titleEn: "Blessing of Goddess Mahalakshmi",
    titleHi: "माँ महालक्ष्मी की घोर तपस्या व वरदान",
    locationEn: "Kolhapur & Agroha Tirth",
    locationHi: "कोल्हापुर व अग्रोहा तीर्थ",
    significanceEn: "Mahalakshmi declared as the eternal Kuldevi of Agrawals",
    significanceHi: "अग्रकुल की आराध्या कुलदेवी माँ महालक्ष्मी",
    icon: "🪷",
    detailsEn: "Seeking eternal prosperity without territorial bloodshed, Agrasen performed intense penance. Mata Mahalakshmi appeared, blessing his clan with perennial wealth, commercial prominence, and righteous conduct.",
    detailsHi: "देवी महालक्ष्मी ने प्रसन्न होकर वरदान दिया कि तुम्हारे वंशज कभी दरिद्र नहीं रहेंगे तथा व्यापार व सत्य के मार्ग से संसार में समृद्धि लाएंगे।"
  },
  {
    id: "tl-04",
    yearEra: "Agroha Republic",
    titleEn: "Founding of Agroha & 'Ek Rupya, Ek Eent'",
    titleHi: "अग्रोहा गणराज्य एवं 'एक रुपया, एक ईंट' का सिद्धांत",
    locationEn: "Agroha (Hisar, Haryana)",
    locationHi: "अग्रोहा धाम (हिसार, हरियाणा)",
    significanceEn: "First recorded egalitarian socialist democracy in human history",
    significanceHi: "विश्व का प्रथम समाजवादी लोकतांत्रिक गणराज्य",
    icon: "🧱",
    detailsEn: "Every immigrant family settling in Agroha was granted one brick and one rupee from every existing household. This guaranteed instant shelter and capital without debts, bonded labour, or begging.",
    detailsHi: "अग्रोहा में आने वाले प्रत्येक नए परिवार को नगर का हर निवासी एक ईंट और एक रुपया उपहार में देता था, जिससे बिना किसी ऋण या याचना के नवआगंतुक का घर और व्यापार स्थापित हो जाता था।"
  },
  {
    id: "tl-05",
    yearEra: "The 18 Mahayajnas",
    titleEn: "The Ahimsa Vow & Birth of 18 Gotras",
    titleHi: "18 महायज्ञ, अहिंसा का उद्घोष व 18 गोत्रों की स्थापना",
    locationEn: "Agroha Yajnashala",
    locationHi: "अग्रोहा यज्ञशाला",
    significanceEn: "Renunciation of animal sacrifice; conversion to Ahimsa & Vaishya ethos",
    significanceHi: "पशुबलि का त्याग, अहिंसा और 18 गोत्रों का सृजन",
    icon: "🕊️",
    detailsEn: "During the 18th Yajna, observing a horse tremble in agony before sacrifice, Agrasen stopped the rite immediately, declaring: 'Living beings are all children of the Divine. Non-violence is the supreme Dharma.' The 18 sages each founded one of the 18 Agrawal Gotras for his 18 sons.",
    detailsHi: "18वें यज्ञ में मूक पशु की वेदना देखकर महाराजा अग्रसेन का हृदय द्रवित हो उठा। उन्होंने तत्क्षण यज्ञ रोककर अहिंसा को सर्वोपरि धर्म घोषित किया और 18 ऋषियों के नाम पर 18 गोत्रों की रचना की।"
  },
  {
    id: "tl-06",
    yearEra: "Historical Diaspora",
    titleEn: "The Great Migration & Pan-India Diaspora",
    titleHi: "अग्रोहा से राष्ट्रव्यापी महाप्रस्थान व व्यापार विस्तार",
    locationEn: "Marwar, Shekhawati, Braj, Delhi, Kashi, Bengal & Beyond",
    locationHi: "मारवाड़, शेखावाटी, ब्रज, काशी, बंगाल व विश्व",
    significanceEn: "Spreading commerce, ethical banking, and community welfare globally",
    significanceHi: "देश के कोने-कोने में उद्योग, परोपकार और संस्कृति का प्रसार",
    icon: "🗺️",
    detailsEn: "Following medieval upheavals and drought, Agrawals migrated along trade arteries. True to Agrasen's ideals, they established hospices, schools, temples, and industries in every town, remaining the economic backbone of modern India.",
    detailsHi: "अग्रोहा के ऐतिहासिक विस्थापन के उपरांत अग्र बंधु समस्त भारत और विदेश में फैले। जहाँ भी गए, धर्मशालाएं, विद्यालय, चिकित्सालय और व्यापारिक संस्थान बनाकर जनकल्याण की अखंड परंपरा जीवित रखी।"
  }
];
