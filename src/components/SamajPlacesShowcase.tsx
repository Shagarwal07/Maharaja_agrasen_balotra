import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Building } from 'lucide-react';
import type { Language } from '../data/translations';

interface SamajPlacesProps {
  lang: Language;
}

export interface SamajPlaceItem {
  id: string;
  tagHi: string;
  tagEn: string;
  titleHi: string;
  titleEn: string;
  locationHi: string;
  locationEn: string;
  descHi: string;
  descEn: string;
  imageSrc: string;
  featuresHi: string[];
  featuresEn: string[];
}

export const SAMAJ_PLACES: SamajPlaceItem[] = [
  {
    id: 'place-1',
    tagHi: 'आदिकालीन पावन तीर्थ',
    tagEn: 'Prime Eternal Sanctuary',
    titleHi: 'श्री अग्रोहा धाम मुख्य मंदिर',
    titleEn: 'Shree Agroha Dham Principal Temple',
    locationHi: 'हिसार, हरियाणा',
    locationEn: 'Hisar, Haryana',
    descHi: 'अग्रवाल समाज का सर्वोच्च राष्ट्रीय तीर्थ। जहाँ महाराजा अग्रसेन, कुलदेवी माँ महालक्ष्मी और माँ सरस्वती के दिव्य मंदिर सनातन संस्कृति और समाजवाद की अमर ज्योति प्रज्वलित रखते हैं।',
    descEn: 'The supreme spiritual capital of the global Agrawal community, commemorating the socialist ideals of Maharaja Agrasen alongside divine shrines of Maa Mahalakshmi and Maa Saraswati.',
    imageSrc: '/places/agroha_dham.jpg',
    featuresHi: [
      'महाराजा अग्रसेन, माँ महालक्ष्मी व माँ सरस्वती के तीन भव्य शिखरीय देवालय',
      'विशाल सरोवर एवं शक्ति सरोवर अमृत कुंड',
      'प्रतिवर्ष शरद पूर्णिमा पर आयोजित होने वाला ऐतिहासिक महाकुंभ मेला'
    ],
    featuresEn: [
      'Three majestic shrines honoring Maharaja Agrasen, Goddess Mahalakshmi & Goddess Saraswati',
      'Sacred Shakti Sarovar water reservoir with ornate stone ghats',
      'Annual national congregation on Sharad Purnima attracting lakhs of devotees'
    ]
  },
  {
    id: 'place-2',
    tagHi: 'शक्तिपीठ व वैभव',
    tagEn: 'Abode of Wealth & Compassion',
    titleHi: 'कुलदेवी श्री आद्य महालक्ष्मी मंदिर',
    titleEn: 'Kuldevi Shree Aadya Mahalakshmi Mandir',
    locationHi: 'अग्रोहा शक्तिपीठ',
    locationEn: 'Agroha Shaktipeeth',
    descHi: '18 गोत्रों की पूज्य कुलदेवी माँ महालक्ष्मी का स्वर्णमंडित गर्भगृह। यहाँ माता के आशीष से धर्म, अर्थ, काम और मोक्ष के चतुर्विध पुरुषार्थ की सिद्धि मानी जाती है।',
    descEn: 'The consecrated inner sanctum of Maa Mahalakshmi, divine patroness and protector of all 18 Agrawal Gotras, blessing the samaj with prosperity and benevolent duty.',
    imageSrc: '/places/mahalakshmi_mandir.jpg',
    featuresHi: [
      'प्रतिदिन अष्टलक्ष्मी अर्चन एवं सहस्रनाम कुंकुमार्चन विधान',
      'अखंड ज्योति जो निरंतर समृद्धि और मंगल कामना का प्रतीक है',
      'नवनिर्मित भव्य नक्काशीदार संगमरमर सभा मंडप'
    ],
    featuresEn: [
      'Daily Ashtalakshmi archana and continuous holy Kumkum rituals',
      'Perpetual sacred flame (Akhand Jyoti) burning for collective prosperity',
      'Exquisite hand-carved white Makrana marble pavilion'
    ]
  },
  {
    id: 'place-3',
    tagHi: 'समाज गौरव व अतिथि सत्कार',
    tagEn: 'Community Center of Excellence',
    titleHi: 'श्री अग्रसेन भवन बालोतरा',
    titleEn: 'Shree Agrasen Bhavan Balotra',
    locationHi: 'अग्रोहा मार्ग, बालोतरा',
    locationEn: 'Agroha Marg, Balotra',
    descHi: 'बालोतरा नगर के हृदय स्थल पर स्थित यह भवन समाज के सांस्कृतिक, वैवाहिक, शैक्षणिक एवं जनकल्याणकारी आयोजनों का केंद्रीय अधिष्ठान है।',
    descEn: 'The premier community headquarters in Balotra, hosting cultural milestones, philanthropic initiatives, youth conferences, and auspicious celebrations.',
    imageSrc: '/places/agrasen_bhavan.jpg',
    featuresHi: [
      'वातानुकूलित विशाल उत्सव सभागार एवं भोजनशाला',
      'विद्यार्थियों हेतु डिजिटल लाइब्रेरी एवं अध्ययन कक्ष',
      'अग्रसेन जयंती महोत्सव का मुख्य आयोजन केंद्र'
    ],
    featuresEn: [
      'Air-conditioned imperial grand auditorium and community banquet hall',
      'Modern digital library and student study chambers',
      'Command center for the annual Maharaja Agrasen Jayanti Mahotsav'
    ]
  },
  {
    id: 'place-4',
    tagHi: 'निःशुल्क सेवा व आश्रय',
    tagEn: 'Selfless Hospitality & Haven',
    titleHi: 'अग्रवाल धर्मशाला एवं अतिथि गृह',
    titleEn: 'Agrawal Dharamshala & Pilgrims Haven',
    locationHi: 'प्रमुख तीर्थ व नगर केंद्र',
    locationEn: 'Key Pilgrimage Corridors',
    descHi: '‘अतिथि देवो भव’ के सनातन संकल्प के साथ देश भर में स्थापित अग्र धर्मशालाएं जहां हर यात्री और तीर्थयात्री को सम्मानपूर्वक सात्विक भोजन और सुरक्षित विश्राम मिलता है।',
    descEn: 'A nationwide tradition of philanthropic guest homes providing spotless, affordable sanctuary and satvik nourishment to pilgrims across India.',
    imageSrc: '/places/agrawal_dharamshala.jpg',
    featuresHi: [
      'स्वच्छ सुसज्जित कक्ष, आधुनिक सुविधाएं एवं निःशुल्क चिकित्सा सहायता',
      'शुद्ध देशी घी से निर्मित पौष्टिक सात्विक अन्नक्षेत्र',
      'वरिष्ठ नागरिकों एवं दूरदराज से पधारे अग्र बंधुओं हेतु विशेष सुविधा'
    ],
    featuresEn: [
      'Spotless guest suites, modern elevator access, and first-aid amenities',
      'Subsidized hygienic Annakshetra serving pure satvik meals daily',
      'Dedicated priority facilities for senior citizens and traveling pilgrims'
    ]
  },
  {
    id: 'place-5',
    tagHi: 'पवित्र कुण्ड व ध्यान स्थली',
    tagEn: 'Sacred Sarovar & Meditation Ghats',
    titleHi: 'अग्रोहा शक्तिपीठ अमृत सरोवर',
    titleEn: 'Agroha Shaktipeeth Amrit Sarovar',
    locationHi: 'अग्रोहा, हरियाणा',
    locationEn: 'Agroha, Haryana',
    descHi: 'पवित्र जल से परिपूर्ण अमृत सरोवर, जिसके तट पर संध्या आरती, दीपदान और ध्यान करने से असीम मानसिक शांति एवं आध्यात्मिक ऊर्जा की अनुभूति होती है।',
    descEn: 'The tranquil sacred water body of Agroha Dham, bordered by red sandstone colonnades where twilight aarti and lamp-floating rituals inspire serene contemplation.',
    imageSrc: '/places/agroha_sarovar.jpg',
    featuresHi: [
      'महाराजा अग्रसेन के जीवन प्रसंगों को दर्शाते संगीतमय फव्वारे',
      'पवित्र गंगा जल एवं 108 तीर्थों के जल का संगम स्थल',
      'संध्याकालीन महाआरती एवं दीपदान हेतु विशेष रूप से निर्मित सुरम्य घाट'
    ],
    featuresEn: [
      'Illuminated musical fountains depicting Maharaja Agrasen life saga',
      'Confluence of holy Ganga water and sacred essences from 108 pilgrimage sites',
      'Tranquil ambiance dedicated to deepdaan and sacred remembrance prayers'
    ]
  }
];

