import React, { useState, useRef } from 'react';
import { Image as ImageIcon, ArrowRight, X, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Language } from '../data/translations';
import { TRANSLATIONS } from '../data/translations';

interface GalleryProps {
  lang: Language;
}

interface GalleryItem {
  id: string;
  category: 'yatra' | 'cultural' | 'havan';
  title: string;
  titleHi: string;
  year: string;
  type: 'image' | 'video';
  thumbnail: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-yatra-1',
    category: 'yatra',
    title: 'Divine Child Deity Tableaus & Procession',
    titleHi: 'भव्य शोभा यात्रा - बाल स्वरूप देव झांकियां',
    year: '2025',
    type: 'image',
    thumbnail: '/shobha_yatra_dev_swaroop_2025.jpg'
  },
  {
    id: 'g-yatra-2',
    category: 'yatra',
    title: 'Shri Radha Krishna Divine Tableau',
    titleHi: 'शोभा यात्रा - श्री राधा कृष्ण दिव्य स्वरूप झांकी',
    year: '2025',
    type: 'image',
    thumbnail: '/shobha_yatra_radha_krishna_2025.jpg'
  },
  {
    id: 'g-yatra-3',
    category: 'yatra',
    title: 'Shri Ram Darbar & Hanuman Ji Float',
    titleHi: 'शोभा यात्रा - श्री राम दरबार एवं हनुमान जी झांकी',
    year: '2025',
    type: 'image',
    thumbnail: '/shobha_yatra_ram_darbar_2025.jpg'
  },
  {
    id: 'g-cult-1',
    category: 'cultural',
    title: 'Narasimha Avatar Dance Drama Performance',
    titleHi: 'सांस्कृतिक संध्या - श्री नृसिंह अवतार नाट्य प्रस्तुति',
    year: '2025',
    type: 'image',
    thumbnail: '/cultural_narasimha_dance_2025.jpg'
  },
  {
    id: 'g-cult-2',
    category: 'cultural',
    title: 'Radha Krishna Raas & Dandiya Dance Drama',
    titleHi: 'सांस्कृतिक संध्या - श्री राधा कृष्ण रास एवं नृत्य नाटिका',
    year: '2025',
    type: 'image',
    thumbnail: '/cultural_radha_krishna_dance_2025.jpg'
  },
  {
    id: 'g-cult-3',
    category: 'cultural',
    title: 'Shri Govardhan Leela Stage Presentation',
    titleHi: 'सांस्कृतिक संध्या - श्री गोवर्धन लीला मंचन',
    year: '2025',
    type: 'image',
    thumbnail: '/cultural_govardhan_leela_2025.jpg'
  },
  {
    id: 'g-havan-1',
    category: 'havan',
    title: 'Sacred Vedic Havan & 18 Gotra Yagya',
    titleHi: 'पवित्र वैदिक हवन एवं 18 गोत्र महायज्ञ',
    year: '2025',
    type: 'image',
    thumbnail: '/havan_yagya_balotra_2025.jpg'
  }
];

