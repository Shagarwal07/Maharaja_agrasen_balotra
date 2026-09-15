import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Trophy, Calendar, MapPin, ChevronRight, ChevronLeft, Navigation, X, CheckCircle2, AlertCircle } from 'lucide-react';
import type { Language } from '../data/translations';
import type { OfficialCompetition } from '../data/competitions';
import { OFFICIAL_COMPETITIONS } from '../data/competitions';
import { CompetitionSvgIcon } from './CompetitionSvgIcon';

interface EventScheduleProps {
  lang: Language;
  hideOuterWrapper?: boolean;
  hideHeader?: boolean;
}

export const EventSchedule: React.FC<EventScheduleProps> = ({ 
  lang,
  hideOuterWrapper = false,
  hideHeader = false
}) => {
  const [selectedComp, setSelectedComp] = useState<OfficialCompetition | null>(null);
  const [modalTab, setModalTab] = useState<'about' | 'rules' | 'register'>('about');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Filter categories
  const filterOptions = [
    { id: 'all', labelEn: 'All Competitions (22)', labelHi: 'सभी प्रतियोगिताएं (22)' },
    { id: 'kids', labelEn: 'Kids & Students', labelHi: 'बालक एवं विद्यार्थी' },
    { id: 'women', labelEn: 'Women & Girls', labelHi: 'महिलाएं एवं छात्राएं' },
    { id: 'men', labelEn: 'Men & Youth', labelHi: 'पुरुष एवं युवा' },
    { id: 'sports', labelEn: 'Outdoor & Sports', labelHi: 'खेलकूद एवं दौड़' }
  ];

  const filteredCompetitions = OFFICIAL_COMPETITIONS.filter(comp => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'kids') {
      return comp.category.includes('Class') || comp.category.includes('Nursery') || comp.id === 'comp-07';
    }
    if (activeFilter === 'women') {
      return comp.category.includes('Women') || comp.category.includes('Girls');
    }
    if (activeFilter === 'men') {
      return comp.category.includes('Men') || comp.category.includes('Boys');
    }
    if (activeFilter === 'sports') {
      return comp.title.includes('Race') || comp.title.includes('Badminton') || comp.title.includes('Cricket') || comp.title.includes('Tennis') || comp.title.includes('Rassa Kassi');
    }
    return true;
  });

  return (
    <section id="competitions" className={hideOuterWrapper ? '' : 'web-section'} style={{
      background: hideOuterWrapper ? 'transparent' : 'linear-gradient(180deg, #FFFDF9 0%, #FAF5ED 50%, #FFFDF9 100%)',
      borderTop: hideOuterWrapper ? 'none' : '2px solid rgba(197, 160, 89, 0.35)',
      borderBottom: hideOuterWrapper ? 'none' : '2px solid rgba(197, 160, 89, 0.35)',
      padding: hideOuterWrapper ? '0' : '48px 0'
    }}>
      <div className={hideOuterWrapper ? '' : 'web-container'}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          {!hideHeader && (
            <>
              <div className="section-badge" style={{
                background: 'linear-gradient(135deg, rgba(101, 0, 21, 0.08) 0%, rgba(223, 189, 116, 0.15) 100%)',
                border: '1px solid #DFBD74',
                color: '#650015',
                padding: '6px 16px',
                borderRadius: '20px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                fontWeight: 700,
                marginBottom: '10px'
              }}>
                <Trophy size={15} color="#851528" />
                <span>{lang === 'hi' ? 'आधिकारिक प्रतियोगिताएं (22)' : 'Official Competitions (22)'}</span>
              </div>

              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(26px, 3.2vw, 38px)',
                fontWeight: 800,
                color: '#4A000D',
                margin: '0 0 8px 0',
                lineHeight: 1.2
              }}>
                {lang === 'hi' ? 'प्रतियोगिताएं एवं खेलकूद महोत्सव' : 'Competitions & Cultural Contests'}
              </h2>

              <p style={{
                color: '#7D6A58',
                fontSize: '15px',
                maxWidth: '720px',
                margin: '0 auto 20px auto',
                lineHeight: 1.6
              }}>
                {lang === 'hi'
                  ? 'अग्रसेन जयंती 2026 के पावन उपलक्ष्य में आयोजित समस्त 22 आधिकारिक प्रतियोगिताएं।'
                  : 'All 22 official competitions organized for Agrasen Jayanti 2026.'}
              </p>
            </>
          )}

        {/* View Mode Toggle */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto 24px auto'
          }}>
            <div style={{
              display: 'inline-flex',
              background: '#F0E6D5',
              padding: '3px',
              borderRadius: '20px',
              border: '1px solid rgba(197, 160, 89, 0.4)'
            }}>
              <button
                onClick={() => setViewMode('cards')}
                style={{
                  background: viewMode === 'cards' ? '#650015' : 'transparent',
                  color: viewMode === 'cards' ? '#FFE17D' : '#650015',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {lang === 'hi' ? '📱 कार्ड व्यू' : '📱 Card View'}
              </button>
              <button
                onClick={() => setViewMode('table')}
                style={{
                  background: viewMode === 'table' ? '#650015' : 'transparent',
                  color: viewMode === 'table' ? '#FFE17D' : '#650015',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {lang === 'hi' ? '📋 तालिका' : '📋 Table View'}
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            {filterOptions.map(opt => (
              <button
                key={opt.id}
                onClick={() => setActiveFilter(opt.id)}
                style={{
                  background: activeFilter === opt.id ? '#650015' : '#FFFDF9',
                  color: activeFilter === opt.id ? '#FFE17D' : '#4A000D',
                  border: activeFilter === opt.id ? '1.5px solid #650015' : '1.5px solid rgba(197, 160, 89, 0.4)',
                  borderRadius: '20px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeFilter === opt.id ? '0 2px 8px rgba(101, 0, 21, 0.2)' : 'none'
                }}
              >
                {lang === 'hi' ? opt.labelHi : opt.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* --- CARDS VIEW (Styled like the mobile app screenshots) --- */}
        {viewMode === 'cards' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '16px',
            marginBottom: '32px'
          }}>
            {filteredCompetitions.map((comp) => {
              return (
                <div
                  key={comp.id}
                  onClick={() => {
                    setSelectedComp(comp);
                    setModalTab('about');
                  }}
                  style={{
                    background: '#FFFDF9',
                    borderRadius: '18px',
                    border: '1.5px solid rgba(197, 160, 89, 0.45)',
                    boxShadow: '0 4px 16px rgba(101, 0, 21, 0.05)',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(101, 0, 21, 0.12)';
                    e.currentTarget.style.borderColor = '#C5A059';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(101, 0, 21, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.45)';
                  }}
                >
                  {/* Left Illustrated / Icon Box (Matching App Thumbnail) */}
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #4A000D 0%, #680016 100%)',
                    border: '2px solid #DFBD74',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 3px 10px rgba(101, 0, 21, 0.12), inset 0 0 10px rgba(0,0,0,0.35)',
                    padding: '4px'
                  }}>
                    <CompetitionSvgIcon title={comp.title} size={54} />
                  </div>

                  {/* Right Content Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '8px',
                      marginBottom: '4px'
                    }}>
                      <h3 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '17px',
                        fontWeight: 700,
                        color: '#3B000A',
                        margin: 0,
                        lineHeight: 1.2
                      }}>
                        {lang === 'hi' ? comp.titleHi : comp.title}
                      </h3>

                      {/* Fee Badge (₹50 or Spot Entry) */}
                      {comp.feeBadge && (
                        <span style={{
                          background: comp.feeBadge.includes('₹') ? '#FAF0E6' : '#FFF9E6',
                          color: comp.feeBadge.includes('₹') ? '#851528' : '#B25E00',
                          border: comp.feeBadge.includes('₹') ? '1px solid #851528' : '1px solid #E6A100',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '11.5px',
                          fontWeight: 800,
                          flexShrink: 0,
                          whiteSpace: 'nowrap'
                        }}>
                          {comp.feeBadge}
                        </span>
                      )}
                    </div>

                    {/* Eligibility & Category */}
                    <div style={{
                      fontSize: '12.5px',
                      color: '#553C33',
                      fontWeight: 600,
                      marginBottom: '4px',
                      lineHeight: 1.3
                    }}>
                      {lang === 'hi' ? comp.categoryHi : comp.category}
                    </div>

                    {/* Date & Time */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '12px',
                      color: '#851528',
                      fontWeight: 600,
                      marginBottom: '3px'
                    }}>
                      <Calendar size={12} color="#851528" />
                      <span>{comp.dateTime}</span>
                    </div>

                    {/* Venue Tag */}
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#8D6409',
                      background: 'rgba(223, 189, 116, 0.22)',
                      padding: '2.5px 8px',
                      borderRadius: '12px',
                      border: '1px solid rgba(197, 160, 89, 0.45)',
                      width: 'fit-content',
                      marginTop: '3px'
                    }}>
                      <MapPin size={11} color="#8D6409" />
                      <span>{lang === 'hi' ? comp.venueHi : comp.venue}</span>
                    </div>
                  </div>

                  {/* Right Arrow */}
                  <ChevronRight size={16} color="#C5A059" style={{ flexShrink: 0 }} />
                </div>
              );
            })}
          </div>
        )}

        {/* --- TABLE VIEW --- */}
        {viewMode === 'table' && (
          <div style={{
            overflowX: 'auto',
            borderRadius: '16px',
            border: '1.5px solid rgba(197, 160, 89, 0.45)',
            boxShadow: '0 4px 16px rgba(101, 0, 21, 0.05)',
            background: '#FFF',
            marginBottom: '32px'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '12.5px',
              textAlign: 'left'
            }}>
              <thead>
                <tr style={{
                  background: '#F7F1E5',
                  borderBottom: '2px solid #C5A059',
                  color: '#3B000A',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700
                }}>
                  <th style={{ padding: '12px 14px' }}>{lang === 'hi' ? 'प्रतियोगिता' : 'Competition'}</th>
                  <th style={{ padding: '12px 14px' }}>{lang === 'hi' ? 'वर्ग / पात्रता' : 'Category / Eligibility'}</th>
                  <th style={{ padding: '12px 14px' }}>{lang === 'hi' ? 'दिनांक एवं समय' : 'Date & Time'}</th>
                  <th style={{ padding: '12px 14px' }}>{lang === 'hi' ? 'स्थान' : 'Venue'}</th>
                  <th style={{ padding: '12px 14px', textAlign: 'center' }}>{lang === 'hi' ? 'प्रवेश शुल्क' : 'Fee'}</th>
                  <th style={{ padding: '12px 14px', textAlign: 'center' }}>{lang === 'hi' ? 'विवरण' : 'Details'}</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompetitions.map((comp, idx) => (
                  <tr
                    key={comp.id}
                    style={{
                      borderBottom: '1px solid #F0E6D5',
                      background: idx % 2 === 0 ? '#FFFFFF' : '#FAF6EE'
                    }}
                  >
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: '#4A000D' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CompetitionSvgIcon title={comp.title} size={22} />
                        <span>{lang === 'hi' ? comp.titleHi : comp.title}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 14px', color: '#5B4136', fontWeight: 600 }}>
                      {lang === 'hi' ? comp.categoryHi : comp.category}
                    </td>
                    <td style={{ padding: '12px 14px', color: '#851528', fontWeight: 600 }}>
                      {comp.dateTime}
                    </td>
                    <td style={{ padding: '12px 14px', color: '#5B4136' }}>
                      {lang === 'hi' ? comp.venueHi : comp.venue}
                    </td>
                    <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                      {comp.feeBadge ? (
                        <span style={{
                          background: comp.feeBadge.includes('₹') ? '#FAF0E6' : '#FFF9E6',
                          color: comp.feeBadge.includes('₹') ? '#851528' : '#B25E00',
                          border: comp.feeBadge.includes('₹') ? '1px solid #851528' : '1px solid #E6A100',
                          padding: '3px 8px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: 700
                        }}>
                          {comp.feeBadge}
                        </span>
                      ) : (
                        <span style={{ color: '#2E7D32', fontSize: '11px', fontWeight: 700 }}>
                          {lang === 'hi' ? 'निःशुल्क' : 'Free'}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                      <button
                        onClick={() => {
                          setSelectedComp(comp);
                          setModalTab('about');
                        }}
                        style={{
                          background: 'linear-gradient(135deg, #650015 0%, #8E1616 100%)',
                          color: '#FFFDF9',
                          border: '1px solid #DFBD74',
                          borderRadius: '8px',
                          padding: '5px 12px',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {lang === 'hi' ? 'देखें' : 'View'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal for Competition Details (Pixel-accurate to Official Mobile App) */}
        {selectedComp && createPortal(
          <div
            onClick={() => setSelectedComp(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(20, 5, 8, 0.8)',
              backdropFilter: 'blur(8px)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px 16px',
              boxSizing: 'border-box'
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#FAF6EE',
                borderRadius: '24px',
                border: '2px solid #DFBD74',
                maxWidth: '430px',
                width: '100%',
                maxHeight: '88vh',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
                position: 'relative',
                overflow: 'hidden',
                animation: 'fadeInCard 0.25s ease-out'
              }}
            >
              {/* App Bar Header - Pinned */}
              <div style={{
                background: '#650015',
                color: '#FFFDF9',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(223, 189, 116, 0.3)',
                flexShrink: 0
              }}>
                <button
                  onClick={() => setSelectedComp(null)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#FFE17D',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px'
                  }}
                  title="Back"
                >
                  <ChevronLeft size={24} />
                </button>

                <div style={{ textAlign: 'center', flex: 1, padding: '0 10px' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '18px',
                    fontWeight: 800,
                    margin: 0,
                    color: '#FFFDF9',
                    letterSpacing: '0.3px'
                  }}>
                    {lang === 'hi' ? selectedComp.titleHi : selectedComp.title}
                  </h3>
                  {selectedComp.tagline && (
                    <div style={{
                      fontSize: '11px',
                      color: '#DFBD74',
                      marginTop: '2px',
                      fontStyle: 'italic'
                    }}>
                      {selectedComp.tagline}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setSelectedComp(null)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#FFE17D',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px'
                  }}
                  title="Close"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Body */}
              <div style={{
                padding: '14px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}>
                {/* Visual Banner */}
                <div style={{
                  height: '110px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #4A000D 0%, #680016 60%, #851528 100%)',
                  border: '1.5px solid #DFBD74',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '-20px',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(223,189,116,0.2) 0%, transparent 70%)'
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '-20px',
                    left: '-20px',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(223,189,116,0.2) 0%, transparent 70%)'
                  }} />
                  <div style={{
                    filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.4))'
                  }}>
                    <CompetitionSvgIcon title={selectedComp.title} size={70} />
                  </div>
                </div>

                {/* Primary Info Card */}
                <div style={{
                  background: '#FFFDF9',
                  borderRadius: '16px',
                  border: '1.5px solid #DFBD74',
                  padding: '14px 16px',
                  boxShadow: '0 4px 12px rgba(101, 0, 21, 0.05)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '8px',
                    marginBottom: '6px'
                  }}>
                    <h4 style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '17px',
                      fontWeight: 800,
                      color: '#4A000D',
                      margin: 0
                    }}>
                      {lang === 'hi' ? selectedComp.titleHi : selectedComp.title}
                    </h4>

                    {selectedComp.feeBadge ? (
                      selectedComp.feeBadge.includes('₹') ? (
                        <span style={{
                          color: '#650015',
                          fontSize: '17px',
                          fontWeight: 800,
                          fontFamily: 'var(--font-serif)'
                        }}>
                          {selectedComp.feeBadge}
                        </span>
                      ) : (
                        <span style={{
                          border: '1.5px solid #DFBD74',
                          background: '#FFF8E7',
                          color: '#8D6409',
                          borderRadius: '12px',
                          padding: '3px 10px',
                          fontSize: '11px',
                          fontWeight: 700
                        }}>
                          {selectedComp.feeBadge}
                        </span>
                      )
                    ) : (
                      <span style={{
                        border: '1.5px solid rgba(46, 125, 50, 0.4)',
                        background: '#E8F5E9',
                        color: '#2E7D32',
                        borderRadius: '12px',
                        padding: '3px 10px',
                        fontSize: '11px',
                        fontWeight: 700
                      }}>
                        {lang === 'hi' ? 'निःशुल्क' : 'Free Entry'}
                      </span>
                    )}
                  </div>

                  <div style={{
                    fontSize: '12px',
                    color: '#6F5647',
                    lineHeight: 1.4,
                    marginBottom: '14px'
                  }}>
                    <span>{lang === 'hi' ? selectedComp.categoryHi : selectedComp.category}</span>
                    <span style={{ margin: '0 5px' }}>•</span>
                    <span>{selectedComp.dateTime}</span>
                    <span style={{ margin: '0 5px' }}>•</span>
                    <span>{lang === 'hi' ? selectedComp.venueHi : selectedComp.venue}</span>
                  </div>

                  {/* Two Buttons: Venue Pill and Navigate */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      border: '1.5px solid #DFBD74',
                      borderRadius: '12px',
                      padding: '8px 10px',
                      background: '#FFFDF9',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#4A000D',
                      textAlign: 'center'
                    }}>
                      <MapPin size={13} color="#851528" />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {lang === 'hi' ? selectedComp.venueHi : selectedComp.venue}
                      </span>
                    </div>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((selectedComp.venue) + ' Balotra Rajasthan')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        border: '1.5px solid #DFBD74',
                        borderRadius: '12px',
                        padding: '8px 10px',
                        background: '#FFFDF9',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#4A000D',
                        textDecoration: 'none',
                        textAlign: 'center',
                        transition: 'background 0.2s'
                      }}
                    >
                      <Navigation size={13} color="#851528" />
                      <span>{lang === 'hi' ? 'नेविगेट करें' : 'Navigate'}</span>
                    </a>
                  </div>
                </div>

                {/* Sub-Tab Navigation (About | Rules | Register / Entry) */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  borderBottom: '1px solid rgba(197, 160, 89, 0.4)',
                  paddingBottom: '2px'
                }}>
                  <button
                    onClick={() => setModalTab('about')}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      borderBottom: modalTab === 'about' ? '2.5px solid #650015' : '2.5px solid transparent',
                      padding: '6px 14px',
                      color: modalTab === 'about' ? '#650015' : '#7D6A58',
                      fontSize: '13px',
                      fontWeight: modalTab === 'about' ? 800 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {lang === 'hi' ? 'परिचय' : 'About'}
                  </button>
                  <button
                    onClick={() => setModalTab('rules')}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      borderBottom: modalTab === 'rules' ? '2.5px solid #650015' : '2.5px solid transparent',
                      padding: '6px 14px',
                      color: modalTab === 'rules' ? '#650015' : '#7D6A58',
                      fontSize: '13px',
                      fontWeight: modalTab === 'rules' ? 800 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {lang === 'hi' ? 'नियम' : 'Rules'}
                  </button>
                  <button
                    onClick={() => setModalTab('register')}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      borderBottom: modalTab === 'register' ? '2.5px solid #650015' : '2.5px solid transparent',
                      padding: '6px 14px',
                      color: modalTab === 'register' ? '#650015' : '#7D6A58',
                      fontSize: '13px',
                      fontWeight: modalTab === 'register' ? 800 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {selectedComp.feeBadge === 'Spot entry'
                      ? (lang === 'hi' ? 'प्रवेश' : 'Entry')
                      : (lang === 'hi' ? 'पंजीकरण' : 'Register')}
                  </button>
                </div>

                {/* Sub-Tab 1: ABOUT */}
                {modalTab === 'about' && (
                  <div>
                    <div style={{
                      textAlign: 'center',
                      fontSize: '11px',
                      letterSpacing: '1.5px',
                      fontWeight: 700,
                      color: '#9C782F',
                      marginBottom: '10px'
                    }}>
                      — {lang === 'hi' ? 'परिचय' : 'ABOUT'} —
                    </div>

                    <div style={{
                      background: '#FFFDF9',
                      borderRadius: '16px',
                      border: '1.5px solid #DFBD74',
                      padding: '16px',
                      boxShadow: '0 4px 12px rgba(101, 0, 21, 0.04)'
                    }}>
                      {selectedComp.aboutText && (
                        <p style={{
                          fontSize: '13px',
                          color: '#3E2E20',
                          lineHeight: 1.55,
                          marginTop: 0,
                          marginBottom: '14px'
                        }}>
                          {selectedComp.aboutText}
                        </p>
                      )}

                      {selectedComp.takingPartPoints && selectedComp.takingPartPoints.length > 0 && (
                        <>
                          <h5 style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '16px',
                            fontWeight: 800,
                            color: '#650015',
                            margin: '0 0 10px 0'
                          }}>
                            {lang === 'hi' ? 'सहभागिता (Taking part)' : 'Taking part'}
                          </h5>

                          <ul style={{
                            margin: 0,
                            paddingLeft: '18px',
                            fontSize: '12.5px',
                            color: '#3E2E20',
                            lineHeight: 1.5,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                          }}>
                            {selectedComp.takingPartPoints.map((pt, idx) => (
                              <li key={idx} style={{ paddingLeft: '4px' }}>{pt}</li>
                            ))}
                          </ul>
                        </>
                      )}

                      <p style={{
                        fontSize: '11.5px',
                        color: '#7D6A58',
                        lineHeight: 1.45,
                        marginTop: '14px',
                        marginBottom: 0,
                        fontStyle: 'italic'
                      }}>
                        {lang === 'hi'
                          ? 'सटीक प्रारूप, समय और निर्णायकों की घोषणा समिति द्वारा प्रतियोगिता से पूर्व की जाएगी। कृपया तिथि के निकट यह पृष्ठ पुनः देखें।'
                          : 'Exact format, timings and judging will be announced by the committee before the event. Please check this page again closer to the date.'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Sub-Tab 2: RULES */}
                {modalTab === 'rules' && (
                  <div>
                    <div style={{
                      textAlign: 'center',
                      fontSize: '11px',
                      letterSpacing: '1.5px',
                      fontWeight: 700,
                      color: '#9C782F',
                      marginBottom: '10px'
                    }}>
                      — {lang === 'hi' ? 'नियम एवं शर्तें' : 'RULES'} —
                    </div>

                    <div style={{
                      background: '#FFFDF9',
                      borderRadius: '16px',
                      border: '1.5px solid #DFBD74',
                      padding: '16px',
                      boxShadow: '0 4px 12px rgba(101, 0, 21, 0.04)'
                    }}>
                      <div style={{
                        background: '#FAF5ED',
                        borderLeft: '3.5px solid #C5A059',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        color: '#5C4A3A',
                        lineHeight: 1.45,
                        marginBottom: '14px'
                      }}>
                        <b>Sample rules.</b> This is placeholder text so the page can be seen complete. The committee will replace it with the final rules before registration opens.
                      </div>

                      {selectedComp.rules && selectedComp.rules.length > 0 && (
                        <>
                          <h5 style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '16px',
                            fontWeight: 800,
                            color: '#650015',
                            margin: '0 0 10px 0'
                          }}>
                            {lang === 'hi' ? 'नियम (Rules)' : 'Rules'}
                          </h5>

                          <ul style={{
                            margin: 0,
                            paddingLeft: '18px',
                            fontSize: '12.5px',
                            color: '#3E2E20',
                            lineHeight: 1.5,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                          }}>
                            {selectedComp.rules.map((rule, idx) => (
                              <li key={idx} style={{ paddingLeft: '4px' }}>{rule}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Sub-Tab 3: REGISTER / ENTRY */}
                {modalTab === 'register' && (
                  <div>
                    <div style={{
                      textAlign: 'center',
                      fontSize: '11px',
                      letterSpacing: '1.5px',
                      fontWeight: 700,
                      color: '#9C782F',
                      marginBottom: '10px'
                    }}>
                      — {selectedComp.feeBadge === 'Spot entry'
                        ? (lang === 'hi' ? 'स्पॉट प्रवेश' : 'SPOT ENTRY')
                        : (lang === 'hi' ? 'योग्य परिवार सदस्य' : 'ELIGIBLE FAMILY MEMBERS')} —
                    </div>

                    <div style={{
                      background: '#FFFDF9',
                      borderRadius: '16px',
                      border: '1.5px solid #DFBD74',
                      padding: '16px',
                      boxShadow: '0 4px 12px rgba(101, 0, 21, 0.04)',
                      textAlign: 'center'
                    }}>
                      {selectedComp.feeBadge === 'Spot entry' ? (
                        <>
                          <CheckCircle2 size={36} color="#2E7D32" style={{ margin: '0 auto 10px auto' }} />
                          <h5 style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '16px',
                            fontWeight: 800,
                            color: '#4A000D',
                            margin: '0 0 8px 0'
                          }}>
                            {lang === 'hi' ? 'स्पॉट प्रवेश उपलब्ध है' : 'Spot Entry Available'}
                          </h5>
                          <p style={{
                            fontSize: '12.5px',
                            color: '#6F5647',
                            lineHeight: 1.5,
                            margin: '0 0 16px 0'
                          }}>
                            {lang === 'hi'
                              ? 'इस प्रतियोगिता के लिए अग्रिम पंजीकरण आवश्यक नहीं है। कृपया कार्यक्रम के दिन निर्धारित समय से 15 मिनट पूर्व स्थल पर उपस्थित हों।'
                              : 'No prior registration required for this event. Please report at the venue 15 minutes before scheduled start.'}
                          </p>
                        </>
                      ) : (
                        <>
                          <AlertCircle size={36} color="#C5A059" style={{ margin: '0 auto 10px auto' }} />
                          <h5 style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '15.5px',
                            fontWeight: 800,
                            color: '#4A000D',
                            margin: '0 0 8px 0'
                          }}>
                            {lang === 'hi' ? 'परिवार में कोई पात्र नहीं मिला' : 'Nobody in your family is eligible'}
                          </h5>
                          <p style={{
                            fontSize: '12.5px',
                            color: '#6F5647',
                            lineHeight: 1.5,
                            margin: '0 0 16px 0'
                          }}>
                            {lang === 'hi'
                              ? 'आधिकारिक ऐप के "Family" अनुभाग में अपने परिवार के सदस्यों का विवरण जोड़ें।'
                              : 'Add eligible members under Family in the official Maharaj Agrasen App.'}
                          </p>
                        </>
                      )}

                      <div style={{
                        background: '#FAF5ED',
                        borderRadius: '10px',
                        padding: '10px',
                        fontSize: '12px',
                        color: '#4A000D',
                        marginBottom: '14px',
                        fontWeight: 600
                      }}>
                        {lang === 'hi' ? 'प्रवेश शुल्क: ' : 'Entry Fee: '}
                        <span style={{ color: '#851528', fontWeight: 800 }}>
                          {selectedComp.feeBadge || (lang === 'hi' ? 'निःशुल्क (Free)' : 'Free Entry')}
                        </span>
                      </div>

                      <a
                        href="#mahotsav"
                        onClick={() => setSelectedComp(null)}
                        style={{
                          display: 'block',
                          background: 'linear-gradient(135deg, #650015 0%, #4A000D 100%)',
                          color: '#FFE17D',
                          border: '1.5px solid #DFBD74',
                          borderRadius: '12px',
                          padding: '10px',
                          fontSize: '13px',
                          fontWeight: 800,
                          textDecoration: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        {lang === 'hi' ? '📱 ऐप में पंजीकरण करें' : '📱 Register via Mobile App'}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}

      </div>
    </section>
  );
};
