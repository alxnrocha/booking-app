import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { Service, ServiceCategory } from '../../types/booking.ts';
import { ServiceCard } from './ServiceCard.tsx';

interface ServiceSelectionStepProps {
  services: Service[];
  selectedService: Service | null;
  onSelectService: (service: Service) => void;
}

export const ServiceSelectionStep: React.FC<ServiceSelectionStepProps> = ({
  services,
  selectedService,
  onSelectService,
}) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [showAllServices, setShowAllServices] = useState(false);

  const categories: { id: ServiceCategory; label: string }[] = [
    { id: 'all', label: 'All Services' },
    { id: 'massage', label: 'Massage' },
    { id: 'hair', label: 'Hair Styling' },
    { id: 'facial', label: 'Facial Spa' },
    { id: 'wellness', label: 'Wellness Packages' },
  ];

  const filteredServices = services.filter(
    (service) => activeCategory === 'all' || service.category === activeCategory
  );

  const displayedServices = showAllServices
    ? filteredServices
    : filteredServices.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E5B56A]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Rituals</span>
        </div>
        <h2 className="text-2xl font-serif font-bold text-white mt-1">
          Select a Service
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Premium wellness & beauty experiences tailored for relaxation and revitalisation.
        </p>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => {
              setActiveCategory(cat.id);
              setShowAllServices(false);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#E5B56A] text-[#0B0E14] shadow-[0_0_12px_rgba(229,181,106,0.3)]'
                : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Services List */}
      <div className="space-y-3" role="radiogroup" aria-label="Services selection">
        {displayedServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            isSelected={selectedService?.id === service.id}
            onSelect={onSelectService}
          />
        ))}

        {filteredServices.length === 0 && (
          <div className="text-center py-8 rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-400 text-sm">
            No services found in this category.
          </div>
        )}
      </div>

      {/* Expand / Collapse Button */}
      {filteredServices.length > 3 && (
        <div className="text-center pt-1">
          <button
            type="button"
            onClick={() => setShowAllServices(!showAllServices)}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-300 hover:text-[#E5B56A] bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/60 hover:border-[#E5B56A]/40 transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>
              {showAllServices ? 'Show fewer services' : `View all services (${filteredServices.length})`}
            </span>
            {showAllServices ? (
              <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            ) : (
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};
