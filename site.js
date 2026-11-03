// Ana sayfa: proje penceresi. Pencere içeriği araclar/sayfalari_uret.py ile aynı düzendedir.
(() => {
'use strict';
const projects=window.MON_PROJECTS;
const dialog=document.querySelector('#project-dialog');
const content=document.querySelector('#dialog-content');
const MAIL='mailto:hello@mondigital.ai?subject=Mon%20Digital%20proje%20g%C3%B6r%C3%BC%C5%9Fmesi';
let opener=null;
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const still=([file,caption,w,h])=>`<figure><img src="medya/${file}.jpg" alt="${escape(caption)}" width="${w}" height="${h}" loading="lazy" decoding="async"><figcaption>${escape(caption)}</figcaption></figure>`;
function openProject(id,trigger){
 const p=projects.find(p=>p.id===id);if(!p)return;
 stopVideos();document.querySelectorAll('main video:not(.film-teaser)').forEach(v=>v.pause());opener=trigger||opener;
 const videos=p.gorselOnly?[]:p.films||[[p.id,p.title,p.duration]];
 const films=p.gorselOnly?`<figure class="detail-film"><div class="film-frame"><img src="medya/${p.id}-kapak.jpg" alt="${escape(p.alt)}" width="720" height="1280"></div></figure>`:videos.map(([v,label,time])=>`<figure class="detail-film film-player"><div class="film-frame"><video controls playsinline preload="none" poster="medya/${v}-kapak.jpg" src="medya/${v}.mp4" aria-label="${escape(p.name)}: ${escape(label)}"></video><button type="button" class="film-play"><span aria-hidden="true">▶</span> Filmi izle <small>${escape(time)}</small></button></div><figcaption>${escape(label)}</figcaption><p class="media-error" role="status" hidden></p></figure>`).join('');
 const flow=p.flow?`<p class="chain-flow">${p.flow.map(escape).join('<span aria-hidden="true"> → </span>')}</p>`:'';
 const facts=[['Amaç ve fikir',p.idea],['MON’un üstlendiği işler',p.role],['Üretilen çıktılar ve formatlar',p.outputs],['Statü',p.status]].map(([k,v])=>`<div><dt>${k}</dt><dd>${escape(v)}</dd></div>`).join('');
 const chains=(p.chains||[]).map(c=>`<section class="detail-chain"><h3>${escape(c.title)}</h3><div class="detail-gallery compact">${c.items.map(still).join('')}</div></section>`).join('');
 const gallery=p.stills.length?`<div class="detail-gallery">${p.stills.map(still).join('')}</div>`:'';
 const next=projects[(projects.indexOf(p)+1)%projects.length];
 content.innerHTML=`<div class="detail-head"><p class="work-tag">${escape(p.tag)}</p><h2 id="dialog-title">${escape(p.name)}</h2><p class="detail-line">${escape(p.title)}</p></div><div class="detail-layout${p.films?' many':''}"><div class="film-list">${films}</div><div class="detail-copy"><dl class="facts">${facts}</dl>${p.credit?`<p class="credit-note">${escape(p.credit)}</p>`:''}<a class="text-link" href="${MAIL}">Böyle bir proje için yazın</a></div></div>${flow}${chains}${gallery}<a class="next-project" href="projeler/${next.id}.html" data-project="${next.id}"><span>Sıradaki proje: ${escape(next.name)}</span><span aria-hidden="true">↗</span></a>`;
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
