import React, { useState } from 'react';
import { Check, Copy, Mail, MapPin, Phone, User } from 'lucide-react';
import { OFFICE_LOCATIONS } from '../data/companyData';
import { useLogistics } from '../context/LogisticsContext';

type CountryFilter = 'all' | 'rdc' | 'bzv' | 'angola' | 'china';

export const ContactSection: React.FC = () => {
  const { lang, t, settings } = useLogistics();
  const [filter, setFilter] = useState<CountryFilter>('all');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const visibleOffices =
    filter === 'all'
      ? OFFICE_LOCATIONS
      : OFFICE_LOCATIONS.filter((o) => o.countryKey === filter);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 1800);
    } catch {
      // clipboard fallback
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#F8FBFD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#168ACB] mb-2">
              {t.contact.kicker}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#102E49]">
              {t.contact.title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#102E49]/75 max-w-2xl">
              {t.contact.subtitle}
            </p>
          </div>

          {/* Interactive Country Filter Tabs */}
          <div
            className="inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-white border border-[#D9E8F1] rounded-lg self-start lg:self-end"
            role="tablist"
            aria-label="Filtrer les bureaux par pays"
          >
            {(['all', 'rdc', 'bzv', 'angola', 'china'] as CountryFilter[]).map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={filter === key}
                onClick={() => setFilter(key)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  filter === key
                    ? 'bg-[#102E49] text-white'
                    : 'text-[#102E49]/75 hover:text-[#102E49] hover:bg-[#D9E8F1]/40'
                }`}
              >
                {t.contact.filters[key]}
              </button>
            ))}
          </div>
        </div>

        {/* Offices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleOffices.map((office) => {
            const title =
              lang === 'zh' ? office.labelZh : lang === 'en' ? office.labelEn : office.labelFr;

            const effectiveAddress =
              office.id === 'angola'
                ? settings.angolaAddress || ''
                : office.address || '';

            return (
              <article
                key={office.id}
                className="bg-white border border-[#D9E8F1] rounded-lg p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="pb-3 border-b border-[#D9E8F1]">
                    <div className="text-xs font-semibold text-[#168ACB] uppercase tracking-wider">
                      {office.city}
                    </div>
                    <h3 className="mt-1 font-display text-lg font-bold text-[#102E49]">
                      {title}
                    </h3>
                  </div>

                  {office.manager && (
                    <div className="flex items-center gap-2.5 text-sm text-[#102E49]">
                      <User className="w-4 h-4 text-[#168ACB] shrink-0" aria-hidden="true" />
                      <span>
                        <span className="text-[#102E49]/65">{t.contact.manager} : </span>
                        <strong className="font-semibold">{office.manager}</strong>
                      </span>
                    </div>
                  )}

                  {/* Address block */}
                  <div className="flex items-start gap-2.5 text-sm text-[#102E49]/85">
                    <MapPin className="w-4 h-4 text-[#168ACB] shrink-0 mt-1" aria-hidden="true" />
                    <div className="space-y-1.5">
                      {effectiveAddress ? (
                        <p className="leading-relaxed">{effectiveAddress}</p>
                      ) : (
                        <p className="text-xs text-[#102E49]/55 italic">
                          {t.contact.addressConfigurable}
                        </p>
                      )}
                      {office.addressZh && (
                        <p className="text-xs font-medium text-[#102E49] bg-[#F8FBFD] border border-[#D9E8F1] rounded px-2.5 py-1.5">
                          {office.addressZh}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phones */}
                  <div className="space-y-2">
                    {office.phones.map((phone) => (
                      <div key={phone} className="flex items-center justify-between gap-2 text-sm">
                        <a
                          href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                          className="inline-flex items-center gap-2 font-mono font-medium text-[#102E49] hover:text-[#168ACB] tabular-nums"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#168ACB] shrink-0" aria-hidden="true" />
                          <span>{phone}</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => handleCopy(phone)}
                          aria-label={`Copier ${phone}`}
                          className="p-1.5 text-[#102E49]/50 hover:text-[#168ACB] rounded transition-colors cursor-pointer"
                        >
                          {copiedText === phone ? (
                            <Check className="w-3.5 h-3.5 text-[#168ACB]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    ))}

                    {office.landline && (
                      <div className="flex items-center justify-between gap-2 text-sm">
                        <a
                          href={`tel:${office.landline.replace(/[^+\d]/g, '')}`}
                          className="inline-flex items-center gap-2 font-mono font-medium text-[#102E49] hover:text-[#168ACB] tabular-nums"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#168ACB] shrink-0" aria-hidden="true" />
                          <span>
                            {t.contact.landline}: {office.landline}
                          </span>
                        </a>
                      </div>
                    )}

                    {office.email && (
                      <div className="flex items-center justify-between gap-2 text-sm pt-1">
                        <a
                          href={`mailto:${office.email}`}
                          className="inline-flex items-center gap-2 font-medium text-[#102E49] hover:text-[#168ACB] break-all"
                        >
                          <Mail className="w-3.5 h-3.5 text-[#168ACB] shrink-0" aria-hidden="true" />
                          <span>{office.email}</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => handleCopy(office.email!)}
                          aria-label={`Copier ${office.email}`}
                          className="p-1.5 text-[#102E49]/50 hover:text-[#168ACB] rounded transition-colors cursor-pointer shrink-0"
                        >
                          {copiedText === office.email ? (
                            <Check className="w-3.5 h-3.5 text-[#168ACB]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    )}
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
