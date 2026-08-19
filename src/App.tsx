import React from 'react';
import { Sparkles } from 'lucide-react';

export default function App(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="glass-panel p-8 rounded-2xl max-w-md w-full text-center space-y-4">
        <div className="inline-flex p-3 rounded-full bg-[#E5B56A]/10 text-[#E5B56A]">
          <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold font-serif text-white tracking-wide">
          Aura Booking
        </h1>
        <p className="text-slate-400 text-sm">
          Luxury Multi-Step Appointment & Wellness Reservation Web Application.
        </p>
      </div>
    </div>
  );
}
