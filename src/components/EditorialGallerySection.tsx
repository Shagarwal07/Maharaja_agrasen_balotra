import React, { useState } from 'react';
import { X, Image as ImageIcon, Sparkles, LayoutGrid, Columns } from 'lucide-react';
import type { Language } from '../data/translations';

interface EditorialGalleryProps {
  lang: Language;
  onOpenFullGallery?: () => void;
}

export interface GallerySlotItem {
  id: string;
  slotNumber: number;
  slotName: string;
  category: 'all' | 'stamps' | 'agroha' | 'relics';
  titleEn: string;
  titleHi: string;
  subEn: string;
  subHi: string;
  year: string;
  aspectRatio: string;
  gradientBg: string;
  imageSrc?: string;
  badgeEn: string;
  badgeHi: string;
}

// 5 Dedicated Placeholder Slots configured for Balotra Mandir & Bhawan
export const EDITORIAL_GALLERY_SLOTS: GallerySlotItem[] = [
  {
    id: 'slot-1',
    slotNumber: 1,
    slotName: 'bottom-left',
    category: 'agroha',
    titleEn: 'Shri Agrasen Mandir - Balotra',
    titleHi: 'श्री अग्रसेन मंदिर — बालोतरा',
    subEn: 'Sanctum sanctorum and temple architecture in Balotra',
    subHi: 'बालोतरा स्थित भव्य श्री अग्रसेन मंदिर एवं गर्भगृह',
    year: 'Balotra',
    aspectRatio: '1 / 1',
    gradientBg: 'linear-gradient(135deg, #1C3048 0%, #355C7D 50%, #6C5B7B 100%)',
    imageSrc: '', // Placeholder slot ready for Balotra image
    badgeEn: 'Slot 1 • Square',
    badgeHi: 'स्थान १ • वर्गाकार'
  },
  {
    id: 'slot-2',
    slotNumber: 2,
    slotName: 'center-tall',
    category: 'stamps',
    titleEn: 'Shri Agrasen Bhavan Complex - Balotra',
    titleHi: 'श्री अग्रसेन भवन मुख्य द्वार एवं परिसर — बालोतरा',
    subEn: 'Central community hub, facade, and royal entrance archway',
    subHi: 'अग्रवाल समाज बालोतरा का मुख्य सेवा भवन एवं भव्य प्रवेश द्वार',
    year: 'Balotra',
    aspectRatio: '3 / 4.4',
    gradientBg: 'linear-gradient(180deg, #1B3B4B 0%, #295F72 40%, #A65B32 75%, #421D18 100%)',
    imageSrc: '', // Old stamp removed, ready for Balotra image
    badgeEn: 'Slot 2 • Featured Portrait',
    badgeHi: 'स्थान २ • मुख्य ऊर्ध्वाधर'
  },
  {
    id: 'slot-3',
    slotNumber: 3,
    slotName: 'center-wide',
    category: 'relics',
    titleEn: 'Grand Auditorium & Celebration Hall - Balotra',
    titleHi: 'भव्य वातानुकूलित सभागार एवं विवाह वाटिका — बालोतरा',
    subEn: 'Spacious banquet hall and community celebration center',
    subHi: 'सामाजिक, सांस्कृतिक एवं मांगलिक आयोजनों हेतु विशाल सभागार',
    year: 'Balotra',
    aspectRatio: '16 / 7.5',
    gradientBg: 'linear-gradient(135deg, #3A1C1A 0%, #5E2623 50%, #1A0D0C 100%)',
    imageSrc: '', // Placeholder slot ready for Balotra image
    badgeEn: 'Slot 3 • Wide Letterbox',
    badgeHi: 'स्थान ३ • क्षैतिज पत्र'
  },
  {
    id: 'slot-4',
    slotNumber: 4,
    slotName: 'top-right',
    category: 'stamps',
    titleEn: 'Agrawal Samaj Guest House & Seva Sadan - Balotra',
    titleHi: 'अग्रवाल अतिथि सदन एवं विश्राम गृह — बालोतरा',
    subEn: 'Comfortable guest rooms and traveler hospitality facilities',
    subHi: 'अग्र बंधुओं एवं अतिथियों हेतु सुसज्जित कक्ष व सेवा सदन',
    year: 'Balotra',
    aspectRatio: '4 / 3',
    gradientBg: 'linear-gradient(135deg, #4A4E3A 0%, #8C8058 45%, #C2A649 70%, #2A2F1E 100%)',
    imageSrc: '', // Old stamp removed, ready for Balotra image
    badgeEn: 'Slot 4 • Landscape',
    badgeHi: 'स्थान ४ • क्षैतिज'
  },
  {
    id: 'slot-5',
    slotNumber: 5,
    slotName: 'bottom-right',
    category: 'agroha',
    titleEn: 'Mata Mahalakshmi & Agrasen Darbar - Balotra',
    titleHi: 'माँ महालक्ष्मी एवं अग्रसेन जी का पावन दरबार — बालोतरा',
    subEn: 'Sacred idols, daily aarti sanctum, and spiritual aura',
    subHi: 'नित्य महाआरती, अखंड ज्योति एवं भक्तिमय देव स्वरूप',
    year: 'Balotra',
    aspectRatio: '3 / 3.8',
    gradientBg: 'linear-gradient(180deg, #8C533E 0%, #4A261A 50%, #21120D 100%)',
    imageSrc: '', // Placeholder slot ready for Balotra image
    badgeEn: 'Slot 5 • Portrait',
    badgeHi: 'स्थान ५ • ऊर्ध्वाधर'
  }
];

