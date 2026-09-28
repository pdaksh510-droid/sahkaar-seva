import React from 'react';
import { useApp } from '../../context/AppContext';
import { SafeImage } from '../common/SafeImage';
import {
  X,
  Star,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  PhoneCall,
  MapPin,
  Award,
  HeartHandshake,
  Clock,
  Sparkles,
  FileText
} from 'lucide-react';

export const WorkerProfileModal: React.FC = () => {
  const {
    selectedWorkerForProfile,
    setSelectedWorkerForProfile,
    setIsBookingModalOpen,
    services,
    setSelectedServiceForBooking
  } = useApp();

  if (!selectedWorkerForProfile) return null;

  const worker = selectedWorkerForProfile;

  const handleBookThisWorker = () => {
    const matchedService = services.find((s) => s.domain === worker.domain) || services[0];
    setSelectedServiceForBooking(matchedService);
    setSelectedWorkerForProfile(null);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full my-8 overflow-hidden relative max-h-[92vh] flex flex-col">
        
        {/* Header Cover Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-amber-900 h-28 sm:h-32 relative shrink-0">
          <button
            onClick={() => setSelectedWorkerForProfile(null)}
            className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Card Body */}
        <div className="px-6 pb-6 pt-0 overflow-y-auto flex-1 space-y-6">
          
          {/* Avatar and Basic Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 sm:-mt-14 mb-4">
            <div className="flex items-end gap-4">
              <SafeImage
                src={worker.avatar}
                alt={worker.name}
                fallbackType="avatar"
                fallbackText={worker.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-white shadow-xl bg-slate-100"
              />
              <div className="pb-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-brand-display">
                    {worker.name}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-700" />
                    Verified
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-emerald-800">
                  {worker.primarySkill}
                </p>
                <p className="text-xs text-slate-500">
                  {worker.cooperativeName}
                </p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-end gap-1">
              <div className="flex items-center gap-1 bg-amber-50 text-amber-900 px-2.5 py-1 rounded-lg border border-amber-200">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span className="text-sm font-extrabold">{worker.rating}</span>
                <span className="text-xs text-slate-500">({worker.reviewsCount} reviews)</span>
              </div>
              <span className="text-xs text-slate-500">{worker.completedJobsCount} Jobs Completed</span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Experience</span>
              <span className="text-sm font-extrabold text-slate-900">{worker.yearsExperience} Years</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Fair Rate</span>
              <span className="text-sm font-extrabold text-emerald-800">₹{worker.baseHourlyRate}/hr</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Working Radius</span>
              <span className="text-sm font-extrabold text-slate-900">{worker.workingRadiusKm} km</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Welfare Score</span>
              <span className="text-sm font-extrabold text-amber-700">{worker.welfare.welfareScore}/100</span>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              Artisan Profile & Background
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed bg-[#faf8f5] p-3.5 rounded-xl border border-slate-200">
              {worker.bio}
            </p>
          </div>

          {/* Skills & Spoken Languages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Specialized Trade Skills
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {worker.skills.map((s) => (
                  <span
                    key={s}
                    className="text-xs bg-slate-100 text-slate-800 font-medium px-2.5 py-1 rounded-lg border border-slate-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Languages Spoken
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {worker.languages.map((l) => (
                  <span
                    key={l}
                    className="text-xs bg-emerald-50 text-emerald-900 font-medium px-2.5 py-1 rounded-lg border border-emerald-200"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications Card */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              Verified Trade Certifications
            </h4>
            <div className="space-y-2">
              {worker.certifications.map((c) => (
                <div
                  key={c.id}
                  className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900 block">{c.title}</span>
                    <span className="text-[11px] text-slate-500">
                      Issued by: {c.issuingBody} ({c.issueYear})
                    </span>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                    Verified Badge
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Social Security & Welfare Scorecard */}
          <div className="bg-[#faf8f5] p-4 rounded-2xl border border-amber-300/80 space-y-3">
            <div className="flex items-center justify-between border-b border-amber-200/80 pb-2">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-emerald-800" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Social Security & Welfare Scorecard
                </h4>
              </div>
              <span className="text-xs font-extrabold text-emerald-800">
                Score: {worker.welfare.welfareScore}/100
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>
                  <strong>Mediclaim:</strong> ₹5,00,000 Active Cover
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>
                  <strong>Pension:</strong> {worker.welfare.pensionEnrolled ? 'PM-SYM Enrolled' : 'Pending'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>
                  <strong>Tool Loan Subsidy:</strong> ₹{worker.welfare.toolSubsidyAvailed.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>
                  <strong>Child Scholarship:</strong> {worker.welfare.childrenScholarship ? 'Active Grant' : 'Eligible'}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={handleBookThisWorker}
              className="flex-1 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book {worker.name}</span>
            </button>
            <a
              href={`tel:${worker.mobile}`}
              className="px-4 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-emerald-700" />
              <span>Contact Artisan</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
