import React, { useState } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, Download, Sparkles, X } from 'lucide-react';
import type { Language } from '../data/translations';

interface EBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

interface EBookChapter {
  titleHi: string;
  titleEn: string;
  subtitleHi: string;
  subtitleEn: string;
  contentHi: string[];
  contentEn: string[];
}

const EBOOK_CHAPTERS: EBookChapter[] = [
  {
    titleHi: '1. महाराजा अग्रसेन जी का पावन जीवन चरित्र',
    titleEn: '1. Sacred Life of Maharaja Agrasen Ji',
    subtitleHi: 'सूर्यवंश, धर्म-रक्षा एवं 18 गोत्रों की स्थापना',
    subtitleEn: 'Solar Dynasty, Righteousness & 18 Gotras Foundation',
    contentHi: [
      'महाराजा अग्रसेन जी का जन्म द्वापर युग के अंत और कलयुग के प्रारंभ में सूर्यवंशी कुल में प्रतापनगर के महाराज वल्लभ सेन जी के घर हुआ था। वे भगवान श्रीराम के पुत्र कुश के वंशज थे।',
      'बचपन से ही वे प्रजावत्सल, न्यायप्रिय और करुणा के सागर थे। युवावस्था में उनका विवाह नागराज कुमुद की पुत्री राजकुमारी माधवी से हुआ।',
      'धर्म, अहिंसा और सामाजिक समरसता की स्थापना हेतु उन्होंने अग्रोहा नगर की स्थापना की और समाज को संगठित करने हेतु 18 महाऋषियों के सानिध्य में 18 यज्ञ संपन्न कर 18 गोत्रों का प्रवर्तन किया।'
    ],
    contentEn: [
      'Maharaja Agrasen was born into the illustrious Suryavanshi lineage to King Vallabh Sen of Pratapnagar. He was a direct descendant of Kush, the son of Lord Rama.',
      'From early youth, he was renowned for compassion, justice, and devotion to his subjects. He married Princess Madhavi, the daughter of Nagraj Kumud.',
      'To foster perpetual peace, Ahimsa, and unity, he established the city of Agroha. Guided by 18 revered sages, he conducted 18 yagyas, giving rise to the 18 eternal Gotras of the Agarwal community.'
    ]
  },
  {
    titleHi: '2. "एक रुपया, एक ईंट" — समाजवाद का अमर सिद्धांत',
    titleEn: '2. "Ek Rupya, Ek Eent" — The Eternal Principle',
    subtitleHi: 'संसार का पहला अहिंसक व स्वाभिमानी समाजवाद',
    subtitleEn: 'The World\'s First Non-Violent Economic Socialism',
    contentHi: [
      'महाराज अग्रसेन जी ने अग्रोहा गणराज्य में एक ऐसा नियम बनाया जो विश्व इतिहास में अद्वितीय है — जब भी कोई नया व्यक्ति या परिवार अग्रोहा में बसने आता, तो नगर का प्रत्येक नागरिक उसे अपने घर से "एक रुपया और एक ईंट" भेंट करता था।',
      'लाखों नागरिकों से मिली ईंटों से उस नए परिवार का सुंदर घर बन जाता था और रुपयों से वह सम्मानपूर्वक अपना व्यापार या उद्योग प्रारंभ कर सकता था।',
      'इस नियम से न कोई धनवान था, न कोई निर्धन। किसी को दान का अपमान नहीं सहना पड़ता था, बल्कि यह समाज का स्नेहपूर्ण सहयोग था।'
    ],
    contentEn: [
      'Maharaja Agrasen instituted an unprecedented socioeconomic principle in Agroha: whenever a newcomer arrived to settle, every resident presented them with "One Rupee and One Brick".',
      'With thousands of bricks, a graceful home was constructed without debt; with the collected rupees, the family established an independent, dignified livelihood.',
      'This eradicated poverty without humiliating charity, creating an egalitarian society founded on mutual respect and shared prosperity.'
    ]
  },
  {
    titleHi: '3. श्री अग्रवाल समाज बालोतरा — गौरवशाली धरोहर',
    titleEn: '3. Shri Agarwal Samaj Balotra — Legacy & Mission',
    subtitleHi: 'बालोतरा में समाज का संगठन, सेवा कार्य एवं समाज भवन',
    subtitleEn: 'Community Organization, Welfare & Balotra Bhavan',
    contentHi: [
      'बालोतरा नगर में अग्रवाल समाज की जड़ें अत्यंत गहरी और समृद्ध हैं। नगर के व्यापारिक, सामाजिक और सांस्कृतिक विकास में अग्र-बंधुओं का योगदान सदैव अग्रणी रहा है।',
      'समाज द्वारा प्रतिवर्ष महाराजा अग्रसेन जयंती महोत्सव को अभूतपूर्व श्रद्धा और उल्लास के साथ मनाया जाता है। शोभायात्रा, महाआरती, रक्तदान शिविर और मेधावी छात्र सम्मान इसके प्रमुख अंग हैं।',
      'अग्रोहा मार्ग पर स्थित "श्री अग्रवाल समाज भवन" समस्त अग्र-बंधुओं के स्नेह और "एक रुपया, एक ईंट" के सामूहिक संकल्प का जीवंत प्रतीक है।'
    ],
    contentEn: [
      'The Agarwal community in Balotra has deep historical roots, playing a pioneering role in the city\'s commercial, cultural, and philanthropic development.',
      'Every year, the community celebrates Agrasen Jayanti with immense devotion, featuring vibrant Shobha Yatras, Maha Aarti, blood donation camps, and talent felicitation.',
      'The upcoming "Agarwal Samaj Balotra Bhavan" on Agroha Marg stands as a living testament to collective unity and the "Ek Rupya, Ek Eent" pledge.'
    ]
  },
  {
    titleHi: '4. जयंती महोत्सव 2026 विशेषांक',
    titleEn: '4. Jayanti Mahotsav 2026 Special Edition',
    subtitleHi: '29 सितम्बर से 13 अक्टूबर 2026: भव्य महोत्सव रूपरेखा',
    subtitleEn: '29 September to 13 October 2026: Grand Mahotsav Overview',
    contentHi: [
      'वर्ष 2026 का जयंती महोत्सव विशेष गरिमामय है। 29 सितम्बर से 13 अक्टूबर 2026 तक चलने वाले पावन महोत्सव में बच्चों, महिलाओं एवं युवाओं हेतु 20 से अधिक प्रतियोगिताएं आयोजित हैं।',
      'मुख्य जयंती के पावन दिवस (11 अक्टूबर, आश्विन शुक्ल एकम) पर नगर में भव्य रथयुक्त शोभायात्रा निकाली जाएगी, जिसके उपरांत महाप्रसाद एवं सम्मान समारोह होगा।',
      'समस्त अग्र-परिवारों से अनुरोध है कि वे इस महोत्सव में सक्रिय रूप से सहभागी बनकर समाज की एकता को सुदृढ़ करें।'
    ],
    contentEn: [
      'The 2026 celebration marks a monumental milestone. Running from 29 September to 13 October 2026, the festivities feature over 20 cultural and academic competitions for all ages.',
      'On the auspicious Jayanti Day (11 October, Ashwin Shukla Ekam), a majestic chariot procession (Shobha Yatra) will traverse the city, followed by Mahaprasad and felicitation.',
      'All Agarwal families are warmly invited to participate and celebrate our timeless heritage together.'
    ]
  },
  {
    titleHi: '5. श्री महालक्ष्मी स्तुति एवं अग्रसेन आरती',
    titleEn: '5. Shri Mahalakshmi Stuti & Agrasen Aarti',
    subtitleHi: 'कुलदेवी स्तुति एवं अग्र-कुल शिरोमणि की पावन आरती',
    subtitleEn: 'Kuldevi Hymn & Sacred Aarti of Maharaja Agrasen',
    contentHi: [
      '॥ श्री महालक्ष्मी स्तुति ॥\nनमस्तेऽस्तु महामाये श्रीपीठे सुरपूजिते। शंखचक्रगदाहस्ते महालक्ष्मी नमोऽस्तु ते॥',
      '॥ अग्रसेन जी की आरती ॥\nजय अग्रसेन देवा, स्वामी जय अग्रसेन देवा। कोटि-कोटि जन वंदन, पूजत जन सेवा॥\nसूर्यवंशी कुलभूषण, अग्रोहा के स्वामी। अहिंसा परमो धर्म के, पालक निष्कामी॥',
      '॥ ॐ श्री महालक्ष्मी अग्रसेवाय नमः ॥'
    ],
    contentEn: [
      '॥ Shri Mahalakshmi Stuti ॥\nNamastestu Mahamaye Shree Peethe Sura Poojite, Shankha Chakra Gadahaste Mahalakshmi Namostute॥',
      '॥ Aarti of Maharaja Agrasen ॥\nJai Agrasen Deva, Swami Jai Agrasen Deva. Koti Koti Jan Vandan, Poojat Jan Seva॥\nLord of Suryavansh, ruler of Agroha, champion of compassion and peaceful socialism.',
      '॥ Om Shree Mahalakshmi Agrasevaya Namah ॥'
    ]
  }
];

