// Sunucu işlevlerinde ortak: aynı kaynak denetimi, istek sınırı, JSON gövdesi ve yanıtı.
const DAKIKA = 60000;
const kayitlar = new Map();

export function json(res, kod, veri) {
  res.statusCode = kod;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(veri));
}

// Yalnızca sitenin kendi sayfalarından gelen POST isteklerini kabul eder.
export function izinliMi(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    json(res, 405, { hata: 'yontem' });
    return false;
  }
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  let kaynak = '';
  try { kaynak = new URL(req.headers.origin).host; } catch {}
  if (!kaynak || kaynak !== host) {
    json(res, 403, { hata: 'kaynak' });
    return false;
  }
  return true;
}

// Her sunucu örneğinde ayrı çalışan basit sınır. Asıl harcama sınırı sağlayıcı panelinde ayarlanır.
export function sinirda(req, ad, adet, dakika) {
  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '?').split(',')[0].trim();
  const anahtar = `${ad}:${ip}`;
  const simdi = Date.now();
  const kayit = (kayitlar.get(anahtar) || []).filter(t => simdi - t < dakika * DAKIKA);
  if (kayit.length >= adet) return true;
  kayit.push(simdi);
  kayitlar.set(anahtar, kayit);
  if (kayitlar.size > 5000) kayitlar.clear();
  return false;
}

export function govde(req) {
  const ham = req.body;
  if (ham && typeof ham === 'object') return ham;
  if (typeof ham !== 'string') return null;
  try { return JSON.parse(ham); } catch { return null; }
}
