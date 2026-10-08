import React, { useState } from 'react';
import { ASSET_IMAGES } from '../assets/images';
import { BeforeAfterProject } from '../types';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface BeforeAfterSectionProps {
  onOpenBooking: () => void;
}

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({ onOpenBooking }) => {
  const projects: BeforeAfterProject[] = [
    {
      id: 'proj-1',
      title: 'Varyatör & Debriyaj Shudder (Titreme) Çözümü + Malossi Kurulumu',
      motorcycle: 'Honda Forza 250 (2023)',
      serviceCategory: 'CVT & Performans',
      actionDone: 'Aşınmış ve kömürleşmiş orijinal debriyaj çanı taşlandı, Malossi Multivar varyatör kiti, 13g performans rollerları ve Malossi beyaz kontra yayı takıldı. Kayış yuvası temizlendi.',
      resultAchieved: 'Kalkıştaki 2000-3000 d/d arası göğüs titremesi tamamen son buldu. 0-80 km/s hızlanması 1.8 saniye kısaldı.',
      beforeStats: 'Kalkışta şiddetli titreme & ağır gaz tepkisi',
      afterStats: 'Sıfır titreme, anlık gaz tepkisi & +%20 ara hızlanma',
      image: ASSET_IMAGES.beforeAfter,
    },
    {
      id: 'proj-2',
      title: 'Tıkanmış Gaz Kelebeği & Enjektör Ultrasonik Temizliği',
      motorcycle: 'Yamaha NMAX 155 (2022)',
      serviceCategory: 'Diyagnostik & Bakım',
      actionDone: 'Rölanti dalgalanması ve stop etme şikayetiyle gelen motorda gaz kelebeği ve rölanti valfi söküldü, ultrasonik banyoda temizlendi. ECU adaptasyonu sıfırlandı.',
      resultAchieved: 'Rölanti devri sabit 1500 d/d toleransına oturdu, sabah soğuk çalıştırmadaki stop etme problemi sıfırlandı.',
      beforeStats: 'Sabahları stop etme & 1000-1800 d/d rölanti dalgalanması',
      afterStats: 'Stabil 1500 d/d sabit rölanti & temiz gaz tepkisi',
      image: ASSET_IMAGES.workshop,
    },
    {
      id: 'proj-3',
      title: '24.000 km Ağır Bakım & Şanzıman Rulmanı Revizyonu',
      motorcycle: 'Honda PCX 125 (2021)',
      serviceCategory: 'Ağır Mekanik',
      actionDone: 'Arka tekerden gelen sürtünme uğultusu teşhis edildi. Şanzıman kapağı açılarak SKF C3 toleranslı yüksek devirli rulmanlar ve orijinal yağ keçeleriyle revize edildi.',
      resultAchieved: 'Tüm mekanik sürtünme sesi kesildi, motosiklet sessiz ve akıcı orijinal sürüş hissine geri kavuştu.',
      beforeStats: 'Arka tekerlekten gelen rahatsız edici metal uğultusu',
      afterStats: 'Sessiz ve pürüzsüz akıcı sürüş',
      image: ASSET_IMAGES.cvt,
    },
    {
      id: 'proj-4',
      title: 'Fren Kaliper Revizyonu & Brembo Sinterli Balata Montajı',
      motorcycle: 'Yamaha XMAX 300 (2023)',
      serviceCategory: 'Fren & Güvenlik',
      actionDone: 'Sıkışan çift pistonlu kaliper sökülüp ultrasonik temizlendi, piston keçeleri yenilendi. Brembo sinterli balatalar takılarak Motul RBF 600 fren hidroliği ile havası alındı.',
      resultAchieved: 'Fren manetindeki süngerimsi his kayboldu, fren mesafesi belirgin şekilde kısaldı ve frenleme kararlılığı sağlandı.',
      beforeStats: 'Sertleşmeyen sünger manet & uzayan fren mesafesi',
      afterStats: 'Keskin manet hissi & yüksek ısı dirençli duruş',
      image: ASSET_IMAGES.hero,
    }
  ];

  const [activeProjectId, setActiveProjectId] = useState<string>(projects[0].id);
  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  return (
    <section id="once-sonra" className="py-20 sm:py-28 bg-neutral-950 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-2">
            03. Atölye Çalışmaları & Kanıt
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase font-display mb-4">
            Önce <span className="text-rose-500 font-black">→</span> Sonra
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Garajımıza giren her motosiklet detaylı incelenir, sorun tespit edilir ve fabrikasyon toleranslarının üzerine çıkarılarak teslim edilir. İşte gerçek müşteri sonuçları:
          </p>
        </div>

        {/* Project Selector (Interactive tabs per Section 1.A) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {projects.map((proj) => {
            const isActive = proj.id === activeProjectId;
            return (
              <button
                key={proj.id}
                onClick={() => setActiveProjectId(proj.id)}
                className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded transition-all whitespace-nowrap cursor-pointer border ${
                  isActive
                    ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-950/40'
                    : 'bg-neutral-900/80 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
                }`}
              >
                <span>{proj.motorcycle}</span>
              </button>
            );
          })}
        </div>

        {/* Active Project Card */}
        <div className="bg-neutral-900/50 border border-neutral-800/90 rounded-lg p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual split frame */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-lg overflow-hidden border border-neutral-800 bg-black aspect-[4/3]">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover object-center filter contrast-[1.05]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Before/After badges */}
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-neutral-800 text-[11px] font-mono font-bold text-neutral-300 uppercase">
                  Önce / Sonra İnceleme
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-neutral-300 bg-neutral-950/90 backdrop-blur-md px-3 py-2 rounded border border-neutral-800">
                  <span className="text-rose-400 font-bold">{activeProject.motorcycle}</span>
                  <span className="text-neutral-400">{activeProject.serviceCategory}</span>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="text-xs font-mono text-rose-500 uppercase tracking-wider mb-1 font-bold">
                  İşlem Raporu
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display uppercase tracking-tight mb-3">
                  {activeProject.title}
                </h3>
              </div>

              {/* Action done description */}
              <div className="space-y-1.5">
                <div className="text-xs uppercase font-bold text-neutral-400 tracking-wider">
                  Uygulanan İşlem
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed bg-neutral-950/60 p-3.5 rounded border border-neutral-800/80">
                  {activeProject.actionDone}
                </p>
              </div>

              {/* Result Achieved */}
              <div className="space-y-1.5">
                <div className="text-xs uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Elde Edilen Sonuç</span>
                </div>
                <p className="text-sm text-neutral-200 leading-relaxed bg-neutral-950/60 p-3.5 rounded border border-neutral-800/80">
                  {activeProject.resultAchieved}
                </p>
              </div>

              {/* Before vs After Telemetry Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded bg-red-950/20 border border-red-900/30">
                  <div className="text-[11px] font-mono text-rose-400 uppercase font-bold mb-1">
                    Giriş Durumu (Önce)
                  </div>
                  <div className="text-xs text-neutral-300">
                    {activeProject.beforeStats}
                  </div>
                </div>

                <div className="p-3 rounded bg-emerald-950/20 border border-emerald-900/30">
                  <div className="text-[11px] font-mono text-emerald-400 uppercase font-bold mb-1">
                    Teslim Durumu (Sonra)
                  </div>
                  <div className="text-xs text-neutral-200 font-medium">
                    {activeProject.afterStats}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-700 transition-colors rounded cursor-pointer whitespace-nowrap shadow-md shadow-rose-950/40"
                >
                  <span>Motosikletim İçin Benzer İşlem Randevusu Al</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
