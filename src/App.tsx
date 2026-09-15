import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CenterHeroWithTeachings } from './components/CenterHeroWithTeachings';
import { UpcomingEventsTimeline } from './components/UpcomingEventsTimeline';
import { MahotsavPage } from './components/MahotsavPage';
import { HistoryPage } from './components/HistoryPage';
import { DonationPage } from './components/DonationPage';
import { TimelineMap } from './components/TimelineMap';
import { SamajPlacesShowcase } from './components/SamajPlacesShowcase';
import { EditorialGallerySection } from './components/EditorialGallerySection';
import { GallerySection } from './components/GalleryModal';
import { WebsiteFooter } from './components/WebsiteFooter';
import { AartiModal } from './components/AartiModal';
import { BiometricModal } from './components/BiometricModal';
import { EBookModal } from './components/EBookModal';
import type { Language } from './data/translations';

export const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('hi');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isAartiOpen, setIsAartiOpen] = useState<boolean>(false);
  const [isBiometricOpen, setIsBiometricOpen] = useState<boolean>(false);
  const [isEBookOpen, setIsEBookOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'mahotsav' | 'history' | 'donation'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash === '#donation' || hash === '#agroha-builder' || hash === '#builder') return 'donation';
      if (hash === '#history' || hash.startsWith('#tl-')) return 'history';
      if (hash === '#mahotsav' || hash === '#schedule' || hash === '#competitions') return 'mahotsav';
    }
    return 'home';
  });

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#donation' || hash === '#agroha-builder' || hash === '#builder') {
        setCurrentPage('donation');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#history' || hash.startsWith('#tl-')) {
        setCurrentPage('history');
        if (hash.startsWith('#tl-')) {
          setTimeout(() => {
            const el = document.querySelector(hash);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (hash === '#mahotsav' || hash === '#schedule' || hash === '#competitions' || hash === '#karyakarni') {
        setCurrentPage('mahotsav');
        if (hash === '#competitions' || hash === '#karyakarni') {
          setTimeout(() => {
            const el = document.querySelector(hash);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        setCurrentPage('home');
        if (hash && hash !== '#home') {
          setTimeout(() => {
            const el = document.querySelector(hash);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'hi' ? 'en' : 'hi'));
  };

  const handleNavigate = (page: 'home' | 'mahotsav' | 'history' | 'donation', targetId?: string) => {
    setCurrentPage(page);
    const hash = targetId 
      ? (targetId.startsWith('#') ? targetId : `#${targetId}`) 
      : (page === 'donation' ? '#donation' : (page === 'history' ? '#history' : (page === 'mahotsav' ? '#mahotsav' : '#home')));
    window.location.hash = hash;
    if (targetId && targetId !== '#home' && targetId !== '#history' && targetId !== '#mahotsav' && targetId !== '#donation') {
      setTimeout(() => {
        const selector = targetId.startsWith('#') ? targetId : `#${targetId}`;
        const el = document.querySelector(selector);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenRegister = () => {
    handleNavigate('mahotsav');
  };

  return (
    <div className="website-wrapper">
      {/* 1. Full-Width Responsive Website Navbar */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(prev => !prev)}
        onOpenAarti={() => setIsAartiOpen(true)}
        onOpenRegister={handleOpenRegister}
        onOpenEBook={() => setIsEBookOpen(true)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {currentPage === 'mahotsav' ? (
        /* SEPARATE PAGE: Agarsen Jayanti Mahotsav (Full 25 Events Timed Schedule + Competitions) */
        <MahotsavPage
          lang={lang}
          onNavigateHome={() => handleNavigate('home')}
        />
      ) : currentPage === 'history' ? (
        /* SEPARATE PAGE: Comprehensive Life Journey & History of Maharaja Agrasen */
        <HistoryPage
          lang={lang}
          onNavigateHome={() => handleNavigate('home')}
          onNavigateToBuilder={() => handleNavigate('donation')}
        />
      ) : currentPage === 'donation' ? (
        /* SEPARATE PAGE: One Rupee, One Brick (Bhavan Builder & Donation) */
        <DonationPage
          lang={lang}
          soundEnabled={soundEnabled}
          onNavigateHome={() => handleNavigate('home')}
        />
      ) : (
        /* HOME PAGE: Hero + Countdown Timer Banner Widget + History + Memories */
        <>
          {/* 2. Maharaj Agrasen Animation + 18 Gotras Mandala + Curve Design + Automated Teaching Quotes */}
          <CenterHeroWithTeachings
            lang={lang}
            soundEnabled={soundEnabled}
          />

          {/* 2.5. Live Countdown Timer & Upcoming Events Banner */}
          <UpcomingEventsTimeline
            lang={lang}
            onlyBanner={true}
            onNavigate={handleNavigate}
          />

          {/* 3. Historical Timeline & Migration Corridor Section: महाराजा अग्रसेन जीवन गाथा एवं ऐतिहासिक यात्रा */}
          <TimelineMap
            lang={lang}
            onNavigate={handleNavigate}
          />

          {/* 4. Animated 3D Curved Perspective Showcase: अग्रवाल समाज के पावन तीर्थ, मंदिर एवं सेवा भवन */}
          <SamajPlacesShowcase
            lang={lang}
          />

          {/* 5. Editorial Heritage & Stamps Gallery (Design Reference: Calgary Art Gallery) */}
          <EditorialGallerySection
            lang={lang}
          />

          {/* 5. Photo & Video Memories Gallery Section (शोभा यात्रा, सांस्कृतिक संध्या, हवन आदि) */}
          <GallerySection
            lang={lang}
          />
        </>
      )}

      {/* Full-Width Royal Website Footer */}
      <WebsiteFooter
        lang={lang}
        onOpenBiometric={() => setIsBiometricOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Global Modals */}
      <AartiModal
        isOpen={isAartiOpen}
        onClose={() => setIsAartiOpen(false)}
        lang={lang}
      />

      <BiometricModal
        isOpen={isBiometricOpen}
        onClose={() => setIsBiometricOpen(false)}
        lang={lang}
      />

      <EBookModal
        isOpen={isEBookOpen}
        onClose={() => setIsEBookOpen(false)}
        lang={lang}
      />
    </div>
  );
};

export default App;
