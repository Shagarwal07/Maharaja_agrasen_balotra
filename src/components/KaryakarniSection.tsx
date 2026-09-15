import React from 'react';
import type { Language } from '../data/translations';
import { 
  KARYAKARNI_PRESIDENT, 
  KARYAKARNI_OFFICE_BEARERS, 
  KARYAKARNI_COMMITTEE 
} from '../data/karyakarni';

interface KaryakarniSectionProps {
  lang: Language;
}

export const KaryakarniSection: React.FC<KaryakarniSectionProps> = ({ lang }) => {

  return (
    <section 
      id="karyakarni"
      className="karyakarni-section"
      style={{
        background: 'linear-gradient(180deg, #FAF6EE 0%, #FFFDF9 50%, #FAF5ED 100%)',
        borderTop: '2px solid rgba(197, 160, 89, 0.3)',
        borderBottom: '2px solid rgba(197, 160, 89, 0.3)',
        position: 'relative'
      }}
    >
      <div className="web-container" style={{ maxWidth: '1000px', margin: '0 auto' }}>

        {/* 1. PRESIDENT / अध्यक्ष (Grand Featured Card) */}
        <div className="president-card-wrap">
          <div className="president-avatar-wrap">
            <div className="president-avatar-inner">
              <img 
                src={KARYAKARNI_PRESIDENT.image} 
                alt={KARYAKARNI_PRESIDENT.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '50%'
                }}
              />
            </div>
          </div>

          <div className="president-role">
            {lang === 'hi' ? KARYAKARNI_PRESIDENT.role : KARYAKARNI_PRESIDENT.roleEn}
          </div>
          <h3 className="president-name">
            {lang === 'hi' ? KARYAKARNI_PRESIDENT.name : KARYAKARNI_PRESIDENT.nameEn}
          </h3>
        </div>

        {/* 2. OFFICE BEARERS / मुख्य पदाधिकारी */}
        <div style={{ marginBottom: '44px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(197, 160, 89, 0.35)' }} />
            <span style={{
              fontSize: '12px',
              letterSpacing: '2px',
              fontWeight: 800,
              color: '#8D6409',
              textTransform: 'uppercase'
            }}>
              {lang === 'hi' ? 'मुख्य पदाधिकारी' : 'OFFICE BEARERS'}
            </span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(197, 160, 89, 0.35)' }} />
          </div>

          <div className="office-bearers-grid">
            {KARYAKARNI_OFFICE_BEARERS.map((member) => (
              <div 
                key={member.id}
                className="office-bearer-card"
              >
                <div className="office-bearer-avatar-wrap">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '50%'
                    }}
                  />
                </div>
                <div className="office-bearer-role">
                  {lang === 'hi' ? member.role : member.roleEn}
                </div>
                <div className="office-bearer-name">
                  {lang === 'hi' ? member.name : member.nameEn}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. COMMITTEE / समिति सदस्य */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(197, 160, 89, 0.35)' }} />
            <span style={{
              fontSize: '12px',
              letterSpacing: '2px',
              fontWeight: 800,
              color: '#8D6409',
              textTransform: 'uppercase'
            }}>
              {lang === 'hi' ? 'कार्यकारिणी समिति' : 'COMMITTEE MEMBERS'}
            </span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(197, 160, 89, 0.35)' }} />
          </div>

          {/* Grid of Committee Members (4 Columns) */}
          <div className="karyakarni-grid">
            {KARYAKARNI_COMMITTEE.map((member) => (
              <div 
                key={member.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  width: '100%',
                  padding: '4px 2px'
                }}
              >
                <div className="karyakarni-avatar-wrap">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '50%'
                    }}
                    loading="lazy"
                  />
                </div>
                <div className="karyakarni-role">
                  {lang === 'hi' ? member.role : member.roleEn}
                </div>
                <div className="karyakarni-name">
                  {lang === 'hi' ? member.name : member.nameEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
