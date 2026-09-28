import React from 'react';
import { useApp } from '../../context/AppContext';
import { LazyImage } from '../common/LazyImage';
import { mockWelfareSchemes } from '../../data/mockData';
import {
  ShieldCheck,
  HeartHandshake,
  Award,
  Coins,
  GraduationCap,
  Wrench,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  FileText
} from 'lucide-react';

export const WelfareHighlight: React.FC = () => {
  const { setActiveView, setIsWorkerRegisterModalOpen, workers, setSelectedWorkerForProfile } = useApp();

  const topWorker = workers[0]; // Ramesh Patel with 96% welfare score

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200 mb-3">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-700" />
            Social Security & Welfare Engine
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-brand-display">
            Every Booking Strengthens Worker Welfare
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            In our cooperative ecosystem, 10% of every invoice directly replenishes the Labour Society Member Welfare Fund, safeguarding artisans against illness, accidents, and old age.
          </p>
        </div>

        {/* 4 Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {mockWelfareSchemes.map((scheme, idx) => {
            const icons = [ShieldCheck, TrendingUp, Wrench, GraduationCap];
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={scheme.title}
                className="bg-[#faf8f5] p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-emerald-700" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {scheme.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-2 leading-snug">
                    {scheme.title}
                  </h3>
                  <div className="text-xs font-semibold text-emerald-800 mb-2">
                    {scheme.coverage}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                    {scheme.fundedBy}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Enrolment:</span>
                  <span className="font-bold text-slate-900">{scheme.workersEnrolled}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Worker Welfare Scorecard Interactive Spotlight */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950">
                Transparent Accountability
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-brand-display">
                The Worker Welfare Scorecard
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Customers and administrators can inspect the exact social security status of every cooperative service provider. No hidden exploitation, no un-insured risks on your premises.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-white/10 p-3 rounded-xl border border-white/10 text-center">
                  <div className="text-xl font-bold text-emerald-400">100%</div>
                  <div className="text-[10px] text-slate-300 mt-0.5">Aadhaar Verified</div>
                </div>
                <div className="bg-white/10 p-3 rounded-xl border border-white/10 text-center">
                  <div className="text-xl font-bold text-amber-400">₹5 Lakh</div>
                  <div className="text-[10px] text-slate-300 mt-0.5">Mediclaim Shield</div>
                </div>
                <div className="bg-white/10 p-3 rounded-xl border border-white/10 text-center">
                  <div className="text-xl font-bold text-blue-400">e-Shram</div>
                  <div className="text-[10px] text-slate-300 mt-0.5">National Registry</div>
                </div>
                <div className="bg-white/10 p-3 rounded-xl border border-white/10 text-center">
                  <div className="text-xl font-bold text-purple-400">PM-SYM</div>
                  <div className="text-[10px] text-slate-300 mt-0.5">Pension Linked</div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveView('welfare')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Full Welfare Ledger</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsWorkerRegisterModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Join as Insured Worker
                </button>
              </div>
            </div>

            {/* Interactive Mock Scorecard Badge for Top Worker */}
            <div className="lg:col-span-5 bg-white text-slate-900 rounded-2xl p-6 shadow-2xl border-4 border-emerald-500">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div
                  onClick={() => setSelectedWorkerForProfile(topWorker)}
                  className="flex items-center gap-3 cursor-pointer group/worker"
                  title="Click to view welfare credentials"
                >
                  <LazyImage
                    src={topWorker.avatar}
                    alt={topWorker.name}
                    fallbackType="avatar"
                    fallbackText={topWorker.name}
                    className="w-12 h-12 rounded-xl object-cover border-2 border-emerald-600 shadow-xs group-hover/worker:scale-105 transition-transform"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm group-hover/worker:text-emerald-800 transition-colors">
                      {topWorker.name}
                    </h4>
                    <p className="text-[11px] text-slate-500">{topWorker.cooperativeName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Welfare Score</div>
                  <div className="text-2xl font-extrabold text-emerald-700">
                    {topWorker.welfare.welfareScore}/100
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 text-emerald-950 font-medium">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Mediclaim Insurance Policy
                  </span>
                  <span className="text-[11px] font-bold text-emerald-800">
                    {topWorker.welfare.insurancePolicyNumber} (Active)
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    PM Shram Yogi Maan-dhan
                  </span>
                  <span className="text-[11px] font-bold text-slate-700">
                    Enrolled ({topWorker.welfare.pensionFundId})
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Tool Modernization Subsidy
                  </span>
                  <span className="text-[11px] font-bold text-slate-700">
                    ₹{topWorker.welfare.toolSubsidyAvailed.toLocaleString()} Disbursed
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Child Education Grant
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700">
                    Active Beneficiary
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Verified by Gujarat Labour Federation</span>
                <span className="text-emerald-700 font-bold">100% Compliant</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
