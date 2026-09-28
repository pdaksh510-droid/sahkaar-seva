import React from 'react';
import { useApp } from '../../context/AppContext';
import { SafeImage } from '../common/SafeImage';
import { mockTestimonials, mockPartners } from '../../data/mockData';
import {
  Quote,
  Star,
  ShieldCheck,
  Building2,
  Wheat,
  CheckCircle2,
  HeartHandshake,
  ArrowRight
} from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { workers, setSelectedWorkerForProfile, setIsBookingModalOpen } = useApp();

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Testimonials Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200 mb-3">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-700" />
            Voices from Farms, Households & Clinics
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-brand-display">
            Trusted by Indian Farmers, Families & Institutions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Real experiences from communities choosing cooperative ethics, transparent pricing, and verified skilled artisans over exploitative gig aggregators.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {mockTestimonials.map((t) => {
            const matchedWorker = workers.find((w) => w.id === t.workerId);
            return (
              <div
                key={t.id}
                className="bg-[#faf8f5] rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:border-emerald-400 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Rating & Service tag */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                      {t.serviceUsed}
                    </span>
                  </div>

                  {/* Quote Text */}
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic mb-6">
                    "{t.content}"
                  </p>
                </div>

                {/* Customer Info & Worker link */}
                <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <SafeImage
                      src={t.avatar}
                      alt={t.name}
                      fallbackType="avatar"
                      fallbackText={t.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-300 shadow-xs"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                      <p className="text-xs text-emerald-800 font-medium">{t.role}</p>
                      <p className="text-[11px] text-slate-400">{t.location}</p>
                    </div>
                  </div>

                  {matchedWorker && (
                    <button
                      onClick={() => setSelectedWorkerForProfile(matchedWorker)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:text-emerald-900 shadow-2xs transition-colors self-start sm:self-auto cursor-pointer"
                      title="Click to view artisan credentials"
                    >
                      <SafeImage
                        src={matchedWorker.avatar}
                        alt={matchedWorker.name}
                        fallbackType="avatar"
                        fallbackText={matchedWorker.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span>Serviced by <strong>{t.workerName}</strong></span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Cooperative Apex Partners & Federation Network */}
        <div className="bg-[#faf8f5] rounded-3xl p-8 sm:p-10 border border-slate-200/90 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 mb-3">
            <Building2 className="w-3.5 h-3.5 text-emerald-700" />
            Apex Institutional Network
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-brand-display mb-2">
            Affiliated with India's Cooperative Ecosystem
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto mb-8">
            Empowered by National and State Labour Federations, Primary Agricultural Credit Societies (PACS), and APMC Mandis across India.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mockPartners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-sm transition-shadow flex flex-col items-center justify-center text-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 font-extrabold text-xs flex items-center justify-center mb-2 font-brand-display group-hover:scale-105 transition-transform">
                  {partner.logoText}
                </div>
                <h5 className="font-bold text-slate-900 text-xs leading-tight mb-1 line-clamp-2">
                  {partner.name}
                </h5>
                <span className="text-[10px] text-slate-500 font-medium line-clamp-1">
                  {partner.location}
                </span>
                <span className="mt-2 text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {partner.badge}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              100% Cooperative Ministry Standards
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Direct DBT Bank Account Payouts
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Audited Welfare Fund Reserve
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
