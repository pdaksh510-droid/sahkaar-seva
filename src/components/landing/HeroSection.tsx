import React from 'react';
import { useApp } from '../../context/AppContext';
import { SafeImage } from '../common/SafeImage';
import {
  Search,
  MapPin,
  Calendar,
  ShieldCheck,
  Award,
  Zap,
  Droplets,
  Tractor,
  Hammer,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Users,
  Building2,
  TrendingUp
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const {
    t,
    searchQuery,
    setSearchQuery,
    selectedDistrict,
    setSelectedDistrict,
    setActiveView,
    setIsBookingModalOpen,
    setIsWorkerRegisterModalOpen,
    setIsEmergencyModalOpen,
    workers,
    services,
    setSelectedWorkerForProfile,
    setSelectedServiceForBooking
  } = useApp();

  const featuredWorker = workers[0]; // Ramesh Patel
  const featuredService = services[0]; // Tube-well & solar pump service

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveView('services');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f5fbf7] via-[#faf8f5] to-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/60">
      
      {/* Decorative Indian folk-inspired background geometry */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-emerald-100/50 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-0 -ml-24 w-80 h-80 rounded-full bg-amber-100/40 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-900 border border-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            Verified Labour Cooperative Network
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            Theme: Agriculture, FoodTech & Rural Development
          </span>
        </div>

        {/* Hero Title & Subtext */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] font-brand-display">
              {t.headline}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {t.heroSubtext}
            </p>

            {/* Quick Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-lg shadow-emerald-900/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-emerald-200" />
                <span>{t.bookService}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => setIsEmergencyModalOpen(true)}
                className="px-5 py-3.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 font-bold text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600"></span>
                </span>
                <span>{t.needHelpNow}</span>
              </button>

              <button
                onClick={() => setIsWorkerRegisterModalOpen(true)}
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Award className="w-4 h-4 text-amber-600" />
                <span>{t.joinWorker}</span>
              </button>
            </div>

            {/* Interactive Search Bar & Location Selector */}
            <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/90 mt-6">
              <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-stretch gap-2">
                
                {/* Location Select */}
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 sm:w-52 shrink-0">
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full bg-transparent text-xs font-semibold text-slate-800 focus:outline-hidden cursor-pointer"
                  >
                    <option value="all">📍 All India Districts</option>
                    <option value="Anand">Anand (Gujarat)</option>
                    <option value="Pune">Pune (Maharashtra)</option>
                    <option value="Ludhiana">Ludhiana (Punjab)</option>
                    <option value="Coimbatore">Coimbatore (Tamil Nadu)</option>
                    <option value="Varanasi">Varanasi (Uttar Pradesh)</option>
                    <option value="Jodhpur">Jodhpur (Rajasthan)</option>
                    <option value="Kozhikode">Kozhikode (Kerala)</option>
                    <option value="Bengaluru Rural">Bengaluru Rural (Karnataka)</option>
                  </select>
                </div>

                {/* Service Query Input */}
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 flex-1">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden"
                  />
                </div>

                {/* Search Submit Button */}
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-900 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  <Search className="w-4 h-4 text-slate-900" />
                  <span>Search</span>
                </button>
              </form>

              {/* Quick Suggestion Pills */}
              <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
                <span className="font-semibold text-slate-400">Popular:</span>
                {[
                  { label: 'Tube-Well Motor', icon: Droplets },
                  { label: 'Tractor Mechanic', icon: Tractor },
                  { label: 'Solar Rooftop', icon: Zap },
                  { label: 'Farm Fencing', icon: Hammer },
                  { label: 'Elder Care', icon: HeartHandshake }
                ].map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => {
                      setSearchQuery(s.label);
                      setActiveView('services');
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300 border border-slate-200/80 transition-colors text-slate-700 font-medium"
                  >
                    <s.icon className="w-3 h-3 text-emerald-700" />
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cooperative Difference Ribbon */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span><strong>85% Direct Worker Payout</strong> (No 30% platform cuts)</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span><strong>10% Member Welfare Fund</strong> (Ayushman + PM-SYM)</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span><strong>Aadhaar & Police Verified</strong></span>
              </div>
            </div>
          </div>

          {/* Right Visual Card: Real Indian Worker Spotlight & Trust Architecture */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Photo Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                <SafeImage
                  src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80"
                  alt="Indian rural technician repairing farm machinery with cooperative dedication"
                  fallbackType="service"
                  onClick={() => setActiveView('services')}
                  className="w-full h-96 sm:h-[430px] object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 cursor-pointer"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none"></div>

                {/* Top Badge on image */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-emerald-900/90 text-emerald-200 border border-emerald-600/50 backdrop-blur-md text-xs font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-beacon-green"></span>
                    Verified Cooperative Technician
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-extrabold shadow-sm">
                    ★ 4.94
                  </span>
                </div>

                {/* Worker Mini Card Info pinned inside */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-xl">
                  <div
                    onClick={() => setSelectedWorkerForProfile(featuredWorker)}
                    className="flex items-center gap-3 cursor-pointer group/worker"
                    title="Click to view full profile"
                  >
                    <SafeImage
                      src={featuredWorker.avatar}
                      alt={featuredWorker.name}
                      fallbackType="avatar"
                      fallbackText={featuredWorker.name}
                      className="w-12 h-12 rounded-xl object-cover border-2 border-emerald-600 shadow-sm group-hover/worker:scale-105 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-slate-900 text-sm truncate group-hover/worker:text-emerald-800">
                          {featuredWorker.name}
                        </h4>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                          {featuredWorker.yearsExperience} Yrs Exp
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate">
                        {featuredWorker.cooperativeName}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-emerald-700 font-semibold">
                        <span>{featuredWorker.completedJobsCount} Jobs Completed</span>
                        <span>•</span>
                        <span>₹5,00,000 Mediclaim Active</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-600">
                      Standard Fair Rate: <strong className="text-slate-900">₹{featuredWorker.baseHourlyRate}/visit</strong>
                    </span>
                    <button
                      onClick={() => {
                        setSelectedServiceForBooking(featuredService);
                        setIsBookingModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs cursor-pointer active:scale-95 transition-transform"
                    >
                      Book Worker
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Social Security Pill */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-3.5 shadow-xl border border-slate-200/90 hidden sm:flex items-center gap-3 max-w-[260px] animate-bounce-slow">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-900">100% Insured Workers</div>
                  <div className="text-[10px] text-slate-500">Every task protected under cooperative welfare fund</div>
                </div>
              </div>

              {/* Floating AI Demand Badge */}
              <div className="absolute -top-5 -right-4 bg-emerald-900 text-white rounded-2xl p-3 shadow-xl border border-emerald-700 hidden sm:flex items-center gap-2.5">
                <TrendingUp className="w-4 h-4 text-emerald-300" />
                <div className="text-left text-[11px]">
                  <div className="font-bold text-amber-300">AI Geo-Matching</div>
                  <div className="text-[10px] text-emerald-200">15 Min Rapid Rural ETA</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Live Community Impact Statistics */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Active Workers
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-brand-display">
              24,800+
            </div>
            <div className="text-xs text-emerald-700 font-medium mt-1 flex items-center gap-1">
              <span>Aadhaar & Skill Certified</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Cooperative Societies
              </span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-brand-display">
              312+
            </div>
            <div className="text-xs text-amber-700 font-medium mt-1 flex items-center gap-1">
              <span>Across 8 Major States</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Jobs Completed
              </span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-brand-display">
              185,000+
            </div>
            <div className="text-xs text-blue-700 font-medium mt-1 flex items-center gap-1">
              <span>4.9★ Average Consumer Trust</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Welfare Pool Disbursed
              </span>
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-brand-display">
              ₹4.8 Cr+
            </div>
            <div className="text-xs text-purple-700 font-medium mt-1 flex items-center gap-1">
              <span>Mediclaim, Tools & Education</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
