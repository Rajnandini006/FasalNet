import React from 'react';

interface FasalNetLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  isDark?: boolean;
}

export const FasalNetLogo: React.FC<FasalNetLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  isDark = false,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const subtitleSizes = {
    sm: 'text-[8px] tracking-[0.18em]',
    md: 'text-[10px] tracking-[0.22em]',
    lg: 'text-[11px] tracking-[0.24em]',
    xl: 'text-xs tracking-[0.26em]',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Official FasalNet Brand Icon Badge */}
      <div className={`relative ${iconSizes[size]} shrink-0 rounded-[22%] bg-gradient-to-b from-[#18753a] to-[#12582b] shadow-sm flex items-center justify-center overflow-hidden border border-emerald-600/30`}>
        <svg viewBox="0 0 100 100" className="w-full h-full p-1" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Warm Sun dot in upper right */}
          <circle cx="71" cy="30" r="11" fill="#fde047" />

          {/* Plant Sprout Back Leaf */}
          <path
            d="M 50 48 C 36 34 22 42 22 56 C 22 70 38 72 50 56 Z"
            fill="#86efac"
            fillOpacity="0.85"
          />

          {/* Plant Sprout Front Leaf */}
          <path
            d="M 50 48 C 64 34 76 40 76 54 C 76 68 60 70 50 56 Z"
            fill="#4ade80"
            fillOpacity="0.9"
          />

          {/* Center Bud Glow */}
          <circle cx="50" cy="50" r="8" fill="#bbf7d0" fillOpacity="0.7" />

          {/* White Sprout Stem */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="82"
            stroke="#ffffff"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col leading-none">
        <div className={`font-extrabold font-display tracking-tight flex items-baseline ${textSizes[size]}`}>
          <span className={isDark ? 'text-white' : 'text-[#0e1726]'}>Fasal</span>
          <span className="text-[#16a34a] font-black">Net</span>
        </div>
        {showSubtitle && (
          <span
            className={`font-bold uppercase mt-0.5 ${subtitleSizes[size]} ${
              isDark ? 'text-emerald-400/90' : 'text-[#50637a]'
            }`}
          >
            AI KISAN MARKET
          </span>
        )}
      </div>
    </div>
  );
};
