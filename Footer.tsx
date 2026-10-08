import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { ASSET_IMAGES } from '../assets/images';
import { MessageSquare, Shield } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenTracker: () => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdmin,
  onOpenTracker,
  onOpenBooking,
}) => {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <a href="#" className="inline-flex items-center gap-3 text-xl font-black text-white uppercase tracking-tight font-display group">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-neutral-800 bg-neutral-900 flex items-center justify-center shrink-0">
                <img 
                  src={ASSET_IMAGES.logo} 
                  alt="Moto Sanayi Logo" 
                  className="w-full h-full object-cover scale-110"
                />
              </div>
              <span>
                MOTO SANAYİ<span className="text-rose-600">.</span>
              </span>
            </a>
            <p className="text-neutral-400 text-xs leading-relaxed">
              İstanbul'un scooter ve motosiklet performans üssü. Fabrikasyon toleransların ötesinde milimetrik CVT ayarı ve güvenilir periyodik bakım.
            </p>
            <div className="text-xs text-neutral-400 font-mono">
              Sultan Selim Mahallesi · Kağıthane · İstanbul
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Hızlı Erişim
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollTo('hizmetler')} className="hover:text-rose-400 transition-colors cursor-pointer">
                  Periyodik Bakım & Hizmetler
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('performans')} className="hover:text-rose-400 transition-colors cursor-pointer">
                  CVT & Performans Varyatör
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('once-sonra')} className="hover:text-rose-400 transition-colors cursor-pointer">
                  Önce / Sonra İncelemeleri
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('uzmanlik')} className="hover:text-rose-400 transition-colors cursor-pointer">
                  Honda & Yamaha Uzmanlık
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('garaj')} className="hover:text-rose-400 transition-colors cursor-pointer">
                  Garaj Reels & Medya
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Customer Services */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Müşteri & Randevu
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenBooking} className="text-rose-400 hover:text-rose-300 font-semibold cursor-pointer">
                  Online Randevu Al
                </button>
              </li>
              <li>
                <button onClick={onOpenTracker} className="hover:text-white transition-colors cursor-pointer">
                  Randevu & Servis Durumu Sorgula
                </button>
              </li>
              <li>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Danışma Hattı ({SITE_CONFIG.whatsapp})</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Legal */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Atölye Bilgileri
            </div>
            <div className="text-xs space-y-1.5 text-neutral-400">
              <p>{SITE_CONFIG.address.fullAddress}</p>
              <p className="text-neutral-400 pt-1">Pzt - Cuma: 09:00 - 19:30</p>
              <p className="text-neutral-400">Cumartesi: 09:00 - 18:00</p>
            </div>
            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 text-xs transition-colors cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5 text-rose-500" />
                <span>Servis Yönetim Girişi</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar (Clean unboxed legal) */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © {currentYear} {SITE_CONFIG.businessName}. Tüm hakları saklıdır. Kağıthane / İstanbul.
          </div>
          <div className="flex items-center gap-4 text-neutral-400">
            <span>Doğru İşlem</span>
            <span aria-hidden="true">·</span>
            <span>Doğru Ayar</span>
            <span aria-hidden="true">·</span>
            <span>Doğru Usta</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
