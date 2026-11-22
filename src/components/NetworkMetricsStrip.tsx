import React from 'react';
import { useLogistics } from '../context/LogisticsContext';

export const NetworkMetricsStrip: React.FC = () => {
  const { t, settings } = useLogistics();

  const metrics = [
    {
      value: t.metrics.axesValue,
      label: t.metrics.axesLabel,
    },
    {
      value: t.metrics.countriesValue,
      label: t.metrics.countriesLabel,
    },
    {
      value: t.metrics.modesValue,
      label: t.metrics.modesLabel,
    },
    {
      value: settings.foundedYear ? `Depuis ${settings.foundedYear}` : t.metrics.presenceValue,
      label: settings.foundedYear
        ? "Expérience OLOM'S Business"
        : t.metrics.presenceLabel,
    },
  ];

  return (
    <section
      aria-label="Indicateurs réseau OLOM'S Business"
      className="bg-white border-b border-[#D9E8F1]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#D9E8F1]">
          {metrics.map((item, idx) => (
            <div key={idx} className="py-7 px-4 sm:px-6 text-center lg:text-left">
              <div className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#102E49] tabular-nums">
                {item.value}
              </div>
              <p className="mt-1 text-xs sm:text-sm text-[#102E49]/70 leading-snug">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
