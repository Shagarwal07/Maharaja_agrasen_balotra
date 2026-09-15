export interface KaryakarniMember {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  roleEn: string;
  image: string;
  isKeyLeader?: boolean;
}

export const KARYAKARNI_PRESIDENT: KaryakarniMember = {
  id: 'kk-01',
  name: 'प्रमोद गोयल',
  nameEn: 'Pramod Goyal',
  role: 'अध्यक्ष',
  roleEn: 'President',
  image: '/karyakarni/pramod_goyal.png',
  isKeyLeader: true
};

export const KARYAKARNI_OFFICE_BEARERS: KaryakarniMember[] = [
  {
    id: 'kk-02',
    name: 'अभिषेक गुप्ता',
    nameEn: 'Abhishek Gupta',
    role: 'उपाध्यक्ष',
    roleEn: 'Vice President',
    image: '/karyakarni/abhishek_gupta.png',
    isKeyLeader: true
  },
  {
    id: 'kk-03',
    name: 'विजय पित्ती',
    nameEn: 'Vijay Pitti',
    role: 'सचिव',
    roleEn: 'Secretary',
    image: '/karyakarni/vijay_pitti.png',
    isKeyLeader: true
  },
  {
    id: 'kk-04',
    name: 'अंकुर गर्ग',
    nameEn: 'Ankur Garg',
    role: 'कोषाध्यक्ष',
    roleEn: 'Treasurer',
    image: '/karyakarni/ankur_garg.png',
    isKeyLeader: true
  }
];

