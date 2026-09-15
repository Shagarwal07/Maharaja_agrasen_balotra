import React, { useState, useEffect, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Award, Download, CheckCircle2, Landmark } from 'lucide-react';
import type { Language } from '../data/translations';

interface AgrohaBuilderProps {
  lang: Language;
  soundEnabled: boolean;
}

// 50 Columns x 50 Rows = 2,500 micro-bricks!
// Tiny 7px blocks so user cannot read text inside them, creating an authentic grand temple mosaic
const COLS = 50;
const ROWS = 50;
const TOTAL = COLS * ROWS; // 2500
const PRESCRIBED_TARGET = 2500; // Prescribed milestone number for 100% completion

// Reserved milestone slot for the user (Row 49, Col 25 - pinnacle sanctum entrance keystone)
const USER_RESERVED_SLOT = 2474;

// Rich authentic Rajasthani temple stone, terracotta, and heritage maroon tones
const BRICK_TONES = [
  '#6b1e2b', '#7a2534', '#5c1a25', '#8B263E', '#9E2A2B',
  '#541212', '#781D26', '#872341', '#661622', '#7B1826'
];
const ACCENT_GOLD_TONES = ['#cfa233', '#d9b34a', '#b88b20', '#e6c665'];

// Community member pool for hover insights
const SAMAJ_CONTRIBUTORS = [
  'सुरेश कुमार गर्ग (बालोतरा)', 'अमित बंसल (जयपुर)', 'दीपक मित्तल (जोधपुर)', 'राजेश जिंदल (बाड़मेर)',
  'विपुल गोयल (बालोतरा)', 'सुनील सिंघल (अहमदाबाद)', 'पवन कंसल (सूरत)', 'विकास मोदी (बालोतरा)',
  'अनिल बिन्दल (बीकानेर)', 'संजय तायल (उदयपुर)', 'मनोज ऐरण (पाली)', 'रोहित धिरण (बालोतरा)',
  'कैलाश गर्ग (बालोतरा)', 'महेश बंसल (जालोर)', 'ओमप्रकाश मित्तल (बालोतरा)', 'विनोद सिंघल (नागौर)',
  'कमल गोयल (बालोतरा)', 'नवीन जिंदल (दिल्ली)', 'मुकेश कंसल (बालोतरा)', 'राकेश मोदी (मुंबई)',
  'प्रमोद बिन्दल (बालोतरा)', 'अशोक तायल (पुणे)', 'संतोष ऐरण (बालोतरा)', 'दिनेश धिरण (सिरोही)',
  'नंदकिशोर गर्ग (बालोतरा)', 'गोपाल बंसल (कोलकाता)', 'हनुमान मित्तल (बालोतरा)', 'श्याम सिंघल (चेन्नई)',
  'रामनारायण गोयल (बालोतरा)', 'गिरधारी जिंदल (अजमेर)', 'बजरंग कंसल (बालोतरा)', 'मदनलाल मोदी (हैदराबाद)',
  'किशन बिन्दल (बालोतरा)', 'तुलसीदास तायल (इंदौर)', 'ललित ऐरण (बालोतरा)', 'पूरणमल धिरण (कोटा)',
  'जगदीश गर्ग (बालोतरा)', 'ताराचंद बंसल (बेंगलुरु)', 'मुरलीधर मित्तल (बालोतरा)', 'रतन सिंघल (सूरत)',
  'बंशीधर गोयल (बालोतरा)', 'शिवकुमार जिंदल (बालोतरा)', 'शंकरलाल कंसल (जयपुर)', 'द्वारकाप्रसाद मोदी',
  'भंवरलाल बिन्दल (बालोतरा)', 'छगनलाल तायल (बालोतरा)', 'रूपचंद ऐरण (जोधपुर)', 'मोतीलाल धिरण (बालोतरा)',
  'हरिप्रसाद गर्ग (बालोतरा)', 'कन्हैयालाल बंसल (बाड़मेर)', 'नेमीचंद मित्तल (बालोतरा)', 'माणकचंद सिंघल',
  'सोहनलाल गोयल (बालोतरा)', 'रामेश्वर जिंदल (बालोतरा)', 'दामोदर कंसल (पाली)', 'मांगीलाल मोदी (बालोतरा)',
  'सत्यनारायण बिन्दल', 'जयकिशन तायल (बालोतरा)', 'महेन्द्र ऐरण (जालोर)', 'त्रिलोक धिरण (बालोतरा)',
  'बाबूलाल गर्ग (बालोतरा)', 'पारसमल बंसल (सिरोही)', 'चम्पालाल मित्तल (बालोतरा)', 'घेवरचंद सिंघल',
  'शांतिलाल गोयल (बालोतरा)', 'प्रकाश जिंदल (बालोतरा)', 'नरेन्द्र कंसल (जोधपुर)', 'जितेन्द्र मोदी (बालोतरा)',
  'धर्मेन्द्र बिन्दल (सूरत)', 'सुरेन्द्र तायल (बालोतरा)', 'गौतम ऐरण (अहमदाबाद)', 'प्रवीण धिरण (बालोतरा)',
  'लोकेश गर्ग (बालोतरा)', 'हितेश बंसल (बालोतरा)', 'गौरव मित्तल (जयपुर)', 'सौरभ सिंघल (बालोतरा)',
  'पंकज गोयल (बालोतरा)', 'अंकुर जिंदल (दिल्ली)', 'मयंक कंसल (बालोतरा)', 'राहुल मोदी (मुंबई)',
  'रोहन बिन्दल (बालोतरा)', 'हर्ष तायल (बालोतरा)', 'आयुष ऐरण (इंदौर)', 'नमन धिरण (बालोतरा)',
  'आदित्य गर्ग (बालोतरा)', 'अभिषेक बंसल (बालोतरा)', 'विवेक मित्तल (पुणे)', 'वैभव सिंघल (बालोतरा)',
  'चिराग गोयल (बालोतरा)', 'अक्षत जिंदल (बालोतरा)', 'ऋषभ कंसल (बालोतरा)', 'हर्षित मोदी (बालोतरा)',
  'सिद्धार्थ बिन्दल (बालोतरा)', 'निखिल तायल (जोधपुर)', 'तुषार ऐरण (बालोतरा)', 'कार्तिक धिरण (बालोतरा)',
  'शिवम गर्ग (बालोतरा)', 'अर्णव बंसल (बालोतरा)', 'प्रियांशु मित्तल (बालोतरा)'
];

