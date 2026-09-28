import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Star, HeartHandshake, CheckCircle2, MessageSquare } from 'lucide-react';

export const RatingModal: React.FC = () => {
  const { isRatingModalOpen, setIsRatingModalOpen, activeRatingBooking, rateBooking } = useApp();

  const [rating, setRating] = useState<number>(5);
  const [qualityRating, setQualityRating] = useState<number>(5);
  const [punctualityRating, setPunctualityRating] = useState<number>(5);
  const [politenessRating, setPolitenessRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');

  if (!isRatingModalOpen || !activeRatingBooking) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    rateBooking(activeRatingBooking.id, rating, comment);
    setIsRatingModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full my-8 overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-emerald-900 text-white p-6 relative">
          <button
            onClick={() => setIsRatingModalOpen(false)}
            className="absolute top-5 right-5 text-emerald-300 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-1">
            Service Feedback & Quality Assurance
          </span>
          <h3 className="text-xl font-bold font-brand-display">
            Rate Your Cooperative Service
          </h3>
          <p className="text-xs text-emerald-100/90 mt-1">
            Artisan: {activeRatingBooking.workerName} • Booking #{activeRatingBooking.id}
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Overall Star Rating */}
          <div className="text-center py-2">
            <span className="text-xs font-bold text-slate-700 block mb-2 uppercase">
              Overall Experience
            </span>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 cursor-pointer transition-transform hover:scale-125"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className="text-xs font-extrabold text-amber-700 mt-1">
              {rating === 5 && 'Outstanding & Professional (5/5)'}
              {rating === 4 && 'Very Good Service (4/5)'}
              {rating === 3 && 'Average Service (3/5)'}
              {rating < 3 && 'Needs Improvement'}
            </div>
          </div>

          {/* Dimension Criteria */}
          <div className="space-y-3 bg-[#faf8f5] p-3.5 rounded-2xl border border-slate-200 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-700 font-medium">Technical Skill & Workmanship:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setQualityRating(s)}
                    className="p-0.5"
                  >
                    <Star className={`w-4 h-4 ${s <= qualityRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-700 font-medium">Timeliness & Arrival Punctuality:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setPunctualityRating(s)}
                    className="p-0.5"
                  >
                    <Star className={`w-4 h-4 ${s <= punctualityRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-700 font-medium">Politeness & Cooperative Conduct:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setPolitenessRating(s)}
                    className="p-0.5"
                  >
                    <Star className={`w-4 h-4 ${s <= politenessRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Written feedback */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Share Written Feedback (Helps Member's Annual Welfare Bonus)
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="e.g. Ramesh solved the tube-well motor humming issue in 30 minutes, tested the solar inverter, and explained how to prevent capacitor burnout..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setIsRatingModalOpen(false)}
              className="text-xs font-bold text-slate-500 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
            >
              Submit Official Review
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
