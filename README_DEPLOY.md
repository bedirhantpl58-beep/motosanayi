# Moto Sanayi — Vercel + Neon Kurulum

Bu sürüm Vercel için hazırlanmıştır. `api/` klasöründeki sunucusuz fonksiyonlar otomatik algılanır; `vercel.json` içinde eski `functions` glob ayarı kullanılmaz.

## 1) GitHub
Bu klasörün içindeki tüm dosyaları GitHub deposunun köküne yükleyin. `.env` veya gerçek şifreleri yüklemeyin.

## 2) Vercel
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command dosyada hazırdır ve peer-dependency kaynaklı npm kurulum hatalarını önlemek için `--legacy-peer-deps` kullanır.

## 3) Neon PostgreSQL
1. Neon'da bir PostgreSQL projesi oluşturun.
2. `database/schema.sql` dosyasını Neon SQL Editor'da bir kez çalıştırın.
3. Vercel Environment Variables içine şu değişkenleri ekleyin:
   - `DATABASE_URL`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `SESSION_SECRET`
4. Sonra yeniden deploy edin.

## 4) Yönetim paneli
Sitedeki Yönetim paneline `ADMIN_USERNAME` ve `ADMIN_PASSWORD` ile giriş yapılır.

## 5) Domain
Vercel Project > Settings > Domains bölümünden GoDaddy domainini ekleyin. Vercel'in verdiği DNS kayıtlarını GoDaddy DNS'e girin.
