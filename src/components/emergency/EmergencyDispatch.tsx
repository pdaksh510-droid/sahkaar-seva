import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { SafeImage } from '../common/SafeImage';
import { Worker } from '../../types';
import {
  AlertTriangle,
  PhoneCall,
  Clock,
  MapPin,
  ShieldCheck,
  Zap,
  Droplets,
  Tractor,
  HeartPulse,
  Cpu,
  CheckCircle2,
  Navigation,
  X,
  Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface EmergencyCategory {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  domain: string;
  defaultEta: number; // in mins
  riskNotice: string;
}

const emergencyCategories: EmergencyCategory[] = [
  {
    id: 'pump_failure',
    title: 'Tube-Well & Irrigation Pump Breakdown',
    icon: Droplets,
    domain: 'agricultural',
    defaultEta: 25,
    riskNotice: 'Crops at risk of drying out or starter coil overheating.'
  },
  {
    id: 'electrical_spark',
    title: 'Electrical Spark, Short Circuit & MCB Trip',
    icon: Zap,
    domain: 'household',
    defaultEta: 20,
    riskNotice: 'Fire hazard. Licensed wireman dispatched with surge safety equipment.'
  },
  {
    id: 'tractor_breakdown',
    title: 'Tractor / Harvester Stalled in Field',
    icon: Tractor,
    domain: 'agricultural',
    defaultEta: 30,
    riskNotice: 'Mobile mechanics van equipped with hydraulic pump and battery booster.'
  },
  {
    id: 'cold_storage',
    title: 'Milk Bulk Cooler or Cold Storage Failure',
    icon: Cpu,
    domain: 'technical',
    defaultEta: 35,
    riskNotice: 'Urgent compressor restart to avert spoilage of collected village milk.'
  },
  {
    id: 'elder_care',
    title: 'Elder Patient Urgent Mobility Assistance',
    icon: HeartPulse,
    domain: 'caregiving',
    defaultEta: 20,
    riskNotice: 'Certified caregiver with Red Cross first-aid credentials dispatched.'
  }
];

export const EmergencyDispatch: React.FC = () => {
  const {
    workers,
    isEmergencyModalOpen,
    setIsEmergencyModalOpen,
    createBooking,
    addNotification,
    setActiveView,
    setSelectedWorkerForProfile
  } = useApp();

  const [selectedCat, setSelectedCat] = useState<EmergencyCategory>(emergencyCategories[0]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [matchedWorker, setMatchedWorker] = useState<Worker | null>(null);
  const [dispatchStatus, setDispatchStatus] = useState<'idle' | 'scanning' | 'dispatched'>('idle');
  const [etaTimer, setEtaTimer] = useState<number>(25);

  // Filter available workers in relevant domain
  const availableNearby = workers.filter(
    (w) => w.isAvailableNow && (w.domain === selectedCat.domain || w.verificationStatus === 'verified')
  );

  const handleStartEmergencyScan = () => {
    setIsScanning(true);
    setDispatchStatus('scanning');

    // Simulate real-time radar lock-on after 1.8s
    setTimeout(() => {
      const selected = availableNearby[0] || workers[0];
      setMatchedWorker(selected);
      setIsScanning(false);
      setDispatchStatus('dispatched');
      setEtaTimer(selectedCat.defaultEta);

      createBooking({
        serviceId: 'srv-emergency',
        serviceTitle: `EMERGENCY: ${selectedCat.title}`,
        customerId: 'cust-emerg',
        customerName: 'Emergency Caller (Priority Line)',
        customerPhone: '+91 98250 99999',
        customerAddress: 'GPS Location: 22.5645° N, 72.9289° E (Anand Rural Belt)',
        district: selected.district,
        workerId: selected.id,
        workerName: selected.name,
        workerAvatar: selected.avatar,
        workerPhone: selected.mobile,
        cooperativeId: selected.cooperativeId,
        cooperativeName: selected.cooperativeName,
        scheduledDate: new Date().toISOString().split('T')[0],
        scheduledTimeSlot: 'IMMEDIATE DISPATCH',
        problemDescription: `EMERGENCY 24x7 DISPATCH: ${selectedCat.title} - ${selectedCat.riskNotice}`,
        status: 'emergency_dispatched',
        urgency: 'emergency',
        totalPrice: selected.baseHourlyRate + 200, // emergency surcharge
        etaMinutes: selectedCat.defaultEta
      });

      try {
        confetti({
          particleCount: 70,
          spread: 50,
          origin: { y: 0.5 }
        });
      } catch {
        // ignore
      }

      addNotification(
        '🚨 Emergency Worker Dispatched',
        `${selected.name} is on the way. Estimated arrival: ${selectedCat.defaultEta} mins.`,
        'alert'
      );
    }, 1800);
  };

  const handleReset = () => {
    setDispatchStatus('idle');
    setMatchedWorker(null);
  };

  return (
    <div className="py-12 bg-[#faf8f5] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Emergency Header Banner */}
        <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-rose-500/30 text-rose-200 border border-rose-400/40">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-ping"></span>
                <span>24x7 Rapid Cooperative Emergency Squad</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-brand-display tracking-tight">
                Need Help Now? Emergency Dispatch
              </h1>
              <p className="text-xs sm:text-sm text-rose-100/90 max-w-xl leading-relaxed">
                Critical breakdowns on farms, water bursts, electrical fire risks, or medical care require immediate action. Cooperative mobile response teams are on standby across all zones.
              </p>
            </div>

            <div className="bg-rose-950/70 p-4 rounded-2xl border border-rose-700/60 text-center shrink-0">
              <span className="text-[11px] text-rose-300 block uppercase font-bold">Emergency Hotline</span>
              <a
                href="tel:18002007382"
                className="text-2xl font-extrabold text-amber-300 hover:underline tracking-wider font-brand-display"
              >
                1800-200-SEVA
              </a>
              <span className="text-[10px] text-rose-300 block mt-0.5">Toll-Free • Multilingual 24x7</span>
            </div>
          </div>
        </div>

        {/* Dispatch Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Select Emergency Category */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              1. Select Emergency Type
            </h3>

            <div className="space-y-2.5">
              {emergencyCategories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCat.id === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCat(cat);
                      handleReset();
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                      isSelected
                        ? 'border-rose-600 bg-rose-50/80 shadow-xs ring-1 ring-rose-600'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-900 text-xs truncate">{cat.title}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{cat.riskNotice}</div>
                    </div>
                    <span className="text-xs font-bold text-rose-700 shrink-0">~{cat.defaultEta}m</span>
                  </button>
                );
              })}
            </div>

            {/* GPS Simulation Pill */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 text-xs flex items-center gap-2.5 text-slate-600">
              <Navigation className="w-4 h-4 text-emerald-700 animate-pulse shrink-0" />
              <div>
                <strong className="text-slate-800">Live GPS Location Locked:</strong> Anand Agro-Belt, Gujarat (22.56°N, 72.93°E)
              </div>
            </div>
          </div>

          {/* Right Column: Live Simulated Radar & Dispatch Results */}
          <div className="lg:col-span-7">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              2. Live Radar Matching & Dispatch
            </h3>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden text-center">
              
              {/* IDLE STATE */}
              {dispatchStatus === 'idle' && (
                <div className="space-y-6 py-6">
                  <div className="relative w-36 h-36 mx-auto rounded-full bg-rose-50 border-4 border-rose-200 flex items-center justify-center">
                    <AlertTriangle className="w-16 h-16 text-rose-600 animate-bounce" />
                    <div className="absolute inset-0 rounded-full border-2 border-rose-400 animate-ping opacity-40"></div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-slate-900 font-brand-display">
                      Ready to Dispatch: {selectedCat.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                      {availableNearby.length} verified cooperative technicians active in your sector ready for emergency transit.
                    </p>
                  </div>

                  <button
                    onClick={handleStartEmergencyScan}
                    className="px-8 py-4 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-rose-900/20 transition-all flex items-center justify-center gap-2.5 mx-auto cursor-pointer"
                  >
                    <Navigation className="w-5 h-5 animate-spin-slow" />
                    <span>Dispatch Nearest Worker Now</span>
                  </button>
                </div>
              )}

              {/* SCANNING STATE */}
              {dispatchStatus === 'scanning' && (
                <div className="space-y-6 py-10">
                  <div className="relative w-36 h-36 mx-auto rounded-full bg-emerald-950 border-4 border-emerald-500 flex items-center justify-center overflow-hidden">
                    {/* Rotating radar line */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/40 via-transparent to-transparent animate-spin duration-1000"></div>
                    <Compass className="w-12 h-12 text-emerald-400" />
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-slate-900">
                      Triangulating Nearest Cooperative Artisan...
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Checking availability radius, skill certification, and vehicle readiness in sector...
                    </p>
                  </div>
                </div>
              )}

              {/* DISPATCHED STATE */}
              {dispatchStatus === 'dispatched' && matchedWorker && (
                <div className="space-y-6 text-left animate-in zoom-in-95 duration-200">
                  <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-500 animate-beacon-green"></span>
                      <span className="text-xs font-bold text-emerald-900 uppercase">
                        Dispatch Confirmed • Worker In Transit
                      </span>
                    </div>
                    <span className="text-xs font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-xs">
                      ETA: {etaTimer} Minutes
                    </span>
                  </div>

                  {/* Worker Card */}
                  <div className="bg-[#faf8f5] rounded-2xl p-5 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <SafeImage
                        src={matchedWorker.avatar}
                        alt={matchedWorker.name}
                        fallbackType="avatar"
                        fallbackText={matchedWorker.name}
                        onClick={() => setSelectedWorkerForProfile(matchedWorker)}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-600 shadow-md cursor-pointer hover:scale-105 transition-transform shrink-0"
                        title="Click to view full profile"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4
                            onClick={() => setSelectedWorkerForProfile(matchedWorker)}
                            className="font-bold text-slate-900 text-base cursor-pointer hover:text-emerald-800"
                          >
                            {matchedWorker.name}
                          </h4>
                          <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-1.5 py-0.2 rounded">
                            Verified
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-emerald-800">{matchedWorker.primarySkill}</p>
                        <p className="text-xs text-slate-500">{matchedWorker.cooperativeName}</p>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-600 font-medium">
                          <span>Dist: 3.4 km</span>
                          <span>•</span>
                          <span>Vehicle: Mobile Service Van</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href={`tel:${matchedWorker.mobile}`}
                      className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call {matchedWorker.name.split(' ')[0]}</span>
                    </a>
                  </div>

                  {/* Emergency Safety Protocol Note */}
                  <div className="text-xs text-slate-600 bg-amber-50 p-3.5 rounded-xl border border-amber-200 space-y-1">
                    <strong className="text-amber-900 block">Cooperative Emergency Protocol:</strong>
                    <p>
                      1. Turn off main power circuit or water inlet valve if safe to do so.
                    </p>
                    <p>
                      2. Keep farm path or residential entrance clear for the cooperative technician's service vehicle.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={handleReset}
                      className="text-xs text-slate-500 hover:text-slate-800 underline font-medium"
                    >
                      Reset / New Emergency
                    </button>
                    <button
                      onClick={() => setActiveView('dashboard')}
                      className="text-xs font-bold text-emerald-800 hover:text-emerald-950"
                    >
                      View Live Dispatch Status in Dashboard →
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