export const KARYAKARNI_COMMITTEE: KaryakarniMember[] = [
  {
    id: 'kk-05',
    name: 'विजय लोहिया',
    nameEn: 'Vijay Lohia',
    role: 'खेलकूद मंत्री',
    roleEn: 'Sports Secretary',
    image: '/karyakarni/vijay_lohia.png'
  },
  {
    id: 'kk-06',
    name: 'दीपक सराफ',
    nameEn: 'Deepak Saraf',
    role: 'संयुक्त सचिव',
    roleEn: 'Joint Secretary',
    image: '/karyakarni/deepak_saraf.png'
  },
  {
    id: 'kk-07',
    name: 'नीरज गर्ग',
    nameEn: 'Neeraj Garg',
    role: 'संयुक्त कोषाध्यक्ष',
    roleEn: 'Joint Treasurer',
    image: '/karyakarni/neeraj_garg.png'
  },
  {
    id: 'kk-08',
    name: 'वैभव गोयल',
    nameEn: 'Vaibhav Goyal',
    role: 'खेलकूद मंत्री',
    roleEn: 'Sports Secretary',
    image: '/karyakarni/vaibhav_goyal.png'
  },
  {
    id: 'kk-09',
    name: 'संजय गर्ग',
    nameEn: 'Sanjay Garg',
    role: 'खेलकूद मंत्री',
    roleEn: 'Sports Secretary',
    image: '/karyakarni/sanjay_garg.png'
  },
  {
    id: 'kk-10',
    name: 'भावेश बंसल',
    nameEn: 'Bhavesh Bansal',
    role: 'खेलकूद मंत्री',
    roleEn: 'Sports Secretary',
    image: '/karyakarni/bhavesh_bansal.png'
  },
  {
    id: 'kk-11',
    name: 'सीमा लोहिया',
    nameEn: 'Seema Lohia',
    role: 'महिला खेलकूद मंत्री',
    roleEn: 'Women Sports Secretary',
    image: '/karyakarni/seema_lohia.png'
  },
  {
    id: 'kk-12',
    name: 'सुनीता बजारी',
    nameEn: 'Sunita Bajari',
    role: 'महिला खेलकूद मंत्री',
    roleEn: 'Women Sports Secretary',
    image: '/karyakarni/sunita_bajari.png'
  },
  {
    id: 'kk-13',
    name: 'शरद गोयल',
    nameEn: 'Sharad Goyal',
    role: 'सांस्कृतिक मंत्री',
    roleEn: 'Cultural Secretary',
    image: '/karyakarni/sharad_goyal.png'
  },
  {
    id: 'kk-14',
    name: 'कुशल बजारी',
    nameEn: 'Kushal Bajari',
    role: 'सांस्कृतिक मंत्री',
    roleEn: 'Cultural Secretary',
    image: '/karyakarni/kushal_bajari.png'
  },
  {
    id: 'kk-15',
    name: 'सुमन लोहिया',
    nameEn: 'Suman Lohia',
    role: 'महिला सांस्कृतिक मंत्री',
    roleEn: 'Women Cultural Secretary',
    image: '/karyakarni/suman_lohia.png'
  },
  {
    id: 'kk-16',
    name: 'मिनाक्षी गोयल',
    nameEn: 'Minakshi Goyal',
    role: 'महिला सांस्कृतिक मंत्री',
    roleEn: 'Women Cultural Secretary',
    image: '/karyakarni/minakshi_goyal.png'
  },
  {
    id: 'kk-17',
    name: 'सलोनी बंसल',
    nameEn: 'Saloni Bansal',
    role: 'महिला सांस्कृतिक मंत्री',
    roleEn: 'Women Cultural Secretary',
    image: '/karyakarni/saloni_bansal.png'
  },
  {
    id: 'kk-18',
    name: 'सुमित बंसल',
    nameEn: 'Sumit Bansal',
    role: 'प्रबन्धक',
    roleEn: 'Manager',
    image: '/karyakarni/sumit_bansal.png'
  },
  {
    id: 'kk-19',
    name: 'तुलसीदास अग्रवाल',
    nameEn: 'Tulsidas Agrawal',
    role: 'आई टी सेल',
    roleEn: 'IT Cell',
    image: '/karyakarni/tulsidas_agrawal.png'
  },
  {
    id: 'kk-20',
    name: 'उमंग सिंहल',
    nameEn: 'Umang Singhal',
    role: 'कार्यालय प्रमुख',
    roleEn: 'Office Head',
    image: '/karyakarni/umang_singhal.png'
  },
  {
    id: 'kk-21',
    name: 'आयुष गुप्ता',
    nameEn: 'Ayush Gupta',
    role: 'कार्यालय प्रमुख',
    roleEn: 'Office Head',
    image: '/karyakarni/ayush_gupta.png'
  },
  {
    id: 'kk-22',
    name: 'रामप्रकाश गोयल',
    nameEn: 'Ramprakash Goyal',
    role: 'सोशल मीडिया प्रभारी',
    roleEn: 'Social Media In-charge',
    image: '/karyakarni/ramprakash_goyal.png'
  },
  {
    id: 'kk-23',
    name: 'नूपुर टिबरेवाल',
    nameEn: 'Nupur Tibrewal',
    role: 'सोशल मीडिया प्रभारी',
    roleEn: 'Social Media In-charge',
    image: '/karyakarni/nupur_tibrewal.png'
  },
  {
    id: 'kk-24',
    name: 'मिथलेश सिंहल',
    nameEn: 'Mithlesh Singhal',
    role: 'हॉट मेला संयोजक',
    roleEn: 'Haat Mela Coordinator',
    image: '/karyakarni/mithlesh_singhal.png'
  },
  {
    id: 'kk-25',
    name: 'गोपाल सिंहल',
    nameEn: 'Gopal Singhal',
    role: 'हॉट मेला संयोजक',
    roleEn: 'Haat Mela Coordinator',
    image: '/karyakarni/gopal_singhal.png'
  },
  {
    id: 'kk-26',
    name: 'मनीष गर्ग',
    nameEn: 'Manish Garg',
    role: 'मंच संचालक',
    roleEn: 'Stage Anchor',
    image: '/karyakarni/manish_garg.png'
  },
  {
    id: 'kk-27',
    name: 'अभिषेक जिन्दल',
    nameEn: 'Abhishek Jindal',
    role: 'मंच संचालक',
    roleEn: 'Stage Anchor',
    image: '/karyakarni/abhishek_jindal.png'
  },
  {
    id: 'kk-28',
    name: 'कीर्ति सिंहल',
    nameEn: 'Kirti Singhal',
    role: 'मंच संचालक',
    roleEn: 'Stage Anchor',
    image: '/karyakarni/kirti_singhal.png'
  },
  {
    id: 'kk-29',
    name: 'वानिका अग्रवाल',
    nameEn: 'Vanika Agrawal',
    role: 'मंच संचालक',
    roleEn: 'Stage Anchor',
    image: '/karyakarni/vanika_agrawal.png'
  },
  {
    id: 'kk-30',
    name: 'भगवान जी गोयल',
    nameEn: 'Bhagwan Ji Goyal',
    role: 'झांकी संयोजक',
    roleEn: 'Tableau Coordinator',
    image: '/karyakarni/bhagwan_ji_goyal.png'
  },
  {
    id: 'kk-31',
    name: 'विकास जिन्दल',
    nameEn: 'Vikas Jindal',
    role: 'झांकी संयोजक',
    roleEn: 'Tableau Coordinator',
    image: '/karyakarni/vikas_jindal.png'
  },
  {
    id: 'kk-32',
    name: 'देवेन्द्र गोयल',
    nameEn: 'Devendra Goyal',
    role: 'झांकी संयोजक',
    roleEn: 'Tableau Coordinator',
    image: '/karyakarni/devendra_goyal.png'
  },
  {
    id: 'kk-33',
    name: 'पवन जी लोहिया',
    nameEn: 'Pawan Ji Lohia',
    role: 'झांकी संयोजक',
    roleEn: 'Tableau Coordinator',
    image: '/karyakarni/pawan_ji_lohia.png'
  },
  {
    id: 'kk-34',
    name: 'बसन्त गोयल',
    nameEn: 'Basant Goyal',
    role: 'शोभा यात्रा संयोजक',
    roleEn: 'Procession Coordinator',
    image: '/karyakarni/basant_goyal.png'
  },
  {
    id: 'kk-35',
    name: 'देव गोयल',
    nameEn: 'Dev Goyal',
    role: 'शोभा यात्रा संयोजक',
    roleEn: 'Procession Coordinator',
    image: '/karyakarni/dev_goyal.png'
  },
  {
    id: 'kk-36',
    name: 'रोहित गोयल',
    nameEn: 'Rohit Goyal',
    role: 'प्रवक्ता',
    roleEn: 'Spokesperson',
    image: '/karyakarni/rohit_goyal.png'
  },
  {
    id: 'kk-37',
    name: 'शुभम सिंहल',
    nameEn: 'Shubham Singhal',
    role: 'सुचना प्रसारण मंत्री',
    roleEn: 'Information & Broadcast Minister',
    image: '/karyakarni/shubham_singhal.png'
  },
  {
    id: 'kk-38',
    name: 'मिथलेश गोयल',
    nameEn: 'Mithlesh Goyal',
    role: 'अखाडा प्रमुख',
    roleEn: 'Akhada In-charge',
    image: '/karyakarni/mithlesh_goyal.png'
  },
  {
    id: 'kk-39',
    name: 'पूर्णिमा लोहिया',
    nameEn: 'Purnima Lohia',
    role: 'अखाडा प्रमुख',
    roleEn: 'Akhada In-charge',
    image: '/karyakarni/purnima_lohia.png'
  },
  {
    id: 'kk-40',
    name: 'विकास गोयल',
    nameEn: 'Vikas Goyal',
    role: 'मंच व्यवस्थापक',
    roleEn: 'Stage Manager',
    image: '/karyakarni/vikas_goyal.png'
  },
  {
    id: 'kk-41',
    name: 'आशीष सिंहल',
    nameEn: 'Ashish Singhal',
    role: 'मंच व्यवस्थापक',
    roleEn: 'Stage Manager',
    image: '/karyakarni/ashish_singhal.png'
  },
  {
    id: 'kk-42',
    name: 'रोनक गोयल',
    nameEn: 'Ronak Goyal',
    role: 'कार्यकारिणी सदस्य',
    roleEn: 'Executive Member',
    image: '/karyakarni/ronak_goyal.png'
  },
  {
    id: 'kk-43',
    name: 'निलेश गर्ग',
    nameEn: 'Nilesh Garg',
    role: 'कार्यकारिणी सदस्य',
    roleEn: 'Executive Member',
    image: '/karyakarni/nilesh_garg.png'
  },
  {
    id: 'kk-44',
    name: 'गजेन्द्र सिंहल',
    nameEn: 'Gajendra Singhal',
    role: 'कार्यकारिणी सदस्य',
    roleEn: 'Executive Member',
    image: '/karyakarni/gajendra_singhal.png'
  }
];
