import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { ASSET_IMAGES } from '../assets/images';
import { ShieldAlert, CheckCircle, FileText, PackageOpen } from 'lucide-react';

export const TransparencySection: React.FC = () => {
  const icons = [
    <FileText key="1" className="w-6 h-6 text-rose-500" />,
    <ShieldAlert key="2" className="w-6 h-6 text-rose-500" />,
    <PackageOpen key="3" className="w-6 h-6 text-rose-500" />,
    <CheckCircle key="4" className="w-6 h-6 text-rose-500" />,
  ];

  return (
    <section className="py-20 sm:py-28 bg-neutral-950 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-2">
            05. Güven & Şeffaflık Standartları
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase font-display mb-4">
            Sanayi Alışkanlıklarını Değiştiriyoruz
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Motosikletinizi teslim ederken aklınızda soru işareti kalmasın. Moto Sanayi’de her cıvata tork değeriyle sıkılır, her işlem kayıt altındadır ve izniniz olmadan tek bir işlem dahi yapılmaz.
          </p>
        </div>

        {/* 2-Column with Workshop Bay Photo & 4 Core Commitments */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Commitments List */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SITE_CONFIG.transparencyPromises.map((p, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800 inline-block mb-4">
                    {icons[idx]}
                  </div>
                  <h3 className="text-base font-bold text-white uppercase mb-2 font-display">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
                
                <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center gap-1.5 text-xs text-neutral-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  <span>Moto Sanayi Prensibi</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Diagnostic Bay Photo */}
          <div className="lg:col-span-5">
            <div className="relative rounded-lg overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-950">
              <img
                src={ASSET_IMAGES.workshop}
                alt="Moto Sanayi Teşhis ve Servis Alanı"
                className="w-full h-[420px] object-cover object-center filter contrast-[1.08]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded bg-neutral-950/90 border border-neutral-800 backdrop-blur-md">
                <div className="text-xs text-rose-500 font-bold uppercase tracking-wider mb-0.5">
                  Laboratuvar Temizliğinde Garaj
                </div>
                <div className="text-xs text-neutral-300">
                  Zeminden alet arabalarına kadar organize, düzenli ve tozsuz çalışma ortamı.
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
