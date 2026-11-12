// Seçilmiş işler: kareler hareket eder. Ekranda en çok görünen projenin kareleri sırayla,
// her seferinde yalnızca biri oynar; klip bitince kare durağan hâline döner ve sıradaki başlar.
// Azaltılmış hareket veya veri tasarrufunda klipler hiç yüklenmez, durağan kareler kalır.
(() => {
'use strict';
const isler = [...document.querySelectorAll('.work-feature')]
  .map(el => ({ el, klipler: [...el.querySelectorAll('.kare-film')], sira: 0, oran: 0 }))
  .filter(is => is.klipler.length);
const azalt = matchMedia('(prefers-reduced-motion:reduce)').matches;
const tasarruf = navigator.connection && navigator.connection.saveData;
if (azalt || tasarruf || !('IntersectionObserver' in window)) { isler.forEach(is => is.klipler.forEach(v => v.remove())); return; }
if (!isler.length) return;

let aktif = null;
const oynat = is => {
  for (let n = 0; n < is.klipler.length; n++) {            // açılamayan klibi atla
    const v = is.klipler[is.sira];
    if (!v.dataset.bozuk) {
      if (!v.getAttribute('src')) v.src = v.dataset.src;
      const sonuc = v.play();
      if (sonuc && sonuc.catch) sonuc.catch(() => {});
      return;
    }
    is.sira = (is.sira + 1) % is.klipler.length;
  }
};
const durdur = is => is.klipler.forEach(v => { v.pause(); v.classList.remove('on'); });

isler.forEach(is => is.klipler.forEach((v, i) => {
  v.addEventListener('playing', () => { if (aktif === is) v.classList.add('on'); });
  v.addEventListener('ended', () => {
    v.classList.remove('on');                               // durağan kareye yumuşak dönüş
    setTimeout(() => { try { v.currentTime = 0; } catch (e) {} }, 550);
    is.sira = (i + 1) % is.klipler.length;
    if (aktif === is && !document.hidden) oynat(is);
  });
  v.addEventListener('error', () => {
    v.dataset.bozuk = '1'; v.classList.remove('on');
    if (aktif === is && is.sira === i) { is.sira = (i + 1) % is.klipler.length; oynat(is); }
  });
}));

const sec = () => {
  const en = isler.reduce((a, b) => (b.oran > a.oran ? b : a));
  const yeni = en.oran >= 0.35 ? en : null;
  if (yeni === aktif) return;
  if (aktif) durdur(aktif);
  aktif = yeni;
  if (aktif && !document.hidden) oynat(aktif);
};
const gozcu = new IntersectionObserver(kayitlar => {
  kayitlar.forEach(k => { const is = isler.find(x => x.el === k.target); if (is) is.oran = k.isIntersecting ? k.intersectionRatio : 0; });
  sec();
}, { threshold: [0, 0.2, 0.35, 0.5, 0.65, 0.8, 1] });
isler.forEach(is => gozcu.observe(is.el));
document.addEventListener('visibilitychange', () => { if (!document.hidden && aktif) oynat(aktif); });
})();
