import React from 'react';
import { useApp } from '../../context/AppContext';
import { SafeImage } from '../common/SafeImage';
import {
  Wheat,
  Droplets,
  Tractor,
  Zap,
  Shield,
  Cpu,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';

export const RuralImpactSection: React.FC = () => {
  const {
    setActiveView,
    setSelectedCategory,
    setIsBookingModalOpen,
    setIsEmergencyModalOpen,
    services,
    setSelectedServiceForBooking
  } = useApp();

  const ruralServices = [
    {
      serviceId: 'srv-1',
      title: 'Tube-Well & Solar Irrigation Pumps',
      tag: 'KUSUM Aligned',
      desc: 'Rapid diagnostics for submersible motors, solar DC controllers, and micro-drip manifolds.',
      img: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80',
      icon: Droplets,
      rate: '₹550/visit',
      eta: '45 mins'
    },
    {
      serviceId: 'srv-2',
      title: 'Mobile Tractor & Harvester Mechanics',
      tag: 'On-Field Dispatch',
      desc: 'Hydraulic lift seals, diesel injector calibration, rotavators, and combine harvester servicing.',
      img: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80',
      icon: Tractor,
      rate: '₹750/visit',
      eta: '30 mins'
    },
    {
      serviceId: 'srv-9',
      title: 'Milk Chilling & Cold Storage Units',
      tag: 'FoodTech & Dairy',
      desc: 'Compressor fixes for village dairy societies, bulk milk coolers (BMC), and mandi cold rooms.',
      img: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
      icon: Cpu,
      rate: '₹700/visit',
      eta: '40 mins'
    },
    {
      serviceId: 'srv-7',
      title: 'Solar Agrivoltaics & Panel Scrubbing',
      tag: 'Renewable Power',
      desc: 'De-ionized water scrubbing and PV yield auditing to restore up to 25% lost generation efficiency.',
      img: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80',
      icon: Zap,
      rate: '₹650/visit',
      eta: '60 mins'
    }
  ];

  const handleBookRuralService = (serviceId: string) => {
    const matched = services.find((s) => s.id === serviceId) || services[0];
    setSelectedServiceForBooking(matched);
    setIsBookingModalOpen(true);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#faf8f5] border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 mb-3">
              <Wheat className="w-3.5 h-3.5 text-amber-700" />
              Theme: Agriculture, FoodTech & Rural Development
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-brand-display">
              Services Supporting Rural India & Farmers
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
              When a tube-well fails or a tractor stalls during harvest, every hour costs lakhs. 
              Our cooperative mobile mechanic squads ensure zero downtime for Indian agriculture.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedCategory('agricultural');
                setActiveView('services');
              }}
              className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Explore All Agro Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsEmergencyModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-300 hover:bg-rose-100 font-bold text-xs transition-colors cursor-pointer"
            >
              🚨 Farm Emergency
            </button>
          </div>
        </div>

        {/* 4 Featured Rural Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {ruralServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <div
                    onClick={() => handleBookRuralService(service.serviceId)}
                    className="relative h-44 overflow-hidden cursor-pointer"
                    title={`Click to book ${service.title}`}
                  >
                    <SafeImage
                      src={service.img}
                      alt={service.title}
                      fallbackType="service"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 text-amber-300 backdrop-blur-xs border border-white/20">
                        {service.tag}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-white/95 px-2.5 py-0.5 rounded-md text-[11px] font-extrabold text-emerald-800 shadow-sm">
                      ETA: {service.eta}
                    </div>
                  </div>

                  <div className="p-5">
                    <div
                      onClick={() => handleBookRuralService(service.serviceId)}
                      className="flex items-center gap-2 mb-2 cursor-pointer group-hover:text-emerald-800"
                    >
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-emerald-800 transition-colors">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 mt-2 flex items-center justify-between border-t border-slate-100 pt-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Fair Rate</span>
                    <span className="text-xs font-bold text-slate-900">{service.rate}</span>
                  </div>
                  <button
                    onClick={() => handleBookRuralService(service.serviceId)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Real Agro-Ecosystem Impact Feature Card */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-[#0b3b29] rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <Wheat className="w-96 h-96 -mr-16 -mb-16 text-white" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950">
                Panchayat & Mandi Partnership
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-brand-display">
                Connecting 12,000+ Villages with Skilled Cooperative Technicians
              </h3>
              <p className="text-emerald-100/90 text-sm leading-relaxed max-w-2xl">
                Through our integration with APMC Mandis, Primary Agricultural Credit Societies (PACS), and District Labour Federations, farmers no longer have to wait days or travel 40 km to towns for basic pump, tractor, or wiring repairs.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-emerald-950/60 border border-emerald-700/60 p-3 rounded-xl">
                  <div className="text-amber-300 font-bold text-xl font-brand-display">42 Mins</div>
                  <div className="text-xs text-emerald-200 mt-0.5">Average Rural Farm Response</div>
                </div>
                <div className="bg-emerald-950/60 border border-emerald-700/60 p-3 rounded-xl">
                  <div className="text-amber-300 font-bold text-xl font-brand-display">Zero Idle Days</div>
                  <div className="text-xs text-emerald-200 mt-0.5">Harvest machinery downtime prevented</div>
                </div>
                <div className="bg-emerald-950/60 border border-emerald-700/60 p-3 rounded-xl">
                  <div className="text-amber-300 font-bold text-xl font-brand-display">100% Genuine</div>
                  <div className="text-xs text-emerald-200 mt-0.5">Standardized spares & pricing</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
              <Tractor className="w-12 h-12 text-amber-300 mx-auto mb-3" />
              <h4 className="font-bold text-white text-base">
                Are you a Farm or Dairy Society?
              </h4>
              <p className="text-xs text-emerald-200 mt-1 mb-4 leading-relaxed">
                Set up an institutional cooperative servicing contract for seasonal tractor checks & cold room servicing.
              </p>
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs transition-colors shadow-sm cursor-pointer"
              >
                Request Farm Society Servicing
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
