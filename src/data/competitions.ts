export interface OfficialCompetition {
  id: string;
  title: string;
  titleHi: string;
  category: string;
  categoryHi: string;
  feeBadge: string; // e.g., '₹50', 'Spot entry', ''
  dateTime: string;
  dateTimeEn: string;
  venue: string;
  venueHi: string;
  iconEmoji: string;
  accentColor: string;
  // Official Inner Details from Mobile App
  tagline?: string;
  aboutText?: string;
  takingPartPoints?: string[];
  rules?: string[];
  prizes?: string[];
  notes?: string;
}

export const OFFICIAL_COMPETITIONS: OfficialCompetition[] = [
  // --- Sep 30 ---
  {
    id: 'comp-01',
    title: 'Carrom',
    titleHi: 'कैरम',
    category: 'Girls & Women (Class 9 to open)',
    categoryHi: 'छात्राएं एवं महिलाएं (कक्षा 9 से ओपन)',
    feeBadge: '₹50',
    dateTime: 'Sep 30 दोपहर 4 बजे',
    dateTimeEn: 'Sep 30, 4:00 PM',
    venue: 'Vrindavan Bagechi',
    venueHi: 'वृन्दावन बगीची',
    iconEmoji: '🎯',
    accentColor: '#851528',
    tagline: 'The board, the powder and a steady hand',
    aboutText: 'Carrom for girls and women from Class 9 upwards. Played across boards through the day until the final.',
    takingPartPoints: [
      'Register through the app before the closing date. Your eligible family members are listed automatically when you enrol.',
      'Boards and strikers are provided.',
      'Arrive for your round on time — a missed round is a forfeited one.'
    ],
    rules: [
      'Only registered participants of the stated category may take part.',
      'Report at the venue at least 15 minutes before your turn.',
      'Age or class will be verified against the family record in the app.',
      'Singles, played on a knockout basis.',
      'Each match is decided over a fixed number of boards.',
      'Standard carrom rules apply; the referee at the board settles any dispute on the spot.',
      'A player not present when the board is called forfeits that round.',
      "The committee's decision on all matters is final."
    ]
  },
  {
    id: 'comp-02',
    title: 'Snakes & Ladders',
    titleHi: 'सांप-सीढ़ी',
    category: 'Class 1 to 5',
    categoryHi: 'कक्षा 1 से 5',
    feeBadge: '',
    dateTime: 'Sep 30 दोपहर 5 बजे',
    dateTimeEn: 'Sep 30, 5:00 PM',
    venue: 'Vrindavan Bagechi',
    venueHi: 'वृन्दावन बगीची',
    iconEmoji: '🎲',
    accentColor: '#C5A059',
    tagline: 'सीढ़ी चढ़ो, साँप उतारे, और कौशल की कोई आवश्यकता नहीं...',
    aboutText: 'सबसे छोटे खिलाड़ियों, कक्षा 1 से 5 तक के लिए साँप-सीढ़ी। पूर्णतः भाग्य का खेल, और इसीलिए पूर्णतः निष्पक्ष।',
    takingPartPoints: [
      'ऐप से अंतिम तिथि से पूर्व पंजीकरण करें।',
      'कुछ साथ लाने या तैयारी की आवश्यकता नहीं।',
      'सबसे छोटे खिलाड़ियों के पास कोई अभिभावक रहें।'
    ],
    rules: [
      'केवल निर्धारित वर्ग के पंजीकृत प्रतिभागी ही भाग ले सकेंगे।',
      'अपनी बारी से कम से कम 15 मिनट पूर्व आयोजन स्थल पर उपस्थित हों।',
      'आयु अथवा कक्षा का सत्यापन ऐप में दर्ज पारिवारिक विवरण से किया जाएगा।',
      'खेल फ़र्श पर बने बोर्ड पर एक बड़े पासे से होगा।',
      'बारी क्रम से आएगी; छूटी हुई बारी दोबारा नहीं मिलेगी।',
      'अंतिम खाने पर पहले पहुँचने वाला प्रतिभागी उस चरण का विजेता होगा।',
      'सबसे छोटे बच्चों को चाल चलने में अभिभावक अथवा स्वयंसेवक सहायता कर सकते हैं।',
      'सभी विषयों में समिति का निर्णय अंतिम होगा।'
    ]
  },
  {
    id: 'comp-03',
    title: 'Table Tennis',
    titleHi: 'टेबल टेनिस',
    category: 'Boys (open)',
    categoryHi: 'छात्र (ओपन)',
    feeBadge: '₹50',
    dateTime: 'Sep 30 शाम 6 बजे',
    dateTimeEn: 'Sep 30, 6:00 PM',
    venue: 'Vrindavan Bagechi',
    venueHi: 'वृन्दावन बगीची',
    iconEmoji: '🏓',
    accentColor: '#B3261E',
    tagline: 'Fast-paced rally and table precision',
    aboutText: 'Table Tennis tournament for boys (open category). Singles knockout championship played on regulation indoor tables.',
    takingPartPoints: [
      'Register through the app before the closing date.',
      'Bring your own racquet if possible; standard balls provided.',
      'Arrive 15 minutes prior to match schedule.'
    ],
    rules: [
      'Only registered participants of the stated category may take part.',
      'Report at the venue at least 15 minutes before your turn.',
      'Age or class will be verified against the family record in the app.',
      'Knockout format. Best of 3 sets.',
      'Standard table tennis rules apply; referee decision on spot is final.'
    ]
  },
  {
    id: 'comp-04',
    title: 'Carrom',
    titleHi: 'कैरम',
    category: 'Boys (Class 9 to open)',
    categoryHi: 'छात्र (कक्षा 9 से ओपन)',
    feeBadge: '₹50',
    dateTime: 'Sep 30 शाम 7 बजे',
    dateTimeEn: 'Sep 30, 7:00 PM',
    venue: 'Vrindavan Bagechi',
    venueHi: 'वृन्दावन बगीची',
    iconEmoji: '🎯',
    accentColor: '#851528',
    tagline: 'The board, the powder and a steady hand',
    aboutText: 'Carrom for boys from Class 10 upwards, through to the open category.',
    takingPartPoints: [
      'Register through the app before the closing date. Your eligible family members are listed automatically when you enrol.',
      'Boards and strikers are provided.',
      'Arrive for your round on time — a missed round is a forfeited one.'
    ],
    rules: [
      'Only registered participants of the stated category may take part.',
      'Report at the venue at least 15 minutes before your turn.',
      'Age or class will be verified against the family record in the app.',
      'Singles, played on a knockout basis.',
      'Each match is decided over a fixed number of boards.',
      'Standard carrom rules apply; the referee at the board settles any dispute on the spot.',
      'A player not present when the board is called forfeits that round.',
      "The committee's decision on all matters is final."
    ]
  },

  // --- Oct 1 ---
  {
    id: 'comp-05',
    title: 'Drawing',
    titleHi: 'चित्रकला',
    category: 'Class 3 to 8',
    categoryHi: 'कक्षा 3 से 8',
    feeBadge: '',
    dateTime: 'Oct 1 दोपहर 5 बजे',
    dateTimeEn: 'Oct 1, 5:00 PM',
    venue: 'Vrindavan Bagechi',
    venueHi: 'वृन्दावन बगीची',
    iconEmoji: '🎨',
    accentColor: '#E06D10',
    tagline: 'Colors of devotion, culture and imagination',
    aboutText: 'Drawing competition for students of Class 3 to 8. Participants showcase their creative artistic expression on paper.',
    takingPartPoints: [
      'Register through the app before the closing date.',
      'Drawing sheets are provided at the venue; bring your own colors and pencils.',
      'Participants must complete their artwork within the allocated time.'
    ],
    rules: [
      'Only registered participants of the stated category may take part.',
      'Report at the venue at least 15 minutes before start.',
      'Drawing sheets provided by committee. External sheets not permitted.',
      'Evaluation is based on creativity, theme relevance, and neatness.',
      "The judges' decision is final."
    ]
  },

  // --- Oct 2 ---
  {
    id: 'comp-06',
    title: 'Musical Chair',
    titleHi: 'म्यूजिकल चेयर',
    category: 'Married Women',
    categoryHi: 'विवाहित महिलाएं',
    feeBadge: '',
    dateTime: 'Oct 2 दोपहर 4 बजे',
    dateTimeEn: 'Oct 2, 4:00 PM',
    venue: 'Vrindavan Bagechi',
    venueHi: 'वृन्दावन बगीची',
    iconEmoji: '🪑',
    accentColor: '#9C27B0',
    tagline: 'Walk, listen, and be quicker than the music',
    aboutText: 'Musical chairs for girls and women. It looks gentle until the music stops.',
    takingPartPoints: [
      'Register through the app before the closing date. Your eligible family members are listed automatically when you enrol.',
      'Wear something you can move quickly in.',
      'Played in rounds; latecomers cannot be added mid-round.'
    ],
    rules: [
      'Only registered participants of the stated category may take part.',
      'Report at the venue at least 15 minutes before your turn.',
      'Age or class will be verified against the family record in the app.',
      'Played in rounds: one chair is removed each round.',
      'Pushing or pulling another participant means immediate elimination.',
      'A participant who leaves the circle mid-round is eliminated.',
      'Latecomers cannot be added once a round has begun.',
      "The committee's decision on all matters is final."
    ]
  },
  {
    id: 'comp-07',
    title: 'Little Genius',
    titleHi: 'लिटिल जीनियस (प्रश्नोत्तरी)',
    category: 'Boys & Girls (Class 6–10)',
    categoryHi: 'छात्र एवं छात्राएं (कक्षा 6 से 10)',
    feeBadge: '',
    dateTime: 'Oct 2 शाम 6 बजे',
    dateTimeEn: 'Oct 2, 6:00 PM',
    venue: 'Vrindavan Bagechi',
    venueHi: 'वृन्दावन बगीची',
    iconEmoji: '💡',
    accentColor: '#E65100',
    tagline: 'General knowledge, for minds that read',
    aboutText: "A general knowledge contest for boys and girls of Class 5 to 10 — current affairs, history, science and the community's own heritage.",
    takingPartPoints: [
      'Register through the app before the closing date. Your eligible family members are listed automatically when you enrol.',
      'Bring a pen. Paper is provided.',
      'No reference material or phones during the contest.'
    ],
    rules: [
      'Only registered participants of the stated category may take part.',
      'Report at the venue at least 15 minutes before your turn.',
      'Age or class will be verified against the family record in the app.',
      'A written round, followed by an oral round for those who qualify.',
      'No books, notes or mobile phones during the contest.',
      "Answers must be in the participant's own handwriting.",
      'In case of a tie, a tie-breaker question decides the result.',
      "The committee's decision on all matters is final."
    ]
  },

  // --- Oct 3 ---
  {
    id: 'comp-08',
    title: 'Badminton',
    titleHi: 'बैडमिंटन',
    category: 'Boys (Class 6–10)',
    categoryHi: 'छात्र (कक्षा 6 से 10)',
    feeBadge: '₹50',
    dateTime: 'Oct 3 दोपहर 4 बजे',
    dateTimeEn: 'Oct 3, 4:00 PM',
    venue: 'Near Vardhman School',
    venueHi: 'निकट वर्धमान स्कूल',
    iconEmoji: '🏸',
    accentColor: '#2E7D32',
    tagline: 'Racquet, shuttle and a quick eye',
    aboutText: 'Badminton for boys of Class 6 to 10.',
    takingPartPoints: [
      'Register through the app before the closing date. Your eligible family members are listed automatically when you enrol.',
      'Bring your own racquet if you have one; a few are available.',
      'Wear non-marking shoes for the indoor court.'
    ],
    rules: [
      'Only registered participants of the stated category may take part.',
      'Report at the venue at least 15 minutes before your turn.',
      'Age or class will be verified against the family record in the app.',
      'Singles, played on a knockout basis.',
      'Matches are played to a fixed points format announced on the day.',
      'Players should bring their own racquet where possible; shuttles are provided.',
      'Non-marking shoes are required on the indoor court.',
      "The committee's decision on all matters is final."
    ]
  },
  {
    id: 'comp-09',
    title: 'Fancy Dress',
    titleHi: 'फैंसी ड्रेस',
    category: 'Nursery to Class 5',
    categoryHi: 'नर्सरी से कक्षा 5',
    feeBadge: '',
    dateTime: 'Oct 3 दोपहर 5 बजे',
    dateTimeEn: 'Oct 3, 5:00 PM',
    venue: 'Vrindavan Bagechi',
    venueHi: 'वृन्दावन बगीची',
    iconEmoji: '👑',
    accentColor: '#D4AF37',
    tagline: 'Costume, character and a great deal of nerve',
    aboutText: 'Children and adults take the stage in costume — gods and saints, freedom fighters, professions, and every year at least one that nobody saw coming. It is judged on presentation as much as on the costume itself.',
    takingPartPoints: [
      'Register through the app before the closing date. Your eligible family members are listed automatically when you enrol.',
      'Prepare a short introduction in character — a line or two is enough.',
      'Costumes are made at home; there is no requirement to buy anything.'
    ],
    rules: [
      'Only registered participants of the stated category may take part.',
      'Report at the venue at least 15 minutes before your turn.',
      'Age or class will be verified against the family record in the app.',
      'One entry per participant.',
      'A short self-introduction in character is expected — about one minute.',
      'Costumes must be arranged by the participant; nothing needs to be purchased.',
      'Judged on costume, presentation and confidence.',
      'Props that are sharp, heavy or use fire are not permitted.',
      "The committee's decision on all matters is final."
    ]
  },
  {
    id: 'comp-10',
    title: 'Badminton',
    titleHi: 'बैडमिंटन',
    category: 'Boys (Class 11 to open)',
    categoryHi: 'छात्र एवं युवा (कक्षा 11 से ओपन)',
    feeBadge: '₹50',
    dateTime: 'Oct 3 दोपहर 5 बजे',
    dateTimeEn: 'Oct 3, 5:00 PM',
    venue: 'Near Vardhman School',
    venueHi: 'निकट वर्धमान स्कूल',
    iconEmoji: '🏸',
    accentColor: '#2E7D32',
    tagline: 'Racquet, shuttle and a quick eye',
    aboutText: 'Badminton for boys from Class 11 upwards, through to the open category.',
    takingPartPoints: [
      'Register through the app before the closing date. Your eligible family members are listed automatically when you enrol.',
      'Bring your own racquet if you have one; a few are available.',
      'Wear non-marking shoes for the indoor court.'
    ],
    rules: [
      'Only registered participants of the stated category may take part.',
      'Report at the venue at least 15 minutes before your turn.',
      'Age or class will be verified against the family record in the app.',
      'Singles, played on a knockout basis.',
      'Matches are played to a fixed points format announced on the day.',
      'Players should bring their own racquet where possible; shuttles are provided.',
      'Non-marking shoes are required on the indoor court.',
      "The committee's decision on all matters is final."
    ]
  },

  // --- Oct 4 ---
  {
    id: 'comp-11',
    title: 'Plain Race',
    titleHi: 'दौड़ (Plain Race)',
    category: 'Class 1 to 8',
    categoryHi: 'कक्षा 1 से 8',
    feeBadge: 'Spot entry',
    dateTime: 'Oct 4 सुबह 8 बजे',
    dateTimeEn: 'Oct 4, 8:00 AM',
    venue: 'Juri Resort',
    venueHi: 'जूरी रिसॉर्ट',
    iconEmoji: '🏃',
    accentColor: '#C62828',
    tagline: 'Everyone runs, from nursery upwards',
    aboutText: 'Races of every kind for children from nursery to Class 8 — sprints and group races, run in age bands so nobody is outmatched.',
    takingPartPoints: [
      'Register through the app; children are grouped by class.',
      'Comfortable clothes and shoes they can run in.',
      'A parent should be present for the youngest.'
    ],
    rules: [
      'Only registered participants of the stated category may take part.',
      'Report at the venue at least 15 minutes before your turn.',
      'Age or class will be verified against the family record in the app.',
      'Run in heats by class group; qualifiers go through to the final.',
      'Participants must stay in their lane where lanes are marked.',
      'A false start may lead to disqualification from that heat.',
      'Comfortable clothes and running shoes are recommended.',
      "The committee's decision on all matters is final."
    ]
  },
  {
    id: 'comp-12',
    title: 'Three-Legged Race',
    titleHi: 'तीन पैर की दौड़',
    category: 'Class 1 to 8',
    categoryHi: 'कक्षा 1 से 8',
    feeBadge: '',
    dateTime: 'Oct 4 सुबह 8 बजे',
    dateTimeEn: 'Oct 4, 8:00 AM',
    venue: 'Juri Resort',
    venueHi: 'जूरी रिसॉर्ट',
    iconEmoji: '👟',
    accentColor: '#EF6C00'
  },
  {
    id: 'comp-13',
    title: 'Octopus Race',
    titleHi: 'ऑक्टोपस रेस',
    category: 'Class 5 to 8',
    categoryHi: 'कक्षा 5 से 8',
    feeBadge: '',
    dateTime: 'Oct 4 सुबह 8 बजे',
    dateTimeEn: 'Oct 4, 8:00 AM',
    venue: 'Juri Resort',
    venueHi: 'जूरी रिसॉर्ट',
    iconEmoji: '🤝',
    accentColor: '#1565C0'
  },
  {
    id: 'comp-14',
    title: 'Balloon, Spoon & Jalebi Race',
    titleHi: 'गुब्बारा, चम्मच एवं जलेबी रेस',
    category: 'Nursery to Sr. KG',
    categoryHi: 'नर्सरी से सीनियर के.जी.',
    feeBadge: 'Spot entry',
    dateTime: 'Oct 4 सुबह 10 बजे',
    dateTimeEn: 'Oct 4, 10:00 AM',
    venue: 'Vrindavan Bagechi',
    venueHi: 'वृन्दावन बगीची',
    iconEmoji: '🎈',
    accentColor: '#AD1457'
  },

  // --- Oct 7 ---
  {
    id: 'comp-15',
    title: 'Badminton',
    titleHi: 'बैडमिंटन',
    category: 'Girls (Class 9 to open, unmarried)',
    categoryHi: 'छात्राएं एवं युवतियां (कक्षा 9 से ओपन, अविवाहित)',
    feeBadge: '₹50',
    dateTime: 'Oct 7 दोपहर 4 बजे से',
    dateTimeEn: 'Oct 7, 4:00 PM onwards',
    venue: 'Near Vardhman School',
    venueHi: 'निकट वर्धमान स्कूल',
    iconEmoji: '🏸',
    accentColor: '#2E7D32'
  },
  {
    id: 'comp-16',
    title: 'Cricket',
    titleHi: 'क्रिकेट प्रतियोगिता',
    category: 'Boys (Class 8 to open)',
    categoryHi: 'छात्र एवं युवा (कक्षा 8 से ओपन)',
    feeBadge: '',
    dateTime: 'Oct 7 दोपहर 4 बजे से',
    dateTimeEn: 'Oct 7, 4:00 PM onwards',
    venue: 'Rojda Ground',
    venueHi: 'रोजड़ा ग्राउंड',
    iconEmoji: '🏏',
    accentColor: '#2E7D32'
  },
  {
    id: 'comp-17',
    title: 'Matka Phod',
    titleHi: 'मटका फोड़',
    category: 'Married Women',
    categoryHi: 'विवाहित महिलाएं',
    feeBadge: '',
    dateTime: 'Oct 7 दोपहर 4 बजे से',
    dateTimeEn: 'Oct 7, 4:00 PM onwards',
    venue: 'Vrindavan Bagechi',
    venueHi: 'वृन्दावन बगीची',
    iconEmoji: '🏺',
    accentColor: '#D84315'
  },

  // --- Oct 8 ---
  {
    id: 'comp-18',
    title: 'Rangoli',
    titleHi: 'रंगोली प्रतियोगिता',
    category: 'Girls (Class 11 to open, unmarried)',
    categoryHi: 'छात्राएं एवं युवतियां (कक्षा 11 से ओपन, अविवाहित)',
    feeBadge: '',
    dateTime: 'Oct 8 दोपहर 4 बजे से',
    dateTimeEn: 'Oct 8, 4:00 PM onwards',
    venue: 'Agrasen Bhawan',
    venueHi: 'अग्रसेन भवन',
    iconEmoji: '🪷',
    accentColor: '#C2185B'
  },

  // --- Oct 10 ---
  {
    id: 'comp-19',
    title: 'Matka Phod',
    titleHi: 'मटका फोड़',
    category: 'Boys (Class 11 to open, unmarried)',
    categoryHi: 'छात्र एवं युवा (कक्षा 11 से ओपन, अविवाहित)',
    feeBadge: '',
    dateTime: 'Oct 10 शाम 7 बजे से',
    dateTimeEn: 'Oct 10, 7:00 PM onwards',
    venue: 'Vrindavan Bagechi',
    venueHi: 'वृन्दावन बगीची',
    iconEmoji: '🏺',
    accentColor: '#8D6E63'
  },
  {
    id: 'comp-20',
    title: 'Matka Phod',
    titleHi: 'मटका फोड़',
    category: 'Married Men',
    categoryHi: 'विवाहित पुरुष',
    feeBadge: '',
    dateTime: 'Oct 10 शाम 8 बजे से',
    dateTimeEn: 'Oct 10, 8:00 PM onwards',
    venue: 'Vrindavan Bagechi',
    venueHi: 'वृन्दावन बगीची',
    iconEmoji: '🏺',
    accentColor: '#6D4C41'
  },
  {
    id: 'comp-21',
    title: 'Rassa Kassi',
    titleHi: 'रस्साकशी',
    category: 'Men (open)',
    categoryHi: 'पुरुष (ओपन)',
    feeBadge: '',
    dateTime: 'Oct 10 शाम 9 बजे से',
    dateTimeEn: 'Oct 10, 9:00 PM onwards',
    venue: 'Vrindavan Bagechi',
    venueHi: 'वृन्दावन बगीची',
    iconEmoji: '🚩',
    accentColor: '#5D4037'
  },
  {
    id: 'comp-22',
    title: 'Balance The Coin',
    titleHi: 'बैलेंस द कॉइन',
    category: 'Men (open)',
    categoryHi: 'पुरुष (ओपन)',
    feeBadge: '',
    dateTime: 'Oct 10 शाम 9 बजे से',
    dateTimeEn: 'Oct 10, 9:00 PM onwards',
    venue: 'Vrindavan Bagechi',
    venueHi: 'वृन्दावन बगीची',
    iconEmoji: '🪙',
    accentColor: '#FFB300'
  }
];
