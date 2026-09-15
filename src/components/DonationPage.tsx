import React, { useEffect } from 'react';
import { ArrowLeft, Heart, Building2 } from 'lucide-react';
import type { Language } from '../data/translations';
import { AgrohaBuilder } from './AgrohaBuilder';

interface DonationPageProps {
  lang: Language;
  soundEnabled: boolean;
  onNavigateHome: () => void;
}

export const DonationPage: React.FC<DonationPageProps> = ({
  lang,
  soundEnabled,
  onNavigateHome
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <main style={{ minHeight: '100vh', background: '#FAF5ED' }}>
      {/* 1. Royal Page Header */}
      <div style={{
        padding: '28px 20px 24px 20px',
        borderBottom: '1.5px solid rgba(197, 160, 89, 0.35)',
        background: 'linear-gradient(180deg, #FFFDF9 0%, #FAF5ED 100%)'
      }}>
        <div className="web-container">
          {/* Breadcrumb & Navigation */}
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

            {/* Donation Seva Badge */}
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
              <Heart size={14} color="#8D6409" />
              <span>{lang === 'hi' ? 'दान एवं पावन सहयोग' : 'Donation & Building Contribution'}</span>
            </div>
          </div>

          {/* Title & Introduction */}
          <div style={{ maxWidth: '820px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#8D6409',
              fontSize: '13px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '6px'
            }}>
              <Building2 size={16} />
              <span>{lang === 'hi' ? 'श्री अग्रवाल समाज भवन, बालोतरा' : 'Shri Agarwal Samaj Bhavan, Balotra'}</span>
            </div>

            <h1 style={{
              margin: '0 0 10px 0',
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(24px, 3.2vw, 36px)',
              fontWeight: 800,
              color: '#650015',
              lineHeight: 1.25
            }}>
              {lang === 'hi'
                ? 'एक रुपया, एक ईंट — समाज भवन निर्माण दान'
                : 'One Rupee, One Brick — Samaj Bhavan Donation & Seva'}
            </h1>

            <p style={{
              margin: 0,
              fontSize: 'clamp(14px, 1.2vw, 16px)',
              color: '#6b5a44',
              lineHeight: 1.6
            }}>
              {lang === 'hi'
                ? 'महाराजा अग्रसेन जी के पावन सिद्धांत के अनुसार हर परिवार का योगदान समाज को सुदृढ़ बनाता है। बालोतरा में निर्माणाधीन भव्य समाज भवन हेतु अपनी श्रद्धा अनुसार ईंट व दान अर्पित करें।'
                : 'In accordance with Maharaja Agrasen’s visionary tenet, every single contribution strengthens the community. Pledge your brick and donation for the Balotra Samaj Bhavan.'}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Interactive Agroha Builder Component */}
      <div style={{ padding: '20px 0 60px 0' }}>
        <AgrohaBuilder lang={lang} soundEnabled={soundEnabled} />
      </div>

      {/* 3. Bottom Return Home Bar */}
      <div style={{
        padding: '24px 20px 48px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, transparent 0%, rgba(207, 162, 51, 0.08) 100%)'
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
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(101, 0, 21, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(101, 0, 21, 0.25)';
          }}
        >
          <ArrowLeft size={16} />
          <span>{lang === 'hi' ? 'मुख्य पृष्ठ पर लौटें' : 'Return to Home Page'}</span>
        </button>
      </div>
    </main>
  );
};
