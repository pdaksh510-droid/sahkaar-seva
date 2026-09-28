import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SafeImage } from '../common/SafeImage';
import { Worker, CooperativeSociety } from '../../types';
import {
  Compass,
  MapPin,
  Layers,
  Filter,
  ShieldCheck,
  Star,
  Users,
  Wheat,
  Home,
  Cpu,
  HeartHandshake,
  Calendar,
  AlertCircle,
  Eye,
  Info
} from 'lucide-react';

export const GeoSpatialMatcher: React.FC = () => {
  const {
    workers,
    cooperatives,
    selectedDistrict,
    setSelectedDistrict,
    setSelectedWorkerForProfile,
    setIsBookingModalOpen
  } = useApp();

  const [activeLayer, setActiveLayer] = useState<'all' | 'workers' | 'cooperatives' | 'hotspots'>('all');
  const [selectedWorkerPin, setSelectedWorkerPin] = useState<Worker | null>(null);
  const [selectedCoopPin, setSelectedCoopPin] = useState<CooperativeSociety | null>(null);
  const [filterDomain, setFilterDomain] = useState<string>('all');
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);

  // Filtered workers
  const displayedWorkers = workers.filter((w) => {
    const matchesDistrict = selectedDistrict === 'all' || w.district.toLowerCase() === selectedDistrict.toLowerCase();
    const matchesDomain = filterDomain === 'all' || w.domain === filterDomain;
    const matchesAvail = !onlyAvailable || w.isAvailableNow;
    return matchesDistrict && matchesDomain && matchesAvail;
  });

  const displayedCoops = cooperatives.filter((c) => {
    return selectedDistrict === 'all' || c.district.toLowerCase() === selectedDistrict.toLowerCase();
  });

  // Demand hotspots mock representation
  const hotspots = [
    { id: 'h-1', name: 'Anand Agri-Corridor (Borsad Belt)', demand: 'Very High', color: '#ea580c', req: 'Tube-Well Motors', top: '35%', left: '32%' },
    { id: 'h-2', name: 'Pune Kothrud & Mulshi Valley', demand: 'High', color: '#f59e0b', req: 'MCB Wiring & Waterproofing', top: '55%', left: '38%' },
    { id: 'h-3', name: 'Ludhiana GT Road Grain Mandi', demand: 'Critical', color: '#dc2626', req: 'Tractor Hydraulics', top: '22%', left: '36%' },
    { id: 'h-4', name: 'Coimbatore Pollachi Coconut Belt', demand: 'High', color: '#10b981', req: 'Drip Micro-Piping', top: '78%', left: '42%' }
  ];

  return (
    <div className="py-10 bg-[#faf8f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 mb-1">
              <Compass className="w-3.5 h-3.5 text-emerald-700" />
              Geo-Spatial GIS Service Matcher
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 font-brand-display">
              Regional Cooperative Map & Real-time Nodes
            </h1>
            <p className="text-xs text-slate-500">
              Interactive geo-spatial visualization of active artisans, registered societies, and demand hotspots.
            </p>
          </div>

          {/* Quick Stats Banner */}
          <div className="flex items-center gap-3">
            <div className="bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Mapped Artisans</span>
              <span className="text-base font-extrabold text-slate-900">{displayedWorkers.length}</span>
            </div>
            <div className="bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Societies</span>
              <span className="text-base font-extrabold text-emerald-800">{displayedCoops.length}</span>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/90 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            
            {/* District select */}
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 text-xs">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="bg-transparent font-bold text-slate-800 focus:outline-hidden cursor-pointer"
              >
                <option value="all">📍 All India Zones</option>
                <option value="Anand">Anand (Gujarat)</option>
                <option value="Pune">Pune (Maharashtra)</option>
                <option value="Ludhiana">Ludhiana (Punjab)</option>
                <option value="Coimbatore">Coimbatore (Tamil Nadu)</option>
                <option value="Varanasi">Varanasi (Uttar Pradesh)</option>
                <option value="Jodhpur">Jodhpur (Rajasthan)</option>
                <option value="Kozhikode">Kozhikode (Kerala)</option>
                <option value="Bengaluru Rural">Bengaluru Rural (Karnataka)</option>
              </select>
            </div>

            {/* Domain Filter */}
            <select
              value={filterDomain}
              onChange={(e) => setFilterDomain(e.target.value)}
              className="bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-hidden"
            >
              <option value="all">All Service Domains</option>
              <option value="agricultural">🌾 Agriculture & Farm Tech</option>
              <option value="household">🏠 Household Trades</option>
              <option value="technical">⚙️ Technical & Cooling</option>
              <option value="caregiving">🩺 Elder & Patient Care</option>
              <option value="community">🧹 Community Infrastructure</option>
            </select>

            {/* Available only toggle */}
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="rounded text-emerald-700 focus:ring-emerald-700"
              />
              <span>Available Now Only</span>
            </label>
          </div>

          {/* Layer toggles */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-medium mr-1 hidden sm:inline">Layers:</span>
            {[
              { id: 'all', label: 'All' },
              { id: 'workers', label: 'Artisans' },
              { id: 'cooperatives', label: 'Societies' },
              { id: 'hotspots', label: 'Demand Hotspots' }
            ].map((layer) => (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id as any)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  activeLayer === layer.id
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {layer.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Simulated Map Canvas Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Visual Map Canvas */}
          <div className="lg:col-span-8 bg-[#1e293b] rounded-3xl p-4 shadow-xl border border-slate-700 relative overflow-hidden h-[540px] flex flex-col justify-between">
            
            {/* Top map controls & legend overlay */}
            <div className="flex items-center justify-between z-10 pointer-events-none">
              <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-[11px] text-slate-300 flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  Verified Artisan
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  Coop Society HQ
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                  Shortage Hotspot
                </span>
              </div>

              <div className="bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-700 text-[10px] text-amber-300 font-mono">
                Lat: 22.5645° N | Lng: 72.9289° E
              </div>
            </div>

            {/* Stylized SVG Map Representation of Indian Subcontinent & Service Corridors */}
            <div className="absolute inset-0 z-0 opacity-80 pointer-events-auto">
              {/* Map grid lines */}
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="#0f172a" />
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Stylized Indian subcontinent outline trace */}
                <path
                  d="M 280,60 L 360,90 L 380,150 L 440,180 L 410,240 L 470,290 L 420,330 L 380,440 L 350,490 L 330,460 L 300,380 L 260,330 L 230,260 L 240,190 L 270,120 Z"
                  fill="#1e293b"
                  stroke="#475569"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  className="opacity-70"
                />

                {/* Radial Agro-Corridor lines */}
                <path d="M 270,180 L 350,220 L 340,360 L 380,440" fill="none" stroke="#059669" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                <path d="M 290,140 L 410,240 L 350,420" fill="none" stroke="#d97706" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.5" />
              </svg>

              {/* DEMAND HOTSPOTS LAYER */}
              {(activeLayer === 'all' || activeLayer === 'hotspots') &&
                hotspots.map((spot) => (
                  <div
                    key={spot.id}
                    style={{ top: spot.top, left: spot.left }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  >
                    <div
                      className="w-12 h-12 rounded-full opacity-30 animate-ping"
                      style={{ backgroundColor: spot.color }}
                    ></div>
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white shadow-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-[8px] font-bold text-white"
                      style={{ backgroundColor: spot.color }}
                    >
                      !
                    </div>
                    {/* Tooltip on hover */}
                    <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 text-white text-[10px] p-2 rounded-lg shadow-xl border border-slate-700 w-44 z-30">
                      <div className="font-bold text-amber-300">{spot.name}</div>
                      <div className="text-slate-300 mt-0.5">Surge: {spot.req}</div>
                      <div className="text-rose-400 font-semibold">Shortage: High</div>
                    </div>
                  </div>
                ))}

              {/* COOPERATIVE SOCIETY PINS */}
              {(activeLayer === 'all' || activeLayer === 'cooperatives') &&
                displayedCoops.map((coop, idx) => {
                  const positions = [
                    { top: '38%', left: '33%' }, // Anand
                    { top: '56%', left: '38%' }, // Pune
                    { top: '22%', left: '35%' }, // Ludhiana
                    { top: '78%', left: '41%' }, // Coimbatore
                    { top: '38%', left: '55%' }, // Varanasi
                    { top: '82%', left: '39%' }, // Kozhikode
                    { top: '32%', left: '28%' }, // Jodhpur
                    { top: '71%', left: '43%' }  // Bengaluru
                  ];
                  const pos = positions[idx % positions.length];

                  return (
                    <div
                      key={coop.id}
                      style={{ top: pos.top, left: pos.left }}
                      onClick={() => {
                        setSelectedCoopPin(coop);
                        setSelectedWorkerPin(null);
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                    >
                      <div className="w-8 h-8 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-lg border-2 border-white transition-transform group-hover:scale-125">
                        🏢
                      </div>
                      <span className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded bg-slate-900 text-[10px] text-amber-300 font-bold whitespace-nowrap border border-slate-700 shadow-md">
                        {coop.shortName}
                      </span>
                    </div>
                  );
                })}

              {/* WORKER PINS */}
              {(activeLayer === 'all' || activeLayer === 'workers') &&
                displayedWorkers.map((worker, idx) => {
                  // Deterministic offset scatter based on id
                  const basePositions = [
                    { top: '36%', left: '34%' },
                    { top: '58%', left: '39%' },
                    { top: '24%', left: '36%' },
                    { top: '76%', left: '42%' },
                    { top: '40%', left: '56%' },
                    { top: '80%', left: '40%' },
                    { top: '34%', left: '29%' },
                    { top: '69%', left: '44%' },
                    { top: '35%', left: '30%' },
                    { top: '55%', left: '37%' },
                    { top: '23%', left: '34%' },
                    { top: '39%', left: '35%' },
                    { top: '72%', left: '45%' },
                    { top: '42%', left: '54%' }
                  ];
                  const pos = basePositions[idx % basePositions.length];

                  return (
                    <div
                      key={worker.id}
                      style={{ top: pos.top, left: pos.left }}
                      onClick={() => {
                        setSelectedWorkerPin(worker);
                        setSelectedCoopPin(null);
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                    >
                      <div className="relative">
                        <SafeImage
                          src={worker.avatar}
                          alt={worker.name}
                          fallbackType="avatar"
                          fallbackText={worker.name}
                          className="w-7 h-7 rounded-full object-cover border-2 border-emerald-400 shadow-md group-hover:scale-125 transition-transform"
                        />
                        {worker.isAvailableNow && (
                          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-1 ring-slate-900"></span>
                        )}
                      </div>
                      <span className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded bg-slate-900 text-[10px] text-white font-medium whitespace-nowrap border border-slate-700 shadow-md">
                        {worker.name} ({worker.primarySkill})
                      </span>
                    </div>
                  );
                })}
            </div>

            {/* Bottom prompt */}
            <div className="z-10 bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-2xl border border-slate-700 text-xs text-slate-300 flex items-center justify-between pointer-events-auto">
              <span className="flex items-center gap-1.5 text-[11px]">
                <Info className="w-3.5 h-3.5 text-amber-400" />
                Click on any worker avatar or society node to inspect details & book
              </span>
              <button
                onClick={() => {
                  setSelectedWorkerPin(displayedWorkers[0]);
                  setSelectedCoopPin(null);
                }}
                className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 underline"
              >
                Inspect Sample Node
              </button>
            </div>
          </div>

          {/* Right Selected Entity Inspector Panel */}
          <div className="lg:col-span-4">
            
            {/* WORKER INSPECTOR */}
            {selectedWorkerPin && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 animate-in fade-in duration-150">
                <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Selected Cooperative Worker
                  </span>
                  <button
                    onClick={() => setSelectedWorkerPin(null)}
                    className="text-xs text-slate-400 hover:text-slate-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex items-center gap-3.5">
                  <SafeImage
                    src={selectedWorkerPin.avatar}
                    alt={selectedWorkerPin.name}
                    fallbackType="avatar"
                    fallbackText={selectedWorkerPin.name}
                    onClick={() => setSelectedWorkerForProfile(selectedWorkerPin)}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-600 shadow-sm cursor-pointer hover:scale-105 transition-transform shrink-0"
                    title="Click to view full profile"
                  />
                  <div>
                    <h4
                      onClick={() => setSelectedWorkerForProfile(selectedWorkerPin)}
                      className="font-bold text-slate-900 text-base cursor-pointer hover:text-emerald-800 transition-colors"
                    >
                      {selectedWorkerPin.name}
                    </h4>
                    <p className="text-xs font-semibold text-emerald-800">{selectedWorkerPin.primarySkill}</p>
                    <p className="text-[11px] text-slate-500">{selectedWorkerPin.cooperativeName}</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Consumer Rating:</span>
                    <span className="font-bold text-slate-900 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {selectedWorkerPin.rating} ({selectedWorkerPin.reviewsCount} reviews)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Jobs Completed:</span>
                    <span className="font-bold text-slate-900">{selectedWorkerPin.completedJobsCount} Tasks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Welfare Score:</span>
                    <span className="font-bold text-emerald-700">
                      {selectedWorkerPin.welfare.welfareScore}/100 (Full Coverage)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Working Radius:</span>
                    <span className="font-bold text-slate-900">{selectedWorkerPin.workingRadiusKm} km</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedWorkerForProfile(selectedWorkerPin)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs text-center cursor-pointer"
                  >
                    View Full Profile
                  </button>
                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs text-center shadow-xs cursor-pointer"
                  >
                    Book Worker
                  </button>
                </div>
              </div>
            )}

            {/* COOPERATIVE SOCIETY INSPECTOR */}
            {selectedCoopPin && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 animate-in fade-in duration-150">
                <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full">
                    Labour Cooperative Society
                  </span>
                  <button
                    onClick={() => setSelectedCoopPin(null)}
                    className="text-xs text-slate-400 hover:text-slate-700"
                  >
                    ✕
                  </button>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-base leading-snug">
                    {selectedCoopPin.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Reg No: {selectedCoopPin.registrationNumber} • Est: {selectedCoopPin.establishedYear}
                  </p>
                </div>

                <div className="space-y-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Enrolled Artisans:</span>
                    <span className="font-bold text-slate-900">{selectedCoopPin.totalWorkers} Members</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Active On-Call:</span>
                    <span className="font-bold text-emerald-700">{selectedCoopPin.activeWorkers} Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Welfare Fund Pool:</span>
                    <span className="font-bold text-amber-700">
                      ₹{(selectedCoopPin.welfareFundBalance / 100000).toFixed(2)} Lakhs
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Apex Federation:</span>
                    <span className="font-semibold text-slate-800 text-[11px] truncate max-w-[160px]">
                      {selectedCoopPin.federationAffiliation}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  <strong>Office Address:</strong> {selectedCoopPin.address}
                </p>

                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  Book Services from this Society
                </button>
              </div>
            )}

            {/* DEFAULT VIEW WHEN NO PIN IS CLICKED */}
            {!selectedWorkerPin && !selectedCoopPin && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 text-center py-12">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto">
                  <Compass className="w-6 h-6 text-emerald-700" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">
                  Click Any Node on the Map
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Select an artisan pin to review background verification and welfare score, or select a cooperative society to view federation stats.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setSelectedWorkerPin(displayedWorkers[0])}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
                  >
                    Select Featured Worker
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
