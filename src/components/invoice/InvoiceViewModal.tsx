import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Wheat,
  QrCode,
  Download,
  Calendar,
  Building,
  User,
  Coins
} from 'lucide-react';

export const InvoiceViewModal: React.FC = () => {
  const { isInvoiceModalOpen, setIsInvoiceModalOpen, activeInvoiceBooking } = useApp();

  if (!isInvoiceModalOpen || !activeInvoiceBooking) return null;

  const invoice = activeInvoiceBooking.invoice;
  const booking = activeInvoiceBooking;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full my-8 overflow-hidden relative print:border-none print:shadow-none">
        
        {/* Top Actions */}
        <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex items-center justify-between print:hidden">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Official Cooperative Tax Invoice / Receipt
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={() => setIsInvoiceModalOpen(false)}
              className="text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Sheet */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-800 bg-white">
          
          {/* Header & Logo */}
          <div className="flex items-start justify-between border-b border-slate-200 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-900 text-white flex items-center justify-center font-bold">
                <Wheat className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-brand-display text-slate-900 leading-tight">
                  Sahkaar Seva
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  National Labour Cooperative Gig Services Platform
                </p>
                <p className="text-[10px] text-slate-400">
                  Affiliated with State Labour Cooperative Federations
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-100 text-emerald-900 uppercase">
                Payment Completed
              </span>
              <div className="text-xs font-mono font-bold text-slate-900 mt-1">
                {invoice?.invoiceNumber || 'INV-2026-001'}
              </div>
              <div className="text-[11px] text-slate-500">Date: {invoice?.date || booking.scheduledDate}</div>
            </div>
          </div>

          {/* Service & Booking Meta */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-[#faf8f5] p-4 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Billed To (Customer)</span>
              <span className="font-bold text-slate-900 block">{booking.customerName}</span>
              <span className="text-slate-500 block text-[11px]">{booking.customerPhone}</span>
              <span className="text-slate-500 block text-[11px]">{booking.customerAddress}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Service Provider (Artisan)</span>
              <span className="font-bold text-slate-900 block">{booking.workerName}</span>
              <span className="text-emerald-800 font-semibold block text-[11px]">{booking.cooperativeName}</span>
              <span className="text-slate-500 block text-[11px]">Booking ID: #{booking.id}</span>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Service Description</th>
                  <th className="py-2.5 px-3">Unit</th>
                  <th className="py-2.5 px-3 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900">{booking.serviceTitle}</div>
                    <div className="text-[10px] text-slate-500">{booking.problemDescription}</div>
                  </td>
                  <td className="py-3 px-3 text-slate-600">Standard Visit</td>
                  <td className="py-3 px-3 text-right font-semibold">₹{booking.totalPrice}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Fair Breakdown (Cooperative Transparency) */}
          <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 text-xs space-y-1.5">
            <div className="font-bold text-emerald-950 uppercase text-[10px] mb-1">
              Cooperative Social Accounting Breakdown
            </div>
            <div className="flex justify-between text-slate-700">
              <span>Direct Artisan Remuneration (85% Fair Wage):</span>
              <span className="font-bold text-emerald-900">
                ₹{invoice?.workerPayout || Math.round(booking.totalPrice * 0.85)}
              </span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>Labour Society Member Welfare Pool (10%):</span>
              <span className="font-bold text-amber-900">
                ₹{invoice?.cooperativeWelfareFund || Math.round(booking.totalPrice * 0.10)}
              </span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>Platform Maintenance & Safety Telemetry (5%):</span>
              <span className="font-semibold text-slate-700">
                ₹{invoice?.platformMaintenanceFee || Math.round(booking.totalPrice * 0.05)}
              </span>
            </div>
            <div className="flex justify-between text-slate-600 pt-1 border-t border-emerald-200 text-[11px]">
              <span>Goods & Services Tax (GST):</span>
              <span className="text-emerald-700 font-semibold">Exempt (Cooperative Sector)</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-emerald-300 font-extrabold text-slate-900 text-sm">
              <span>Total Paid:</span>
              <span className="text-emerald-900 font-brand-display text-base">₹{booking.totalPrice}</span>
            </div>
          </div>

          {/* Transaction Metadata & QR Code Simulation */}
          <div className="flex items-center justify-between pt-2 text-[11px] text-slate-500">
            <div className="space-y-0.5">
              <div>
                <strong>Payment Mode:</strong> {invoice?.paymentMethod || 'UPI (Online)'}
              </div>
              <div>
                <strong>Txn Ref:</strong> {invoice?.transactionId || 'TXN-99120481'}
              </div>
              <div className="flex items-center gap-1 text-emerald-700 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Digitally Authenticated by Labour Federation Node</span>
              </div>
            </div>

            <div className="text-center">
              <QrCode className="w-12 h-12 text-slate-800 mx-auto" />
              <span className="text-[9px] text-slate-400 block mt-0.5">Scan to Verify</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
