import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SafeImage } from '../common/SafeImage';
import { Booking } from '../../types';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  FileText,
  Star,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  PhoneCall,
  User,
  Plus,
  Coins
} from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const {
    bookings,
    updateBookingStatus,
    setActiveInvoiceBooking,
    setIsInvoiceModalOpen,
    setActiveRatingBooking,
    setIsRatingModalOpen,
    setIsBookingModalOpen,
    setIsEmergencyModalOpen,
    selectedDistrict,
    workers,
    setSelectedWorkerForProfile
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');

  const customerBookings = bookings.filter((b) => {
    if (activeTab === 'active') return b.status === 'confirmed' || b.status === 'in_progress' || b.status === 'emergency_dispatched';
    if (activeTab === 'completed') return b.status === 'completed';
    return true;
  });

  const activeCount = bookings.filter((b) => b.status === 'confirmed' || b.status === 'in_progress' || b.status === 'emergency_dispatched').length;
  const completedCount = bookings.filter((b) => b.status === 'completed').length;
  const totalSpent = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  return (
    <div className="py-10 bg-[#faf8f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome & Overview Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-800 to-amber-700 text-white flex items-center justify-center font-bold text-xl shadow-md">
                SP
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-slate-900 font-brand-display">
                    Welcome, Suresh Patel
                  </h1>
                  <span className="text-[10px] bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                    Kisan Agro Member
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Boriavi Road, Anand Agro-Belt • District: {selectedDistrict}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Book New Service</span>
              </button>
              <button
                onClick={() => setIsEmergencyModalOpen(true)}
                className="px-4 py-2.5 bg-rose-50 text-rose-800 border border-rose-300 hover:bg-rose-100 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                🚨 Emergency Dispatch
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Bookings</span>
              <span className="text-2xl font-extrabold text-emerald-800 font-brand-display">{activeCount}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Completed Jobs</span>
              <span className="text-2xl font-extrabold text-slate-900 font-brand-display">{completedCount}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Remuneration</span>
              <span className="text-2xl font-extrabold text-slate-900 font-brand-display">₹{totalSpent.toLocaleString()}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Welfare Contributed</span>
              <span className="text-2xl font-extrabold text-amber-700 font-brand-display">
                ₹{Math.round(totalSpent * 0.10).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Bookings Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm mb-8">
          
          {/* Tabs */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900 font-brand-display">
                My Service Requests & Invoices
              </h2>
            </div>

            <div className="flex items-center gap-1 text-xs">
              {(['all', 'active', 'completed'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg font-semibold capitalize cursor-pointer transition-all ${
                    activeTab === tab
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            {customerBookings.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                No bookings found under this filter tab.
              </div>
            ) : (
              customerBookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-[#faf8f5] rounded-2xl p-5 border border-slate-200 hover:border-emerald-600 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-4">
                    <SafeImage
                      src={b.workerAvatar}
                      alt={b.workerName}
                      fallbackType="avatar"
                      fallbackText={b.workerName}
                      onClick={() => {
                        const matched = workers.find((w) => w.id === b.workerId);
                        if (matched) setSelectedWorkerForProfile(matched);
                      }}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-600 shadow-xs shrink-0 cursor-pointer hover:scale-105 transition-transform"
                      title="Click to view artisan profile"
                    />
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-400">#{b.id}</span>
                        <h3 className="font-bold text-slate-900 text-base">{b.serviceTitle}</h3>
                        
                        {/* Status Badges */}
                        {b.status === 'confirmed' && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-900">
                            Confirmed
                          </span>
                        )}
                        {b.status === 'in_progress' && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 animate-pulse">
                            In Progress
                          </span>
                        )}
                        {b.status === 'emergency_dispatched' && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white animate-pulse">
                            🚨 Emergency Dispatched
                          </span>
                        )}
                        {b.status === 'completed' && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900">
                            ✓ Completed
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600">
                        Assigned Artisan:{' '}
                        <strong
                          onClick={() => {
                            const matched = workers.find((w) => w.id === b.workerId);
                            if (matched) setSelectedWorkerForProfile(matched);
                          }}
                          className="text-slate-900 cursor-pointer hover:text-emerald-800 transition-colors"
                          title="Click to view profile"
                        >
                          {b.workerName}
                        </strong>{' '}
                        ({b.cooperativeName})
                      </p>
                      <p className="text-[11px] text-slate-500 italic max-w-xl">
                        "{b.problemDescription}"
                      </p>

                      <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                          {b.scheduledDate} ({b.scheduledTimeSlot})
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {b.customerAddress}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Price */}
                  <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-200">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-medium block">Total Paid</span>
                      <span className="text-lg font-extrabold text-slate-900 font-brand-display">₹{b.totalPrice}</span>
                      <span className="text-[10px] text-emerald-700 block font-medium">
                        (₹{Math.round(b.totalPrice * 0.85)} direct to artisan)
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* View Invoice */}
                      <button
                        onClick={() => {
                          setActiveInvoiceBooking(b);
                          setIsInvoiceModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Invoice</span>
                      </button>

                      {/* Complete or Rate */}
                      {b.status === 'in_progress' && (
                        <button
                          onClick={() => updateBookingStatus(b.id, 'completed')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs cursor-pointer"
                        >
                          Mark Completed
                        </button>
                      )}

                      {b.status === 'completed' && !b.rating && (
                        <button
                          onClick={() => {
                            setActiveRatingBooking(b);
                            setIsRatingModalOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Star className="w-3.5 h-3.5" />
                          <span>Rate Artisan</span>
                        </button>
                      )}

                      {b.status === 'completed' && b.rating && (
                        <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-lg flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          Rated {b.rating}★
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
