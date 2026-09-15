import React from 'react';
import { Flame } from 'lucide-react';
import type { Language } from '../data/translations';

interface AartiModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const AartiModal: React.FC<AartiModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

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
        maxWidth: '440px',
        width: '100%',
        maxHeight: '85vh',
        overflowY: 'auto',
        border: '2px solid #C5A059',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(101, 0, 21, 0.1)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            fontSize: '16px',
            color: '#650015',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>

        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'inline-flex', padding: '10px', borderRadius: '50%', background: '#650015', color: '#DFBD74', marginBottom: '8px' }}>
            <Flame size={24} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', color: '#650015', margin: '0 0 4px 0', fontSize: '20px' }}>
            ॥ महाराजा अग्रसेन आरती ॥
          </h3>
          <p style={{ fontSize: '12px', color: '#8C6C38', margin: 0 }}>
            दैनिक भक्ति वंदना
          </p>
        </div>

        <div style={{
          background: '#FFFDF9',
          border: '1px solid rgba(197, 160, 89, 0.4)',
          borderRadius: '16px',
          padding: '16px',
          fontSize: '13px',
          lineHeight: 1.8,
          color: '#3B2418',
          textAlign: 'center',
          fontFamily: 'var(--font-hindi)'
        }}>
          <p>जय श्री अग्रसेन, बाबा जय श्री अग्रसेन।<br/>
          सामाजिक क्रांति के दाता, हरते जन की देन॥</p>

          <p style={{ marginTop: '10px' }}>प्रतापनगर में जनमे, वल्लभ कुल उजियार।<br/>
          मातु भगवती के नंदन, जग के खेवनहार॥</p>

          <p style={{ marginTop: '10px' }}>एक रुपया एक ईंट की, नीति नई अपनाई।<br/>
          दीन दुखी को गले लगाकर, समता दीप जलाई॥</p>

          <p style={{ marginTop: '10px' }}>अठारह गोत्र बनाए, अठारह यज्ञ किए।<br/>
          जीव दया का पाठ पढ़ाया, अमृत घट भर दिए॥</p>

          <p style={{ marginTop: '10px' }}>महालक्ष्मी की कृपा से, धन-वैभव पाया।<br/>
          व्यापार और उद्यम का, मार्ग हमें दिखलाया॥</p>

          <p style={{ marginTop: '10px' }}>आरती अग्रसेन जी की, जो कोई नर गावे।<br/>
          सकल मनोरथ सिद्ध होवे, सुख संपत्ति पावे॥</p>

          <p style={{ marginTop: '12px', fontWeight: 700, color: '#650015' }}>
            ॥ बोलो महाराजा अग्रसेन जी की जय ॥
          </p>
        </div>

        <button
          onClick={onClose}
          style={{
            marginTop: '16px',
            width: '100%',
            background: '#650015',
            color: '#FFFDF9',
            border: '1px solid #DFBD74',
            borderRadius: '12px',
            padding: '10px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          प्रणाम (Close)
        </button>
      </div>
    </div>
  );
};
