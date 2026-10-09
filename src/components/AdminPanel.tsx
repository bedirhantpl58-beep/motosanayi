import React, { useEffect, useMemo, useState } from 'react';
import { storageService } from '../services/storageService';
import { Appointment, CustomerRecord, AppointmentStatus } from '../types';
import {
  X, Search, CalendarDays, Users, Trash2, Edit3, MessageSquare,
  ShieldCheck, LogOut, Loader2, RefreshCw, LockKeyhole
} from 'lucide-react';

interface AdminPanelProps { isOpen: boolean; onClose: () => void; }

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'appointments' | 'customers'>('appointments');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [tempNoteText, setTempNoteText] = useState('');
  const [editingDateTimeId, setEditingDateTimeId] = useState<string | null>(null);
  const [tempDate, setTempDate] = useState('');
  const [tempTime, setTempTime] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const reloadData = async () => {
    setErrorMessage('');
    try {
      const [a, c] = await Promise.all([storageService.getAppointments(), storageService.getCustomers()]);
      setAppointments(a); setCustomers(c);
    } catch (e: any) { setErrorMessage(e.message || 'Veriler alınamadı.'); }
  };

  useEffect(() => {
    if (!isOpen) return;
    setChecking(true);
    storageService.getSession().then((s) => {
      setAuthenticated(s.authenticated);
      if (s.username) setUsername(s.username);
    }).catch(() => setAuthenticated(false)).finally(() => setChecking(false));
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && authenticated) reloadData();
  }, [isOpen, authenticated]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault(); setLoginError('');
    try { await storageService.login(username.trim(), password); setPassword(''); setAuthenticated(true); }
    catch (err: any) { setLoginError(err.message || 'Giriş başarısız.'); }
  };

  const logout = async () => { await storageService.logout().catch(() => {}); setAuthenticated(false); };

  const filteredAppointments = useMemo(() => appointments.filter((apt) => {
    const q = searchQuery.toLowerCase();
    const statusOk = filterStatus === 'all' || apt.status === filterStatus;
    const searchOk = !q || [apt.customerName, apt.phone, apt.model, apt.trackingCode, apt.plate || ''].some(v => v.toLowerCase().includes(q));
    return statusOk && searchOk;
  }), [appointments, filterStatus, searchQuery]);

  const filteredCustomers = useMemo(() => customers.filter((c) => {
    const q = searchQuery.toLowerCase();
    return !q || [c.fullName, c.phone, c.plate, c.motorcycle].some(v => v.toLowerCase().includes(q));
  }), [customers, searchQuery]);

  const run = async (id: string, fn: () => Promise<unknown>) => {
    setBusyId(id); setErrorMessage('');
    try { await fn(); await reloadData(); }
    catch (e: any) { setErrorMessage(e.message || 'İşlem başarısız.'); }
    finally { setBusyId(null); }
  };

  if (!isOpen) return null;
  if (checking) return <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center text-white"><Loader2 className="animate-spin" /></div>;

  if (!authenticated) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-xl p-7 shadow-2xl">
        <div className="flex justify-between items-start mb-7">
          <div><div className="p-2 w-fit rounded bg-rose-950/60 border border-rose-900 text-rose-500 mb-4"><LockKeyhole /></div><h2 className="text-xl font-bold text-white uppercase">Yönetim Girişi</h2><p className="text-xs text-neutral-500 mt-1">Moto Sanayi servis paneli</p></div>
          <button onClick={onClose} className="p-2 text-neutral-400 hover:text-white"><X /></button>
        </div>
        <form onSubmit={login} className="space-y-4">
          <input value={username} onChange={e=>setUsername(e.target.value)} autoComplete="username" placeholder="Kullanıcı adı" className="w-full bg-neutral-900 border border-neutral-800 rounded px-4 py-3 text-sm text-white outline-none focus:border-rose-500" />
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" autoComplete="current-password" placeholder="Şifre" className="w-full bg-neutral-900 border border-neutral-800 rounded px-4 py-3 text-sm text-white outline-none focus:border-rose-500" />
          {loginError && <div className="text-xs text-red-400 bg-red-950/30 border border-red-900/50 p-3 rounded">{loginError}</div>}
          <button className="w-full py-3 rounded bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold">Giriş Yap</button>
        </form>
      </div>
    </div>
  );

  const count = (s: AppointmentStatus) => appointments.filter(a => a.status === s).length;

  return <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
    <div className="relative w-full max-w-6xl h-[92vh] bg-neutral-950 border border-neutral-800 rounded-lg shadow-2xl flex flex-col overflow-hidden">
      <div className="px-5 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/80">
        <div className="flex items-center gap-3"><div className="p-2 rounded bg-rose-950/60 border border-rose-900 text-rose-500"><ShieldCheck className="w-5 h-5" /></div><div><div className="text-xs font-mono font-bold uppercase tracking-wider text-rose-500">Moto Sanayi Servis Yönetim Masası</div><h2 className="text-base sm:text-lg font-bold text-white uppercase">Randevu & Müşteri Operasyonu</h2></div></div>
        <div className="flex gap-2"><button onClick={()=>reloadData()} className="p-2 text-neutral-400 hover:text-white" title="Yenile"><RefreshCw className="w-4 h-4" /></button><button onClick={logout} className="p-2 text-neutral-400 hover:text-white" title="Çıkış"><LogOut className="w-4 h-4" /></button><button onClick={onClose} className="p-2 text-neutral-400 hover:text-white"><X className="w-5 h-5" /></button></div>
      </div>
      <div className="px-5 py-3 border-b border-neutral-800 bg-neutral-950 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 p-1 bg-neutral-900 rounded border border-neutral-800"><button onClick={()=>setActiveTab('appointments')} className={`px-3.5 py-1.5 text-xs font-semibold rounded ${activeTab==='appointments'?'bg-rose-600 text-white':'text-neutral-400'}`}><CalendarDays className="w-4 h-4 inline mr-2"/>Randevular ({appointments.length})</button><button onClick={()=>setActiveTab('customers')} className={`px-3.5 py-1.5 text-xs font-semibold rounded ${activeTab==='customers'?'bg-rose-600 text-white':'text-neutral-400'}`}><Users className="w-4 h-4 inline mr-2"/>Müşteriler ({customers.length})</button></div>
        <div className="flex gap-2 text-xs"><span className="px-2 py-1 rounded bg-amber-950/30 text-amber-400">{count('yeni')} Yeni</span><span className="px-2 py-1 rounded bg-rose-950/30 text-rose-400">{count('serviste')} Serviste</span><span className="px-2 py-1 rounded bg-emerald-950/30 text-emerald-400">{count('tamamlandi')} Tamam</span></div>
      </div>
      <div className="px-5 py-3 border-b border-neutral-900 bg-neutral-900/40 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[220px]"><Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400"/><input value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="İsim, telefon, model, plaka veya takip kodu ara..." className="w-full bg-neutral-950 border border-neutral-800 text-white rounded pl-9 pr-3 py-1.5 text-xs focus:border-rose-500 focus:outline-none"/></div>
        {activeTab==='appointments' && <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} className="bg-neutral-950 border border-neutral-800 text-white rounded px-3 py-1.5 text-xs"><option value="all">Tüm Durumlar</option><option value="yeni">Yeni</option><option value="onaylandi">Onaylandı</option><option value="serviste">Serviste</option><option value="tamamlandi">Tamamlandı</option><option value="iptal">İptal</option></select>}
      </div>
      {errorMessage && <div className="mx-5 mt-3 p-3 rounded bg-red-950/30 border border-red-900/50 text-xs text-red-300">{errorMessage}</div>}
      <div className="flex-1 overflow-y-auto p-5 space-y-3">
        {activeTab==='appointments' ? filteredAppointments.map(apt => <div key={apt.id} className="p-4 rounded-lg bg-neutral-900/70 border border-neutral-800">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2 mb-2"><span className="font-mono text-xs text-rose-400 font-bold">#{apt.trackingCode}</span><span className="text-xs text-neutral-500">{apt.createdAt.slice(0,10)}</span></div><h3 className="text-sm font-bold text-white">{apt.customerName} · {apt.phone}</h3><div className="text-xs text-neutral-300 mt-1">{apt.brand} {apt.model} ({apt.year}) · {apt.plate || 'Plaka yok'}</div><div className="text-xs text-rose-400 mt-1">{apt.serviceTitle}</div><div className="text-xs text-neutral-400 mt-2">Randevu: <b className="text-white">{apt.preferredDate} · {apt.preferredTime}</b></div>{apt.notes && <div className="text-xs text-neutral-500 mt-2">Müşteri notu: {apt.notes}</div>}
              <div className="mt-3 text-xs"><span className="text-neutral-500">Servis Notu: </span>{editingNoteId===apt.id ? <div className="flex gap-2 mt-2"><input value={tempNoteText} onChange={e=>setTempNoteText(e.target.value)} className="flex-1 bg-neutral-950 border border-neutral-700 text-white rounded px-2 py-1"/><button onClick={()=>run(apt.id,()=>storageService.updateAppointmentStatus(apt.id,apt.status,tempNoteText))} className="px-3 py-1 bg-rose-600 text-white rounded">Kaydet</button></div> : <><span className="text-neutral-300">{apt.adminNotes || 'Henüz not yok.'}</span> <button onClick={()=>{setEditingNoteId(apt.id);setTempNoteText(apt.adminNotes||'')}} className="ml-2 text-neutral-400"><Edit3 className="w-3 h-3 inline"/></button></>}</div>
              {editingDateTimeId===apt.id && <div className="mt-3 flex gap-2"><input type="date" value={tempDate} onChange={e=>setTempDate(e.target.value)} className="bg-neutral-950 border border-neutral-800 text-white rounded px-2 py-1 text-xs"/><input type="time" value={tempTime} onChange={e=>setTempTime(e.target.value)} className="bg-neutral-950 border border-neutral-800 text-white rounded px-2 py-1 text-xs"/><button onClick={()=>run(apt.id,()=>storageService.updateAppointmentDateTime(apt.id,tempDate,tempTime))} className="px-2 py-1 bg-rose-600 text-white rounded text-xs">Kaydet</button></div>}
            </div>
            <div className="flex flex-wrap lg:flex-col gap-2 lg:items-end"><select disabled={busyId===apt.id} value={apt.status} onChange={e=>run(apt.id,()=>storageService.updateAppointmentStatus(apt.id,e.target.value as AppointmentStatus))} className="bg-neutral-950 border border-neutral-700 text-white rounded px-3 py-1.5 text-xs"><option value="yeni">Yeni Talep</option><option value="onaylandi">Onaylandı</option><option value="serviste">Serviste</option><option value="tamamlandi">Tamamlandı</option><option value="iptal">İptal</option></select><div className="flex gap-1"><button onClick={()=>{setEditingDateTimeId(apt.id);setTempDate(apt.preferredDate);setTempTime(apt.preferredTime)}} className="px-2 py-1 text-xs text-neutral-300 bg-neutral-950 border border-neutral-800 rounded">Tarih/Saat</button><a href={`https://wa.me/?text=${encodeURIComponent(`Merhaba ${apt.customerName}, Moto Sanayi randevunuz hakkında bilgi vermek için yazıyoruz. Takip: #${apt.trackingCode}`)}`} target="_blank" rel="noreferrer" className="px-2 py-1 text-xs text-emerald-400 bg-neutral-950 border border-neutral-800 rounded"><MessageSquare className="w-3 h-3 inline mr-1"/>WhatsApp</a><button disabled={busyId===apt.id} onClick={()=>window.confirm('Bu randevuyu silmek istediğinize emin misiniz?')&&run(apt.id,()=>storageService.deleteAppointment(apt.id))} className="p-1.5 text-neutral-500 hover:text-red-400"><Trash2 className="w-4 h-4"/></button></div></div>
          </div>
        </div>) : filteredCustomers.map(c => <div key={c.id} className="p-5 rounded-lg bg-neutral-900/70 border border-neutral-800"><div className="flex items-start justify-between"><div><h4 className="text-base font-bold text-white uppercase">{c.fullName}</h4><div className="text-xs font-mono text-neutral-400">{c.phone}</div></div><span className="font-mono text-xs px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-rose-400 font-bold">{c.plate}</span></div><div className="text-xs text-neutral-300 mt-3">{c.motorcycle}</div><div className="grid grid-cols-2 gap-2 text-xs pt-3 mt-3 border-t border-neutral-800"><div><span className="text-neutral-500 block">Son Servis</span><span className="text-neutral-300">{c.lastServiceDate}</span></div><div><span className="text-neutral-500 block">Sonraki Bakım</span><span className="text-emerald-400">{c.nextServiceDate}</span></div></div><div className="flex flex-wrap gap-1.5 mt-3">{c.serviceHistory.map((x,i)=><span key={i} className="text-[11px] px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-300">{x}</span>)}</div></div>)}
        {((activeTab==='appointments'&&filteredAppointments.length===0)||(activeTab==='customers'&&filteredCustomers.length===0))&&<div className="text-center py-16 text-neutral-500 text-sm">Kayıt bulunamadı.</div>}
      </div>
    </div>
  </div>;
};
