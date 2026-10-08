import React, { useState } from 'react';
import { storageService } from '../services/storageService';
import { Appointment, AppointmentStatus } from '../types';
import { SITE_CONFIG } from '../config/siteConfig';
import { X, Search, CheckCircle2, Clock, Wrench, AlertCircle, MessageSquare } from 'lucide-react';

interface TrackAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrackAppointmentModal: React.FC<TrackAppointmentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<Appointment | null>(null);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      const found = await storageService.findAppointment(query.trim());
      setResult(found || null);
    } catch {
      setResult(null);
    }
    setSearched(true);
  };

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'yeni':
        return { label: 'Yeni Talep Alındı', color: 'text-amber-400 bg-amber-950/40 border-amber-800' };
      case 'onaylandi':
        return { label: 'Randevu Onaylandı', color: 'text-sky-400 bg-sky-950/40 border-sky-800' };
      case 'serviste':
        return { label: 'Serviste (Liftte / İşlem Sürüyor)', color: 'text-rose-400 bg-rose-950/40 border-rose-800' };
      case 'tamamlandi':
        return { label: 'İşlem Tamamlandı (Teslime Hazır)', color: 'text-emerald-400 bg-emerald-950/40 border-emerald-800' };
      case 'iptal':
        return { label: 'İptal Edildi', color: 'text-neutral-400 bg-neutral-900 border-neutral-700' };
      default:
        return { label: status, color: 'text-neutral-400 bg-neutral-900 border-neutral-700' };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl bg-neutral-950 border border-neutral-800 rounded-lg p-6 sm:p-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-rose-500 mb-1">
            Canlı Takip Sistemi
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white uppercase font-display">
            Randevu & Servis Durumu Sorgula
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Randevu takip kodunuzu (örn: <span className="text-rose-400 font-mono">MS-7821</span>) veya telefon numaranızı girin.
          </p>
        </div>

        {/* Search input */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-neutral-400" />
            <input
              type="text"
              placeholder="Takip Kodu (#MS-xxxx) veya Telefon..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 text-white rounded pl-10 pr-4 py-2.5 text-sm focus:border-rose-500 focus:outline-none"
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-700 rounded transition-colors cursor-pointer whitespace-nowrap"
          >
            Sorgula
          </button>
        </form>

        {/* Results view */}
        {searched && (
          <div>
            {result ? (
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-lg p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <div>
                    <span className="text-xs font-mono text-neutral-400">Takip Kodu: </span>
                    <span className="text-sm font-mono font-bold text-white">#{result.trackingCode}</span>
                  </div>
                  <div className={`px-2.5 py-1 rounded text-xs font-semibold border ${getStatusBadge(result.status).color}`}>
                    {getStatusBadge(result.status).label}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-neutral-400 block mb-0.5">Motosiklet:</span>
                    <span className="text-white font-semibold">{result.brand} {result.model} ({result.year})</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block mb-0.5">Randevu Saati:</span>
                    <span className="text-white font-semibold">{result.preferredDate} · {result.preferredTime}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block mb-0.5">İşlem:</span>
                    <span className="text-rose-400 font-semibold">{result.serviceTitle}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block mb-0.5">Müşteri:</span>
                    <span className="text-white font-semibold">{result.customerName}</span>
                  </div>
                </div>

                {/* Technician Admin Notes */}
                {result.adminNotes && (
                  <div className="p-3 rounded bg-neutral-950 border border-neutral-800 text-xs">
                    <span className="text-rose-400 font-bold block mb-1">Usta / Servis Notu:</span>
                    <p className="text-neutral-300">{result.adminNotes}</p>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between border-t border-neutral-800 text-xs">
                  <span className="text-neutral-500">Sorunuz mu var?</span>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(
                      `Merhaba, #${result.trackingCode} kodlu ${result.brand} ${result.model} randevum hakkında bilgi almak istiyorum.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Servis Danışmanı</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 px-4 rounded bg-neutral-900/50 border border-neutral-800 text-neutral-400 text-xs sm:text-sm">
                <AlertCircle className="w-8 h-8 text-neutral-500 mx-auto mb-2" />
                <p className="text-white font-medium mb-1">Kayıt Bulunamadı</p>
                <p>Girdiğiniz takip kodu veya telefonla eşleşen randevu bulunamadı. Lütfen numarayı kontrol edip tekrar deneyin.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
