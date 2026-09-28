import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole, LanguageCode } from '../../types';
import {
  ShieldCheck,
  Globe,
  Bell,
  UserCheck,
  AlertCircle,
  Menu,
  X,
  Sparkles,
  MapPin,
  Calendar,
  Compass,
  CheckCircle,
  Wheat,
  PhoneCall
} from 'lucide-react';

const languageOptions: { code: LanguageCode; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' }
];

const personaOptions: { role: UserRole; label: string; badge: string; desc: string }[] = [
  { role: 'customer', label: 'Customer', badge: 'Households & Farms', desc: 'Browse services, book workers & pay' },
  { role: 'worker', label: 'Coop Worker', badge: 'Ramesh Patel (Pump Tech)', desc: 'View job requests, earnings & welfare' },
  { role: 'coop_admin', label: 'Coop Society Admin', badge: 'Anand Agro-Tech Coop', desc: 'Verify workers, dispatch & allocate AI' },
  { role: 'federation_admin', label: 'Federation Admin', badge: 'State Federation', desc: 'Multi-district oversight & macro welfare' },
  { role: 'super_admin', label: 'Super Admin', badge: 'National Apex Platform', desc: 'National analytics & audits' }
];

export const Header: React.FC = () => {
  const {
    role,
    setRole,
    language,
    setLanguage,
    t,
    activeView,
    setActiveView,
    notifications,
    markAllNotificationsRead,
    setIsBookingModalOpen,
    setIsWorkerRegisterModalOpen,
    setIsEmergencyModalOpen
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isPersonaModalOpen, setIsPersonaModalOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const currentRoleInfo = personaOptions.find(p => p.role === role) || personaOptions[0];

  return (
    <>
      {/* Top Solidarity Banner */}
      <div className="bg-[#0b3b29] text-emerald-100 text-xs py-1.5 px-4 sm:px-8 border-b border-emerald-800/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-amber-500 text-slate-900 font-bold text-[10px]">
              सह
            </span>
            <span className="font-medium tracking-wide">
              Ministry of Cooperation & State Labour Cooperative Societies Initiative
            </span>
            <span className="hidden md:inline-block text-emerald-400/60">|</span>
            <span className="hidden md:inline-block text-emerald-300">
              Fair Wages • 100% Social Security • Zero Middlemen
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-amber-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              24,800+ Verified Shramiks Active
            </span>
            <button
              onClick={() => setIsEmergencyModalOpen(true)}
              className="flex items-center gap-1 font-semibold text-rose-300 hover:text-white transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-rose-400" />
              Emergency Helpline: 1800-200-SEVA
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div
            onClick={() => setActiveView('landing')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-amber-700 flex items-center justify-center text-white shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform">
              <div className="relative flex items-center justify-center">
                <Wheat className="w-6 h-6 text-amber-300" />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-orange-500 rounded-full flex items-center justify-center text-[8px] font-bold">
                  ✓
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-brand-display">
                  {t.brandName}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Cooperative
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 text-sm font-medium text-slate-700">
            <button
              onClick={() => setActiveView('landing')}
              className={`px-3 py-2 rounded-lg transition-all ${
                activeView === 'landing'
                  ? 'bg-emerald-50 text-emerald-900 font-semibold shadow-xs'
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveView('services')}
              className={`px-3 py-2 rounded-lg transition-all ${
                activeView === 'services'
                  ? 'bg-emerald-50 text-emerald-900 font-semibold shadow-xs'
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Services Marketplace
            </button>
            <button
              onClick={() => setActiveView('rural')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                activeView === 'rural'
                  ? 'bg-amber-50 text-amber-900 font-semibold shadow-xs'
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Wheat className="w-3.5 h-3.5 text-amber-600" />
              Rural & Agro-Tech
            </button>
            <button
              onClick={() => setActiveView('emergency')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                activeView === 'emergency'
                  ? 'bg-rose-50 text-rose-800 font-bold shadow-xs'
                  : 'text-rose-700 hover:bg-rose-50'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
              </span>
              Emergency 24x7
            </button>
            <button
              onClick={() => setActiveView('map')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                activeView === 'map'
                  ? 'bg-emerald-50 text-emerald-900 font-semibold shadow-xs'
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-emerald-700" />
              Geo-Spatial Map
            </button>
            <button
              onClick={() => setActiveView('welfare')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                activeView === 'welfare'
                  ? 'bg-emerald-50 text-emerald-900 font-semibold shadow-xs'
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              Welfare Scorecard
            </button>
            <button
              onClick={() => setActiveView('dashboard')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                activeView === 'dashboard'
                  ? 'bg-emerald-800 text-white font-semibold shadow-sm'
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              {role === 'customer'
                ? 'My Bookings'
                : role === 'worker'
                ? 'Worker Portal'
                : role === 'coop_admin'
                ? 'Coop Operations'
                : 'Federation Portal'}
            </button>
          </nav>

          {/* Right Controls: Language, Persona Switcher, Notifications & CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsLangDropdownOpen(!isLangDropdownOpen);
                  setIsNotifDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors border border-slate-200"
                title="Change Language"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-semibold uppercase">{language}</span>
                <span className="text-[11px] text-slate-500 hidden md:inline">
                  ({languageOptions.find(l => l.code === language)?.native})
                </span>
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Select Language / भाषा
                  </div>
                  {languageOptions.map(opt => (
                    <button
                      key={opt.code}
                      onClick={() => {
                        setLanguage(opt.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition-colors ${
                        language === opt.code
                          ? 'bg-emerald-50 text-emerald-900 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{opt.label}</span>
                      <span className="font-medium text-slate-500">{opt.native}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Persona Switcher Button (Demo Mode) */}
            <button
              onClick={() => setIsPersonaModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-900 hover:border-amber-400 hover:shadow-xs transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin-slow" />
              <div className="text-left hidden sm:block leading-tight">
                <div className="text-[10px] text-amber-700 font-medium">Demo Persona</div>
                <div className="font-bold text-slate-900">{currentRoleInfo.label}</div>
              </div>
              <span className="sm:hidden font-bold">{currentRoleInfo.label}</span>
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotifDropdownOpen(!isNotifDropdownOpen);
                  setIsLangDropdownOpen(false);
                }}
                className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white"></span>
                )}
              </button>

              {isNotifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-slate-900 text-sm">Notifications</h4>
                      {unreadCount > 0 && (
                        <span className="text-[10px] bg-rose-100 text-rose-700 font-bold px-1.5 py-0.5 rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-xs text-emerald-700 hover:text-emerald-900 font-medium"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-2">
                    {notifications.map(n => (
                      <div
                        key={n.id}
                        className={`py-2.5 px-1 text-xs transition-colors ${
                          n.read ? 'opacity-70' : 'bg-emerald-50/40 rounded-lg px-2'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-semibold text-slate-900">{n.title}</span>
                          <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                        </div>
                        <p className="text-slate-600 mt-1 leading-relaxed">{n.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="hidden md:inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 active:scale-95 rounded-lg shadow-sm shadow-emerald-900/10 transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t.bookService}</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-lg">
            <button
              onClick={() => {
                setActiveView('landing');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg font-medium text-slate-800 hover:bg-slate-100"
            >
              Home
            </button>
            <button
              onClick={() => {
                setActiveView('services');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg font-medium text-slate-800 hover:bg-slate-100"
            >
              Services Marketplace
            </button>
            <button
              onClick={() => {
                setActiveView('rural');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg font-medium text-amber-800 hover:bg-amber-50 flex items-center gap-2"
            >
              <Wheat className="w-4 h-4 text-amber-600" />
              Rural & Agro-Tech
            </button>
            <button
              onClick={() => {
                setActiveView('emergency');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg font-bold text-rose-700 hover:bg-rose-50"
            >
              🚨 Emergency 24x7 Help
            </button>
            <button
              onClick={() => {
                setActiveView('map');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg font-medium text-slate-800 hover:bg-slate-100 flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-emerald-700" />
              Geo-Spatial Map
            </button>
            <button
              onClick={() => {
                setActiveView('welfare');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg font-medium text-slate-800 hover:bg-slate-100 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              Worker Welfare & Scorecard
            </button>
            <button
              onClick={() => {
                setActiveView('dashboard');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg font-medium text-emerald-900 bg-emerald-50 hover:bg-emerald-100 flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-emerald-700" />
              Dashboard ({currentRoleInfo.label})
            </button>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsBookingModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-lg bg-emerald-800 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                {t.bookService}
              </button>
              <button
                onClick={() => {
                  setIsWorkerRegisterModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-lg border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-slate-500" />
                {t.joinWorker}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Demo Persona Modal */}
      {isPersonaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full p-6 sm:p-8 relative">
            <button
              onClick={() => setIsPersonaModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-brand-display">
                  Explore Demo Personas
                </h3>
                <p className="text-xs text-slate-500">
                  Switch perspectives instantly to test user flows across the cooperative ecosystem.
                </p>
              </div>
            </div>

            <div className="space-y-3 mt-6">
              {personaOptions.map(p => {
                const isSelected = role === p.role;
                return (
                  <button
                    key={p.role}
                    onClick={() => {
                      setRole(p.role);
                      setIsPersonaModalOpen(false);
                      // If switching to worker or admin, take them right to their dashboard!
                      if (p.role !== 'customer') {
                        setActiveView('dashboard');
                      }
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-600'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{p.label}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-emerald-200 text-emerald-900' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {p.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{p.desc}</p>
                    </div>

                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                    }`}>
                      {isSelected && <CheckCircle className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                All demo data is sandboxed & interactive
              </span>
              <button
                onClick={() => setIsPersonaModalOpen(false)}
                className="font-semibold text-emerald-800 hover:text-emerald-950"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
