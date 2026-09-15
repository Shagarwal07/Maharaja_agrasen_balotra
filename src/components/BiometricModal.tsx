import React, { useState } from 'react';
import { Fingerprint, Check } from 'lucide-react';
import type { Language } from '../data/translations';

interface BiometricModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const BiometricModal: React.FC<BiometricModalProps> = ({ isOpen, onClose, lang }) => {
  const [scanning, setScanning] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  if (!isOpen) return null;

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setAuthenticated(true);
      setTimeout(() => {
        setAuthenticated(false);
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      zIndex: 99999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        background: '#FAF5ED',
        borderRadius: '24px',
        padding: '24px 20px',
        maxWidth: '360px',
        width: '100%',
        border: '2px solid #C5A059',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        textAlign: 'center'
      }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', color: '#650015', margin: '0 0 6px 0' }}>
          {lang === 'hi' ? 'अग्र सदस्य बायोमेट्रिक लॉगिन' : 'Member Biometric Passkey'}
        </h3>
        <p style={{ fontSize: '12px', color: '#7D6A58', margin: '0 0 20px 0' }}>
          {lang === 'hi'
            ? 'फिंगरप्रिंट या फेस आईडी द्वारा सुरक्षित प्रवेश'
            : 'Authenticate securely using Fingerprint or FaceID'}
        </p>

        {/* Biometric Touch Area */}
        <div
          onClick={handleScan}
          style={{
            margin: '0 auto 16px auto',
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            background: authenticated
              ? '#E8F8EE'
              : scanning
              ? 'radial-gradient(circle, #FFE17D 0%, #D4AF37 100%)'
              : 'radial-gradient(circle, #FFFDF9 50%, #EFE7D8 100%)',
            border: authenticated ? '3px solid #1B7F3E' : '3px solid #C5A059',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: scanning ? '0 0 24px #FFD700' : '0 4px 16px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease'
          }}
        >
          {authenticated ? (
            <Check size={44} color="#1B7F3E" />
          ) : (
            <Fingerprint size={48} color={scanning ? '#650015' : '#8E1616'} />
          )}
        </div>

        <p style={{
          fontSize: '13px',
          fontWeight: 700,
          color: authenticated ? '#1B7F3E' : '#650015'
        }}>
          {authenticated
            ? (lang === 'hi' ? 'प्रमाणीकरण सफल!' : 'Verified Successfully!')
            : scanning
            ? (lang === 'hi' ? 'स्कैन हो रहा है...' : 'Scanning Biometrics...')
            : (lang === 'hi' ? 'सत्यापन हेतु स्पर्श करें' : 'Tap sensor to authenticate')}
        </p>

        <div style={{ marginTop: '20px' }}>
          <button
            onClick={onClose}
            style={{
              background: '#EAE0CE',
              color: '#5B4136',
              border: 'none',
              borderRadius: '10px',
              padding: '8px 20px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
