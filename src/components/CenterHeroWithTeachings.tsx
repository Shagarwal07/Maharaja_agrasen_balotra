import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, ChevronLeft, ChevronRight, Quote, Calendar, Check } from 'lucide-react';
import type { Language } from '../data/translations';
import { TRANSLATIONS } from '../data/translations';
import { TEACHING_QUOTES } from '../data/quotes';
import { Agrasen3DViewer } from './Agrasen3DViewer';

interface CenterHeroProps {
  lang: Language;
  soundEnabled: boolean;
}

export const CenterHeroWithTeachings: React.FC<CenterHeroProps> = ({
  lang,
  soundEnabled
}) => {
  const t = TRANSLATIONS[lang];
  const [tributeCount, setTributeCount] = useState<number>(() => {
    const saved = localStorage.getItem('agrasen_tribute_count');
    return saved ? parseInt(saved, 10) : 108;
  });
  const [justOffered, setJustOffered] = useState(false);
  const [currentQuoteIdx, setCurrentQuoteIdx] = useState(0);
  const [fadeQuote, setFadeQuote] = useState(true);
  const [daysRemaining, setDaysRemaining] = useState(29);
  const [reminderSet, setReminderSet] = useState(false);
  const [showCoinCard, setShowCoinCard] = useState(false);
  const [showBrickCard, setShowBrickCard] = useState(false);

  // Dynamic Jayanti Countdown
  useEffect(() => {
    const targetDate = new Date('2026-10-11T00:00:00');
    const now = new Date();
    const diffTime = targetDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysRemaining(diffDays > 0 ? diffDays : 29);
  }, []);

  // Automated Teaching Quotes Rotation (every 5.5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setFadeQuote(false);
      setTimeout(() => {
        setCurrentQuoteIdx(prev => (prev + 1) % TEACHING_QUOTES.length);
        setFadeQuote(true);
      }, 350);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  const handleNextQuote = () => {
    setFadeQuote(false);
    setTimeout(() => {
      setCurrentQuoteIdx(prev => (prev + 1) % TEACHING_QUOTES.length);
      setFadeQuote(true);
    }, 250);
  };

  const handlePrevQuote = () => {
    setFadeQuote(false);
    setTimeout(() => {
      setCurrentQuoteIdx(prev => (prev - 1 + TEACHING_QUOTES.length) % TEACHING_QUOTES.length);
      setFadeQuote(true);
    }, 250);
  };

  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.6);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch {
      // Audio context might be restricted
    }
  };

  const handleOfferFlowers = () => {
    playChime();
    setTributeCount(prev => {
      const next = prev + 1;
      localStorage.setItem('agrasen_tribute_count', next.toString());
      return next;
    });
    setJustOffered(true);
    setTimeout(() => setJustOffered(false), 3500);

    // Marigold Petal Confetti
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.45 },
      colors: ['#FF9933', '#FFD700', '#FF4500', '#E5A93C', '#FFF275'],
      shapes: ['circle'],
      scalar: 1.3,
      gravity: 0.8
    });
  };

  const handleAddCalendar = () => {
    const title = 'Maharaja Agrasen Jayanti 2026';
    const dates = '20261011T023000Z/20261011T163000Z';
    const details = 'Agrasen Jayanti Mahotsav 2026. Shobha Yatra, Competitions, and Mahaprasad.';
    const location = 'Agroha Dham / All Samast Agrawal Samitis';
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dates}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    window.open(url, '_blank');
    setReminderSet(true);
    setTimeout(() => setReminderSet(false), 4000);
  };

  const quote = TEACHING_QUOTES[currentQuoteIdx];

  return (
    <section id="home" style={{
      background: 'linear-gradient(180deg, #FBF6EE 0%, #F5EFE4 100%)',
      paddingBottom: '50px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Hero Darshan Container */}
      <div className="web-container" style={{ paddingTop: '28px' }}>
        {/* 2. Maharaj Agrasen Animation & Center Placeholder */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative'
        }}>
          {/* Animated Sunburst Halo Rays */}
          <div style={{
            position: 'absolute',
            top: '50px',
            width: '420px',
            height: '420px',
            background: 'radial-gradient(circle, rgba(223, 189, 116, 0.35) 0%, rgba(245, 239, 228, 0) 70%)',
            borderRadius: '50%',
            zIndex: 0,
            pointerEvents: 'none'
          }} />

          {/* STITCH IMPERIAL TRIAD: Symmetrical 3-Column Layout */}
          <div className="hero-triad-grid">
            
            {/* LEFT PILLAR: The Authentic 3D Pure Silver 1-Rupee Coin */}
            <div
              className="hero-pillar hero-pillar-coin"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                zIndex: showCoinCard ? 30 : 3
              }}
              onMouseEnter={() => setShowCoinCard(true)}
              onMouseLeave={() => setShowCoinCard(false)}
              onClick={() => setShowCoinCard(prev => !prev)}
            >
              {/* Ornate Circular Pedestal */}
              <div
                className="anim-float hero-pedestal"
                style={{
                  position: 'relative',
                  width: '185px',
                  height: '185px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(240, 245, 250, 0.75) 45%, rgba(200, 215, 230, 0.3) 70%, transparent 100%)',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 16px 36px rgba(0, 0, 0, 0.08), 0 0 45px rgba(223, 189, 116, 0.15), inset 0 0 24px rgba(255, 255, 255, 0.85)',
                  cursor: 'pointer',
                  transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08) rotate(-4deg)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1) rotate(0deg)')}
                title={lang === 'hi' ? 'प्रथम स्तम्भ • एक रुपया (चांदी का सिक्का)' : '1st Pillar • 1 Rupee Silver Coin'}
              >
                <img
                  src="/silver_coin_real.png"
                  alt={lang === 'hi' ? 'एक रुपया चांदी का सिक्का' : 'Real 1 Rupee Silver Coin'}
                  style={{
                    width: '148px',
                    height: 'auto',
                    maxHeight: '150px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(-8px 14px 22px rgba(0, 0, 0, 0.38)) drop-shadow(0 2px 10px rgba(220, 225, 235, 0.6))',
                    userSelect: 'none',
                    pointerEvents: 'none'
                  }}
                />
              </div>

              {/* Decorative Pill Badge */}
              <div className="hero-pillar-badge" style={{
                marginTop: '10px',
                background: 'linear-gradient(135deg, #4A5568 0%, #1A202C 100%)',
                color: '#EDF2F7',
                border: '1px solid #CBD5E0',
                borderRadius: '20px',
                padding: '4px 14px',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                cursor: 'pointer'
              }}>
                {lang === 'hi' ? 'प्रथम स्तम्भ • एक रुपया' : '1st Pillar • 1 Rupee'}
              </div>

              {/* Principle Explanatory Card (Opens ONLY on Hover) */}
              {showCoinCard && (
                <div className="hero-pillar-card hero-coin-card" style={{
                  position: 'absolute',
                  top: 'calc(100% + 4px)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '240px',
                  background: '#FFFDF9',
                  border: '1.5px solid rgba(197, 160, 89, 0.6)',
                  borderRadius: '16px',
                  padding: '14px 16px',
                  boxShadow: '0 12px 32px rgba(101, 0, 21, 0.18)',
                  backdropFilter: 'blur(8px)',
                  textAlign: 'left',
                  zIndex: 50,
                  animation: 'fadeInCard 0.2s ease forwards'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '6px',
                    color: '#650015',
                    fontWeight: 800,
                    fontSize: '13.5px'
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#718096' }} />
                    <span>{lang === 'hi' ? 'आर्थिक स्वावलम्बन' : 'Economic Dignity'}</span>
                  </div>
                  <p style={{
                    fontSize: '13px',
                    lineHeight: 1.55,
                    color: '#5B4136',
                    margin: 0
                  }}>
                    {lang === 'hi'
                      ? 'अग्रोहा में आने वाले प्रत्येक नए परिवार को नगर का प्रत्येक नागरिक एक रुपया भेंट करता था, जिससे वह सम्मानपूर्वक अपना व्यापार स्थापित कर सके।'
                      : 'Every citizen gifted one rupee to every newly arriving family, enabling them to establish their business with self-reliance.'}
                  </p>
                </div>
              )}
            </div>

            {/* CENTER: The Crown Jewel - Maharaja Agrasen Ji 3D Darshan */}
            <div className="hero-darshan-center" style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              zIndex: 4
            }}>
              {/* Central Centered 3D Model & Interactive Darshan */}
              <div className="hero-darshan-canvas-wrap" style={{
                position: 'relative',
                width: '100%',
                maxWidth: '460px',
                height: '460px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 2
              }}>
                <Agrasen3DViewer
                  lang={lang}
                  onOfferFlowers={handleOfferFlowers}
                />
              </div>

              {/* Sacred Name & Honorific directly below Silhouette */}
              <div className="hero-darshan-title-wrap" style={{ marginTop: '10px', textAlign: 'center', width: '100%' }}>
                <h2 className="hero-maharaja-title" style={{
                  fontFamily: 'var(--font-hindi)',
                  fontSize: '28px',
                  fontWeight: 900,
                  color: '#650015',
                  margin: '0 0 2px 0',
                  letterSpacing: '0.01em',
                  textShadow: '0 2px 4px rgba(101, 0, 21, 0.15)',
                  whiteSpace: 'nowrap'
                }}>
                  {t.maharajaName}
                </h2>
                <p className="hero-maharaja-tagline" style={{
                  fontSize: '13px',
                  color: '#8C6C38',
                  fontWeight: 700,
                  fontFamily: 'var(--font-serif)',
                  margin: 0,
                  whiteSpace: 'nowrap'
                }}>
                  {t.maharajaTagline}
                </p>
              </div>

              {/* Interactive Shradhanjali Tribute Button with Sacred Love Symbol */}
              <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'center', width: '100%' }}>
                <button
                  className="hero-tribute-btn"
                  onClick={handleOfferFlowers}
                  style={{
                    background: 'linear-gradient(135deg, #7A0A1E 0%, #9E1328 100%)',
                    border: '1.5px solid #DFBD74',
                    borderRadius: '24px',
                    padding: '8px 24px',
                    color: '#FFFDF9',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(122, 10, 30, 0.35)',
                    transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.96)')}
                  onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <Heart
                    size={16}
                    color="#FF4D6D"
                    fill="#FF4D6D"
                    style={{ filter: 'drop-shadow(0 0 6px rgba(255, 77, 109, 0.8))', flexShrink: 0 }}
                  />
                  <span className="hero-tribute-label" style={{ whiteSpace: 'nowrap' }}>{t.pushpanjali}</span>
                  <span className="hero-tribute-count" style={{
                    background: 'rgba(255, 255, 255, 0.22)',
                    color: '#FFFDF9',
                    borderRadius: '12px',
                    padding: '2px 8px',
                    fontSize: '11px',
                    marginLeft: '4px',
                    fontWeight: 800,
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}>
                    {tributeCount}
                  </span>
                </button>

                {justOffered && (
                  <p style={{
                    fontSize: '12px',
                    color: '#650015',
                    marginTop: '6px',
                    fontWeight: 700
                  }}>
                    <Heart size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px', fill: '#E53E3E', color: '#E53E3E' }} />
                    {t.blessingGiven}
                  </p>
                )}
              </div>
            </div>

            {/* RIGHT PILLAR: The Authentic 3D Terracotta Construction Brick */}
            <div
              className="hero-pillar hero-pillar-brick"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                zIndex: showBrickCard ? 30 : 3
              }}
              onMouseEnter={() => setShowBrickCard(true)}
              onMouseLeave={() => setShowBrickCard(false)}
              onClick={() => setShowBrickCard(prev => !prev)}
            >
              {/* Ornate Circular Pedestal */}
              <div
                className="anim-float hero-pedestal"
                style={{
                  position: 'relative',
                  width: '185px',
                  height: '185px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255, 235, 220, 0.95) 0%, rgba(250, 220, 200, 0.75) 45%, rgba(230, 180, 150, 0.3) 70%, transparent 100%)',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 16px 36px rgba(101, 0, 21, 0.08), 0 0 45px rgba(223, 189, 116, 0.15), inset 0 0 24px rgba(255, 255, 255, 0.85)',
                  cursor: 'pointer',
                  animationDelay: '1.2s',
                  transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08) rotate(4deg)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1) rotate(0deg)')}
                title={lang === 'hi' ? 'द्वितीय स्तम्भ • एक ईंट' : '2nd Pillar • 1 Brick'}
              >
                <img
                  src="/real_brick.png"
                  alt={lang === 'hi' ? 'वास्तविक अग्रोहा ईंट' : 'Real Agroha Brick'}
                  style={{
                    width: '158px',
                    height: 'auto',
                    maxHeight: '135px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(8px 16px 24px rgba(101, 0, 21, 0.35)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.22))',
                    userSelect: 'none',
                    pointerEvents: 'none'
                  }}
                />
              </div>

              {/* Decorative Pill Badge */}
              <div className="hero-pillar-badge" style={{
                marginTop: '10px',
                background: 'linear-gradient(135deg, #9C4221 0%, #631D08 100%)',
                color: '#FFECD1',
                border: '1px solid #E28461',
                borderRadius: '20px',
                padding: '4px 14px',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                boxShadow: '0 4px 12px rgba(101,0,21,0.2)',
                cursor: 'pointer'
              }}>
                {lang === 'hi' ? 'द्वितीय स्तम्भ • एक ईंट' : '2nd Pillar • 1 Brick'}
              </div>

              {/* Principle Explanatory Card (Opens ONLY on Hover) */}
              {showBrickCard && (
                <div className="hero-pillar-card hero-brick-card" style={{
                  position: 'absolute',
                  top: 'calc(100% + 4px)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '240px',
                  background: '#FFFDF9',
                  border: '1.5px solid rgba(197, 160, 89, 0.6)',
                  borderRadius: '16px',
                  padding: '14px 16px',
                  boxShadow: '0 12px 32px rgba(101, 0, 21, 0.18)',
                  backdropFilter: 'blur(8px)',
                  textAlign: 'left',
                  zIndex: 50,
                  animation: 'fadeInCard 0.2s ease forwards'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '6px',
                    color: '#9C4221',
                    fontWeight: 800,
                    fontSize: '13.5px'
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C5522D' }} />
                    <span>{lang === 'hi' ? 'सामाजिक सुरक्षा व आश्रय' : 'Social Shelter'}</span>
                  </div>
                  <p style={{
                    fontSize: '13px',
                    lineHeight: 1.55,
                    color: '#5B4136',
                    margin: 0
                  }}>
                    {lang === 'hi'
                      ? 'राज्य का प्रत्येक नागरिक नवागंतुक को एक ईंट प्रदान करता था, ताकि वह अपनी गृहस्थी हेतु सुदृढ़ भवन निर्माण कर समाज का सम्मानित अंग बन सके।'
                      : 'Every resident gave one brick so the newly arriving family could build their family home and dwell with security.'}
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Countdown Pill to Jayanti */}
          <div className="hero-countdown-pill" style={{
            marginTop: '18px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: '#FFFDF9',
            border: '1.5px solid #C5A059',
            borderRadius: '24px',
            padding: '8px 20px',
            boxShadow: '0 4px 14px rgba(101, 0, 21, 0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontSize: '20px', fontWeight: 900, color: '#650015', fontFamily: 'var(--font-serif)' }}>
                {daysRemaining}
              </span>
              <span style={{ fontSize: '13px', color: '#9C782F', fontWeight: 600 }}>
                {t.countdownDays}
              </span>
            </div>
            <div style={{ width: '1px', height: '18px', background: '#C5A059' }} />
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#650015' }}>
              11 अक्टूबर 2026 (11 OCT 2026)
            </span>
            <button
              onClick={handleAddCalendar}
              title="Add to Google Calendar"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#9C782F',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                fontWeight: 700
              }}
            >
              {reminderSet ? <Check size={14} color="#1B7F3E" /> : <Calendar size={14} />}
              <span>{reminderSet ? 'Added' : 'Add to Calendar'}</span>
            </button>
          </div>
        </div>

        {/* 2. Royal Curve Type Design Directly Hosting the Rotating Thought */}
        <div className="hero-curve-banner" style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #580012 0%, #680016 60%, #46000B 100%)',
        textAlign: 'center'
      }}>
          <div style={{
            maxWidth: '840px',
            margin: '0 auto',
            padding: '0 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '140px'
          }}>
            {/* Top theme tag & controls */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(223, 189, 116, 0.4)',
                color: '#DFBD74',
                borderRadius: '16px',
                padding: '3px 12px',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}>
                <Quote size={12} />
                <span>{lang === 'hi' ? quote.themeHi : quote.themeEn}</span>
              </div>

              {/* Prev / Next controls */}
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={handlePrevQuote}
                  aria-label="Previous Thought"
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.12)',
                    border: '1px solid rgba(223, 189, 116, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#DFBD74'
                  }}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={handleNextQuote}
                  aria-label="Next Thought"
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.12)',
                    border: '1px solid rgba(223, 189, 116, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#DFBD74'
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* The Thought Content directly in the curve */}
            <div style={{
              opacity: fadeQuote ? 1 : 0,
              transform: fadeQuote ? 'translateY(0)' : 'translateY(6px)',
              transition: 'all 0.35s ease-in-out'
            }}>
              <blockquote style={{
                fontSize: '20px',
                lineHeight: 1.6,
                color: '#FFFDF9',
                fontFamily: 'var(--font-serif)',
                fontWeight: 600,
                fontStyle: 'italic',
                margin: '0 0 8px 0',
                textShadow: '0 2px 8px rgba(0,0,0,0.4)'
              }}>
                "{lang === 'hi' ? quote.quoteHi : quote.quoteEn}"
              </blockquote>

              <div style={{
                fontSize: '12px',
                color: '#DFBD74',
                fontWeight: 600
              }}>
                — {lang === 'hi' ? quote.contextHi : quote.contextEn}
              </div>
            </div>

            {/* Dots Indicator */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '6px',
              marginTop: '14px'
            }}>
              {TEACHING_QUOTES.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setFadeQuote(false);
                    setTimeout(() => {
                      setCurrentQuoteIdx(idx);
                      setFadeQuote(true);
                    }, 200);
                  }}
                  style={{
                    width: currentQuoteIdx === idx ? '22px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    background: currentQuoteIdx === idx ? '#DFBD74' : 'rgba(223, 189, 116, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
