import React from 'react';
import { useApp } from '../../context/AppContext';
import { SafeImage } from '../common/SafeImage';
import { mockWelfareSchemes } from '../../data/mockData';
import {
  ShieldCheck,
  HeartHandshake,
  Award,
  GraduationCap,
  Wrench,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  FileCheck,
  Users,
  Coins
} from 'lucide-react';

export const WelfareScorecardView: React.FC = () => {
  const { workers, setIsWorkerRegisterModalOpen, setSelectedWorkerForProfile } = useApp();

  return (
    <div className="py-10 bg-[#faf8f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-900 to-[#0b3b29] text-white rounded-3xl p-8 sm:p-10 shadow-xl mb-10 relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 inline-block">
              Institutional Social Security Pillar
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-brand-display">
              Worker Welfare & Social Security Scorecard
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
              Every job booked through Sahkaar Seva channels 10% directly into member welfare. Here is the real-time transparency ledger demonstrating zero exploitation and universal family coverage.
            </p>
          </div>
        </div>

        {/* 4 Core Schemes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mockWelfareSchemes.map((s, idx) => (
            <div
              key={s.title}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 mb-3 inline-block">
                  {s.badge}
                </span>
                <h3 className="font-bold text-slate-900 text-sm mb-2">{s.title}</h3>
                <div className="text-xs font-bold text-emerald-800 mb-2">{s.coverage}</div>
                <p className="text-[11px] text-slate-500 leading-relaxed">{s.fundedBy}</p>
              </div>
              <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
                <span className="text-slate-400">Compliance:</span>
                <span className="font-bold text-slate-900">{s.workersEnrolled}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Member Scorecards Directory */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-6">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                Universal Welfare Ledger
              </span>
              <h2 className="text-xl font-bold text-slate-900 font-brand-display mt-0.5">
                Artisan Social Security Scores ({workers.length})
              </h2>
              <p className="text-xs text-slate-500">
                Audited against ESIC norms, PM-SYM enrollment, and cooperative welfare bylaws.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workers.map((w) => (
              <div
                key={w.id}
                className="bg-[#faf8f5] rounded-2xl p-5 border border-slate-200 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <SafeImage
                        src={w.avatar}
                        alt={w.name}
                        fallbackType="avatar"
                        fallbackText={w.name}
                        onClick={() => setSelectedWorkerForProfile(w)}
                        className="w-12 h-12 rounded-xl object-cover border-2 border-emerald-600 cursor-pointer hover:scale-105 transition-transform shrink-0"
                        title="Click to view welfare credentials"
                      />
                      <div>
                        <h4
                          onClick={() => setSelectedWorkerForProfile(w)}
                          className="font-bold text-slate-900 text-sm cursor-pointer hover:text-emerald-800 transition-colors"
                        >
                          {w.name}
                        </h4>
                        <p className="text-[11px] text-slate-500">{w.primarySkill}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Score</span>
                      <span className="text-lg font-extrabold text-emerald-800">
                        {w.welfare.welfareScore}/100
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs bg-white p-3 rounded-xl border border-slate-200/80">
                    <div className="flex justify-between text-slate-600">
                      <span>Mediclaim Shield:</span>
                      <span className="font-bold text-emerald-800">
                        {w.welfare.insuranceStatus === 'active' ? '₹5,00,000 Active' : 'Pending KYC'}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>PM-SYM Pension:</span>
                      <span className="font-semibold text-slate-800">
                        {w.welfare.pensionEnrolled ? 'Enrolled' : 'Not Enrolled'}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Tools Subsidy Availed:</span>
                      <span className="font-semibold text-slate-800">
                        ₹{w.welfare.toolSubsidyAvailed.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Child Education Grant:</span>
                      <span className="font-semibold text-slate-800">
                        {w.welfare.childrenScholarship ? 'Granted' : 'Eligible'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Coop: {w.cooperativeName.split(' ')[0]}</span>
                  <span className="text-emerald-700 font-bold">Aadhaar Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
