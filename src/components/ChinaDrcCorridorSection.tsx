import React, { useState } from 'react';
import { ArrowRight, MapPin, Plane, Ship } from 'lucide-react';
import { useLogistics } from '../context/LogisticsContext';
import { AxisId } from '../types/logistics';

const AXES_ORDER: AxisId[] = ['cn-kin', 'cn-lub', 'kin-lub', 'lub-kin'];

export const ChinaDrcCorridorSection: React.FC = () => {
  const { t, settings, requestQuoteWithPreset } = useLogistics();
  const [selectedAxis, setSelectedAxis] = useState<AxisId>('cn-kin');

  const activeAxisInfo = t.corridor.axes[selectedAxis];

  const getAxisLeadTime = (axis: AxisId) => {
    if (axis === 'cn-kin' || axis === 'cn-lub') {
      const parts: string[] = [];
      if (settings.airLeadTime) parts.push(`Air: ${settings.airLeadTime}`);
      if (settings.seaLeadTime) parts.push(`Mer: ${settings.seaLeadTime}`);
      return parts.length > 0 ? parts.join(' · ') : t.corridor.notConfigured;
    }
    return settings.interDrcLeadTime || t.corridor.notConfigured;
  };

  const getAxisRate = (axis: AxisId) => {
    if (axis === 'cn-kin' || axis === 'cn-lub') {
      const parts: string[] = [];
      if (settings.indicativeAirRate) parts.push(`Air: ${settings.indicativeAirRate}`);
      if (settings.indicativeSeaRate) parts.push(`Mer: ${settings.indicativeSeaRate}`);
      return parts.length > 0 ? parts.join(' · ') : t.corridor.notConfigured;
    }
    return t.corridor.notConfigured;
  };

  return (
    <section id="import-export" className="bg-[#102E49] text-white py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Corridor Narrative & 4-Axis Selector */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#D9E8F1]/80 mb-2">
                {t.corridor.kicker}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                {t.corridor.title}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#D9E8F1]/85 leading-relaxed">
                {t.corridor.subtitle}
              </p>
            </div>

            {/* 3 Factual Network Highlights */}
            <div className="grid grid-cols-3 gap-4 py-5 border-y border-white/15">
              <div>
                <div className="font-display text-xl sm:text-2xl font-bold text-white tabular-nums">
                  Guangzhou
                </div>
                <p className="mt-1 text-xs text-[#D9E8F1]/75 leading-snug">
                  {t.corridor.stat1Label}
                </p>
              </div>
              <div>
                <div className="font-display text-xl sm:text-2xl font-bold text-white tabular-nums">
                  2 Villes
                </div>
                <p className="mt-1 text-xs text-[#D9E8F1]/75 leading-snug">
                  {t.corridor.stat2Label}
                </p>
              </div>
              <div>
                <div className="font-display text-xl sm:text-2xl font-bold text-white tabular-nums">
                  BZV · AO
                </div>
                <p className="mt-1 text-xs text-[#D9E8F1]/75 leading-snug">
                  {t.corridor.stat3Label}
                </p>
              </div>
            </div>

            {/* Interactive 4-Axis Selector */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#D9E8F1] mb-3">
                {t.corridor.axesHeading}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" role="tablist" aria-label={t.corridor.axesHeading}>
                {AXES_ORDER.map((axisId) => {
                  const isActive = selectedAxis === axisId;
                  return (
                    <button
                      key={axisId}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedAxis(axisId)}
                      className={`text-left px-4 py-3 rounded-md border transition-colors duration-150 cursor-pointer flex items-center justify-between gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                        isActive
                          ? 'bg-[#168ACB] border-[#168ACB] text-white'
                          : 'bg-white/5 border-white/15 text-[#D9E8F1] hover:bg-white/10'
                      }`}
                    >
                      <span className="text-sm font-semibold whitespace-nowrap truncate">
                        {t.corridor.axes[axisId].title}
                      </span>
                      <ArrowRight className="w-4 h-4 shrink-0 opacity-80" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Axis Detail Card */}
            <div className="bg-white/5 border border-white/15 rounded-lg p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-lg font-bold text-white">
                  {activeAxisInfo.title}
                </h3>
                <span className="text-xs font-medium text-[#D9E8F1]">
                  {activeAxisInfo.modes}
                </span>
              </div>

              <p className="text-sm text-[#D9E8F1]/85 leading-relaxed">
                {activeAxisInfo.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/10 text-xs">
                <div>
                  <span className="text-[#D9E8F1]/60 block">Origine · Destination</span>
                  <span className="text-white font-medium">
                    {activeAxisInfo.originHub} → {activeAxisInfo.destinationHub}
                  </span>
                </div>
                <div>
                  <span className="text-[#D9E8F1]/60 block">
                    {t.corridor.leadTimeLabel} / {t.corridor.rateLabel}
                  </span>
                  <span className="text-[#D9E8F1] font-medium">
                    {getAxisLeadTime(selectedAxis)}
                    {getAxisRate(selectedAxis) !== t.corridor.notConfigured
                      ? ` · ${getAxisRate(selectedAxis)}`
                      : ''}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() =>
                    requestQuoteWithPreset({
                      axis: selectedAxis,
                      mode: selectedAxis === 'kin-lub' || selectedAxis === 'lub-kin' ? 'road' : 'air',
                    })
                  }
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold bg-white text-[#102E49] hover:bg-[#D9E8F1] rounded-md transition-colors cursor-pointer"
                >
                  <span>{t.corridor.requestAxisQuote}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive SVG Corridor Network Map (Guangzhou ↔ RDC & Central Africa) */}
          <div className="lg:col-span-6">
            <div className="relative bg-[#0B2238] border border-white/15 rounded-xl p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 text-xs text-[#D9E8F1]/80">
                <span className="font-semibold text-white">
                  Réseau Logistique Chine – Afrique Centrale
                </span>
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-1.5">
                    <Plane className="w-3.5 h-3.5 text-[#168ACB]" aria-hidden="true" />
                    Fret Aérien
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Ship className="w-3.5 h-3.5 text-[#D9E8F1]" aria-hidden="true" />
                    Fret Maritime
                  </span>
                </div>
              </div>

              {/* Clean architectural vector schematic of China -> Central Africa routes */}
              <svg
                viewBox="0 0 640 400"
                role="img"
                aria-label="Carte du réseau OLOM'S Business : Guangzhou vers Kinshasa, Lubumbashi, Brazzaville et Angola"
                className="w-full h-auto"
              >
                <defs>
                  <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#168ACB" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#168ACB" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Subtle maritime grid lines */}
                <g stroke="#D9E8F1" strokeOpacity="0.08" strokeWidth="1">
                  <line x1="0" y1="80" x2="640" y2="80" />
                  <line x1="0" y1="160" x2="640" y2="160" />
                  <line x1="0" y1="240" x2="640" y2="240" />
                  <line x1="0" y1="320" x2="640" y2="320" />
                  <line x1="128" y1="0" x2="128" y2="400" />
                  <line x1="256" y1="0" x2="256" y2="400" />
                  <line x1="384" y1="0" x2="384" y2="400" />
                  <line x1="512" y1="0" x2="512" y2="400" />
                </g>

                {/* Stylized Continental Silhouettes (Africa & Asia) */}
                <path
                  d="M95,120 L185,115 L235,155 L265,215 L245,275 L205,345 L160,340 L135,280 L95,235 L70,185 Z"
                  fill="#153B5E"
                  stroke="#D9E8F1"
                  strokeOpacity="0.22"
                  strokeWidth="1.2"
                />
                <path
                  d="M365,65 L495,55 L575,90 L565,155 L515,190 L435,175 L370,135 Z"
                  fill="#153B5E"
                  stroke="#D9E8F1"
                  strokeOpacity="0.22"
                  strokeWidth="1.2"
                />

                {/* Secondary Regional Connections (BZV & Angola) */}
                <line
                  x1="162"
                  y1="232"
                  x2="132"
                  y2="218"
                  stroke="#D9E8F1"
                  strokeOpacity="0.45"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
                <line
                  x1="162"
                  y1="232"
                  x2="145"
                  y2="282"
                  stroke="#D9E8F1"
                  strokeOpacity="0.45"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />

                {/* Route 1: Guangzhou (510, 145) -> Kinshasa (162, 232) */}
                <path
                  d="M510,145 Q335,70 162,232"
                  fill="none"
                  stroke={selectedAxis === 'cn-kin' ? '#168ACB' : '#D9E8F1'}
                  strokeOpacity={selectedAxis === 'cn-kin' ? 1 : 0.25}
                  strokeWidth={selectedAxis === 'cn-kin' ? 3 : 1.5}
                />
                {/* Maritime lower arc Guangzhou -> Kinshasa */}
                <path
                  d="M510,145 Q380,315 162,232"
                  fill="none"
                  stroke={selectedAxis === 'cn-kin' ? '#D9E8F1' : '#D9E8F1'}
                  strokeOpacity={selectedAxis === 'cn-kin' ? 0.65 : 0.15}
                  strokeWidth={selectedAxis === 'cn-kin' ? 2 : 1}
                  strokeDasharray="5 5"
                />

                {/* Route 2: Guangzhou (510, 145) -> Lubumbashi (228, 286) */}
                <path
                  d="M510,145 Q395,180 228,286"
                  fill="none"
                  stroke={selectedAxis === 'cn-lub' ? '#168ACB' : '#D9E8F1'}
                  strokeOpacity={selectedAxis === 'cn-lub' ? 1 : 0.25}
                  strokeWidth={selectedAxis === 'cn-lub' ? 3 : 1.5}
                />

                {/* Route 3 & 4: Kinshasa (162, 232) <-> Lubumbashi (228, 286) */}
                <path
                  d="M162,232 Q205,248 228,286"
                  fill="none"
                  stroke={
                    selectedAxis === 'kin-lub' || selectedAxis === 'lub-kin'
                      ? '#168ACB'
                      : '#D9E8F1'
                  }
                  strokeOpacity={
                    selectedAxis === 'kin-lub' || selectedAxis === 'lub-kin' ? 1 : 0.35
                  }
                  strokeWidth={
                    selectedAxis === 'kin-lub' || selectedAxis === 'lub-kin' ? 3 : 1.5
                  }
                />

                {/* Hub Nodes */}
                {/* Guangzhou */}
                <circle cx="510" cy="145" r="22" fill="url(#hubGlow)" />
                <circle cx="510" cy="145" r="6" fill="#168ACB" stroke="#FFFFFF" strokeWidth="2" />
                <text x="510" y="126" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">
                  Guangzhou (Chine)
                </text>
                <text x="510" y="168" textAnchor="middle" fill="#D9E8F1" fontSize="10">
                  Manager EMILE · Yue Xiu
                </text>

                {/* Kinshasa */}
                <circle cx="162" cy="232" r="20" fill="url(#hubGlow)" />
                <circle cx="162" cy="232" r="6" fill="#168ACB" stroke="#FFFFFF" strokeWidth="2" />
                <text x="174" y="226" fill="#FFFFFF" fontSize="12" fontWeight="700">
                  Kinshasa
                </text>
                <text x="174" y="240" fill="#D9E8F1" fontSize="9.5">
                  Av. Usoke N°132
                </text>

                {/* Lubumbashi */}
                <circle cx="228" cy="286" r="20" fill="url(#hubGlow)" />
                <circle cx="228" cy="286" r="6" fill="#168ACB" stroke="#FFFFFF" strokeWidth="2" />
                <text x="240" y="284" fill="#FFFFFF" fontSize="12" fontWeight="700">
                  Lubumbashi
                </text>
                <text x="240" y="298" fill="#D9E8F1" fontSize="9.5">
                  Av. Maniema N°54
                </text>

                {/* Brazzaville */}
                <circle cx="132" cy="218" r="4" fill="#D9E8F1" />
                <text x="122" y="212" textAnchor="end" fill="#D9E8F1" fontSize="10">
                  Brazzaville (BZV)
                </text>

                {/* Angola */}
                <circle cx="145" cy="282" r="4" fill="#D9E8F1" />
                <text x="135" y="286" textAnchor="end" fill="#D9E8F1" fontSize="10">
                  Angola
                </text>
              </svg>

              <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-[#D9E8F1]/80">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#168ACB]" aria-hidden="true" />
                  <span>4 axes : Chine → Kinshasa · Chine → Lubumbashi · Kinshasa ↔ Lubumbashi</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
