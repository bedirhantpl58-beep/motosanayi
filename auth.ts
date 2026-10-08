import { clearSession, getSession, setSession } from './_auth';

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    const session = getSession(req);
    return res.status(200).json(session ? { authenticated: true, username: session.username } : { authenticated: false });
  }
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { action, username, password } = req.body || {};
  if (action === 'logout') {
    clearSession(res);
    return res.status(200).json({ ok: true });
  }

  if (action !== 'login') return res.status(400).json({ error: 'Geçersiz işlem.' });
  const expectedUser = process.env.ADMIN_USERNAME || 'admin';
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedPassword) return res.status(500).json({ error: 'ADMIN_PASSWORD Vercel ortam değişkeninde tanımlı değil.' });
  if (username !== expectedUser || password !== expectedPassword) return res.status(401).json({ error: 'Kullanıcı adı veya şifre hatalı.' });

  setSession(res, expectedUser);
  return res.status(200).json({ ok: true });
}
