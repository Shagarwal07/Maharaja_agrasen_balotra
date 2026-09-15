import React from 'react';

interface CompetitionSvgIconProps {
  title: string;
  size?: number;
}

export const CompetitionSvgIcon: React.FC<CompetitionSvgIconProps> = ({ title, size = 52 }) => {
  const t = title.toLowerCase();

  // 1. Carrom
  if (t.includes('carrom') || t.includes('कैरम')) {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <rect x="6" y="6" width="52" height="52" rx="6" fill="#D2B48C" stroke="#8B5A2B" strokeWidth="2.5" />
        <rect x="11" y="11" width="42" height="42" fill="#FBF3DE" stroke="#A07844" strokeWidth="1" />
        <circle cx="15" cy="15" r="3" fill="#2B1810" />
        <circle cx="49" cy="15" r="3" fill="#2B1810" />
        <circle cx="15" cy="49" r="3" fill="#2B1810" />
        <circle cx="49" cy="49" r="3" fill="#2B1810" />
        {/* Center circle */}
        <circle cx="32" cy="32" r="8" fill="none" stroke="#C0392B" strokeWidth="1.5" />
        <circle cx="32" cy="32" r="2.5" fill="#C0392B" />
        {/* Carrom men */}
        <circle cx="32" cy="27" r="2" fill="#FFFFFF" stroke="#8B5A2B" strokeWidth="0.5" />
        <circle cx="32" cy="37" r="2" fill="#1C1B1A" />
        <circle cx="27" cy="32" r="2" fill="#1C1B1A" />
        <circle cx="37" cy="32" r="2" fill="#FFFFFF" stroke="#8B5A2B" strokeWidth="0.5" />
        {/* Striker */}
        <circle cx="24" cy="44" r="3.5" fill="#FFF5DC" stroke="#C5A059" strokeWidth="1" />
      </svg>
    );
  }

  // 2. Snakes & Ladders
  if (t.includes('snakes') || t.includes('सांप')) {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <rect x="6" y="6" width="52" height="52" rx="6" fill="#6A101C" stroke="#DFBD74" strokeWidth="1.5" />
        {/* Checkered board */}
        <rect x="12" y="12" width="40" height="40" rx="3" fill="#FFF8EB" stroke="#C5A059" strokeWidth="1" />
        <rect x="12" y="12" width="10" height="10" fill="#9C2735" />
        <rect x="32" y="12" width="10" height="10" fill="#9C2735" />
        <rect x="22" y="22" width="10" height="10" fill="#9C2735" />
        <rect x="42" y="22" width="10" height="10" fill="#9C2735" />
        <rect x="12" y="32" width="10" height="10" fill="#9C2735" />
        <rect x="32" y="32" width="10" height="10" fill="#9C2735" />
        <rect x="22" y="42" width="10" height="10" fill="#9C2735" />
        <rect x="42" y="42" width="10" height="10" fill="#9C2735" />
        {/* Snake */}
        <path d="M16 46 Q24 38 20 30 T28 18" fill="none" stroke="#F1C40F" strokeWidth="3" strokeLinecap="round" />
        <circle cx="28" cy="18" r="2" fill="#D35400" />
        {/* Ladder */}
        <line x1="38" y1="46" x2="48" y2="16" stroke="#D3A048" strokeWidth="2" strokeLinecap="round" />
        <line x1="44" y1="48" x2="54" y2="18" stroke="#D3A048" strokeWidth="2" strokeLinecap="round" />
        <line x1="39.5" y1="41" x2="45.5" y2="43" stroke="#D3A048" strokeWidth="1.5" />
        <line x1="42.5" y1="32" x2="48.5" y2="34" stroke="#D3A048" strokeWidth="1.5" />
        <line x1="45.5" y1="23" x2="51.5" y2="25" stroke="#D3A048" strokeWidth="1.5" />
      </svg>
    );
  }

  // 3. Table Tennis
  if (t.includes('table tennis') || t.includes('टेबल टेनिस')) {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <rect x="8" y="18" width="48" height="26" rx="3" fill="#1E5C3B" stroke="#DFBD74" strokeWidth="1.5" />
        {/* Center Net */}
        <line x1="8" y1="31" x2="56" y2="31" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.7" />
        <rect x="30" y="16" width="4" height="30" fill="#ECEFF1" stroke="#90A4AE" strokeWidth="0.8" />
        {/* Red Paddle */}
        <circle cx="24" cy="36" r="11" fill="#C0392B" stroke="#DFBD74" strokeWidth="1.5" />
        <rect x="22" y="47" width="4" height="10" rx="1.5" fill="#8D5524" transform="rotate(-30 24 52)" />
        {/* White Ball */}
        <circle cx="44" cy="24" r="3.5" fill="#FFFDF9" stroke="#CFD8DC" strokeWidth="0.8" />
      </svg>
    );
  }

  // 4. Drawing / Art
  if (t.includes('drawing') || t.includes('चित्रकला')) {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Drawing Board */}
        <rect x="12" y="10" width="40" height="46" rx="4" fill="#F4E8D2" stroke="#8D5524" strokeWidth="2" />
        <rect x="26" y="7" width="12" height="5" rx="1.5" fill="#C5A059" />
        {/* Peacock art */}
        <path d="M26 38 C24 30 34 24 38 28 C42 32 36 44 26 38 Z" fill="#2E86C1" />
        <path d="M38 28 C46 22 48 36 36 38" fill="none" stroke="#27AE60" strokeWidth="2" />
        <circle cx="42" cy="22" r="1.5" fill="#F39C12" />
        <circle cx="48" cy="27" r="1.5" fill="#F39C12" />
        <circle cx="46" cy="34" r="1.5" fill="#F39C12" />
        {/* Color pencils */}
        <line x1="16" y1="44" x2="22" y2="52" stroke="#E74C3C" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="20" y1="42" x2="26" y2="50" stroke="#F1C40F" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="24" y1="40" x2="30" y2="48" stroke="#3498DB" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  // 5. Musical Chair
  if (t.includes('musical') || t.includes('कुर्सी')) {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Circle of Chairs */}
        <circle cx="32" cy="32" r="22" fill="none" stroke="#C5A059" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="32" cy="32" r="11" fill="#FFF7E6" stroke="#851528" strokeWidth="1.5" />
        {/* Musical Note */}
        <path d="M30 36 L30 26 L36 24 L36 34" stroke="#851528" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <ellipse cx="28" cy="36" rx="2.5" ry="2" fill="#851528" />
        <ellipse cx="34" cy="34" rx="2.5" ry="2" fill="#851528" />
        {/* Mini Chairs around circle */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 32 + 20 * Math.cos(rad);
          const y = 32 + 20 * Math.sin(rad);
          return (
            <rect
              key={i}
              x={x - 2.5}
              y={y - 2.5}
              width="5"
              height="5"
              rx="1"
              fill="#D4AC0D"
              stroke="#650015"
              strokeWidth="0.8"
              transform={`rotate(${angle} ${x} ${y})`}
            />
          );
        })}
      </svg>
    );
  }

  // 6. Little Genius
  if (t.includes('genius') || t.includes('प्रश्नोत्तरी') || t.includes('quiz')) {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Open Book */}
        <path d="M12 44 Q22 41 32 44 Q42 41 52 44 L50 28 Q40 25 32 28 Q24 25 14 28 Z" fill="#FAF5ED" stroke="#851528" strokeWidth="1.5" />
        <line x1="32" y1="28" x2="32" y2="44" stroke="#851528" strokeWidth="1.5" />
        {/* Lightbulb */}
        <path d="M32 14 C27 14 24 18 25 22 C26 25 29 27 29 29 L35 29 C35 27 38 25 39 22 C40 18 37 14 32 14 Z" fill="#F7DC6F" stroke="#D4AC0D" strokeWidth="1.5" />
        <line x1="30" y1="31" x2="34" y2="31" stroke="#7F8C8D" strokeWidth="1.5" />
        {/* Glow rays */}
        <line x1="32" y1="8" x2="32" y2="11" stroke="#F39C12" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="22" y1="12" x2="24" y2="14" stroke="#F39C12" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="42" y1="12" x2="40" y2="14" stroke="#F39C12" strokeWidth="1.5" strokeLinecap="round" />
        {/* Question marks */}
        <text x="14" y="20" fill="#E5DAC6" fontSize="10" fontWeight="bold">?</text>
        <text x="46" y="20" fill="#E5DAC6" fontSize="10" fontWeight="bold">?</text>
      </svg>
    );
  }

  // 7. Badminton
  if (t.includes('badminton') || t.includes('बैडमिंटन')) {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Crossed Rackets */}
        <g transform="rotate(30 32 32)">
          <ellipse cx="32" cy="19" rx="10" ry="12" fill="none" stroke="#DFBD74" strokeWidth="2" />
          <line x1="32" y1="31" x2="32" y2="52" stroke="#8D5524" strokeWidth="3" strokeLinecap="round" />
          <line x1="26" y1="19" x2="38" y2="19" stroke="#E5DAC6" strokeWidth="0.8" />
          <line x1="32" y1="10" x2="32" y2="28" stroke="#E5DAC6" strokeWidth="0.8" />
        </g>
        <g transform="rotate(-30 32 32)">
          <ellipse cx="32" cy="19" rx="10" ry="12" fill="none" stroke="#DFBD74" strokeWidth="2" />
          <line x1="32" y1="31" x2="32" y2="52" stroke="#8D5524" strokeWidth="3" strokeLinecap="round" />
          <line x1="26" y1="19" x2="38" y2="19" stroke="#E5DAC6" strokeWidth="0.8" />
          <line x1="32" y1="10" x2="32" y2="28" stroke="#E5DAC6" strokeWidth="0.8" />
        </g>
        {/* Shuttlecock */}
        <circle cx="32" cy="15" r="2.5" fill="#E67E22" />
        <path d="M29.5 15 L26 7 L38 7 L34.5 15 Z" fill="#FFFDF9" stroke="#BDC3C7" strokeWidth="0.8" />
      </svg>
    );
  }

  // 8. Fancy Dress
  if (t.includes('fancy dress') || t.includes('फैंसी ड्रेस')) {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Crown / Mukut */}
        <path d="M18 36 L22 26 L32 32 L42 26 L46 36 Z" fill="#F1C40F" stroke="#B7950B" strokeWidth="1.5" />
        <circle cx="32" cy="24" r="2" fill="#E74C3C" />
        <circle cx="22" cy="25" r="1.5" fill="#3498DB" />
        <circle cx="42" cy="25" r="1.5" fill="#3498DB" />
        {/* Peacock feather */}
        <path d="M32 23 C34 14 42 12 40 18 C38 22 34 23 32 23 Z" fill="#1ABC9C" />
        <ellipse cx="37" cy="17" rx="2" ry="1.5" fill="#2980B9" />
        {/* Flute */}
        <line x1="16" y1="44" x2="48" y2="38" stroke="#D35400" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="24" cy="42.5" r="0.8" fill="#FFF" />
        <circle cx="28" cy="41.8" r="0.8" fill="#FFF" />
        <circle cx="32" cy="41" r="0.8" fill="#FFF" />
        {/* Spectacles */}
        <circle cx="26" cy="48" r="3.5" fill="none" stroke="#C5A059" strokeWidth="1.2" />
        <circle cx="38" cy="48" r="3.5" fill="none" stroke="#C5A059" strokeWidth="1.2" />
        <line x1="29.5" y1="48" x2="34.5" y2="48" stroke="#C5A059" strokeWidth="1.2" />
      </svg>
    );
  }

  // 9. Races (Plain / Three-legged / Octopus)
  if (t.includes('race') || t.includes('दौड़') || t.includes('plain') || t.includes('three-legged') || t.includes('octopus')) {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Track */}
        <path d="M12 50 C20 40 22 30 20 18" stroke="#E5DAC6" strokeWidth="2" strokeDasharray="3 2" />
        <path d="M32 52 C32 40 32 30 32 18" stroke="#E5DAC6" strokeWidth="2" strokeDasharray="3 2" />
        <path d="M52 50 C44 40 42 30 44 18" stroke="#E5DAC6" strokeWidth="2" strokeDasharray="3 2" />
        {/* Finish tape */}
        <path d="M12 26 Q32 32 52 26" stroke="#E74C3C" strokeWidth="3" fill="none" />
        {/* Whistle */}
        <ellipse cx="28" cy="40" rx="6" ry="5" fill="#F1C40F" stroke="#B7950B" strokeWidth="1.5" />
        <rect x="32" y="38" width="10" height="4" rx="1" fill="#F1C40F" stroke="#B7950B" strokeWidth="1.2" />
        <circle cx="28" cy="40" r="1.5" fill="#7D6608" />
      </svg>
    );
  }

  // 10. Cricket
  if (t.includes('cricket') || t.includes('क्रिकेट')) {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Wickets */}
        <line x1="26" y1="20" x2="26" y2="46" stroke="#F39C12" strokeWidth="2" strokeLinecap="round" />
        <line x1="32" y1="20" x2="32" y2="46" stroke="#F39C12" strokeWidth="2" strokeLinecap="round" />
        <line x1="38" y1="20" x2="38" y2="46" stroke="#F39C12" strokeWidth="2" strokeLinecap="round" />
        <line x1="24" y1="20" x2="40" y2="20" stroke="#F39C12" strokeWidth="2.5" strokeLinecap="round" />
        {/* Bat */}
        <path d="M18 16 L22 14 L28 44 L22 47 Z" fill="#E0B075" stroke="#8D5524" strokeWidth="1.5" />
        <line x1="16" y1="12" x2="19" y2="16" stroke="#E74C3C" strokeWidth="2.5" strokeLinecap="round" />
        {/* Ball */}
        <circle cx="44" cy="40" r="6" fill="#C0392B" stroke="#922B21" strokeWidth="1" />
        <path d="M41 36 Q44 40 47 44" stroke="#FFF" strokeWidth="0.8" strokeDasharray="1 1" />
      </svg>
    );
  }

  // 11. Matka Phod
  if (t.includes('matka') || t.includes('मटका')) {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Hanging Ropes */}
        <line x1="32" y1="6" x2="26" y2="22" stroke="#D4AC0D" strokeWidth="1.5" />
        <line x1="32" y1="6" x2="38" y2="22" stroke="#D4AC0D" strokeWidth="1.5" />
        {/* Matka Pot */}
        <ellipse cx="32" cy="22" rx="7" ry="2" fill="#BA4A00" stroke="#6E2C00" strokeWidth="1" />
        <path d="M25 22 C18 28 18 42 32 44 C46 42 46 28 39 22 Z" fill="#D35400" stroke="#6E2C00" strokeWidth="1.5" />
        {/* Ethnic band */}
        <path d="M22 32 Q32 35 42 32" stroke="#FFF" strokeWidth="2" fill="none" />
        <path d="M22 36 Q32 39 42 36" stroke="#F1C40F" strokeWidth="1.5" fill="none" />
        {/* Breaking Stick */}
        <line x1="14" y1="48" x2="50" y2="46" stroke="#B9770E" strokeWidth="3" strokeLinecap="round" />
        {/* Red Blindfold Ribbon */}
        <path d="M18 52 C26 48 38 56 46 50" stroke="#C0392B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
    );
  }

  // 12. Rangoli
  if (t.includes('rangoli') || t.includes('रंगोली')) {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Mandala petals */}
        <circle cx="32" cy="32" r="18" fill="none" stroke="#E67E22" strokeWidth="1.5" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <ellipse
            key={i}
            cx="32"
            cy="18"
            rx="3"
            ry="6"
            fill="#F39C12"
            stroke="#D35400"
            strokeWidth="0.8"
            transform={`rotate(${angle} 32 32)`}
          />
        ))}
        {/* Diya in Center */}
        <circle cx="32" cy="32" r="6" fill="#C0392B" stroke="#F1C40F" strokeWidth="1" />
        <path d="M29 32 Q32 23 35 32 Z" fill="#F1C40F" />
        <circle cx="32" cy="31" r="1.5" fill="#E74C3C" />
      </svg>
    );
  }

  // 13. Rassa Kassi
  if (t.includes('rassa') || t.includes('रस्सा')) {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Braided Rope */}
        <path d="M6 34 Q18 30 32 34 Q46 38 58 34" stroke="#D3A048" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M6 34 Q18 30 32 34 Q46 38 58 34" stroke="#7E5109" strokeWidth="6" strokeDasharray="3 3" strokeLinecap="round" fill="none" />
        {/* Center Knot and Flag */}
        <circle cx="32" cy="34" r="5" fill="#C0392B" stroke="#DFBD74" strokeWidth="1.5" />
        <line x1="32" y1="34" x2="32" y2="12" stroke="#DFBD74" strokeWidth="2" strokeLinecap="round" />
        <path d="M32 12 L44 17 L32 22 Z" fill="#F1C40F" stroke="#B7950B" strokeWidth="1" />
      </svg>
    );
  }

  // 14. Balance The Coin
  if (t.includes('coin') || t.includes('सिक्का')) {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Wooden table */}
        <line x1="8" y1="48" x2="56" y2="48" stroke="#8D5524" strokeWidth="3" strokeLinecap="round" />
        {/* Vertical Coin Balanced on Edge */}
        <ellipse cx="28" cy="32" rx="10" ry="14" fill="#F4D03F" stroke="#B7950B" strokeWidth="2" />
        <ellipse cx="28" cy="32" rx="7" ry="10" fill="none" stroke="#D4AC0D" strokeWidth="1" />
        <text x="24" y="36" fill="#7D6608" fontSize="12" fontWeight="bold">₹</text>
        {/* Stacked Coins */}
        <ellipse cx="46" cy="46" rx="7" ry="3" fill="#F5B041" stroke="#B7950B" strokeWidth="1" />
        <ellipse cx="46" cy="42" rx="7" ry="3" fill="#F5B041" stroke="#B7950B" strokeWidth="1" />
        <ellipse cx="46" cy="38" rx="7" ry="3" fill="#F4D03F" stroke="#B7950B" strokeWidth="1" />
      </svg>
    );
  }

  // Default Trophy
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M20 16 L44 16 L40 36 C40 42 34 44 32 44 C30 44 24 42 24 36 Z" fill="#F4D03F" stroke="#B7950B" strokeWidth="2" />
      <path d="M20 18 C14 18 14 28 20 28" fill="none" stroke="#DFBD74" strokeWidth="2.5" />
      <path d="M44 18 C50 18 50 28 44 28" fill="none" stroke="#DFBD74" strokeWidth="2.5" />
      <rect x="29" y="44" width="6" height="8" fill="#D4AC0D" stroke="#B7950B" strokeWidth="1" />
      <rect x="22" y="52" width="20" height="5" rx="2" fill="#650015" stroke="#DFBD74" strokeWidth="1" />
    </svg>
  );
};
