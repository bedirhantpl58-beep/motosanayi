import { db, json, method } from './_db';
import { requireAdmin } from './_auth';

export default async function handler(req: any, res: any) {
  if (!method(res, ['GET'], req.method)) return;
  if (!requireAdmin(req, res)) return;
  try {
    const result = await db().query('SELECT * FROM customers ORDER BY updated_at DESC');
    const items = result.rows.map((r: any) => ({
      id: r.id,
      fullName: r.full_name,
      phone: r.phone,
      motorcycle: r.motorcycle,
      plate: r.plate,
      modelYear: r.model_year,
      lastServiceDate: r.last_service_date,
      nextServiceDate: r.next_service_date,
      serviceHistory: Array.isArray(r.service_history) ? r.service_history : [],
      notes: r.notes || undefined,
    }));
    return json(res, 200, { items });
  } catch (error) {
    console.error(error);
    return json(res, 500, { error: 'Müşteriler alınamadı.' });
  }
}
