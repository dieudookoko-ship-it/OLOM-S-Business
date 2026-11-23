import React from 'react';
import { Anchor, ArrowRight, Plane, Truck, Warehouse } from 'lucide-react';
import { BRAND_INFO } from '../data/companyData';
import { useLogistics } from '../context/LogisticsContext';
import { SafeImage } from './SafeImage';

export const ServicesSection: React.FC = () => {
  const { t, requestQuoteWithPreset } = useLogistics();

  const iconMap = {
    sea: Anchor,
    air: Plane,
    road: Truck,
    warehouse: Warehouse,
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-[#F8FBFD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Section Header matching ALEXA WH rhythm */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-12">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#168ACB] mb-2">
              {t.services.kicker}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#102E49] leading-tight">
              {t.services.title}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-[#102E49]/75 leading-relaxed">
              {t.services.subtitle}
            </p>
          </div>
        </div>

        {/* 4 Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.services.items.map((service) => {
            const Icon = iconMap[service.id];
            const imageSrc = BRAND_INFO.servicesImages[service.id];
            return (
              <article
                key={service.id}
                className="group bg-white border border-[#D9E8F1] rounded-lg overflow-hidden flex flex-col transition-shadow duration-200 hover:shadow-md"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#D9E8F1]/40">
                  <SafeImage
                    src={imageSrc}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    fallbackTitle={service.title}
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-md bg-[#D9E8F1]/60 text-[#102E49] flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-[#168ACB]" aria-hidden="true" />
                    </div>

                    <h3 className="font-display text-lg font-bold text-[#102E49] mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#102E49]/75 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#D9E8F1]/70">
                    <button
                      type="button"
                      onClick={() =>
                        requestQuoteWithPreset({
                          mode: service.mode || 'sea',
                        })
                      }
                      aria-label={`${t.services.ctaLink} : ${service.title}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#102E49] hover:text-[#168ACB] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#168ACB] rounded"
                    >
                      <span className="truncate">{t.nav.quoteCta}</span>
                      <ArrowRight
                        className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1 shrink-0"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
