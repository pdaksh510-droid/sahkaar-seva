import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { SafeImage } from '../common/SafeImage';
import { Worker, ServiceItem, Booking } from '../../types';
import {
  X,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  Star,
  Coins,
  QrCode,
  CreditCard,
  Building,
  Smartphone,
  ArrowRight,
  ArrowLeft,
  Award,
  Sparkles,
  Printer,
  ChevronRight
} from 'lucide-react';

export const BookingModal: React.FC = () => {
  const {
    isBookingModalOpen,
    setIsBookingModalOpen,
    selectedServiceForBooking,
    setSelectedServiceForBooking,
    services,
    workers,
    selectedDistrict,
    createBooking,
    setActiveInvoiceBooking,
    setIsInvoiceModalOpen,
    setActiveView
  } = useApp();

  const [step, setStep] = useState<number>(1);

  // Form states
  const [chosenService, setChosenService] = useState<ServiceItem | null>(null);
  const [problemDescription, setProblemDescription] = useState<string>('');
  const [urgency, setUrgency] = useState<'normal' | 'emergency'>('normal');
  const [customerName, setCustomerName] = useState<string>('Suresh Patel (Kisan Agro Farms)');
  const [customerPhone, setCustomerPhone] = useState<string>('+91 98250 11245');
  const [customerAddress, setCustomerAddress] = useState<string>('Boriavi Road, Farm Plot #14, Near APMC Sub-Yard');
  const [bookingDistrict, setBookingDistrict] = useState<string>(selectedDistrict !== 'all' ? selectedDistrict : 'Anand');
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [scheduledDate, setScheduledDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [scheduledTimeSlot, setScheduledTimeSlot] = useState<string>('10:00 AM - 12:00 PM');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking' | 'Wallet'>('UPI');
  const [upiId, setUpiId] = useState<string>('kisan.patel@okhdfcbank');
  const [completedBooking, setCompletedBooking] = useState<Booking | null>(null);

  // Sync chosenService when prop updates
  useEffect(() => {
    if (selectedServiceForBooking) {
      setChosenService(selectedServiceForBooking);
      setStep(2); // Jump directly to problem details if service is already selected!
    } else {
      setChosenService(services[0]);
    }
  }, [selectedServiceForBooking, services]);

  if (!isBookingModalOpen) return null;

  // Matching workers
  const matchingWorkers = workers.filter((w) => {
    const domainMatch = !chosenService || w.domain === chosenService.domain;
    const districtMatch = bookingDistrict === 'all' || w.district.toLowerCase() === bookingDistrict.toLowerCase();
    return domainMatch || districtMatch;
  });

  const basePrice = chosenService?.basePrice || 500;
  const workerPayout = Math.round(basePrice * 0.85); // 85%
  const coopWelfareFund = Math.round(basePrice * 0.10); // 10%
  const platformFee = basePrice - workerPayout - coopWelfareFund; // 5%

  const handleWorkerSelect = (worker: Worker) => {
    setSelectedWorker(worker);
    setStep(7); // Move to Date, Time & Address confirmation
  };

  const handleConfirmAndPay = () => {
    const worker = selectedWorker || matchingWorkers[0] || workers[0];
    const service = chosenService || services[0];

    const invoiceNumber = `INV-SS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const transactionId = `TXN-${paymentMethod}-${Date.now().toString().slice(-8)}`;

    const newBooking = createBooking({
      serviceId: service.id,
      serviceTitle: service.title,
      customerId: 'cust-' + Date.now(),
      customerName,
      customerPhone,
      customerAddress,
      district: bookingDistrict,
      workerId: worker.id,
      workerName: worker.name,
      workerAvatar: worker.avatar,
      workerPhone: worker.mobile,
      cooperativeId: worker.cooperativeId,
      cooperativeName: worker.cooperativeName,
      scheduledDate,
      scheduledTimeSlot,
      problemDescription: problemDescription || 'Cooperative service requested with standard diagnosis.',
      status: urgency === 'emergency' ? 'emergency_dispatched' : 'confirmed',
      urgency,
      totalPrice: basePrice,
      invoice: {
        invoiceNumber,
        bookingId: 'TEMP', // updated in context
        date: new Date().toISOString().split('T')[0],
        customerName,
        workerName: worker.name,
        cooperativeName: worker.cooperativeName,
        serviceTitle: service.title,
        baseServiceFee: basePrice,
        workerPayout,
        cooperativeWelfareFund: coopWelfareFund,
        platformMaintenanceFee: platformFee,
        gstAmount: 0,
        totalAmountPaid: basePrice,
        paymentMethod,
        transactionId,
        paymentStatus: 'paid'
      },
      etaMinutes: urgency === 'emergency' ? 25 : 60
    });

    setCompletedBooking(newBooking);
    setStep(9); // Move to confirmation
  };

  const handleClose = () => {
    setIsBookingModalOpen(false);
    setStep(1);
    setCompletedBooking(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-3xl w-full my-8 overflow-hidden relative flex flex-col max-h-[92vh]">
        
        {/* Modal Header & Progress Indicator */}
        <div className="bg-emerald-900 text-white p-5 sm:p-6 shrink-0 relative">
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 text-emerald-300 hover:text-white p-1 rounded-full hover:bg-emerald-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1">
            <span>Cooperative Service Booking</span>
            <span>•</span>
            <span>Step {step > 8 ? 9 : step} of 9</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-brand-display">
            {step === 1 && 'Step 1: Choose Required Service'}
            {step === 2 && 'Step 2: Describe Issue & Requirements'}
            {step === 3 && 'Step 3: Confirm Service Location'}
            {step === 4 && 'Step 4 & 5: Match Nearby Cooperative Workers'}
            {step === 7 && 'Step 7: Schedule Date, Time & Address'}
            {step === 8 && 'Step 8: Fair Wage Breakdown & Demo Payment'}
            {step === 9 && 'Step 9: Booking Confirmed & Digital Receipt'}
          </h3>

          {/* Stepper Dots */}
          <div className="flex items-center gap-1.5 mt-3">
            {[1, 2, 3, 4, 7, 8, 9].map((sIndex, idx) => (
              <div
                key={sIndex}
                className={`h-1.5 rounded-full transition-all ${
                  step >= sIndex ? 'bg-amber-400 w-8' : 'bg-emerald-800 w-3'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Choose the cooperative trade or agricultural service you require:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
                {services.map((srv) => (
                  <div
                    key={srv.id}
                    onClick={() => {
                      setChosenService(srv);
                      setStep(2);
                    }}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      chosenService?.id === srv.id
                        ? 'border-emerald-600 bg-emerald-50/80 ring-1 ring-emerald-600'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 text-xs truncate">{srv.title}</span>
                      <span className="text-[11px] font-extrabold text-emerald-800">
                        ₹{srv.basePrice}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {srv.shortDescription}
                    </p>
                    <div className="mt-2 text-[10px] text-emerald-700 font-medium">
                      Cooperative benchmark rate • {srv.pricingUnit}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Problem Details */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-800 block">Selected Service</span>
                  <span className="font-bold text-slate-900 text-sm">{chosenService?.title}</span>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold underline"
                >
                  Change
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Describe the Issue / Work to be Performed *
                </label>
                <textarea
                  rows={4}
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  placeholder="e.g. 7.5 HP Submersible pump tripping starter switch; need rewinding and check solar inverter connections..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Urgency Level
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUrgency('normal')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      urgency === 'normal'
                        ? 'border-emerald-600 bg-emerald-50 ring-1 ring-emerald-600'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-xs text-slate-900">Standard Scheduled Visit</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Choose preferred date and time slot</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUrgency('emergency')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      urgency === 'emergency'
                        ? 'border-rose-600 bg-rose-50 ring-1 ring-rose-600'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-xs text-rose-700 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
                      Emergency Immediate Dispatch
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Nearest available worker arrives within 30-45 mins</div>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <span>Continue to Location</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Location */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  District / Operational Zone *
                </label>
                <select
                  value={bookingDistrict}
                  onChange={(e) => setBookingDistrict(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-hidden"
                >
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

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Full Street Address, Farm Survey Number or Landmark *
                </label>
                <input
                  type="text"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Contact Person Name
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Mobile Number (For Dispatch SMS)
                  </label>
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => setStep(2)}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <span>Find Nearby Verified Workers</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 & 5: Match Nearby Cooperative Workers */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Verified Cooperative Workers in {bookingDistrict}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Showing certified members with active welfare coverage:
                  </p>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                  {matchingWorkers.length} Available
                </span>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {matchingWorkers.map((worker) => (
                  <div
                    key={worker.id}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-600 bg-white hover:bg-emerald-50/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5">
                      <SafeImage
                        src={worker.avatar}
                        alt={worker.name}
                        fallbackType="avatar"
                        fallbackText={worker.name}
                        onClick={() => handleWorkerSelect(worker)}
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-600 shrink-0 cursor-pointer hover:scale-105 transition-transform"
                        title="Select this worker"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h5
                            onClick={() => handleWorkerSelect(worker)}
                            className="font-bold text-slate-900 text-sm cursor-pointer hover:text-emerald-800"
                          >
                            {worker.name}
                          </h5>
                          <span className="flex items-center gap-0.5 text-xs font-bold text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            {worker.rating}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-emerald-800">{worker.primarySkill}</p>
                        <p className="text-[11px] text-slate-500">{worker.cooperativeName}</p>
                        
                        <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[10px] text-slate-600">
                          <span className="bg-emerald-100 text-emerald-900 font-bold px-1.5 py-0.2 rounded flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-700" />
                            Aadhaar & Police Verified
                          </span>
                          <span className="bg-amber-100 text-amber-900 font-semibold px-1.5 py-0.2 rounded">
                            {worker.completedJobsCount} Jobs Completed
                          </span>
                          <span className="bg-purple-100 text-purple-900 font-semibold px-1.5 py-0.2 rounded">
                            ₹5L Mediclaim
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 uppercase block font-medium">Standard Rate</span>
                        <span className="text-sm font-extrabold text-slate-900">₹{worker.baseHourlyRate}/hr</span>
                      </div>
                      <button
                        onClick={() => handleWorkerSelect(worker)}
                        className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                      >
                        Choose Worker
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <button
                  onClick={() => setStep(3)}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  Back
                </button>
              </div>
            </div>
          )}

          {/* STEP 7: Date, Time & Address confirmation */}
          {step === 7 && (
            <div className="space-y-4">
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 flex items-center gap-3">
                <SafeImage
                  src={selectedWorker?.avatar}
                  alt={selectedWorker?.name}
                  fallbackType="avatar"
                  fallbackText={selectedWorker?.name}
                  className="w-12 h-12 rounded-xl object-cover border-2 border-emerald-600 shadow-xs"
                />
                <div className="flex-1">
                  <div className="text-[10px] uppercase font-bold text-emerald-800">Selected Worker</div>
                  <h4 className="font-bold text-slate-900 text-sm">{selectedWorker?.name}</h4>
                  <p className="text-xs text-slate-600">{selectedWorker?.cooperativeName}</p>
                </div>
                <button
                  onClick={() => setStep(4)}
                  className="text-xs text-emerald-800 font-semibold underline"
                >
                  Change Worker
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Select Preferred Date *
                  </label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Select Time Window *
                  </label>
                  <select
                    value={scheduledTimeSlot}
                    onChange={(e) => setScheduledTimeSlot(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden"
                  >
                    <option value="08:00 AM - 10:00 AM">Early Morning (08:00 AM - 10:00 AM)</option>
                    <option value="10:00 AM - 12:00 PM">Morning (10:00 AM - 12:00 PM)</option>
                    <option value="01:00 PM - 03:00 PM">Afternoon (01:00 PM - 03:00 PM)</option>
                    <option value="03:00 PM - 05:00 PM">Late Afternoon (03:00 PM - 05:00 PM)</option>
                    <option value="05:00 PM - 07:00 PM">Evening (05:00 PM - 07:00 PM)</option>
                  </select>
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1">
                <span className="font-bold text-slate-800 block">Dispatch Summary:</span>
                <p className="text-slate-600">
                  <strong>Service:</strong> {chosenService?.title}
                </p>
                <p className="text-slate-600">
                  <strong>Destination:</strong> {customerAddress}, {bookingDistrict}
                </p>
                <p className="text-slate-600">
                  <strong>Customer Contact:</strong> {customerName} ({customerPhone})
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => setStep(4)}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(8)}
                  className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 8: Transparent Fair Price & Payment */}
          {step === 8 && (
            <div className="space-y-4">
              <div className="bg-[#faf8f5] p-4 rounded-2xl border border-amber-300/80">
                <div className="flex items-center justify-between pb-3 border-b border-amber-200 mb-3">
                  <span className="text-xs font-bold text-amber-900 uppercase">
                    Cooperative Transparent Fee Breakdown
                  </span>
                  <span className="text-xs font-extrabold text-slate-900">Total: ₹{basePrice}</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      <strong>Direct Worker Remuneration (85%):</strong>
                    </span>
                    <span className="font-bold text-emerald-800">₹{workerPayout}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                      <strong>Cooperative Member Welfare Pool (10%):</strong>
                    </span>
                    <span className="font-bold text-amber-800">₹{coopWelfareFund}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      <strong>Platform, Telemetry & Insurance (5%):</strong>
                    </span>
                    <span className="font-bold text-blue-800">₹{platformFee}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-amber-200/80 font-semibold text-slate-600">
                    <span>GST on Cooperative Primary Labor:</span>
                    <span className="text-emerald-700">₹0 (Govt. Exempted)</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Choose Demo Payment Method
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'UPI', label: 'UPI (GPay/PhonePe)', icon: Smartphone },
                    { id: 'Card', label: 'Debit / Credit Card', icon: CreditCard },
                    { id: 'NetBanking', label: 'Net Banking', icon: Building },
                    { id: 'Wallet', label: 'Coop Wallet', icon: QrCode }
                  ].map((m) => {
                    const Icon = m.icon;
                    const isSelected = paymentMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id as any)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-600'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <Icon className="w-5 h-5 mx-auto mb-1 text-emerald-700" />
                        <span className="text-[11px] block">{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {paymentMethod === 'UPI' && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-3">
                  <QrCode className="w-8 h-8 text-emerald-800 shrink-0" />
                  <div className="flex-1">
                    <label className="block text-[10px] text-slate-500 font-bold uppercase">
                      Enter UPI ID / VPA
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full bg-white px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-mono"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => setStep(7)}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirmAndPay}
                  className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Coins className="w-4 h-4 text-amber-300" />
                  <span>Simulate Pay & Confirm ₹{basePrice}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 9: Booking Confirmation & Digital Invoice Receipt */}
          {step === 9 && completedBooking && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Payment Successful • Cooperative Dispatch Activated
                </span>
                <h4 className="text-2xl font-extrabold text-slate-900 font-brand-display mt-1">
                  Booking #{completedBooking.id} Confirmed!
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  {completedBooking.workerName} from {completedBooking.cooperativeName} has been assigned to your service request.
                </p>
              </div>

              {/* Digital Invoice Preview Card */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left max-w-lg mx-auto text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <div>
                    <span className="font-bold text-slate-900">Official Digital Invoice</span>
                    <span className="text-[10px] text-slate-500 block">
                      Invoice #{completedBooking.invoice?.invoiceNumber}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                    Paid via {completedBooking.invoice?.paymentMethod}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 block">Customer</span>
                    <span className="font-semibold text-slate-800">{completedBooking.customerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Assigned Artisan</span>
                    <span className="font-semibold text-slate-800">{completedBooking.workerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Scheduled Window</span>
                    <span className="font-semibold text-slate-800">
                      {completedBooking.scheduledDate} ({completedBooking.scheduledTimeSlot})
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Direct Worker Share</span>
                    <span className="font-bold text-emerald-800">₹{completedBooking.invoice?.workerPayout} (85%)</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-slate-900">Total Amount Charged:</span>
                  <span className="text-base font-extrabold text-slate-900">
                    ₹{completedBooking.totalPrice}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    handleClose();
                    setActiveInvoiceBooking(completedBooking);
                    setIsInvoiceModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Official Invoice</span>
                </button>

                <button
                  onClick={() => {
                    handleClose();
                    setActiveView('dashboard');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Track in My Bookings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
