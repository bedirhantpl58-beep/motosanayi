import React, { useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { ASSET_IMAGES } from '../assets/images';
import { Menu, X, Calendar, Search, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenTracker: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenTracker,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Brand Wordmark (with Logo Emblem) */}
        <a 
          href="#" 
          className="group flex items-center gap-3 text-xl sm:text-2xl font-extrabold tracking-wider text-white transition-opacity hover:opacity-95"
        >
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden border border-neutral-800 bg-neutral-900 flex items-center justify-center shadow-md shadow-rose-950/40 group-hover:border-rose-600/70 transition-colors shrink-0">
            <img 
              src={ASSET_IMAGES.logo} 
              alt="Moto Sanayi Logo" 
              className="w-full h-full object-cover scale-110"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-display tracking-tight text-white uppercase font-black">
              MOTO SANAYİ
            </span>
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
          </div>
        </a>

        {/* Zone 2: Navigation Links (Text with subtle hover state) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
          <button 
            onClick={() => scrollTo('hizmetler')} 
            className="hover:text-rose-500 transition-colors cursor-pointer"
          >
            Hizmetler
          </button>
          <button 
            onClick={() => scrollTo('performans')} 
            className="hover:text-rose-500 transition-colors cursor-pointer"
          >
            Performans & CVT
          </button>
          <button 
            onClick={() => scrollTo('once-sonra')} 
            className="hover:text-rose-500 transition-colors cursor-pointer"
          >
            Önce / Sonra
          </button>
          <button 
            onClick={() => scrollTo('uzmanlik')} 
            className="hover:text-rose-500 transition-colors cursor-pointer"
          >
            Uzmanlık
          </button>
          <button 
            onClick={() => scrollTo('garaj')} 
            className="hover:text-rose-500 transition-colors cursor-pointer"
          >
            Garaj
          </button>
          <button 
            onClick={() => scrollTo('iletisim')} 
            className="hover:text-rose-500 transition-colors cursor-pointer"
          >
            İletişim
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Tracking lookup + Primary Booking CTA) */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onOpenTracker}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer rounded border border-neutral-800 hover:border-neutral-700 bg-neutral-900/60"
            title="Randevu sorgula"
          >
            <Search className="w-3.5 h-3.5 text-rose-500" />
            <span className="whitespace-nowrap">Randevu Sorgula</span>
          </button>

          <button
            onClick={() => onOpenBooking()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wide text-white uppercase bg-rose-600 hover:bg-rose-700 active:scale-[0.98] transition-all rounded shadow-lg shadow-rose-950/40 cursor-pointer whitespace-nowrap"
          >
            <Calendar className="w-4 h-4" />
            <span>Randevu Al</span>
          </button>

          <button
            onClick={onOpenAdmin}
            className="p-2 text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer text-xs"
            title="Servis Yönetim Paneli"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => onOpenBooking()}
            className="px-3 py-1.5 text-xs font-bold text-white uppercase bg-rose-600 rounded whitespace-nowrap cursor-pointer"
          >
            Randevu Al
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white transition-colors cursor-pointer rounded border border-neutral-800 bg-neutral-900/80"
            aria-label="Menü"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-neutral-950 px-4 pt-3 pb-5 space-y-3 animate-in fade-in">
          <div className="grid grid-cols-2 gap-2 text-sm font-medium text-neutral-200">
            <button
              onClick={() => scrollTo('hizmetler')}
              className="text-left px-3 py-2.5 rounded bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800/80"
            >
              Hizmetlerimiz
            </button>
            <button
              onClick={() => scrollTo('performans')}
              className="text-left px-3 py-2.5 rounded bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800/80"
            >
              Performans & CVT
            </button>
            <button
              onClick={() => scrollTo('once-sonra')}
              className="text-left px-3 py-2.5 rounded bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800/80"
            >
              Önce / Sonra
            </button>
            <button
              onClick={() => scrollTo('uzmanlik')}
              className="text-left px-3 py-2.5 rounded bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800/80"
            >
              Model Uzmanlığı
            </button>
            <button
              onClick={() => scrollTo('garaj')}
              className="text-left px-3 py-2.5 rounded bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800/80"
            >
              Garaj Günlüğü
            </button>
            <button
              onClick={() => scrollTo('iletisim')}
              className="text-left px-3 py-2.5 rounded bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800/80"
            >
              Konum & İletişim
            </button>
          </div>

          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTracker();
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold text-neutral-300 rounded border border-neutral-800 bg-neutral-900"
            >
              <Search className="w-3.5 h-3.5 text-rose-500" />
              <span>Randevumu Sorgula</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="inline-flex items-center justify-center px-3 py-2.5 text-xs font-semibold text-neutral-400 rounded border border-neutral-800 bg-neutral-900"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="ml-1">Servis Paneli</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
