import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Users,
  ShieldCheck,
  Award,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Wheat,
  BarChart3,
  Layers,
  Sparkles
} from 'lucide-react';

export const FederationDashboard: React.FC = () => {
  const { cooperatives, workers, bookings } = useApp();

  return (
    <div className="py-10 bg-[#faf8f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Federation Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-[#0b3b29] text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 inline-block mb-1">
                Apex Governance Portal
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-brand-display">
                State & National Labour Cooperative Federation
              </h1>
              <p className="text-xs sm:text-sm text-emerald-200/90 max-w-2xl leading-relaxed">
                Multi-district apex oversight ensuring democratic governance, statutory welfare compliance, and equitable economic distribution across primary societies.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center shrink-0">
              <span className="text-[10px] text-emerald-300 block uppercase font-bold">Network Societies</span>
              <span className="text-3xl font-extrabold text-amber-300 font-brand-display">
                312
              </span>
              <span className="text-[10px] text-emerald-200 block mt-0.5">Across 8 State Apex Unions</span>
            </div>
          </div>
        </div>

        {/* Multi-District Performance Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
          <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-6">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                District Cooperative Societies Directory
              </span>
              <h2 className="text-xl font-bold text-slate-900 font-brand-display mt-0.5">
                Primary Labour Cooperative Society Performance
              </h2>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-3 py-1 rounded-full">
              100% Audit Cleared
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Cooperative Society</th>
                  <th className="py-3 px-3">District / State</th>
                  <th className="py-3 px-3">Active Artisans</th>
                  <th className="py-3 px-3">Consumer Trust</th>
                  <th className="py-3 px-3">Welfare Fund Pool</th>
                  <th className="py-3 px-3">Federation Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cooperatives.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                          🏢
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs">{c.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">Reg: {c.registrationNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-slate-600 font-medium">
                      {c.district}, {c.state}
                    </td>
                    <td className="py-3.5 px-3 text-slate-900 font-bold">
                      {c.activeWorkers} / {c.totalWorkers}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded font-bold bg-amber-100 text-amber-900">
                        ★ {c.rating}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-bold text-emerald-800">
                      ₹{(c.welfareFundBalance / 100000).toFixed(2)} Lakhs
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1 w-max">
                        <CheckCircle2 className="w-3 h-3" />
                        Affiliated
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Macro Welfare Deployment Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <Award className="w-8 h-8 text-emerald-700 mb-2" />
            <h3 className="font-bold text-slate-900 text-base">Group Mediclaim Coverage</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Consolidated negotiation with public sector insurance providers secures ₹5,00,000 cashless family hospitalization at bulk subsidised rates of ₹380/worker/year funded via the 10% welfare pool.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <Wheat className="w-8 h-8 text-amber-600 mb-2" />
            <h3 className="font-bold text-slate-900 text-base">Rural Agro-Tech Mobilization</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Standard operating procedures for rapid seasonal deployment of mobile tractor mechanics across border districts during peak wheat and paddy harvesting.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <ShieldCheck className="w-8 h-8 text-purple-700 mb-2" />
            <h3 className="font-bold text-slate-900 text-base">Aadhaar & Police Vetting Audit</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Apex digital scrutiny ensures 100% compliance with background verification and trade licenses before artisans are unlocked on the public marketplace.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
