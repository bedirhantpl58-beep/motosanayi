import { Appointment, CustomerRecord, AppointmentStatus } from '../types';

const api = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    credentials: 'include',
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload?.error || 'Sunucu isteği başarısız oldu.');
  }
  return payload as T;
};

interface ListResponse<T> { items: T[] }
interface AppointmentResponse { appointment: Appointment }

export const storageService = {
  async getAppointments(): Promise<Appointment[]> {
    const data = await api<ListResponse<Appointment>>('/api/appointments');
    return data.items;
  },

  async createAppointment(formData: Omit<Appointment, 'id' | 'trackingCode' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Appointment> {
    const data = await api<AppointmentResponse>('/api/appointments', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    return data.appointment;
  },

  async updateAppointmentStatus(id: string, status: AppointmentStatus, adminNotes?: string): Promise<Appointment[]> {
    await api<AppointmentResponse>('/api/appointments', {
      method: 'PATCH',
      body: JSON.stringify({ id, status, adminNotes }),
    });
    return this.getAppointments();
  },

  async updateAppointmentDateTime(id: string, preferredDate: string, preferredTime: string): Promise<Appointment[]> {
    await api<AppointmentResponse>('/api/appointments', {
      method: 'PATCH',
      body: JSON.stringify({ id, preferredDate, preferredTime }),
    });
    return this.getAppointments();
  },

  async deleteAppointment(id: string): Promise<Appointment[]> {
    await api<{ ok: true }>('/api/appointments', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    return this.getAppointments();
  },

  async findAppointment(query: string): Promise<Appointment | undefined> {
    const clean = query.trim();
    if (!clean) return undefined;
    try {
      const data = await api<{ appointment: Appointment }>('/api/appointments?query=' + encodeURIComponent(clean));
      return data.appointment;
    } catch {
      return undefined;
    }
  },

  async getCustomers(): Promise<CustomerRecord[]> {
    const data = await api<ListResponse<CustomerRecord>>('/api/customers');
    return data.items;
  },

  async login(username: string, password: string): Promise<void> {
    await api<{ ok: true }>('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ action: 'login', username, password }),
    });
  },

  async logout(): Promise<void> {
    await api<{ ok: true }>('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ action: 'logout' }),
    });
  },

  async getSession(): Promise<{ authenticated: boolean; username?: string }> {
    return api('/api/auth');
  },
};
