import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Scale,
  ShieldCheck,
  Users2,
  Wheat,
  Coins,
  HeartHandshake,
  Check,
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const { setActiveView, setIsWorkerRegisterModalOpen, setIsBookingModalOpen } = useApp();

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200 mb-3">
            <Scale className="w-3.5 h-3.5 text-emerald-700" />
            The Cooperative Economic Advantage
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-brand-display">
            Why Cooperative Gig Services Transform Indian Work
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Conventional private gig platforms treat skilled tradespeople as expendable data points. 
            Sahkaar Seva restores dignity, ownership, and social security through registered Labour Cooperative Societies.
          </p>
        </div>

        {/* Comparison Table / Side-by-Side Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Conventional Private Aggregator Platform Card */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 relative">
            <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                  Standard Private Gig Platforms
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  Private Tech Aggregators
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-sm">
                ✕
              </div>
            </div>

            <ul className="space-y-4 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="text-slate-800">25% – 35% High Commissions:</strong> Significant cut extracted from each job to fuel VC profits, leaving workers underpaid.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="text-slate-800">Zero Social Security:</strong> No health insurance, no provident fund, no accident cover for the worker's family.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="text-slate-800">Algorithmic Arbitrary Bans:</strong> Black-box AI deactivates accounts without human hearings or cooperative union backing.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="text-slate-800">Neglect of Rural & Agro Tech:</strong> Exclusively targets tier-1 metro apartment cleaning; zero support for farm machinery or tube-wells.
                </div>
              </li>
            </ul>
          </div>

          {/* Sahkaar Seva Cooperative Card */}
          <div className="bg-gradient-to-br from-emerald-900 to-[#0b3b29] text-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-600 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none"></div>

            <div className="flex items-center justify-between pb-6 border-b border-emerald-800/80 mb-6 relative">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  The Sahkaar Seva Model
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Labour Cooperative Societies
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-sm shadow-md">
                ✓
              </div>
            </div>

            <ul className="space-y-4 text-xs sm:text-sm text-emerald-100/90 relative">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-700 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="text-white">85% Direct Worker Payout:</strong> Cooperative sets fair benchmark rates. Wages hit the worker's bank immediately.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-700 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="text-white">10% Dedicated Member Welfare Fund:</strong> Built-in contribution to ₹5 Lakh Ayushman Mediclaim, PM-SYM pensions & tool loans.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-700 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="text-white">Democratic Member Representation:</strong> Workers are voting shareholders in their cooperative federation with grievance redressal.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-700 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="text-white">Deep Rural & Agri-Tech Ecosystem:</strong> Dedicated squads for solar pumps, harvesters, milk chilling & community panchayat assets.
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* 4 Feature Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-2xl bg-[#faf8f5] border border-amber-200/80 hover:border-amber-400 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-800 flex items-center justify-center mb-4">
              <Coins className="w-6 h-6 text-amber-700" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-2">
              Fair & Transparent Pricing
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Standardized cooperative district rates prevent customer price gouging while ensuring living wages for skilled artisans.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#faf8f5] border border-emerald-200/80 hover:border-emerald-400 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-800 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-emerald-700" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-2">
              Multi-Tier Verification
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Aadhaar KYC, e-Shram registry, NSDC/ITI certification check, and local police verification cleared before dispatch.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#faf8f5] border border-blue-200/80 hover:border-blue-400 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-800 flex items-center justify-center mb-4">
              <Wheat className="w-6 h-6 text-blue-700" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-2">
              Rural Economic Retention
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Retains money within the village and district economy, preventing distress migration to overcrowded metros.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#faf8f5] border border-purple-200/80 hover:border-purple-400 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-800 flex items-center justify-center mb-4">
              <HeartHandshake className="w-6 h-6 text-purple-700" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-2">
              100% Social Security
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Health, accidental, pension, and education grants funded directly by cooperative service revenues.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
