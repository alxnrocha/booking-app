import React, { useState, useEffect } from 'react';
import { Star, Calendar, Sparkles, UserCheck } from 'lucide-react';
import { Specialist } from '../../types/booking.ts';

interface SpecialistCardProps {
  specialist: Specialist;
  allSpecialists?: Specialist[];
  selectedDate: string;
  selectedTime: string;
  onSelectSpecialist: (specialist: Specialist) => void;
}

export const SpecialistCard: React.FC<SpecialistCardProps> = ({
  specialist,
  allSpecialists = [],
  selectedDate,
  selectedTime,
  onSelectSpecialist,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  return (
    <div className="bg-[#121824]/90 p-5 rounded-2xl border border-slate-800 shadow-lg flex flex-col items-center text-center space-y-4">
      {/* Title */}
      <div className="w-full flex items-center justify-between border-b border-slate-800 pb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Selected Specialist
        </span>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E5B56A]/10 text-[#E5B56A] font-semibold border border-[#E5B56A]/30">
          Verified Pro
        </span>
      </div>

      {/* Avatar with Gold Glowing Ring */}
      <div className="relative mt-2">
        <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-[#E5B56A] via-[#D99D48] to-[#FCF9F2] shadow-[0_0_15px_rgba(229,181,106,0.3)]">
          <img
            src={specialist.avatarUrl}
            alt={specialist.name}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>

      {/* Specialist Details */}
      <div className="space-y-1">
        <h3 className="text-base font-bold text-white font-serif">
          {specialist.name}
        </h3>
        <p className="text-xs text-slate-300 font-medium">
          {specialist.title}
        </p>

        {/* Rating */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 text-xs text-white border border-slate-700 mt-2">
          <Star className="w-3.5 h-3.5 fill-[#E5B56A] text-[#E5B56A]" />
          <span className="font-bold">{specialist.rating.toFixed(1)}</span>
          <span className="text-slate-400 text-[11px]">({specialist.reviewsCount} reviews)</span>
        </div>
      </div>

      {/* Next Availability Info Box */}
      <div className="w-full bg-[#0F1420] p-3 rounded-xl border border-slate-800 text-left space-y-1">
        <div className="text-[10px] font-semibold uppercase text-slate-400 flex items-center gap-1">
          <Calendar className="w-3 h-3 text-[#E5B56A]" />
          <span>Appointment Slot</span>
        </div>
        <div className="text-xs font-bold text-white">
          {selectedDate}
        </div>
        <div className="text-[11px] text-[#E5B56A] font-medium">
          {selectedTime}
        </div>
      </div>

      {/* Action Button: View Profile / Change Specialist */}
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="w-full py-2 px-4 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-[#E5B56A]/50 transition-all cursor-pointer"
      >
        View Profile / Change Specialist
      </button>

      {/* Specialists Selection Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="specialists-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        >
          <div className="bg-[#121824] border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E5B56A]" />
                <h4 id="specialists-modal-title" className="text-lg font-serif font-bold text-white">
                  Our Master Specialists
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {allSpecialists.map((spec) => (
                <div
                  key={spec.id}
                  onClick={() => {
                    onSelectSpecialist(spec);
                    setIsModalOpen(false);
                  }}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 cursor-pointer transition-all ${
                    specialist.id === spec.id
                      ? 'bg-[#182030] border-[#E5B56A] shadow-[0_0_10px_rgba(229,181,106,0.2)]'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3 text-left">
                    <img
                      src={spec.avatarUrl}
                      alt={spec.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-[#E5B56A]/40"
                    />
                    <div>
                      <h5 className="text-sm font-bold text-white">{spec.name}</h5>
                      <p className="text-xs text-slate-400">{spec.title}</p>
                      <div className="flex items-center gap-1 text-[11px] text-[#E5B56A] mt-0.5">
                        <Star className="w-3 h-3 fill-[#E5B56A]" />
                        <span>{spec.rating.toFixed(1)}</span>
                        <span className="text-slate-500">({spec.reviewsCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                  {specialist.id === spec.id && (
                    <div className="p-1.5 rounded-full bg-[#E5B56A] text-[#0B0E14]">
                      <UserCheck className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
