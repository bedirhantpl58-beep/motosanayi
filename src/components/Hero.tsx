import React from 'react';
import { ASSET_IMAGES } from '../assets/images';
import { SITE_CONFIG } from '../config/siteConfig';
import { Calendar, MessageSquare, Wrench, Shield, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(SITE_CONFIG.whatsappDefaultMessage)}`;

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-neutral-950 border-b border-neutral-900">
      {/* Background Photography with measured contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSET_IMAGES.hero}
          alt="Moto Sanayi Profesyonel Motosiklet Servis ve Performans Garajı"
          className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.1] scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Gradients to guarantee 4.5:1 text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/60 to-transparent" />
        {/* Subtle red motorsport ambient glow */}
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="max-w-3xl">
          
          {/* Location and Authority kicker (Clean unboxed text metadata) */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-rose-500 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            <span>İstanbul · Kağıthane Sultan Selim</span>
            <span className="text-neutral-600" aria-hidden="true">/</span>
            <span className="text-neutral-400">Performans & Scooter Uzmanı</span>
          </div>

          {/* Primary High-Impact Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.08] mb-6 font-display">
            Motosikletiniz İçin <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-rose-400">
              Doğru İşlem.
            </span>{' '}
            <span className="text-white">Doğru Ayar.</span> <br />
            <span className="text-rose-500 underline decoration-rose-600/50 decoration-wavy decoration-2">
              Doğru Usta.
            </span>
          </h1>

          {/* Value proposition prose */}
          <p className="text-base sm:text-xl text-neutral-300 font-normal leading-relaxed mb-8 max-w-2xl">
            {SITE_CONFIG.subSlogan} Sıradan sanayi tamircisi anlayışının ötesinde, milimetrik toleranslarla çalışan şeffaf servis merkezi.
          </p>

          {/* Primary & Secondary Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-bold tracking-wide text-white uppercase bg-rose-600 hover:bg-rose-700 active:scale-[0.98] transition-all rounded shadow-xl shadow-rose-950/60 cursor-pointer whitespace-nowrap group"
            >
              <Calendar className="w-5 h-5 text-rose-200 group-hover:scale-110 transition-transform" />
              <span>Randevu Al</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-neutral-200 hover:text-white bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 active:scale-[0.98] transition-all rounded cursor-pointer whitespace-nowrap"
            >
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              <span>WhatsApp’tan Ulaş</span>
            </a>
          </div>

          {/* Trust markers (Zero-pill discipline: unboxed clean typographic list with separators) */}
          <div className="pt-6 border-t border-neutral-800/80 flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-6 text-xs sm:text-sm text-neutral-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />
              <span className="text-neutral-200 font-medium">Profesyonel Servis</span>
            </div>
            <span className="text-neutral-700 hidden sm:inline" aria-hidden="true">·</span>
            
            <div className="flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-rose-500 shrink-0" />
              <span className="text-neutral-200 font-medium">Performans Uygulamaları</span>
            </div>
            <span className="text-neutral-700 hidden sm:inline" aria-hidden="true">·</span>
            
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-rose-500 shrink-0" />
              <span className="text-neutral-200 font-medium">Şeffaf ve Onaylı İşlem</span>
            </div>
            <span className="text-neutral-700 hidden sm:inline" aria-hidden="true">·</span>

            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              <span className="text-neutral-300 font-medium">Randevulu Çalışma</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
