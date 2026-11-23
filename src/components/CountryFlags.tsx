import React from 'react';

interface FlagProps {
  className?: string;
}

export const DrcFlagIcon: React.FC<FlagProps> = ({ className = 'w-6 h-4' }) => (
  <svg
    viewBox="0 0 36 24"
    role="img"
    aria-label="Drapeau de la République Démocratique du Congo"
    className={`${className} rounded-[2px] shadow-xs ring-1 ring-white/25 shrink-0`}
  >
    <rect width="36" height="24" fill="#007FFF" />
    <path d="M0,24 L36,0 L36,4.8 L6.8,24 Z" fill="#F7D618" />
    <path d="M0,19.2 L29.2,0 L36,0 L0,24 Z" fill="#F7D618" />
    <path d="M0,21.2 L32.2,0 L36,0 L36,2.8 L3.8,24 L0,24 Z" fill="#CE1021" />
    <polygon
      points="6.5,2.5 7.45,5.35 10.45,5.35 8.05,7.1 8.95,9.95 6.5,8.2 4.05,9.95 4.95,7.1 2.55,5.35 5.55,5.35"
      fill="#F7D618"
    />
  </svg>
);

export const ChinaFlagIcon: React.FC<FlagProps> = ({ className = 'w-6 h-4' }) => (
  <svg
    viewBox="0 0 36 24"
    role="img"
    aria-label="Drapeau de la Chine"
    className={`${className} rounded-[2px] shadow-xs ring-1 ring-white/25 shrink-0`}
  >
    <rect width="36" height="24" fill="#DE2910" />
    <polygon
      points="6.2,3.4 7.05,6.0 9.8,6.0 7.58,7.6 8.42,10.2 6.2,8.6 3.98,10.2 4.82,7.6 2.6,6.0 5.35,6.0"
      fill="#FFDE00"
    />
    <circle cx="11.8" cy="2.8" r="0.9" fill="#FFDE00" />
    <circle cx="13.6" cy="4.8" r="0.9" fill="#FFDE00" />
    <circle cx="13.6" cy="7.6" r="0.9" fill="#FFDE00" />
    <circle cx="11.8" cy="9.6" r="0.9" fill="#FFDE00" />
  </svg>
);