export const GallerySection: React.FC<GalleryProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [activeCategory, setActiveCategory] = useState<'all' | 'yatra' | 'cultural' | 'havan'>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [showFullGallery, setShowFullGallery] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleScrollPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -260, behavior: 'smooth' });
    }
  };

  const handleScrollNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 260, behavior: 'smooth' });
    }
  };

  const handleTabChange = (category: 'all' | 'yatra' | 'cultural' | 'havan') => {
    setActiveCategory(category);
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const filtered = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(i => i.category === activeCategory);

  return (
    <section id="gallery" className="web-section" style={{
      background: 'linear-gradient(180deg, #FAF5ED 0%, #EFE7D8 100%)',
      borderTop: '2px solid rgba(197, 160, 89, 0.35)',
      borderBottom: '2px solid rgba(197, 160, 89, 0.35)'
    }}>
      <div className="web-container">
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div className="section-badge">
            <ImageIcon size={14} color="#C5A059" />
            <span>{lang === 'hi' ? 'विगत वर्षों की स्मृतियां' : 'Past Memories'}</span>
          </div>

          <h2 className="section-title">
            {t.galleryTitle}
          </h2>
          <div className="section-sub" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            margin: '0 auto'
          }}>
            <span>
              {lang === 'hi'
                ? 'विगत वर्षों की और अधिक स्मृतियां देखने के लिए तीर पर क्लिक करें:'
                : 'For more memories, click on the arrow or button to view full gallery:'}
            </span>
            <button
              onClick={() => setShowFullGallery(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'linear-gradient(135deg, #650015 0%, #851528 100%)',
                color: '#DFBD74',
                border: '1.2px solid #DFBD74',
                borderRadius: '20px',
                padding: '5px 15px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 3px 10px rgba(101, 0, 21, 0.25)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px) scale(1.04)';
                e.currentTarget.style.boxShadow = '0 5px 14px rgba(101, 0, 21, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 3px 10px rgba(101, 0, 21, 0.25)';
              }}
            >
              <span>{lang === 'hi' ? 'विस्तृत दीर्घा देखें' : 'View Full Gallery'}</span>
              <ArrowRight size={15} color="#DFBD74" />
            </button>
          </div>
        </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '6px',
        marginBottom: '18px',
        overflowX: 'auto',
        scrollbarWidth: 'none'
      }}>
        {[
          { id: 'all', label: lang === 'hi' ? 'सभी' : 'All' },
          { id: 'yatra', label: lang === 'hi' ? 'शोभा यात्रा' : 'Shobha Yatra' },
          { id: 'cultural', label: lang === 'hi' ? 'सांस्कृतिक' : 'Cultural' },
          { id: 'havan', label: lang === 'hi' ? 'हवन व महाआरती' : 'Havan & Aarti' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id as 'all' | 'yatra' | 'cultural' | 'havan')}
            style={{
              background: activeCategory === tab.id ? '#650015' : '#FAF6EE',
              color: activeCategory === tab.id ? '#FFFDF9' : '#5B4136',
              border: activeCategory === tab.id ? '1px solid #DFBD74' : '1px solid rgba(197, 160, 89, 0.3)',
              borderRadius: '16px',
              padding: '6px 14px',
              fontSize: '11.5px',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: activeCategory === tab.id ? '0 3px 8px rgba(101, 0, 21, 0.22)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Responsive Cards Grid / Mobile Horizontal Swipeable Slider */}
      <div className="past-memories-wrapper">
        <div className="past-memories-grid" ref={sliderRef}>
          {filtered.map(item => (
            <div
              key={item.id}
              className="past-memories-card"
              onClick={() => setActiveItem(item)}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                loading="lazy"
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(180deg, transparent 0%, rgba(54, 0, 9, 0.92) 100%)',
                padding: '24px 12px 10px',
                color: '#FFFDF9',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <span style={{
                  alignSelf: 'flex-start',
                  background: '#DFBD74',
                  color: '#4A000D',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  fontSize: '11px',
                  fontWeight: 800
                }}>
                  {item.year}
                </span>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  lineHeight: 1.35,
                  textShadow: '0 1px 4px rgba(0,0,0,0.7)'
                }}>
                  {lang === 'hi' ? item.titleHi : item.title}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Navigation Controls */}
        <div className="past-memories-mobile-controls">
          <button
            className="past-memories-nav-btn"
            onClick={handleScrollPrev}
            aria-label="Previous Photo"
            title={lang === 'hi' ? 'पिछला' : 'Previous'}
          >
            <ChevronLeft size={16} />
          </button>

          <span className="past-memories-swipe-hint">
            <span>{lang === 'hi' ? '← स्वाइप करें →' : '← Swipe to view →'}</span>
          </span>

          <button
            className="past-memories-nav-btn"
            onClick={handleScrollNext}
            aria-label="Next Photo"
            title={lang === 'hi' ? 'अगला' : 'Next'}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          onClick={() => setActiveItem(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.85)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#FAF5ED',
              borderRadius: '20px',
              overflow: 'hidden',
              maxWidth: '480px',
              width: '100%',
              border: '2px solid #C5A059'
            }}
          >
            <img
              src={activeItem.thumbnail}
              alt={activeItem.title}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            <div style={{ padding: '16px', textAlign: 'center' }}>
              <h4 style={{ color: '#650015', margin: '0 0 6px 0', fontFamily: 'var(--font-serif)' }}>
                {lang === 'hi' ? activeItem.titleHi : activeItem.title}
              </h4>
              <p style={{ fontSize: '11px', color: '#7D6A58', margin: '0 0 12px 0' }}>
                वर्ष {activeItem.year} • अग्रसेन जयंती महोत्सव
              </p>
              <button
                onClick={() => setActiveItem(null)}
                style={{
                  background: '#650015',
                  color: '#FFFDF9',
                  border: '1px solid #DFBD74',
                  borderRadius: '10px',
                  padding: '6px 18px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                बंद करें (Close)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Gallery Archive Modal (Redirect / Popup View) */}
      {showFullGallery && (
        <div
          onClick={() => setShowFullGallery(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.85)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            backdropFilter: 'blur(5px)'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#FAF5ED',
              borderRadius: '24px',
              maxWidth: '960px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              border: '2px solid #C5A059',
              boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
              padding: '24px'
            }}
          >
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1.5px solid rgba(197, 160, 89, 0.4)',
              paddingBottom: '14px',
              marginBottom: '20px'
            }}>
              <div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(101, 0, 21, 0.08)',
                  color: '#650015',
                  padding: '3px 12px',
                  borderRadius: '16px',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  marginBottom: '4px'
                }}>
                  <Sparkles size={13} color="#C5A059" />
                  <span>अग्रवाल समाज बालोतरा • ऐतिहासिक दीर्घा</span>
                </div>
                <h3 style={{
                  color: '#650015',
                  margin: 0,
                  fontSize: '22px',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 800
                }}>
                  {lang === 'hi' ? 'संपूर्ण स्मृति दीर्घा (वर्ष 2025)' : 'Complete Memories Archive (2025)'}
                </h3>
              </div>

              <button
                onClick={() => setShowFullGallery(false)}
                style={{
                  background: 'rgba(101, 0, 21, 0.1)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#650015',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Gallery Grid inside Modal */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '16px'
            }}>
              {GALLERY_ITEMS.map(item => (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  style={{
                    position: 'relative',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                    border: '1px solid rgba(197, 160, 89, 0.4)',
                    aspectRatio: '4/3',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(180deg, transparent 0%, rgba(54, 0, 9, 0.92) 100%)',
                    padding: '24px 12px 10px',
                    color: '#FFFDF9',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}>
                    <span style={{
                      alignSelf: 'flex-start',
                      background: '#DFBD74',
                      color: '#4A000D',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      fontSize: '11px',
                      fontWeight: 800
                    }}>
                      {item.year}
                    </span>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      lineHeight: 1.35,
                      textShadow: '0 1px 4px rgba(0,0,0,0.7)'
                    }}>
                      {lang === 'hi' ? item.titleHi : item.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <button
                onClick={() => setShowFullGallery(false)}
                style={{
                  background: '#650015',
                  color: '#DFBD74',
                  border: '1px solid #DFBD74',
                  borderRadius: '24px',
                  padding: '8px 24px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {lang === 'hi' ? 'वापस मुख्य पृष्ठ पर जाएं' : 'Close Gallery'}
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </section>
  );
};
