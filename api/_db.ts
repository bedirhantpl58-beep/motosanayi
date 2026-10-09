import { Pool } from 'pg';

let pool: Pool | undefined;

export function db() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL ortam değişkeni tanımlı değil.');
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 5,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 8000,
    });
  }
  return pool;
}

export function json(res: any, status: number, payload: unknown) {
  res.status(status).json(payload);
}

export function method(res: any, allowed: string[], actual: string) {
  if (!allowed.includes(actual)) {
    res.setHeader('Allow', allowed.join(', '));
    json(res, 405, { error: 'Method not allowed' });
    return false;
  }
  return true;
}
