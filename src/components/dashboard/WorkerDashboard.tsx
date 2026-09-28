import React from 'react';
import { useApp } from '../../context/AppContext';
import { SafeImage } from '../common/SafeImage';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  TrendingUp,
  Award,
  ShieldCheck,
  Star,
  Coins,
  PhoneCall,
  Zap,
  Droplets,
  AlertCircle,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export const WorkerDashboard: React.FC = () => {
  const {
    currentActiveWorker,
    toggleWorkerAvailability,
    bookings,
    updateBookingStatus,
    setSelectedWorkerForProfile
  } = useApp();

  const worker = currentActiveWorker;

  // Bookings assigned to this worker
  const workerBookings = bookings.filter((b) => b.workerId === worker.id);
  const activeJobs = workerBookings.filter((b) => b.status === 'confirmed' || b.status === 'in_progress' || b.status === 'emergency_dispatched');
  const completedJobs = workerBookings.filter((b) => b.status === 'completed');

  // Compute monthly earnings
  const totalEarned = workerBookings.reduce((sum, b) => {
    return sum + (b.invoice?.workerPayout || Math.round((b.totalPrice || 0) * 0.85));
  }, 0);

  return (
    <div className="py-10 bg-[#faf8f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Worker Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div
                className="relative cursor-pointer group"
                onClick={() => setSelectedWorkerForProfile(worker)}
                title="Click to view your public profile"
              >
                <SafeImage
                  src={worker.avatar}
                  alt={worker.name}
                  fallbackType="avatar"
                  fallbackText={worker.name}
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-emerald-600 shadow-md group-hover:scale-105 transition-transform"
                />
                <span
                  className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ring-2 ring-white ${
                    worker.isAvailableNow ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                  }`}
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1
                    onClick={() => setSelectedWorkerForProfile(worker)}
                    className="text-2xl font-bold text-slate-900 font-brand-display cursor-pointer hover:text-emerald-800 transition-colors"
                    title="Click to view your public profile"
                  >
                    {worker.name}
                  </h1>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                    Cooperative Member #{worker.id.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs font-semibold text-emerald-800 mt-0.5">
                  {worker.primarySkill}
                </p>
                <p className="text-xs text-slate-500">
                  {worker.cooperativeName} • District: {worker.district}
                </p>
              </div>
            </div>

            {/* Availability Toggle */}
            <div className="flex items-center gap-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <div>
                <span className="text-xs font-bold text-slate-800 block">Duty Status</span>
                <span className={`text-[11px] font-semibold ${worker.isAvailableNow ? 'text-emerald-700' : 'text-slate-500'}`}>
                  {worker.isAvailableNow ? '● Online & Receiving Jobs' : '○ Offline (Resting)'}
                </span>
              </div>
              <button
                onClick={() => toggleWorkerAvailability(worker.id)}
                className="cursor-pointer text-emerald-800 hover:text-emerald-900"
              >
                {worker.isAvailableNow ? (
                  <ToggleRight className="w-10 h-10 text-emerald-600" />
                ) : (
                  <ToggleLeft className="w-10 h-10 text-slate-400" />
                )}
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100">
            <div className="bg-[#faf8f5] p-4 rounded-2xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Jobs Today</span>
              <span className="text-2xl font-extrabold text-emerald-800 font-brand-display">{activeJobs.length}</span>
            </div>
            <div className="bg-[#faf8f5] p-4 rounded-2xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Monthly Payout (85%)</span>
              <span className="text-2xl font-extrabold text-slate-900 font-brand-display">₹{totalEarned.toLocaleString()}</span>
            </div>
            <div className="bg-[#faf8f5] p-4 rounded-2xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Artisan Rating</span>
              <span className="text-2xl font-extrabold text-amber-700 font-brand-display flex items-center gap-1">
                <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                {worker.rating}★
              </span>
            </div>
            <div className="bg-[#faf8f5] p-4 rounded-2xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Welfare Score</span>
              <span className="text-2xl font-extrabold text-emerald-700 font-brand-display">
                {worker.welfare.welfareScore}/100
              </span>
            </div>
          </div>
        </div>

        {/* Assigned Jobs & Dispatches */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <h2 className="text-lg font-bold text-slate-900 font-brand-display">
                Current Assigned Tasks ({workerBookings.length})
              </h2>
              <span className="text-xs text-slate-500 font-medium">85% Direct Bank Remuneration</span>
            </div>

            <div className="space-y-4">
              {workerBookings.length === 0 ? (
                <div className="text-center py-10 text-xs text-slate-400">
                  No active assignments currently. Stay online to receive automated alerts.
                </div>
              ) : (
                workerBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-[#faf8f5] space-y-3"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-400">#{b.id}</span>
                          <h3 className="font-bold text-slate-900 text-sm">{b.serviceTitle}</h3>
                          {b.urgency === 'emergency' && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-600 text-white">
                              🚨 Emergency
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          Client: <strong>{b.customerName}</strong> ({b.customerPhone})
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {b.customerAddress}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block uppercase">Your Payout (85%)</span>
                        <span className="text-base font-extrabold text-emerald-800">
                          ₹{b.invoice?.workerPayout || Math.round(b.totalPrice * 0.85)}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700">
                      <strong>Issue Reported:</strong> {b.problemDescription}
                    </div>

                    {/* Worker Action Buttons */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                      <span className="text-slate-500">
                        Status: <strong className="uppercase text-slate-900">{b.status}</strong>
                      </span>

                      <div className="flex items-center gap-2">
                        {b.status === 'confirmed' && (
                          <button
                            onClick={() => updateBookingStatus(b.id, 'in_progress')}
                            className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold cursor-pointer"
                          >
                            Start Job / Arrived
                          </button>
                        )}
                        {b.status === 'in_progress' && (
                          <button
                            onClick={() => updateBookingStatus(b.id, 'completed')}
                            className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold cursor-pointer"
                          >
                            Mark Completed & Request Payout
                          </button>
                        )}
                        {b.status === 'completed' && (
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            Completed & Settled
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Column: Worker Welfare & Scheme Status */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Social Security Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  Social Security Coverage
                </span>
                <span className="text-xs font-extrabold text-emerald-700">100% Active</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                  <span className="font-bold text-emerald-950 block">Ayushman Mediclaim Shield</span>
                  <p className="text-[11px] text-emerald-800 mt-0.5">
                    Policy: {worker.welfare.insurancePolicyNumber} (₹5,00,000 Family Cover)
                  </p>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block">PM Shram Yogi Maan-dhan (PM-SYM)</span>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    UAN ID: {worker.welfare.pensionFundId} • Guaranteed ₹3,000/mo pension
                  </p>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block">Cooperative Tool Modernization Loan</span>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    ₹{worker.welfare.toolSubsidyAvailed.toLocaleString()} Disbursed for Digital Testing Kit
                  </p>
                </div>
              </div>
            </div>

            {/* Certifications Locker */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Trade Credentials Locker
              </h3>
              {worker.certifications.map((c) => (
                <div key={c.id} className="p-2.5 rounded-xl bg-[#faf8f5] border border-slate-200 text-xs">
                  <span className="font-bold text-slate-900 block">{c.title}</span>
                  <span className="text-[10px] text-slate-500 block">{c.issuingBody} ({c.issueYear})</span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
