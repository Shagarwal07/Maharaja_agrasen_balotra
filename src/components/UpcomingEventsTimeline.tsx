import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { 
  Clock, 
  Calendar as CalendarIcon, 
  MapPin, 
  Share2, 
  Sparkles, 
  ChevronRight, 
  Flame, 
  X,
  Navigation,
  Trophy
} from 'lucide-react';
import type { Language } from '../data/translations';
import type { ScheduleEvent } from '../data/schedule';
import { JAYANTI_SCHEDULE, generateWhatsAppLink, generateGoogleCalendarUrl } from '../data/schedule';
import { EventSchedule } from './EventSchedule';

interface UpcomingEventsTimelineProps {
  lang: Language;
  onlyBanner?: boolean;
  hideHeader?: boolean;
  onNavigate?: (page: 'home' | 'mahotsav') => void;
  activeSection?: 'events' | 'competitions';
  onSectionChange?: (section: 'events' | 'competitions') => void;
}

export const UpcomingEventsTimeline: React.FC<UpcomingEventsTimelineProps> = ({ 
  lang,
  onlyBanner = false,
  hideHeader = false,
  onNavigate,
  activeSection,
  onSectionChange
}) => {
  const [internalTrack, setInternalTrack] = useState<'events' | 'competitions'>('events');
  const activeTrack = activeSection ?? internalTrack;

  const handleTrackChange = (newTrack: 'events' | 'competitions') => {
    setInternalTrack(newTrack);
    if (onSectionChange) {
      onSectionChange(newTrack);
    }
  };

  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [selectedSlot, setSelectedSlot] = useState<string>('all');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [activeDetailEvent, setActiveDetailEvent] = useState<ScheduleEvent | null>(null);

  // Live timer tick every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Unique list of dates
  const distinctDays = useMemo(() => {
    const map = new Map<string, { date: string; dateIso: string; labelHi: string; labelEn: string; count: number }>();
    JAYANTI_SCHEDULE.forEach(evt => {
      if (!map.has(evt.dateIso)) {
        map.set(evt.dateIso, {
          date: evt.date,
          dateIso: evt.dateIso,
          labelHi: evt.dayLabelHi.split(',')[0], // e.g. "शनिवार"
          labelEn: evt.date,
          count: 1
        });
      } else {
        map.get(evt.dateIso)!.count++;
      }
    });
    return Array.from(map.values()).sort((a, b) => a.dateIso.localeCompare(b.dateIso));
  }, []);

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return JAYANTI_SCHEDULE.filter(evt => {
      const matchDay = selectedDay === 'all' || evt.dateIso === selectedDay;
      const matchSlot = selectedSlot === 'all' || evt.slotType === selectedSlot;
      return matchDay && matchSlot;
    });
  }, [selectedDay, selectedSlot]);

  // Find next upcoming event
  const nextEvent = useMemo(() => {
    // Check if any event is scheduled for future, else use the first event of Mahotsav
    for (const evt of JAYANTI_SCHEDULE) {
      const eventDate = new Date(`${evt.dateIso}T${evt.time24}:00`);
      if (eventDate.getTime() > currentTime.getTime()) {
        return evt;
      }
    }
    return JAYANTI_SCHEDULE[0]; // fallback to opening event
  }, [currentTime]);

  // Compute live countdown to the next event
  const countdownToNext = useMemo(() => {
    if (!nextEvent) return { days: 0, hours: 0, mins: 0, secs: 0, isPast: false };
    const target = new Date(`${nextEvent.dateIso}T${nextEvent.time24}:00`).getTime();
    const diff = target - currentTime.getTime();
    if (diff <= 0) {
      return { days: 0, hours: 0, mins: 0, secs: 0, isPast: true };
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    return { days, hours, mins, secs, isPast: false };
  }, [nextEvent, currentTime]);

  const getEmojiForEvent = (evt: ScheduleEvent): string => {
    const title = (evt.competition + ' ' + (evt.competitionHi || '') + ' ' + evt.category + ' ' + (evt.categoryHi || '')).toLowerCase();
    if (title.includes('sundarkand') || title.includes('सुन्दरकाण्ड')) return '🪔';
    if (title.includes('quiz') || title.includes('प्रश्नोत्तरी')) return '💡';
    if (title.includes('cricket') || title.includes('क्रिकेट')) return '🏏';
    if (title.includes('medical') || title.includes('चिकित्सा') || title.includes('स्वास्थ्य') || title.includes('सेमिनार')) return '🩺';
    if (title.includes('udyam') || title.includes('उद्यम') || title.includes('mitra') || title.includes('मित्र')) return '🤝';
    if (title.includes('haat') || title.includes('हॉट') || title.includes('mela') || title.includes('मेला')) return '🎪';
    if (title.includes('housie') || title.includes('हाउजी')) return '🎟️';
    if (title.includes('ai') || title.includes('champs') || title.includes('नवाचार') || title.includes('वर्चुअल') || title.includes('वर्कशॉप')) return '🤖';
    if (title.includes('shiksha') || title.includes('शिक्षा') || title.includes('सम्मान')) return '🎓';
    if (title.includes('havan') || title.includes('हवन') || title.includes('ध्वजारोहण')) return '🚩';
    if (title.includes('procession') || title.includes('शोभायात्रा') || title.includes('जुलूस')) return '🛕';
    if (title.includes('cultural') || title.includes('सांस्कृतिक')) return '🎭';
    if (title.includes('feast') || title.includes('भोज') || title.includes('प्रसादी')) return '🍲';
    return '🚩';
  };

  return (
    <section id="mahotsav" style={{
      background: 'linear-gradient(180deg, #FBF6EE 0%, #FAF3E6 50%, #F5EFE4 100%)',
      padding: '50px 0 60px 0',
      position: 'relative',
      borderTop: '2px solid rgba(197, 160, 89, 0.4)',
      borderBottom: '2px solid rgba(197, 160, 89, 0.35)',
      overflow: 'hidden'
    }}>
      {/* Decorative Traditional Corner Motif Backgrounds */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '320px',
        height: '320px',
        background: 'radial-gradient(circle, rgba(223, 189, 116, 0.18) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-120px',
        left: '-80px',
        width: '360px',
        height: '360px',
        background: 'radial-gradient(circle, rgba(101, 0, 21, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div className="web-container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Section Header */}
        {!hideHeader && (
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, rgba(101, 0, 21, 0.08) 0%, rgba(197, 160, 89, 0.18) 100%)',
              border: '1px solid rgba(197, 160, 89, 0.5)',
              borderRadius: '30px',
              padding: '5px 16px',
              color: '#650015',
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '12px'
            }}>
              <Clock size={14} color="#650015" />
              <span>
                {lang === 'hi' ? 'समय-सारणी • जयंती महोत्सव' : 'Mahotsav Event Schedule'}
              </span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(24px, 3.2vw, 36px)',
              fontWeight: 800,
              color: '#650015',
              margin: '0 0 10px 0',
              lineHeight: 1.2
            }}>
              {lang === 'hi' 
                ? 'आगामी जयंती कार्यक्रम एवं लाइव टाइमर' 
                : 'Upcoming Events & Live Timing Schedule'}
            </h2>

            <p style={{
              color: '#7D6A58',
              fontSize: 'clamp(14px, 1.1vw, 16px)',
              maxWidth: '720px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              {lang === 'hi'
                ? '29 सितम्बर से 13 अक्टूबर 2026 तक आयोजित समस्त पावन महोत्सव कार्यक्रम, विशाल शोभायात्रा एवं समयबद्ध सांस्कृतिक उत्सव।'
                : 'From 29 September to 13 October 2026, experience the complete official schedule of sacred programs, grand royal procession, and cultural celebrations.'}
            </p>
          </div>
        )}

        {/* 1. Timer-Based "Next Up / Live Countdown" Hero Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #4A000D 0%, #680016 50%, #3B000A 100%)',
          borderRadius: '20px',
          border: '2px solid #DFBD74',
          boxShadow: '0 12px 35px rgba(70, 0, 15, 0.28), inset 0 0 30px rgba(223, 189, 116, 0.15)',
          color: '#FAF5ED',
          padding: '24px 28px',
          marginBottom: '36px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            alignItems: 'center'
          }}>
            {/* Left: Next Event Highlight */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(223, 189, 116, 0.2)',
                border: '1px solid #DFBD74',
                color: '#DFBD74',
                borderRadius: '16px',
                padding: '4px 12px',
                fontSize: '11.5px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                marginBottom: '10px'
              }}>
                <Sparkles size={13} color="#FFE17D" />
                <span>
                  {countdownToNext.isPast 
                    ? (lang === 'hi' ? 'वर्तमान में सक्रिय' : 'Event Underway') 
                    : (lang === 'hi' ? 'अगला आगामी कार्यक्रम' : 'Next Upcoming Event')}
                </span>
              </div>

              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(20px, 2vw, 24px)',
                fontWeight: 800,
                color: '#FFFDF9',
                margin: '0 0 8px 0',
                lineHeight: 1.25
              }}>
                {lang === 'hi' ? nextEvent.competitionHi : nextEvent.competition}
              </h3>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '14px',
                color: '#E5DAC6',
                fontSize: '13px',
                marginBottom: '12px'
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <CalendarIcon size={14} color="#DFBD74" />
                  <b>{lang === 'hi' ? nextEvent.dayLabelHi : nextEvent.dayLabelEn}</b>
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <Clock size={14} color="#DFBD74" />
                  <b>{nextEvent.time}</b>
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <MapPin size={14} color="#DFBD74" />
                  <span>{lang === 'hi' ? nextEvent.venueHi : nextEvent.venue}</span>
                </span>
              </div>

              <p style={{
                color: '#D8C7B0',
                fontSize: '12.5px',
                lineHeight: 1.5,
                margin: 0,
                maxWidth: '480px'
              }}>
                {lang === 'hi' ? nextEvent.descriptionHi : nextEvent.description}
              </p>
            </div>

            {/* Right: Live Ticking Countdown Clock */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.28)',
              border: '1px solid rgba(223, 189, 116, 0.35)',
              borderRadius: '16px',
              padding: '16px 20px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '12px',
                color: '#DFBD74',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}>
                <Flame size={14} color="#DFBD74" />
                <span>{lang === 'hi' ? 'प्रारंभ होने में शेष समय' : 'Starts In'}</span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '8px'
              }}>
                {[
                  { labelHi: 'दिन', labelEn: 'Days', val: countdownToNext.days },
                  { labelHi: 'घंटे', labelEn: 'Hours', val: countdownToNext.hours },
                  { labelHi: 'मिनट', labelEn: 'Mins', val: countdownToNext.mins },
                  { labelHi: 'सेकंड', labelEn: 'Secs', val: countdownToNext.secs }
                ].map((item, i) => (
                  <div key={i} style={{
                    background: 'linear-gradient(180deg, #2D0008 0%, #1A0005 100%)',
                    border: '1px solid rgba(223, 189, 116, 0.4)',
                    borderRadius: '10px',
                    padding: '8px 4px',
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)'
                  }}>
                    <div style={{
                      fontFamily: 'monospace',
                      fontSize: 'clamp(20px, 2.4vw, 28px)',
                      fontWeight: 800,
                      color: '#FFE17D',
                      lineHeight: 1
                    }}>
                      {item.val.toString().padStart(2, '0')}
                    </div>
                    <div style={{
                      fontSize: '10px',
                      color: '#DFBD74',
                      fontWeight: 600,
                      marginTop: '4px',
                      textTransform: 'uppercase'
                    }}>
                      {lang === 'hi' ? item.labelHi : item.labelEn}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                display: 'flex',
                gap: '8px',
                justifyContent: 'center',
                marginTop: '14px'
              }}>
                <a
                  href={generateGoogleCalendarUrl(nextEvent)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'linear-gradient(135deg, #DFBD74 0%, #C5A059 100%)',
                    color: '#49000D',
                    border: '1px solid #FFF',
                    borderRadius: '20px',
                    padding: '6px 14px',
                    fontSize: '11.5px',
                    fontWeight: 800,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                  }}
                >
                  <CalendarIcon size={13} />
                  <span>{lang === 'hi' ? 'कैलेंडर में जोड़ें' : 'Add to Calendar'}</span>
                </a>
                <a
                  href={generateWhatsAppLink(nextEvent)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    color: '#FFFDF9',
                    border: '1px solid rgba(223, 189, 116, 0.5)',
                    borderRadius: '20px',
                    padding: '6px 12px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <Share2 size={13} color="#DFBD74" />
                  <span>{lang === 'hi' ? 'शेयर' : 'Share'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* If onlyBanner is true (Home Page), render CTA button and end section */}
        {onlyBanner ? (
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <a
              href="#mahotsav"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('mahotsav');
                }
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #650015 0%, #4A000D 100%)',
                color: '#FFE17D',
                border: '1.5px solid #DFBD74',
                borderRadius: '24px',
                padding: '10px 24px',
                fontSize: '13.5px',
                fontWeight: 800,
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(101, 0, 21, 0.25)',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(101, 0, 21, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(101, 0, 21, 0.25)';
              }}
            >
              <span>{lang === 'hi' ? 'जयंती महोत्सव 2026 विस्तृत विवरण देखें' : 'View Detailed Jayanti Mahotsav 2026 Details'}</span>
              <ChevronRight size={16} />
            </a>
          </div>
        ) : (
          <>
            {/* 0. Primary First Selection: EVENTS OR COMPETITIONS */}
            <div style={{
              background: '#FFFDF9',
              border: '1.5px solid rgba(197, 160, 89, 0.45)',
              borderRadius: '16px',
              padding: '12px 18px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              boxShadow: '0 3px 12px rgba(101, 0, 21, 0.05)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  color: '#8D6409',
                  background: 'rgba(223, 189, 116, 0.22)',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  border: '1px solid rgba(197, 160, 89, 0.4)'
                }}>
                  {lang === 'hi' ? 'पहले चुनें' : 'First Select'}
                </span>
                <span style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#4A000D'
                }}>
                  {lang === 'hi' ? 'कार्यक्रम अथवा प्रतियोगिताएं:' : 'Events or Competitions:'}
                </span>
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: '#F0E6D5',
                padding: '4px',
                borderRadius: '14px',
                gap: '6px',
                border: '1px solid rgba(197, 160, 89, 0.35)'
              }}>
                <button
                  type="button"
                  onClick={() => handleTrackChange('events')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '8px 18px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    border: activeTrack === 'events' ? '1.5px solid #DFBD74' : '1px solid transparent',
                    background: activeTrack === 'events' ? 'linear-gradient(135deg, #650015 0%, #4A000D 100%)' : 'transparent',
                    color: activeTrack === 'events' ? '#FFE17D' : '#650015',
                    boxShadow: activeTrack === 'events' ? '0 4px 12px rgba(101, 0, 21, 0.2)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Clock size={15} color={activeTrack === 'events' ? '#FFE17D' : '#8D6409'} />
                  <span>{lang === 'hi' ? 'समस्त कार्यक्रम (13 Events)' : 'All Events (13)'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleTrackChange('competitions')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '8px 18px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    border: activeTrack === 'competitions' ? '1.5px solid #DFBD74' : '1px solid transparent',
                    background: activeTrack === 'competitions' ? 'linear-gradient(135deg, #650015 0%, #4A000D 100%)' : 'transparent',
                    color: activeTrack === 'competitions' ? '#FFE17D' : '#650015',
                    boxShadow: activeTrack === 'competitions' ? '0 4px 12px rgba(101, 0, 21, 0.2)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Trophy size={15} color={activeTrack === 'competitions' ? '#FFE17D' : '#8D6409'} />
                  <span>{lang === 'hi' ? 'प्रतियोगिताएं (22 Competitions)' : 'Competitions (22)'}</span>
                </button>
              </div>
            </div>

            {activeTrack === 'competitions' ? (
              <EventSchedule lang={lang} hideOuterWrapper={true} hideHeader={true} />
            ) : (
              <>
                {/* 2. Interactive Filter Bar: By Day and By Timing Slot */}
        <div style={{
          marginBottom: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {/* Day Tabs */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '6px',
            scrollbarWidth: 'none'
          }}>
            <button
              onClick={() => setSelectedDay('all')}
              style={{
                background: selectedDay === 'all' ? '#650015' : '#FFFDF9',
                color: selectedDay === 'all' ? '#FFF' : '#650015',
                border: selectedDay === 'all' ? '1.5px solid #650015' : '1.5px solid rgba(197, 160, 89, 0.4)',
                borderRadius: '20px',
                padding: '7px 16px',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: selectedDay === 'all' ? '0 4px 12px rgba(101, 0, 21, 0.2)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              {lang === 'hi' ? `समस्त कार्यक्रम (${JAYANTI_SCHEDULE.length === 13 ? '13' : JAYANTI_SCHEDULE.length})` : `All Events (${JAYANTI_SCHEDULE.length})`}
            </button>

            {distinctDays.map(d => {
              const isSelected = selectedDay === d.dateIso;
              const isMainJayanti = d.dateIso === '2026-10-11';
              return (
                <button
                  key={d.dateIso}
                  onClick={() => setSelectedDay(d.dateIso)}
                  style={{
                    background: isSelected 
                      ? (isMainJayanti ? 'linear-gradient(135deg, #DFBD74 0%, #C5A059 100%)' : '#650015') 
                      : (isMainJayanti ? 'rgba(223, 189, 116, 0.15)' : '#FFFDF9'),
                    color: isSelected 
                      ? (isMainJayanti ? '#49000D' : '#FFF') 
                      : (isMainJayanti ? '#650015' : '#4A5568'),
                    border: isSelected 
                      ? (isMainJayanti ? '1.5px solid #9C782F' : '1.5px solid #650015') 
                      : (isMainJayanti ? '1.5px solid #DFBD74' : '1.5px solid rgba(197, 160, 89, 0.4)'),
                    borderRadius: '20px',
                    padding: '7px 14px',
                    fontSize: '12.5px',
                    fontWeight: isMainJayanti ? 800 : 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: isSelected ? '0 4px 12px rgba(101, 0, 21, 0.15)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {isMainJayanti && <span>⭐</span>}
                  <span>{lang === 'hi' ? `${d.date} (${d.labelHi})` : `${d.date} (${d.count})`}</span>
                </button>
              );
            })}
          </div>

          {/* Time Slot Filter Buttons (Morning, Afternoon, Evening) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#7D6A58' }}>
              {lang === 'hi' ? 'समय के अनुसार सत्र:' : 'Filter by Time Slot:'}
            </span>

            {[
              { id: 'all', labelHi: 'सभी समय', labelEn: 'All Times' },
              { id: 'morning', labelHi: '🌅 प्रातःकाल (07:00 AM - 12:00 PM)', labelEn: '🌅 Morning (07:00 AM - 12:00 PM)' },
              { id: 'afternoon', labelHi: '☀️ दोपहर (12:00 PM - 05:00 PM)', labelEn: '☀️ Afternoon (12:00 PM - 05:00 PM)' },
              { id: 'evening', labelHi: '🌙 सांध्य / रात्रि (05:00 PM onwards)', labelEn: '🌙 Evening & Night' }
            ].map(slot => (
              <button
                key={slot.id}
                onClick={() => setSelectedSlot(slot.id)}
                style={{
                  background: selectedSlot === slot.id ? 'rgba(101, 0, 21, 0.12)' : 'rgba(255, 255, 255, 0.7)',
                  color: selectedSlot === slot.id ? '#650015' : '#64748B',
                  border: selectedSlot === slot.id ? '1px solid #650015' : '1px solid rgba(203, 213, 225, 0.7)',
                  borderRadius: '14px',
                  padding: '4px 10px',
                  fontSize: '11.5px',
                  fontWeight: selectedSlot === slot.id ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {lang === 'hi' ? slot.labelHi : slot.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Chronological Event Cards Grid (Cards view matching Competitions) */}
        <div 
          className="event-cards-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '16px',
            marginBottom: '32px'
          }}
        >
          {filteredEvents.map((evt) => {
            const isJayantiDay = evt.dateIso === '2026-10-11';
            const isNext = evt.id === nextEvent.id;
            const emoji = getEmojiForEvent(evt);

            return (
              <div
                key={evt.id}
                onClick={() => setActiveDetailEvent(evt)}
                style={{
                  background: isNext 
                    ? 'linear-gradient(135deg, #FFFDF8 0%, #FEF9ED 100%)' 
                    : '#FFFDF9',
                  borderRadius: '18px',
                  border: isNext 
                    ? '2px solid #DFBD74' 
                    : (isJayantiDay ? '1.5px solid rgba(223, 189, 116, 0.7)' : '1.5px solid rgba(197, 160, 89, 0.45)'),
                  boxShadow: isNext 
                    ? '0 8px 24px rgba(223, 189, 116, 0.25)' 
                    : '0 4px 16px rgba(101, 0, 21, 0.05)',
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
                  e.currentTarget.style.boxShadow = isNext 
                    ? '0 8px 24px rgba(223, 189, 116, 0.25)' 
                    : '0 4px 16px rgba(101, 0, 21, 0.05)';
                  e.currentTarget.style.borderColor = isNext 
                    ? '#DFBD74' 
                    : (isJayantiDay ? 'rgba(223, 189, 116, 0.7)' : 'rgba(197, 160, 89, 0.45)');
                }}
              >
                {/* Left Illustrated / Icon Box (Matching App Thumbnail) */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '16px',
                  background: isNext 
                    ? 'linear-gradient(135deg, #650015 0%, #851528 100%)' 
                    : 'linear-gradient(135deg, #4A000D 0%, #680016 100%)',
                  border: '2px solid #DFBD74',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 3px 10px rgba(101, 0, 21, 0.12), inset 0 0 10px rgba(0,0,0,0.35)',
                  overflow: 'hidden'
                }}>
                  {evt.wallpaperUrl ? (
                    <img 
                      src={evt.wallpaperUrl} 
                      alt={evt.competition} 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }} 
                    />
                  ) : (
                    <span style={{ fontSize: '34px' }}>{emoji}</span>
                  )}
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
                      {lang === 'hi' ? evt.competitionHi : evt.competition}
                    </h3>

                    {/* Badge */}
                    {isNext ? (
                      <span style={{
                        background: 'rgba(223, 189, 116, 0.25)',
                        color: '#650015',
                        border: '1px solid #DFBD74',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 800,
                        flexShrink: 0,
                        whiteSpace: 'nowrap'
                      }}>
                        ⚡ {lang === 'hi' ? 'अगला' : 'Next'}
                      </span>
                    ) : isJayantiDay ? (
                      <span style={{
                        background: '#FAF0E6',
                        color: '#851528',
                        border: '1px solid #DFBD74',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 800,
                        flexShrink: 0,
                        whiteSpace: 'nowrap'
                      }}>
                        ⭐ {lang === 'hi' ? 'मुख्य जयंती' : 'Jayanti'}
                      </span>
                    ) : (
                      <span style={{
                        background: '#F8F5F0',
                        color: '#7D6A58',
                        border: '1px solid rgba(197, 160, 89, 0.35)',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 700,
                        flexShrink: 0,
                        whiteSpace: 'nowrap'
                      }}>
                        {evt.date}
                      </span>
                    )}
                  </div>

                  {/* Category */}
                  <div style={{
                    fontSize: '12.5px',
                    color: '#553C33',
                    fontWeight: 600,
                    marginBottom: '4px',
                    lineHeight: 1.3
                  }}>
                    {lang === 'hi' ? evt.categoryHi : evt.category}
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
                    <CalendarIcon size={12} color="#851528" />
                    <span>{lang === 'hi' ? `${evt.dayLabelHi} • ${evt.time}` : `${evt.dayLabelEn} • ${evt.time}`}</span>
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
                    <span>{lang === 'hi' ? evt.venueHi : evt.venue}</span>
                  </div>
                </div>

                {/* Right Arrow */}
                <ChevronRight size={16} color="#C5A059" style={{ flexShrink: 0 }} />
              </div>
            );
          })}
        </div>

        {/* Bottom Notice / Rule link */}
        <div style={{
          marginTop: '28px',
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.65)',
          border: '1px solid rgba(197, 160, 89, 0.3)',
          borderRadius: '14px',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          color: '#650015',
          fontSize: '13px',
          fontWeight: 600
        }}>
          <span>
            {lang === 'hi' 
              ? '📌 सभी प्रतियोगिताओं हेतु पूर्व पंजीकरण अनिवार्य है। समय पर उपस्थित होकर अग्रसेन जयंती महोत्सव को सफल बनाएं।' 
              : '📌 Prior registration is encouraged for all competitions. Please arrive 15 minutes before your scheduled slot.'}
          </span>
        </div>
              </>
            )}
          </>
        )}

        {/* Event Detail Modal */}
        {activeDetailEvent && createPortal(
          <div
            onClick={() => setActiveDetailEvent(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.78)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px 16px',
              zIndex: 99999,
              boxSizing: 'border-box'
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#FAF5ED',
                borderRadius: '24px',
                border: '2px solid #DFBD74',
                maxWidth: '500px',
                width: '100%',
                maxHeight: '88vh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
                position: 'relative',
                animation: 'fadeInCard 0.25s ease-out'
              }}
            >
              {/* 1. Pinned Non-Colliding Sticky Header */}
              <div style={{
                background: 'linear-gradient(135deg, #650015 0%, #4A000D 100%)',
                padding: '16px 20px',
                borderBottom: '2px solid #DFBD74',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
                color: '#FFF'
              }}>
                <div style={{ textAlign: 'left', flex: 1, paddingRight: '12px' }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    color: '#DFBD74',
                    fontWeight: 700,
                    marginBottom: '2px',
                    letterSpacing: '0.5px'
                  }}>
                    <Sparkles size={12} color="#FFE17D" />
                    <span>{lang === 'hi' ? 'कार्यक्रम विवरण' : 'Event Details'}</span>
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '19px',
                    fontWeight: 800,
                    color: '#FFFDF9',
                    margin: 0,
                    lineHeight: 1.2
                  }}>
                    {lang === 'hi' ? activeDetailEvent.competitionHi : activeDetailEvent.competition}
                  </h3>
                  {activeDetailEvent.tagline && (
                    <div style={{
                      fontSize: '11.5px',
                      color: '#E5DAC6',
                      marginTop: '3px',
                      fontStyle: 'italic',
                      lineHeight: 1.3
                    }}>
                      {activeDetailEvent.tagline}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveDetailEvent(null)}
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(223, 189, 116, 0.5)',
                    color: '#FFE17D',
                    borderRadius: '50%',
                    width: '34px',
                    height: '34px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0,
                    transition: 'all 0.15s ease'
                  }}
                  title={lang === 'hi' ? 'बंद करें' : 'Close'}
                >
                  <X size={18} />
                </button>
              </div>

              {/* 2. Scrollable Modal Body */}
              <div style={{
                padding: '18px 20px 24px 20px',
                overflowY: 'auto',
                flex: 1
              }}>
                {/* Visual Wallpaper matching the mobile app screenshot banner */}
                {activeDetailEvent.wallpaperUrl && (
                  <div style={{
                    width: '100%',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    marginBottom: '16px',
                    border: '1.5px solid rgba(197, 160, 89, 0.45)',
                    boxShadow: '0 4px 14px rgba(101, 0, 21, 0.08)',
                    maxHeight: '220px',
                    background: '#4A000D'
                  }}>
                    <img 
                      src={activeDetailEvent.wallpaperUrl} 
                      alt={activeDetailEvent.competition} 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }} 
                    />
                  </div>
                )}

                {/* Unified Timing & Venue Card */}
                <div style={{
                  background: '#FFFDF9',
                  border: '1.5px solid rgba(197, 160, 89, 0.45)',
                  borderRadius: '16px',
                  padding: '16px',
                  boxShadow: '0 4px 14px rgba(101, 0, 21, 0.05)',
                  marginBottom: '18px'
                }}>
                  {/* Date & Time Row */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px',
                    paddingBottom: '12px',
                    borderBottom: '1px solid rgba(197, 160, 89, 0.25)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CalendarIcon size={16} color="#851528" />
                      <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#4A000D' }}>
                        {lang === 'hi' ? activeDetailEvent.dayLabelHi : activeDetailEvent.dayLabelEn}
                      </span>
                    </div>

                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      background: 'linear-gradient(135deg, #650015 0%, #4A000D 100%)',
                      color: '#FFE17D',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '12.5px',
                      fontWeight: 800
                    }}>
                      <Clock size={13} color="#FFE17D" />
                      <span>{activeDetailEvent.time}</span>
                    </div>
                  </div>

                  {/* Location & Navigation Link */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px',
                    paddingTop: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={15} color="#8D6409" />
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#5B4136' }}>
                        {lang === 'hi' ? activeDetailEvent.venueHi : activeDetailEvent.venue}
                      </span>
                    </div>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeDetailEvent.venue + ' Balotra Rajasthan')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        background: '#FAF5ED',
                        color: '#650015',
                        border: '1px solid #DFBD74',
                        borderRadius: '8px',
                        padding: '5px 12px',
                        fontSize: '12px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        boxShadow: '0 2px 6px rgba(101, 0, 21, 0.05)'
                      }}
                    >
                      <Navigation size={12} color="#8D6409" />
                      <span>{lang === 'hi' ? 'स्थान देखें (Navigate)' : 'Navigate'}</span>
                    </a>
                  </div>

                  {/* Calendar and Share Action Bar */}
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    marginTop: '14px',
                    paddingTop: '12px',
                    borderTop: '1px dashed rgba(197, 160, 89, 0.3)'
                  }}>
                    <a
                      href={generateGoogleCalendarUrl(activeDetailEvent)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        flex: 1,
                        background: 'linear-gradient(135deg, #DFBD74 0%, #C5A059 100%)',
                        color: '#49000D',
                        border: '1px solid #FFF',
                        borderRadius: '10px',
                        padding: '8px 10px',
                        fontSize: '11.5px',
                        fontWeight: 800,
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                      }}
                    >
                      <CalendarIcon size={13} />
                      <span>{lang === 'hi' ? 'कैलेंडर में जोड़ें' : 'Add to Calendar'}</span>
                    </a>

                    <a
                      href={generateWhatsAppLink(activeDetailEvent)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        flex: 1,
                        background: 'rgba(37, 211, 102, 0.1)',
                        color: '#128C7E',
                        border: '1px solid rgba(37, 211, 102, 0.35)',
                        borderRadius: '10px',
                        padding: '8px 10px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px'
                      }}
                    >
                      <Share2 size={13} color="#128C7E" />
                      <span>{lang === 'hi' ? 'व्हाट्सएप पर शेयर' : 'Share'}</span>
                    </a>
                  </div>
                </div>

                {/* About & Instructions Card */}
                <div style={{
                  background: '#FFFDF9',
                  border: '1.5px solid rgba(197, 160, 89, 0.45)',
                  borderRadius: '16px',
                  padding: '16px 18px',
                  boxShadow: '0 4px 14px rgba(101, 0, 21, 0.05)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '12px'
                  }}>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(197, 160, 89, 0.35)' }} />
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      letterSpacing: '0.12em',
                      color: '#8D6409',
                      textTransform: 'uppercase'
                    }}>
                      {lang === 'hi' ? '॥ विवरण एवं दिशा-निर्देश ॥' : '॥ Details & Guidelines ॥'}
                    </span>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(197, 160, 89, 0.35)' }} />
                  </div>

                  {/* Main About / Description Text */}
                  <p style={{
                    fontSize: '13.5px',
                    color: '#3B2D26',
                    lineHeight: 1.65,
                    margin: '0 0 14px 0',
                    whiteSpace: 'pre-line'
                  }}>
                    {lang === 'hi' 
                      ? (activeDetailEvent.descriptionHi || activeDetailEvent.aboutText || activeDetailEvent.description)
                      : (activeDetailEvent.aboutText || activeDetailEvent.description)}
                  </p>

                  {/* Bullet Points Section */}
                  {activeDetailEvent.bulletPoints && activeDetailEvent.bulletPoints.length > 0 && (
                    <div style={{
                      background: 'rgba(250, 245, 237, 0.7)',
                      border: '1px solid rgba(197, 160, 89, 0.3)',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      marginTop: '12px'
                    }}>
                      <h5 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '14px',
                        fontWeight: 800,
                        color: '#650015',
                        margin: '0 0 8px 0'
                      }}>
                        {activeDetailEvent.bulletTitle || (lang === 'hi' ? 'विशेष दिशा-निर्देश' : 'Important to know')}
                      </h5>
                      <ul style={{
                        margin: 0,
                        paddingLeft: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        fontSize: '12.5px',
                        color: '#4A3B32',
                        lineHeight: 1.5
                      }}>
                        {activeDetailEvent.bulletPoints.map((pt: string, pIdx: number) => (
                          <li key={pIdx}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Multi-Section Detailed Points (e.g. Grand Procession) */}
                  {activeDetailEvent.sections && activeDetailEvent.sections.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '14px' }}>
                      {activeDetailEvent.sections.map((sec, sIdx) => (
                        <div key={sIdx} style={{
                          background: 'rgba(250, 245, 237, 0.7)',
                          border: '1px solid rgba(197, 160, 89, 0.3)',
                          borderRadius: '12px',
                          padding: '12px 14px'
                        }}>
                          <h5 style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '14px',
                            fontWeight: 800,
                            color: '#650015',
                            margin: '0 0 6px 0'
                          }}>
                            {sec.title}
                          </h5>
                          {sec.points && (
                            <ul style={{
                              margin: 0,
                              paddingLeft: '16px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '5px',
                              fontSize: '12.5px',
                              color: '#4A3B32',
                              lineHeight: 1.5
                            }}>
                              {sec.points.map((pt: string, pIdx: number) => (
                                <li key={pIdx}>{pt}</li>
                              ))}
                            </ul>
                          )}
                          {sec.text && (
                            <p style={{
                              fontSize: '12.5px',
                              color: '#4A3B32',
                              lineHeight: 1.5,
                              margin: '6px 0 0 0',
                              whiteSpace: 'pre-line'
                            }}>
                              {sec.text}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Footer Note */}
                  {activeDetailEvent.footerNote && (
                    <p style={{
                      marginTop: '12px',
                      fontSize: '12px',
                      color: '#7D6A58',
                      fontStyle: 'italic',
                      lineHeight: 1.4,
                      borderTop: '1px dashed rgba(197, 160, 89, 0.3)',
                      paddingTop: '10px',
                      marginBottom: 0
                    }}>
                      {activeDetailEvent.footerNote}
                    </p>
                  )}
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setActiveDetailEvent(null)}
                  style={{
                    width: '100%',
                    marginTop: '18px',
                    background: 'linear-gradient(135deg, #650015 0%, #4A000D 100%)',
                    color: '#FFE17D',
                    border: '1.5px solid #DFBD74',
                    borderRadius: '12px',
                    padding: '10px',
                    fontSize: '13px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(101, 0, 21, 0.15)'
                  }}
                >
                  {lang === 'hi' ? 'बंद करें (Close)' : 'Close'}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      </div>

      <style>{`
        @media (max-width: 640px) {
          .event-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
