// Ana sayfa: proje penceresi. Pencere içeriği araclar/sayfalari_uret.py ile aynı düzendedir.
(() => {
'use strict';
const projects=window.MON_PROJECTS.filter(p=>!p.gizli);
const dialog=document.querySelector('#project-dialog');
const content=document.querySelector('#dialog-content');
const EN=document.documentElement.lang==='en';
const MEDYA=EN?'../medya':'medya',SAYFA=EN?'projects':'projeler';
const YAZI=EN?{izle:'Watch the film',fikir:'Purpose and idea',is:'What MON handled',cikti:'Outputs and formats',statu:'Status',yaz:'Write to us about a project like this',sonraki:'Next project'}:{izle:'Filmi izle',fikir:'Amaç ve fikir',is:'MON’un üstlendiği işler',cikti:'Üretilen çıktılar ve formatlar',statu:'Statü',yaz:'Böyle bir proje için yazın',sonraki:'Sıradaki proje'};
const MAIL=`mailto:hello@mondigital.ai?subject=${EN?'Mon%20Digital%20project%20enquiry':'Mon%20Digital%20proje%20g%C3%B6r%C3%BC%C5%9Fmesi'}`;
let opener=null;
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const still=([file,caption,w,h])=>`<figure><img src="${MEDYA}/${file}.jpg" alt="${escape(caption)}" width="${w}" height="${h}" loading="lazy" decoding="async"><figcaption>${escape(caption)}</figcaption></figure>`;
function openProject(id,trigger){
 const p=projects.find(p=>p.id===id);if(!p)return;
 stopVideos();document.querySelectorAll('main video:not(.film-teaser)').forEach(v=>v.pause());opener=trigger||opener;
 const videos=p.gorselOnly?[]:p.films||[[p.video||p.id,p.title,p.duration]];
 const films=p.gorselOnly?`<figure class="detail-film"><div class="film-frame"><img src="${MEDYA}/${p.cover||p.id+'-kapak'}.jpg" alt="${escape(p.alt)}" width="720" height="1280"></div></figure>`:videos.map(([v,label,time])=>`<figure class="detail-film film-player"><div class="film-frame"><video controls playsinline preload="none" poster="${MEDYA}/${v}-kapak.jpg" src="${MEDYA}/${v}.mp4" aria-label="${escape(p.name)}: ${escape(label)}"></video><button type="button" class="film-play"><span aria-hidden="true">▶</span> ${YAZI.izle} <small>${escape(time)}</small></button></div><figcaption>${escape(label)}</figcaption><p class="media-error" role="status" hidden></p></figure>`).join('');
 const flow=p.flow?`<p class="chain-flow">${p.flow.map(escape).join('<span aria-hidden="true"> → </span>')}</p>`:'';
 const board=p.board?`<section class="detail-chain detail-board"><p>${escape(p.board.text)}</p><div class="asamalar"><figure class="asama"><figcaption><span>1</span>${escape(p.board.label)}</figcaption><div class="pano-ciftler">${p.board.files.map(([f,a])=>`<img src="${MEDYA}/${f}.jpg" alt="${escape(a)}" width="${p.board.w}" height="${p.board.h}" loading="lazy" decoding="async">`).join('')}</div><p class="asama-not">${escape(p.board.note)}</p></figure><figure class="asama"><figcaption><span>2</span>${escape(p.board.campaign.label)}</figcaption><div class="kampanya-kareler">${p.board.campaign.items.map(([f,a])=>`<img src="${MEDYA}/${f}.jpg" alt="${escape(a)}" width="${p.board.campaign.w}" height="${p.board.campaign.h}" loading="lazy" decoding="async">`).join('')}</div></figure>${p.board.film?`<figure class="asama asama-film"><figcaption><span>3</span>${escape(p.board.film.label)}</figcaption><div class="film-bos" aria-hidden="true"></div></figure>`:''}</div></section>`:'';
 const facts=[[YAZI.fikir,p.idea],[YAZI.is,p.role],[YAZI.cikti,p.outputs],[YAZI.statu,p.status]].map(([k,v])=>`<div><dt>${k}</dt><dd>${escape(v)}</dd></div>`).join('');
 const chains=(p.chains||[]).map(c=>`<section class="detail-chain"><h3>${escape(c.title)}</h3><div class="detail-gallery compact">${c.items.map(still).join('')}</div></section>`).join('');
 const gallery=p.stills.length?`<div class="detail-gallery">${p.stills.map(still).join('')}</div>`:'';
 const next=projects[(projects.indexOf(p)+1)%projects.length];
 content.innerHTML=`<div class="detail-head"><p class="work-tag">${escape(p.tag)}</p><h2 id="dialog-title">${escape(p.name)}</h2><p class="detail-line">${escape(p.title)}</p></div><div class="detail-layout${p.films?' many':''}"><div class="film-list">${films}</div><div class="detail-copy"><dl class="facts">${facts}</dl>${p.credit?`<p class="credit-note">${escape(p.credit)}</p>`:''}<a class="text-link" href="${MAIL}">${YAZI.yaz}</a></div></div>${board}${flow}${chains}${gallery}<a class="next-project" href="${SAYFA}/${next.id}.html" data-project="${next.id}"><span>${YAZI.sonraki}: ${escape(next.name)}</span><span aria-hidden="true">↗</span></a>`;
 window.MON_initPlayers(content);
 if(!dialog.open)dialog.showModal();document.body.classList.add('modal-open');dialog.scrollTop=0;dialog.querySelector('.close-dialog').focus();
}
function stopVideos(){content.querySelectorAll('video').forEach(v=>{v.pause();v.removeAttribute('src');v.load()})}
function cleanClose(){if(dialog.open)return;stopVideos();document.body.classList.remove('modal-open');content.innerHTML='';if(opener&&document.contains(opener))opener.focus()}
dialog.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',cleanClose);
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});

document.addEventListener('click',e=>{
 const a=e.target.closest('[data-project]');if(a&&typeof dialog.showModal==='function'){e.preventDefault();openProject(a.dataset.project,dialog.contains(a)?opener:a)}
});
})();
