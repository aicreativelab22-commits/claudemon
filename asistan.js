// Başvuru formu ve Monna sohbeti. Sunucu işlevleri yoksa ziyaretçiyi e-postaya yönlendirir.
(() => {
'use strict';
const EN = document.documentElement.lang === 'en';
const T = EN ? {"konu": "Mon Digital project enquiry", "gonderemedik": "We couldn’t send it just now. ", "epostayla": "Send your message by email", "gonderiliyor": "Sending…", "tesekkur": "We’ve got it, thank you.", "donus": "We’ll reply to the address you gave.", "eposta": "Could you check your email address?", "sinir": "Too many attempts in a short time. Please try again shortly.", "s1": "What do you create?", "s2": "How do we start?", "s3": "What work have you done?", "selam": "Hi, I’m Monna. Shall we talk about what we can do for your project?", "selamKapat": "Close the greeting", "sorun": "Ask Monna", "asistan": "Your AI assistant", "sohbet": "Chat with Monna", "kimlik": "Mon Digital’s AI assistant", "kapat": "Close chat", "mesaj": "Your message", "sor": "Ask something…", "gonder": "Send", "not1": "It’s an AI and can make mistakes. What you write is sent to an AI provider to generate a reply; please put personal details in the ", "not2": "form", "not3": ".", "ilk": "Hi, I’m Monna. You can ask what Mon Digital does or tell me about an idea you have.", "yaziyor": "Monna is typing", "mola": "We’ve chatted quite a bit, so a short break. You can write to us in the meantime:", "cevap": "I can’t answer right now. You can reach us here:", "red": "I can’t help with that. For Mon Digital, you can reach us here:", "kopuk": "The connection dropped. You can reach us here:"} : {"konu": "Mon Digital proje görüşmesi", "gonderemedik": "Şu an gönderemedik. ", "epostayla": "Mesajınızı e-postayla iletin", "gonderiliyor": "Gönderiliyor…", "tesekkur": "Aldık, teşekkürler.", "donus": "Yazdığınız adresten size döneceğiz.", "eposta": "E-posta adresini kontrol eder misiniz?", "sinir": "Kısa sürede çok deneme yapıldı. Biraz sonra tekrar deneyin.", "s1": "Ne üretiyorsunuz?", "s2": "Nasıl başlarız?", "s3": "Hangi işleri yaptınız?", "selam": "Merhaba, ben Monna. Projeniz için neler yapabileceğimizi konuşalım mı?", "selamKapat": "Karşılama mesajını kapat", "sorun": "Monna’ya sorun", "asistan": "AI asistanınız", "sohbet": "Monna ile sohbet", "kimlik": "Mon Digital’in yapay zekâ asistanı", "kapat": "Sohbeti kapat", "mesaj": "Mesajınız", "sor": "Bir şey sorun…", "gonder": "Gönder", "not1": "Yapay zekâdır, hata yapabilir. Yazdıklarınız yanıt üretmek için yapay zekâ sağlayıcısına iletilir; kişisel bilgilerinizi ", "not2": "forma", "not3": " yazın.", "ilk": "Merhaba, ben Monna. Mon Digital’in neler yaptığını sorabilir, aklınızdaki fikri anlatabilirsiniz.", "yaziyor": "Monna yazıyor", "mola": "Biraz fazla konuştuk, kısa bir mola. Bu arada bize yazabilirsiniz:", "cevap": "Şu an cevap veremiyorum. Bize buradan ulaşabilirsiniz:", "red": "Bu konuda yardımcı olamıyorum. Mon Digital için bize buradan ulaşabilirsiniz:", "kopuk": "Bağlantı koptu. Bize buradan ulaşabilirsiniz:"};
const MAIL = 'hello@mondigital.ai';
const mailLink = (konu, govde) => `mailto:${MAIL}?subject=${encodeURIComponent(konu)}${govde ? `&body=${encodeURIComponent(govde)}` : ''}`;

// Başvuru formu
const form = document.querySelector('.apply-form');
if (form) {
 const durum = form.querySelector('.apply-status');
 const dugme = form.querySelector('button[type=submit]');
 const yedek = veri => {
  durum.textContent = T.gonderemedik;
  const a = document.createElement('a');
  a.href = mailLink(T.konu, [veri.mesaj, veri.isim, veri.eposta].filter(Boolean).join('\n\n'));
  a.textContent = T.epostayla;
  durum.append(a);
 };
 form.addEventListener('submit', async e => {
  e.preventDefault();
  if (!form.reportValidity() || dugme.disabled) return;
  const veri = Object.fromEntries(new FormData(form));
  dugme.disabled = true;durum.textContent = T.gonderiliyor;
  try {
   const yanit = await fetch('/api/iletisim', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(veri) });
   if (yanit.ok) {
    const kutu = document.createElement('div');
    kutu.className = 'apply-done';kutu.tabIndex = -1;kutu.setAttribute('role', 'status');
    kutu.innerHTML = `<h3>${T.tesekkur}</h3><p>${T.donus}</p>`;
    form.replaceWith(kutu);kutu.focus();
    return;
   }
   const hata = (await yanit.json().catch(() => ({}))).hata;
   if (hata === 'eposta') durum.textContent = T.eposta;
   else if (hata === 'sinir') durum.textContent = T.sinir;
   else yedek(veri);
  } catch {
   yedek(veri);
  }
  dugme.disabled = false;
 });
}

// Monna
const YUZ = `<img class="monna" src="${EN ? '../' : ''}medya/monna-kucuk.webp" alt="" width="152" height="200" decoding="async">`;
const SECENEKLER = [T.s1, T.s2, T.s3];
const ILETISIM = document.querySelector('#iletisim') ? '#iletisim' : 'index.html#iletisim';

const kok = document.createElement('div');
kok.className = 'chat';
kok.innerHTML = `<div class="chat-hello" role="status" hidden><button type="button" class="chat-hello-ac">${T.selam}</button><button type="button" class="chat-hello-kapat" aria-label="${T.selamKapat}">×</button></div>
<button type="button" class="chat-open" aria-expanded="false" aria-controls="chat-panel">${YUZ}<span class="chat-open-yazi"><strong>${T.sorun}</strong><small>${T.asistan}</small></span></button>
<section class="chat-panel" id="chat-panel" role="dialog" aria-label="${T.sohbet}" hidden>
<header class="chat-head">${YUZ}<div><strong>Monna</strong><small>${T.kimlik}</small></div><button type="button" class="chat-close" aria-label="${T.kapat}">×</button></header>
<div class="chat-log" role="log" aria-live="polite" tabindex="0"></div>
<div class="chat-chips"></div>
<form class="chat-form"><label class="sr" for="chat-input">${T.mesaj}</label><textarea id="chat-input" rows="1" maxlength="600" placeholder="${T.sor}" autocomplete="off"></textarea><button type="submit">${T.gonder}</button></form>
<p class="chat-note">${T.not1}<a href="${ILETISIM}">${T.not2}</a>${T.not3}</p>
</section>`;
document.body.append(kok);

const ac = kok.querySelector('.chat-open'), panel = kok.querySelector('.chat-panel'), kayit = kok.querySelector('.chat-log'), selam = kok.querySelector('.chat-hello');
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
 const a = document.createElement('a');a.href = mailLink(T.konu);a.textContent = MAIL;
 p.append(a);
};
function ayarla(acik, odak = true) {
 panel.hidden = !acik;
 kok.classList.toggle('is-open', acik);
 ac.setAttribute('aria-expanded', String(acik));
 if (acik && !kayit.children.length) {
  balon('bot', T.ilk);
  SECENEKLER.forEach(metin => {
   const b = document.createElement('button');
   b.type = 'button';b.textContent = metin;
   b.addEventListener('click', () => sor(metin));
   secenek.append(b);
  });
 }
 if (acik) selamiBitir();
 if (odak) (acik ? girdi : ac).focus();
}
async function sor(metin) {
 metin = metin.trim();
 if (!metin || mesgul) return;
 mesgul = true;gonderDugme.disabled = true;secenek.replaceChildren();
 balon('user', metin);
 mesajlar.push({ role: 'user', content: metin });
 const p = balon('bot wait');
 p.setAttribute('aria-label', T.yaziyor);
 let yanit = '';
 try {
  const cevap = await fetch('/api/sohbet', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mesajlar }) });
  if (!cevap.ok) {
   mesajlar.pop();
   hataGoster(p, cevap.status === 429 ? T.mola : T.cevap);
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
    hataGoster(p, reddedildi ? T.red : T.cevap);
   } else {
    p.textContent = yanit;
    mesajlar.push({ role: 'assistant', content: yanit });
   }
  }
 } catch {
  mesajlar.pop();
  hataGoster(p, T.kopuk);
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

// Karşılama balonu: sekme başına ve yarım saatte bir kez, 6 saniye sonra; odağı değiştirmez, sohbeti kendiliğinden açmaz.
const SELAM_ANAHTAR = 'monna-selam';
const ALAN = /(^|\.)mondigital\.ai$/.test(location.hostname) ? '; domain=.mondigital.ai' : '';
let selamBitti = false;
const selamGoruldu = () => {
 if (selamBitti) return true;
 try { if (sessionStorage.getItem(SELAM_ANAHTAR)) return true; } catch {}
 return document.cookie.split('; ').includes(`${SELAM_ANAHTAR}=1`);
};
// www ile portfolyo ayrı alan adları: çerez ikisinde de geçerli, yalnız bu işareti taşır. Süresi var; oturum çerezi tarayıcı oturumu geri yüklenince hiç silinmiyordu.
const selamIsaretle = () => {
 selamBitti = true;
 try { sessionStorage.setItem(SELAM_ANAHTAR, '1'); } catch {}
 document.cookie = `${SELAM_ANAHTAR}=1; path=/; Max-Age=1800; SameSite=Lax${ALAN}${location.protocol === 'https:' ? '; Secure' : ''}`;
};
function selamiBitir() {
 selam.hidden = true;
 selamIsaretle();
}
const formDolu = () => {
 const a = document.activeElement;
 if (a && a.closest && a.closest('.apply-form')) return true;
 return [...document.querySelectorAll('.apply-form input,.apply-form textarea')].some(e => e.name !== 'site' && e.value.trim());
};
const filmOynuyor = () => [...document.querySelectorAll('video')].some(v => !v.paused && !v.ended && !v.classList.contains('film-teaser'));
const selamUygun = () => !document.hidden && panel.hidden && !document.querySelector('dialog[open]') && !formDolu() && !filmOynuyor()
 && !kok.classList.contains('is-tucked') && !kok.classList.contains('is-over-film');

// Filme veya eyleme binecekse düğme küçülür; küçüğü bir eyleme ya da oynayan filme biniyorsa gizlenir. Balon eylemin üstüne binerse kapanır.
const KUCUK = 52, PAY = 8;
const kesisir = (e, sol, ust, sag, alt, pay = PAY) => {
 const k = e.getBoundingClientRect();
 return k.width && k.height && k.left < sag + pay && k.right > sol - pay && k.top < alt + pay && k.bottom > ust - pay;
};
// Form alanları her zaman sayılır. Kart, satır boyu bağlantılar ve film altyazısı sayılmaz; aksi halde düğme küçülür, balon ilk ekranda hiç çıkamazdı.
const eylemler = () => [...document.querySelectorAll('main a,main button,main input,main textarea,main select,main .y-isaret,main .play span')].filter(e => {
 if (e.closest('figcaption')) return false;
 const k = e.getBoundingClientRect();
 return e.matches('input,textarea,select') || k.width * k.height < 30000;
});
const filmler = () => [...document.querySelectorAll('.film-frame,.film')];
let tam = 0, bekliyor = false;
const denetle = () => {
 bekliyor = false;
 if (!kok.classList.contains('is-kucuk') && !kok.classList.contains('is-tucked')) tam = ac.offsetWidth || tam;
 const d = ac.getBoundingClientRect();
 if (!d.width) return;
 const ust = d.bottom - Math.max(d.height, 60), hepsi = [...filmler(), ...eylemler()];
 kok.classList.toggle('is-kucuk', hepsi.some(e => kesisir(e, d.right - tam, ust, d.right, d.bottom)));
 const kucukBinen = e => kesisir(e, d.right - KUCUK, d.bottom - KUCUK, d.right, d.bottom, 0);
 const oynayan = f => { const v = f.querySelector('video:not(.film-teaser)'); return v && !v.paused && !v.ended; };
 kok.classList.toggle('is-over-film', eylemler().some(kucukBinen) || filmler().some(f => oynayan(f) && kucukBinen(f)));
 if (!selam.hidden && !selam.contains(document.activeElement)) {
  const b = selam.getBoundingClientRect();
  if (!selamUygun() || eylemler().some(e => kesisir(e, b.left, b.top, b.right, b.bottom, 0))) selamiBitir();
 }
};
const iste = () => { if (!bekliyor) { bekliyor = true; requestAnimationFrame(denetle); } };
addEventListener('scroll', iste, { passive: true });
addEventListener('resize', iste);
addEventListener('load', iste);
document.addEventListener('click', iste);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(iste);
denetle();

// Telefonda form veya sayfa sonu görünürken açma düğmesi çekilir; alanların üstüne binmez.
const hedefler = document.querySelectorAll('.contact,.end,.site-footer');
if (hedefler.length && 'IntersectionObserver' in window) {
 const gorunen = new Set();
 const izle = new IntersectionObserver(girisler => {
  girisler.forEach(g => { if (g.isIntersecting) gorunen.add(g.target); else gorunen.delete(g.target); });
  kok.classList.toggle('is-tucked', gorunen.size > 0);
  iste();
 });
 hedefler.forEach(h => izle.observe(h));
}

function selamiDene() {
 if (selamGoruldu()) return;
 denetle();
 if (selamUygun()) {
  // Geniş ekranda önce düğmenin yanı, olmazsa üstü; boş yer yoksa kaydırınca yeniden denenir.
  for (const yan of innerWidth >= 900 ? [true, false] : [false]) {
   selam.classList.toggle('yan', yan);
   selam.hidden = false;
   selam.style.animation = 'none';
   const b = selam.getBoundingClientRect();
   selam.style.animation = '';
   if (!eylemler().some(e => kesisir(e, b.left, b.top, b.right, b.bottom, 0))) { selamIsaretle(); return; }
   selam.hidden = true;
  }
 }
 setTimeout(selamiDene, 2000);
}
kok.querySelector('.chat-hello-ac').addEventListener('click', () => ayarla(true));
const selamKapat = () => { selamiBitir(); ac.focus({ preventScroll: true }); };
kok.querySelector('.chat-hello-kapat').addEventListener('click', selamKapat);
selam.addEventListener('keydown', e => { if (e.key === 'Escape') selamKapat(); });
document.addEventListener('play', e => { if (!e.target.classList.contains('film-teaser') && !selam.hidden) selamiBitir(); }, true);
document.addEventListener('focusin', e => { if (!selam.hidden && e.target.closest && e.target.closest('.apply-form')) selamiBitir(); });
if (!selamGoruldu()) setTimeout(selamiDene, 6000);
})();
