import React, { useState } from 'react';
import { Menu, X, Languages, Volume2, VolumeX, Flame } from 'lucide-react';
import type { Language } from '../data/translations';
import { TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenAarti: () => void;
  onOpenRegister?: () => void;
  onOpenEBook?: () => void;
  currentPage?: 'home' | 'mahotsav' | 'history' | 'donation';
  onNavigate?: (page: 'home' | 'mahotsav' | 'history' | 'donation', targetId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  soundEnabled,
  onToggleSound,
  onOpenAarti,
  onOpenEBook,
  currentPage = 'home',
  onNavigate
}) => {
  const t = TRANSLATIONS[lang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: lang === 'hi' ? 'होम' : 'Home', isEBook: false },
    { href: '#karyakarni', label: lang === 'hi' ? 'कार्यकारिणी' : 'Karyakarni', isEBook: false },
    { href: '#mahotsav', label: lang === 'hi' ? 'अग्रसेन जयंती महोत्सव' : 'Agarsen Jayanti Mahotsav', isEBook: false },
    { href: '#ebook', label: lang === 'hi' ? 'ई-बुक' : 'E Book', isEBook: true },
    { href: '#gallery', label: lang === 'hi' ? 'स्मृतियां' : 'Memories', isEBook: false },
    { href: '#history', label: lang === 'hi' ? 'इतिहास' : 'History', isEBook: false },
    { href: '#about-samaj', label: lang === 'hi' ? 'हमारे बारे में' : 'About Us', isEBook: false }
  ];

  const handleLinkClick = (e?: React.MouseEvent<HTMLAnchorElement>, href?: string, isEBook?: boolean) => {
    if (isEBook) {
      e?.preventDefault();
      onOpenEBook?.();
    } else if (href === '#history') {
      e?.preventDefault();
      onNavigate?.('history');
    } else if (href === '#karyakarni') {
      e?.preventDefault();
      onNavigate?.('mahotsav', 'karyakarni');
    } else if (href === '#mahotsav') {
      e?.preventDefault();
      onNavigate?.('mahotsav');
    } else if (href === '#home') {
      e?.preventDefault();
      onNavigate?.('home');
    } else if (href && href.startsWith('#')) {
      if (currentPage !== 'home') {
        e?.preventDefault();
        onNavigate?.('home', href);
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 4px 20px rgba(70, 0, 15, 0.25)'
    }}>
      {/* 1. Top Sacred Mantra & Live Ticker Strip */}
      <div style={{
        background: 'linear-gradient(90deg, #4A000D 0%, #680016 50%, #4A000D 100%)',
        color: '#DFBD74',
        padding: '8px 20px',
        fontSize: '13px',
        fontWeight: 600,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(223, 189, 116, 0.35)',
        fontFamily: 'var(--font-serif)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#FFF' }}>{t.mantra}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            background: '#851528',
            color: '#FFF',
            padding: '3px 10px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: lang === 'hi' ? 'normal' : '0.02em'
          }}>
            {lang === 'hi' ? '11 अक्टूबर 2026' : '11 October 2026'}
          </span>
          <span className="hide-mobile" style={{ color: '#E5DAC6', fontSize: '13px' }}>
            {t.liveNotice}
          </span>
        </div>
      </div>

      {/* 2. Main Desktop / Tablet Navbar */}
      <nav style={{
        background: '#650015',
        borderBottom: '2px solid #C5A059',
        padding: '10px 0'
      }}>
        <div className="navbar-inner-container" style={{
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px'
        }}>
          {/* Brand Logo & Name */}
          <a
            href="#home"
            className="navbar-brand-divider"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              color: '#FFFDF9',
              flexShrink: 0,
              paddingRight: '16px',
              borderRight: '1px solid rgba(223, 189, 116, 0.3)'
            }}
          >
            <div className="navbar-brand-logo" style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #FFE17D 20%, #D4AF37 70%, #9C782F 100%)',
              border: '2px solid #FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 12px rgba(223, 189, 116, 0.5)',
              overflow: 'hidden',
              flexShrink: 0
            }}>
              <img
                src="/maharaja_agrasen.png"
                alt="Maharaja Agrasen Ji"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 12%'
                }}
              />
            </div>
            <div>
              <div className="navbar-brand-title" style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '20px',
                fontWeight: 800,
                letterSpacing: '0.01em',
                lineHeight: 1.15,
                color: '#FFFDF9',
                whiteSpace: 'nowrap'
              }}>
                {t.appTitle}
              </div>
              <div className="navbar-brand-sub" style={{
                fontSize: '12.5px',
                color: '#DFBD74',
                fontFamily: 'var(--font-hindi)',
                fontWeight: 600,
                whiteSpace: 'nowrap'
              }}>
                {t.appSubTitle}
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links (Centered with balanced spacing) */}
          <div className="hide-mobile navbar-nav-links" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(14px, 1.4vw, 22px)',
            flex: 1,
            margin: '0 16px',
            flexWrap: 'nowrap'
          }}>
            {navLinks.map((link, idx) => {
              const isActive = (link.href === '#home' && currentPage === 'home') ||
                               (link.href === '#mahotsav' && currentPage === 'mahotsav') ||
                               (link.href === '#history' && currentPage === 'history');
              return (
                <a
                  key={idx}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href, link.isEBook)}
                  className="nav-link-item"
                  style={{
                    color: isActive ? '#DFBD74' : '#FAF5ED',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: isActive ? 800 : 600,
                    letterSpacing: '0.01em',
                    transition: 'all 0.2s ease',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    backgroundColor: isActive ? 'rgba(223, 189, 116, 0.15)' : 'transparent',
                    borderBottom: isActive ? '2px solid #DFBD74' : '2px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#DFBD74';
                      e.currentTarget.style.backgroundColor = 'rgba(223, 189, 116, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#FAF5ED';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Action Utilities: Aarti, Sound, Language, Download App */}
          <div
            className="navbar-actions-divider"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexShrink: 0,
              paddingLeft: '14px',
              borderLeft: '1px solid rgba(223, 189, 116, 0.25)'
            }}
          >
            {/* Daily Aarti Button */}
            <button
              onClick={onOpenAarti}
              title={lang === 'hi' ? 'दैनिक अग्रसेन आरती' : 'Daily Agrasen Aarti'}
              className="hide-on-mobile"
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(223, 189, 116, 0.45)',
                borderRadius: '20px',
                padding: '7px 14px',
                color: '#DFBD74',
                fontSize: '13.5px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(223, 189, 116, 0.2)';
                e.currentTarget.style.color = '#FFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.color = '#DFBD74';
              }}
            >
              <Flame size={14} color="#DFBD74" />
              <span>{lang === 'hi' ? 'आरती' : 'Aarti'}</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={onToggleSound}
              title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
              className="hide-on-mobile"
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(223, 189, 116, 0.45)',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#DFBD74',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(223, 189, 116, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
              }}
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Language Switcher */}
            <button
              onClick={onToggleLang}
              title={lang === 'hi' ? 'Switch to English' : 'हिंदी में बदलें'}
              style={{
                background: 'rgba(255, 255, 255, 0.14)',
                border: '1px solid rgba(223, 189, 116, 0.5)',
                borderRadius: '20px',
                padding: '6px 12px',
                color: '#FFFDF9',
                fontSize: '13px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(223, 189, 116, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.14)';
              }}
            >
              <Languages size={14} color="#FFE17D" />
              <span>{lang === 'hi' ? 'EN' : 'हिंदी'}</span>
            </button>

            {/* Direct Play Store App Download Button */}
            <a
              href="https://play.google.com/store/apps/details?id=com.agrasenjayanti.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hide-on-mobile"
              title={lang === 'hi' ? 'गूगल प्ले स्टोर से ऐप डाउनलोड करें' : 'Download on Google Play'}
              style={{
                background: 'linear-gradient(135deg, #DFBD74 0%, #C5A059 100%)',
                color: '#49000D',
                border: '1px solid #FFF',
                borderRadius: '20px',
                padding: '7px 16px',
                fontSize: '13.5px',
                fontWeight: 800,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(223, 189, 116, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 0 1-.22-.303V2.117c.07-.11.144-.212.22-.303zm11.605 11.608l2.584 2.584-12.052 6.887 9.468-9.471zm0-2.844L5.746 1.107l12.052 6.887-2.584 2.584zm1.422 1.422l3.498 1.999c1.155.66 1.155 1.742 0 2.402l-3.498 1.999-2.01-2.01 2.01-2.01z"/>
              </svg>
              <span>{lang === 'hi' ? 'ऐप डाउनलोड' : 'Download App'}</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              className="show-mobile"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Toggle Navigation Menu"
              style={{
                background: 'rgba(255, 255, 255, 0.14)',
                border: '1px solid rgba(223, 189, 116, 0.5)',
                borderRadius: '8px',
                width: '38px',
                height: '38px',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFE17D',
                cursor: 'pointer'
              }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Full-Feature Drawer Menu */}
        {mobileMenuOpen && (
          <div style={{
            background: 'linear-gradient(180deg, #42000B 0%, #2A0007 100%)',
            borderTop: '1px solid rgba(223, 189, 116, 0.35)',
            borderBottom: '2px solid #C5A059',
            padding: '18px 20px 24px 20px',
            marginTop: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            boxShadow: '0 16px 36px rgba(0,0,0,0.5)'
          }}>
            {/* Quick Action Utilities Row in Mobile Drawer */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              paddingBottom: '14px',
              borderBottom: '1px solid rgba(223, 189, 116, 0.25)',
              flexWrap: 'wrap'
            }}>
              {/* Daily Aarti Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAarti();
                }}
                style={{
                  flex: '1 1 auto',
                  background: 'rgba(223, 189, 116, 0.15)',
                  border: '1px solid #DFBD74',
                  borderRadius: '20px',
                  padding: '8px 14px',
                  color: '#FFE17D',
                  fontSize: '13px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <Flame size={15} color="#FF7A00" />
                <span>{lang === 'hi' ? 'दैनिक आरती' : 'Daily Aarti'}</span>
              </button>

              {/* Sound Toggle */}
              <button
                onClick={onToggleSound}
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(223, 189, 116, 0.45)',
                  borderRadius: '20px',
                  padding: '8px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#DFBD74',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                <span>{soundEnabled ? (lang === 'hi' ? 'ध्वनि चालू' : 'Sound On') : (lang === 'hi' ? 'ध्वनि मूक' : 'Muted')}</span>
              </button>

              {/* App Download Link */}
              <a
                href="https://play.google.com/store/apps/details?id=com.agrasenjayanti.app"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #DFBD74 0%, #C5A059 100%)',
                  color: '#49000D',
                  border: '1px solid #FFF',
                  borderRadius: '20px',
                  padding: '10px 16px',
                  fontSize: '13.5px',
                  fontWeight: 800,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.3)'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 0 1-.22-.303V2.117c.07-.11.144-.212.22-.303zm11.605 11.608l2.584 2.584-12.052 6.887 9.468-9.471zm0-2.844L5.746 1.107l12.052 6.887-2.584 2.584zm1.422 1.422l3.498 1.999c1.155.66 1.155 1.742 0 2.402l-3.498 1.999-2.01-2.01 2.01-2.01z"/>
                </svg>
                <span>{lang === 'hi' ? 'गूगल प्ले स्टोर से ऐप डाउनलोड करें' : 'Download Android App'}</span>
              </a>
            </div>

            {/* Nav Links */}
            {navLinks.map((link, idx) => {
              const isActive = (link.href === '#home' && currentPage === 'home') ||
                               (link.href === '#mahotsav' && currentPage === 'mahotsav') ||
                               (link.href === '#history' && currentPage === 'history');
              return (
                <a
                  key={idx}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href, link.isEBook)}
                  style={{
                    color: isActive ? '#FFE17D' : '#FAF5ED',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: isActive ? 800 : 600,
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: isActive ? 'rgba(223, 189, 116, 0.16)' : 'transparent',
                    borderLeft: isActive ? '3px solid #FFE17D' : '3px solid transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{link.label}</span>
                  <span style={{ color: '#DFBD74', opacity: 0.6 }}>→</span>
                </a>
              );
            })}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 1140px) {
          .hide-mobile {
            display: none !important;
          }
          .show-mobile {
            display: flex !important;
          }
          .navbar-brand-divider {
            border-right: none !important;
            padding-right: 0 !important;
          }
          .navbar-actions-divider {
            border-left: none !important;
            padding-left: 0 !important;
          }
        }
        @media (max-width: 768px) {
          .hide-on-mobile {
            display: none !important;
          }
          .navbar-brand-title {
            font-size: 17px !important;
          }
          .navbar-brand-sub {
            font-size: 11px !important;
          }
        }
        @media (max-width: 420px) {
          .navbar-brand-title {
            font-size: 15.5px !important;
          }
          .navbar-brand-sub {
            font-size: 10px !important;
          }
        }
        @media (min-width: 1141px) and (max-width: 1320px) {
          .navbar-nav-links {
            gap: 10px !important;
            margin: 0 8px !important;
          }
          .nav-link-item {
            font-size: 12.5px !important;
            padding: 5px 4px !important;
          }
        }
      `}</style>
    </header>
  );
};
