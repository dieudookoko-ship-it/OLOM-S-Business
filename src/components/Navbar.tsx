import React, { useState } from 'react';
import { ArrowRight, Menu, X, UserCheck } from 'lucide-react';
import { BRAND_INFO } from '../data/companyData';
import { useLogistics } from '../context/LogisticsContext';
import { Language } from '../types/logistics';

export const Navbar: React.FC = () => {
  const { lang, setLang, t, openAuthModal, authSession } = useLogistics();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '#apropos', label: t.nav.about },
    { href: '#services', label: t.nav.services },
    { href: '#import-export', label: t.nav.corridor },
    { href: '#suivi', label: t.nav.tracking },
    { href: '#contact', label: t.nav.contact },
  ];

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#D9E8F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark + Original Unmodified Logo */}
        <a
          href="#accueil"
          className="flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#168ACB] rounded-md py-1"
        >
          <img
            src={BRAND_INFO.logoUrl}
            alt="Logo officiel OLOM'S International Business Co. Ltd."
            className="h-11 w-11 md:h-12 md:w-12 object-contain rounded-full shrink-0 bg-white"
            referrerPolicy="no-referrer"
          />
          <span className="font-display text-lg md:text-xl font-bold tracking-tight text-[#102E49] whitespace-nowrap shrink-0">
            {BRAND_INFO.tradeName}
          </span>
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Navigation principale"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#102E49]/80"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 hover:text-[#168ACB] transition-colors duration-150 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#168ACB] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#168ACB] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action CTA (desktop) + mobile menu toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#devis"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#102E49] hover:bg-[#168ACB] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#168ACB] focus-visible:ring-offset-2"
          >
            <span>{t.nav.quoteCta}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md border border-[#D9E8F1] text-[#102E49] hover:bg-[#D9E8F1]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#168ACB]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#D9E8F1] bg-white px-4 py-5 space-y-4">
          <nav className="flex flex-col space-y-2" aria-label="Menu mobile">
            <a
              href="#accueil"
              onClick={handleLinkClick}
              className="px-3 py-2.5 text-base font-medium text-[#102E49] hover:bg-[#D9E8F1]/40 rounded-md"
            >
              {t.nav.home}
            </a>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="px-3 py-2.5 text-base font-medium text-[#102E49] hover:bg-[#D9E8F1]/40 rounded-md"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#devis"
              onClick={handleLinkClick}
              className="px-3 py-2.5 text-base font-semibold text-white bg-[#102E49] hover:bg-[#168ACB] rounded-md flex items-center justify-between"
            >
              <span>{t.nav.quoteCta}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </nav>

          <div className="pt-3 border-t border-[#D9E8F1] flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center p-1 bg-[#D9E8F1]/60 rounded-md" role="group" aria-label="Sélecteur de langue">
              {(['fr', 'en', 'zh'] as Language[]).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap shrink-0 ${
                    lang === code
                      ? 'bg-[#102E49] text-white'
                      : 'text-[#102E49] hover:bg-white/70'
                  }`}
                >
                  {code === 'zh' ? '中文' : code.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openAuthModal('client');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#102E49] border border-[#102E49]/20 rounded-md hover:bg-[#D9E8F1]/40"
            >
              <UserCheck className="w-4 h-4 text-[#168ACB]" aria-hidden="true" />
              <span>{authSession ? authSession.name : t.nav.login}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
