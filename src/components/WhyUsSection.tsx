import React from 'react';
import { Building, Globe2, MessageCircle, Route } from 'lucide-react';
import { useLogistics } from '../context/LogisticsContext';

export const WhyUsSection: React.FC = () => {
  const { t } = useLogistics();
  const icons = [Building, Route, Globe2, MessageCircle];

  return (
    <section className="py-14 md:py-20 bg-[#F8FBFD] border-y border-[#D9E8F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#168ACB] mb-2">
            {t.whyUs.kicker}
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#102E49]">
            {t.whyUs.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {t.whyUs.items.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={idx}
                className="bg-white border border-[#D9E8F1] rounded-lg p-6 flex flex-col"
              >
                <div className="w-10 h-10 rounded-md bg-[#D9E8F1]/60 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#168ACB]" aria-hidden="true" />
                </div>
                <h3 className="font-display text-base font-bold text-[#102E49] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#102E49]/75 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
