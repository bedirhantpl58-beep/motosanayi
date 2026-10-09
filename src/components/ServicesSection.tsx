import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { 
  Wrench, 
  Gauge, 
  Cpu, 
  Disc, 
  Cog, 
  Truck, 
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  // Map icons
  const getIcon = (id: string) => {
    switch (id) {
      case 'periyodik-bakim':
        return <Wrench className="w-6 h-6 text-rose-500" />;
      case 'cvt-varyator':
        return <Gauge className="w-6 h-6 text-rose-500" />;
      case 'performans-uygulamalari':
        return <Sparkles className="w-6 h-6 text-rose-500" />;
      case 'ariza-tespiti-diyagnostik':
        return <Cpu className="w-6 h-6 text-rose-500" />;
      case 'fren-suspansiyon':
        return <Disc className="w-6 h-6 text-rose-500" />;
      case 'motor-mekanik-revizyon':
        return <Cog className="w-6 h-6 text-rose-500" />;
      case 'yol-yardim-yerinde-servis':
        return <Truck className="w-6 h-6 text-rose-500" />;
      default:
        return <Wrench className="w-6 h-6 text-rose-500" />;
    }
  };

  return (
    <section id="hizmetler" className="py-20 sm:py-28 bg-neutral-950 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-2">
            01. Hizmet Kataloğu
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase font-display mb-4">
            Motosikletinizin İhtiyacı Olan Her Şey Tek Noktada
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Şehir içi scooterlardan yüksek hacimli motosikletlere kadar; fabrika tork değerleri, orijinal parça güvencesi ve yarış garajı hassasiyetiyle çalışıyoruz.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SITE_CONFIG.services.map((svc) => (
            <div
              key={svc.id}
              className="group relative flex flex-col justify-between bg-neutral-900/60 hover:bg-neutral-900/95 border border-neutral-800/90 hover:border-rose-900/50 rounded-lg p-6 sm:p-7 transition-all duration-300 hover:shadow-2xl hover:shadow-black"
            >
              <div>
                {/* Category & Icon Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded bg-neutral-950 border border-neutral-800 group-hover:border-rose-600/40 transition-colors">
                    {getIcon(svc.id)}
                  </div>
                  
                  {/* Clean unboxed metadata separator */}
                  <span className="text-xs font-mono text-neutral-400 tracking-wider">
                    {svc.category}
                  </span>
                </div>

                {/* Title and subtitle */}
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-1 group-hover:text-rose-400 transition-colors font-display uppercase">
                  {svc.title}
                </h3>
                <div className="text-xs font-medium text-rose-500/90 mb-3">
                  {svc.subtitle}
                </div>

                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {svc.description}
                </p>
              </div>

              <div>
                {/* Estimated duration and recommendation (Unboxed text) */}
                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400 mb-5">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{svc.estimatedDuration}</span>
                  </div>
                  <span className="text-neutral-400">{svc.recommendedKm}</span>
                </div>

                {/* Primary Booking Trigger for this Service */}
                <button
                  onClick={() => onSelectService(svc.id)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-neutral-800 hover:bg-rose-600 active:scale-[0.98] transition-all rounded cursor-pointer whitespace-nowrap group/btn"
                >
                  <span>Bu Hizmet İçin Randevu Al</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
