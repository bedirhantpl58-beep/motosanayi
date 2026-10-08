export type AppointmentStatus = 
  | 'yeni'        // Yeni Talep
  | 'onaylandi'   // Onaylandı
  | 'serviste'    // Serviste (İşlem Sürüyor)
  | 'tamamlandi'  // İşlem Tamamlandı
  | 'iptal';      // İptal

export interface Appointment {
  id: string;
  trackingCode: string; // örn: #MS-4821
  customerName: string;
  phone: string;
  brand: string;
  model: string;
  year: string;
  plate?: string;
  serviceId: string;
  serviceTitle: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  photoUrl?: string;
  photoName?: string;
  status: AppointmentStatus;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerRecord {
  id: string;
  fullName: string;
  phone: string;
  motorcycle: string;
  plate: string;
  modelYear: string;
  lastServiceDate: string;
  nextServiceDate: string;
  serviceHistory: string[];
  notes?: string;
}

export interface BeforeAfterProject {
  id: string;
  title: string;
  motorcycle: string;
  serviceCategory: string;
  actionDone: string;
  resultAchieved: string;
  beforeStats: string;
  afterStats: string;
  image: string;
}

export interface GaragePost {
  id: string;
  title: string;
  model: string;
  tag: string;
  views: string;
  caption: string;
  image: string;
}
