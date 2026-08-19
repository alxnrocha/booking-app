import React, { useState } from 'react';
import { Bell, ShoppingBag, Menu, X, CalendarCheck } from 'lucide-react';

interface NavbarProps {
  onOpenMyBookings?: () => void;
  onNavigateHome?: () => void;
}

export const LotusIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2C9.5 7 4 9 2 14c3 1 7 0 10-3 3 3 7 4 10 3-2-5-7.5-7-10-12z" fill="rgba(229, 181, 106, 0.15)" />
    <path d="M12 11c-2 3-5 5-8 5 2 3 5 4 8 4s6-1 8-4c-3 0-6-2-8-5z" fill="rgba(229, 181, 106, 0.25)" />
    <circle cx="12" cy="11" r="1.5" fill="#E5B56A" />
  </svg>
);

export const Navbar: React.FC<NavbarProps> = ({
  onOpenMyBookings,
  onNavigateHome,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Services', href: '#services' },
    { name: 'Specialists', href: '#specialists' },
    { name: 'Membership', href: '#membership' },
    { name: 'Gift Cards', href: '#gift-cards' },
    { name: 'About', href: '#about' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0E14]/85 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div
            onClick={onNavigateHome}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="p-2 rounded-xl bg-[#E5B56A]/10 border border-[#E5B56A]/30 text-[#E5B56A] group-hover:scale-105 group-hover:border-[#E5B56A]/60 transition-all duration-300 shadow-[0_0_15px_rgba(229,181,106,0.15)]">
              <LotusIcon className="w-6 h-6 text-[#E5B56A]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold tracking-wider text-white group-hover:text-[#E5B56A] transition-colors">
                Aura Booking
              </span>
              <span className="text-[10px] tracking-widest text-[#E5B56A]/80 uppercase font-sans font-semibold">
                Luxury Wellness & Spa
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-[#E5B56A] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#E5B56A] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Icons & User Profile */}
          <div className="flex items-center gap-4">
            {/* Quick My Bookings Button */}
            <button
              type="button"
              onClick={onOpenMyBookings}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#E5B56A] bg-[#E5B56A]/10 border border-[#E5B56A]/30 hover:bg-[#E5B56A]/20 hover:border-[#E5B56A]/50 transition-all"
              aria-label="View My Bookings"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>My Bookings</span>
            </button>

            {/* Notification Bell */}
            <button
              type="button"
              className="relative p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800/60 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E5B56A] ring-2 ring-[#0B0E14]" />
            </button>

            {/* Shopping Bag */}
            <button
              type="button"
              className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800/60 transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>

            {/* User Profile Avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Client Profile"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-[#E5B56A]/40"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0B0E14]" />
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0F1420] border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:text-[#E5B56A] hover:bg-slate-800/50"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenMyBookings?.();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#E5B56A] bg-[#E5B56A]/10 border border-[#E5B56A]/30"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Lookup My Bookings</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
