import React from 'react';
import { ArrowRight, Globe, Lock, PackageSearch } from 'lucide-react';
import { BRAND_INFO } from '../data/companyData';
import { useLogistics } from '../context/LogisticsContext';
import { Language } from '../types/logistics';
import { SafeImage } from './SafeImage';
import { ChinaFlagIcon, DrcFlagIcon } from './CountryFlags';

export const HeroSection: React.FC = () => {
  const { lang, setLang, t, openAuthModal, authSession } = useLogistics();

  return (
    <section id="accueil" className="relative w-full overflow-hidden bg-[#102E49] text-white">
      {/* Full-bleed maritime cargo backdrop */}
      <div className="absolute inset-0">
        <SafeImage
          src={BRAND_INFO.heroImage}
          alt="Navire porte-conteneurs au port maritime — fret international OLOM'S Business"
          className="w-full h-full object-cover object-center"
          fallbackTitle="OLOM'S International Business"
        />
        {/* Measured contrast scrim >= 4.5:1 */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#102E49]/95 via-[#102E49]/80 to-[#102E49]/35"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#102E49]/80 via-transparent to-[#102E49]/40"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 md:pt-8 md:pb-24 lg:pb-28">
        {/* Hero Utility Strip (Language Switcher FR/EN/中文 + Auth Portal) */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-10 md:pb-14 border-b border-white/15">
          <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-[#D9E8F1] tracking-wide">
            <span>{t.hero.legalKicker}</span>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="inline-flex items-center gap-1 p-1 bg-white/10 backdrop-blur-sm border border-white/15 rounded-md"
              role="group"
              aria-label="Choix de la langue"
            >
              <Globe className="w-3.5 h-3.5 text-[#D9E8F1] ml-1.5 mr-0.5 hidden sm:block" aria-hidden="true" />
              {(['fr', 'en', 'zh'] as Language[]).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#168ACB] ${
                    lang === code
                      ? 'bg-[#168ACB] text-white'
                      : 'text-white/85 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {code === 'zh' ? '中文' : code.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => openAuthModal('client')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white bg-[#168ACB] hover:bg-[#168ACB]/90 border border-white/20 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#168ACB]"
            >
              <Lock className="w-3.5 h-3.5 text-[#D9E8F1]" aria-hidden="true" />
              <span>
                {authSession
                  ? `${authSession.name} (${authSession.role === 'admin' ? 'Admin' : 'Client'})`
                  : t.hero.portalBtn}
              </span>
            </button>
          </div>
        </div>

        {/* Main Hero Editorial Block */}
        <div className="pt-10 md:pt-14 max-w-2xl">
          <h1 className="font-display font-bold tracking-tight text-white leading-[1.12] text-[clamp(2.25rem,4.3vw,3.75rem)]">
            {lang === 'zh' ? (
              <>
                <span className="inline-flex items-center gap-[0.2em] whitespace-nowrap">
                  <span>中国</span>
                  <ChinaFlagIcon className="w-[1.05em] h-[0.7em]" />
                </span>
                至
                <span className="inline-flex items-center gap-[0.2em] whitespace-nowrap">
                  <span>刚果（金）</span>
                  <DrcFlagIcon className="w-[1.05em] h-[0.7em]" />
                </span>
                国际空运海运与进出口物流。
              </>
            ) : lang === 'en' ? (
              <>
                International Freight &amp;{' '}
                <span className="inline-flex items-center gap-[0.22em] whitespace-nowrap">
                  <span>China</span>
                  <ChinaFlagIcon className="w-[1.05em] h-[0.7em]" />
                </span>{' '}
                -{' '}
                <span className="inline-flex items-center gap-[0.22em] whitespace-nowrap">
                  <span>DRC</span>
                  <DrcFlagIcon className="w-[1.05em] h-[0.7em]" />
                </span>{' '}
                Logistics Without Limits.
              </>
            ) : (
              <>
                Transport international et fret{' '}
                <span className="inline-flex items-center gap-[0.22em] whitespace-nowrap">
                  <span>Chine</span>
                  <ChinaFlagIcon className="w-[1.05em] h-[0.7em]" />
                </span>{' '}
                -{' '}
                <span className="inline-flex items-center gap-[0.22em] whitespace-nowrap">
                  <span>RDC</span>
                  <DrcFlagIcon className="w-[1.05em] h-[0.7em]" />
                </span>{' '}
                sans frontières.
              </>
            )}
          </h1>

          <p className="mt-5 text-base sm:text-lg text-[#D9E8F1] leading-relaxed max-w-xl">
            {t.hero.subheadline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#devis"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#168ACB] hover:bg-[#168ACB]/90 rounded-md shadow-sm transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#102E49]"
            >
              <span>{t.hero.primaryCta}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>

            <a
              href="#suivi"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <PackageSearch className="w-4 h-4 text-[#D9E8F1]" aria-hidden="true" />
              <span>{t.hero.secondaryCta}</span>
            </a>
          </div>
        </div>

        {/* Bottom Hub Coordinates Line (mirroring ALEXA WH bottom strip) */}
        <div className="mt-14 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-[#D9E8F1]/90">
          <p className="font-mono tabular-nums tracking-tight">
            {t.hero.coordinates}
          </p>
          <p className="font-medium text-white/90">
            Av. Usoke N°132, Kinshasa · Rm. 1802, Guangzhou
          </p>
        </div>
      </div>
    </section>
  );
};
