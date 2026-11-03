// Başvuru formu ve Monna sohbeti. Sunucu işlevleri yoksa ziyaretçiyi e-postaya yönlendirir.
(() => {
'use strict';
const MAIL = 'hello@mondigital.ai';
const mailLink = (konu, govde) => `mailto:${MAIL}?subject=${encodeURIComponent(konu)}${govde ? `&body=${encodeURIComponent(govde)}` : ''}`;

// Başvuru formu
const form = document.querySelector('.apply-form');
if (form) {
 const durum = form.querySelector('.apply-status');
 const dugme = form.querySelector('button[type=submit]');
 const yedek = veri => {
  durum.textContent = 'Şu an gönderemedik. ';
  const a = document.createElement('a');
  a.href = mailLink('Mon Digital proje görüşmesi', `${veri.mesaj}\n\n${veri.isim}`);
  a.textContent = 'Mesajınızı e-postayla iletin';
  durum.append(a);
 };
 form.addEventListener('submit', async e => {
  e.preventDefault();
  if (!form.reportValidity() || dugme.disabled) return;
  const veri = Object.fromEntries(new FormData(form));
  dugme.disabled = true;durum.textContent = 'Gönderiliyor…';
  try {
   const yanit = await fetch('/api/iletisim', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(veri) });
   if (yanit.ok) {
    const kutu = document.createElement('div');
    kutu.className = 'apply-done';kutu.tabIndex = -1;kutu.setAttribute('role', 'status');
    kutu.innerHTML = '<h3>Aldık, teşekkürler.</h3><p>Mesajınız bize ulaştı. Yazdığınız adresten size döneceğiz.</p>';
    form.replaceWith(kutu);kutu.focus();
    return;
   }
   const hata = (await yanit.json().catch(() => ({}))).hata;
   if (hata === 'eposta') durum.textContent = 'E-posta adresini kontrol eder misiniz?';
   else if (hata === 'sinir') durum.textContent = 'Kısa sürede çok deneme yapıldı. Biraz sonra tekrar deneyin.';
   else yedek(veri);
  } catch {
   yedek(veri);
  }
  dugme.disabled = false;
 });
}

// Monna
const YUZ = '<img class="monna" src="medya/monna-kucuk.webp" alt="" width="152" height="200" decoding="async">';
const SECENEKLER = ['Ne üretiyorsunuz?', 'Nasıl başlarız?', 'Hangi işleri yaptınız?'];
const ILETISIM = document.querySelector('#iletisim') ? '#iletisim' : 'index.html#iletisim';

const kok = document.createElement('div');
kok.className = 'chat';
kok.innerHTML = `<button type="button" class="chat-open" aria-expanded="false" aria-controls="chat-panel" aria-label="Monna ile sohbeti aç">${YUZ}<span>Monna</span></button>
<section class="chat-panel" id="chat-panel" role="dialog" aria-label="Monna ile sohbet" hidden>
<header class="chat-head">${YUZ}<div><strong>Monna</strong><small>Mon Digital’in yapay zekâ asistanı</small></div><button type="button" class="chat-close" aria-label="Sohbeti kapat">×</button></header>
<div class="chat-log" role="log" aria-live="polite" tabindex="0"></div>
<div class="chat-chips"></div>
<form class="chat-form"><label class="sr" for="chat-input">Mesajınız</label><textarea id="chat-input" rows="1" maxlength="600" placeholder="Bir şey sorun…" autocomplete="off"></textarea><button type="submit">Gönder</button></form>
<p class="chat-note">Yapay zekâdır, hata yapabilir. Yazdıklarınız yanıt üretmek için yapay zekâ sağlayıcısına iletilir; kişisel bilgilerinizi <a href="${ILETISIM}">forma</a> yazın.</p>
</section>`;
document.body.append(kok);

const ac = kok.querySelector('.chat-open'), panel = kok.querySelector('.chat-panel'), kayit = kok.querySelector('.chat-log');
const secenek = kok.querySelector('.chat-chips'), sohbetFormu = kok.querySelector('.chat-form'), girdi = kok.querySelector('#chat-input');
const gonderDugme = sohbetFormu.querySelector('button');
const mesajlar = [];
let mesgul = false;

const balon = (kim, metin = '') => {
 const p = document.createElement('p');
 p.className = `chat-msg ${kim}`;p.textContent = metin;
 kayit.append(p);kayit.scrollTop = kayit.scrollHeight;
 return p;
};
const hataGoster = (p, metin) => {
 p.classList.remove('wait');p.textContent = `${metin} `;
 const a = document.createElement('a');a.href = mailLink('Mon Digital proje görüşmesi');a.textContent = MAIL;
 p.append(a);
};
function ayarla(acik, odak = true) {
 panel.hidden = !acik;
 kok.classList.toggle('is-open', acik);
 ac.setAttribute('aria-expanded', String(acik));
 if (acik && !kayit.children.length) {
  balon('bot', 'Merhaba, ben Monna. Mon Digital’in neler yaptığını sorabilir, aklınızdaki fikri anlatabilirsiniz.');
  SECENEKLER.forEach(metin => {
   const b = document.createElement('button');
   b.type = 'button';b.textContent = metin;
   b.addEventListener('click', () => sor(metin));
   secenek.append(b);
  });
 }
 if (odak) (acik ? girdi : ac).focus();
}
async function sor(metin) {
 metin = metin.trim();
 if (!metin || mesgul) return;
 mesgul = true;gonderDugme.disabled = true;secenek.replaceChildren();
 balon('user', metin);
 mesajlar.push({ role: 'user', content: metin });
 const p = balon('bot wait');
 p.setAttribute('aria-label', 'Monna yazıyor');
 let yanit = '';
 try {
  const cevap = await fetch('/api/sohbet', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mesajlar }) });
  if (!cevap.ok) {
   mesajlar.pop();
   hataGoster(p, cevap.status === 429 ? 'Biraz fazla konuştuk, kısa bir mola. Bu arada bize yazabilirsiniz:' : 'Şu an cevap veremiyorum. Bize buradan ulaşabilirsiniz:');
  } else {
   const okuyucu = cevap.body.getReader(), cozucu = new TextDecoder();
   let tampon = '', sorun = false, reddedildi = false;
   for (;;) {
    const { done, value } = await okuyucu.read();
    if (done) break;
    tampon += cozucu.decode(value, { stream: true });
    const satirlar = tampon.split('\n');tampon = satirlar.pop();
    for (const satir of satirlar) {
     if (!satir) continue;
     const olay = JSON.parse(satir);
     if (olay.metin) {
      p.classList.remove('wait');p.removeAttribute('aria-label');
      yanit += olay.metin;p.textContent = yanit;kayit.scrollTop = kayit.scrollHeight;
     }
     if (olay.hata) sorun = true;
     if (olay.reddedildi) reddedildi = true;
     if (olay.kesildi) yanit += '…';
    }
   }
   if (sorun || reddedildi || !yanit) {
    mesajlar.pop();yanit = '';
    hataGoster(p, reddedildi ? 'Bu konuda yardımcı olamıyorum. Mon Digital için bize buradan ulaşabilirsiniz:' : 'Şu an cevap veremiyorum. Bize buradan ulaşabilirsiniz:');
   } else {
    p.textContent = yanit;
    mesajlar.push({ role: 'assistant', content: yanit });
   }
  }
 } catch {
  mesajlar.pop();
  hataGoster(p, 'Bağlantı koptu. Bize buradan ulaşabilirsiniz:');
 }
 mesgul = false;gonderDugme.disabled = false;kayit.scrollTop = kayit.scrollHeight;
 if (!panel.hidden) girdi.focus({ preventScroll: true });
}

