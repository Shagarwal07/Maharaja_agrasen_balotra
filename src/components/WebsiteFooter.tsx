import React from 'react';
import type { Language } from '../data/translations';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Sparkles 
} from 'lucide-react';

interface WebsiteFooterProps {
  lang: Language;
  onOpenBiometric?: () => void;
  onNavigate?: (page: 'home' | 'mahotsav' | 'history' | 'donation', targetId?: string) => void;
}

export const WebsiteFooter: React.FC<WebsiteFooterProps> = ({ lang, onNavigate }) => {
  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, target: { page: 'home' | 'mahotsav' | 'history' | 'donation'; id?: string }) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(target.page, target.id);
    }
  };

  return (
    <footer id="footer" className="site-footer">
      <style dangerouslySetInnerHTML={{
        __html: `
        :root {
          --maroon-deep: #420f18;
          --maroon-mid: #5d1724;
          --gold-primary: #cfa233;
          --gold-bright: #e6c665;
          --gold-soft: #f4ead0;
        }

        footer.site-footer {
          background: linear-gradient(180deg, #52131f 0%, #3a0b14 100%);
          color: var(--gold-soft);
          font-family: var(--font-body);
          position: relative;
          overflow: hidden;
          border-top: 2px solid var(--gold-primary);
        }

        footer.site-footer::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 50% 0%, rgba(207, 162, 51, 0.07) 0%, transparent 60%);
          pointer-events: none;
        }

        /* Compact Royal Crest Divider */
        .footer-crest-band {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 12px 16px 4px;
          position: relative;
        }

        .footer-crest-line {
          flex: 1;
          max-width: 260px;
          height: 1.5px;
          background: linear-gradient(90deg, transparent, var(--gold-primary), transparent);
        }

        .footer-crest-motif {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--gold-bright);
          font-family: var(--font-serif);
          font-size: 17.5px;
          font-weight: 800;
          letter-spacing: 1.8px;
          text-shadow: 0 0 12px rgba(230, 198, 101, 0.4);
        }

        .footer-crest-motif .dot {
          width: 5px;
          height: 5px;
          background: var(--gold-primary);
          border-radius: 50%;
          display: inline-block;
        }

        /* Compact 4-Column Grid */
        .footer-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 16px 24px 14px;
          display: grid;
          grid-template-columns: 1.5fr 1fr 1.3fr 1.15fr;
          gap: 22px;
          position: relative;
          z-index: 1;
        }

        /* Column Headers */
        .footer-col h3 {
          color: var(--gold-bright);
          font-size: 14.5px;
          font-weight: 700;
          letter-spacing: 0.03em;
          margin: 0 0 5px 0;
          font-family: var(--font-serif);
          display: flex;
          align-items: center;
          gap: 6px;
          padding-bottom: 3px;
          border-bottom: 1px solid rgba(207, 162, 51, 0.2);
        }

        /* 1. BRAND COLUMN */
        .brand-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .footer-seal {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1.5px solid var(--gold-bright);
          background: radial-gradient(circle at 35% 35%, rgba(230, 198, 101, 0.3) 0%, rgba(66, 15, 24, 0.7) 100%);
          box-shadow: 0 0 12px rgba(207, 162, 51, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .footer-seal span {
          font-size: 20px;
          color: var(--gold-bright);
          font-family: var(--font-serif);
          line-height: 1;
          font-weight: 700;
          transform: translateY(-1px);
        }

        .brand-title {
          font-family: var(--font-serif);
          font-size: 18px;
          font-weight: 800;
          color: #FFFDF8;
          line-height: 1.25;
          letter-spacing: 0.2px;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        }

        .brand-motto {
          display: inline-flex;
          align-items: center;
          font-size: 11.5px;
          color: #ffd978;
          font-weight: 600;
          margin-bottom: 10px;
          background: linear-gradient(90deg, rgba(207, 162, 51, 0.18) 0%, rgba(207, 162, 51, 0.08) 100%);
          padding: 3px 11px;
          border-radius: 999px;
          border: 1px solid rgba(230, 198, 101, 0.35);
          letter-spacing: 0.4px;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
        }

        .brand-desc {
          font-size: 12.5px;
          line-height: 1.55;
          color: rgba(244, 234, 208, 0.88);
          margin: 0 0 14px 0;
        }

        /* Compact Social Media Icons */
        .footer-social-row {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .footer-social-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid rgba(207, 162, 51, 0.45);
          background: rgba(255, 255, 255, 0.05);
          color: var(--gold-bright);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .footer-social-btn svg {
          width: 15px;
          height: 15px;
          display: block;
          transition: transform 0.2s ease;
        }

        .footer-social-btn:hover {
          background: linear-gradient(135deg, #e6c665, #cfa233);
          color: #380811;
          border-color: #ffd978;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(230, 198, 101, 0.4);
        }

        .footer-social-btn:hover svg {
          transform: scale(1.08);
        }

        /* 2. QUICK LINKS */
        .footer-nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .footer-nav-list li {
          margin: 0;
          padding: 0;
          line-height: 1.2;
        }

        .footer-nav-link {
          display: inline-block;
          color: rgba(244, 234, 208, 0.85);
          font-size: 12.5px;
          line-height: 1.2;
          text-decoration: none;
          transition: all 0.2s ease;
          padding: 0;
          margin: 0;
          cursor: pointer;
        }

        .footer-nav-link:hover {
          color: var(--gold-bright);
          transform: translateX(4px);
        }

        /* 3. CONTACT & VENUE */
        .contact-items {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .contact-entry {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 13px;
          line-height: 1.4;
          color: rgba(244, 234, 208, 0.88);
        }

        .contact-entry svg {
          color: var(--gold-bright);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .contact-entry a {
          color: inherit;
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .contact-entry a:hover {
          color: var(--gold-bright);
          text-decoration: underline;
        }

        /* 4. DEVELOPER CARD */
        .dev-card {
          background: linear-gradient(135deg, rgba(207, 162, 51, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
          border: 1px solid rgba(207, 162, 51, 0.3);
          border-radius: 10px;
          padding: 10px 12px;
          backdrop-filter: blur(6px);
        }

        .dev-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          color: var(--gold-bright);
          margin-bottom: 3px;
        }

        .dev-title {
          font-size: 14.5px;
          font-weight: 700;
          color: #FFF;
          margin-bottom: 3px;
        }

        .dev-desc {
          font-size: 11.5px;
          line-height: 1.4;
          color: rgba(244, 234, 208, 0.82);
          margin-bottom: 0;
        }

        /* COMPACT BOTTOM BAR */
        .footer-bottom-bar {
          border-top: 1px solid rgba(207, 162, 51, 0.18);
          background: rgba(25, 5, 10, 0.4);
          padding: 9px 24px;
          position: relative;
          z-index: 1;
        }

        .footer-bottom-inner {
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 12px;
          font-size: 12.5px;
          color: rgba(244, 234, 208, 0.75);
        }

        .footer-bottom-left {
          text-align: left;
        }

        .footer-mantra {
          color: var(--gold-bright);
          font-family: var(--font-serif);
          font-size: 13.5px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-align: center;
          white-space: nowrap;
        }

        .footer-legal-links {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .footer-legal-links a {
          color: rgba(244, 234, 208, 0.75);
          text-decoration: none;
          font-size: 12.5px;
          transition: color 0.15s ease;
        }

        .footer-legal-links a:hover {
          color: var(--gold-bright);
          text-decoration: underline;
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .footer-container {
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            padding: 14px 18px;
          }
        }

        @media (max-width: 640px) {
          .footer-container {
            grid-template-columns: 1fr 1.35fr;
            gap: 16px 12px;
            padding: 14px 12px;
          }
          .footer-col-brand {
            grid-column: 1 / -1;
          }
          .footer-col-links {
            grid-column: 1;
          }
          .footer-col-contact {
            grid-column: 2;
          }
          .footer-col-dev {
            grid-column: 1 / -1;
          }
          .footer-col h3 {
            font-size: 13px;
            margin-bottom: 4px;
            padding-bottom: 2px;
          }
          .footer-nav-list {
            gap: 1.5px;
          }
          .footer-nav-list li {
            margin: 0;
            padding: 0;
            line-height: 1.16;
          }
          .footer-nav-link {
            font-size: 11.5px;
            line-height: 1.16;
            padding: 0;
            margin: 0;
          }
          .contact-items {
            gap: 4px;
          }
          .contact-entry {
            font-size: 11.5px;
            line-height: 1.25;
            gap: 5px;
          }
          .contact-entry svg {
            width: 13px;
            height: 13px;
            margin-top: 2px;
          }
          .contact-entry a {
            word-break: break-all;
          }
          .footer-bottom-inner {
            display: flex;
            flex-direction: column;
            text-align: center;
            gap: 6px;
          }
          .footer-bottom-left,
          .footer-legal-links {
            justify-content: center;
            text-align: center;
          }
          .footer-crest-line {
            max-width: 60px;
          }
        }
      `}} />

      {/* Royal Crest Divider */}
      <div className="footer-crest-band">
        <div className="footer-crest-line"></div>
        <div className="footer-crest-motif">
          <span className="dot"></span>
          <Sparkles size={16} />
          <span>॥ श्री अग्रसेन परम्परा ॥</span>
          <Sparkles size={16} />
          <span className="dot"></span>
        </div>
        <div className="footer-crest-line"></div>
      </div>

      {/* Main 4-Column Grid */}
      <div className="footer-container">
        {/* 1. SAMAJ BRAND & ABOUT */}
        <div className="footer-col footer-col-brand">
          <div className="brand-header">
            <div className="footer-seal" title="ॐ श्री महालक्ष्मी">
              <span>ॐ</span>
            </div>
            <div className="brand-title">
              {lang === 'hi' ? 'श्री अग्रवाल समाज, बालोतरा' : 'Shri Agarwal Samaj, Balotra'}
            </div>
          </div>

          <div className="brand-motto">
            {lang === 'hi' ? '॥ सेवा • संस्कार • संगठन • समर्पण ॥' : 'Unity, Culture, Service & Dedication'}
          </div>

          <p className="brand-desc">
            {lang === 'hi'
              ? 'महाराजा अग्रसेन जी के "एक रुपया, एक ईंट" एवं अहिंसा के अमर सिद्धांतों पर सेवारत। बालोतरा का अग्रवाल समाज शिक्षा, स्वास्थ्य, युवा प्रतिभा सम्मान एवं समाज भवन निर्माण हेतु समर्पित है।'
              : 'Serving and uniting the Agarwal community — preserving timeless Vedic values while advancing education, youth empowerment, healthcare, and community infrastructure.'}
          </p>

          {/* Social Media Row */}
          <div className="footer-social-row" id="social-media" aria-label="Social media links">
            {/* Facebook */}
            <a 
              href="https://facebook.com/AgarwalSamajBalotra" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-btn" 
              title="Facebook"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>

            {/* Instagram */}
            <a 
              href="https://instagram.com/agarwalsamaj_balotra" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-btn" 
              title="Instagram"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* YouTube */}
            <a 
              href="https://youtube.com/@AgarwalSamajBalotraOfficial" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-btn" 
              title="YouTube"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

            {/* WhatsApp */}
            <a 
              href="https://chat.whatsapp.com/sample_agarsen_balotra" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-btn" 
              title="WhatsApp"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.886 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>

            {/* X / Twitter */}
            <a 
              href="https://x.com/AgarsenBalotra" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-btn" 
              title="X (Twitter)"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        {/* 2. QUICK NAVIGATION */}
        <div className="footer-col footer-col-links">
          <h3>{lang === 'hi' ? 'महत्वपूर्ण कड़ियां' : 'Quick Links'}</h3>
          <ul className="footer-nav-list">
            <li>
              <a 
                href="#home" 
                className="footer-nav-link"
                onClick={(e) => handleNavLinkClick(e, { page: 'home', id: '#home' })}
              >
                {lang === 'hi' ? 'समाज परिचय' : 'About Samaj'}
              </a>
            </li>
            <li>
              <a 
                href="#donation" 
                className="footer-nav-link"
                onClick={(e) => handleNavLinkClick(e, { page: 'donation' })}
                style={{
                  color: 'var(--gold-bright)',
                  fontWeight: 700
                }}
              >
                {lang === 'hi' ? 'दान एवं सहयोग' : 'Donation & Contributions'}
              </a>
            </li>
            <li>
              <a 
                href="#mahotsav" 
                className="footer-nav-link"
                onClick={(e) => handleNavLinkClick(e, { page: 'mahotsav', id: '#competitions' })}
              >
                {lang === 'hi' ? 'प्रतियोगिता व कार्यक्रम' : 'Events & Schedule'}
              </a>
            </li>
            <li>
              <a 
                href="#history" 
                className="footer-nav-link"
                onClick={(e) => handleNavLinkClick(e, { page: 'history' })}
              >
                {lang === 'hi' ? 'इतिहास व देशांतर' : 'History & Heritage'}
              </a>
            </li>
            <li>
              <a 
                href="#gallery" 
                className="footer-nav-link"
                onClick={(e) => handleNavLinkClick(e, { page: 'home', id: '#gallery' })}
              >
                {lang === 'hi' ? 'स्मृति छायाचित्र (गैलरी)' : 'Memories Gallery'}
              </a>
            </li>
          </ul>
        </div>

        {/* 3. CONTACT & VENUE */}
        <div className="footer-col footer-col-contact">
          <h3>{lang === 'hi' ? 'संपर्क व स्थल' : 'Contact & Venue'}</h3>
          <div className="contact-items">
            <div className="contact-entry">
              <MapPin size={15} />
              <div>
                {lang === 'hi'
                  ? 'श्री अग्रवाल भवन, अग्रोहा मार्ग, पुराना बस स्टैंड, बालोतरा (राज.) - 344022'
                  : 'Samaj Bhavan, Agroha Marg, Old Bus Stand, Balotra (Raj.) - 344022'}
              </div>
            </div>

            <div className="contact-entry">
              <Phone size={15} />
              <div>
                <a href="tel:+919876543210">+91 98765 43210</a>
                <span style={{ color: 'rgba(207, 162, 51, 0.4)', margin: '0 4px' }}>/</span>
                <a href="tel:02988223456">02988-223456</a>
              </div>
            </div>

            <div className="contact-entry">
              <Mail size={15} />
              <div>
                <a href="mailto:samaj.balotra@agrasen2026.org">
                  samaj.balotra@agrasen2026.org
                </a>
              </div>
            </div>

            <div className="contact-entry">
              <Calendar size={15} />
              <div>
                <strong style={{ color: 'var(--gold-bright)' }}>
                  {lang === 'hi' ? '29 सितम्बर - 13 अक्टूबर 2026' : '29 Sep - 13 Oct 2026'}
                </strong>
                <span style={{ fontSize: '11.5px', color: 'rgba(244, 234, 208, 0.75)', marginLeft: '4px' }}>
                  {lang === 'hi' ? '(मुख्य जयंती: 11 अक्टूबर)' : '(Main: 11 Oct)'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. HOSTING & DEVELOPMENT */}
        <div className="footer-col footer-col-dev" id="developer-info">
          <h3>{lang === 'hi' ? 'सहयोग व विकास' : 'Hosted & Developed'}</h3>
          <div className="dev-card">
            <div className="dev-badge">
              <Sparkles size={11} />
              <span>{lang === 'hi' ? 'डिजिटल सेवा' : 'Digital Seva'}</span>
            </div>
            
            <div style={{
              fontSize: '13.5px',
              fontWeight: 800,
              color: 'var(--gold-bright)',
              letterSpacing: '0.4px',
              marginBottom: '4px',
              lineHeight: 1.3
            }}>
              HOSTED BY RK COACHING CLASSES (Balotra)
            </div>

            <div style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#FFF',
              letterSpacing: '0.3px',
              marginBottom: '6px',
              lineHeight: 1.3
            }}>
              DEVELOPED BY SHUBHAM AGRAWAL
            </div>

            <p className="dev-desc">
              {lang === 'hi'
                ? 'महाराजा अग्रसेन जयंती 2026 बालोतरा महोत्सव हेतु सेवा भाव एवं समर्पण से समर्पित।'
                : 'Dedicated with reverence and devotion for Maharaja Agrasen Jayanti 2026.'}
            </p>

            <div style={{
              marginTop: '8px',
              paddingTop: '8px',
              borderTop: '1px solid rgba(207, 162, 51, 0.2)',
              display: 'flex',
              alignItems: 'center'
            }}>
              <a 
                href="https://github.com/IWS-PROJECTS" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--gold-bright)',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'color 0.15s ease'
                }}
              >
                <span>IWS Portal</span>
                <span style={{ fontSize: '14px', lineHeight: 1 }}>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* COMPACT FOOTER BOTTOM BAR */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-inner">
          <div className="footer-bottom-left">
            {lang === 'hi'
              ? '© 2026 समस्त अग्रवाल समाज, बालोतरा। सर्वाधिकार सुरक्षित।'
              : '© 2026 All Agarwal Samaj Balotra. All rights reserved.'}
          </div>

          <div className="footer-mantra">
            ॥ ॐ श्री महालक्ष्मी अग्रसेवाय नमः ॥
          </div>

          <div className="footer-legal-links">
            <a 
              href="#home" 
              onClick={(e) => handleNavLinkClick(e, { page: 'home', id: '#home' })}
            >
              {lang === 'hi' ? 'नियम व शर्तें' : 'Terms & Conditions'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
