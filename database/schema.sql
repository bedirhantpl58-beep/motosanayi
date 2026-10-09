CREATE TABLE IF NOT EXISTS appointments (
  id TEXT PRIMARY KEY,
  tracking_code TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year TEXT NOT NULL,
  plate TEXT,
  service_id TEXT NOT NULL,
  service_title TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TIME NOT NULL,
  notes TEXT,
  photo_url TEXT,
  photo_name TEXT,
  status TEXT NOT NULL DEFAULT 'yeni' CHECK (status IN ('yeni','onaylandi','serviste','tamamlandi','iptal')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS appointments_date_time_idx ON appointments(preferred_date, preferred_time);
CREATE INDEX IF NOT EXISTS appointments_phone_idx ON appointments(phone);
CREATE TABLE IF NOT EXISTS customers (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  motorcycle TEXT NOT NULL,
  plate TEXT NOT NULL DEFAULT 'Belirtilmedi',
  model_year TEXT NOT NULL,
  last_service_date TEXT NOT NULL,
  next_service_date TEXT NOT NULL DEFAULT 'Takip Bekliyor',
  service_history JSONB NOT NULL DEFAULT '[]'::jsonb,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Aynı tarih/saat için iptal edilmemiş iki randevuyu veritabanı seviyesinde engeller.
CREATE UNIQUE INDEX IF NOT EXISTS appointments_active_slot_unique
  ON appointments(preferred_date, preferred_time)
  WHERE status <> 'iptal';