ac.addEventListener('click', () => ayarla(panel.hidden));
kok.querySelector('.chat-close').addEventListener('click', () => ayarla(false));
document.querySelectorAll('[data-open-chat]').forEach(b => b.addEventListener('click', () => ayarla(true)));
panel.addEventListener('keydown', e => { if (e.key === 'Escape') ayarla(false); });
sohbetFormu.addEventListener('submit', e => {
 e.preventDefault();
 const metin = girdi.value;
 if (mesgul || !metin.trim()) return;
 girdi.value = '';
 sor(metin);
});
girdi.addEventListener('keydown', e => {
 if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault();sohbetFormu.requestSubmit(); }
});
panel.addEventListener('click', e => { if (e.target.closest('.chat-note a')) ayarla(false, false); });

// Düğme, siteye girişten 30 saniye sonra görünür; sayfa değişse de süre baştan başlamaz.
const BEKLEME = 30000;
let giris = Date.now();
try {
 const kayitli = Number(sessionStorage.getItem('monna-giris'));
 if (kayitli) giris = kayitli; else sessionStorage.setItem('monna-giris', String(giris));
} catch {}
setTimeout(() => kok.classList.add('is-ready'), Math.max(0, BEKLEME - (Date.now() - giris)));

// Düğme bir videonun üstüne denk gelirse gizlenir, video ekrandan çıkınca geri gelir.
const videolar = document.querySelectorAll('.film-frame,.film');
if (videolar.length) {
 let bekliyor = false;
 const denetle = () => {
  bekliyor = false;
  const d = ac.getBoundingClientRect();
  if (!d.width) return;
  const a = 8;
  const biniyor = [...videolar].some(v => {
   const k = v.getBoundingClientRect();
   return k.left < d.right + a && k.right > d.left - a && k.top < d.bottom + a && k.bottom > d.top - a;
  });
  kok.classList.toggle('is-over-film', biniyor);
 };
 const iste = () => { if (!bekliyor) { bekliyor = true; requestAnimationFrame(denetle); } };
 addEventListener('scroll', iste, { passive: true });
 addEventListener('resize', iste);
 denetle();
}

// Telefonda form veya sayfa sonu görünürken açma düğmesi çekilir; alanların üstüne binmez.
const hedefler = document.querySelectorAll('.contact,.end,.site-footer');
if (hedefler.length && 'IntersectionObserver' in window) {
 const gorunen = new Set();
 const izle = new IntersectionObserver(girisler => {
  girisler.forEach(g => { if (g.isIntersecting) gorunen.add(g.target); else gorunen.delete(g.target); });
  kok.classList.toggle('is-tucked', gorunen.size > 0);
 });
 hedefler.forEach(h => izle.observe(h));
}
})();
