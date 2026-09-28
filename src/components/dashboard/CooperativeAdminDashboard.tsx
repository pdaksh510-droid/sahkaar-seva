import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SafeImage } from '../common/SafeImage';
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  BrainCircuit,
  Award,
  Coins,
  Building,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Clock,
  MapPin,
  Wheat,
  XCircle
} from 'lucide-react';

export const CooperativeAdminDashboard: React.FC = () => {
  const {
    workers,
    cooperatives,
    bookings,
    demandForecasts,
    workforceAlerts,
    verifyWorker,
    resolveAllocationAlert,
    selectedDistrict,
    setSelectedWorkerForProfile
  } = useApp();

  const [activeTab, setActiveTab] = useState<'ai_forecast' | 'workforce_allocation' | 'verification_queue' | 'welfare_fund'>('ai_forecast');

  const coop = cooperatives[0]; // Anand Agro-Tech Coop (or matching active)

  // Derived stats
  const totalWorkers = workers.length;
  const verifiedWorkers = workers.filter((w) => w.verificationStatus === 'verified').length;
  const pendingWorkers = workers.filter((w) => w.verificationStatus === 'pending');
  const activeBookings = bookings.filter((b) => b.status === 'confirmed' || b.status === 'in_progress' || b.status === 'emergency_dispatched').length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  const workerPayoutsTotal = Math.round(totalRevenue * 0.85);
  const welfarePoolGenerated = Math.round(totalRevenue * 0.10);

  return (
    <div className="py-10 bg-[#faf8f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-800 to-amber-600 text-white flex items-center justify-center font-bold text-2xl shadow-md">
                🏢
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold text-slate-900 font-brand-display">
                    {coop.name}
                  </h1>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                    Reg: {coop.registrationNumber}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Affiliated with Gujarat State Labour Cooperative Federation Ltd. • Operations: Anand & Kheda
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200 text-right">
                <span className="text-[10px] uppercase font-bold text-emerald-800 block">Welfare Fund Balance</span>
                <span className="text-xl font-extrabold text-emerald-900 font-brand-display">
                  ₹{(coop.welfareFundBalance / 100000).toFixed(2)} Lakhs
                </span>
              </div>
            </div>
          </div>

          {/* Operational Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-8 pt-6 border-t border-slate-100">
            <div className="bg-[#faf8f5] p-3.5 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Enrolled Workers</span>
              <span className="text-xl font-extrabold text-slate-900 font-brand-display">{totalWorkers}</span>
            </div>
            <div className="bg-[#faf8f5] p-3.5 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Verified Artisans</span>
              <span className="text-xl font-extrabold text-emerald-700 font-brand-display">{verifiedWorkers}</span>
            </div>
            <div className="bg-[#faf8f5] p-3.5 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Dispatches</span>
              <span className="text-xl font-extrabold text-amber-700 font-brand-display">{activeBookings}</span>
            </div>
            <div className="bg-[#faf8f5] p-3.5 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Pending KYC Checks</span>
              <span className="text-xl font-extrabold text-rose-600 font-brand-display">{pendingWorkers.length}</span>
            </div>
            <div className="bg-[#faf8f5] p-3.5 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Worker Payouts (85%)</span>
              <span className="text-xl font-extrabold text-slate-900 font-brand-display">₹{workerPayoutsTotal.toLocaleString()}</span>
            </div>
            <div className="bg-[#faf8f5] p-3.5 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Welfare Pool (10%)</span>
              <span className="text-xl font-extrabold text-emerald-800 font-brand-display">₹{welfarePoolGenerated.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 text-xs">
          {[
            { id: 'ai_forecast', label: 'AI Demand Intelligence & Forecasting', icon: BrainCircuit },
            { id: 'workforce_allocation', label: `Smart Workforce Allocation (${workforceAlerts.length})`, icon: TrendingUp },
            { id: 'verification_queue', label: `Artisan KYC Verification Queue (${pendingWorkers.length})`, icon: ShieldCheck },
            { id: 'welfare_fund', label: 'Welfare & Insurance Audit', icon: Award }
          ].map((t) => {
            const Icon = t.icon;
            const isSelected = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: AI DEMAND FORECASTING (Prompt Requirement 13) */}
        {activeTab === 'ai_forecast' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    AI Demand Intelligence • Prototype Simulated Forecast
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 font-brand-display">
                    Regional Seasonal Service Demand Forecast
                  </h2>
                  <p className="text-xs text-slate-500">
                    Predictive analysis correlating agricultural harvest cycles, weather patterns, and festive seasons with workforce requirements.
                  </p>
                </div>
              </div>

              {/* Demand Forecast Points Table / Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {demandForecasts.map((forecast) => (
                  <div
                    key={forecast.serviceCategory}
                    className="bg-[#faf8f5] p-5 rounded-2xl border border-slate-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-slate-900 text-sm leading-snug">
                          {forecast.serviceCategory}
                        </h3>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                            forecast.shortageRisk === 'High'
                              ? 'bg-rose-100 text-rose-800'
                              : forecast.shortageRisk === 'Medium'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {forecast.shortageRisk} Shortage Risk
                        </span>
                      </div>

                      {/* Visual Demand Progress Bars */}
                      <div className="space-y-2 my-3 text-xs">
                        <div>
                          <div className="flex justify-between text-slate-500 text-[11px] mb-1">
                            <span>Current Demand Index:</span>
                            <span className="font-bold text-slate-800">{forecast.currentDemandIndex}/100</span>
                          </div>
                          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-slate-600 h-full rounded-full"
                              style={{ width: `${forecast.currentDemandIndex}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="font-bold text-emerald-900">Predicted Demand (Next Month):</span>
                            <span className="font-bold text-emerald-800">{forecast.predictedDemandNextMonth}/100</span>
                          </div>
                          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-emerald-600 h-full rounded-full"
                              style={{ width: `${forecast.predictedDemandNextMonth}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-600 italic bg-white p-2.5 rounded-xl border border-slate-200 leading-relaxed mb-3">
                        "{forecast.ruralFactor}"
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200 text-xs space-y-1">
                      <div className="flex justify-between text-slate-500">
                        <span>Active Workforce:</span>
                        <span className="font-bold text-slate-800">{forecast.activeWorkersCount} Artisans</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>AI Recommended Staffing:</span>
                        <span className="font-bold text-emerald-800">{forecast.recommendedWorkersCount} Artisans</span>
                      </div>
                      <div className="text-[10px] text-amber-800 font-semibold pt-1">
                        Peak: {forecast.peakPeriod}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SMART WORKFORCE ALLOCATION AI (Prompt Requirement 14) */}
        {activeTab === 'workforce_allocation' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <div className="pb-6 border-b border-slate-200">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                  AI Workforce Optimization Engine
                </span>
                <h2 className="text-xl font-bold text-slate-900 font-brand-display mt-0.5">
                  Dynamic Workforce Allocation & Shortage Mitigation
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Automated rebalancing recommendations when unexpected demand surges occur in farm belts or township clusters.
                </p>
              </div>

              <div className="space-y-4 mt-6">
                {workforceAlerts.length === 0 ? (
                  <div className="bg-emerald-50 rounded-2xl p-8 text-center text-emerald-900 border border-emerald-200">
                    <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-emerald-600" />
                    <h3 className="font-bold text-base">All Operational Zones Optimally Balanced!</h3>
                    <p className="text-xs text-emerald-700 mt-1">
                      No active workforce shortages detected across cooperative districts.
                    </p>
                  </div>
                ) : (
                  workforceAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="p-5 rounded-2xl border border-slate-200 bg-[#faf8f5] flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            alert.priority === 'Critical' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {alert.priority} Shortage
                          </span>
                          <h3 className="font-bold text-slate-900 text-sm">{alert.zone}</h3>
                        </div>

                        <p className="text-xs font-semibold text-emerald-800">
                          Trade Requirement: {alert.service}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-1">
                          <span>Available on Duty: <strong>{alert.availableWorkers} Artisans</strong></span>
                          <span>•</span>
                          <span>Expected Inbound Jobs: <strong>{alert.expectedRequests} Requests</strong></span>
                          <span>•</span>
                          <span className="text-rose-600 font-bold">Deficit: -{alert.shortage} Workers</span>
                        </div>

                        <div className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200 mt-2">
                          <strong>AI Reallocation Recommendation:</strong> {alert.recommendedAction}
                        </div>
                      </div>

                      <div className="shrink-0">
                        <button
                          onClick={() => resolveAllocationAlert(alert.id)}
                          className="w-full md:w-auto px-5 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <TrendingUp className="w-4 h-4 text-amber-300" />
                          <span>Recommend & Reallocate</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ARTISAN KYC VERIFICATION QUEUE (Prompt Requirement 9 & 10) */}
        {activeTab === 'verification_queue' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <div className="pb-6 border-b border-slate-200">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                  Cooperative Member Registry
                </span>
                <h2 className="text-xl font-bold text-slate-900 font-brand-display mt-0.5">
                  Artisan Onboarding & Verification Approvals ({pendingWorkers.length})
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Inspect new member applications, cross-check Aadhaar/e-Shram KYC, and issue verified cooperative badges.
                </p>
              </div>

              <div className="space-y-4 mt-6">
                {pendingWorkers.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    No pending artisan applications in the verification queue.
                  </div>
                ) : (
                  pendingWorkers.map((w) => (
                    <div
                      key={w.id}
                      className="p-5 rounded-2xl border border-amber-200 bg-amber-50/30 flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      <div className="flex items-start gap-4">
                        <SafeImage
                          src={w.avatar}
                          alt={w.name}
                          fallbackType="avatar"
                          fallbackText={w.name}
                          onClick={() => setSelectedWorkerForProfile(w)}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-300 shrink-0 cursor-pointer hover:scale-105 transition-transform"
                          title="Click to inspect applicant profile"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3
                              onClick={() => setSelectedWorkerForProfile(w)}
                              className="font-bold text-slate-900 text-sm cursor-pointer hover:text-emerald-800 transition-colors"
                            >
                              {w.name}
                            </h3>
                            <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                              Pending Verification
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-slate-700">{w.primarySkill}</p>
                          <p className="text-[11px] text-slate-500">
                            {w.district}, {w.state} • {w.yearsExperience} Years Exp • Mobile: {w.mobile}
                          </p>

                          <div className="flex flex-wrap items-center gap-2 pt-1 text-[10px]">
                            <span className="bg-white border border-slate-200 px-2 py-0.5 rounded font-medium text-slate-700">
                              Aadhaar KYC: Initiated
                            </span>
                            <span className="bg-white border border-slate-200 px-2 py-0.5 rounded font-medium text-slate-700">
                              e-Shram: Under Review
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => verifyWorker(w.id, 'verified')}
                          className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                        >
                          Approve & Issue Badge
                        </button>
                        <button
                          onClick={() => verifyWorker(w.id, 'rejected')}
                          className="px-3 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs rounded-xl cursor-pointer"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: WELFARE & INSURANCE AUDIT */}
        {activeTab === 'welfare_fund' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <div className="pb-6 border-b border-slate-200">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                  Member Social Security Audit
                </span>
                <h2 className="text-xl font-bold text-slate-900 font-brand-display mt-0.5">
                  Labour Society Welfare Fund Utilization
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Audit trail of the 10% welfare contribution pooled from completed bookings.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="bg-[#faf8f5] p-5 rounded-2xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-700 block">Total Corpus Accumulated</span>
                  <div className="text-2xl font-extrabold text-emerald-800 font-brand-display mt-1">
                    ₹{(coop.welfareFundBalance / 100000).toFixed(2)} Lakhs
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Dedicated escrow under Gujarat Cooperative Societies Act
                  </p>
                </div>

                <div className="bg-[#faf8f5] p-5 rounded-2xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-700 block">Mediclaim Premium Subsidy</span>
                  <div className="text-2xl font-extrabold text-slate-900 font-brand-display mt-1">
                    ₹18.4 Lakhs
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    420 Families Covered under 5 Lakh Group Mediclaim
                  </p>
                </div>

                <div className="bg-[#faf8f5] p-5 rounded-2xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-700 block">Modern Tool & Gear Loans</span>
                  <div className="text-2xl font-extrabold text-amber-700 font-brand-display mt-1">
                    ₹7.2 Lakhs
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Zero-interest revolving corpus for digital testing kits
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
