import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  Crown, 
  Sparkles, 
  Scroll, 
  MapPin
} from 'lucide-react';
import type { Language } from '../data/translations';
import { TIMELINE_DATA } from '../data/timeline';
import { GOTRAS_DATA } from '../data/gotras';

interface HistoryPageProps {
  lang: Language;
  onNavigateHome: () => void;
  onNavigateToBuilder?: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ 
  lang, 
  onNavigateHome,
  onNavigateToBuilder 
}) => {
  const [activeChapter, setActiveChapter] = useState<string>('tl-01');
  const [selectedStampZoom, setSelectedStampZoom] = useState<'india_1976' | 'maldives_2016' | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash !== '#history') {
      const cleanId = hash.replace('#', '');
      const matched = TIMELINE_DATA.find(t => t.id === cleanId);
      if (matched) {
        setActiveChapter(matched.id);
        setTimeout(() => {
          const el = document.getElementById(matched.id);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const scrollToChapter = (id: string) => {
    setActiveChapter(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Detailed historical context narratives for each chapter
  const CHAPTER_DETAILS: Record<string, {
    subtitleHi: string;
    subtitleEn: string;
    deepContextHi: string[];
    deepContextEn: string[];
    quoteHi: string;
    quoteEn: string;
    historicNotesHi: string;
    historicNotesEn: string;
  }> = {
    'tl-01': {
      subtitleHi: 'सूर्यवंश की 34वीं पीढ़ी में अवतार व प्रताप नगर का आदर्श शासन',
      subtitleEn: 'Divine Avataran in the 34th Generation of Suryavansha & Golden Reign of Pratapnagar',
      deepContextHi: [
        'महाराजा अग्रसेन जी का प्राकट्य द्वापर युग के अंतिम चरण में सूर्यवंशी चक्रवर्ती सम्राट मान्धाता एवं भगवान श्री राम के ज्येष्ठ पुत्र कुश की पावन परंपरा में हुआ। वे प्रतापनगर के धर्मपरायण नरेश राजा वल्लभ सेन एवं महारानी भगवती देवी के ज्येष्ठ पुत्र थे।',
        'बाल्यकाल से ही अग्रसेन जी ने वेद-वेदांग, राजनीति, धनुर्विद्या एवं अर्थशास्त्र में अद्वितीय निपुणता प्राप्त की। महाभारत युद्ध के समय उन्होंने धर्म के पक्ष का समर्थन किया और तत्कालीन भारतवर्ष के प्रमुख महापुरुषों का सान्निध्य प्राप्त किया।',
        'युवावस्था में राज्याभिषेक के उपरांत उन्होंने प्रतापनगर की प्रजा को पुत्रवत स्नेह दिया। उनके राज्य में कोई भी नागरिक भूखा, दुःखी अथवा असहाय नहीं था। उनके न्याय और प्रजावत्सल स्वभाव की ख्याति समस्त आर्यावर्त में फैल गई।'
      ],
      deepContextEn: [
        'Maharaja Agrasen descended in the divine lineage of Lord Rama\'s eldest son Kusha and Emperor Mandhata. He was born to King Vallabh Sen and Queen Bhagvati Devi of Pratapnagar.',
        'From his earliest years, Agrasen mastered Vedic scriptures, statecraft, archery, and economic ethics. During the Mahabharata era, his noble stance upheld righteous principles across Aryavarta.',
        'Upon ascending the throne of Pratapnagar, he ruled as a philosopher-king where no subject suffered from poverty, injustice, or neglected dignity.'
      ],
      quoteHi: '“प्रजा की सुख-शांति ही राजा का सर्वोपरि धर्म है; न्याय और करुणा राज्य की स्थायी नींव हैं।”',
      quoteEn: '“The happiness and peace of the citizens is the supreme duty of a ruler; justice and compassion are the eternal pillars of any kingdom.”',
      historicNotesHi: 'ऐतिहासिक प्रमाण: भारतेंदु हरिश्चंद्र द्वारा रचित ‘अग्रवालों की उत्पत्ति’ (1871) एवं स्कंद पुराण में महाराजा अग्रसेन के सूर्यवंशी क्षत्रिय मूल का विस्तृत उल्लेख मिलता है।',
      historicNotesEn: 'Historical Reference: Mentioned extensively in Bharatendu Harishchandra’s seminal work “Agrawalon Ki Utpatti” (1871) and regional Puranic records.'
    },
    'tl-02': {
      subtitleHi: 'नागराज कन्या राजकुमारी माधवी द्वारा शील व धर्म के आधार पर अग्रसेन का वरण',
      subtitleEn: 'The Historic Swayamvara: Princess Madhavi’s Choice of Virtue Over Imperial Power',
      deepContextHi: [
        'नाग प्रदेश के प्रतापी राजा नागराज कुमुद ने अपनी रूपवती और विदुषी कन्या राजकुमारी माधवी के विवाह हेतु भव्य स्वयंवर का आयोजन किया। इस स्वयंवर में देवराज इंद्र सहित त्रिलोक के अनेक प्रतापी राजा सम्मिलित हुए।',
        'स्वयंवर सभा में महाराजा अग्रसेन का तेज, शील, सौम्यता और विनम्रता देखकर राजकुमारी माधवी मुग्ध हो गईं। देवराज इंद्र के ऐश्वर्य और प्रभुत्व के स्थान पर उन्होंने अग्रसेन जी के गले में वरमाला डालकर उन्हें अपना जीवनसाथी चुना।',
        'इस विवाह से सूर्यवंश और नागवंश के मध्य ऐतिहासिक मैत्री और सांस्कृतिक समन्वय स्थापित हुआ, जिसने तत्कालीन भारत में सामाजिक समरसता का एक स्वर्णिम अध्याय लिखा।'
      ],
      deepContextEn: [
        'King Kumud of the Nagavansha hosted a magnificent Swayamvara for his daughter, Princess Madhavi. Renowned kings from across the subcontinent, along with Devraj Indra, attended.',
        'Princess Madhavi observed the assembly and chose Maharaja Agrasen, captivated not by show of power, but by his sublime humility, righteous demeanor, and profound character.',
        'This union created an everlasting alliance between the solar (Suryavansha) and serpentine (Nagavansha) lineages, symbolizing cultural harmony and mutual respect.'
      ],
      quoteHi: '“सच्चा वैभव बाह्य शक्ति में नहीं, अपितु अंतःकरण की पवित्रता और सत्यनिष्ठा में निहित है।”',
      quoteEn: '“True majesty does not reside in outward force, but in the purity and righteousness of the soul.”',
      historicNotesHi: 'विवाह के उपरांत नागराज कुमुद ने अग्रसेन जी को दिव्य आशीर्वाद व संरक्षण प्रदान किया, जिससे समाज में विभिन्न जातियों व गणों का एकीकरण हुआ।',
      historicNotesEn: 'The marital alliance integrated diverse tribal and dynastic clans into a united commonwealth under Agrasen’s democratic vision.'
    },
    'tl-03': {
      subtitleHi: 'कोल्हापुर तीर्थ पर माँ महालक्ष्मी की अखंड तपस्या एवं चिरंतन समृद्धि का वरदान',
      subtitleEn: 'Intense Penance at Kolhapur & Goddess Mahalakshmi’s Eternal Boon of Prosperity',
      deepContextHi: [
        'प्रतापनगर के पश्चात् नए आदर्श साम्राज्य की स्थापना हेतु महाराजा अग्रसेन ने दक्षिण के पावन तीर्थ कोल्हापुर में माँ महालक्ष्मी की कठोर तपस्या की। वे एक ऐसा गणराज्य चाहते थे जहाँ युद्ध और रक्तपात के बिना धन-धान्य का अखंड प्रवाह हो।',
        'उनकी अनन्य भक्ति और लोककल्याणकारी संकल्प से प्रसन्न होकर माँ महालक्ष्मी ने साक्षात् दर्शन दिए और वरदान दिया: “हे राजन्! तुम्हारी प्रजा और वंशज कभी दरिद्र नहीं रहेंगे। व्यापार, वाणिज्य और सत्य के मार्ग पर चलकर तुम्हारा कुल विश्वभर में वैभवशाली बनेगा।”',
        'माँ महालक्ष्मी ने स्वयं अग्रकुल की संरक्षिका और कुलदेवी बनना स्वीकार किया। इसी कारण आज भी प्रत्येक अग्रवाल परिवार दीपावली व प्रत्येक मांगलिक अवसर पर माँ लक्ष्मी की अग्रसेन जी के साथ प्रथम पूजा करता है।'
      ],
      deepContextEn: [
        'Seeking to establish a society free from imperial bloodshed, Agrasen undertook severe penance to Goddess Mahalakshmi at the sacred pilgrim shrine of Kolhapur.',
        'Pleased by his selfless prayer for universal welfare, Mata Mahalakshmi manifested before him and declared: “O King! Your descendants will never know destitution. Through righteous trade and truth, your clan will bring prosperity to the world.”',
        'Goddess Mahalakshmi became the eternal Kuldevi (patron deity) of the Agrawal Samaj, worshipped in every home during Diwali and auspicious beginnings.'
      ],
      quoteHi: '“माँ महालक्ष्मी की कृपा उन्हीं पर ठहरती है जो व्यापार में प्रामाणिकता और धन में समाज का अंश मानते हैं।”',
      quoteEn: '“The grace of Mahalakshmi abides with those who uphold integrity in trade and dedicate wealth to community upliftment.”',
      historicNotesHi: 'कोल्हापुर से लौटकर अग्रसेन जी ने अग्रोहा में माँ महालक्ष्मी का भव्य मंदिर स्थापित किया, जो अग्र-संस्कृति का प्राण-केंद्र बना।',
      historicNotesEn: 'Upon his return, King Agrasen erected the magnificent Mahalakshmi temple at Agroha, inaugurating centuries of spiritual devotion.'
    },
    'tl-04': {
      subtitleHi: 'विश्व के प्रथम समतावादी गणराज्य की स्थापना व "एक रुपया, एक ईंट" का अमर समाजवाद',
      subtitleEn: 'Establishment of the Agroha Republic & The "One Rupee, One Brick" Democratic Socialism',
      deepContextHi: [
        'महाराजा अग्रसेन जी ने हरियाणा के पावन भूभाग पर सरस्वती और दृषद्वती नदियों के मध्य ‘अग्रोहा’ (अग्रोदक) नामक आदर्श राजधानी की स्थापना की। यह नगर व्यापार, ज्ञान, शिल्प और न्याय का अंतर्राष्ट्रीय केंद्र बना।',
        'अग्रोहा में उन्होंने विश्व इतिहास का सबसे अनूठा सामाजिक सुरक्षा नियम बनाया: नगर में आने वाले प्रत्येक नए परिवार को हर पुराना निवासी ‘एक रुपया और एक ईंट’ भेंट करेगा। ईंटों से उसका मकान तैयार हो जाता था और रुपयों से उसका स्वतंत्र व्यापार आरंभ हो जाता था।',
        'इस अद्भुत व्यवस्था के कारण अग्रोहा में न कोई भिखारी था, न कोई शोषक। समाज का प्रत्येक नागरिक स्वाभिमानी, आत्मनिर्भर और सशक्त था। कार्ल मार्क्स से सहस्रों वर्ष पूर्व अग्रसेन जी ने सच्चे समाजवाद को धरातल पर उतारा था।'
      ],
      deepContextEn: [
        'Between the sacred Saraswati and Drishadvati rivers, Agrasen founded the imperial capital of Agroha (Agrodaka). It rapidly grew into a bustling international nexus of trade, philosophy, and craft.',
        'He instituted the immortal principle: “Ek Rupya, Ek Eent” (One Rupee, One Brick). Whenever a new family migrated to Agroha, every resident gifted them exactly one rupee and one brick. The bricks built their home; the coins launched their independent commerce.',
        'This eliminated beggars, debt slavery, and caste-based economic disparity millennia before modern welfare states were conceived.'
      ],
      quoteHi: '“समाज के दुर्बलतम व्यक्ति को संबल देना ही सच्चे धर्म का प्रमाण है — न कोई भिक्षुक रहे, न कोई परमुखापेक्षी।”',
      quoteEn: '“To uplift the weakest among us is the highest religion — let no soul beg, let no family be destitute.”',
      historicNotesHi: 'भारतीय पुरातत्व सर्वेक्षण (ASI) द्वारा अग्रोहा टीले के उत्खनन (1978-81) में ‘अगोदक जनपदय’ अंकित प्राचीन तांबे के सिक्के, बौद्ध स्तूप और समृद्ध नगर योजना के पुख्ता प्रमाण मिले हैं।',
      historicNotesEn: 'ASI excavations at Agroha mound (1978–81) unearthed ancient coins inscribed “Agodaka Janapadasya” validating the historical Agroha Republic.'
    },
    'tl-05': {
      subtitleHi: '१८ महायज्ञों का आयोजन, 18वें यज्ञ में पशुबलि का त्याग व 18 गोत्रों की संरचना',
      subtitleEn: 'The 18 Mahayajnas, The Renunciation of Animal Sacrifice & Founding of 18 Gotras',
      deepContextHi: [
        'अग्रोहा गणराज्य की आध्यात्मिक संपन्नता हेतु महाराजा अग्रसेन ने 18 विशाल महायज्ञों का संकल्प लिया। प्रत्येक यज्ञ का आचार्यत्व भारत के 18 महान ऋषियों (गर्ग, बंसल, बिन्दल, मित्तल, सिंघल, गोयल, जिंदल आदि) ने किया।',
        'जब 18वें अश्वमेध यज्ञ में नियमानुसार अश्व की बलि का अवसर आया, तो उस मूक पशु की कातर दृष्टि और वेदना देखकर अग्रसेन जी का हृदय पिघल उठा। उन्होंने तत्काल यज्ञ रोककर तलवार फेंक दी और उद्घोष किया: “सभी जीव परमात्मा की संतान हैं। धर्म के नाम पर रक्तपात कदापि स्वीकार्य नहीं!”',
        'उन्होंने क्षत्रिय वर्ण की शस्त्र-संस्कृति से आगे बढ़कर वैश्य वर्ण की अहिंसा, कृषि, वाणिज्य और परोपकार को अपनाया। 18 ऋषियों के नाम पर उनके 18 पुत्रों के 18 पावन गोत्र स्थापित हुए, जो आज समस्त अग्रवाल समाज की पहचान हैं।'
      ],
      deepContextEn: [
        'To solidify the spiritual prosperity of his republic, King Agrasen initiated 18 grand Vedic Mahayajnas, each presided over by 18 revered sages including Garga, Vatsa, Mandavya, and Shandilya.',
        'During the final 18th yajna, observing the trembling agony of the sacrificial horse, Agrasen halted the ceremony in tears. He proclaimed: “Every living being is a creation of the Divine. Bloodshed in the name of religion is a sin. Ahimsa Paramo Dharma!”',
        'He renounced martial warfare and embraced the ethos of peace, commerce, and civic charity. The 18 sages gave their names to the 18 Agrawal Gotras, providing an enduring kinship network.'
      ],
      quoteHi: '“अहिंसा परमो धर्मः — धर्म का मर्म मूक प्राणियों पर दया और समाज के पोषण में है, रक्तपात में नहीं।”',
      quoteEn: '“Ahimsa is the supreme Dharma — true virtue lies in protecting living beings and nurturing society, not in bloodshed.”',
      historicNotesHi: 'अग्रवाल समाज में आज भी सगोत्र विवाह वर्जित है, जो 5000 वर्ष पूर्व अग्रसेन जी द्वारा निर्धारित आनुवंशिक स्वास्थ्य व पारिवारिक समरसता के वैज्ञानिक नियम पर आधारित है।',
      historicNotesEn: 'The exogamous gotra rule instituted by Agrasen remains scientifically praised for genetic vitality and strong community bonding.'
    },
    'tl-06': {
      subtitleHi: 'अग्रोहा से मारवाड़, शेखावाटी, ब्रज, काशी, बंगाल व विश्वभर में व्यापार व जनकल्याण का विस्तार',
      subtitleEn: 'The Great Diaspora: Spreading Ethical Commerce, Philanthropy & Industry Across the World',
      deepContextHi: [
        'मध्यकाल में भीषण अकाल, प्राकृतिक आपदाओं और आक्रांताओं के आक्रमणों के कारण अग्रोहा का ऐतिहासिक नगर उजड़ गया। महाराजा अग्रसेन के उपदेशों को संजोए अग्र-बंधुओं ने विभिन्न व्यापारिक मार्गों पर महाप्रस्थान किया।',
        'वे मारवाड़ (बालोतरा, जोधपुर, बाड़मेर), शेखावाटी, ब्रज, दिल्ली, उत्तर प्रदेश, बिहार, बंगाल और दक्षिण भारत में जा बसे। जहाँ भी अग्र-बंधु पहुंचे, उन्होंने कठिन परिश्रम और ईमानदारी से व्यापार स्थापित किया और अपनी कमाई का बड़ा हिस्सा धर्मशालाओं, गौशालाओं, विद्यालयों और अस्पतालों के निर्माण में लगाया।',
        'आज अग्रवाल समाज भारत की कुल आबादी का मात्र 1-2% होकर भी देश के कुल आयकर और औद्योगिक विकास में 20% से अधिक का योगदान देता है। 1976 में भारत सरकार ने महाराजा अग्रसेन की 5100वीं जयंती पर विशेष डाक टिकट जारी कर इस गौरव को राष्ट्रीय मान्यता दी।'
      ],
      deepContextEn: [
        'In the medieval centuries, severe droughts and invasions led to the dispersion of citizens from Agroha. Carrying their founder’s principles, Agrawals migrated along national trade routes.',
        'They settled in Marwar (Balotra, Jodhpur, Barmer), Shekhawati, Delhi, the Gangetic plains, and Bengal. Wherever they arrived, they established ethical commerce, dharamshalas, gaushalas, hospitals, and educational institutions.',
        'Today, comprising only ~1.5% of India\'s populace, the Agrawal community contributes over 20% of national income tax and leads Indian industry and philanthropy. In 1976, India Post honored Agrasen with a commemorative postage stamp.'
      ],
      quoteHi: '“जिस नगर में जाओ, वहाँ की माटी को सोना बनाओ और अर्जित धन से समाज के आंसुओं को पोंछो।”',
      quoteEn: '“Into whatever land you venture, turn that soil into gold through your labor, and use your earnings to wipe the tears of the poor.”',
      historicNotesHi: 'बालोतरा में अग्रवाल समाज भवन, अग्रसेन वाटिका और वार्षिक जयंती महोत्सव इसी अखंड विरासत और सेवा-भाव का जीवंत प्रतीक है।',
      historicNotesEn: 'Balotra’s Agarwal Samaj Bhavan and annual Jayanti Mahotsav stand as living testaments to this enduring tradition of service.'
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#FAF5ED' }}>
      {/* 1. Royal Page Header */}
      <div style={{
        padding: '28px 20px 24px 20px',
        borderBottom: '1.5px solid rgba(197, 160, 89, 0.35)',
        background: 'linear-gradient(180deg, #FFFDF9 0%, #FAF5ED 100%)'
      }}>
        <div className="web-container">
          {/* Breadcrumbs & Navigation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '18px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <button
              onClick={onNavigateHome}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#FFFDF9',
                border: '1.5px solid rgba(197, 160, 89, 0.6)',
                color: '#650015',
                borderRadius: '24px',
                padding: '7px 18px',
                fontSize: '13.5px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(101, 0, 21, 0.08)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#650015';
                e.currentTarget.style.color = '#FFFDF9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFDF9';
                e.currentTarget.style.color = '#650015';
              }}
            >
              <ArrowLeft size={16} />
              <span>{lang === 'hi' ? '← मुख्य पृष्ठ (होम)' : '← Back to Home'}</span>
            </button>

            {/* Heritage Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(207, 162, 51, 0.15)',
              border: '1px solid rgba(207, 162, 51, 0.45)',
              borderRadius: '20px',
              padding: '5px 14px',
              fontSize: '12.5px',
              color: '#8D6409',
              fontWeight: 700
            }}>
              <Scroll size={14} color="#8D6409" />
              <span>{lang === 'hi' ? 'अखिल भारतीय अग्र इतिहास' : 'Pan-India Agrawal History'}</span>
            </div>
          </div>

          {/* Imperial Title & Portrait Banner */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            flexWrap: 'wrap'
          }}>
            {/* Medallion Portrait */}
            <div style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              border: '3px solid #cfa233',
              boxShadow: '0 6px 20px rgba(101, 0, 21, 0.25)',
              overflow: 'hidden',
              flexShrink: 0,
              background: 'radial-gradient(circle, #FFE17D 20%, #D4AF37 70%, #9C782F 100%)'
            }}>
              <img 
                src="/maharaja_agrasen.png" 
                alt="Maharaja Agrasen" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 12%'
                }}
              />
            </div>

            <div style={{ flex: '1 1 320px' }}>
              <h1 style={{
                margin: '0 0 8px 0',
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(24px, 3.2vw, 36px)',
                fontWeight: 800,
                color: '#650015',
                lineHeight: 1.25
              }}>
                {lang === 'hi'
                  ? 'महाराजा अग्रसेन जी का अमर इतिहास एवं दिव्य जीवन गाथा'
                  : 'The Eternal History & Glorious Life Saga of Maharaja Agrasen'}
              </h1>
              <p style={{
                margin: 0,
                fontSize: 'clamp(14px, 1.3vw, 16px)',
                color: '#6b5a44',
                lineHeight: 1.6,
                maxWidth: '900px'
              }}>
                {lang === 'hi'
                  ? 'सूर्यवंश से अग्रोहा गणराज्य, माँ महालक्ष्मी का वरदान, १८ महायज्ञ, अहिंसा का पावन व्रत और अखिल भारतीय अग्र विस्थापन का प्रामाणिक ऐतिहासिक वृत्तांत।'
                  : 'From the Suryavanshi Dynasty to the Agroha Republic, Mahalakshmi’s eternal blessing, the 18 Gotras vow of Ahimsa, and the global Agrawal diaspora.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Sticky Chapter Quick-Jump Bar */}
      <div style={{
        position: 'sticky',
        top: '64px',
        zIndex: 40,
        background: 'rgba(255, 253, 249, 0.95)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(197, 160, 89, 0.35)',
        padding: '10px 0',
        boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
      }}>
        <div className="web-container" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '4px'
        }}>
          {TIMELINE_DATA.map((node, index) => {
            const isActive = activeChapter === node.id;
            return (
              <button
                key={node.id}
                onClick={() => scrollToChapter(node.id)}
                style={{
                  background: isActive ? '#650015' : 'rgba(255, 255, 255, 0.8)',
                  color: isActive ? '#FFE17D' : '#5B4136',
                  border: isActive ? '1px solid #C5A059' : '1px solid rgba(197, 160, 89, 0.4)',
                  borderRadius: '20px',
                  padding: '6px 14px',
                  fontSize: '12.5px',
                  fontWeight: isActive ? 800 : 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                  flexShrink: 0
                }}
              >
                <span>{node.icon}</span>
                <span>
                  {index + 1}. {lang === 'hi' ? node.yearEra : node.yearEra}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Deep Historical Content Body */}
      <div className="web-container" style={{ padding: '36px 16px 60px 16px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {TIMELINE_DATA.map((node, index) => {
            const extra = CHAPTER_DETAILS[node.id] || {
              subtitleHi: node.titleHi,
              subtitleEn: node.titleEn,
              deepContextHi: [node.detailsHi],
              deepContextEn: [node.detailsEn],
              quoteHi: '',
              quoteEn: '',
              historicNotesHi: '',
              historicNotesEn: ''
            };

            return (
              <section
                key={node.id}
                id={node.id}
                style={{
                  background: '#FFFDF9',
                  borderRadius: '24px',
                  border: '1.5px solid rgba(197, 160, 89, 0.4)',
                  boxShadow: '0 8px 30px rgba(101, 0, 21, 0.06)',
                  overflow: 'hidden',
                  transition: 'transform 0.2s ease'
                }}
              >
                {/* Chapter Banner Header */}
                <div style={{
                  background: 'linear-gradient(135deg, #650015 0%, #4a000f 100%)',
                  color: '#FAF5ED',
                  padding: '22px 28px',
                  borderBottom: '2px solid #C5A059',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '14px',
                      background: 'rgba(255, 255, 255, 0.12)',
                      border: '1.5px solid #C5A059',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px'
                    }}>
                      {node.icon}
                    </div>
                    <div>
                      <span style={{
                        fontSize: '12px',
                        color: '#FFE17D',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em'
                      }}>
                        {lang === 'hi' ? `अध्याय ${index + 1} • ${node.yearEra}` : `Chapter ${index + 1} • ${node.yearEra}`}
                      </span>
                      <h2 style={{
                        margin: '2px 0 0 0',
                        fontSize: 'clamp(20px, 2.4vw, 26px)',
                        fontFamily: 'var(--font-serif)',
                        fontWeight: 800,
                        color: '#FFFDF9'
                      }}>
                        {lang === 'hi' ? node.titleHi : node.titleEn}
                      </h2>
                    </div>
                  </div>

                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(255, 255, 255, 0.12)',
                    padding: '6px 14px',
                    borderRadius: '16px',
                    fontSize: '13px',
                    color: '#FFE17D',
                    fontWeight: 600
                  }}>
                    <MapPin size={14} />
                    <span>{lang === 'hi' ? node.locationHi : node.locationEn}</span>
                  </div>
                </div>

                {/* Chapter Body */}
                <div style={{ padding: '28px 30px' }}>
                  {/* Subtitle / Significance pill */}
                  <div style={{
                    background: 'linear-gradient(135deg, #FAF4E8 0%, #F5EAE0 100%)',
                    border: '1px solid rgba(197, 160, 89, 0.5)',
                    borderRadius: '14px',
                    padding: '12px 18px',
                    marginBottom: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <Sparkles size={18} color="#8D6409" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '14.5px', color: '#650015', fontWeight: 700 }}>
                      {lang === 'hi' ? node.significanceHi : node.significanceEn}
                    </span>
                  </div>

                  {/* Deep Narrative Paragraphs */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                    {(lang === 'hi' ? extra.deepContextHi : extra.deepContextEn).map((para, pIdx) => (
                      <p
                        key={pIdx}
                        style={{
                          margin: 0,
                          fontSize: '15.5px',
                          color: '#3a2a1e',
                          lineHeight: 1.85,
                          textAlign: 'justify'
                        }}
                      >
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Sacred Quote / Teachings Callout */}
                  {extra.quoteHi && (
                    <div style={{
                      background: 'rgba(101, 0, 21, 0.04)',
                      borderLeft: '4px solid #C5A059',
                      borderRadius: '0 16px 16px 0',
                      padding: '16px 20px',
                      marginBottom: '20px'
                    }}>
                      <p style={{
                        margin: 0,
                        fontFamily: 'var(--font-serif)',
                        fontSize: '16px',
                        fontStyle: 'italic',
                        color: '#650015',
                        fontWeight: 700,
                        lineHeight: 1.6
                      }}>
                        {lang === 'hi' ? extra.quoteHi : extra.quoteEn}
                      </p>
                    </div>
                  )}

                  {/* Historical References / Archaeological Insights */}
                  {extra.historicNotesHi && (
                    <div style={{
                      background: '#FFFDF9',
                      border: '1px dashed rgba(197, 160, 89, 0.6)',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px'
                    }}>
                      <BookOpen size={16} color="#8D6409" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span style={{ fontSize: '13px', color: '#6b5a44', lineHeight: 1.6 }}>
                        {lang === 'hi' ? extra.historicNotesHi : extra.historicNotesEn}
                      </span>
                    </div>
                  )}

                  {/* National & International Commemorative Postage Stamps Feature (Landscape) */}
                  {node.id === 'tl-06' && (
                    <div style={{
                      marginTop: '22px',
                      background: 'linear-gradient(135deg, #FFFDF8 0%, #FAF4E8 100%)',
                      border: '1.5px solid rgba(197, 160, 89, 0.45)',
                      borderRadius: '16px',
                      padding: '16px 18px',
                      boxShadow: '0 4px 16px rgba(101, 0, 21, 0.04)'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '14px',
                        flexWrap: 'wrap',
                        gap: '8px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '18px' }}>📮</span>
                          <h4 style={{
                            margin: 0,
                            fontFamily: 'var(--font-serif)',
                            fontSize: '16px',
                            fontWeight: 800,
                            color: '#650015'
                          }}>
                            {lang === 'hi'
                              ? 'महाराजा अग्रसेन जी के सम्मान में जारी ऐतिहासिक स्मारक डाक टिकट'
                              : 'Commemorative Postage Stamps in Honor of Maharaja Agrasen'}
                          </h4>
                        </div>
                      </div>

                      {/* 2 Landscape Cards Grid */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '12px'
                      }}>
                        {/* 1. India 1976 Stamp (Landscape) */}
                        <div 
                          onClick={() => setSelectedStampZoom('india_1976')}
                          style={{
                            background: '#FFFDF9',
                            border: '1.2px solid rgba(197, 160, 89, 0.45)',
                            borderRadius: '12px',
                            padding: '10px 14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px',
                            cursor: 'pointer',
                            boxShadow: '0 2px 8px rgba(101, 0, 21, 0.03)',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#C5A059';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            e.currentTarget.style.boxShadow = '0 4px 14px rgba(101, 0, 21, 0.08)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.45)';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(101, 0, 21, 0.03)';
                          }}
                        >
                          <div style={{
                            flexShrink: 0,
                            background: '#FAF6EE',
                            padding: '5px',
                            borderRadius: '8px',
                            border: '1px solid rgba(197, 160, 89, 0.35)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <img
                              src="/agrasen_stamp_1976.png"
                              alt="1976 India Stamp"
                              style={{
                                width: '84px',
                                height: '62px',
                                objectFit: 'contain',
                                display: 'block',
                                borderRadius: '2px'
                              }}
                            />
                          </div>

                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '6px',
                              marginBottom: '2px'
                            }}>
                              <span style={{ fontSize: '11px', fontWeight: 800, color: '#8D6409' }}>
                                🇮🇳 भारत सरकार • 1976
                              </span>
                              <span style={{
                                fontSize: '10px',
                                fontWeight: 700,
                                color: '#650015',
                                background: '#FAF2DE',
                                padding: '1px 6px',
                                borderRadius: '8px'
                              }}>
                                25 पैसे
                              </span>
                            </div>
                            <h5 style={{
                              margin: '0 0 3px 0',
                              fontFamily: 'var(--font-serif)',
                              fontSize: '14px',
                              fontWeight: 800,
                              color: '#650015',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {lang === 'hi' ? '5100वीं जयंती स्मारक टिकट' : '5100th Birth Anniversary'}
                            </h5>
                            <p style={{
                              margin: 0,
                              fontSize: '11.5px',
                              color: '#6B5A44',
                              lineHeight: 1.35,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}>
                              {lang === 'hi'
                                ? 'अग्रसेन जी का दिव्य स्वरूप एवं अग्रोहा टीले से उत्खनित प्राचीन गणराज्य के सिक्के।'
                                : 'Features King Agrasen flanked by excavated ancient Agroha Republic coins.'}
                            </p>
                          </div>
                        </div>

                        {/* 2. Maldives 2016 Stamp (Landscape) */}
                        <div 
                          onClick={() => setSelectedStampZoom('maldives_2016')}
                          style={{
                            background: '#FFFDF9',
                            border: '1.2px solid rgba(197, 160, 89, 0.45)',
                            borderRadius: '12px',
                            padding: '10px 14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px',
                            cursor: 'pointer',
                            boxShadow: '0 2px 8px rgba(101, 0, 21, 0.03)',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#C5A059';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            e.currentTarget.style.boxShadow = '0 4px 14px rgba(101, 0, 21, 0.08)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.45)';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(101, 0, 21, 0.03)';
                          }}
                        >
                          <div style={{
                            flexShrink: 0,
                            background: '#FAF6EE',
                            padding: '5px',
                            borderRadius: '8px',
                            border: '1px solid rgba(197, 160, 89, 0.35)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <img
                              src="/agrasen_stamp_maldives_2016.png"
                              alt="2016 Maldives Stamp"
                              style={{
                                width: '60px',
                                height: '62px',
                                objectFit: 'contain',
                                display: 'block',
                                borderRadius: '2px'
                              }}
                            />
                          </div>

                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '6px',
                              marginBottom: '2px'
                            }}>
                              <span style={{ fontSize: '11px', fontWeight: 800, color: '#8D6409' }}>
                                🇲🇻 मालदीव गणराज्य • 2016
                              </span>
                              <span style={{
                                fontSize: '10px',
                                fontWeight: 700,
                                color: '#650015',
                                background: '#FAF2DE',
                                padding: '1px 6px',
                                borderRadius: '8px'
                              }}>
                                MRV 70
                              </span>
                            </div>
                            <h5 style={{
                              margin: '0 0 3px 0',
                              fontFamily: 'var(--font-serif)',
                              fontSize: '14px',
                              fontWeight: 800,
                              color: '#650015',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {lang === 'hi' ? 'अंतरराष्ट्रीय जयंती स्मारक टिकट' : 'International Birth Anniversary'}
                            </h5>
                            <p style={{
                              margin: 0,
                              fontSize: '11.5px',
                              color: '#6B5A44',
                              lineHeight: 1.35,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}>
                              {lang === 'hi'
                                ? 'स्वर्ण सिंहासन पर छत्र व दो सिंहों के साथ महाराजा अग्रसेन का ओजस्वी स्वरूप।'
                                : 'King Agrasen enthroned under royal umbrella flanked by golden lions.'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            );
          })}

          {/* Special Section: The 18 Gotras */}
          <div style={{
            background: 'linear-gradient(135deg, #FFFDF9 0%, #FAF4E8 100%)',
            borderRadius: '20px',
            border: '1.5px solid rgba(197, 160, 89, 0.45)',
            padding: '24px 20px 28px',
            boxShadow: '0 6px 20px rgba(101, 0, 21, 0.05)',
            textAlign: 'center'
          }}>
            <div style={{ marginBottom: '18px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(207, 162, 51, 0.15)',
                padding: '4px 14px',
                borderRadius: '16px',
                color: '#8D6409',
                fontSize: '12px',
                fontWeight: 800,
                marginBottom: '6px'
              }}>
                <Crown size={14} color="#8D6409" />
                <span>{lang === 'hi' ? 'अग्रवाल कुल परंपरा' : 'Agrawal Clan Kinship'}</span>
              </div>
              <h2 style={{
                margin: '0',
                color: '#650015',
                fontFamily: 'var(--font-serif)',
                fontSize: '22px',
                fontWeight: 800
              }}>
                {lang === 'hi'
                  ? 'महाराजा अग्रसेन के १८ पावन गोत्र'
                  : 'The 18 Sacred Agrawal Gotras'}
              </h2>
            </div>

            {/* Clean 18 Gotras Pills */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '10px 12px',
              maxWidth: '820px',
              margin: '0 auto'
            }}>
              {GOTRAS_DATA.map((g) => (
                <div
                  key={g.id}
                  style={{
                    background: '#FFFDF9',
                    border: '1.2px solid rgba(197, 160, 89, 0.5)',
                    borderRadius: '20px',
                    padding: '8px 18px',
                    fontSize: '15.5px',
                    fontWeight: 700,
                    color: '#650015',
                    fontFamily: 'var(--font-serif)',
                    boxShadow: '0 2px 6px rgba(101, 0, 21, 0.04)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease',
                    cursor: 'default'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#C5A059';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 14px rgba(101, 0, 21, 0.12)';
                    e.currentTarget.style.background = '#FFF8ED';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.5)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(101, 0, 21, 0.04)';
                    e.currentTarget.style.background = '#FFFDF9';
                  }}
                >
                  <span style={{ color: '#C5A059', fontSize: '11px' }}>✦</span>
                  <span>{lang === 'hi' ? g.nameHi : g.nameEn}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Cards */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            marginTop: '10px'
          }}>
            <button
              onClick={onNavigateHome}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#650015',
                color: '#FFE17D',
                border: '1.5px solid #C5A059',
                borderRadius: '24px',
                padding: '12px 28px',
                fontSize: '15px',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(101, 0, 21, 0.25)',
                transition: 'all 0.2s ease'
              }}
            >
              <ArrowLeft size={16} />
              <span>{lang === 'hi' ? 'मुख्य पृष्ठ पर लौटें' : 'Back to Home'}</span>
            </button>

            {onNavigateToBuilder && (
              <button
                onClick={onNavigateToBuilder}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #C5A059 0%, #E6C665 100%)',
                  color: '#4A000F',
                  border: 'none',
                  borderRadius: '24px',
                  padding: '12px 26px',
                  fontSize: '15px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(207, 162, 51, 0.35)',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>🧱</span>
                <span>{lang === 'hi' ? 'एक रुपया, एक ईंट भवन निर्माण में भाग लें' : 'Contribute in Bhavan Builder'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox / Zoom Modal for Selected Postage Stamp */}
      {selectedStampZoom && (
        <div 
          onClick={() => setSelectedStampZoom(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.82)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#FAF6EE',
              borderRadius: '24px',
              border: '2px solid #C5A059',
              padding: '26px 22px',
              maxWidth: '520px',
              width: '100%',
              boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
              position: 'relative',
              textAlign: 'center'
            }}
          >
            <button
              onClick={() => setSelectedStampZoom(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(101, 0, 21, 0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                fontSize: '18px',
                color: '#650015',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ✕
            </button>

            {selectedStampZoom === 'india_1976' ? (
              <>
                <div style={{ marginBottom: '14px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#8D6409',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em'
                  }}>
                    🇮🇳 {lang === 'hi' ? 'भारत सरकार • राष्ट्रीय स्मारक डाक टिकट' : 'Government of India • National Heritage'}
                  </span>
                  <h3 style={{
                    margin: '4px 0 0 0',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '20px',
                    fontWeight: 800,
                    color: '#650015'
                  }}>
                    {lang === 'hi'
                      ? 'महाराजा अग्रसेन 5100वीं जयंती स्मारक डाक टिकट (1976)'
                      : 'Maharaja Agrasen 5100th Birth Anniversary Stamp (1976)'}
                  </h3>
                </div>

                <div style={{
                  background: '#FFFDF9',
                  padding: '12px',
                  borderRadius: '16px',
                  border: '1.5px solid rgba(197, 160, 89, 0.45)',
                  display: 'inline-block',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                  marginBottom: '14px'
                }}>
                  <img
                    src="/agrasen_stamp_1976.png"
                    alt="1976 India Postage Stamp"
                    style={{
                      maxHeight: '260px',
                      maxWidth: '100%',
                      height: 'auto',
                      borderRadius: '6px',
                      display: 'block'
                    }}
                  />
                </div>

                <p style={{
                  margin: '0 0 16px 0',
                  fontSize: '13px',
                  color: '#5B4136',
                  lineHeight: 1.65,
                  textAlign: 'justify'
                }}>
                  {lang === 'hi'
                    ? '1976 में भारत सरकार के डाक विभाग द्वारा महाराजा अग्रसेन जी की 5100वीं जयंती पर 25 पैसे का यह विशेष डाक टिकट जारी किया गया था। इसमें मध्य में अग्रसेन जी तथा दोनों पार्श्व में अग्रोहा टीले से उत्खनित प्राचीन गणराज्य के सिक्के अंकित हैं।'
                    : 'Postage stamp issued by the Government of India in 1976, commemorating Maharaja Agrasen’s 5100th birth anniversary. The 25-paise stamp depicts King Agrasen flanked by authentic ancient coins of the Agroha Republic.'}
                </p>
              </>
            ) : (
              <>
                <div style={{ marginBottom: '14px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#8D6409',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em'
                  }}>
                    🇲🇻 {lang === 'hi' ? 'मालदीव गणराज्य • अंतरराष्ट्रीय स्मारक डाक टिकट' : 'Republic of Maldives • International Heritage'}
                  </span>
                  <h3 style={{
                    margin: '4px 0 0 0',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '20px',
                    fontWeight: 800,
                    color: '#650015'
                  }}>
                    {lang === 'hi'
                      ? 'महाराजा अग्रसेन जयंती अंतरराष्ट्रीय डाक टिकट (2016)'
                      : 'Maharaja Agrasen Birth Anniversary International Stamp (2016)'}
                  </h3>
                </div>

                <div style={{
                  background: '#FFFDF9',
                  padding: '12px',
                  borderRadius: '16px',
                  border: '1.5px solid rgba(197, 160, 89, 0.45)',
                  display: 'inline-block',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                  marginBottom: '14px'
                }}>
                  <img
                    src="/agrasen_stamp_maldives_2016.png"
                    alt="2016 Maldives Postage Stamp"
                    style={{
                      maxHeight: '260px',
                      maxWidth: '100%',
                      height: 'auto',
                      borderRadius: '6px',
                      display: 'block'
                    }}
                  />
                </div>

                <p style={{
                  margin: '0 0 16px 0',
                  fontSize: '13px',
                  color: '#5B4136',
                  lineHeight: 1.65,
                  textAlign: 'justify'
                }}>
                  {lang === 'hi'
                    ? '2016 में मालदीव सरकार द्वारा महाराजा अग्रसेन जी की जयंती के अवसर पर MRV 70 (मालदीवियाई रुफिया) का यह भव्य अंतरराष्ट्रीय डाक टिकट जारी किया गया। इसमें महाराजा अग्रसेन को स्वर्ण सिंहासन पर छत्र व दो सिंहों के साथ दिव्य स्वरूप में दर्शाया गया है।'
                    : 'Postage stamp issued by the Maldives in 2016 (MRV 70) on Maharaja Agrasen’s birth anniversary, depicting King Agrasen in regal majesty seated on a golden throne flanked by royal lions.'}
                </p>
              </>
            )}

            <button
              onClick={() => setSelectedStampZoom(null)}
              style={{
                background: '#650015',
                color: '#FFE17D',
                border: '1px solid #C5A059',
                borderRadius: '20px',
                padding: '9px 24px',
                fontSize: '13.5px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {lang === 'hi' ? 'बंद करें' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </main>
  );
};
