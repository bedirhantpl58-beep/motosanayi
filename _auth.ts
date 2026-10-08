import crypto from 'node:crypto';

const COOKIE = 'moto_admin_session';
const maxAge = 60 * 60 * 12;

function secret() {
  const value = process.env.SESSION_SECRET;
  if (!value) throw new Error('SESSION_SECRET ortam değişkeni tanımlı değil.');
  return value;
}

function sign(value: string) {
  return crypto.createHmac('sha256', secret()).update(value).digest('hex');
}

function parseCookie(header = '') {
  return Object.fromEntries(header.split(';').map((part) => {
    const [k, ...rest] = part.trim().split('=');
    return [k, rest.join('=')];
  }).filter(([k]) => k));
}

export function setSession(res: any, username: string) {
  const payload = Buffer.from(JSON.stringify({ username, exp: Date.now() + maxAge * 1000 })).toString('base64url');
  const token = `${payload}.${sign(payload)}`;
  res.setHeader('Set-Cookie', `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`);
}

export function clearSession(res: any) {
  res.setHeader('Set-Cookie', `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`);
}

export function getSession(req: any): { username: string } | null {
  const cookies = parseCookie(req.headers?.cookie || '');
  const token = cookies[COOKIE];
  if (!token) return null;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;
  const expected = sign(payload);
  if (signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!data?.username || Number(data.exp) < Date.now()) return null;
    return { username: data.username };
  } catch {
    return null;
  }
}

export function requireAdmin(req: any, res: any) {
  const session = getSession(req);
  if (!session) {
    res.status(401).json({ error: 'Yetkisiz erişim.' });
    return null;
  }
  return session;
}
