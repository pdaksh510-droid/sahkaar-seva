import React from 'react';
import { useApp } from '../../context/AppContext';
import { Wheat, ShieldCheck, Heart, Phone, Mail, MapPin, Award, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, setIsWorkerRegisterModalOpen, setIsBookingModalOpen } = useApp();

  return (
    <footer className="bg-[#0b3b29] text-emerald-100 border-t border-emerald-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cooperative Principles Ribbon */}
        <div className="bg-emerald-950/80 rounded-2xl p-6 mb-12 border border-emerald-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">
                Rooted in 7 International Cooperative Principles
              </h4>
              <p className="text-emerald-300/80 text-xs mt-0.5">
                Voluntary Membership • Democratic Governance • Fair Member Economic Participation • Concern for Community
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-emerald-800/60 text-emerald-200 border border-emerald-700/60 px-3 py-1.5 rounded-full font-medium">
              Aadhaar & e-Shram Verified
            </span>
            <span className="text-xs bg-amber-500/20 text-amber-200 border border-amber-400/40 px-3 py-1.5 rounded-full font-medium">
              PM-SYM & Mediclaim Covered
            </span>
          </div>
        </div>

        {/* 4-Column Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-emerald-800/60 text-sm">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-900 font-bold">
                <Wheat className="w-6 h-6 text-slate-900" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white font-brand-display">
                Sahkaar Seva
              </span>
            </div>
            <p className="text-emerald-200/80 text-xs leading-relaxed max-w-sm">
              Cooperative Gig Services Platform for Household, Community & Agricultural Services. Digitally bridging verified labour cooperative societies with households, institutions, and farms with fair wages and worker welfare.
            </p>
            <div className="pt-2 text-xs text-emerald-300/70 space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Central Apex Cooperative Bhavan, New Delhi - 110001</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>National Cooperative Toll-Free: 1800-200-SEVA (7382)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>nodal.officer@sahkaarseva.coop.in</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">
              Services
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200/80">
              <li>
                <button onClick={() => setActiveView('rural')} className="hover:text-amber-300 transition-colors">
                  Tube-Well & Solar Pump Care
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('rural')} className="hover:text-amber-300 transition-colors">
                  Tractor & Harvester Repairs
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('services')} className="hover:text-amber-300 transition-colors">
                  Household Electricians
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('services')} className="hover:text-amber-300 transition-colors">
                  Plumbing & Micro-Irrigation
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('services')} className="hover:text-amber-300 transition-colors">
                  Carpentry & Woodwork
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('services')} className="hover:text-amber-300 transition-colors">
                  Elder & Patient Caregiving
                </button>
              </li>
            </ul>
          </div>

          {/* Cooperatives & Governance */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-l-2 border-emerald-400 pl-2">
              Cooperatives & Welfare
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200/80">
              <li>
                <button onClick={() => setActiveView('welfare')} className="hover:text-amber-300 transition-colors">
                  Worker Welfare Scorecard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('welfare')} className="hover:text-amber-300 transition-colors">
                  Ayushman & Mediclaim Pool
                </button>
              </li>
              <li>
                <button onClick={() => setIsWorkerRegisterModalOpen(true)} className="hover:text-amber-300 transition-colors">
                  Register as Cooperative Worker
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('dashboard')} className="hover:text-amber-300 transition-colors">
                  Cooperative Society Portal
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('dashboard')} className="hover:text-amber-300 transition-colors">
                  Federation Analytics
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('map')} className="hover:text-amber-300 transition-colors">
                  Geo-Spatial Service Map
                </button>
              </li>
            </ul>
          </div>

          {/* Action box */}
          <div className="bg-emerald-900/60 p-4 rounded-xl border border-emerald-800">
            <h5 className="font-bold text-xs text-amber-300 mb-2">
              Are you a Registered Labour Cooperative?
            </h5>
            <p className="text-[11px] text-emerald-200/80 leading-relaxed mb-3">
              Affiliate your primary cooperative society with Sahkaar Seva to bring your verified members onto digital booking channels.
            </p>
            <button
              onClick={() => setIsWorkerRegisterModalOpen(true)}
              className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs rounded-lg transition-colors"
            >
              Register Cooperative Society
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/60">
          <div>
            © {new Date().getFullYear()} Sahkaar Seva. Prototype developed for Indian Labour Cooperative Federations.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              100% Transparent Worker Payouts (85% Direct)
            </span>
            <span>•</span>
            <span className="text-amber-300/80">
              Demo Prototype v2.4
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
