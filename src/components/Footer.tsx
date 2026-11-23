import React from 'react';
import { Lock } from 'lucide-react';
import { BRAND_INFO } from '../data/companyData';
import { useLogistics } from '../context/LogisticsContext';
import { Language } from '../types/logistics';
import { ChinaFlagIcon, DrcFlagIcon } from './CountryFlags';

export const Footer: React.FC = () => {
  const { lang, setLang, t, openAuthModal } = useLogistics();

  return (
    <footer className="bg-[#0B2238] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Column with unmodified original logo */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={BRAND_INFO.logoUrl}
                alt="Logo officiel OLOM'S International Business Co. Ltd."
                className="h-12 w-12 object-contain rounded-full bg-white shrink-0"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="font-display text-lg font-bold text-white flex items-center gap-2 flex-wrap">
                  <span>{BRAND_INFO.tradeName}</span>
                  <span className="inline-flex items-center gap-1.5 shrink-0">
                    <ChinaFlagIcon className="w-5 h-3.5" />
                    <DrcFlagIcon className="w-5 h-3.5" />
                  </span>
                </div>
                <div className="text-xs text-[#D9E8F1]/75">{BRAND_INFO.legalName}</div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#D9E8F1]/80 leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>
            <div className="inline-flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-md">
              {(['fr', 'en', 'zh'] as Language[]).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
                    lang === code
                      ? 'bg-[#168ACB] text-white'
                      : 'text-[#D9E8F1]/80 hover:text-white'
                  }`}
                >
                  {code === 'zh' ? '中文' : code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#D9E8F1]">
              {t.footer.navTitle}
            </h3>
            <ul className="space-y-2 text-sm text-[#D9E8F1]/80">
              <li>
                <a href="#accueil" className="hover:text-white transition-colors">
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a href="#apropos" className="hover:text-white transition-colors">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a href="#suivi" className="hover:text-white transition-colors">
                  {t.nav.tracking}
                </a>
              </li>
              <li>
                <a href="#devis" className="hover:text-white transition-colors">
                  {t.nav.quote}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Corridors Column */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#D9E8F1]">
              {t.footer.servicesTitle}
            </h3>
            <ul className="space-y-2 text-sm text-[#D9E8F1]/80">
              <li>
                <a href="#import-export" className="hover:text-white transition-colors">
                  {t.corridor.axes['cn-kin'].title}
                </a>
              </li>
              <li>
                <a href="#import-export" className="hover:text-white transition-colors">
                  {t.corridor.axes['cn-lub'].title}
                </a>
              </li>
              <li>
                <a href="#import-export" className="hover:text-white transition-colors">
                  {t.corridor.axes['kin-lub'].title}
                </a>
              </li>
              <li>
                <a href="#import-export" className="hover:text-white transition-colors">
                  {t.corridor.axes['lub-kin'].title}
                </a>
              </li>
              <li className="pt-1">
                <button
                  type="button"
                  onClick={() => openAuthModal('admin')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-[#168ACB] transition-colors cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t.nav.login} (Admin / Utilisateur)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Main Offices Column */}
          <div className="lg:col-span-3 space-y-3 text-xs text-[#D9E8F1]/80 leading-relaxed">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#D9E8F1]">
              {t.footer.officesTitle}
            </h3>
            <div>
              <strong className="text-white block">Kinshasa (RDC)</strong>
              <span>Av. Usoke N°132, C/Kinshasa · +243 863408853</span>
            </div>
            <div>
              <strong className="text-white block">Lubumbashi (RDC)</strong>
              <span>Av. Maniema coin Kambove N°54 · +243 893543162</span>
            </div>
            <div>
              <strong className="text-white block">Guangzhou (Chine — Manager Emile OWALA)</strong>
              <span>Rm. 1802, Lao Gan East Building · +86-13760630460</span>
            </div>
            <div>
              <strong className="text-white block">Brazzaville · Angola</strong>
              <span>+242 069706279 · +244 946 419 037</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#D9E8F1]/65">
          <p>
            © {new Date().getFullYear()} {t.footer.rights}
          </p>
          <p>{t.footer.configurableNotice}</p>
        </div>
      </div>
    </footer>
  );
};
