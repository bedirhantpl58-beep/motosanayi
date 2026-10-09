import crypto from 'node:crypto';
import { db, json, method } from './_db';
import { requireAdmin } from './_auth';

const statuses = new Set(['yeni', 'onaylandi', 'serviste', 'tamamlandi', 'iptal']);
const clean = (value: unknown, max = 500) => String(value ?? '').trim().slice(0, max);
const phoneClean = (value: string) => value.replace(/\D/g, '').slice(-15);

function mapRow(r: any) {
  return {
    id: r.id,
    trackingCode: r.tracking_code,
    customerName: r.customer_name,
    phone: r.phone,
    brand: r.brand,
    model: r.model,
    year: r.year,
    plate: r.plate || undefined,
    serviceId: r.service_id,
    serviceTitle: r.service_title,
    preferredDate: r.preferred_date,
    preferredTime: r.preferred_time,
    notes: r.notes || undefined,
    photoUrl: r.photo_url || undefined,
    photoName: r.photo_name || undefined,
    status: r.status,
    adminNotes: r.admin_notes || undefined,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

function generateCode() {
  return `MS-${crypto.randomInt(1000, 10000)}`;
}

export default async function handler(req: any, res: any) {
  if (!method(res, ['GET', 'POST', 'PATCH', 'DELETE'], req.method)) return;
  try {
    const pool = db();

    if (req.method === 'GET') {
      const query = clean(req.query?.query, 100);
      if (query) {
        const normalized = query.replace('#', '').replace(/\s+/g, '').toUpperCase();
        const phone = query.replace(/\D/g, '');
        const result = await pool.query(`
          SELECT * FROM appointments
          WHERE UPPER(REPLACE(tracking_code, '#', '')) = $1
             OR REPLACE(phone, ' ', '') LIKE '%' || $2 || '%'
             OR UPPER(REPLACE(COALESCE(plate, ''), ' ', '')) LIKE '%' || $1 || '%'
          ORDER BY created_at DESC LIMIT 1
        `, [normalized, phone || normalized]);
        if (!result.rows[0]) return json(res, 404, { error: 'Randevu bulunamadı.' });
        return json(res, 200, { appointment: mapRow(result.rows[0]) });
      }

      if (!requireAdmin(req, res)) return;
      const result = await pool.query('SELECT * FROM appointments ORDER BY preferred_date ASC, preferred_time ASC, created_at DESC');
      return json(res, 200, { items: result.rows.map(mapRow) });
    }

    if (req.method === 'POST') {
      const body = req.body || {};
      const customerName = clean(body.customerName, 120);
      const phone = clean(body.phone, 40);
      const brand = clean(body.brand, 60);
      const model = clean(body.model, 100);
      const year = clean(body.year, 30);
      const serviceId = clean(body.serviceId, 100);
      const serviceTitle = clean(body.serviceTitle, 150);
      const preferredDate = clean(body.preferredDate, 10);
      const preferredTime = clean(body.preferredTime, 5);
      const plate = clean(body.plate, 30);
      const notes = clean(body.notes, 2000);
      const photoUrl = clean(body.photoUrl, 1400000);
      const photoName = clean(body.photoName, 200);

      if (!customerName || phoneClean(phone).length < 10 || !brand || !model || !year || !serviceId || !serviceTitle || !/^\d{4}-\d{2}-\d{2}$/.test(preferredDate) || !/^\d{2}:\d{2}$/.test(preferredTime)) {
        return json(res, 400, { error: 'Lütfen randevu formundaki zorunlu alanları eksiksiz doldurun.' });
      }

        let trackingCode = generateCode();
      for (let i = 0; i < 5; i++) {
        const exists = await pool.query('SELECT 1 FROM appointments WHERE tracking_code=$1', [trackingCode]);
        if (!exists.rowCount) break;
        trackingCode = generateCode();
      }

      const id = crypto.randomUUID();
      const result = await pool.query(`
        INSERT INTO appointments (id, tracking_code, customer_name, phone, brand, model, year, plate, service_id, service_title, preferred_date, preferred_time, notes, photo_url, photo_name, status)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,'yeni') RETURNING *
      `, [id, trackingCode, customerName, phone, brand, model, year, plate || null, serviceId, serviceTitle, preferredDate, preferredTime, notes || null, photoUrl || null, photoName || null]);

      await pool.query(`
        INSERT INTO customers (id, full_name, phone, motorcycle, plate, model_year, last_service_date, next_service_date, service_history, notes)
        VALUES ($1,$2,$3,$4,$5,$6,$7,'Takip Bekliyor',$8::jsonb,$9)
        ON CONFLICT (phone) DO UPDATE SET full_name=EXCLUDED.full_name, motorcycle=EXCLUDED.motorcycle, plate=EXCLUDED.plate, model_year=EXCLUDED.model_year, updated_at=NOW(), service_history=(SELECT jsonb_agg(DISTINCT value) FROM jsonb_array_elements_text(customers.service_history || EXCLUDED.service_history) AS t(value))
      `, [crypto.randomUUID(), customerName, phone, `${brand} ${model} (${year})`, plate || 'Belirtilmedi', year, preferredDate, JSON.stringify([serviceTitle]), notes || 'Online randevu talebi ile kaydedildi.']);

      return json(res, 201, { appointment: mapRow(result.rows[0]) });
    }

    if (!requireAdmin(req, res)) return;

    const body = req.body || {};
    const id = clean(body.id, 100);
    if (!id) return json(res, 400, { error: 'Randevu ID gerekli.' });

    if (req.method === 'PATCH') {
      const fields: string[] = [];
      const values: unknown[] = [];
      const add = (column: string, value: unknown) => { values.push(value); fields.push(`${column}=$${values.length}`); };
      if (body.status !== undefined) {
        if (!statuses.has(body.status)) return json(res, 400, { error: 'Geçersiz randevu durumu.' });
        add('status', body.status);
      }
      if (body.adminNotes !== undefined) add('admin_notes', clean(body.adminNotes, 2000));
      if (body.preferredDate !== undefined) add('preferred_date', clean(body.preferredDate, 10));
      if (body.preferredTime !== undefined) add('preferred_time', clean(body.preferredTime, 5));
      if (!fields.length) return json(res, 400, { error: 'Güncellenecek alan bulunamadı.' });
      values.push(id);
      const result = await pool.query(`UPDATE appointments SET ${fields.join(', ')}, updated_at=NOW() WHERE id=$${values.length} RETURNING *`, values);
      if (!result.rows[0]) return json(res, 404, { error: 'Randevu bulunamadı.' });
      return json(res, 200, { appointment: mapRow(result.rows[0]) });
    }

    await pool.query('DELETE FROM appointments WHERE id=$1', [id]);
    return json(res, 200, { ok: true });
  } catch (error: any) {
    console.error(error);
    if (error?.code === '23505' && String(error?.constraint || '').includes('appointments_active_slot_unique')) {
      return json(res, 409, { error: 'Bu tarih ve saatte başka bir randevu bulunuyor. Lütfen başka bir saat seçin.' });
    }
    return json(res, 500, { error: 'Sunucu tarafında beklenmeyen bir hata oluştu.' });
  }
}
