import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { ASSET_IMAGES } from '../assets/images';
import { GaragePost } from '../types';
import { Instagram, Play, Eye, ExternalLink } from 'lucide-react';

export const InstagramGarage: React.FC = () => {
  const posts: GaragePost[] = [
    {
      id: 'ig-1',
      title: 'Forza 250 Malossi Multivar Montajı',
      model: 'Honda Forza 250',
      tag: 'Varyatör Ayarı',
      views: '42.8K',
      caption: 'Kalkıştaki titremeyi kesip ara hızlanmayı uçurduk. 13 gram baga ve beyaz yay testi.',
      image: ASSET_IMAGES.cvt,
    },
    {
      id: 'ig-2',
      title: 'NMAX 155 Titreşim & Debriyaj Çanı Taşlama',
      model: 'Yamaha NMAX 155',
      tag: 'Debriyaj Revizyonu',
      views: '28.4K',
      caption: 'Kömürleşmiş balataları temizleyip kanalları açtık. Yağ gibi kalkış garantili.',
      image: ASSET_IMAGES.beforeAfter,
    },
    {
      id: 'ig-3',
      title: 'XMAX 300 Ağır Bakım & Fren Revizyonu',
      model: 'Yamaha XMAX 300',
      tag: 'Ağır Bakım',
      views: '19.2K',
      caption: 'Brembo sinterli balatalar, taze Dot 5.1 hidrolik ve komple aktarma tork kontrolü.',
      image: ASSET_IMAGES.workshop,
    },
    {
      id: 'ig-4',
      title: 'PCX 125 Şanzıman Rulmanı & Yağ Kaçağı',
      model: 'Honda PCX 125',
      tag: 'Mekanik Onarım',
      views: '35.1K',
      caption: 'Arka tekerdeki sürtünme sesini orijinal SKF rulmanlarla sıfırladık.',
      image: ASSET_IMAGES.hero,
    }
  ];

  return (
    <section id="garaj" className="py-20 sm:py-28 bg-neutral-900/30 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-2">
              06. Canlı Atölye Günlüğü
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase font-display mb-3">
              Garajda Neler Oluyor?
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              Her gün atölyemizde gerçekleşen varyatör revizyonları, dyno hızlanma testleri ve mekanik çözümleri Instagram hesabımızdan şeffafça paylaşıyoruz.
            </p>
          </div>

          <a
            href={SITE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 hover:opacity-95 transition-opacity rounded shadow-lg shadow-rose-950/40 whitespace-nowrap self-start md:self-auto cursor-pointer"
          >
            <Instagram className="w-4 h-4" />
            <span>Instagram’da Bizi Takip Et</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>

        {/* Reels & Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {posts.map((post) => (
            <a
              key={post.id}
              href={SITE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-lg overflow-hidden bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 flex flex-col aspect-[4/5] cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-90 group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              
              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-black/30" />

              {/* Top Reel Badge */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono font-semibold uppercase tracking-wider">
                  {post.tag}
                </span>
                <div className="flex items-center gap-1 text-[11px] font-mono text-neutral-300">
                  <Eye className="w-3.5 h-3.5 text-rose-400" />
                  <span>{post.views}</span>
                </div>
              </div>

              {/* Center Play Icon Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-xl">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-neutral-950/90 border-t border-neutral-800/80 backdrop-blur-sm">
                <div className="text-[11px] font-bold text-rose-400 uppercase tracking-wide mb-0.5">
                  {post.model}
                </div>
                <div className="text-xs font-semibold text-white line-clamp-2 leading-snug">
                  {post.caption}
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
