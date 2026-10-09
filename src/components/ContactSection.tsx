import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { 
  MessageSquare, 
  Instagram, 
  MapPin, 
  Clock, 
  Navigation, 
  PhoneCall,
  ExternalLink
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(SITE_CONFIG.whatsappDefaultMessage)}`;

  return (
    <section id="iletisim" className="py-20 sm:py-28 bg-neutral-950 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-2">
            07. Lokasyon & İletişim
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase font-display mb-4">
            Garajımıza Bekliyoruz
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Sorularınız, bakım randevusu teyidi veya arıza danışma için bize doğrudan WhatsApp hattımızdan ulaşabilir veya atölyemize navigasyon ile gelebilirsiniz.
          </p>
        </div>

        {/* Contact Information & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Contact Cards */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* WhatsApp Primary Contact Card */}
            <div className="p-5 sm:p-6 rounded-lg bg-neutral-900/90 border border-emerald-900/40 hover:border-emerald-600/60 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded bg-emerald-950/50 border border-emerald-900/70 text-emerald-400 shrink-0">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                      Resmi WhatsApp & Destek Hattı
                    </div>
                    <div className="text-lg sm:text-xl font-extrabold text-white font-mono mt-0.5">
                      {SITE_CONFIG.whatsapp}
                    </div>
                    <div className="text-xs text-neutral-400 mt-1">
                      Anlık randevu teyidi, fotoğraf/video ile arıza danışma
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col gap-2 shrink-0">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 rounded transition-colors whitespace-nowrap shadow-md shadow-emerald-950/40"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Mesaj Yaz</span>
                  </a>
                  <a
                    href={`tel:+${SITE_CONFIG.whatsappRaw}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded transition-colors whitespace-nowrap border border-neutral-700/60"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Hemen Ara</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Address & Navigation Card */}
            <div className="p-6 rounded-lg bg-neutral-900/80 border border-neutral-800">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded bg-neutral-950 border border-neutral-800 text-rose-500 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-neutral-400 tracking-wider mb-1">
                    Atölye Adresi
                  </div>
                  <div className="text-base sm:text-lg font-bold text-white leading-snug">
                    {SITE_CONFIG.address.fullAddress}
                  </div>
                  <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                    {SITE_CONFIG.address.directionsNote}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <a
                  href={SITE_CONFIG.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-700 rounded transition-colors shadow-lg shadow-rose-950/40"
                >
                  <Navigation className="w-4 h-4 text-white" />
                  <span>Google Haritalar ile Yol Tarifi Al</span>
                </a>
              </div>
            </div>

            {/* Hours & Instagram Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-lg bg-neutral-900/80 border border-neutral-800">
                <div className="flex items-center gap-2 text-xs uppercase font-bold text-neutral-400 tracking-wider mb-3">
                  <Clock className="w-4 h-4 text-rose-500" />
                  <span>Çalışma Saatleri</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  {SITE_CONFIG.workingHours.map((wh, idx) => (
                    <div key={idx} className="flex justify-between text-neutral-300">
                      <span className="text-neutral-400">{wh.days}:</span>
                      <span className="font-semibold text-white">{wh.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-lg bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase font-bold text-neutral-400 tracking-wider mb-2">
                    <Instagram className="w-4 h-4 text-rose-500" />
                    <span>Instagram</span>
                  </div>
                  <div className="text-sm font-bold text-white">
                    {SITE_CONFIG.instagram}
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">
                    Hikayeler ve günlük servis akışı
                  </div>
                </div>
                <div className="mt-4 text-[11px] font-bold text-rose-500 uppercase tracking-wider flex items-center gap-1">
                  <span>Profili Görüntüle</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </a>
            </div>

          </div>

          {/* Interactive Google Map Preview / Styled Map Box */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex-1 min-h-[360px] rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950 relative flex flex-col justify-between p-6 shadow-2xl">
              
              {/* Map Canvas Background Graphic */}
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative z-10 flex items-center justify-between">
                <div className="px-3 py-1.5 rounded bg-neutral-900 border border-neutral-800 text-xs font-mono text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Sultan Selim Mah. Bayraktar Cad. 60A</span>
                </div>
                <span className="text-xs font-mono text-rose-500 font-bold">Kağıthane / İstanbul</span>
              </div>

              {/* Pin Centerpiece */}
              <div className="relative z-10 text-center my-auto py-8">
                <div className="w-14 h-14 rounded-full bg-rose-600/20 border border-rose-600 text-rose-500 flex items-center justify-center mx-auto mb-3 shadow-xl shadow-rose-950/60 animate-bounce">
                  <MapPin className="w-7 h-7" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white uppercase font-display">
                  MOTO SANAYİ SERVİS MERKEZİ
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-sm mx-auto mt-1 font-medium">
                  Sultan Selim Mahallesi Bayraktar Caddesi No: 60A Kağıthane / İstanbul
                </p>
                <div className="mt-3 inline-flex items-center gap-2 text-[11px] text-neutral-400 font-mono bg-neutral-900/90 px-3 py-1 rounded border border-neutral-800">
                  <span>Kağıthane · 4. Levent · Seyrantepe Bölgesi</span>
                </div>
              </div>

              {/* Direct Map CTA */}
              <div className="relative z-10 pt-4 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-neutral-400">
                  Konumu Google Haritalar'da açın ve yol tarifini başlatın
                </div>
                <a
                  href={SITE_CONFIG.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-700 rounded transition-colors whitespace-nowrap shadow-md shadow-rose-950"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Navigasyonu Başlat</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

