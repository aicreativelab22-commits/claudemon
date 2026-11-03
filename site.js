(() => {
'use strict';
const projects=window.MON_PROJECTS;
const dialog=document.querySelector('#project-dialog');
const content=document.querySelector('#dialog-content');
let opener=null;
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function openProject(id,trigger){
 const p=projects.find(p=>p.id===id);if(!p)return;
 stopVideos();document.querySelectorAll('main video').forEach(v=>v.pause());opener=trigger||opener;
 const videos=p.films||[[p.id,p.title,p.duration]];
 const films=videos.map(([v,label,time])=>`<figure class="detail-film"><video controls playsinline preload="none" poster="medya/${v}-kapak.jpg" src="medya/${v}.mp4" aria-label="${escape(p.name)}: ${escape(label)}"></video><figcaption>${escape(label)} · ${time}</figcaption><div class="video-tools"><button type="button" data-fullscreen>Tam ekran ↗</button><a href="medya/${v}.mp4" target="_blank" rel="noopener">Videoyu ayrı aç ↗</a></div><p class="media-error" role="status" hidden></p></figure>`).join('');
 const gallery=p.stills.map(s=>{const [file,caption]=Array.isArray(s)?s:[s,'Seçilmiş proje görseli'];return `<figure><img src="medya/${file}.jpg" alt="${escape(p.name)} — ${Array.isArray(s)?escape(caption):file.includes('pano')?'kampanya görsel seçkisi':'proje görseli'}" loading="lazy"><figcaption>${escape(caption)}</figcaption></figure>`}).join('');
 const decisions=p.decisions?`<section class="decisions"><div class="decision-media"><img src="medya/${p.decisions.image}.jpg" alt="${escape(p.alt)}" loading="lazy">${p.decisions.items.map(([x,y,title],i)=>`<button type="button" class="decision-spot" style="left:${x}%;top:${y}%" data-decision="${i}" aria-pressed="${!i}" aria-label="${escape(title)}">${i+1}</button>`).join('')}</div><div><h3>Yaratıcı kararlar</h3><ol class="decision-list">${p.decisions.items.map(([,,title,text],i)=>`<li><button type="button" class="decision-row" data-decision="${i}" aria-pressed="${!i}"><span>0${i+1}</span><strong>${escape(title)}</strong><small>${escape(text)}</small></button></li>`).join('')}</ol></div></section>`:'';
 const next=projects[(projects.indexOf(p)+1)%projects.length];
 content.innerHTML=`<div class="detail-head"><p class="eyebrow">${escape(p.kind)} / ${p.duration}</p><h2 id="dialog-title">${escape(p.name)}</h2><p>${escape(p.title)}</p></div><div class="detail-layout"><div class="film-list">${films}</div><div class="detail-copy"><h3>Fikir</h3><p>${escape(p.idea)}</p>${p.steps?`<h3>Nasıl yaptık</h3>`+p.steps.map(s=>`<p><strong>${escape(s[0])}</strong><br>${escape(s[1])}</p>`).join(''):`<h3>Çalışmanın kapsamı</h3><p>${escape(p.role)}</p>`}${p.note?`<p class="credit-note">${escape(p.note)}</p>`:''}<a class="text-link" href="https://www.instagram.com/mondigital.ai/" target="_blank" rel="noopener noreferrer">Böyle bir proje konuşalım ↗</a></div></div>${decisions}<div class="detail-gallery${p.stills.length>2?' compact':''}">${gallery}</div><a class="next-project" href="projeler/${next.id}.html" data-project="${next.id}"><span>Sıradaki proje / ${escape(next.name)}</span><span aria-hidden="true">→</span></a>`;
 content.querySelectorAll('video').forEach(v=>{
  v.addEventListener('play',()=>content.querySelectorAll('video').forEach(other=>{if(other!==v)other.pause()}));
  v.addEventListener('error',()=>{const msg=v.closest('figure').querySelector('.media-error');msg.hidden=false;msg.textContent='Video açılamadı. “Videoyu ayrı aç” bağlantısını deneyin.'});
 });
 if(!dialog.open)dialog.showModal();document.body.classList.add('modal-open');dialog.scrollTop=0;dialog.querySelector('.close-dialog').focus();
}
function stopVideos(){content.querySelectorAll('video').forEach(v=>{v.pause();v.removeAttribute('src');v.load()})}
function cleanClose(){stopVideos();document.body.classList.remove('modal-open');content.innerHTML='';if(opener&&document.contains(opener))opener.focus()}
dialog.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',cleanClose);
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
document.addEventListener('click',e=>{
 const a=e.target.closest('[data-project]');if(a&&typeof dialog.showModal==='function'){e.preventDefault();openProject(a.dataset.project,dialog.contains(a)?opener:a)}
 const decision=e.target.closest('[data-decision]');if(decision)decision.closest('.decisions').querySelectorAll('[data-decision]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.decision===decision.dataset.decision)));
 const full=e.target.closest('[data-fullscreen]');if(full){const v=full.closest('figure').querySelector('video');const msg=full.closest('figure').querySelector('.media-error');try{const result=v.requestFullscreen?v.requestFullscreen():v.webkitEnterFullscreen?v.webkitEnterFullscreen():null;if(result&&result.catch)result.catch(()=>{msg.hidden=false;msg.textContent='Tarayıcınızın video kontrolündeki tam ekran düğmesini kullanın.'})}catch{msg.hidden=false;msg.textContent='Videoyu ayrı açarak tam ekran izleyebilirsiniz.'}}
});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));let count=0;document.querySelectorAll('.project-grid .project').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&!card.dataset.category.split(' ').includes(button.dataset.filter);if(!card.hidden)count++});document.querySelector('#filter-status').textContent=`${count} proje gösteriliyor.`}));
document.addEventListener('visibilitychange',()=>{if(document.hidden)document.querySelectorAll('video').forEach(v=>v.pause())});
})();
