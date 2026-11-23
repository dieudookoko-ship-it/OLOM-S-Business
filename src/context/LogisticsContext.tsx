import React, { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_CONFIGURABLE_SETTINGS, INITIAL_SHIPMENTS } from '../data/companyData';
import { TRANSLATIONS, TranslationContent } from '../i18n/translations';
import {
  AuthSession,
  AxisId,
  ConfigurableSettings,
  FreightMode,
  Language,
  QuoteRequest,
  ShipmentRecord,
  UserRole,
} from '../types/logistics';

interface PreselectedQuote {
  axis?: AxisId;
  mode?: FreightMode;
}

interface LogisticsContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationContent;
  settings: ConfigurableSettings;
  updateSettings: (next: ConfigurableSettings) => void;
  shipments: ShipmentRecord[];
  addShipment: (shipment: ShipmentRecord) => void;
  updateShipmentStatus: (trackingNumber: string, status: ShipmentRecord['status'], note?: string) => void;
  quoteRequests: QuoteRequest[];
  submitQuoteRequest: (req: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>) => QuoteRequest;
  updateQuoteStatus: (id: string, status: QuoteRequest['status']) => void;
  authSession: AuthSession | null;
  login: (role: UserRole, identifier: string) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: (defaultRole?: UserRole) => void;
  closeAuthModal: () => void;
  authModalInitialRole: UserRole;
  preselectedQuote: PreselectedQuote;
  requestQuoteWithPreset: (preset: PreselectedQuote) => void;
  trackingQueryFromExternal: string;
  setTrackingQueryFromExternal: (code: string) => void;
}

const LogisticsContext = createContext<LogisticsContextType | null>(null);

const STORAGE_KEYS = {
  lang: 'oloms_lang_v1',
  settings: 'oloms_settings_v1',
  shipments: 'oloms_shipments_v1',
  quotes: 'oloms_quotes_v1',
  auth: 'oloms_auth_v1',
};

export const LogisticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.lang);
      if (saved === 'fr' || saved === 'en' || saved === 'zh') return saved;
    } catch {
      // ignore storage errors
    }
    return 'fr';
  });

  const [settings, setSettings] = useState<ConfigurableSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.settings);
      if (saved) return { ...DEFAULT_CONFIGURABLE_SETTINGS, ...JSON.parse(saved) };
    } catch {
      // ignore
    }
    return DEFAULT_CONFIGURABLE_SETTINGS;
  });

  const [shipments, setShipments] = useState<ShipmentRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.shipments);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_SHIPMENTS;
  });

  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.quotes);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  const [authSession, setAuthSession] = useState<AuthSession | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.auth);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalInitialRole, setAuthModalInitialRole] = useState<UserRole>('client');
  const [preselectedQuote, setPreselectedQuote] = useState<PreselectedQuote>({});
  const [trackingQueryFromExternal, setTrackingQueryFromExternal] = useState('');

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : lang;
  }, [lang]);

  const setLang = (next: Language) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEYS.lang, next);
    } catch {
      // ignore
    }
  };

  const updateSettings = (next: ConfigurableSettings) => {
    setSettings(next);
    try {
      localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const addShipment = (shipment: ShipmentRecord) => {
    setShipments((prev) => {
      const next = [shipment, ...prev.filter((s) => s.trackingNumber !== shipment.trackingNumber)];
      try {
        localStorage.setItem(STORAGE_KEYS.shipments, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const updateShipmentStatus = (
    trackingNumber: string,
    status: ShipmentRecord['status'],
    note?: string
  ) => {
    setShipments((prev) => {
      const next = prev.map((item) => {
        if (item.trackingNumber !== trackingNumber) return item;
        const today = new Date().toISOString().slice(0, 10);
        const statusOrder: ShipmentRecord['status'][] = [
          'received_origin',
          'in_transit',
          'customs_clearance',
          'arrived_hub',
          'delivered',
        ];
        const idx = statusOrder.indexOf(status);
        const updatedMilestones = item.milestones.map((m, i) => ({
          ...m,
          completed: i <= Math.min(idx, item.milestones.length - 1),
          date: i <= idx && m.date === 'En attente' ? today : m.date,
        }));
        return {
          ...item,
          status,
          updatedAt: today,
          notes: note !== undefined ? note : item.notes,
          milestones: updatedMilestones,
        };
      });
      try {
        localStorage.setItem(STORAGE_KEYS.shipments, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const submitQuoteRequest = (
    req: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>
  ): QuoteRequest => {
    const newReq: QuoteRequest = {
      ...req,
      id: `DEV-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    setQuoteRequests((prev) => {
      const next = [newReq, ...prev];
      try {
        localStorage.setItem(STORAGE_KEYS.quotes, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
    return newReq;
  };

  const updateQuoteStatus = (id: string, status: QuoteRequest['status']) => {
    setQuoteRequests((prev) => {
      const next = prev.map((q) => (q.id === id ? { ...q, status } : q));
      try {
        localStorage.setItem(STORAGE_KEYS.quotes, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const login = (role: UserRole, identifier: string) => {
    const cleanName = identifier.trim() || (role === 'admin' ? 'Administrateur' : 'Client');
    const session: AuthSession = {
      role,
      name: cleanName,
      identifier: cleanName,
    };
    setAuthSession(session);
    try {
      localStorage.setItem(STORAGE_KEYS.auth, JSON.stringify(session));
    } catch {
      // ignore
    }
  };

  const logout = () => {
    setAuthSession(null);
    try {
      localStorage.removeItem(STORAGE_KEYS.auth);
    } catch {
      // ignore
    }
  };

  const openAuthModal = (defaultRole: UserRole = 'client') => {
    setAuthModalInitialRole(defaultRole);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  const requestQuoteWithPreset = (preset: PreselectedQuote) => {
    setPreselectedQuote(preset);
    const el = document.getElementById('devis');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <LogisticsContext.Provider
      value={{
        lang,
        setLang,
        t: TRANSLATIONS[lang],
        settings,
        updateSettings,
        shipments,
        addShipment,
        updateShipmentStatus,
        quoteRequests,
        submitQuoteRequest,
        updateQuoteStatus,
        authSession,
        login,
        logout,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalInitialRole,
        preselectedQuote,
        requestQuoteWithPreset,
        trackingQueryFromExternal,
        setTrackingQueryFromExternal,
      }}
    >
      {children}
    </LogisticsContext.Provider>
  );
};

export const useLogistics = (): LogisticsContextType => {
  const ctx = useContext(LogisticsContext);
  if (!ctx) throw new Error('useLogistics must be used inside LogisticsProvider');
  return ctx;
};