export const EditorialGallerySection: React.FC<EditorialGalleryProps> = ({ 
  lang, 
  onOpenFullGallery 
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'stamps' | 'agroha' | 'relics'>('all');
  const [selectedSlot, setSelectedSlot] = useState<GallerySlotItem | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'columns'>('grid');

  // Tabs matching the reference top navigation
  const TABS = [
    { id: 'all', labelEn: 'ALL PHOTOS', labelHi: 'सभी छायाचित्र' },
    { id: 'stamps', labelEn: 'AGRASEN BHAWAN', labelHi: 'अग्रसेन भवन' },
    { id: 'agroha', labelEn: 'AGRASEN MANDIR', labelHi: 'अग्रसेन मंदिर' },
    { id: 'relics', labelEn: 'BALOTRA SAMAJ', labelHi: 'बालोतरा समाज' }
  ];

  const slot1 = EDITORIAL_GALLERY_SLOTS.find(s => s.slotNumber === 1)!;
  const slot2 = EDITORIAL_GALLERY_SLOTS.find(s => s.slotNumber === 2)!;
  const slot3 = EDITORIAL_GALLERY_SLOTS.find(s => s.slotNumber === 3)!;
  const slot4 = EDITORIAL_GALLERY_SLOTS.find(s => s.slotNumber === 4)!;
  const slot5 = EDITORIAL_GALLERY_SLOTS.find(s => s.slotNumber === 5)!;

  // Render individual card placeholder or image
  const renderCardContent = (slot: GallerySlotItem) => {
    const isDimmed = activeTab !== 'all' && slot.category !== activeTab;
    const isHighlighted = activeTab !== 'all' && slot.category === activeTab;

    return (
      <div 
        className={`editorial-card slot-${slot.slotNumber} ${isDimmed ? 'is-dimmed' : ''} ${isHighlighted ? 'is-highlighted' : ''}`}
        onClick={() => setSelectedSlot(slot)}
        style={{ aspectRatio: slot.aspectRatio }}
        title={lang === 'hi' ? `${slot.titleHi} (विस्तार से देखें)` : `${slot.titleEn} (Click to view)`}
      >
        {slot.imageSrc ? (
          <img 
            src={slot.imageSrc} 
            alt={lang === 'hi' ? slot.titleHi : slot.titleEn}
            loading="lazy"
          />
        ) : (
          <div 
            className="editorial-placeholder-frame"
            style={{ background: slot.gradientBg }}
          >
            {/* Slot Placeholder Tag */}
            <div className="editorial-placeholder-badge">
              <Sparkles size={10} />
              <span>{lang === 'hi' ? slot.badgeHi : slot.badgeEn}</span>
            </div>
            <div className="editorial-placeholder-label">
              {lang === 'hi' ? slot.titleHi : slot.titleEn}
            </div>
            <div className="editorial-placeholder-sub">
              {lang === 'hi' ? 'छवि प्रतीक्षा (Placeholder Slot)' : 'Image Placeholder Ready'}
            </div>
          </div>
        )}

        {/* Bottom Text Overlay matching reference layout (e.g. Mark Gilford   2021) */}
        <div className="editorial-card-overlay">
          <span className="editorial-card-title">
            {lang === 'hi' ? slot.titleHi : slot.titleEn}
          </span>
          <span className="editorial-card-year">
            {slot.year}
          </span>
        </div>
      </div>
    );
  };

  return (
    <section id="editorial-gallery" className="editorial-gallery-section">
      <div className="web-container">
        {/* 1. Top Divider & Navigation Bar matching Calgary Art Gallery */}
        <div className="editorial-topbar">
          {/* Left Starburst Asterisk Logo Motif */}
          <div className="editorial-star-icon" title="Agroha Royal Starburst">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <line x1="12" y1="2" x2="12" y2="22" />
              <line x1="2" y1="2" x2="22" y2="12" />
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
              <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />
              <circle cx="12" cy="12" r="2.5" fill="currentColor" />
            </svg>
          </div>

          {/* Right Editorial Filter Navigation */}
          <ul className="editorial-nav-tabs">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <li key={tab.id}>
                  <button
                    className={`editorial-tab-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  >
                    {lang === 'hi' ? tab.labelHi : tab.labelEn}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mobile Header Block: Visible only on <= 840px so the full gallery view displays directly below */}
        <div className="editorial-mobile-header">
          <h2 className="editorial-headline">
            {lang === 'hi' ? (
              <>
                अग्रवाल समाज<br />
                धरोहर <span className="accent-word">दीर्घा.</span>
              </>
            ) : (
              <>
                Agrawal Samaj<br />
                Heritage <span className="accent-word">Gallery.</span>
              </>
            )}
          </h2>

          <p className="editorial-narrative">
            {lang === 'hi'
              ? 'बालोतरा स्थित श्री अग्रसेन मंदिर, समाज भवन, धर्मशाला एवं सेवा केंद्रों के प्रमुख छायाचित्र।'
              : 'Key photographs of Shri Agrasen Temple, Bhavan, Dharamshala, and community centers in Balotra.'}
          </p>

          <div className="editorial-mobile-actions">
            <button 
              className="editorial-more-link"
              onClick={onOpenFullGallery ? onOpenFullGallery : () => setSelectedSlot(slot1)}
            >
              <span>{lang === 'hi' ? 'विस्तृत दीर्घा' : 'More'}</span>
              <span className="editorial-more-line" />
            </button>

            {/* Mobile View Switcher: Grid View (Default) vs Columns Swipe */}
            <div className="editorial-view-mode-pills" role="tablist" aria-label="Gallery View Mode">
              <button 
                className={`editorial-mode-pill ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title={lang === 'hi' ? 'ग्रिड दीर्घा दृश्य' : 'Grid View'}
              >
                <LayoutGrid size={13} />
                <span>{lang === 'hi' ? 'ग्रिड' : 'Grid'}</span>
              </button>
              <button 
                className={`editorial-mode-pill ${viewMode === 'columns' ? 'active' : ''}`}
                onClick={() => setViewMode('columns')}
                title={lang === 'hi' ? 'कॉलम दीर्घा दृश्य' : 'Columns View'}
              >
                <Columns size={13} />
                <span>{lang === 'hi' ? 'कॉलम' : 'Columns'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. Main Editorial Gallery Grid (Desktop 3-Column / Mobile Responsive Gallery) */}
        <div className={`editorial-gallery-grid mode-${viewMode}`}>
          {/* Far-Left Rotated Vertical Text (e.g. Instagram Facebook Youtube) */}
          <div className="editorial-vertical-side">
            <div className="editorial-vertical-text">
              <span>{lang === 'hi' ? 'अग्रवाल समाज' : 'AGRAWAL SAMAJ'}</span>
              <span>•</span>
              <span>{lang === 'hi' ? 'बालोतरा' : 'BALOTRA'}</span>
              <span>•</span>
              <span>{lang === 'hi' ? 'पावन धरोहर' : 'SACRED HERITAGE'}</span>
            </div>
          </div>

          {/* Column 1: Big Typography Headline (Desktop) + Offset Square with Arc */}
          <div className="editorial-left-col">
            <div className="editorial-desktop-intro">
              <h2 className="editorial-headline">
                {lang === 'hi' ? (
                  <>
                    अग्रवाल समाज<br />
                    धरोहर <span className="accent-word">दीर्घा.</span>
                  </>
                ) : (
                  <>
                    Agrawal Samaj<br />
                    Heritage <span className="accent-word">Gallery.</span>
                  </>
                )}
              </h2>

              <p className="editorial-narrative">
                {lang === 'hi'
                  ? 'बालोतरा स्थित श्री अग्रसेन मंदिर, समाज भवन, धर्मशाला एवं सेवा केंद्रों के प्रमुख छायाचित्र।'
                  : 'Key photographs of Shri Agrasen Temple, Bhavan, Dharamshala, and community centers in Balotra.'}
              </p>

              {/* Interactive "More ───→" Call-to-Action Link */}
              <div>
                <button 
                  className="editorial-more-link"
                  onClick={onOpenFullGallery ? onOpenFullGallery : () => setSelectedSlot(slot1)}
                >
                  <span>{lang === 'hi' ? 'विस्तृत दीर्घा' : 'More'}</span>
                  <span className="editorial-more-line" />
                </button>
              </div>
            </div>

            {/* Bottom-Left Offset Image Container with Overlapping Terracotta Arc */}
            <div className="editorial-offset-container slot-1-container">
              {/* Overlapping Vector Arc Stroke */}
              <div className="editorial-accent-arc" />
              {renderCardContent(slot1)}
            </div>
          </div>

          {/* Column 2: Center Tall Card + Bottom Landscape Letterbox Card */}
          <div className="editorial-mid-col">
            {/* Center Tall Card (Slot 2) */}
            <div className="editorial-card-wrapper slot-2-wrapper">
              {renderCardContent(slot2)}
            </div>

            {/* Center Bottom Letterbox Card (Slot 3) */}
            <div className="editorial-card-wrapper slot-3-wrapper">
              {renderCardContent(slot3)}
            </div>
          </div>

          {/* Column 3: Top Landscape Card + Bottom Portrait Card (with ambient glow behind) */}
          <div className="editorial-right-col">
            {/* Top Right Landscape Card (Slot 4) */}
            <div className="editorial-card-wrapper slot-4-wrapper">
              {renderCardContent(slot4)}
            </div>

            {/* Bottom Right Portrait Card (Slot 5) */}
            <div className="editorial-card-wrapper slot-5-wrapper">
              {renderCardContent(slot5)}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Interactive Lightbox Modal for selected slot */}
      {selectedSlot && (
        <div 
          className="editorial-lightbox-backdrop"
          onClick={() => setSelectedSlot(null)}
        >
          <div 
            className="editorial-lightbox-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Slot Info and Close Button */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 20px',
              borderBottom: '1px solid rgba(197, 160, 89, 0.3)',
              background: '#FAF4E8'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  padding: '3px 8px',
                  background: '#C85A24',
                  color: '#FFFFFF',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 800,
                  textTransform: 'uppercase'
                }}>
                  {lang === 'hi' ? selectedSlot.badgeHi : selectedSlot.badgeEn}
                </span>
                <h3 style={{
                  margin: 0,
                  fontFamily: 'var(--font-serif)',
                  fontSize: '17px',
                  color: '#650015',
                  fontWeight: 700
                }}>
                  {lang === 'hi' ? selectedSlot.titleHi : selectedSlot.titleEn}
                </h3>
              </div>

              <button
                onClick={() => setSelectedSlot(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#650015',
                  padding: '4px'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Image or High-res Placeholder Canvas */}
            <div style={{
              maxHeight: '62vh',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#150E0C'
            }}>
              {selectedSlot.imageSrc ? (
                <img
                  src={selectedSlot.imageSrc}
                  alt={lang === 'hi' ? selectedSlot.titleHi : selectedSlot.titleEn}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '60vh',
                    objectFit: 'contain'
                  }}
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '360px',
                  background: selectedSlot.gradientBg,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFDF9',
                  padding: '30px',
                  textAlign: 'center'
                }}>
                  <ImageIcon size={48} color="#DFBD74" style={{ marginBottom: '16px' }} />
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', marginBottom: '8px' }}>
                    {lang === 'hi' ? selectedSlot.titleHi : selectedSlot.titleEn}
                  </h4>
                  <p style={{ fontSize: '14px', maxWidth: '420px', color: 'rgba(255,255,255,0.8)' }}>
                    {lang === 'hi' ? selectedSlot.subHi : selectedSlot.subEn}
                  </p>
                  <div style={{
                    marginTop: '20px',
                    padding: '8px 16px',
                    background: 'rgba(200, 90, 36, 0.3)',
                    border: '1px dashed #DFBD74',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}>
                    {lang === 'hi' 
                      ? '✦ अगले निर्देश में यहाँ अपनी छवि जोड़ें (Ready for user image)'
                      : '✦ Ready for user image replacement in next prompt'}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Caption and Year */}
            <div style={{
              padding: '16px 20px',
              background: '#FFFDF9',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid rgba(197, 160, 89, 0.2)'
            }}>
              <div>
                <p style={{ margin: 0, fontSize: '13.5px', color: '#5B4136', lineHeight: 1.4 }}>
                  {lang === 'hi' ? selectedSlot.subHi : selectedSlot.subEn}
                </p>
              </div>
              <span style={{
                fontSize: '14px',
                fontWeight: 800,
                color: '#C85A24',
                fontFamily: 'var(--font-sans)'
              }}>
                {selectedSlot.year}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
