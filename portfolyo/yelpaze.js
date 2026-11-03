// Yelpaze: projeleri sayfadan okur, sayfanın başına tek sahne kurar. Seçilen proje alttaki listenin başına geçer, diğerleri sırasında kalır.
(() => {
'use strict';
const open = document.querySelector('.open');
const index = document.querySelector('.index');
if (!open || !index) return;

// Mentos önde başlar; Luma açılışta görünmesin diye tam arkada, sıra gelince öne çıkar.
const SIRA = ['mentos', 'happy-to-wear', 'quinzell', 'kremi', 'luma', 'frutibon', 'dal', 'melty'];
const siraNo = id => { const i = SIRA.indexOf(id); return i < 0 ? SIRA.length : i; };
const projects = [...document.querySelectorAll('.work')].map(section => {
  const film = section.querySelector(':scope > .film, :scope > .still');
  const video = film && film.querySelector('video');
  const poster = film && film.querySelector('img');
  if (!poster) return null;
  return {
    id: section.id, section, film,
    src: video ? video.getAttribute('src') : '', about: video ? video.getAttribute('aria-label') || '' : '',
    cover: poster.getAttribute('src'), alt: poster.getAttribute('alt') || '',
    name: section.querySelector('.name').textContent.trim(),
    kind: section.querySelector('.kind').textContent.trim(),
    link: index.querySelector(`a[href="#${section.id}"]`)
  };
}).filter(Boolean).sort((a, b) => siraNo(a.id) - siraNo(b.id));
const N = projects.length;
if (N < 3) return;

const order = [...document.querySelectorAll('.work')];
const listParent = order[0].parentNode, listEnd = order[order.length - 1].nextElementSibling;
const wrap = i => ((i % N) + N) % N;
const az = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; };

const stage = el('div', 'y-sahne');
stage.id = 'filmler';
stage.tabIndex = 0;
stage.setAttribute('role', 'group');
stage.setAttribute('aria-roledescription', 'galeri');
stage.setAttribute('aria-label', 'Filmler. Sol ve sağ ok tuşlarıyla gezilir.');
const world = el('div', 'y-dunya');
world.append(el('div', 'y-golge'));
const panels = projects.map((p, i) => {
  const d = el('div', 'y-panel');
  d.dataset.sira = i;
  const img = new Image(720, 1280);
  img.src = p.cover; img.alt = ''; img.draggable = false;
  if (i === 0) img.fetchPriority = 'high';
  const mirror = new Image(720, 1280);
  mirror.src = p.cover; mirror.alt = ''; mirror.className = 'y-ayna'; mirror.setAttribute('aria-hidden', 'true');
  d.append(img, mirror);
  world.append(d);
  return d;
});
const cinema = el('div', 'y-sinema', '<span class="y-isaret" aria-hidden="true"><i></i></span>');
const video = document.createElement('video');
video.controls = true; video.playsInline = true; video.preload = 'none';
cinema.prepend(video);
world.append(cinema);
stage.append(world);

const bar = el('div', 'y-alt');
const info = el('div', 'y-bilgi', '<strong></strong><span class="y-tur"></span><a>Projeyi incele</a>');
info.setAttribute('aria-live', 'polite');
const nameEl = info.querySelector('strong'), kindEl = info.querySelector('.y-tur'), moreEl = info.querySelector('a');
const actions = el('div', 'y-eylem');
const playBtn = el('button', 'y-izle', '<i></i><span>Filmi izle</span>');
playBtn.type = 'button';
const playText = playBtn.querySelector('span');
const prev = el('button', 'y-ok', '<svg viewBox="0 0 14 14" aria-hidden="true"><path d="M9 1L3 7l6 6"/></svg>');
prev.type = 'button'; prev.setAttribute('aria-label', 'Önceki proje');
const next = el('button', 'y-ok', '<svg viewBox="0 0 14 14" aria-hidden="true"><path d="M5 1l6 6-6 6"/></svg>');
next.type = 'button'; next.setAttribute('aria-label', 'Sonraki proje');
actions.append(playBtn, prev, next);
const note = el('p', 'y-durum');
note.setAttribute('role', 'status');

let cur = 0, filmOn = false, pw = 300, last = {};

// Yan paneller arkaya ve içe bakar; film açılınca biraz daha açılıp kararır.
const X = [0, .66, 1.14, 1.54, 1.86], Z = [0, -.5, -1.05, -1.6, -2.1], R = [0, 24, 32, 38, 40], K = [0, .22, .42, .6, .8];
const offset = i => { const o = wrap(i - cur); return o > N / 2 - 1 && o !== N / 2 ? o - N : o; };
const pose = o => {
  const a = Math.min(Math.abs(o), 4), s = o < 0 ? -1 : 1;
  const x = s * X[a] * (filmOn ? 1.24 : 1);
  let k = K[a];
  if (filmOn && a) k = Math.min(.9, k + .32);
  return { t: `translate3d(${(x * pw).toFixed(1)}px,0,${(Z[a] * pw).toFixed(1)}px) rotateY(${-s * R[a]}deg)`, k, op: a >= 4 ? 0 : 1 };
};
const apply = moved => {
  panels.forEach((d, i) => {
    const o = offset(i), q = pose(o);
    if (moved && last[i] !== undefined && Math.abs(o - last[i]) > 2) {
      d.style.transition = 'none'; d.style.transform = q.t; d.style.opacity = '0'; void d.offsetWidth; d.style.transition = '';
    }
    d.style.transform = q.t; d.style.opacity = q.op; d.style.pointerEvents = q.op ? '' : 'none'; d.style.setProperty('--k', q.k.toFixed(2));
    last[i] = o;
    const img = d.firstElementChild;
    img.alt = o === 0 ? projects[i].alt : '';
    d.setAttribute('aria-hidden', o === 0 ? 'false' : 'true');
  });
  cinema.style.transform = pose(0).t + ' translateZ(1px)';
};
const measure = () => {
  const W = stage.clientWidth, h = stage.clientHeight;
  if (!W || h < 100) return;
  pw = Math.min((h - 16) * .5625, W * (W < 600 ? .66 : W < 900 ? .5 : .34));
  stage.style.setProperty('--pw', pw.toFixed(1) + 'px');
  stage.style.setProperty('--ph', (pw / .5625).toFixed(1) + 'px');
  apply(false);
};

const closeFilm = () => {
  filmOn = false;
  document.body.classList.remove('y-film', 'modal-open');
  playText.textContent = 'Filmi izle';
  video.pause(); video.removeAttribute('src'); video.load();
};
const openFilm = () => {
  const p = projects[cur];
  if (!p.src) return;
  filmOn = true;
  // modal-open ipek zeminin çizimini durdurur: film oynarken arkada hareket kalmaz.
  document.body.classList.add('y-film', 'modal-open');
  note.textContent = '';
  playText.textContent = 'Kapağa dön';
  video.setAttribute('aria-label', p.about);
  video.src = p.src;
  video.play().catch(() => {});
  apply(false);
  video.focus({ preventScroll: true });
};
const show = (i, keepUrl) => {
  const n = wrap(i);
  if (filmOn) closeFilm();
  note.textContent = '';
  cur = n;
  const p = projects[cur];
  nameEl.textContent = p.name; kindEl.textContent = p.kind; moreEl.href = '#' + p.id;
  projects.forEach((x, j) => {
    if (x.link) x.link.setAttribute('aria-current', j === cur ? 'true' : 'false');
  });
  [p.section, ...order.filter(x => x !== p.section)].forEach(x => listParent.insertBefore(x, listEnd));
  playBtn.hidden = !p.src;
  document.body.classList.toggle('y-filmsiz', !p.src);
  if (!keepUrl) history.replaceState(null, '', '#' + p.id);
  apply(true);
};

// Sayfayı ancak her şey hazırken değiştir.
projects.forEach(p => { if (p.link) index.append(p.link); });
const skip = document.querySelector('.skip');
if (skip) skip.setAttribute('href', '#filmler');
document.body.classList.add('yelpaze');
open.append(stage, bar);
bar.append(info, index, actions);
open.append(note);

const startId = location.hash.slice(1);
const startAt = projects.findIndex(p => p.id === startId);
measure();
show(startAt < 0 ? 0 : startAt, true);
if (startAt >= 0) addEventListener('load', () => stage.scrollIntoView({ block: 'center' }), { once: true });

playBtn.addEventListener('click', () => { if (filmOn) { closeFilm(); apply(false); } else openFilm(); });
prev.addEventListener('click', () => show(cur - 1));
next.addEventListener('click', () => show(cur + 1));
index.addEventListener('click', e => {
  const a = e.target.closest('a');
  if (!a) return;
  const i = projects.findIndex(p => p.link === a);
  if (i < 0) return;
  e.preventDefault();
  show(i);
});
addEventListener('hashchange', () => {
  const i = projects.findIndex(p => p.id === location.hash.slice(1));
  if (i >= 0 && i !== cur) { show(i, true); stage.scrollIntoView({ block: 'center' }); }
});
stage.addEventListener('keydown', e => {
  if (e.target === video) return;
  if (e.key === 'ArrowLeft') { e.preventDefault(); show(cur - 1); }
  else if (e.key === 'ArrowRight') { e.preventDefault(); show(cur + 1); }
});
document.addEventListener('keydown', e => { if (e.key === 'Escape' && filmOn) { closeFilm(); apply(false); playBtn.focus(); } });
let downX = null, dragged = false;
stage.addEventListener('pointerdown', e => { downX = e.target === video ? null : e.clientX; dragged = false; });
addEventListener('pointerup', e => {
  if (downX === null) return;
  const dx = e.clientX - downX;
  downX = null;
  if (Math.abs(dx) > 40) { dragged = true; show(cur + (dx < 0 ? 1 : -1)); }
});
stage.addEventListener('click', e => {
  if (dragged) { dragged = false; return; }
  const d = e.target.closest && e.target.closest('.y-panel');
  if (!d) return;
  const i = +d.dataset.sira;
  if (i === cur) { if (!filmOn) openFilm(); } else show(i);
});
video.addEventListener('ended', () => { if (filmOn) { closeFilm(); apply(false); } });
video.addEventListener('error', () => {
  if (!filmOn) return;
  const src = video.getAttribute('src');
  closeFilm(); apply(false);
  note.innerHTML = `Film açılamadı, kapak gösteriliyor. <a href="${src}" target="_blank" rel="noopener">Dosyayı ayrı açın</a>.`;
});
// Aynı anda tek film: Quinzell'in sayfadaki diğer filmleriyle de geçerli.
document.addEventListener('play', e => {
  document.querySelectorAll('video').forEach(v => { if (v !== e.target) v.pause(); });
}, true);
if ('IntersectionObserver' in window) new IntersectionObserver(g => { if (!g[0].isIntersecting && filmOn) video.pause(); }, { threshold: .15 }).observe(stage);
document.addEventListener('visibilitychange', () => { if (document.hidden) video.pause(); });
if ('ResizeObserver' in window) new ResizeObserver(measure).observe(stage);
addEventListener('resize', measure);
})();
