// Başvuru formu: gelen mesajı Resend ile stüdyonun e-posta adresine iletir.
import { govde, izinliMi, json, sinirda } from './_ortak.js';

const EPOSTA = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const temiz = deger => (typeof deger === 'string' ? deger.trim() : '');

export default async function handler(req, res) {
  if (!izinliMi(req, res)) return;
  if (sinirda(req, 'form', 5, 10)) return json(res, 429, { hata: 'sinir' });

  const veri = govde(req);
  if (!veri) return json(res, 400, { hata: 'gecersiz' });
  // Görünmeyen alan yalnızca otomatik doldurucularda dolar; başarılı gibi yanıtlanır, e-posta gönderilmez.
  if (temiz(veri.site)) return json(res, 200, { tamam: true });

  const isim = temiz(veri.isim);
  const eposta = temiz(veri.eposta);
  const mesaj = temiz(veri.mesaj);
  if (isim.length > 100) return json(res, 400, { hata: 'isim' });
  if (eposta.length > 200 || !EPOSTA.test(eposta)) return json(res, 400, { hata: 'eposta' });
  if (mesaj.length > 2000) return json(res, 400, { hata: 'mesaj' });

  const anahtar = process.env.RESEND_API_KEY;
  if (!anahtar) return json(res, 503, { hata: 'kapali' });

  try {
    const yanit = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${anahtar}`, 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(10000),
      body: JSON.stringify({
        from: process.env.FORM_FROM || 'Mon Digital Site <site@mondigital.ai>',
        to: [process.env.FORM_TO || 'hello@mondigital.ai'],
        reply_to: eposta,
        subject: `Yeni başvuru: ${isim.replace(/\s+/g, ' ') || eposta}`,
        text: `Ad: ${isim || 'yazılmadı'}\nE-posta: ${eposta}\n\n${mesaj || 'Mesaj yazılmadı, yalnızca e-posta bıraktı.'}`,
      }),
    });
    if (!yanit.ok) {
      console.error('Resend hatası', yanit.status);
      return json(res, 502, { hata: 'gonderilemedi' });
    }
    return json(res, 200, { tamam: true });
  } catch (hata) {
    console.error('Form gönderilemedi', hata.name);
    return json(res, 502, { hata: 'gonderilemedi' });
  }
}