// Helper to determine cell type in 50x50 architectural grid
function getCellRole(row: number, col: number): 'door' | 'window' | 'brick' {
  // Grand Arched Central Doorway (rows 35 to 49, cols 20 to 29)
  if (row >= 35 && row <= 49 && col >= 20 && col <= 29) {
    // Arch curvature near the top
    if (row === 35 && (col <= 22 || col >= 27)) return 'brick';
    if (row === 36 && (col <= 21 || col >= 28)) return 'brick';
    return 'door';
  }

  // Left Arched Window (rows 16 to 28, cols 8 to 14)
  if (row >= 16 && row <= 28 && col >= 8 && col <= 14) {
    if (row === 16 && (col === 8 || col === 14)) return 'brick';
    return 'window';
  }

  // Right Arched Window (rows 16 to 28, cols 35 to 41)
  if (row >= 16 && row <= 28 && col >= 35 && col <= 41) {
    if (row === 16 && (col === 35 || col === 41)) return 'brick';
    return 'window';
  }

  // Center Rosetta Upper Window (rows 8 to 16, cols 21 to 28)
  if (row >= 8 && row <= 16 && col >= 21 && col <= 28) {
    if ((row === 8 || row === 16) && (col <= 22 || col >= 27)) return 'brick';
    return 'window';
  }

  return 'brick';
}