export const SamajPlacesShowcase: React.FC<SamajPlacesProps> = ({ lang }) => {
  const [activeIndex, setActiveIndex] = useState<number>(2); // Center default (place-3: Agrasen Bhavan)
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isAutoScrolling = useRef(false);

  // Smoothly center the active card on mobile
  const scrollToCard = (index: number, smooth = true) => {
    const stage = stageRef.current;
    const card = cardRefs.current[index];
    if (!stage || !card || window.innerWidth > 860) return;

    isAutoScrolling.current = true;
    const stageRect = stage.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const targetScrollLeft = stage.scrollLeft + (cardRect.left - stageRect.left) - (stageRect.width / 2) + (cardRect.width / 2);

    stage.scrollTo({
      left: targetScrollLeft,
      behavior: smooth ? 'smooth' : 'auto'
    });

    setTimeout(() => {
      isAutoScrolling.current = false;
    }, 400);
  };

  const handlePrev = () => {
    setActiveIndex(prev => {
      const next = prev === 0 ? SAMAJ_PLACES.length - 1 : prev - 1;
      scrollToCard(next, true);
      return next;
    });
  };

  const handleNext = () => {
    setActiveIndex(prev => {
      const next = prev === SAMAJ_PLACES.length - 1 ? 0 : prev + 1;
      scrollToCard(next, true);
      return next;
    });
  };

  const handleSelectPlace = (index: number) => {
    setActiveIndex(index);
    scrollToCard(index, true);
  };

  // Center initial card on mobile mount
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToCard(2, false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Update active index when user scrolls/swipes on mobile
  const handleScroll = () => {
    if (isAutoScrolling.current) return;
    const stage = stageRef.current;
    if (!stage || window.innerWidth > 860) return;

    const stageCenter = stage.scrollLeft + stage.clientWidth / 2;
    let closestIdx = activeIndex;
    let minDistance = Infinity;

    cardRefs.current.forEach((card, idx) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(stageCenter - cardCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = idx;
      }
    });

    if (closestIdx !== activeIndex) {
      setActiveIndex(closestIdx);
    }
  };

  // Calculate position class relative to active index for curved 3D layout
  const getPositionClass = (index: number) => {
    // Relative offset from active index in range [-2, 2]
    let diff = index - activeIndex;
    if (diff < -2) diff += SAMAJ_PLACES.length;
    if (diff > 2) diff -= SAMAJ_PLACES.length;

    switch (diff) {
      case -2: return 'places-frame-pos-0';
      case -1: return 'places-frame-pos-1';
      case 0: return 'places-frame-pos-2';
      case 1: return 'places-frame-pos-3';
      case 2: return 'places-frame-pos-4';
      default: return 'places-frame-pos-2';
    }
  };

  return (
    <section id="samaj-places" className="places-showcase-section">
      {/* Top Section Header in container for optimal typography readability */}
      <div className="web-container">
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div className="section-badge" style={{ marginBottom: '14px' }}>
            <Building size={14} color="#C5A059" />
            <span>
              {lang === 'hi' 
                ? 'अखिल भारतीय अग्र तीर्थ एवं सेवा केंद्र' 
                : 'Pan-India Agrawal Sanctuaries & Institutions'}
            </span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(28px, 3.4vw, 44px)',
            fontWeight: 800,
            color: '#650015',
            margin: '0 0 10px 0',
            lineHeight: 1.15
          }}>
            {lang === 'hi'
              ? 'अग्रवाल समाज के पावन तीर्थ, मंदिर एवं सेवा भवन'
              : 'Revered Sanctuaries, Temples & Seva Bhavans of Agrawal Samaj'}
          </h2>

          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(14px, 1.35vw, 16.5px)',
            color: '#5B4136',
            maxWidth: '840px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            {lang === 'hi'
              ? 'अग्रोहा धाम, कुलदेवी महालक्ष्मी मंदिर, अग्रसेन भवन व धर्मशालाएं — सेवा, सनातन निष्ठा और लोक-कल्याण के अमर केंद्र'
              : 'Agroha Dham, Kuldevi Mahalakshmi Mandir, Agrasen Bhavans & Dharamshalas — Sacred centers of selfless service, culture, and community harmony'}
          </p>
        </div>
      </div>

      {/* 3D Perspective Stage: Uses Display Width with Balanced Padding */}
      <div className="places-3d-stage" ref={stageRef} onScroll={handleScroll}>
        <div className="places-curved-arc">
          {SAMAJ_PLACES.map((place, idx) => {
            const posClass = getPositionClass(idx);
            const isActive = idx === activeIndex;

            return (
              <div
                key={place.id}
                ref={el => { cardRefs.current[idx] = el; }}
                className={`places-frame ${posClass} ${isActive ? 'active' : ''}`}
                onClick={() => handleSelectPlace(idx)}
              >
                <img
                  src={place.imageSrc}
                  alt={lang === 'hi' ? place.titleHi : place.titleEn}
                  loading="lazy"
                />

                {/* Clean Minimalist Bottom Caption */}
                <div className="places-frame-caption">
                  <div className="places-frame-title">
                    {lang === 'hi' ? place.titleHi : place.titleEn}
                  </div>
                  <div className="places-frame-loc-badge">
                    <MapPin size={11} color="#FFE17D" style={{ flexShrink: 0 }} />
                    <span>{lang === 'hi' ? place.locationHi : place.locationEn}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="web-container">
        {/* Navigation Slider Controls with Ample Vertical Clearance */}
        <div className="places-slider-controls">
          <button
            className="places-slider-btn"
            onClick={handlePrev}
            title={lang === 'hi' ? 'पिछला स्थान' : 'Previous Place'}
          >
            <ChevronLeft size={16} />
          </button>

          {/* Dots Indicator */}
          <div className="places-dots-row">
            {SAMAJ_PLACES.map((p, i) => (
              <button
                key={p.id}
                className="places-dot-pill"
                onClick={() => handleSelectPlace(i)}
                style={{
                  width: i === activeIndex ? '22px' : '7px',
                  background: i === activeIndex ? '#650015' : 'rgba(197, 160, 89, 0.45)',
                  boxShadow: i === activeIndex ? '0 2px 6px rgba(101, 0, 21, 0.3)' : 'none'
                }}
                title={lang === 'hi' ? p.titleHi : p.titleEn}
              />
            ))}
          </div>

          <button
            className="places-slider-btn"
            onClick={handleNext}
            title={lang === 'hi' ? 'अगला स्थान' : 'Next Place'}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Editorial Subtitle Quote matching the reference image typography */}
        <div style={{
          textAlign: 'center',
          marginTop: '44px',
          paddingTop: '28px',
          borderTop: '1px dashed rgba(197, 160, 89, 0.4)'
        }}>
          <p style={{
            fontSize: '13.5px',
            color: '#8D6409',
            fontStyle: 'italic',
            fontWeight: 600,
            marginBottom: '6px'
          }}>
            {lang === 'hi'
              ? 'स्थापत्य वैभव एवं अमर सेवा-सत्कार की गौरवमयी परंपरा'
              : 'A blend of architectural magnificence & philanthropic spirit'}
          </p>
          <h4 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(15px, 1.5vw, 19px)',
            fontWeight: 700,
            color: '#650015',
            margin: 0
          }}>
            {lang === 'hi'
              ? '“जहाँ भी बसे अग्र बंधु, वहाँ स्थापित किए भव्य मंदिर, अग्रसेन भवन और निःशुल्क धर्मशालाएं”'
              : '“Wherever the Agrawal diaspora established roots, they raised glorious temples, bhavans, and hospices for universal welfare”'}
          </h4>
        </div>
      </div>
    </section>
  );
};
