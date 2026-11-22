import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Circle, PackageSearch, AlertCircle } from 'lucide-react';
import { useLogistics } from '../context/LogisticsContext';
import { ShipmentRecord } from '../types/logistics';

export const TrackingSection: React.FC = () => {
  const { t, shipments, trackingQueryFromExternal, setTrackingQueryFromExternal } = useLogistics();
  const [query, setQuery] = useState('');
  const [searchedCode, setSearchedCode] = useState<string | null>(null);

  useEffect(() => {
    if (trackingQueryFromExternal) {
      setQuery(trackingQueryFromExternal);
      setSearchedCode(trackingQueryFromExternal.trim().toUpperCase());
      setTrackingQueryFromExternal('');
    }
  }, [trackingQueryFromExternal, setTrackingQueryFromExternal]);

  const foundShipment: ShipmentRecord | undefined = searchedCode
    ? shipments.find((s) => s.trackingNumber.toUpperCase() === searchedCode)
    : undefined;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = query.trim().toUpperCase();
    if (!cleaned) return;
    setSearchedCode(cleaned);
  };

  const handleSampleClick = (code: string) => {
    setQuery(code);
    setSearchedCode(code.toUpperCase());
  };

  return (
    <section id="suivi" className="py-14 md:py-20 bg-white border-b border-[#D9E8F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Horizontal Search Bar Band matching ALEXA WH */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#168ACB] mb-1.5">
              {t.tracking.kicker}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#102E49]">
              {t.tracking.title}
            </h2>
            <p className="mt-2 text-sm text-[#102E49]/75">
              {t.tracking.subtitle}
            </p>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <label htmlFor="tracking-input" className="sr-only">
                {t.tracking.placeholder}
              </label>
              <input
                id="tracking-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.tracking.placeholder}
                className="flex-1 min-h-[46px] px-4 py-2.5 text-sm font-mono bg-[#F8FBFD] border border-[#D9E8F1] rounded-md text-[#102E49] placeholder:text-[#102E49]/40 focus:outline-none focus:ring-2 focus:ring-[#168ACB] focus:border-[#168ACB]"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 py-2.5 text-sm font-semibold text-white bg-[#102E49] hover:bg-[#168ACB] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#168ACB]"
              >
                <span>{t.tracking.button}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>

            {shipments.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#102E49]/70">
                <span>{t.tracking.sampleLabel}</span>
                {shipments.slice(0, 3).map((s) => (
                  <button
                    key={s.trackingNumber}
                    type="button"
                    onClick={() => handleSampleClick(s.trackingNumber)}
                    className="font-mono font-medium text-[#168ACB] hover:text-[#102E49] underline underline-offset-2 cursor-pointer"
                  >
                    {s.trackingNumber}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tracking Result Output */}
        {searchedCode && (
          <div className="mt-8 pt-8 border-t border-[#D9E8F1]">
            {foundShipment ? (
              <div className="bg-[#F8FBFD] border border-[#D9E8F1] rounded-lg p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-[#D9E8F1]">
                  <div>
                    <div className="text-xs text-[#102E49]/60 font-medium">
                      {t.corridor.axes[foundShipment.axis].title} ·{' '}
                      {t.quote.modes[foundShipment.mode]}
                    </div>
                    <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-[#102E49] font-mono tabular-nums">
                      {foundShipment.trackingNumber}
                    </h3>
                    <p className="mt-1 text-xs text-[#102E49]/70">{foundShipment.clientName}</p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="inline-block text-sm font-bold text-[#168ACB]">
                      {t.tracking.statusLabels[foundShipment.status]}
                    </span>
                    <div className="mt-1 text-xs text-[#102E49]/60 tabular-nums">
                      {t.tracking.updatedLabel} : {foundShipment.updatedAt}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-xs text-[#102E49]/60 block">{t.tracking.originLabel}</span>
                    <span className="font-semibold text-[#102E49]">{foundShipment.origin}</span>
                  </div>
                  <div>
                    <span className="text-xs text-[#102E49]/60 block">{t.tracking.destinationLabel}</span>
                    <span className="font-semibold text-[#102E49]">{foundShipment.destination}</span>
                  </div>
                  <div>
                    <span className="text-xs text-[#102E49]/60 block">{t.tracking.volumeLabel}</span>
                    <span className="font-semibold text-[#102E49] tabular-nums">
                      {foundShipment.weightOrVolume}
                    </span>
                  </div>
                </div>

                {/* Milestone Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                  {foundShipment.milestones.map((m, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-md border ${
                        m.completed
                          ? 'bg-white border-[#168ACB]/40'
                          : 'bg-white/50 border-[#D9E8F1] opacity-75'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {m.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-[#168ACB] shrink-0" aria-hidden="true" />
                        ) : (
                          <Circle className="w-4 h-4 text-[#102E49]/35 shrink-0" aria-hidden="true" />
                        )}
                        <span className="text-xs font-mono text-[#102E49]/60 tabular-nums">
                          {m.date}
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-[#102E49]">{m.step}</div>
                      <div className="mt-1 text-xs text-[#102E49]/65">{m.location}</div>
                    </div>
                  ))}
                </div>

                {foundShipment.notes && (
                  <p className="text-xs text-[#102E49]/65 pt-2 border-t border-[#D9E8F1]">
                    {foundShipment.notes}
                  </p>
                )}
              </div>
            ) : (
              <div className="bg-[#F8FBFD] border border-[#D9E8F1] rounded-lg p-6 flex items-start gap-4">
                <AlertCircle className="w-5 h-5 text-[#168ACB] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="font-display text-base font-bold text-[#102E49]">
                    {t.tracking.notFoundTitle} ({searchedCode})
                  </h3>
                  <p className="mt-1 text-sm text-[#102E49]/75">{t.tracking.notFoundDesc}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {!searchedCode && (
          <div className="mt-6 flex items-center gap-2 text-xs text-[#102E49]/55">
            <PackageSearch className="w-4 h-4 text-[#168ACB]" aria-hidden="true" />
            <span>
              Service de suivi connecté à l&apos;espace Administrateur (Connexion).
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
