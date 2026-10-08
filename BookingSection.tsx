import React, { useState, useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { storageService } from '../services/storageService';
import { Appointment } from '../types';
import { 
  Calendar, 
  Clock, 
  Upload, 
  CheckCircle2, 
  MessageSquare, 
  ArrowRight, 
  Sparkles, 
  AlertCircle,
  FileImage,
  X
} from 'lucide-react';

interface BookingSectionProps {
  initialServiceId?: string;
  initialBrand?: string;
  initialModel?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  initialServiceId,
  initialBrand,
  initialModel,
}) => {
  // Form fields
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [plate, setPlate] = useState('');
  
  // Brand & Model
  const [selectedBrand, setSelectedBrand] = useState('Honda');
  const [selectedModel, setSelectedModel] = useState('Forza 250');
  const [customModel, setCustomModel] = useState('');
  const [modelYear, setModelYear] = useState('2024');

  // Service
  const [selectedServiceId, setSelectedServiceId] = useState('performans-uygulamalari');

  // Date & Time
  const getTomorrowDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [preferredDate, setPreferredDate] = useState(getTomorrowDate());
  const [preferredTime, setPreferredTime] = useState('14:00');

  // Additional note & photo
  const [notes, setNotes] = useState('');
  const [photoDataUrl, setPhotoDataUrl] = useState<string | undefined>();
  const [photoName, setPhotoName] = useState<string | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Status & submitted appointment
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);

  // Available models based on selected brand
  const currentBrandConfig = SITE_CONFIG.motorcycleBrands.find((b) => b.brand.toLowerCase() === selectedBrand.toLowerCase()) || SITE_CONFIG.motorcycleBrands[0];
  const availableModels = currentBrandConfig.models;

  // Sync props when user clicks service or model from other sections
  useEffect(() => {
    if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
    }
  }, [initialServiceId]);

  useEffect(() => {
    if (initialBrand) {
      const matchBrand = SITE_CONFIG.motorcycleBrands.find(b => b.brand.toLowerCase().includes(initialBrand.toLowerCase()));
      if (matchBrand) {
        setSelectedBrand(matchBrand.brand);
        if (initialModel && matchBrand.models.includes(initialModel)) {
          setSelectedModel(initialModel);
        } else if (matchBrand.models.length > 0) {
          setSelectedModel(matchBrand.models[0]);
        }
      }
    }
  }, [initialBrand, initialModel]);

  // Handle Brand Change
  const handleBrandChange = (brandName: string) => {
    setSelectedBrand(brandName);
    const targetBrand = SITE_CONFIG.motorcycleBrands.find((b) => b.brand === brandName);
    if (targetBrand && targetBrand.models.length > 0) {
      setSelectedModel(targetBrand.models[0]);
    } else {
      setSelectedModel('');
    }
  };

  // Handle Photo selection
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      setErrorMessage('Fotoğraf boyutu 1MB\'dan küçük olmalıdır.');
      return;
    }

    setPhotoName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoDataUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPhotoDataUrl(undefined);
    setPhotoName(undefined);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Time slot options
  const timeSlots = ['09:30', '11:00', '12:30', '14:00', '15:30', '17:00', '18:30'];

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerName.trim()) {
      setErrorMessage('Lütfen adınızı ve soyadınızı giriniz.');
      return;
    }

    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Lütfen geçerli bir telefon numarası giriniz (örn: 0532 123 45 67).');
      return;
    }

    const finalModel = customModel.trim() ? customModel.trim() : selectedModel;
    if (!finalModel) {
      setErrorMessage('Lütfen motosiklet modelinizi seçiniz.');
      return;
    }

    const serviceObj = SITE_CONFIG.services.find((s) => s.id === selectedServiceId);
    const serviceTitle = serviceObj ? serviceObj.title : 'Genel Kontrol ve Bakım';

    setIsSubmitting(true);

    try {
      const newApt = await storageService.createAppointment({
        customerName: customerName.trim(),
        phone: phone.trim(),
        plate: plate.trim() || undefined,
        brand: selectedBrand,
        model: finalModel,
        year: modelYear,
        serviceId: selectedServiceId,
        serviceTitle,
        preferredDate,
        preferredTime,
        notes: notes.trim() || undefined,
        photoUrl: photoDataUrl,
        photoName,
      });

      setCreatedAppointment(newApt);
    } catch (err) {
      console.error(err);
      setErrorMessage('Randevu kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setCreatedAppointment(null);
    setNotes('');
    removePhoto();
  };

  // Years list (2026 to 2012 + classic)
  const years = [
    '2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011 ve Öncesi'
  ];

  return (
    <section id="randevu" className="py-20 sm:py-28 bg-neutral-950 border-b border-neutral-900 scroll-mt-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-500 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hızlı & Doğrudan Rezervasyon</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase font-display mb-3">
            Online Servis Randevusu
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
            Motosikletinizin bilgilerini seçin, uygun saati belirleyin. Ekibimiz randevunuzu teyit edip bakım liftinizi önceden hazırlasın.
          </p>
        </div>

        {/* If Submitted: Confirmation View */}
        {createdAppointment ? (
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 sm:p-10 shadow-2xl animate-in fade-in">
            <div className="text-center max-w-lg mx-auto">
              
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="text-xs font-mono font-bold text-rose-500 uppercase tracking-wider mb-1">
                Takip Kodu: #{createdAppointment.trackingCode}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white font-display uppercase tracking-tight mb-3">
                Randevu Talebiniz Alındı!
              </h3>

              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                Moto Sanayi ekibi sizinle kısa süre içerisinde iletişime geçecektir. Motosikletiniz için lift ve gerekli parçalar ayrılmıştır.
              </p>

              {/* Summary Card */}
              <div className="bg-neutral-950/80 rounded-lg p-5 border border-neutral-800/90 text-left mb-8 space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                  <span className="text-neutral-400">Müşteri:</span>
                  <span className="text-white font-semibold">{createdAppointment.customerName}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                  <span className="text-neutral-400">Motosiklet:</span>
                  <span className="text-white font-semibold">{createdAppointment.brand} {createdAppointment.model} ({createdAppointment.year})</span>
                </div>
                {createdAppointment.plate && (
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                    <span className="text-neutral-400">Plaka:</span>
                    <span className="text-white font-mono font-semibold">{createdAppointment.plate}</span>
                  </div>
                )}
                <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                  <span className="text-neutral-400">Talep Edilen İşlem:</span>
                  <span className="text-rose-400 font-semibold">{createdAppointment.serviceTitle}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Tarih & Saat:</span>
                  <span className="text-white font-bold">{createdAppointment.preferredDate} · {createdAppointment.preferredTime}</span>
                </div>
              </div>

              {/* Next Actions: WhatsApp Confirmation + Return */}
              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(
                    `Merhaba Moto Sanayi, #${createdAppointment.trackingCode} takip kodlu randevu talebim için yazıyorum. (${createdAppointment.brand} ${createdAppointment.model} - ${createdAppointment.preferredDate} ${createdAppointment.preferredTime})`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 rounded transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp’tan Hemen Teyit Et</span>
                </a>

                <button
                  onClick={resetForm}
                  className="w-full sm:w-auto px-5 py-3 text-xs sm:text-sm font-medium text-neutral-400 hover:text-white rounded border border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer"
                >
                  Yeni Randevu Oluştur
                </button>
              </div>

            </div>
          </div>
        ) : (
          /* The Interactive Booking Form */
          <form 
            onSubmit={handleSubmit}
            className="bg-neutral-900/60 border border-neutral-800/90 rounded-lg p-6 sm:p-10 shadow-2xl relative"
          >
            {errorMessage && (
              <div className="mb-6 p-4 rounded bg-red-950/40 border border-red-800 text-rose-300 text-xs sm:text-sm flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="space-y-8">
              
              {/* STEP 1: Motosiklet Bilgileri */}
              <div>
                <div className="flex items-center justify-between pb-2 mb-4 border-b border-neutral-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
                    Adım 1: Motosiklet Bilgileri
                  </span>
                  <span className="text-xs text-neutral-500">Hassas parça uyumu için</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Marka Seçimi */}
                  <div>
                    <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
                      Marka *
                    </label>
                    <select
                      value={selectedBrand}
                      onChange={(e) => handleBrandChange(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 text-white rounded px-3 py-2.5 text-sm focus:border-rose-500 focus:outline-none transition-colors cursor-pointer"
                    >
                      {SITE_CONFIG.motorcycleBrands.map((b) => (
                        <option key={b.brand} value={b.brand} className="bg-neutral-900 text-white">
                          {b.brand}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Model Seçimi */}
                  <div>
                    <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
                      Model *
                    </label>
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 text-white rounded px-3 py-2.5 text-sm focus:border-rose-500 focus:outline-none transition-colors cursor-pointer"
                    >
                      {availableModels.map((m) => (
                        <option key={m} value={m} className="bg-neutral-900 text-white">
                          {m}
                        </option>
                      ))}
                      <option value="custom" className="bg-neutral-900 text-rose-400">
                        + Listede Yok (Manuel Yaz)
                      </option>
                    </select>
                  </div>

                  {/* Model Yılı */}
                  <div>
                    <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
                      Model Yılı *
                    </label>
                    <select
                      value={modelYear}
                      onChange={(e) => setModelYear(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 text-white rounded px-3 py-2.5 text-sm focus:border-rose-500 focus:outline-none transition-colors cursor-pointer"
                    >
                      {years.map((y) => (
                        <option key={y} value={y} className="bg-neutral-900 text-white">
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Optional Custom Model Input if selected custom */}
                {selectedModel === 'custom' && (
                  <div className="mt-3">
                    <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">
                      Özel Model Adı ve Motor Hacmi (cc)
                    </label>
                    <input
                      type="text"
                      placeholder="Örn: Benelli BN 125, TVS Jupiter 125, Aprilia SR GT 200..."
                      value={customModel}
                      onChange={(e) => setCustomModel(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 text-white rounded px-3 py-2 text-sm focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* STEP 2: Yapılacak İşlem / Hizmet */}
              <div>
                <div className="flex items-center justify-between pb-2 mb-4 border-b border-neutral-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
                    Adım 2: Talep Edilen Hizmet
                  </span>
                  <span className="text-xs text-neutral-500">Birden fazla işlem notta belirtilebilir</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {SITE_CONFIG.services.map((svc) => {
                    const isSelected = selectedServiceId === svc.id;
                    return (
                      <button
                        type="button"
                        key={svc.id}
                        onClick={() => setSelectedServiceId(svc.id)}
                        className={`p-3 text-left rounded border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-rose-950/40 border-rose-600 text-white ring-1 ring-rose-600'
                            : 'bg-neutral-950/60 border-neutral-800/90 text-neutral-300 hover:border-neutral-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold uppercase tracking-wide">
                              {svc.title}
                            </span>
                            {isSelected && <span className="w-2 h-2 rounded-full bg-rose-500"></span>}
                          </div>
                          <p className="text-[11px] text-neutral-400 line-clamp-2">
                            {svc.subtitle}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 3: Tarih ve Saat Seçimi */}
              <div>
                <div className="flex items-center justify-between pb-2 mb-4 border-b border-neutral-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
                    Adım 3: Randevu Zamanı
                  </span>
                  <span className="text-xs text-neutral-500">Pzt - Cmt: 09:00 - 19:30</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
                  {/* Tarih */}
                  <div className="sm:col-span-5">
                    <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-rose-500" />
                      <span>Tercih Edilen Gün *</span>
                    </label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 text-white rounded px-3 py-2.5 text-sm focus:border-rose-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {/* Saat Slotları */}
                  <div className="sm:col-span-7">
                    <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-rose-500" />
                      <span>Tercih Edilen Saat *</span>
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((slot) => {
                        const isSlotSelected = preferredTime === slot;
                        return (
                          <button
                            type="button"
                            key={slot}
                            onClick={() => setPreferredTime(slot)}
                            className={`py-2 text-xs font-semibold rounded transition-colors cursor-pointer border ${
                              isSlotSelected
                                ? 'bg-rose-600 text-white border-rose-500 shadow-sm shadow-rose-950'
                                : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 4: Müşteri İletişim Bilgileri */}
              <div>
                <div className="flex items-center justify-between pb-2 mb-4 border-b border-neutral-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
                    Adım 4: İletişim & Şikayet Detayı
                  </span>
                  <span className="text-xs text-neutral-500">Teyit mesajı gönderilecektir</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      placeholder="Örn: Bedirhan Topal"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 text-white rounded px-3 py-2.5 text-sm focus:border-rose-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
                      Telefon Numarası *
                    </label>
                    <input
                      type="tel"
                      placeholder="0532 XXX XX XX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 text-white rounded px-3 py-2.5 text-sm focus:border-rose-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
                      Plaka (Opsiyonel)
                    </label>
                    <input
                      type="text"
                      placeholder="Örn: 34 MTO 34"
                      value={plate}
                      onChange={(e) => setPlate(e.target.value.toUpperCase())}
                      className="w-full bg-neutral-950 border border-neutral-800 text-white rounded px-3 py-2.5 text-sm focus:border-rose-500 focus:outline-none uppercase"
                    />
                  </div>
                </div>

                {/* Şikayet / Açıklama */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
                    Motosikletteki Sorun veya İstediğiniz Ek Detaylar (Opsiyonel)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Örn: 40 km/s hızda hafif silkme yapıyor, kayış kontrol edilsin, Malossi baga takılmasını istiyorum..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 text-white rounded p-3 text-sm focus:border-rose-500 focus:outline-none"
                  />
                </div>

                {/* Fotoğraf Yükleme Alanı */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
                    Sorunun Fotoğrafı veya Ruhsat/Parça Görseli (Opsiyonel)
                  </label>
                  
                  {photoDataUrl ? (
                    <div className="flex items-center gap-4 p-3 rounded bg-neutral-950 border border-neutral-800">
                      <img
                        src={photoDataUrl}
                        alt="Yüklenen görsel"
                        className="w-14 h-14 object-cover rounded border border-neutral-700"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-white truncate">
                          {photoName || 'Yüklenen fotoğraf'}
                        </div>
                        <div className="text-[11px] text-emerald-400">Görsel eklendi</div>
                      </div>
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="p-1.5 text-neutral-400 hover:text-rose-500 transition-colors"
                        title="Fotoğrafı Kaldır"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border border-dashed border-neutral-800 hover:border-neutral-700 rounded-lg p-4 text-center cursor-pointer bg-neutral-950/40 hover:bg-neutral-950/80 transition-colors"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      <div className="flex items-center justify-center gap-2 text-xs text-neutral-400">
                        <Upload className="w-4 h-4 text-rose-500" />
                        <span>Fotoğraf yüklemek için tıklayın (Maks. 8MB)</span>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-neutral-800">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 text-sm sm:text-base font-bold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-700 active:scale-[0.99] transition-all rounded shadow-xl shadow-rose-950/50 cursor-pointer disabled:opacity-50 whitespace-nowrap"
                >
                  <Calendar className="w-5 h-5" />
                  <span>{isSubmitting ? 'Talebiniz Alınıyor...' : 'Randevu Talebini Gönder'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-[11px] text-neutral-500 mt-2.5">
                  Ön ödeme veya kart bilgisi gerekmez. Randevunuz ustalarımız tarafından incelenip tarafınıza teyit edilecektir.
                </p>
              </div>

            </div>
          </form>
        )}

      </div>
    </section>
  );
};
