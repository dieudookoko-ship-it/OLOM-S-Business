import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  LogOut,
  PackagePlus,
  Settings,
  ShieldCheck,
  User,
  X,
} from 'lucide-react';
import { useLogistics } from '../context/LogisticsContext';
import {
  AxisId,
  ConfigurableSettings,
  FreightMode,
  ShipmentRecord,
  UserRole,
} from '../types/logistics';

export const AuthPortalModal: React.FC = () => {
  const {
    t,
    isAuthModalOpen,
    closeAuthModal,
    authModalInitialRole,
    authSession,
    login,
    logout,
    settings,
    updateSettings,
    shipments,
    addShipment,
    updateShipmentStatus,
    quoteRequests,
    updateQuoteStatus,
    setTrackingQueryFromExternal,
  } = useLogistics();

  const [roleTab, setRoleTab] = useState<UserRole>('client');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  // Admin Portal tabs
  const [adminTab, setAdminTab] = useState<'config' | 'shipments' | 'quotes'>('config');
  const [draftSettings, setDraftSettings] = useState<ConfigurableSettings>(settings);
  const [configSaved, setConfigSaved] = useState(false);

  // New shipment form state
  const [newCode, setNewCode] = useState('');
  const [newClient, setNewClient] = useState('');
  const [newAxis, setNewAxis] = useState<AxisId>('cn-kin');
  const [newMode, setNewMode] = useState<FreightMode>('air');
  const [newWeight, setNewWeight] = useState('');

  useEffect(() => {
    setRoleTab(authModalInitialRole);
  }, [authModalInitialRole, isAuthModalOpen]);

  useEffect(() => {
    setDraftSettings(settings);
  }, [settings]);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(roleTab, identifier || (roleTab === 'admin' ? 'Admin OLOM' : 'Client'));
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(draftSettings);
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 2500);
  };

  const handleCreateShipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;
    const today = new Date().toISOString().slice(0, 10);
    const axisObj = t.corridor.axes[newAxis];
    const record: ShipmentRecord = {
      trackingNumber: newCode.trim().toUpperCase(),
      clientName: newClient.trim() || 'Client OLOM’S',
      axis: newAxis,
      mode: newMode,
      status: 'received_origin',
      origin: axisObj.originHub,
      destination: axisObj.destinationHub,
      weightOrVolume: newWeight.trim() || 'À confirmer',
      updatedAt: today,
      notes: 'Enregistré depuis l’espace Administrateur.',
      milestones: [
        { step: 'Réception origine', location: axisObj.originHub, date: today, completed: true },
        { step: 'Transit international / corridor', location: 'En cours', date: 'En attente', completed: false },
        { step: 'Formalités douanières', location: axisObj.destinationHub, date: 'En attente', completed: false },
        { step: 'Livraison finale', location: axisObj.destinationHub, date: 'En attente', completed: false },
      ],
    };
    addShipment(record);
    setNewCode('');
    setNewClient('');
    setNewWeight('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#102E49]/70 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-portal-title"
    >
      <div className="bg-white border border-[#D9E8F1] rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-[#D9E8F1] px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h2 id="auth-portal-title" className="font-display text-lg sm:text-xl font-bold text-[#102E49]">
              {t.auth.title}
            </h2>
            <p className="text-xs text-[#102E49]/65 mt-0.5">{t.auth.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={closeAuthModal}
            aria-label="Fermer"
            className="w-10 h-10 rounded-md border border-[#D9E8F1] flex items-center justify-center text-[#102E49] hover:bg-[#D9E8F1]/40 cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {!authSession ? (
            <div className="max-w-md mx-auto space-y-6">
              {/* Role Tabs */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#F8FBFD] border border-[#D9E8F1] rounded-lg">
                <button
                  type="button"
                  onClick={() => setRoleTab('client')}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                    roleTab === 'client'
                      ? 'bg-[#102E49] text-white'
                      : 'text-[#102E49]/70 hover:text-[#102E49]'
                  }`}
                >
                  <User className="w-4 h-4" aria-hidden="true" />
                  <span>{t.auth.clientTab}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRoleTab('admin')}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                    roleTab === 'admin'
                      ? 'bg-[#102E49] text-white'
                      : 'text-[#102E49]/70 hover:text-[#102E49]'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                  <span>{t.auth.adminTab}</span>
                </button>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label htmlFor="auth-id" className="block text-xs font-semibold text-[#102E49] mb-1.5">
                    {t.auth.identifierLabel}
                  </label>
                  <input
                    id="auth-id"
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={roleTab === 'admin' ? 'emile_owala@yahoo.fr' : 'client@entreprise.cd'}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F8FBFD] border border-[#D9E8F1] rounded-md focus:outline-none focus:ring-2 focus:ring-[#168ACB]"
                  />
                </div>

                <div>
                  <label htmlFor="auth-pwd" className="block text-xs font-semibold text-[#102E49] mb-1.5">
                    {t.auth.passwordLabel}
                  </label>
                  <input
                    id="auth-pwd"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F8FBFD] border border-[#D9E8F1] rounded-md focus:outline-none focus:ring-2 focus:ring-[#168ACB]"
                  />
                </div>

                <p className="text-xs text-[#102E49]/65 bg-[#F8FBFD] border border-[#D9E8F1] rounded-md p-3">
                  {t.auth.demoNote}
                </p>

                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm font-semibold text-white bg-[#168ACB] hover:bg-[#102E49] rounded-md transition-colors cursor-pointer"
                >
                  {t.auth.loginBtn}
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Logged in bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#D9E8F1]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-[#D9E8F1]/60 flex items-center justify-center text-[#102E49]">
                    {authSession.role === 'admin' ? (
                      <ShieldCheck className="w-5 h-5 text-[#168ACB]" />
                    ) : (
                      <User className="w-5 h-5 text-[#168ACB]" />
                    )}
                  </div>
                  <div>
                    <div className="font-display font-bold text-[#102E49]">
                      {authSession.name}
                    </div>
                    <div className="text-xs text-[#102E49]/65">
                      {authSession.role === 'admin' ? t.auth.adminTab : t.auth.clientTab}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#102E49] border border-[#D9E8F1] hover:bg-[#D9E8F1]/40 rounded-md cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t.auth.logoutBtn}</span>
                </button>
              </div>

              {authSession.role === 'client' ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display text-base font-bold text-[#102E49] mb-3">
                      {t.auth.clientDashboard.myQuotes}
                    </h3>
                    {quoteRequests.length === 0 ? (
                      <p className="text-sm text-[#102E49]/65 bg-[#F8FBFD] border border-[#D9E8F1] rounded-md p-4">
                        {t.auth.clientDashboard.noQuotes}
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {quoteRequests.map((q) => (
                          <div
                            key={q.id}
                            className="p-4 bg-[#F8FBFD] border border-[#D9E8F1] rounded-md flex flex-wrap items-center justify-between gap-3 text-sm"
                          >
                            <div>
                              <div className="font-mono font-bold text-[#102E49]">{q.id}</div>
                              <div className="text-xs text-[#102E49]/70">
                                {t.corridor.axes[q.axis].title} · {t.quote.modes[q.mode]} · {q.cargoDescription}
                              </div>
                            </div>
                            <span className="text-xs font-semibold text-[#168ACB] uppercase">
                              {q.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-display text-base font-bold text-[#102E49] mb-3">
                      {t.auth.clientDashboard.quickTrack}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {shipments.map((s) => (
                        <button
                          key={s.trackingNumber}
                          type="button"
                          onClick={() => {
                            setTrackingQueryFromExternal(s.trackingNumber);
                            closeAuthModal();
                            document.getElementById('suivi')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="text-left p-4 bg-[#F8FBFD] hover:bg-[#D9E8F1]/40 border border-[#D9E8F1] rounded-md transition-colors cursor-pointer"
                        >
                          <div className="font-mono text-sm font-bold text-[#102E49]">
                            {s.trackingNumber}
                          </div>
                          <div className="text-xs text-[#102E49]/70 mt-1">
                            {t.corridor.axes[s.axis].title} · {t.tracking.statusLabels[s.status]}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Admin Sub-tabs */}
                  <div className="flex flex-wrap gap-2 border-b border-[#D9E8F1] pb-3">
                    <button
                      type="button"
                      onClick={() => setAdminTab('config')}
                      className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md cursor-pointer ${
                        adminTab === 'config'
                          ? 'bg-[#102E49] text-white'
                          : 'bg-[#F8FBFD] text-[#102E49] border border-[#D9E8F1]'
                      }`}
                    >
                      <Settings className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{t.auth.adminDashboard.configTab}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAdminTab('shipments')}
                      className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md cursor-pointer ${
                        adminTab === 'shipments'
                          ? 'bg-[#102E49] text-white'
                          : 'bg-[#F8FBFD] text-[#102E49] border border-[#D9E8F1]'
                      }`}
                    >
                      <PackagePlus className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>
                        {t.auth.adminDashboard.shipmentsTab} ({shipments.length})
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAdminTab('quotes')}
                      className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md cursor-pointer ${
                        adminTab === 'quotes'
                          ? 'bg-[#102E49] text-white'
                          : 'bg-[#F8FBFD] text-[#102E49] border border-[#D9E8F1]'
                      }`}
                    >
                      <span>
                        {t.auth.adminDashboard.quotesTab} ({quoteRequests.length})
                      </span>
                    </button>
                  </div>

                  {/* Admin Tab 1: Configurable Missing Info */}
                  {adminTab === 'config' && (
                    <form onSubmit={handleSaveSettings} className="space-y-4">
                      <p className="text-xs text-[#102E49]/75 bg-[#F8FBFD] border border-[#D9E8F1] rounded-md p-3">
                        {t.auth.adminDashboard.configIntro}
                      </p>

                      {configSaved && (
                        <div className="flex items-center gap-2 p-3 rounded-md bg-[#D9E8F1]/60 text-[#102E49] text-xs font-semibold">
                          <CheckCircle2 className="w-4 h-4 text-[#168ACB]" />
                          <span>{t.auth.adminDashboard.savedToast}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#102E49] mb-1">
                            Année de fondation
                          </label>
                          <input
                            type="text"
                            value={draftSettings.foundedYear}
                            onChange={(e) =>
                              setDraftSettings({ ...draftSettings, foundedYear: e.target.value })
                            }
                            placeholder="Ex : 2018 (laisser vide si non affiché)"
                            className="w-full px-3 py-2 text-sm bg-[#F8FBFD] border border-[#D9E8F1] rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#102E49] mb-1">
                            Numéro RCCM
                          </label>
                          <input
                            type="text"
                            value={draftSettings.rccmNumber}
                            onChange={(e) =>
                              setDraftSettings({ ...draftSettings, rccmNumber: e.target.value })
                            }
                            placeholder="À configurer"
                            className="w-full px-3 py-2 text-sm bg-[#F8FBFD] border border-[#D9E8F1] rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#102E49] mb-1">
                            Numéro ID. NAT / Import-Export
                          </label>
                          <input
                            type="text"
                            value={draftSettings.idNatNumber}
                            onChange={(e) =>
                              setDraftSettings({ ...draftSettings, idNatNumber: e.target.value })
                            }
                            placeholder="À configurer"
                            className="w-full px-3 py-2 text-sm bg-[#F8FBFD] border border-[#D9E8F1] rounded-md"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#102E49] mb-1">
                            Horaires d&apos;ouverture (FR)
                          </label>
                          <input
                            type="text"
                            value={draftSettings.openingHoursFr}
                            onChange={(e) =>
                              setDraftSettings({ ...draftSettings, openingHoursFr: e.target.value })
                            }
                            placeholder="Ex : Lun–Sam 08h00–17h00"
                            className="w-full px-3 py-2 text-sm bg-[#F8FBFD] border border-[#D9E8F1] rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#102E49] mb-1">
                            Délai indicatif Fret Aérien
                          </label>
                          <input
                            type="text"
                            value={draftSettings.airLeadTime}
                            onChange={(e) =>
                              setDraftSettings({ ...draftSettings, airLeadTime: e.target.value })
                            }
                            placeholder="Ex : 5–7 jours"
                            className="w-full px-3 py-2 text-sm bg-[#F8FBFD] border border-[#D9E8F1] rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#102E49] mb-1">
                            Délai indicatif Fret Maritime
                          </label>
                          <input
                            type="text"
                            value={draftSettings.seaLeadTime}
                            onChange={(e) =>
                              setDraftSettings({ ...draftSettings, seaLeadTime: e.target.value })
                            }
                            placeholder="Ex : 35–45 jours"
                            className="w-full px-3 py-2 text-sm bg-[#F8FBFD] border border-[#D9E8F1] rounded-md"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#102E49] mb-1">
                            Tarif indicatif Aérien ($/kg)
                          </label>
                          <input
                            type="text"
                            value={draftSettings.indicativeAirRate}
                            onChange={(e) =>
                              setDraftSettings({
                                ...draftSettings,
                                indicativeAirRate: e.target.value,
                              })
                            }
                            placeholder="À configurer"
                            className="w-full px-3 py-2 text-sm bg-[#F8FBFD] border border-[#D9E8F1] rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#102E49] mb-1">
                            Tarif indicatif Maritime ($/CBM)
                          </label>
                          <input
                            type="text"
                            value={draftSettings.indicativeSeaRate}
                            onChange={(e) =>
                              setDraftSettings({
                                ...draftSettings,
                                indicativeSeaRate: e.target.value,
                              })
                            }
                            placeholder="À configurer"
                            className="w-full px-3 py-2 text-sm bg-[#F8FBFD] border border-[#D9E8F1] rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#102E49] mb-1">
                            Adresse Bureau Angola
                          </label>
                          <input
                            type="text"
                            value={draftSettings.angolaAddress}
                            onChange={(e) =>
                              setDraftSettings({ ...draftSettings, angolaAddress: e.target.value })
                            }
                            placeholder="À configurer"
                            className="w-full px-3 py-2 text-sm bg-[#F8FBFD] border border-[#D9E8F1] rounded-md"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="px-5 py-2.5 text-sm font-semibold text-white bg-[#102E49] hover:bg-[#168ACB] rounded-md transition-colors cursor-pointer"
                      >
                        {t.auth.adminDashboard.saveConfigBtn}
                      </button>
                    </form>
                  )}

                  {/* Admin Tab 2: Shipment Tracking Management */}
                  {adminTab === 'shipments' && (
                    <div className="space-y-6">
                      <form
                        onSubmit={handleCreateShipment}
                        className="p-4 bg-[#F8FBFD] border border-[#D9E8F1] rounded-lg space-y-3"
                      >
                        <h4 className="font-display text-sm font-bold text-[#102E49]">
                          {t.auth.adminDashboard.addShipmentTitle}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                          <input
                            type="text"
                            required
                            value={newCode}
                            onChange={(e) => setNewCode(e.target.value)}
                            placeholder="N° OLM-2026-01"
                            className="px-3 py-2 text-xs font-mono bg-white border border-[#D9E8F1] rounded-md"
                          />
                          <input
                            type="text"
                            value={newClient}
                            onChange={(e) => setNewClient(e.target.value)}
                            placeholder="Nom client"
                            className="px-3 py-2 text-xs bg-white border border-[#D9E8F1] rounded-md"
                          />
                          <select
                            value={newAxis}
                            onChange={(e) => setNewAxis(e.target.value as AxisId)}
                            className="px-3 py-2 text-xs bg-white border border-[#D9E8F1] rounded-md"
                          >
                            <option value="cn-kin">Chine → Kinshasa</option>
                            <option value="cn-lub">Chine → Lubumbashi</option>
                            <option value="kin-lub">Kinshasa → Lubumbashi</option>
                            <option value="lub-kin">Lubumbashi → Kinshasa</option>
                          </select>
                          <select
                            value={newMode}
                            onChange={(e) => setNewMode(e.target.value as FreightMode)}
                            className="px-3 py-2 text-xs bg-white border border-[#D9E8F1] rounded-md"
                          >
                            <option value="air">Fret Aérien</option>
                            <option value="sea">Fret Maritime</option>
                            <option value="road">Routier</option>
                          </select>
                          <input
                            type="text"
                            value={newWeight}
                            onChange={(e) => setNewWeight(e.target.value)}
                            placeholder="Poids / CBM"
                            className="px-3 py-2 text-xs bg-white border border-[#D9E8F1] rounded-md"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-4 py-2 text-xs font-semibold text-white bg-[#168ACB] hover:bg-[#102E49] rounded-md cursor-pointer"
                        >
                          {t.auth.adminDashboard.createShipmentBtn}
                        </button>
                      </form>

                      <div className="space-y-3">
                        {shipments.map((s) => (
                          <div
                            key={s.trackingNumber}
                            className="p-4 bg-white border border-[#D9E8F1] rounded-md flex flex-wrap items-center justify-between gap-3 text-xs"
                          >
                            <div>
                              <div className="font-mono font-bold text-sm text-[#102E49]">
                                {s.trackingNumber}
                              </div>
                              <div className="text-[#102E49]/70">
                                {s.clientName} · {t.corridor.axes[s.axis].title} · {s.weightOrVolume}
                              </div>
                            </div>

                            <select
                              value={s.status}
                              onChange={(e) =>
                                updateShipmentStatus(
                                  s.trackingNumber,
                                  e.target.value as ShipmentRecord['status']
                                )
                              }
                              aria-label={`Statut pour ${s.trackingNumber}`}
                              className="px-3 py-1.5 text-xs font-semibold bg-[#F8FBFD] border border-[#D9E8F1] rounded-md text-[#102E49]"
                            >
                              <option value="received_origin">
                                {t.tracking.statusLabels.received_origin}
                              </option>
                              <option value="in_transit">
                                {t.tracking.statusLabels.in_transit}
                              </option>
                              <option value="customs_clearance">
                                {t.tracking.statusLabels.customs_clearance}
                              </option>
                              <option value="arrived_hub">
                                {t.tracking.statusLabels.arrived_hub}
                              </option>
                              <option value="delivered">
                                {t.tracking.statusLabels.delivered}
                              </option>
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Admin Tab 3: Quotes Inbox */}
                  {adminTab === 'quotes' && (
                    <div className="space-y-3">
                      {quoteRequests.length === 0 ? (
                        <p className="text-sm text-[#102E49]/65 p-4 bg-[#F8FBFD] border border-[#D9E8F1] rounded-md">
                          {t.auth.clientDashboard.noQuotes}
                        </p>
                      ) : (
                        quoteRequests.map((q) => (
                          <div
                            key={q.id}
                            className="p-4 bg-[#F8FBFD] border border-[#D9E8F1] rounded-md flex flex-wrap items-center justify-between gap-4 text-xs"
                          >
                            <div className="space-y-1">
                              <div className="font-mono font-bold text-sm text-[#102E49]">
                                {q.id} — {q.fullName} ({q.phone})
                              </div>
                              <div className="text-[#102E49]/75">
                                {t.corridor.axes[q.axis].title} · {t.quote.modes[q.mode]} ·{' '}
                                {q.cargoDescription} ({q.estimatedWeightVolume})
                              </div>
                            </div>

                            <select
                              value={q.status}
                              onChange={(e) =>
                                updateQuoteStatus(q.id, e.target.value as 'new' | 'reviewed' | 'quoted')
                              }
                              className="px-3 py-1.5 bg-white border border-[#D9E8F1] rounded-md font-semibold text-[#102E49]"
                            >
                              <option value="new">Nouveau</option>
                              <option value="reviewed">En étude</option>
                              <option value="quoted">Devis envoyé</option>
                            </select>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
