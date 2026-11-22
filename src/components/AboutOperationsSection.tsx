import React from 'react';
import { ArrowRight, Building2, Clock, FileCheck, User } from 'lucide-react';
import { BRAND_INFO } from '../data/companyData';
import { useLogistics } from '../context/LogisticsContext';
import { SafeImage } from './SafeImage';

export const AboutOperationsSection: React.FC = () => {
  const { lang, t, settings, requestQuoteWithPreset } = useLogistics();

  const hoursValue =
    lang === 'zh'
      ? settings.openingHoursZh || settings.openingHoursFr
      : lang === 'en'
      ? settings.openingHoursEn || settings.openingHoursFr
      : settings.openingHoursFr;

  return (
    <section id="apropos" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Row: 2-Column Asymmetric Split (Text & Identity + Wide Port Photo) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#168ACB] mb-2">
                {t.about.kicker}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#102E49] leading-tight">
                {t.about.title}
              </h2>
              <p className="mt-4 text-base font-medium text-[#102E49] leading-relaxed">
                {t.about.lead}
              </p>
              <p className="mt-3 text-sm text-[#102E49]/75 leading-relaxed">
                {t.about.body}
              </p>
            </div>

            {/* Brand Emblem + Key Verified Metadata (and Configurable RCCM/Hours) */}
            <div className="bg-[#F8FBFD] border border-[#D9E8F1] rounded-lg p-5 space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b border-[#D9E8F1]">
                <img
                  src={BRAND_INFO.logoUrl}
                  alt="Emblème OLOM'S International Business Co. Ltd."
                  className="w-16 h-16 object-contain rounded-full bg-white shrink-0 border border-[#D9E8F1]"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <div className="font-display font-bold text-[#102E49] text-base truncate">
                    {BRAND_INFO.tradeName}
                  </div>
                  <div className="text-xs text-[#102E49]/70 truncate">
                    {BRAND_INFO.legalName}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 text-[#168ACB] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="text-[#102E49]/60 block">{t.about.managerLabel}</span>
                    <span className="font-semibold text-[#102E49]">EMILE · Guangzhou</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Building2 className="w-4 h-4 text-[#168ACB] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="text-[#102E49]/60 block">{t.about.headOfficeLabel}</span>
                    <span className="font-semibold text-[#102E49]">Av. Usoke N°132</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <FileCheck className="w-4 h-4 text-[#168ACB] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="text-[#102E49]/60 block">{t.about.rccmLabel}</span>
                    <span className="font-medium text-[#102E49]">
                      {settings.rccmNumber || t.about.configurableBadge}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-[#168ACB] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="text-[#102E49]/60 block">{t.about.hoursLabel}</span>
                    <span className="font-medium text-[#102E49]">
                      {hoursValue || t.about.configurableBadge}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#102E49] hover:text-[#168ACB] transition-colors"
              >
                <span>{t.about.learnMoreCta}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="h-full min-h-[300px] lg:min-h-[420px] rounded-lg overflow-hidden border border-[#D9E8F1]">
              <SafeImage
                src={BRAND_INFO.operationalImage}
                alt="Opérations portuaires et transport de conteneurs OLOM'S Business"
                className="w-full h-full object-cover"
                fallbackTitle="Opérations Logistiques OLOM'S"
              />
            </div>
          </div>
        </div>

        {/* Bottom Row: 2 Side-by-Side Air & Ocean Spotlight Banners (ALEXA WH motif) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.about.spotlights.map((item) => {
            const imgSrc =
              item.mode === 'air'
                ? BRAND_INFO.servicesImages.air
                : BRAND_INFO.servicesImages.sea;
            return (
              <div
                key={item.num}
                className="group relative rounded-lg overflow-hidden min-h-[240px] flex items-end border border-[#D9E8F1]"
              >
                <SafeImage
                  src={imgSrc}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  fallbackTitle={item.title}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#102E49]/95 via-[#102E49]/60 to-[#102E49]/20"
                  aria-hidden="true"
                />

                <div className="relative z-10 p-6 sm:p-7 w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
                  <div className="max-w-md">
                    <div className="text-xs font-mono font-semibold text-[#D9E8F1] mb-1">
                      {item.num}. {item.title}
                    </div>
                    <p className="text-sm text-white/85 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => requestQuoteWithPreset({ mode: item.mode })}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-white text-[#102E49] hover:bg-[#D9E8F1] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-end"
                  >
                    <span>{t.nav.quoteCta}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
