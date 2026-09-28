import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceDomain } from '../../types';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Upload,
  Building,
  User,
  Phone,
  FileCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Wheat
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const WorkerRegistrationModal: React.FC = () => {
  const {
    isWorkerRegisterModalOpen,
    setIsWorkerRegisterModalOpen,
    cooperatives,
    registerWorker,
    setActiveView
  } = useApp();

  const [step, setStep] = useState<number>(1);

  // Form state
  const [name, setName] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [cooperativeId, setCooperativeId] = useState<string>(cooperatives[0]?.id || 'coop-1');
  const [primarySkill, setPrimarySkill] = useState<string>('');
  const [domain, setDomain] = useState<ServiceDomain>('agricultural');
  const [yearsExperience, setYearsExperience] = useState<number>(4);
  const [district, setDistrict] = useState<string>('Anand');
  const [state, setState] = useState<string>('Gujarat');
  const [hourlyRate, setHourlyRate] = useState<number>(450);
  const [aadhaarNumber, setAadhaarNumber] = useState<string>('XXXX-XXXX-8821');
  const [eShramNumber, setEShramNumber] = useState<string>('UAN-99210-441');
  const [bankAccount, setBankAccount] = useState<string>('State Bank of India - 4409120912');
  const [bio, setBio] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isWorkerRegisterModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerWorker({
      name: name || 'Devendra Bhai Solanki',
      mobile: mobile || '+91 98254 99120',
      email: email || 'devendra.solanki@agro-tech.coop.in',
      cooperativeId,
      primarySkill: primarySkill || 'Agro-Solar Pump & Motor Rewinding Specialist',
      skills: [primarySkill || 'Pump Rewinding', 'Solar Inverter Maintenance', 'Motor Starter Diagnosis'],
      domain,
      yearsExperience,
      district,
      state,
      baseHourlyRate: hourlyRate,
      bio: bio || 'Dedicated rural mechanic and registered cooperative shareholder. Ready for village and farm service dispatches.'
    });

    try {
      confetti({
        particleCount: 60,
        spread: 45,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsWorkerRegisterModalOpen(false);
    setStep(1);
    setIsSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full my-8 overflow-hidden relative max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-emerald-900 text-white p-5 sm:p-6 shrink-0 relative">
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 text-emerald-300 hover:text-white p-1 rounded-full hover:bg-emerald-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1">
            <Building className="w-3.5 h-3.5" />
            <span>Labour Cooperative Worker Onboarding</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-brand-display">
            {isSubmitted
              ? 'Registration Submitted Successfully!'
              : step === 1
              ? 'Step 1: Personal & Cooperative Affiliation'
              : 'Step 2: Trade Skills, KYC & Bank Payout'}
          </h3>

          {!isSubmitted && (
            <div className="flex items-center gap-2 mt-3">
              <div className={`h-1.5 rounded-full flex-1 ${step >= 1 ? 'bg-amber-400' : 'bg-emerald-800'}`} />
              <div className={`h-1.5 rounded-full flex-1 ${step >= 2 ? 'bg-amber-400' : 'bg-emerald-800'}`} />
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 font-brand-display">
                Welcome to the Cooperative Network!
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Your profile has been forwarded to the <strong>Cooperative Society Admin</strong> for document verification (Aadhaar & e-Shram sync). You can switch to the <em>Cooperative Admin Persona</em> in demo mode to instantly approve this application.
              </p>

              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs text-emerald-950 max-w-md mx-auto text-left space-y-1">
                <div className="font-bold">Initial Welfare Status:</div>
                <div className="flex items-center justify-between">
                  <span>Ayushman Mediclaim (5 Lakh):</span>
                  <span className="font-bold text-amber-800">Pending Verification</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>PM-SYM Pension:</span>
                  <span className="font-bold text-amber-800">Initiated</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={handleClose}
                  className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs"
                >
                  Close & Explore Platform
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Devendra Bhai Solanki"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Mobile Number (Aadhaar Linked) *</label>
                      <input
                        type="tel"
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="e.g. +91 98254 99120"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Email (Optional)</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. devendra@agro-tech.coop.in"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Affiliated Labour Cooperative Society *</label>
                      <select
                        value={cooperativeId}
                        onChange={(e) => setCooperativeId(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-hidden"
                      >
                        {cooperatives.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.shortName} ({c.district})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">District *</label>
                      <input
                        type="text"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">State *</label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Continue to Trade Skills & KYC</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Primary Trade Skill *</label>
                      <input
                        type="text"
                        required
                        value={primarySkill}
                        onChange={(e) => setPrimarySkill(e.target.value)}
                        placeholder="e.g. Submersible Pump & Starter Rewinding"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Service Domain *</label>
                      <select
                        value={domain}
                        onChange={(e) => setDomain(e.target.value as ServiceDomain)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-hidden"
                      >
                        <option value="agricultural">🌾 Agriculture & Farm Tech</option>
                        <option value="household">🏠 Household & Trades</option>
                        <option value="technical">⚙️ Technical & Cooling</option>
                        <option value="caregiving">🩺 Elder & Patient Care</option>
                        <option value="community">🧹 Community Infrastructure</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Years of Field Experience</label>
                      <input
                        type="number"
                        min={1}
                        max={40}
                        value={yearsExperience}
                        onChange={(e) => setYearsExperience(Number(e.target.value))}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Cooperative Benchmark Hourly Rate (₹)</label>
                      <input
                        type="number"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(Number(e.target.value))}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* KYC Verification details */}
                  <div className="bg-[#faf8f5] p-3.5 rounded-xl border border-slate-200 space-y-3">
                    <span className="font-bold text-xs text-slate-900 block">
                      National Social Security & KYC Credentials
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">Aadhaar Number (Masked)</label>
                        <input
                          type="text"
                          value={aadhaarNumber}
                          onChange={(e) => setAadhaarNumber(e.target.value)}
                          className="w-full bg-white p-2 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">e-Shram UAN Identifier</label>
                        <input
                          type="text"
                          value={eShramNumber}
                          onChange={(e) => setEShramNumber(e.target.value)}
                          className="w-full bg-white p-2 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1">Direct Bank Account for 85% Fair Wage Payout</label>
                      <input
                        type="text"
                        value={bankAccount}
                        onChange={(e) => setBankAccount(e.target.value)}
                        className="w-full bg-white p-2 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Short Artisan Bio / Tools Owned</label>
                    <textarea
                      rows={2}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="e.g. Equipped with digital multimeter, pipe crimping tools, and 8 years experience in rural tube-wells..."
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs font-bold text-slate-600 hover:text-slate-900"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
                    >
                      Submit Registration for Verification
                    </button>
                  </div>
                </div>
              )}

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
