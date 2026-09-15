import React, { useState, useEffect, useRef } from 'react';
import { Compass, BookOpen, ArrowRight, Crown, Scroll, ChevronDown, ChevronUp } from 'lucide-react';
import type { Language } from '../data/translations';
import { TRANSLATIONS } from '../data/translations';
import type { TimelineNode } from '../data/timeline';
import { TIMELINE_DATA } from '../data/timeline';

interface TimelineMapProps {
  lang: Language;
  onNavigate?: (page: 'home' | 'mahotsav' | 'history', targetId?: string) => void;
}

export const TimelineMap: React.FC<TimelineMapProps> = ({ lang, onNavigate }) => {
  const t = TRANSLATIONS[lang];
  const [activeNode, setActiveNode] = useState<TimelineNode>(TIMELINE_DATA[0]);

  // Dynamic Scroll Expansion Refs & State
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const INITIAL_HEIGHT = 420; // Compact partially-rolled height showing Decree + 1st Milestone
  const [currentHeight, setCurrentHeight] = useState<number>(INITIAL_HEIGHT);
  const [totalHeight, setTotalHeight] = useState<number>(1450);
  const [isFullyExpanded, setIsFullyExpanded] = useState<boolean>(false);

  // Measure natural full content height
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const fullH = canvasRef.current.scrollHeight;
        if (fullH > 500) {
          setTotalHeight(fullH);
        }
      }
    };
    updateDimensions();
    const timer = setTimeout(updateDimensions, 250);
    window.addEventListener('resize', updateDimensions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Automatically close the chronicle when scrolling away to another section or navigating
  useEffect(() => {
    if (!isFullyExpanded) return;

    const sectionEl = document.getElementById('timeline');
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When the timeline section moves out of the viewport (user scrolled to another section)
          if (!entry.isIntersecting) {
            setIsFullyExpanded(false);
            setCurrentHeight(INITIAL_HEIGHT);
          }
        });
      },
      {
        threshold: 0
      }
    );

    observer.observe(sectionEl);

    const handleNavChange = () => {
      setIsFullyExpanded(false);
      setCurrentHeight(INITIAL_HEIGHT);
    };

    window.addEventListener('hashchange', handleNavChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', handleNavChange);
    };
  }, [isFullyExpanded, INITIAL_HEIGHT]);

  const toggleExpand = () => {
    if (isFullyExpanded) {
      setIsFullyExpanded(false);
      setCurrentHeight(INITIAL_HEIGHT);
      if (scrollWrapperRef.current) {
        scrollWrapperRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      setIsFullyExpanded(true);
      setCurrentHeight(totalHeight);
    }
  };

  const handleCardClick = (node: TimelineNode) => {
    setActiveNode(node);
    if (onNavigate) {
      onNavigate('history', node.id);
    } else {
      window.location.hash = `#${node.id}`;
    }
  };

  return (
    <section id="timeline" className="web-section" style={{
      background: '#FFFDF9',
      borderTop: '2px solid rgba(197, 160, 89, 0.35)',
      borderBottom: '2px solid rgba(197, 160, 89, 0.35)'
    }}>
      <div className="web-container">
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div className="section-badge">
            <Compass size={14} color="#C5A059" />
            <span>{lang === 'hi' ? 'इतिहास व देशांतर' : 'History & Migration'}</span>
          </div>

          <h2 className="section-title">
            {t.timelineTitle}
          </h2>
          <p className="section-sub">
            {t.timelineSub}
          </p>
        </div>

        {/* Small Arrow Expand / Collapse Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '18px' }}>
          <button
            onClick={toggleExpand}
            className={`parchment-arrow-toggle-btn ${isFullyExpanded ? 'expanded' : ''}`}
            title={isFullyExpanded 
              ? (lang === 'hi' ? 'राजपत्र समेटें (Roll Up)' : 'Roll Up Chronicle') 
              : (lang === 'hi' ? 'राजपत्र विस्तार करें (Expand)' : 'Expand Chronicle')}
            aria-label={isFullyExpanded ? 'Collapse Chronicle' : 'Expand Chronicle'}
          >
            {isFullyExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        {/* Royal Ancient Parchment Scroll System (शाही राजपत्र / ताम्रपत्र स्क्रॉल) */}
        <div ref={scrollWrapperRef} className="royal-scroll-wrapper">
          {/* Top Roller Spindle Assembly */}
          <div className="scroll-roller-assembly">
            <div className="scroll-roller-bar">
              {/* Left 3D Turned Finial */}
              <div className="scroll-finial scroll-finial-left">
                <div className="scroll-finial-tip" />
                <div className="scroll-finial-knob">✦</div>
                <div className="scroll-finial-ring" />
              </div>

              {/* Center Royal Seal & Silk Ribbons */}
              <div className="scroll-center-seal">
                <div className="scroll-seal-disc">
                  <Crown size={16} color="#49000D" />
                </div>
                <div className="scroll-seal-ribbons">
                  <div className="scroll-ribbon-tail" />
                  <div className="scroll-ribbon-tail" />
                </div>
              </div>

              {/* Right 3D Turned Finial */}
              <div className="scroll-finial scroll-finial-right">
                <div className="scroll-finial-ring" />
                <div className="scroll-finial-knob">✦</div>
                <div className="scroll-finial-tip" />
              </div>
            </div>

            {/* Top Parchment Curl Lip */}
            <div className="scroll-curl-lip-top" />
          </div>

          {/* Main Royal Parchment Canvas with Dynamic Unroll Expansion */}
          <div 
            ref={canvasRef}
            className={`royal-parchment-canvas dynamic-unroll ${isFullyExpanded ? 'fully-expanded' : ''}`}
            style={{
              maxHeight: isFullyExpanded ? 'none' : `${currentHeight}px`
            }}
          >
            {/* 4 Corner Royal Filigree Flourishes */}
            <div className="scroll-corner-ornament scroll-corner-tl">⚜️</div>
            <div className="scroll-corner-ornament scroll-corner-tr">⚜️</div>
            <div className="scroll-corner-ornament scroll-corner-bl">⚜️</div>
            <div className="scroll-corner-ornament scroll-corner-br">⚜️</div>

            {/* Royal Patriarch Banner Card */}
            <div style={{
              background: 'linear-gradient(135deg, #FAF4E8 0%, #F5EAE0 100%)',
              borderRadius: '16px',
              padding: '16px 20px',
              border: '1px solid rgba(197, 160, 89, 0.45)',
              boxShadow: '0 3px 12px rgba(101, 0, 21, 0.04)',
              marginBottom: '28px',
              textAlign: 'center'
            }}>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(14.5px, 1.4vw, 17px)',
                fontWeight: 700,
                color: '#650015',
                margin: 0,
                lineHeight: 1.5,
                letterSpacing: '0.2px'
              }}>
                {lang === 'hi'
                  ? 'महाराजा अग्रसेन — अग्रोहा के प्रतापी संस्थापक-नरेश एवं अग्रवाल समाज के पूज्य आदिपुरुष।'
                  : 'Maharaja Agrasen — the legendary founder-king of Agroha and revered forefather of the Agrawal community.'}
              </p>
            </div>

            {/* Vertical Timeline Nodes */}
            <div style={{ position: 'relative', paddingLeft: '24px' }}>
              {/* Timeline spine line */}
              <div style={{
                position: 'absolute',
                left: '11px',
                top: '12px',
                bottom: '20px',
                width: '2px',
                background: 'linear-gradient(180deg, #650015 0%, #C5A059 100%)'
              }} />

              {TIMELINE_DATA.map((node) => {
                const isActive = activeNode.id === node.id;
                return (
                  <div
                    key={node.id}
                    onClick={() => handleCardClick(node)}
                    title={lang === 'hi' ? 'विस्तार से इतिहास पढ़ने के लिए क्लिक करें' : 'Click for complete history details'}
                    style={{
                      marginBottom: '18px',
                      position: 'relative',
                      cursor: 'pointer'
                    }}
                  >
                    {/* Bullet node */}
                    <div style={{
                      position: 'absolute',
                      left: '-24px',
                      top: '4px',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: isActive ? '#650015' : '#FFFDF9',
                      border: '2px solid #C5A059',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      transition: 'all 0.2s ease'
                    }}>
                      {node.icon}
                    </div>

                    {/* Node Card with interactive hover effects */}
                    <div 
                      className="timeline-card-interactive"
                      style={{
                        background: isActive ? 'linear-gradient(135deg, #FFF8ED 0%, #F5EAE0 100%)' : '#FAF6EE',
                        border: isActive ? '1.5px solid #C5A059' : '1px solid rgba(197, 160, 89, 0.35)',
                        borderRadius: '16px',
                        padding: '14px 18px',
                        boxShadow: isActive ? '0 6px 18px rgba(101, 0, 21, 0.1)' : '0 2px 6px rgba(0,0,0,0.02)',
                        transition: 'all 0.25s cubic-bezier(0.2, 0, 0, 1)',
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateX(4px) translateY(-2px)';
                        e.currentTarget.style.borderColor = '#C5A059';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(207, 162, 51, 0.2)';
                        e.currentTarget.style.background = '#FFFDF9';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateX(0) translateY(0)';
                        e.currentTarget.style.borderColor = isActive ? '#C5A059' : 'rgba(197, 160, 89, 0.35)';
                        e.currentTarget.style.boxShadow = isActive ? '0 6px 18px rgba(101, 0, 21, 0.1)' : '0 2px 6px rgba(0,0,0,0.02)';
                        e.currentTarget.style.background = isActive ? 'linear-gradient(135deg, #FFF8ED 0%, #F5EAE0 100%)' : '#FAF6EE';
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#9C782F', textTransform: 'uppercase' }}>
                          {node.yearEra}
                        </span>
                        <span style={{ fontSize: '12px', color: '#7D6A58' }}>
                          📍 {lang === 'hi' ? node.locationHi : node.locationEn}
                        </span>
                      </div>

                      <h3 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '16px',
                        fontWeight: 700,
                        color: '#650015',
                        margin: '0 0 6px 0'
                      }}>
                        {lang === 'hi' ? node.titleHi : node.titleEn}
                      </h3>

                      <p style={{ fontSize: '13px', color: '#5B4136', lineHeight: 1.55, margin: '0 0 10px 0' }}>
                        {lang === 'hi' ? node.detailsHi : node.detailsEn}
                      </p>

                      {/* National & International Commemorative Stamps Highlight */}
                      {node.id === 'tl-06' && (
                        <div style={{
                          background: 'rgba(255, 253, 249, 0.95)',
                          border: '1.2px dashed #C5A059',
                          borderRadius: '12px',
                          padding: '10px 12px',
                          marginBottom: '10px'
                        }}>
                          <div style={{
                            fontSize: '10.5px',
                            fontWeight: 800,
                            color: '#8D6409',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            marginBottom: '6px'
                          }}>
                            📮 {lang === 'hi' ? 'राष्ट्रीय एवं अंतरराष्ट्रीय स्मारक डाक टिकट' : 'National & International Stamps'}
                          </div>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            {/* India 1976 */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1 }}>
                              <img
                                src="/agrasen_stamp_1976.png"
                                alt="1976 India Stamp"
                                style={{
                                  width: '38px',
                                  height: 'auto',
                                  borderRadius: '3px',
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.12)',
                                  flexShrink: 0
                                }}
                              />
                              <div style={{ fontSize: '11px', color: '#650015', lineHeight: 1.25 }}>
                                <strong style={{ display: 'block', color: '#650015' }}>🇮🇳 1976 भारत</strong>
                                <span style={{ fontSize: '10px', color: '#7D6A58' }}>25 पैसे (5100वीं जयंती)</span>
                              </div>
                            </div>

                            <div style={{ width: '1px', height: '32px', background: 'rgba(197, 160, 89, 0.35)' }} />

                            {/* Maldives 2016 */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1 }}>
                              <img
                                src="/agrasen_stamp_maldives_2016.png"
                                alt="2016 Maldives Stamp"
                                style={{
                                  width: '34px',
                                  height: 'auto',
                                  borderRadius: '3px',
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.12)',
                                  flexShrink: 0
                                }}
                              />
                              <div style={{ fontSize: '11px', color: '#650015', lineHeight: 1.25 }}>
                                <strong style={{ display: 'block', color: '#650015' }}>🇲🇻 2016 मालदीव</strong>
                                <span style={{ fontSize: '10px', color: '#7D6A58' }}>MRV 70 (जयंती उत्सव)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Click for More Details Indicator */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '4px',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#8D6409'
                      }}>
                        <span>{lang === 'hi' ? 'विस्तार से पढ़ें' : 'Read Full History'}</span>
                        <ArrowRight size={13} />
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Ghost continuation node trailing into the blur */}
              <div style={{
                position: 'relative',
                opacity: 0.35,
                filter: 'blur(1.5px)',
                padding: '14px 18px',
                border: '1.2px dashed rgba(197, 160, 89, 0.45)',
                borderRadius: '16px',
                background: 'rgba(255, 253, 249, 0.5)',
                marginBottom: '10px',
                pointerEvents: 'none'
              }}>
                <div style={{
                  position: 'absolute',
                  left: '-24px',
                  top: '12px',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#FFFDF9',
                  border: '2px dashed #C5A059',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  color: '#8D6409'
                }}>
                  ✦
                </div>
                <div style={{ height: '14px', width: '38%', background: 'rgba(197, 160, 89, 0.28)', borderRadius: '4px', marginBottom: '8px' }} />
                <div style={{ height: '10px', width: '80%', background: 'rgba(101, 0, 21, 0.14)', borderRadius: '4px' }} />
              </div>
            </div>

            {/* Infinite Story Fade & Frosted Blur Veil Overlay */}
            <div style={{
              position: 'relative',
              marginTop: '-120px',
              paddingTop: '64px',
              paddingBottom: '20px',
              background: 'linear-gradient(180deg, rgba(250, 243, 227, 0) 0%, rgba(250, 243, 227, 0.65) 25%, rgba(250, 243, 227, 0.96) 65%, #FAF3E3 100%)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              textAlign: 'center'
            }}>
              <button
                onClick={() => onNavigate ? onNavigate('history') : (window.location.hash = '#history')}
                style={{
                  background: 'linear-gradient(135deg, #650015 0%, #8b263e 100%)',
                  color: '#FFE17D',
                  border: '1.5px solid #C5A059',
                  borderRadius: '26px',
                  padding: '13px 30px',
                  fontSize: '15px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 8px 26px rgba(101, 0, 21, 0.3)',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(101, 0, 21, 0.42)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 26px rgba(101, 0, 21, 0.3)';
                }}
              >
                <BookOpen size={18} />
                <span>
                  {lang === 'hi' 
                    ? 'महाराजा अग्रसेन जी का इतिहास व जीवन गाथा पढ़ें →' 
                    : 'Explore History & Life Saga of Maharaja Agrasen →'}
                </span>
              </button>
            </div>

            {/* Dynamic Scroll Unroll Arrow Hint (Visible until fully unrolled) */}
            {!isFullyExpanded && (
              <div className="scroll-unroll-hint" style={{ pointerEvents: 'auto' }}>
                <button
                  onClick={toggleExpand}
                  className="parchment-arrow-toggle-btn"
                  title={lang === 'hi' ? 'राजपत्र विस्तार करें (Expand)' : 'Expand Chronicle'}
                  aria-label="Expand Chronicle"
                >
                  <ChevronDown size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Bottom Roller Spindle Assembly */}
          <div className="scroll-roller-assembly">
            {/* Bottom Parchment Curl Lip */}
            <div className="scroll-curl-lip-bottom" />

            <div className="scroll-roller-bar">
              {/* Left Finial */}
              <div className="scroll-finial scroll-finial-left">
                <div className="scroll-finial-tip" />
                <div className="scroll-finial-knob">✦</div>
                <div className="scroll-finial-ring" />
              </div>

              {/* Center Royal Seal */}
              <div className="scroll-center-seal">
                <div className="scroll-seal-disc" style={{ width: '26px', height: '26px' }}>
                  <Scroll size={13} color="#49000D" />
                </div>
              </div>

              {/* Right Finial */}
              <div className="scroll-finial scroll-finial-right">
                <div className="scroll-finial-ring" />
                <div className="scroll-finial-knob">✦</div>
                <div className="scroll-finial-tip" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

