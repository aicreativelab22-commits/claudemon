// Ana sayfa "Çalışma biçimi": ay evrelerinin üstündeki çizgi, bölüm ekrana girdikçe soldan sağa dolar.
// Azaltılmış harekette çizgi dolu durur.
(() => {
'use strict';
const adimlar = document.querySelector('.about-steps');
if (!adimlar || !adimlar.querySelector('.ay-cizgi') || matchMedia('(prefers-reduced-motion:reduce)').matches) return;
const ayarla = () => {
  const kutu = adimlar.getBoundingClientRect(), yukseklik = innerHeight;
  const oran = (yukseklik * 0.85 - kutu.top) / (yukseklik * 0.2 + kutu.height);
  adimlar.style.setProperty('--p', Math.max(0, Math.min(1, oran)).toFixed(4));
};
ayarla();
addEventListener('scroll', ayarla, { passive: true });
addEventListener('resize', ayarla);
})();