export const AgrohaBuilder: React.FC<AgrohaBuilderProps> = ({ lang, soundEnabled }) => {
  const [userName, setUserName] = useState('');
  const [userCity, setUserCity] = useState('बालोतरा');
  const [isPlacing, setIsPlacing] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showContributeModal, setShowContributeModal] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Retrieve or initialize actual community clicks count (default 2499 for fresh user)
  const [actualClicks, setActualClicks] = useState<number>(() => {
    try {
      const storedClicks = localStorage.getItem('samaj_bhavan_total_clicks');
      if (storedClicks) {
        const parsed = parseInt(storedClicks, 10);
        if (!isNaN(parsed) && parsed >= 2499) return parsed;
      }
    } catch {
      // ignore
    }
    return PRESCRIBED_TARGET - 1; // 2,499: awaiting the user's milestone contribution
  });

  // Track if this user has contributed
  const [hasContributed, setHasContributed] = useState<boolean>(() => {
    try {
      return !!localStorage.getItem('my-samaj-piece-v2');
    } catch {
      return false;
    }
  });

  const [myPieceName, setMyPieceName] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('my-samaj-piece-v2');
      return saved ? JSON.parse(saved).name : '';
    } catch {
      return '';
    }
  });

  // Check completion: only appears 100% complete if actual clicks >= prescribed target
  const isComplete = actualClicks >= PRESCRIBED_TARGET;

  // Synthesize royal sound effects (temple bell + shankh frequency)
  const playAudioCue = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      
      // Coin clink / brick placement sound
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1150, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1600, audioCtx.currentTime + 0.08);
      osc.frequency.exponentialRampToValueAtTime(750, audioCtx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.45);

      // Temple chime echo
      setTimeout(() => {
        const chime = audioCtx.createOscillator();
        const chimeGain = audioCtx.createGain();
        chime.type = 'sine';
        chime.frequency.setValueAtTime(880, audioCtx.currentTime);
        chimeGain.gain.setValueAtTime(0.25, audioCtx.currentTime);
        chimeGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
        chime.connect(chimeGain);
        chimeGain.connect(audioCtx.destination);
        chime.start();
        chime.stop(audioCtx.currentTime + 0.85);
      }, 120);
    } catch {
      // audio context not available
    }
  };

  // Handle adding user support
  const handleAddSupport = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasContributed || isPlacing) return;

    const trimmedName = userName.trim() || (lang === 'hi' ? 'अग्र-बंधु' : 'Agra Bandhu');
    const fullDisplayName = userCity.trim() ? `${trimmedName} (${userCity.trim()})` : trimmedName;

    setIsPlacing(true);
    playAudioCue();

    setTimeout(() => {
      const nextCount = actualClicks + 1;
      setActualClicks(nextCount);
      setHasContributed(true);
      setMyPieceName(fullDisplayName);
      setIsPlacing(false);

      try {
        localStorage.setItem('samaj_bhavan_total_clicks', String(nextCount));
        localStorage.setItem('my-samaj-piece-v2', JSON.stringify({
          name: fullDisplayName,
          index: USER_RESERVED_SLOT,
          ts: Date.now(),
          brickNo: nextCount
        }));
      } catch {
        // ignore
      }

      // Celebrate with confetti
      confetti({
        particleCount: 90,
        spread: 100,
        origin: { y: 0.65 },
        colors: ['#cfa233', '#6b1e2b', '#e6c665', '#FAF5ED', '#FF9933']
      });

      setShowContributeModal(false);

      // Open certificate modal with personal congratulations
      setTimeout(() => {
        setShowCertificate(true);
      }, 400);
    }, 600);
  };

  // Draw personalized Sankalp Patra certificate on high-res Canvas
  const drawCertificate = (name: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 840;
    canvas.height = 590;

    // Background
    ctx.fillStyle = '#FAF5ED';
    ctx.fillRect(0, 0, 840, 590);

    // Double Royal Gold Border
    ctx.strokeStyle = '#cfa233';
    ctx.lineWidth = 9;
    ctx.strokeRect(22, 22, 796, 546);
    ctx.lineWidth = 2.5;
    ctx.strokeRect(36, 36, 768, 518);

    // Top Header
    ctx.fillStyle = '#6b1e2b';
    ctx.font = 'bold 24px "Noto Serif Devanagari", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('॥ श्री महाराजा अग्रसेन जी की जय ॥', 420, 82);

    ctx.fillStyle = '#9C782F';
    ctx.font = 'bold 15px "Playfair Display", serif';
    ctx.fillText('AGARWAL SAMAJ BALOTRA • BHAVAN NIRMAN SANKALP PATRA', 420, 118);

    // Main Certificate Body
    ctx.fillStyle = '#261A15';
    ctx.font = 'italic 18px "Noto Serif Devanagari", serif';
    ctx.fillText('यह प्रमाणित किया जाता है कि अग्र गौरव', 420, 175);

    ctx.fillStyle = '#6b1e2b';
    ctx.font = 'bold 34px "Playfair Display", "Noto Serif Devanagari", serif';
    ctx.fillText(name, 420, 230);

    ctx.fillStyle = '#7D6A58';
    ctx.font = '16px "Noto Serif Devanagari", serif';
    ctx.fillText('ने "एक रुपया, एक ईंट" के अमर सिद्धांत पर आधारित', 420, 278);

    ctx.fillStyle = '#261A15';
    ctx.font = '16px "Noto Serif Devanagari", serif';
    ctx.fillText('अग्रवाल समाज भवन (बालोतरा) के सामूहिक निर्माण में अपनी पावन ईंट व सहयोग समर्पित कर', 420, 318);
    ctx.fillText('भवन को 2500 ईंटों के पावन लक्ष्य सहित शत-प्रतिशत पूर्ण करने में ऐतिहासिक योगदान दिया।', 420, 348);

    // Highlight Brick details
    ctx.fillStyle = '#6b1e2b';
    ctx.font = 'bold 15px "Playfair Display", "Noto Serif Devanagari", serif';
    ctx.fillText('ईंट संख्या: #2,500 (शिखर पूर्णता ईंट) • कुल समर्पित ईंटें: 2,500 / 2,500', 420, 390);

    // Signature Lines
    ctx.strokeStyle = '#cfa233';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(110, 485);
    ctx.lineTo(290, 485);
    ctx.moveTo(550, 485);
    ctx.lineTo(730, 485);
    ctx.stroke();

    ctx.fillStyle = '#7D6A58';
    ctx.font = '14px "Playfair Display", serif';
    ctx.fillText('दिनांक: 11 अक्टूबर 2026', 200, 510);
    ctx.fillText('अग्रवाल समाज बालोतरा', 640, 510);

    // Royal Golden Seal
    ctx.beginPath();
    ctx.arc(420, 475, 40, 0, Math.PI * 2);
    ctx.fillStyle = '#cfa233';
    ctx.fill();
    ctx.strokeStyle = '#6b1e2b';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#6b1e2b';
    ctx.font = 'bold 12px "Playfair Display", serif';
    ctx.fillText('BALOTRA', 420, 470);
    ctx.fillText('BHAVAN', 420, 486);
  };

  useEffect(() => {
    if (showCertificate && (myPieceName || userName)) {
      setTimeout(() => drawCertificate(myPieceName || userName || 'अग्र-बंधु'), 80);
    }
  }, [showCertificate, myPieceName, userName]);

  const downloadCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `Bhavan_Sankalp_Patra_${myPieceName || 'Agrawal'}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  // Pre-generate 2,500 cells with stable colors & roles (memoized for 60fps)
  const cellDataList = useMemo(() => {
    const list = new Array(TOTAL);
    for (let i = 0; i < TOTAL; i++) {
      const r = Math.floor(i / COLS);
      const c = i % COLS;
      const role = getCellRole(r, c);
      const isUserSlot = (i === USER_RESERVED_SLOT);

      let color = BRICK_TONES[i % BRICK_TONES.length];
      if (role === 'door') {
        color = (c === 20 || c === 29 || r === 35) ? '#cfa233' : '#3d0f17';
      } else if (role === 'window') {
        color = (r % 2 === 0 && c % 2 === 0) ? '#e6c665' : '#4d141e';
      } else if (i % 37 === 0) {
        color = ACCENT_GOLD_TONES[i % ACCENT_GOLD_TONES.length];
      }

      list[i] = {
        role,
        color,
        isUserSlot,
        contributor: isUserSlot ? (myPieceName || 'आपका पावन स्थान (Your Reserved Spot)') : SAMAJ_CONTRIBUTORS[i % SAMAJ_CONTRIBUTORS.length]
      };
    }
    return list;
  }, [myPieceName]);

  // Event delegation hover on facade grid
  const handleGridHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const idxStr = target.getAttribute('data-idx');
    if (idxStr !== null) {
      setHoveredIdx(parseInt(idxStr, 10));
    }
  };

  return (
    <section id="agroha-builder" style={{
      padding: '36px 14px 44px',
      background: 'linear-gradient(180deg, #FAF5ED 0%, #F5EAE0 100%)',
      borderTop: '2px solid rgba(197, 160, 89, 0.35)',
      borderBottom: '2px solid rgba(197, 160, 89, 0.35)'
    }}>
      <div id="app" className="bhavan-app-container">
        {/* Scoped CSS matching authentic architectural domes & micro-grid */}
        <style dangerouslySetInnerHTML={{
          __html: `
          #app :root {
            --maroon: #6b1e2b;
            --maroon-dark: #4a1420;
            --gold: #cfa233;
            --gold-light: #e6c665;
            --cream: #f4ead0;
            --cream-dark: #e6d9b5;
          }

          .bhavan-app-container {
            max-width: 680px;
            margin: 0 auto;
            padding: 24px 20px 30px;
            color: #3a2a1e;
            background: linear-gradient(180deg, #fbf6ea 0%, #f4ead0 100%);
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(107, 30, 43, 0.1), 0 0 0 1px rgba(207, 162, 51, 0.35);
            position: relative;
            box-sizing: border-box;
          }

          #app h1 {
            font-size: 28px;
            margin: 0 0 6px;
            letter-spacing: -0.01em;
            color: #6b1e2b;
            font-family: var(--font-serif);
            font-weight: 800;
            text-align: center;
          }
          #app .hindi-tagline {
            font-size: 17px;
            color: #cfa233;
            font-weight: 700;
            margin-bottom: 8px;
            text-align: center;
            letter-spacing: 0.02em;
          }
          #app .sub {
            font-size: 15px;
            color: #6b5a44;
            margin: 0 auto 20px;
            max-width: 600px;
            text-align: center;
            line-height: 1.65;
          }

          /* Centered layout for Bhavan & Small 1-Eet Action Pill */
          .bhavan-landscape-grid {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 16px;
            width: 100%;
          }

          .bhavan-area-controls {
            width: 100%;
            display: flex;
            justify-content: center;
          }

          .bhavan-area-building {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          /* --- Grand Agroha Fort Architecture (Citadel & Adjacent Buildings) --- */
          #building-wrap { 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            position: relative; 
            padding-top: 32px; 
            margin-top: 0;
          }

          /* Fort Skyline */
          #fort-skyline {
            display: flex;
            align-items: flex-end;
            justify-content: center;
            gap: 6px;
            position: relative;
            z-index: 3;
            margin-bottom: -1px;
          }

          /* Side Wings Roof & Bastions */
          .fort-side-wing-roof {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            width: 72px;
            align-self: flex-end;
          }
          .side-chhatri {
            position: relative;
            display: flex;
            justify-content: center;
            margin-bottom: 2px;
          }
          .side-dome {
            width: 42px !important;
            height: 22px !important;
            background: #6b1e2b;
            border: 1.8px solid #cfa233;
            border-bottom: none;
            border-radius: 100px 100px 0 0 / 50px 50px 0 0;
            box-shadow: inset 0 2px 4px rgba(255,255,255,0.25);
          }
          .side-merlons {
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding: 0 4px;
            box-sizing: border-box;
          }
          .small-merlon {
            border-bottom: 9px solid #cfa233 !important;
            border-left: 5px solid transparent !important;
            border-right: 5px solid transparent !important;
          }
          .side-cornice-band {
            width: 100%;
            height: 6px;
            background: #6b1e2b;
            border-top: 1.5px solid #cfa233;
          }

          /* Fluttering Saffron / Gold Fort Flag */
          .fort-flag {
            position: absolute;
            top: -24px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            align-items: flex-end;
            pointer-events: none;
            z-index: 5;
          }
          .flag-pole {
            width: 2px;
            height: 20px;
            background: #cfa233;
          }
          .flag-pennant {
            width: 16px;
            height: 10px;
            background: linear-gradient(135deg, #FF6F00 0%, #D84315 100%);
            clip-path: polygon(0 0, 100% 50%, 0 100%);
            transform-origin: left center;
            animation: flagWave 2.2s ease-in-out infinite alternate;
          }
          .center-flag {
            top: -30px;
          }
          .center-flag .flag-pole {
            height: 26px;
          }
          .center-flag .main-pennant {
            width: 22px;
            height: 13px;
            background: linear-gradient(135deg, #FFD700 0%, #FF6F00 100%);
          }
          @keyframes flagWave {
            0% { transform: scaleX(0.85) skewY(-3deg); }
            50% { transform: scaleX(1.08) skewY(2deg); }
            100% { transform: scaleX(0.92) skewY(-2deg); }
          }

          /* Central Citadel Roof */
          #center-citadel-roof {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 390px;
          }
          #dome-row {
            display: flex;
            align-items: flex-end;
            justify-content: center;
            gap: 30px;
            position: relative;
            z-index: 2;
            margin-bottom: -2px;
          }
          .chhatri, #main-dome-wrap { position: relative; display: flex; justify-content: center; }
          .chhatri .dome {
            width: 48px; height: 26px;
            background: #6b1e2b;
            border: 2px solid #cfa233;
            border-bottom: none;
            border-radius: 100px 100px 0 0 / 60px 60px 0 0;
            box-shadow: inset 0 2px 4px rgba(255,255,255,0.25);
          }
          .chhatri .finial, #main-dome .finial {
            position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
            width: 3px; height: 10px; background: #cfa233;
          }
          .chhatri .kalash, #main-dome .kalash {
            position: absolute; top: -18px; left: 50%; transform: translateX(-50%);
            width: 7px; height: 7px; border-radius: 50%; background: #e6c665;
            box-shadow: 0 0 6px rgba(230, 198, 101, 0.8);
          }
          #main-dome-wrap { margin: 0 -6px; }
          #main-dome {
            width: 112px; height: 58px;
            background: #6b1e2b;
            border: 3px solid #cfa233;
            border-bottom: none;
            border-radius: 100px 100px 0 0 / 60px 60px 0 0;
            position: relative;
            box-shadow: inset 0 3px 6px rgba(255,255,255,0.3);
          }
          #main-dome .finial { height: 16px; top: -16px; }
          #main-dome .kalash { top: -26px; width: 11px; height: 11px; }

          #parapet {
            display: flex;
            justify-content: space-between;
            width: 390px;
            z-index: 1;
          }
          .merlon {
            width: 0; height: 0;
            border-left: 9px solid transparent;
            border-right: 9px solid transparent;
            border-bottom: 13px solid #cfa233;
          }
          #band {
            width: 390px;
            height: 10px;
            background: #6b1e2b;
            border-top: 2px solid #cfa233;
          }

          /* Fort Facade Row: Left Building + Central Facade + Right Building */
          #fort-facade-row {
            display: flex;
            align-items: stretch;
            justify-content: center;
            gap: 6px;
            position: relative;
            z-index: 2;
          }

          /* Side Fort Buildings (Small Adjacent Buildings) */
          .fort-side-building {
            width: 72px;
            background: linear-gradient(180deg, #ede2c8 0%, #dfcea6 50%, #d4bf92 100%);
            border: 1.5px solid rgba(207, 162, 51, 0.55);
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
            border-radius: 2px;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            overflow: hidden;
            box-sizing: border-box;
            padding: 6px 4px;
          }

          /* Jharokha (Carved sandstone balcony with arch & lattice) */
          .jharokha {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 12px;
          }
          .jharokha-chhajja {
            width: 48px;
            height: 5px;
            background: #6b1e2b;
            border-top: 1.5px solid #cfa233;
            border-radius: 2px 2px 0 0;
          }
          .jharokha-arch {
            width: 36px;
            height: 52px;
            background: #4a1420;
            border: 2px solid #cfa233;
            border-radius: 18px 18px 0 0;
            position: relative;
            overflow: hidden;
            box-shadow: inset 0 3px 8px rgba(0, 0, 0, 0.65);
          }
          .jharokha-jali {
            width: 100%;
            height: 100%;
            background: radial-gradient(#cfa233 1.5px, transparent 1.5px);
            background-size: 5px 5px;
            opacity: 0.8;
          }
          .jharokha-bracket {
            width: 30px;
            height: 6px;
            background: #cfa233;
            clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
          }

          /* Side Stone Band */
          .side-stone-band {
            width: 100%;
            height: 8px;
            background: #6b1e2b;
            border-top: 1px solid #cfa233;
            border-bottom: 1px solid #cfa233;
            margin: 10px 0 14px 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .stone-rosette {
            width: 7px;
            height: 7px;
            background: #cfa233;
            transform: rotate(45deg);
          }

          /* Arrow slit windows */
          .fort-arrow-slit {
            width: 6px;
            height: 20px;
            background: #2b0b12;
            border: 1px solid rgba(207, 162, 51, 0.6);
            border-radius: 3px 3px 0 0;
            margin-bottom: 10px;
            box-shadow: inset 0 2px 5px rgba(0,0,0,0.8);
          }

          /* Stone masonry base */
          .side-bastion-base {
            margin-top: auto;
            width: 100%;
            border-top: 1.5px solid #cfa233;
            background: #cbb98f;
            padding: 3px 0;
            display: flex;
            flex-direction: column;
            gap: 2px;
          }
          .bastion-stone-course {
            height: 5px;
            border-bottom: 1px dashed rgba(107, 30, 43, 0.25);
            background: rgba(255, 255, 255, 0.25);
          }

          /* Central Facade Frame */
          #facade-frame {
            background: #e6d9b5;
            padding: 6px;
            box-shadow: 0 6px 18px rgba(0,0,0,0.18);
            border: 1.5px solid rgba(207, 162, 51, 0.55);
            position: relative;
            border-radius: 2px;
          }
          #facade-grid {
            display: grid;
            grid-template-columns: repeat(50, 1fr);
            gap: 1px;
            width: 375px;
            height: 375px;
            background: #cbb98f;
            cursor: pointer;
            contain: layout style;
          }
          .micro-cell {
            width: 100%;
            height: 100%;
            transition: transform 0.1s ease;
          }
          .micro-cell:hover {
            transform: scale(2.8);
            z-index: 50;
            box-shadow: 0 0 6px #FFD700;
            outline: 1px solid #FFF;
          }
          .user-slot-unfilled {
            animation: pulseSlot 1.2s infinite;
            background: #FFF !important;
            outline: 1.5px solid #FFD700 !important;
            z-index: 10;
          }
          @keyframes pulseSlot {
            0%, 100% { box-shadow: 0 0 2px #cfa233; transform: scale(1); }
            50% { box-shadow: 0 0 8px #FF9933; transform: scale(1.6); }
          }
          .user-slot-filled {
            background: linear-gradient(135deg, #FFD700 0%, #FF9933 100%) !important;
            box-shadow: 0 0 10px #FFD700, 0 0 4px #FFF;
            outline: 1.5px solid #6b1e2b;
            z-index: 15;
            animation: userGlow 2s infinite alternate;
          }
          @keyframes userGlow {
            from { box-shadow: 0 0 4px #FFD700; }
            to { box-shadow: 0 0 12px #FFD700, 0 0 8px #FF9933; }
          }

          /* Full Fort Steps & Rampart Base */
          #steps {
            width: 546px;
            height: 8px;
            background: linear-gradient(180deg, #cfa233, #e6c665);
            z-index: 2;
          }
          #ground {
            width: 562px;
            height: 14px;
            background: linear-gradient(180deg, #8a9c62, #7a8c54);
            border-radius: 0 0 8px 8px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            z-index: 2;
          }

          #complete-banner {
            margin-top: 16px;
            width: 100%;
            box-sizing: border-box;
            text-align: center;
            font-size: 14px;
            font-weight: 700;
            color: #6b1e2b;
            background: #FFFDF9;
            border: 2px solid #cfa233;
            padding: 12px 18px;
            border-radius: 12px;
            box-shadow: 0 6px 18px rgba(207, 162, 51, 0.25);
            animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          @keyframes popIn {
            from { opacity: 0; transform: scale(0.92); }
            to { opacity: 1; transform: scale(1); }
          }

          #controls {
            margin-top: 0;
            padding: 18px;
            background: rgba(255,255,255,0.85);
            border-radius: 14px;
            border: 1px solid rgba(207, 162, 51, 0.4);
            box-shadow: 0 4px 16px rgba(107,30,43,0.06);
          }
          #controls .row {
            display: flex;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
          }
          #label-input {
            flex: 1 1 180px;
            min-width: 140px;
            padding: 12px 16px;
            border-radius: 10px;
            border: 1.5px solid #e6d9b5;
            font-size: 16px;
            background: #FFF;
            color: #3a2a1e;
            outline: none;
          }
          #label-input:focus {
            border-color: #cfa233;
          }
          #city-input {
            flex: 0 1 130px;
            min-width: 105px;
            padding: 12px 14px;
            border-radius: 10px;
            border: 1.5px solid #e6d9b5;
            font-size: 16px;
            background: #FFF;
            color: #3a2a1e;
            outline: none;
          }
          #city-input:focus {
            border-color: #cfa233;
          }
          #fill-btn {
            flex: 1 1 100%;
            width: 100%;
            padding: 13px 22px;
            border-radius: 10px;
            border: 1px solid #cfa233;
            background: #6b1e2b;
            color: #e6c665;
            font-weight: 800;
            font-size: 16.5px;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(107, 30, 43, 0.25);
            transition: all 0.2s ease;
            white-space: nowrap;
            text-align: center;
          }
          #fill-btn:hover:not(:disabled) {
            background: #7a2534;
            transform: translateY(-1px);
            box-shadow: 0 6px 18px rgba(107, 30, 43, 0.35);
          }
          #fill-btn:disabled {
            background: #cbb9a8;
            color: #fff;
            cursor: not-allowed;
            border-color: transparent;
            box-shadow: none;
          }
          #status-msg {
            margin-top: 12px;
            font-size: 15px;
            color: #6b5a44;
            font-weight: 600;
            min-height: 22px;
            text-align: center;
            line-height: 1.55;
          }

          /* Mobile responsiveness: Fort centerpiece on top, followed by action card */
          @media (max-width: 960px) {
            .bhavan-app-container {
              max-width: 660px;
              padding: 24px 16px 32px;
            }
            .bhavan-landscape-grid {
              display: flex;
              flex-direction: column;
              gap: 24px;
            }
            .bhavan-area-building {
              order: 1;
            }
            .bhavan-area-controls {
              order: 2;
            }
            #building-wrap {
              margin-top: 10px;
              padding-top: 24px;
            }
          }

          @media (max-width: 600px) {
            #facade-grid {
              width: 240px !important;
              height: 240px !important;
            }
            #facade-frame {
              padding: 4px !important;
            }
            .fort-side-building, .fort-side-wing-roof {
              width: 44px !important;
            }
            .fort-wing-header {
              display: none !important;
            }
            .jharokha-chhajja {
              width: 30px !important;
            }
            .jharokha-arch {
              width: 24px !important;
              height: 34px !important;
            }
            .jharokha-bracket {
              width: 20px !important;
            }
            #center-citadel-roof, #parapet, #band {
              width: 250px !important;
            }
            #main-dome {
              width: 78px !important;
              height: 42px !important;
            }
            .chhatri .dome {
              width: 32px !important;
              height: 18px !important;
            }
            #dome-row {
              gap: 14px !important;
            }
            #steps {
              width: 348px !important;
            }
            #ground {
              width: 362px !important;
            }
          }
        `}} />

        {/* Section Header: Ek Eent, Ek Rupya — हमारी ऐतिहासिक धरोहर */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          {/* Auspicious Heritage Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(207, 162, 51, 0.14)',
            border: '1px solid rgba(207, 162, 51, 0.45)',
            borderRadius: '20px',
            padding: '4px 16px',
            color: '#8D6409',
            fontSize: '13.5px',
            fontWeight: 700,
            marginBottom: '10px'
          }}>
            <Landmark size={15} color="#8D6409" />
            <span>{lang === 'hi' ? 'हमारी ऐतिहासिक धरोहर' : 'Sacred Heritage'}</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(26px, 3.8vw, 36px)',
            margin: '0 0 10px 0',
            color: '#6b1e2b',
            fontFamily: 'var(--font-serif)',
            fontWeight: 800,
            letterSpacing: '0.3px',
            lineHeight: 1.25
          }}>
            {lang === 'hi' ? 'एक रुपया, एक ईंट' : 'Ek Rupya, Ek Eent'}
          </h2>

          <div style={{
            width: '80px',
            height: '3px',
            background: 'linear-gradient(90deg, transparent, #cfa233, transparent)',
            margin: '0 auto 14px auto'
          }} />

          <p style={{
            fontSize: 'clamp(15.5px, 1.3vw, 17px)',
            color: '#6b5a44',
            margin: '0 auto',
            maxWidth: '620px',
            lineHeight: 1.8
          }}>
            {lang === 'hi'
              ? 'महाराज अग्रसेन जी ने अग्रोहा में नियम बनाया था कि समाज में आने वाले प्रत्येक नए परिवार को हर नागरिक एक रुपया और एक ईंट भेंट करेगा। इसी पावन भाव से यह डिजिटल भवन 2,500 ईंटों से सज रहा है।'
              : 'Maharaja Agrasen Ji instituted the timeless principle in Agroha that every citizen would gift one rupee and one brick to every new family joining the community. In that sacred spirit, this digital bhavan is adorned with 2,500 bricks.'}
          </p>
        </div>

        {/* Landscape Grid (Side-by-Side on Desktop, Seamless Column on Mobile) */}
        <div className="bhavan-landscape-grid">
          {/* Compact 1-Eet Action Pill (No bulky box) */}
          <div className="bhavan-area-controls">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              background: '#FFFDF9',
              border: '1.5px solid rgba(207, 162, 51, 0.45)',
              borderRadius: '50px',
              padding: '8px 18px 8px 20px',
              boxShadow: '0 4px 16px rgba(107, 30, 43, 0.08)',
              width: 'auto',
              maxWidth: '620px',
              flexWrap: 'wrap'
            }}>
              {/* Counter Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Landmark size={18} color="#8D6409" />
                <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#7D6A58' }}>
                  {lang === 'hi' ? 'डिजिटल समर्थन:' : 'Support:'}
                </span>
                <span style={{ fontSize: '20px', fontWeight: 800, color: '#6b1e2b', fontFamily: 'var(--font-serif)', lineHeight: 1 }}>
                  {actualClicks.toLocaleString()}
                </span>
                <span style={{ fontSize: '12px', color: '#9C782F', fontWeight: 600 }}>
                  / 2,500
                </span>
                {!isComplete ? (
                  <span style={{
                    background: 'rgba(207, 162, 51, 0.16)',
                    color: '#8D6409',
                    border: '1px solid rgba(207, 162, 51, 0.4)',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    fontSize: '11.5px',
                    fontWeight: 800
                  }}>
                    {lang === 'hi' ? '1 ईंट शेष' : '1 left'}
                  </span>
                ) : (
                  <span style={{
                    background: 'rgba(34, 139, 34, 0.12)',
                    color: '#2e7d32',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    fontSize: '11.5px',
                    fontWeight: 800,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '3px'
                  }}>
                    <CheckCircle2 size={12} color="#2e7d32" />
                    <span>100%</span>
                  </span>
                )}
              </div>

              {/* Small 1-Eet Button */}
              {!hasContributed ? (
                <button
                  type="button"
                  onClick={() => setShowContributeModal(true)}
                  style={{
                    padding: '7px 16px',
                    background: 'linear-gradient(135deg, #6b1e2b 0%, #8b263e 100%)',
                    color: '#FAF5ED',
                    border: '1.2px solid #cfa233',
                    borderRadius: '24px',
                    fontSize: '13.5px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 3px 10px rgba(107, 30, 43, 0.22)',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.04)';
                    e.currentTarget.style.boxShadow = '0 5px 14px rgba(107, 30, 43, 0.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 3px 10px rgba(107, 30, 43, 0.22)';
                  }}
                >
                  <span style={{ fontSize: '15px' }}>🧱</span>
                  <span>{lang === 'hi' ? '1 ईंट जोड़ें' : 'Add 1 Brick'}</span>
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#6b1e2b' }}>
                    ✓ समर्पित: {myPieceName.split(' ')[0]}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowCertificate(true)}
                    style={{
                      background: 'linear-gradient(135deg, #cfa233 0%, #e6c665 100%)',
                      color: '#4a1420',
                      border: 'none',
                      borderRadius: '16px',
                      padding: '5px 12px',
                      fontSize: '12px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Award size={13} color="#4a1420" />
                    <span>{lang === 'hi' ? 'संकल्प पत्र' : 'Certificate'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>


          {/* 4. Architectural Bhavan Area (Right Column on Desktop, Middle on Mobile) */}
          <div className="bhavan-area-building">
            <div id="building-wrap">
              {/* Grand Fort Skyline: Left Bastion + Central Palace Citadel + Right Bastion */}
              <div id="fort-skyline">
                {/* 1. Left Adjacent Bastion Roof & Chhatri */}
                <div className="fort-side-wing-roof left-wing">
                  <div className="fort-flag">
                    <div className="flag-pole" />
                    <div className="flag-pennant" />
                  </div>
                  <div className="chhatri side-chhatri">
                    <div className="finial" />
                    <div className="kalash" />
                    <div className="dome side-dome" />
                  </div>
                  <div className="side-merlons">
                    <div className="merlon small-merlon" />
                    <div className="merlon small-merlon" />
                    <div className="merlon small-merlon" />
                  </div>
                  <div className="side-cornice-band" />
                </div>

                {/* 2. Central Citadel Domes & Merlons */}
                <div id="center-citadel-roof">
                  <div id="dome-row">
                    <div className="chhatri">
                      <div className="finial" />
                      <div className="kalash" />
                      <div className="dome" />
                    </div>
                    <div id="main-dome-wrap">
                      <div id="main-dome">
                        <div className="fort-flag center-flag">
                          <div className="flag-pole" />
                          <div className="flag-pennant main-pennant" />
                        </div>
                        <div className="finial" />
                        <div className="kalash" />
                      </div>
                    </div>
                    <div className="chhatri">
                      <div className="finial" />
                      <div className="kalash" />
                      <div className="dome" />
                    </div>
                  </div>

                  <div id="parapet">
                    {Array.from({ length: 16 }).map((_, idx) => (
                      <div key={idx} className="merlon" />
                    ))}
                  </div>

                  <div id="band" />
                </div>

                {/* 3. Right Adjacent Bastion Roof & Chhatri */}
                <div className="fort-side-wing-roof right-wing">
                  <div className="fort-flag">
                    <div className="flag-pole" />
                    <div className="flag-pennant" />
                  </div>
                  <div className="chhatri side-chhatri">
                    <div className="finial" />
                    <div className="kalash" />
                    <div className="dome side-dome" />
                  </div>
                  <div className="side-merlons">
                    <div className="merlon small-merlon" />
                    <div className="merlon small-merlon" />
                    <div className="merlon small-merlon" />
                  </div>
                  <div className="side-cornice-band" />
                </div>
              </div>

              {/* Fort Main Body: Left Building + Central Facade Grid + Right Building */}
              <div id="fort-facade-row">
                {/* Left Adjacent Building (Small Fort Wing / Haveli) */}
                <div className="fort-side-building left-building">

                  {/* Upper Carved Jharokha Balcony */}
                  <div className="jharokha">
                    <div className="jharokha-chhajja" />
                    <div className="jharokha-arch">
                      <div className="jharokha-jali" />
                    </div>
                    <div className="jharokha-bracket" />
                  </div>

                  {/* Fort Wall Moulding & Rosette Band */}
                  <div className="side-stone-band">
                    <div className="stone-rosette" />
                  </div>

                  {/* Middle Fort Bastion Windows (Arched Slits) */}
                  <div className="fort-arrow-slit" />
                  <div className="fort-arrow-slit" />

                  {/* Stone Masonry Bastion Base */}
                  <div className="side-bastion-base">
                    <div className="bastion-stone-course" />
                    <div className="bastion-stone-course" />
                  </div>
                </div>

                {/* Central Facade Frame with 50x50 = 2,500 Micro-Bricks Grid */}
                <div id="facade-frame">
                  <div
                    id="facade-grid"
                    onMouseMove={handleGridHover}
                    onMouseLeave={() => setHoveredIdx(null)}
                    onClick={() => {
                      if (!hasContributed) setShowContributeModal(true);
                    }}
                  >
                    {cellDataList.map((c, i) => {
                      const isUserPlaced = (c.isUserSlot && hasContributed);
                      const isUserWaiting = (c.isUserSlot && !hasContributed);

                      return (
                        <div
                          key={i}
                          data-idx={i}
                          className={`micro-cell ${isUserWaiting ? 'user-slot-unfilled' : ''} ${isUserPlaced ? 'user-slot-filled' : ''}`}
                          style={{
                            background: isUserPlaced 
                              ? undefined 
                              : isUserWaiting 
                                ? '#FFF' 
                                : c.color
                          }}
                        />
                      );
                    })}
                  </div>

                  {/* Micro-Brick Contributor Loupe / Tooltip */}
                  {hoveredIdx !== null && (
                    <div style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: hoveredIdx === USER_RESERVED_SLOT ? '#6b1e2b' : '#261A15',
                      color: hoveredIdx === USER_RESERVED_SLOT ? '#e6c665' : '#FFFDF9',
                      padding: '7px 16px',
                      borderRadius: '18px',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      pointerEvents: 'none',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
                      border: '1px solid #cfa233',
                      zIndex: 40
                    }}>
                      {hoveredIdx === USER_RESERVED_SLOT ? (
                        hasContributed 
                          ? `⭐ आपकी समर्पित ईंट (#${actualClicks}) • ${myPieceName} ⭐`
                          : '✨ आपका पावन स्थान (यहाँ जुड़ेगी आपकी ईंट #2,500) ✨'
                      ) : (
                        `ईंट #${hoveredIdx + 1} • समर्पित: ${cellDataList[hoveredIdx]?.contributor}`
                      )}
                    </div>
                  )}
                </div>

                {/* Right Adjacent Building (Small Fort Wing / Haveli) */}
                <div className="fort-side-building right-building">

                  {/* Upper Carved Jharokha Balcony */}
                  <div className="jharokha">
                    <div className="jharokha-chhajja" />
                    <div className="jharokha-arch">
                      <div className="jharokha-jali" />
                    </div>
                    <div className="jharokha-bracket" />
                  </div>

                  {/* Fort Wall Moulding & Rosette Band */}
                  <div className="side-stone-band">
                    <div className="stone-rosette" />
                  </div>

                  {/* Middle Fort Bastion Windows (Arched Slits) */}
                  <div className="fort-arrow-slit" />
                  <div className="fort-arrow-slit" />

                  {/* Stone Masonry Bastion Base */}
                  <div className="side-bastion-base">
                    <div className="bastion-stone-course" />
                    <div className="bastion-stone-course" />
                  </div>
                </div>
              </div>

              {/* Continuous Grand Fort Steps & Rampart Base */}
              <div id="steps" />
              <div id="ground" />
            </div>

            {/* 100% Complete Banner (Appears only if clicks >= prescribed target) */}
            {isComplete && (
              <div id="complete-banner">
                <Sparkles size={18} color="#cfa233" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
                <span>
                  {lang === 'hi'
                    ? '🎉 बधाई! अग्रवाल समाज बालोतरा भवन 100% पूर्ण हुआ — समस्त 2,500 अग्र-बंधुओं के पावन सहयोग से निर्मित!'
                    : '🎉 The Bhavan is 100% complete — built piece by piece by our whole Samaj with 2,500 bricks!'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Contribute 1 Brick Modal */}
        {showContributeModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(20, 10, 12, 0.72)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              zIndex: 9998,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px'
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowContributeModal(false);
            }}
          >
            <div
              style={{
                background: 'linear-gradient(180deg, #FFFDF9 0%, #FAF4E8 100%)',
                borderRadius: '24px',
                padding: '28px 24px',
                maxWidth: '450px',
                width: '100%',
                border: '2px solid #cfa233',
                boxShadow: '0 25px 60px rgba(0,0,0,0.45)',
                position: 'relative'
              }}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowContributeModal(false)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(107, 30, 43, 0.08)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#6b1e2b',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 700
                }}
              >
                ✕
              </button>

              {/* Modal Header */}
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(207, 162, 51, 0.2) 0%, rgba(107, 30, 43, 0.1) 100%)',
                  border: '1.5px solid #cfa233',
                  fontSize: '28px',
                  marginBottom: '10px'
                }}>
                  🧱
                </div>
                <h3 style={{
                  margin: '0 0 6px 0',
                  color: '#6b1e2b',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '22px',
                  fontWeight: 800
                }}>
                  {lang === 'hi' ? '1 ईंट का पावन सहयोग' : 'Contribute 1 Brick'}
                </h3>
                <p style={{
                  margin: 0,
                  fontSize: '13.5px',
                  color: '#7D6A58',
                  lineHeight: 1.55
                }}>
                  {lang === 'hi'
                    ? 'महाराज अग्रसेन जी की "एक रुपया, एक ईंट" परम्परा अनुसार समाज भवन में अपना पावन योगदान समर्पित करें।'
                    : 'Dedicate your sacred brick to the community Bhavan under Maharaja Agrasen’s historic principle.'}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleAddSupport} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    color: '#4a2818',
                    marginBottom: '6px'
                  }}>
                    {lang === 'hi' ? 'आपका शुभ नाम *' : 'Your Full Name *'}
                  </label>
                  <input
                    type="text"
                    autoFocus
                    maxLength={26}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder={lang === 'hi' ? 'जैसे: प्रदीप गर्ग' : 'e.g. Pradeep Garg'}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1.5px solid #e6d9b5',
                      fontSize: '15.5px',
                      background: '#FFF',
                      color: '#261A15',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    color: '#4a2818',
                    marginBottom: '6px'
                  }}>
                    {lang === 'hi' ? 'नगर / गोत्र (वैकल्पिक)' : 'City / Gotra (Optional)'}
                  </label>
                  <input
                    type="text"
                    maxLength={18}
                    value={userCity}
                    onChange={(e) => setUserCity(e.target.value)}
                    placeholder={lang === 'hi' ? 'नगर (जैसे: बालोतरा)' : 'e.g. Balotra'}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1.5px solid #e6d9b5',
                      fontSize: '15.5px',
                      background: '#FFF',
                      color: '#261A15',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Milestone Highlight Pill */}
                <div style={{
                  background: 'rgba(207, 162, 51, 0.15)',
                  border: '1px solid rgba(207, 162, 51, 0.4)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <Sparkles size={18} color="#8D6409" />
                  <span style={{ fontSize: '13px', color: '#6b3b0d', fontWeight: 600 }}>
                    {lang === 'hi'
                      ? 'आपकी ईंट शिखर पूर्णता ईंट (#2,500) के रूप में समर्पित होगी!'
                      : 'Your brick will be placed as the milestone brick (#2,500)!'}
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isPlacing}
                  style={{
                    marginTop: '6px',
                    width: '100%',
                    padding: '13px 20px',
                    background: 'linear-gradient(135deg, #6b1e2b 0%, #4a1420 100%)',
                    color: '#FAF5ED',
                    border: '1.5px solid #cfa233',
                    borderRadius: '14px',
                    fontSize: '16px',
                    fontWeight: 800,
                    cursor: isPlacing ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 6px 18px rgba(107, 30, 43, 0.3)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {isPlacing ? (
                    <span>{lang === 'hi' ? 'ईंट समर्पित हो रही है...' : 'Placing brick...'}</span>
                  ) : (
                    <>
                      <span>🙏</span>
                      <span>{lang === 'hi' ? 'अपनी ईंट समर्पित करें (योगदान दें)' : 'Dedicate Brick & Add Support'}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Certificate Modal */}
        {showCertificate && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}>
            <div style={{
              background: '#FAF5ED',
              borderRadius: '20px',
              padding: '24px',
              maxWidth: '860px',
              width: '100%',
              border: '2px solid #cfa233',
              boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
              textAlign: 'center'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h3 style={{ margin: 0, color: '#6b1e2b', fontFamily: 'var(--font-serif)', fontSize: '20px' }}>
                  अग्रवाल समाज बालोतरा • सम्मान संकल्प पत्र
                </h3>
                <button
                  onClick={() => setShowCertificate(false)}
                  style={{
                    background: 'rgba(107, 30, 43, 0.1)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    fontSize: '16px',
                    color: '#6b1e2b',
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Canvas Preview */}
              <div style={{
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                margin: '0 auto',
                maxWidth: '800px'
              }}>
                <canvas ref={canvasRef} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>

              <div style={{ marginTop: '18px', display: 'flex', justifyContent: 'center', gap: '14px' }}>
                <button
                  onClick={downloadCertificate}
                  style={{
                    background: '#6b1e2b',
                    color: '#e6c665',
                    border: '1px solid #cfa233',
                    borderRadius: '24px',
                    padding: '10px 24px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Download size={16} />
                  <span>{lang === 'hi' ? 'सर्टिफिकेट डाउनलोड करें' : 'Download Certificate'}</span>
                </button>
                <button
                  onClick={() => setShowCertificate(false)}
                  style={{
                    background: '#e6d9b5',
                    color: '#4a1420',
                    border: 'none',
                    borderRadius: '24px',
                    padding: '10px 20px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {lang === 'hi' ? 'बंद करें' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
