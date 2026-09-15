import React, { useEffect } from 'react';
import { ArrowLeft, Calendar, Sparkles, Trophy, Crown, Clock } from 'lucide-react';
import type { Language } from '../data/translations';
import { UpcomingEventsTimeline } from './UpcomingEventsTimeline';
import { KaryakarniSection } from './KaryakarniSection';

interface MahotsavPageProps {
  lang: Language;
  onNavigateHome: () => void;
}

export const MahotsavPage: React.FC<MahotsavPageProps> = ({ lang, onNavigateHome }) => {
  const [activeTab, setActiveTab] = React.useState<'events' | 'competitions' | 'karyakarni'>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#karyakarni') return 'karyakarni';
      if (window.location.hash === '#contests' || window.location.hash === '#competitions') return 'competitions';
    }
    return 'events';
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const handleHashChange = () => {
      if (window.location.hash === '#karyakarni') setActiveTab('karyakarni');
      else if (window.location.hash === '#contests' || window.location.hash === '#competitions') setActiveTab('competitions');
      else if (window.location.hash === '#events' || window.location.hash === '#mahotsav') setActiveTab('events');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <main style={{ minHeight: '100vh', background: '#FAF5ED' }}>
      {/* 1. Page Header (No Brown BG, Pure Clean Imperial Layout) */}
      <div style={{
        padding: '24px 20px 20px 20px',
        borderBottom: '1.5px solid rgba(197, 160, 89, 0.35)',
        background: 'linear-gradient(180deg, #FFFDF9 0%, #FAF5ED 100%)'
      }}>
        <div className="web-container">
          {/* Breadcrumb Navigation Bar (Side-by-Side on all screens) */}
          <div className="mahotsav-header-nav">
            <button
              onClick={onNavigateHome}
              className="mahotsav-back-btn"
            >
              <ArrowLeft size={15} />
              <span>{lang === 'hi' ? 'मुख्य पृष्ठ पर लौटें' : 'Return to Home'}</span>
            </button>

            {/* Festival Date Chip */}
            <div className="mahotsav-date-chip">
              <Calendar size={13} color="#8D6409" style={{ flexShrink: 0 }} />
              <span className="mahotsav-date-desktop">
                {lang === 'hi' ? '29 सितम्बर - 13 अक्टूबर 2026 (मुख्य जयंती: 11 अक्टूबर)' : '29 Sep - 13 Oct 2026 (Main Jayanti: 11 Oct)'}
              </span>
              <span className="mahotsav-date-mobile">
                {lang === 'hi' ? '29 सित - 13 अक्टू (जयंती: 11 अक्टू)' : '29 Sep - 13 Oct (Jayanti: 11 Oct)'}
              </span>
            </div>
          </div>

          {/* Main Title Content */}
          <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#9C782F',
              fontSize: '13px',
              fontWeight: 800,
              letterSpacing: '1.5px',
              marginBottom: '6px'
            }}>
              <Sparkles size={14} color="#C5A059" />
              <span>{lang === 'hi' ? '॥ श्री अग्रसेन जयंती महोत्सव 2026 ॥' : '॥ Shree Agrasen Jayanti Mahotsav 2026 ॥'}</span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 800,
              color: '#650015',
              margin: '0 0 8px 0',
              lineHeight: 1.2
            }}>
              {lang === 'hi'
                ? 'अग्रसेन जयंती महोत्सव 2026'
                : 'Agrasen Jayanti Mahotsav 2026'}
            </h1>

            <div style={{
              width: '80px',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, #DFBD74, transparent)',
              margin: '0 auto 12px auto'
            }} />

            <p style={{
              color: '#6B5A44',
              fontSize: 'clamp(14.5px, 1.2vw, 16px)',
              lineHeight: 1.7,
              margin: '0 auto 18px auto',
              maxWidth: '820px'
            }}>
              {lang === 'hi'
                ? '29 सितम्बर से 13 अक्टूबर 2026 तक आयोजित समस्त 13 आधिकारिक महोत्सव कार्यक्रम, कार्यकारिणी डायरेक्टरी एवं 22 सांस्कृतिक व खेलकूद प्रतियोगिताएं।'
                : 'Official comprehensive schedule of all 13 festival programs, executive committee directory, and 22 cultural competitions from 29 September to 13 October 2026.'}
            </p>

            {/* Quick stats highlights (Clickable to switch tab) */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <button
                onClick={() => setActiveTab('events')}
                style={{
                  background: activeTab === 'events' ? '#650015' : '#FFFDF9',
                  border: activeTab === 'events' ? '1.5px solid #DFBD74' : '1px solid rgba(197, 160, 89, 0.45)',
                  borderRadius: '16px',
                  padding: '5px 14px',
                  fontSize: '12px',
                  color: activeTab === 'events' ? '#FFE17D' : '#650015',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 6px rgba(101, 0, 21, 0.04)',
                  cursor: 'pointer'
                }}
              >
                <Clock size={13} color={activeTab === 'events' ? '#FFE17D' : '#9C782F'} />
                <b>{lang === 'hi' ? '13 आधिकारिक कार्यक्रम' : '13 Official Events'}</b>
              </button>

              <button
                onClick={() => setActiveTab('competitions')}
                style={{
                  background: activeTab === 'competitions' ? '#650015' : '#FFFDF9',
                  border: activeTab === 'competitions' ? '1.5px solid #DFBD74' : '1px solid rgba(197, 160, 89, 0.45)',
                  borderRadius: '16px',
                  padding: '5px 14px',
                  fontSize: '12px',
                  color: activeTab === 'competitions' ? '#FFE17D' : '#650015',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 6px rgba(101, 0, 21, 0.04)',
                  cursor: 'pointer'
                }}
              >
                <Trophy size={13} color={activeTab === 'competitions' ? '#FFE17D' : '#9C782F'} />
                <b>{lang === 'hi' ? '22 प्रतियोगिताएं' : '22 Competitions'}</b>
              </button>

              <button
                onClick={() => setActiveTab('karyakarni')}
                style={{
                  background: activeTab === 'karyakarni' ? '#650015' : '#FFFDF9',
                  border: activeTab === 'karyakarni' ? '1.5px solid #DFBD74' : '1px solid rgba(197, 160, 89, 0.45)',
                  borderRadius: '16px',
                  padding: '5px 14px',
                  fontSize: '12px',
                  color: activeTab === 'karyakarni' ? '#FFE17D' : '#650015',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 6px rgba(101, 0, 21, 0.04)',
                  cursor: 'pointer'
                }}
              >
                <Crown size={13} color={activeTab === 'karyakarni' ? '#FFE17D' : '#9C782F'} />
                <b>{lang === 'hi' ? '41 कार्यकारिणी सदस्य' : '41 Committee Members'}</b>
              </button>

              <span style={{
                background: '#FFFDF9',
                border: '1px solid rgba(197, 160, 89, 0.45)',
                borderRadius: '16px',
                padding: '5px 14px',
                fontSize: '12px',
                color: '#650015',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 6px rgba(101, 0, 21, 0.04)'
              }}>
                <Calendar size={13} color="#9C782F" />
                <b>{lang === 'hi' ? '29 सित. - 13 अक्टू. 2026' : '29 Sep - 13 Oct 2026'}</b>
              </span>
            </div>
          </div>
        </div>
      </div>



      {/* 3. Render ONLY the Selected Section */}
      {(activeTab === 'events' || activeTab === 'competitions') && (
        <UpcomingEventsTimeline
          lang={lang}
          onlyBanner={false}
          hideHeader={true}
          activeSection={activeTab}
          onSectionChange={(sec) => setActiveTab(sec)}
        />
      )}

      {activeTab === 'karyakarni' && (
        <KaryakarniSection
          lang={lang}
        />
      )}

      {/* 4. Bottom Return to Home Call-To-Action */}
      <div style={{
        background: '#FFFDF9',
        borderTop: '2px solid rgba(197, 160, 89, 0.35)',
        padding: '36px 20px',
        textAlign: 'center'
      }}>
        <div className="web-container">
          <p style={{
            fontSize: '15px',
            color: '#7D6A58',
            marginBottom: '16px',
            fontWeight: 600
          }}>
            {lang === 'hi' 
              ? '॥ महाराजा अग्रसेन जी के आदर्शों पर चलकर समाज को सशक्त एवं संगठित बनाएं ॥' 
              : '॥ Following the timeless principles of Maharaja Agrasen for unity and prosperity ॥'}
          </p>
          <button
            onClick={onNavigateHome}
            style={{
              background: 'linear-gradient(135deg, #650015 0%, #4A000D 100%)',
              color: '#FFE17D',
              border: '1.5px solid #DFBD74',
              borderRadius: '24px',
              padding: '10px 24px',
              fontSize: '13.5px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(101, 0, 21, 0.25)'
            }}
          >
            <ArrowLeft size={16} />
            <span>{lang === 'hi' ? 'मुख्य पृष्ठ पर वापस जाएं' : 'Return to Home Page'}</span>
          </button>
        </div>
      </div>
    </main>
  );
};