export const EBookModal: React.FC<EBookModalProps> = ({ isOpen, onClose, lang }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  if (!isOpen) return null;

  const currentChapter = EBOOK_CHAPTERS[currentPage];
  const totalPages = EBOOK_CHAPTERS.length;

  const handleDownloadPdf = () => {
    window.print();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      zIndex: 99999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        background: '#FAF5ED',
        borderRadius: '24px',
        maxWidth: '720px',
        width: '100%',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        border: '2px solid #C5A059',
        boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Modal Top Header */}
        <div style={{
          background: 'linear-gradient(135deg, #650015 0%, #4A000D 100%)',
          color: '#FAF5ED',
          padding: '18px 24px',
          borderBottom: '2px solid #C5A059',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(223, 189, 116, 0.2)',
              border: '1px solid #DFBD74',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#DFBD74'
            }}>
              <BookOpen size={18} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '17px', color: '#FFFDF9', fontFamily: 'var(--font-serif)', fontWeight: 800 }}>
                {lang === 'hi' ? 'अग्रसेन स्मारिका एवं ई-पत्रिका 2026' : 'Agrasen Jayanti 2026 E-Book'}
              </h3>
              <div style={{ fontSize: '11px', color: '#DFBD74' }}>
                {lang === 'hi' ? 'डिजिटल स्मारिका • श्री अग्रवाल समाज बालोतरा' : 'Digital Smarika • Shri Agarwal Samaj Balotra'}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(223, 189, 116, 0.4)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* E-Book Reading Content Area */}
        <div style={{
          padding: '24px 28px',
          overflowY: 'auto',
          flex: 1,
          fontFamily: 'var(--font-body)',
          color: '#3A2A1E',
          lineHeight: 1.75
        }}>
          {/* Chapter Header */}
          <div style={{
            borderBottom: '1px solid rgba(197, 160, 89, 0.3)',
            paddingBottom: '14px',
            marginBottom: '18px'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(101, 0, 21, 0.08)',
              color: '#650015',
              padding: '3px 10px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: 700,
              marginBottom: '6px'
            }}>
              <Sparkles size={12} color="#C5A059" />
              <span>{lang === 'hi' ? `अध्याय ${currentPage + 1} / ${totalPages}` : `Chapter ${currentPage + 1} of ${totalPages}`}</span>
            </div>
            <h4 style={{
              margin: '4px 0',
              fontFamily: 'var(--font-serif)',
              fontSize: '20px',
              color: '#650015',
              fontWeight: 800
            }}>
              {lang === 'hi' ? currentChapter.titleHi : currentChapter.titleEn}
            </h4>
            <div style={{ fontSize: '13px', color: '#8C6F38', fontWeight: 600 }}>
              {lang === 'hi' ? currentChapter.subtitleHi : currentChapter.subtitleEn}
            </div>
          </div>

          {/* Paragraphs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14.5px' }}>
            {(lang === 'hi' ? currentChapter.contentHi : currentChapter.contentEn).map((p, idx) => (
              <p key={idx} style={{
                margin: 0,
                whiteSpace: 'pre-line',
                background: 'rgba(255, 255, 255, 0.65)',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '1px solid rgba(207, 162, 51, 0.25)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}>
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* E-Book Navigation Bottom Bar */}
        <div style={{
          background: '#F5EAE0',
          borderTop: '1px solid rgba(197, 160, 89, 0.4)',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            style={{
              background: currentPage === 0 ? 'rgba(0,0,0,0.05)' : '#650015',
              color: currentPage === 0 ? '#A69688' : '#DFBD74',
              border: '1px solid rgba(197, 160, 89, 0.4)',
              borderRadius: '20px',
              padding: '6px 14px',
              fontSize: '12.5px',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              cursor: currentPage === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            <ChevronLeft size={16} />
            <span>{lang === 'hi' ? 'पिछला पृष्ठ' : 'Previous'}</span>
          </button>

          {/* Page Counter Dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {EBOOK_CHAPTERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                style={{
                  width: i === currentPage ? '20px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === currentPage ? '#650015' : 'rgba(101, 0, 21, 0.25)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  padding: 0
                }}
                title={`Page ${i + 1}`}
              />
            ))}
          </div>

          {/* Right Action: Next & Download */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handleDownloadPdf}
              title="Download / Print E-Book"
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid #C5A059',
                borderRadius: '20px',
                padding: '6px 12px',
                fontSize: '12px',
                color: '#650015',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer'
              }}
            >
              <Download size={14} />
              <span className="hide-mobile">{lang === 'hi' ? 'प्रिंट / सेव' : 'Save'}</span>
            </button>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
              disabled={currentPage === totalPages - 1}
              style={{
                background: currentPage === totalPages - 1 ? 'rgba(0,0,0,0.05)' : '#650015',
                color: currentPage === totalPages - 1 ? '#A69688' : '#DFBD74',
                border: '1px solid rgba(197, 160, 89, 0.4)',
                borderRadius: '20px',
                padding: '6px 14px',
                fontSize: '12.5px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer'
              }}
            >
              <span>{lang === 'hi' ? 'अगला पृष्ठ' : 'Next'}</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
