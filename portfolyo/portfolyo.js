// Kaydırınca sayfanın rengi ekrandaki projeye geçer; filmler yalnızca dokununca oynar ve aynı anda bir film oynar.
(() => {
'use strict';
const body = document.body;
const theme = document.querySelector('meta[name="theme-color"]');
const films = [...document.querySelectorAll('.film')];
const videos = () => films.map(f => f.querySelector('video'));

// Renk: ekranın ortasından geçen bölüm belirler.
const parts = [...document.querySelectorAll('[data-tone]')];
if ('IntersectionObserver' in window) {
  const paint = el => { body.style.backgroundColor = el.dataset.tone; body.style.color = el.dataset.ink; theme.content = el.dataset.tone; };
  paint(parts[0]);
  body.classList.add('live');
  const seen = new IntersectionObserver(items => items.forEach(i => { if (i.isIntersecting) paint(i.target); }), { rootMargin: '-50% 0px -50% 0px' });
  parts.forEach(p => seen.observe(p));
}

// Film: yerel denetimler dokunana kadar gizli, afişin üstünde tek düğme var.
films.forEach(film => {
  const video = film.querySelector('video');
  const about = video.getAttribute('aria-label');
  const time = (about.match(/(\d+) saniye/) || [])[1];
  const label = `Filmi oynat${time ? `, ${time} sn` : ''}`;
  video.controls = false;
  const play = document.createElement('button');
  play.type = 'button';
  play.className = 'play';
  // Ekran okuyucu adı görünen yazıyla başlar, ardından hangi film olduğunu söyler.
  play.setAttribute('aria-label', `${label}: ${about.replace(/, \d+ saniye$/, '')}`);
  play.innerHTML = `<span><i></i>${label}</span>`;
  film.append(play);
  play.addEventListener('click', () => {
    film.classList.add('playing');
    video.controls = true;
    video.focus({ preventScroll: true });
    video.play().catch(() => {});
  });
  video.addEventListener('play', () => videos().forEach(v => { if (v !== video) v.pause(); }));
  video.addEventListener('error', () => {
    if (film.querySelector('.error')) return;
    film.classList.add('playing');
    const note = document.createElement('p');
    note.className = 'error';
    note.innerHTML = `Film açılamadı. <a href="${video.getAttribute('src')}" target="_blank" rel="noopener">Dosyayı ayrı açın</a>.`;
    film.append(note);
  });
});

// Ekrandan çıkan veya arka plana düşen film durur.
if ('IntersectionObserver' in window) {
  const out = new IntersectionObserver(items => items.forEach(i => { if (!i.isIntersecting) i.target.pause(); }), { threshold: 0 });
  videos().forEach(v => out.observe(v));
}
document.addEventListener('visibilitychange', () => { if (document.hidden) videos().forEach(v => v.pause()); });
})();
