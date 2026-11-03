# projeler.js içeriğinden JavaScript'siz de açılan projeler/*.html sayfalarını üretir.
# Düzen, site.js içindeki proje penceresiyle aynıdır. Çalıştırma: python araclar/sayfalari_uret.py
import html
import json
import os

KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAIL = 'mailto:hello@mondigital.ai?subject=Mon%20Digital%20proje%20g%C3%B6r%C3%BC%C5%9Fmesi'
e = html.escape
kaynak = open(os.path.join(KOK, 'projeler.js'), encoding='utf-8').read()
projeler = json.loads(kaynak[kaynak.index('['):kaynak.rindex(']') + 1])


def gorsel(s):
    dosya, yazi, w, h = s
    return (f'<figure><img src="../medya/{dosya}.jpg" alt="{e(yazi)}" width="{w}" height="{h}" loading="lazy" decoding="async">'
            f'<figcaption>{e(yazi)}</figcaption></figure>')


for i, p in enumerate(projeler):
    videolar = p.get('films') or [[p['id'], p['title'], p['duration']]]
    filmler = ''.join(
        f'<figure class="detail-film film-player"><div class="film-frame"><video controls playsinline preload="none" poster="../medya/{v}-kapak.jpg" '
        f'src="../medya/{v}.mp4" aria-label="{e(p["name"])}: {e(ad)}"></video><button type="button" class="film-play"><span aria-hidden="true">▶</span> '
        f'Filmi izle <small>{e(sure)}</small></button></div><figcaption>{e(ad)}</figcaption><p class="media-error" role="status" hidden></p></figure>'
        for v, ad, sure in videolar)
    bilgiler = ''.join(f'<div><dt>{k}</dt><dd>{e(v)}</dd></div>' for k, v in (
        ('Amaç ve fikir', p['idea']), ('MON’un üstlendiği işler', p['role']),
        ('Üretilen çıktılar ve formatlar', p['outputs']), ('Statü', p['status'])))
    kredi = f'<p class="credit-note">{e(p["credit"])}</p>' if p.get('credit') else ''
    kararlar = ''
    if p.get('decisions'):
        d = p['decisions']
        noktalar = ''.join(
            f'<button type="button" class="decision-spot" style="left:{x}%;top:{y}%" data-decision="{n}" aria-pressed="{"true" if n == 0 else "false"}" '
            f'aria-label="{e(t)}">{n + 1}</button>' for n, (x, y, t, _) in enumerate(d['items']))
        satirlar = ''.join(
            f'<li><button type="button" class="decision-row" data-decision="{n}" aria-pressed="{"true" if n == 0 else "false"}"><span>{n + 1}</span>'
            f'<strong>{e(t)}</strong><small>{e(c)}</small></button></li>' for n, (_, _, t, c) in enumerate(d['items']))
        kararlar = (f'<section class="decisions"><div class="decision-media"><img src="../medya/{d["image"]}.jpg" alt="{e(p["alt"])}" width="720" height="1280" '
                    f'loading="lazy" decoding="async">{noktalar}</div><div><h2>Yaratıcı kararlar</h2><ol class="decision-list">{satirlar}</ol></div></section>')
    diziler = ''.join(
        f'<section class="detail-chain"><h2>{e(c["title"])}</h2><div class="detail-gallery compact">{"".join(gorsel(s) for s in c["items"])}</div></section>'
        for c in p.get('chains', []))
    galeri = f'<div class="detail-gallery">{"".join(gorsel(s) for s in p["stills"])}</div>' if p['stills'] else ''
    sonraki = projeler[(i + 1) % len(projeler)]
    aciklama = e(p['idea'], quote=True)
    baslik = e(f'{p["name"]} | Mon Digital')
    kapak = videolar[0][0]
    sayfa = f'''<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#14241f">
<title>{baslik}</title>
<meta name="description" content="{aciklama}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Mon Digital">
<meta property="og:title" content="{baslik}">
<meta property="og:description" content="{aciklama}">
<meta property="og:image" content="../medya/{kapak}-kapak.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="../stil.css">
<link rel="icon" href="../ikon.svg" type="image/svg+xml">
</head>
<body class="detail-page">
<header class="site-header"><a class="logo" href="../index.html" aria-label="Mon Digital ana sayfa"><img src="../medya/mon-logo-mark.png" alt="MON" width="150" height="50"></a><a class="detail-back" href="../index.html#portfolyo">Portfolyoya dön</a></header>
<main class="detail">
<div class="detail-head"><p class="work-tag">{e(p["tag"])}</p><h1>{e(p["name"])}</h1><p class="detail-line">{e(p["title"])}</p></div>
<div class="detail-layout{" many" if p.get("films") else ""}"><div class="film-list">{filmler}</div><div class="detail-copy"><dl class="facts">{bilgiler}</dl>{kredi}<a class="text-link" href="{MAIL}">Böyle bir proje için yazın</a></div></div>
{kararlar}{diziler}{galeri}
<a class="next-project" href="{sonraki["id"]}.html"><span>Sıradaki proje: {e(sonraki["name"])}</span><span aria-hidden="true">↗</span></a>
</main>
<footer class="site-footer"><span>Mon Digital</span><a href="mailto:hello@mondigital.ai">hello@mondigital.ai</a></footer>
<script src="../ortak.js"></script>
</body>
</html>
'''
    open(os.path.join(KOK, 'projeler', p['id'] + '.html'), 'w', encoding='utf-8', newline='\n').write(sayfa)
print(len(projeler), 'sayfa üretildi')
