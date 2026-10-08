import React from 'react';
import { ASSET_IMAGES } from '../assets/images';
import { Zap, Check, ArrowRight } from 'lucide-react';

interface PerformanceSectionProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const PerformanceSection: React.FC<PerformanceSectionProps> = ({ onOpenBooking }) => {
  const performancePillars = [
    {
      title: 'Varyatör Rampa Açısı & Kayış Tırmanışı',
      desc: 'Standart varyatörlerde kayışın en üst noktaya çıkışı kısıtlıdır. Malossi Multivar ve Polini Hi-Speed rampaları sayesinde kayış kasnakta daha yükseğe çıkarak son süratte devir düşürür, yakıtı korur.',
      metric: '+%18 Ara Hızlanma'
    },
    {
      title: 'Roller (Baga) Gramaj Balansı',
      desc: 'Sürücü ağırlığına ve kullanım tarzına göre yarımşar gram hassasiyetle roller optimizasyonu yapıyoruz. Şehir içi seri kalkış mı yoksa çevre yolu akıcılığı mı? Motosikletinizi size göre ayarlıyoruz.',
      metric: 'Milimetrik Gramaj'
    },
    {
      title: 'Kalkış Titreşimi & Silkme (Shudder) Çözümü',
      desc: 'PCX, Forza, NMAX ve XMAX modellerinde en sık yaşanan debriyaj çanı camlaşması ve balata tozu birikimini özel zımparalama, delikli balata kanalları ve sertleştirilmiş kontra yaylarla kalıcı olarak gideriyoruz.',
      metric: '%100 Pürüzsüz Kalkış'
    },
    {
      title: 'Yarış Sınıfı Parça Tedariği & OEM Toleransı',
      desc: 'Malossi, Polini, Dr.Pulley, Bando, Mitsuboshi ve orijinal yedek parçalar doğrudan resmi distribütör garantili temin edilir. Asla sahte veya menşei belirsiz parça kullanılmaz.',
      metric: 'Orijinal & Garantili'
    }
  ];

  return (
    <section id="performans" className="py-20 sm:py-28 bg-neutral-900/30 border-b border-neutral-900 relative overflow-hidden">
      {/* Background ambient red glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-rose-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-2">
            02. Performans & Mühendislik
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase font-display leading-[1.1] mb-4">
            Sadece Tamir Etmiyoruz. <br />
            <span className="text-rose-500">Motosikletinizi Geliştiriyoruz.</span>
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            Scooter aktarma sistemleri (CVT) fabrikadan ortalama bir kullanıcı ve emisyon standardına göre gelir. Biz doğru varyatör açıları ve baga gramajlarıyla motosikletinizin gizli potansiyelini güvenli sınırda açığa çıkarıyoruz.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Visual Macro with Engineering Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl">
              <img
                src={ASSET_IMAGES.cvt}
                alt="Moto Sanayi Scooter CVT Varyatör ve Debriyaj Ayarı"
                className="w-full h-[380px] sm:h-[440px] object-cover object-center filter contrast-[1.08] hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              
              {/* Overlay telemetry card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded bg-neutral-950/90 border border-neutral-800 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                  <span className="font-mono uppercase text-rose-500 font-bold">CVT Mühendisliği</span>
                  <span>Test Edilmiş & Kanıtlanmış</span>
                </div>
                <div className="text-sm font-bold text-white uppercase tracking-wide">
                  Dyno & Yol Testi ile Teyit Edilen Tork Artışı
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pillars of Performance */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {performancePillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-lg bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-rose-500">
                        {pillar.metric}
                      </span>
                      <Zap className="w-4 h-4 text-rose-500/70" />
                    </div>
                    <h4 className="text-base font-bold text-white uppercase mb-2 font-display">
                      {pillar.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Performance guarantee quote & Action */}
            <div className="p-6 rounded-lg bg-gradient-to-r from-neutral-950 to-neutral-900 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-semibold text-rose-500 uppercase tracking-wider">
                  Motosikletinize Özel Çözüm
                </div>
                <div className="text-sm sm:text-base font-bold text-white">
                  Motosikletinizin modeline en uygun varyatör konfigürasyonunu belirleyelim.
                </div>
              </div>

              <button
                onClick={() => onOpenBooking('performans-uygulamalari')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wide text-white bg-rose-600 hover:bg-rose-700 active:scale-[0.98] transition-all rounded cursor-pointer whitespace-nowrap shadow-lg shadow-rose-950/40"
              >
                <span>Performans Randevusu Al</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
