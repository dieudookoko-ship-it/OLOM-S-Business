import React, { useEffect, useState } from 'react';
import { CheckCircle2, MessageCircle, Send } from 'lucide-react';
import { OFFICE_LOCATIONS } from '../data/companyData';
import { useLogistics } from '../context/LogisticsContext';
import { AxisId, FreightMode, QuoteRequest } from '../types/logistics';

export const QuoteSection: React.FC = () => {
  const { t, preselectedQuote, submitQuoteRequest, settings } = useLogistics();

  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [axis, setAxis] = useState<AxisId>('cn-kin');
  const [mode, setMode] = useState<FreightMode>('air');
  const [preferredBranch, setPreferredBranch] =
    useState<QuoteRequest['preferredBranch']>('kinshasa');
  const [cargoDescription, setCargoDescription] = useState('');
  const [estimatedWeightVolume, setEstimatedWeightVolume] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedQuote, setSubmittedQuote] = useState<QuoteRequest | null>(null);

  useEffect(() => {
    if (preselectedQuote.axis) setAxis(preselectedQuote.axis);
    if (preselectedQuote.mode) setMode(preselectedQuote.mode);
  }, [preselectedQuote]);

  const getBranchWhatsappNumber = (branch: QuoteRequest['preferredBranch']): string => {
    if (branch === 'kinshasa' && settings.primaryWhatsapp) {
      return settings.primaryWhatsapp.replace(/[^0-9]/g, '');
    }
    const office = OFFICE_LOCATIONS.find((o) => o.id === branch);
    return (office?.whatsappPhone || '243863408853').replace(/[^0-9]/g, '');
  };

  const buildWhatsappUrl = () => {
    const targetNumber = getBranchWhatsappNumber(preferredBranch);
    const axisLabel = t.corridor.axes[axis].title;
    const modeLabel = t.quote.modes[mode];
    const lines = [
      `Bonjour OLOM'S Business,`,
      `Je souhaite un devis pour :`,
      `- Client : ${fullName || 'Non précisé'}${company ? ` (${company})` : ''}`,
      `- Téléphone : ${phone || 'Non précisé'}`,
      `- Axe : ${axisLabel}`,
      `- Mode : ${modeLabel}`,
      `- Marchandise : ${cargoDescription || 'À préciser'}`,
      `- Poids / Volume : ${estimatedWeightVolume || 'À préciser'}`,
    ];
    return `https://wa.me/${targetNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !phone.trim() || !cargoDescription.trim()) {
      setErrorMsg(t.quote.validationError);
      return;
    }

    const saved = submitQuoteRequest({
      fullName: fullName.trim(),
      company: company.trim() || undefined,
      phone: phone.trim(),
      email: email.trim() || undefined,
      axis,
      mode,
      preferredBranch,
      cargoDescription: cargoDescription.trim(),
      estimatedWeightVolume: estimatedWeightVolume.trim() || 'À estimer',
    });

    setSubmittedQuote(saved);
  };

  return (
    <section id="devis" className="bg-[#102E49] text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left CTA Banner Column matching ALEXA WH dark conversion strip */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#D9E8F1]/80 mb-2">
                {t.nav.quote} · WhatsApp
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                {t.quote.bannerTitle}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#D9E8F1]/85 leading-relaxed">
                {t.quote.bannerSubtitle}
              </p>
            </div>

            <div className="bg-white/5 border border-white/15 rounded-lg p-6 space-y-4">
              <div className="text-sm font-semibold text-white">
                Contact direct WhatsApp par bureau
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'kinshasa', label: 'Kinshasa (RDC)', num: '+243 863408853' },
                  { id: 'lubumbashi', label: 'Lubumbashi (RDC)', num: '+243 893543162' },
                  { id: 'guangzhou', label: 'Guangzhou (Chine)', num: '+86-13760630460' },
                  { id: 'brazzaville', label: 'Brazzaville (BZV)', num: '00 242 069706279' },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`https://wa.me/${item.num.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-md bg-white/10 hover:bg-[#168ACB] border border-white/15 transition-colors text-xs"
                  >
                    <div>
                      <div className="font-semibold text-white">{item.label}</div>
                      <div className="font-mono text-[#D9E8F1] tabular-nums">{item.num}</div>
                    </div>
                    <MessageCircle className="w-4 h-4 text-[#D9E8F1] shrink-0" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quote Request Form */}
          <div className="lg:col-span-7">
            <div className="bg-white text-[#102E49] rounded-lg p-6 sm:p-8 shadow-sm">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#102E49]">
                {t.quote.formTitle}
              </h3>
              <p className="mt-1.5 text-sm text-[#102E49]/70">{t.quote.formSubtitle}</p>

              {submittedQuote ? (
                <div className="mt-6 bg-[#F8FBFD] border border-[#D9E8F1] rounded-lg p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#168ACB] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h4 className="font-display text-lg font-bold text-[#102E49]">
                        {t.quote.successTitle} · <span className="font-mono">{submittedQuote.id}</span>
                      </h4>
                      <p className="mt-1 text-sm text-[#102E49]/75">{t.quote.successDesc}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href={buildWhatsappUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#168ACB] hover:bg-[#102E49] rounded-md transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>{t.quote.whatsappBtn}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedQuote(null);
                        setCargoDescription('');
                        setEstimatedWeightVolume('');
                      }}
                      className="px-4 py-2.5 text-sm font-semibold text-[#102E49] border border-[#D9E8F1] hover:bg-[#D9E8F1]/40 rounded-md transition-colors cursor-pointer"
                    >
                      Nouvelle demande
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                  {errorMsg && (
                    <div
                      role="alert"
                      className="p-3 rounded-md bg-red-50 border border-red-200 text-xs sm:text-sm text-red-800 font-medium"
                    >
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="quote-name" className="block text-xs font-semibold text-[#102E49] mb-1.5">
                        {t.quote.fields.fullName}
                      </label>
                      <input
                        id="quote-name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F8FBFD] border border-[#D9E8F1] rounded-md focus:outline-none focus:ring-2 focus:ring-[#168ACB]"
                      />
                    </div>

                    <div>
                      <label htmlFor="quote-phone" className="block text-xs font-semibold text-[#102E49] mb-1.5">
                        {t.quote.fields.phone}
                      </label>
                      <input
                        id="quote-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+243 ..."
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F8FBFD] border border-[#D9E8F1] rounded-md focus:outline-none focus:ring-2 focus:ring-[#168ACB]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="quote-company" className="block text-xs font-semibold text-[#102E49] mb-1.5">
                        {t.quote.fields.company}
                      </label>
                      <input
                        id="quote-company"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F8FBFD] border border-[#D9E8F1] rounded-md focus:outline-none focus:ring-2 focus:ring-[#168ACB]"
                      />
                    </div>

                    <div>
                      <label htmlFor="quote-email" className="block text-xs font-semibold text-[#102E49] mb-1.5">
                        {t.quote.fields.email}
                      </label>
                      <input
                        id="quote-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F8FBFD] border border-[#D9E8F1] rounded-md focus:outline-none focus:ring-2 focus:ring-[#168ACB]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="quote-axis" className="block text-xs font-semibold text-[#102E49] mb-1.5">
                        {t.quote.fields.axis}
                      </label>
                      <select
                        id="quote-axis"
                        value={axis}
                        onChange={(e) => setAxis(e.target.value as AxisId)}
                        className="w-full px-3 py-2.5 text-sm bg-[#F8FBFD] border border-[#D9E8F1] rounded-md focus:outline-none focus:ring-2 focus:ring-[#168ACB]"
                      >
                        <option value="cn-kin">{t.corridor.axes['cn-kin'].title}</option>
                        <option value="cn-lub">{t.corridor.axes['cn-lub'].title}</option>
                        <option value="kin-lub">{t.corridor.axes['kin-lub'].title}</option>
                        <option value="lub-kin">{t.corridor.axes['lub-kin'].title}</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="quote-mode" className="block text-xs font-semibold text-[#102E49] mb-1.5">
                        {t.quote.fields.mode}
                      </label>
                      <select
                        id="quote-mode"
                        value={mode}
                        onChange={(e) => setMode(e.target.value as FreightMode)}
                        className="w-full px-3 py-2.5 text-sm bg-[#F8FBFD] border border-[#D9E8F1] rounded-md focus:outline-none focus:ring-2 focus:ring-[#168ACB]"
                      >
                        <option value="air">{t.quote.modes.air}</option>
                        <option value="sea">{t.quote.modes.sea}</option>
                        <option value="road">{t.quote.modes.road}</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="quote-branch" className="block text-xs font-semibold text-[#102E49] mb-1.5">
                        {t.quote.fields.branch}
                      </label>
                      <select
                        id="quote-branch"
                        value={preferredBranch}
                        onChange={(e) =>
                          setPreferredBranch(e.target.value as QuoteRequest['preferredBranch'])
                        }
                        className="w-full px-3 py-2.5 text-sm bg-[#F8FBFD] border border-[#D9E8F1] rounded-md focus:outline-none focus:ring-2 focus:ring-[#168ACB]"
                      >
                        <option value="kinshasa">Kinshasa</option>
                        <option value="lubumbashi">Lubumbashi</option>
                        <option value="guangzhou">Guangzhou</option>
                        <option value="brazzaville">Brazzaville</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label htmlFor="quote-cargo" className="block text-xs font-semibold text-[#102E49] mb-1.5">
                        {t.quote.fields.cargo}
                      </label>
                      <input
                        id="quote-cargo"
                        type="text"
                        required
                        value={cargoDescription}
                        onChange={(e) => setCargoDescription(e.target.value)}
                        placeholder="Ex : Équipements, colis commerciaux, matériaux..."
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F8FBFD] border border-[#D9E8F1] rounded-md focus:outline-none focus:ring-2 focus:ring-[#168ACB]"
                      />
                    </div>

                    <div>
                      <label htmlFor="quote-weight" className="block text-xs font-semibold text-[#102E49] mb-1.5">
                        {t.quote.fields.weight}
                      </label>
                      <input
                        id="quote-weight"
                        type="text"
                        value={estimatedWeightVolume}
                        onChange={(e) => setEstimatedWeightVolume(e.target.value)}
                        placeholder="Ex : 80 kg / 2 CBM"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F8FBFD] border border-[#D9E8F1] rounded-md focus:outline-none focus:ring-2 focus:ring-[#168ACB]"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#102E49] hover:bg-[#168ACB] rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#168ACB]"
                    >
                      <Send className="w-4 h-4" aria-hidden="true" />
                      <span>{t.quote.submitBtn}</span>
                    </button>

                    <a
                      href={buildWhatsappUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#102E49] bg-[#D9E8F1]/60 hover:bg-[#D9E8F1] rounded-md transition-colors whitespace-nowrap shrink-0"
                    >
                      <MessageCircle className="w-4 h-4 text-[#168ACB]" aria-hidden="true" />
                      <span>{t.quote.whatsappBtn}</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
