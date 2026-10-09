import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface ModelsExpertiseProps {
  onSelectModelGroup: (brand: string, model: string) => void;
}

export const ModelsExpertise: React.FC<ModelsExpertiseProps> = ({ onSelectModelGroup }) => {
  const modelCategories = [
    {
      brand: 'HONDA',
      badge: 'Şehir & Maxi Scooter Uzmanı',
      primaryModels: ['PCX 125 / 160', 'Forza 250 / 350 / 750', 'Dio 110', 'Activa 125', 'ADV 350'],
      keyServices: 'Varyatör baga gramaj ayarı, debriyaj titreme giderme, orijinal kayış ve filtre değişimi.',
      accent: 'border-neutral-800 hover:border-red-600/60'
    },
    {
      brand: 'YAMAHA',
      badge: 'Performans & Sport Scooter',
      primaryModels: ['NMAX 125 / 155', 'XMAX 250 / 300 / 400', 'MT-25 / MT-07', 'YZF-R25 / R7', 'TMAX 560'],
      keyServices: 'Malossi & Polini varyatör optimizasyonu, sübap boşluğu ayarı, ABS hidrolik yenileme.',
      accent: 'border-neutral-800 hover:border-blue-600/60'
    },
    {
      brand: '125cc - 250cc SCOOTERLAR',
      badge: 'Tüm Şehir Scooterları',
      primaryModels: ['Vespa GTS / Sprint', 'SYM Joymax / Jet X', 'KYMCO Downtown / Agility', 'Piaggio Beverly'],
      keyServices: 'Periyodik 3.000 / 6.000 km bakımı, sentetik yağ değişimi, fren balatası ve aktarma temizliği.',
      accent: 'border-neutral-800 hover:border-neutral-700'
    },
    {
      brand: 'ÇİN MENŞELİ 125cc GRUBU',
      badge: 'Güvenilir Servis & Doğru Parça',
      primaryModels: ['RKS Wildcat / Freccia', 'Kuba Brilliant / Space', 'Voge SR4 / SR1', 'CF Moto 250 SR/NK'],
      keyServices: 'Kronik elektrik ve rölanti sorunları giderme, kaliteli varyatör kayışı dönüşümü, güvenli fren revizyonu.',
      accent: 'border-neutral-800 hover:border-rose-600/50'
    }
  ];

  return (
    <section id="uzmanlik" className="py-20 sm:py-28 bg-neutral-900/40 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-2">
            04. Model Portföyü
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase font-display mb-4">
            Uzmanlık Alanlarımız
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Her motosikletin şasi geometrisi, aktarma oranı ve mekanik toleransları farklıdır. İstanbul sokaklarında en çok yol yapan modellerin kronik sorunlarını ve performans potansiyelini ezbere biliyoruz.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modelCategories.map((cat, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-8 rounded-lg bg-neutral-950/80 border ${cat.accent} transition-all duration-300 flex flex-col justify-between group`}
            >
              <div>
                {/* Brand Title & Editorial Subtitle */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight group-hover:text-rose-400 transition-colors uppercase">
                    {cat.brand}
                  </h3>
                  <span className="text-xs font-mono text-neutral-400">
                    {cat.badge}
                  </span>
                </div>

                {/* Popular Models List */}
                <div className="mb-5">
                  <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                    Sık Bakım Yaptığımız Modeller:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.primaryModels.map((model, mIdx) => (
                      <button
                        key={mIdx}
                        onClick={() => onSelectModelGroup(cat.brand.split(' ')[0], model)}
                        className="px-2.5 py-1 text-xs rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800/80 hover:border-neutral-700 transition-colors cursor-pointer text-left inline-flex items-center gap-1"
                        title={`${model} için randevu al`}
                      >
                        <span>{model}</span>
                        <ChevronRight className="w-3 h-3 text-rose-500 opacity-60" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Services Focus */}
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                  <strong className="text-neutral-200">Öne Çıkan İşlemler: </strong>
                  {cat.keyServices}
                </p>
              </div>

              {/* Action trigger */}
              <div className="pt-4 border-t border-neutral-900 flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  Fabrika toleranslarında torklama
                </span>
                <button
                  onClick={() => onSelectModelGroup(cat.brand.split(' ')[0], cat.primaryModels[0])}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500 hover:text-rose-400 uppercase tracking-wider cursor-pointer group-hover:translate-x-1 transition-transform"
                >
                  <span>Model İçin Randevu Al</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Note on other models */}
        <div className="mt-8 p-4 rounded-lg bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-neutral-400 gap-3">
          <span>
            Listede göremediğiniz diğer spor, gezi ve özel hacimli modelleriniz için de tam teşekküllü atölyemizde hizmet vermekteyiz.
          </span>
          <span className="text-rose-500 font-semibold whitespace-nowrap">
            Tüm Markalara Açık Servis
          </span>
        </div>

      </div>
    </section>
  );
};
