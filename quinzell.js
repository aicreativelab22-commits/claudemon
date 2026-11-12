// Ana sayfa, Quinzell bölümü: manken ile model arasında sürüklenen önce/sonra.
// Kaydırıcı gerçek bir <input type="range">: fare, dokunma ve klavye ok tuşlarıyla çalışır.
(() => {
'use strict';
const kutu = document.querySelector('#q-ba'), kaydirici = document.querySelector('#q-ba-range');
if (!kutu || !kaydirici) return;
let dokunuldu = false;
const ayarla = deger => kutu.style.setProperty('--pos', deger + '%');
kaydirici.addEventListener('input', () => { dokunuldu = true; ayarla(kaydirici.value); });
ayarla(kaydirici.value);
// Bölüm ilk göründüğünde tutamak bir kez kayar; ziyaretçi dokunursa durur. Azaltılmış harekette yapılmaz.
if (matchMedia('(prefers-reduced-motion:reduce)').matches || !('IntersectionObserver' in window)) return;
const gozcu = new IntersectionObserver(kayitlar => {
  if (!kayitlar[0].isIntersecting || dokunuldu) return;
  gozcu.disconnect();
  const t0 = performance.now(), bas = 88, son = 38, sure = 2000;
  const adim = t => {
    if (dokunuldu) return;
    const k = Math.min(1, (t - t0) / sure), e = 1 - Math.pow(1 - k, 3), deger = bas + (son - bas) * e;
    kaydirici.value = deger; ayarla(deger);
    if (k < 1) requestAnimationFrame(adim);
  };
  requestAnimationFrame(adim);
}, { threshold: 0.5 });
gozcu.observe(kutu);
})();
