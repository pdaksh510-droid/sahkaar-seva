import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SafeImage } from '../common/SafeImage';
import { ServiceDomain, ServiceItem, Worker } from '../../types';
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  ShieldCheck,
  Star,
  Clock,
  Sparkles,
  Wheat,
  Home,
  Cpu,
  HeartHandshake,
  Users,
  CheckCircle,
  AlertCircle,
  Eye,
  ArrowRight
} from 'lucide-react';

export const ServiceMarketplace: React.FC = () => {
  const {
    services,
    workers,
    searchQuery,
    setSearchQuery,
    selectedDistrict,
    setSelectedDistrict,
    selectedCategory,
    setSelectedCategory,
    setSelectedServiceForBooking,
    setSelectedWorkerForProfile,
    setIsBookingModalOpen,
    setIsEmergencyModalOpen
  } = useApp();

  const [activeDomainFilter, setActiveDomainFilter] = useState<string>('all');
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceItem | null>(null);

  // Filter services
  const filteredServices = services.filter((srv) => {
    const matchesDomain = activeDomainFilter === 'all' || srv.domain === activeDomainFilter;
    const matchesSearch =
      srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  // Filter workers based on selectedDistrict
  const filteredWorkers = workers.filter((w) => {
    const matchesDistrict = selectedDistrict === 'all' || w.district.toLowerCase() === selectedDistrict.toLowerCase();
    const matchesDomain = activeDomainFilter === 'all' || w.domain === activeDomainFilter;
    return matchesDistrict && matchesDomain;
  });

  const domainTabs: { id: string; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'all', label: 'All Services', icon: Sparkles },
    { id: 'agricultural', label: 'Agriculture & Farm Tech', icon: Wheat },
    { id: 'household', label: 'Household & Trades', icon: Home },
    { id: 'technical', label: 'Technical & Cooling', icon: Cpu },
    { id: 'caregiving', label: 'Elder & Patient Care', icon: HeartHandshake },
    { id: 'community', label: 'Community Infrastructure', icon: Users }
  ];

  const handleBookService = (service: ServiceItem) => {
    setSelectedServiceForBooking(service);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="py-10 bg-[#faf8f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Breadcrumb */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Verified Labour Cooperative Directory
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-brand-display mt-1">
                Cooperative Services Marketplace
              </h1>
              <p className="text-slate-600 text-sm mt-1">
                Browse standardized, fair-trade services for homes, farms, shops, and institutions.
              </p>
            </div>

            <button
              onClick={() => setIsEmergencyModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-300 hover:bg-rose-100 font-bold text-xs shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
              Emergency Dispatch Needed?
            </button>
          </div>
        </div>

        {/* Filter Toolbar: Search, District, Domain pills */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/90 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services (e.g., tube-well pump, electrician, tractor repair)..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-emerald-700"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* District Selector */}
            <div className="flex items-center gap-2 w-full md:w-64 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
              <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-slate-800 focus:outline-hidden cursor-pointer"
              >
                <option value="all">📍 All India Districts</option>
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
          </div>

          {/* Domain Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-slate-100 text-xs">
            {domainTabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeDomainFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveDomainFilter(tab.id)}
                  className={`px-3 py-2 rounded-xl font-semibold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>Available Cooperative Services</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                {filteredServices.length} Services
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <div
                    onClick={() => handleBookService(service)}
                    className="relative h-48 overflow-hidden bg-slate-100 cursor-pointer"
                    title={`Click to book ${service.title}`}
                  >
                    <SafeImage
                      src={service.imageUrl}
                      alt={service.title}
                      fallbackType="service"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 text-white backdrop-blur-xs">
                        {service.category}
                      </span>
                      {service.isEmergencyEligible && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white shadow-xs">
                          24x7 Emergency
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3
                      onClick={() => handleBookService(service)}
                      className="font-bold text-slate-900 text-base leading-snug mb-1 cursor-pointer hover:text-emerald-800 transition-colors"
                    >
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                      {service.shortDescription}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 mb-4">
                      <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md">
                        <Clock className="w-3 h-3 text-slate-400" />
                        Est: {service.estimatedTime}
                      </span>
                      <span className="flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md font-medium">
                        Popular: {service.popularIn}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between pt-4">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Cooperative Rate</span>
                    <span className="text-base font-extrabold text-slate-900">
                      ₹{service.basePrice}{' '}
                      <span className="text-xs font-normal text-slate-500">{service.pricingUnit}</span>
                    </span>
                  </div>

                  <button
                    onClick={() => handleBookService(service)}
                    className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Service</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Workers Directory Section */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Direct Artisan Roster
              </span>
              <h2 className="text-2xl font-bold text-slate-900 font-brand-display mt-0.5">
                Nearby Verified Cooperative Members ({filteredWorkers.length})
              </h2>
              <p className="text-xs text-slate-500">
                Book a specific trusted artisan or inspect their certified skill credentials and welfare scorecard.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredWorkers.map((worker) => (
              <div
                key={worker.id}
                className="bg-[#faf8f5] rounded-2xl p-5 border border-slate-200 hover:border-emerald-500 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-3.5 mb-3">
                    <SafeImage
                      src={worker.avatar}
                      alt={worker.name}
                      fallbackType="avatar"
                      fallbackText={worker.name}
                      onClick={() => setSelectedWorkerForProfile(worker)}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-600 shadow-xs shrink-0 cursor-pointer hover:scale-105 transition-transform"
                      title="Click to view full profile"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4
                          onClick={() => setSelectedWorkerForProfile(worker)}
                          className="font-bold text-slate-900 text-sm truncate cursor-pointer hover:text-emerald-800 transition-colors"
                        >
                          {worker.name}
                        </h4>
                        <div className="flex items-center gap-0.5 bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded text-[11px] font-bold">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          <span>{worker.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs font-semibold text-emerald-800 truncate mt-0.5">
                        {worker.primarySkill}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {worker.cooperativeName}
                      </p>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {worker.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] bg-white text-slate-700 font-medium px-2 py-0.5 rounded-md border border-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Verification badges & welfare score */}
                  <div className="space-y-1.5 text-[11px] bg-white/70 p-2.5 rounded-xl border border-slate-200/80 mb-4">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-1 font-medium">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        Aadhaar & e-Shram
                      </span>
                      <span className="font-bold text-emerald-700">Verified</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-1 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Welfare Score
                      </span>
                      <span className="font-bold text-slate-900">{worker.welfare.welfareScore}/100</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        District
                      </span>
                      <span className="font-semibold text-slate-800">{worker.district}, {worker.state}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Fair Base Rate</span>
                    <span className="text-xs font-bold text-slate-900">₹{worker.baseHourlyRate}/hr</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setSelectedWorkerForProfile(worker)}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        const matchedSrv = services.find((s) => s.domain === worker.domain) || services[0];
                        setSelectedServiceForBooking(matchedSrv);
                        setIsBookingModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-xs cursor-pointer"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
