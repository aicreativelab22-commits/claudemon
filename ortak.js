// Ana sayfa, proje ve hizmetler sayfalarında ortak: video oynatıcı, karar noktaları, telefon menüsü.
(() => {
'use strict';
const SLOW_MS=15000;
function message(fig,text){
 const box=fig.querySelector('.media-error');if(!box)return;
 const src=fig.querySelector('video').currentSrc||fig.querySelector('video').getAttribute('src');
 box.textContent=text+' ';
 const link=document.createElement('a');link.href=src;link.target='_blank';link.rel='noopener';link.textContent='Videoyu ayrı sekmede aç';
 box.append(link);box.hidden=false;
}
function setup(fig){
 if(fig.dataset.ready)return;fig.dataset.ready='1';
 const video=fig.querySelector('video'),button=fig.querySelector('.film-play');
 if(!video||!button)return;
 video.controls=false;
 let timer=0;
 const clear=()=>{clearTimeout(timer);timer=0};
 button.addEventListener('click',()=>{
  fig.classList.add('is-playing');video.controls=true;
  const box=fig.querySelector('.media-error');if(box)box.hidden=true;
  timer=setTimeout(()=>{if(video.readyState<3)message(fig,'Video yavaş yükleniyor.')},SLOW_MS);
  const result=video.play();
  if(result&&result.catch)result.catch(err=>{clear();if(err.name!=='AbortError')message(fig,'Video açılamadı.')});
 });
 video.addEventListener('playing',()=>{clear();const box=fig.querySelector('.media-error');if(box)box.hidden=true});
 video.addEventListener('error',()=>{clear();fig.classList.remove('is-playing');video.controls=false;message(fig,'Video açılamadı.')});
}
window.MON_initPlayers=root=>root.querySelectorAll('.film-player').forEach(setup);
window.MON_initPlayers(document);
// Aynı anda tek video çalışır; sekme gizlenince durur.
document.addEventListener('play',e=>document.querySelectorAll('video').forEach(v=>{if(v!==e.target)v.pause()}),true);
document.addEventListener('visibilitychange',()=>{if(document.hidden)document.querySelectorAll('video').forEach(v=>v.pause())});
document.addEventListener('click',e=>{
 const d=e.target.closest('[data-decision]');
 if(d)d.closest('.decisions').querySelectorAll('[data-decision]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.decision===d.dataset.decision)));
});
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('#ana-menu');
if(toggle&&nav){
 const set=open=>{toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'Kapat':'Menü';nav.classList.toggle('open',open)};
 toggle.addEventListener('click',()=>set(toggle.getAttribute('aria-expanded')!=='true'));
 nav.addEventListener('click',e=>{if(e.target.closest('a'))set(false)});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){set(false);toggle.focus()}});
}
})();
