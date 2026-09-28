import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SafeImage } from '../common/SafeImage';
import {
  Users,
  ShieldCheck,
  Star,
  CheckCircle2,
  Calendar,
  Eye,
  ArrowRight,
  Sparkles,
  MapPin,
  HeartHandshake
} from 'lucide-react';

export const FeaturedWorkersSection: React.FC = () => {
  const {
    workers,
    services,
    setSelectedWorkerForProfile,
    setSelectedServiceForBooking,
    setIsBookingModalOpen,
    setActiveView
  } = useApp();

  const [activeSkillFilter, setActiveSkillFilter] = useState<string>('all');

  // Filter top verified workers
  const verifiedWorkers = workers.filter((w) => w.verificationStatus === 'verified');
  const filteredWorkers = activeSkillFilter === 'all'
    ? verifiedWorkers.slice(0, 6)
    : verifiedWorkers.filter((w) => w.domain === activeSkillFilter).slice(0, 6);

  const handleBookWorker = (worker: (typeof workers)[0]) => {
    const matchedService = services.find((s) => s.domain === worker.domain) || services[0];
    setSelectedServiceForBooking(matchedService);
    setIsBookingModalOpen(true);
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              Verified Cooperative Artisan Roster
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-brand-display">
              Meet Our Featured Cooperative Workers
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
              Every worker is an owner-member of their local labour cooperative society with certified trade credentials, clean police records, and active ₹5 Lakh mediclaim coverage.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('services')}
              className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>View All 24,000+ Workers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 text-xs">
          {[
            { id: 'all', label: 'All Disciplines' },
            { id: 'agricultural', label: '🌾 Agriculture & Farm Tech' },
            { id: 'household', label: '🏠 Household Electrical & Plumbing' },
            { id: 'technical', label: '⚙️ Cooling & Solar Systems' },
            { id: 'caregiving', label: '🩺 Elder Caregiving' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSkillFilter(tab.id)}
              className={`px-3.5 py-2 rounded-xl font-semibold shrink-0 transition-all cursor-pointer ${
                activeSkillFilter === tab.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Worker Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredWorkers.map((worker) => (
            <div
              key={worker.id}
              className="bg-[#faf8f5] rounded-3xl p-6 border border-slate-200/90 hover:border-emerald-500 shadow-xs hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Worker Card Top: Photo, Name, Rating */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    onClick={() => setSelectedWorkerForProfile(worker)}
                    className="relative shrink-0 cursor-pointer group/photo"
                    title={`Click to view full credentials of ${worker.name}`}
                  >
                    <SafeImage
                      src={worker.avatar}
                      alt={worker.name}
                      fallbackType="avatar"
                      fallbackText={worker.name}
                      className="w-18 h-18 rounded-2xl object-cover border-2 border-emerald-600 shadow-md group-hover/photo:scale-105 transition-transform"
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <h3
                        onClick={() => setSelectedWorkerForProfile(worker)}
                        className="font-bold text-slate-900 text-base truncate cursor-pointer hover:text-emerald-800 transition-colors"
                        title={`Click to view full credentials of ${worker.name}`}
                      >
                        {worker.name}
                      </h3>
                      <div className="flex items-center gap-1 bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md text-xs font-bold shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{worker.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs font-semibold text-emerald-800 truncate">
                      {worker.primarySkill}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {worker.cooperativeName}
                    </p>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{worker.district}, {worker.state}</span>
                    </p>
                  </div>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {worker.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] bg-white text-slate-700 font-medium px-2 py-0.5 rounded-md border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                  {worker.skills.length > 3 && (
                    <span className="text-[10px] text-slate-400 font-medium px-1">
                      +{worker.skills.length - 3} more
                    </span>
                  )}
                </div>

                {/* Welfare scorecard ribbon */}
                <div className="space-y-1.5 text-[11px] bg-white p-3 rounded-2xl border border-slate-200 mb-4">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Verification
                    </span>
                    <span className="font-bold text-emerald-700">Aadhaar & e-Shram OK</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5 font-medium">
                      <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
                      Social Security
                    </span>
                    <span className="font-bold text-slate-900">₹5 Lakh Mediclaim Active</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      Completed Work
                    </span>
                    <span className="font-semibold text-slate-800">{worker.completedJobsCount} Tasks Completed</span>
                  </div>
                </div>
              </div>

              {/* Actions & Benchmark Rate */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-medium">Standard Rate</span>
                  <span className="text-sm font-extrabold text-slate-900">
                    ₹{worker.baseHourlyRate}/visit
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedWorkerForProfile(worker)}
                    className="px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                    title="View certifications & scorecard"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => handleBookWorker(worker)}
                    className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs cursor-pointer active:scale-95 transition-all flex items-center gap-1"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Worker</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust assurance banner */}
        <div className="bg-emerald-50 rounded-2xl p-4 sm:p-5 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-200 text-emerald-900 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-emerald-800" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-emerald-950">
                Are you a skilled electrician, plumber, mechanic, or caregiver?
              </h4>
              <p className="text-xs text-emerald-800">
                Join your local labour cooperative federation and receive guaranteed fair wages, mediclaim, and pensions.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveView('services')}
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-xs shrink-0 cursor-pointer"
          >
            Explore Directory
          </button>
        </div>

      </div>
    </section>
  );
};
