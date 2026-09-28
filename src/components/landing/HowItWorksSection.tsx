import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Compass,
  CreditCard,
  HeartHandshake,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const { setIsBookingModalOpen, setIsEmergencyModalOpen, setActiveView } = useApp();

  const steps = [
    {
      num: '01',
      title: 'Select Service or Emergency',
      desc: 'Pick household repairs, agro-tech machinery, irrigation pumps, or tap 24x7 Emergency Help.',
      icon: Search,
      badge: 'Step 1'
    },
    {
      num: '02',
      title: 'Geo-Spatial Worker Matching',
      desc: 'Browse verified cooperative members nearby with Aadhaar KYC, police verification, and rating scorecards.',
      icon: Compass,
      badge: 'Step 2'
    },
    {
      num: '03',
      title: 'Transparent Fair Payment',
      desc: 'No hidden surge pricing. Clear transparent bill where 85% goes directly to the cooperative worker.',
      icon: CreditCard,
      badge: 'Step 3'
    },
    {
      num: '04',
      title: 'Community Welfare & Invoice',
      desc: '10% replenishes the Worker Welfare Fund (Mediclaim + PM-SYM Pension). Download digital tax invoice.',
      icon: HeartHandshake,
      badge: 'Step 4'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#faf8f5] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-900 border border-emerald-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            Transparent Cooperative Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-brand-display">
            How Sahkaar Seva Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            From emergency field breakdown to standard home electrical wiring — four simple steps connecting citizens and farmers with dignified cooperative labour.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:border-emerald-500 hover:shadow-lg transition-all relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-amber-500 font-brand-display">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-emerald-700" />
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-emerald-700 font-semibold">
                  <span>Cooperative Certified</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-emerald-200" />
            <span>Book a Service Now</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={() => setIsEmergencyModalOpen(true)}
            className="px-5 py-3.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-300 hover:bg-rose-100 font-bold text-sm transition-colors cursor-pointer"
          >
            <span>🚨 24x7 Immediate Dispatch</span>
          </button>
        </div>

      </div>
    </section>
  );
};
