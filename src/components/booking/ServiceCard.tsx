import React from 'react';
import { Clock, Check } from 'lucide-react';
import { Service } from '../../types/booking.ts';

interface ServiceCardProps {
  service: Service;
  isSelected: boolean;
  onSelect: (service: Service) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(service)}
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(service);
        }
      }}
      className={`group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'bg-[#182030] border-2 border-[#E5B56A] shadow-[0_0_20px_rgba(229,181,106,0.2)]'
          : 'bg-[#121824]/80 hover:bg-[#151D2C] border border-slate-800 hover:border-slate-700/80'
      }`}
    >
      {/* Service Image */}
      <div className="relative w-full sm:w-28 h-24 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-slate-900 border border-slate-800">
        <img
          src={service.imageUrl}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {service.badge && (
          <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#E5B56A] text-[#0B0E14] shadow-sm">
            {service.badge}
          </span>
        )}
      </div>

      {/* Service Details */}
      <div className="flex-1 min-w-0 pr-8">
        <div className="flex items-center gap-2">
          <h3 className={`text-base font-semibold transition-colors ${isSelected ? 'text-[#E5B56A]' : 'text-white'}`}>
            {service.name}
          </h3>
        </div>
        <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
          {service.description}
        </p>

        {/* Metadata Badges */}
        <div className="flex items-center gap-4 mt-2.5">
          <div className="inline-flex items-center gap-1.5 text-xs text-slate-300 font-medium">
            <Clock className="w-3.5 h-3.5 text-[#E5B56A]" />
            <span>{service.durationMinutes} min</span>
          </div>
          <div className="text-sm font-bold text-white tracking-wide">
            €{service.price.toFixed(0)}
          </div>
        </div>
      </div>

      {/* Radio Checkmark Indicator */}
      <div className="absolute top-4 right-4 sm:top-auto sm:right-4">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
            isSelected
              ? 'bg-[#E5B56A] text-[#0B0E14] shadow-[0_0_10px_rgba(229,181,106,0.5)]'
              : 'border-2 border-slate-600 group-hover:border-slate-500'
          }`}
        >
          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </div>
      </div>
    </div>
  );
};
