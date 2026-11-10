# projeler.js ve en/projeler.js içeriğinden JavaScript'siz de açılan proje sayfalarını üretir (projeler/, en/projects/).
# Düzen, site.js içindeki proje penceresiyle aynıdır. Çalıştırma: python araclar/sayfalari_uret.py
import html
import json
import os

KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
e = html.escape
DILLER = {
    'tr': dict(veri='projeler.js', klasor='projeler', ust='../', karsi='../en/projects', karsi_kod='en', karsi_ad='English',
               konu='Mon%20Digital%20proje%20g%C3%B6r%C3%BC%C5%9Fmesi', izle='Filmi izle', fikir='Amaç ve fikir', is_='MON’un üstlendiği işler',
               cikti='Üretilen çıktılar ve formatlar', statu='Statü', yaz='Böyle bir proje için yazın', sonraki='Sıradaki proje',
               geri='Ana sayfaya dön', ana='Mon Digital ana sayfa', adres='Zekeriyaköy, Sarıyer, İstanbul'),
    'en': dict(veri='en/projeler.js', klasor='en/projects', ust='../../', karsi='../../projeler', karsi_kod='tr', karsi_ad='Türkçe',
               konu='Mon%20Digital%20project%20enquiry', izle='Watch the film', fikir='Purpose and idea', is_='What MON handled',
               cikti='Outputs and formats', statu='Status', yaz='Write to us about a project like this', sonraki='Next project',
               geri='Back to home', ana='Mon Digital home', adres='Zekeriyaköy, Sarıyer, Istanbul'),
}


def gorsel(s, ust):
    dosya, yazi, w, h = s
    return (f'<figure><img src="{ust}medya/{dosya}.jpg" alt="{e(yazi)}" width="{w}" height="{h}" loading="lazy" decoding="async">'
            f'<figcaption>{e(yazi)}</figcaption></figure>')


def uret(dil, D):
    kaynak = open(os.path.join(KOK, D['veri']), encoding='utf-8').read()
    projeler = [p for p in json.loads(kaynak[kaynak.index('['):kaynak.rindex(']') + 1]) if not p.get('gizli')]
    ust = D['ust']
    ana = ust + ('en/index.html' if dil == 'en' else 'index.html')
    MAIL = f"mailto:hello@mondigital.ai?subject={D['konu']}"
    os.makedirs(os.path.join(KOK, D['klasor']), exist_ok=True)
    for i, p in enumerate(projeler):
        videolar = [] if p.get('gorselOnly') else p.get('films') or [[p.get('video', p['id']), p['title'], p['duration']]]
        filmler = ''.join(
            f'<figure class="detail-film film-player"><div class="film-frame"><video controls playsinline preload="none" poster="{ust}medya/{v}-kapak.jpg" '
            f'src="{ust}medya/{v}.mp4" aria-label="{e(p["name"])}: {e(ad)}"></video><button type="button" class="film-play"><span aria-hidden="true">▶</span> '
            f'{D["izle"]} <small>{e(sure)}</small></button></div><figcaption>{e(ad)}</figcaption><p class="media-error" role="status" hidden></p></figure>'
            for v, ad, sure in videolar) or f'<figure class="detail-film"><div class="film-frame"><img src="{ust}medya/{p.get("cover", p["id"] + "-kapak")}.jpg" alt="{e(p["alt"], quote=True)}" width="720" height="1280"></div></figure>'
        pano = p.get('board')
        if pano:
            k = pano['campaign']
            ciftler = ''.join('<div class="os-grup"><div class="os-kareler">' + ''.join(f'<img src="{ust}medya/{f}.jpg" alt="{e(a, quote=True)}" width="{pano["w"]}" height="{pano["h"]}" loading="lazy" decoding="async">' for f, a in g['items'])
                              + f'</div><p class="os-etiket">{e(g["label"])}</p></div>' for g in pano['groups'])
            film = (f'<figure class="asama asama-film"><figcaption><span>3</span>{e(pano["film"]["label"])}</figcaption>'
                    + (f'<div class="film-bos film-player"><div class="film-frame"><video controls playsinline preload="none" poster="{ust}medya/{pano["film"]["video"]}-kapak.jpg" '
                       f'src="{ust}medya/{pano["film"]["video"]}.mp4" aria-label="{e(p["name"])}: {e(pano["film"]["label"])}"></video><button type="button" class="film-play"><span aria-hidden="true">▶</span> '
                       f'{D["izle"]} <small>{e(pano["film"]["duration"])}</small></button></div><p class="media-error" role="status" hidden></p></div>'
                       if pano['film'].get('video') else '<div class="film-bos" aria-hidden="true"></div>') + '</figure>') if pano.get('film') else ''
            kareler = ''.join(f'<img src="{ust}medya/{f}.jpg" alt="{e(a, quote=True)}" width="{k["w"]}" height="{k["h"]}" loading="lazy" decoding="async">' for f, a in k['items'])
            pano = (f'<section class="detail-chain detail-board"><p>{e(pano["text"])}</p><div class="asamalar"><figure class="asama"><figcaption><span>1</span>{e(pano["label"])}</figcaption>'
                    f'<div class="once-sonra">{ciftler}</div><p class="asama-not">{e(pano["note"])}</p></figure>'
                    f'<figure class="asama"><figcaption><span>2</span>{e(k["label"])}</figcaption><div class="kampanya-kareler">{kareler}</div></figure>{film}</div></section>')
        else:
            pano = ''
        akis = ('<p class="chain-flow">' + '<span aria-hidden="true"> → </span>'.join(e(a) for a in p['flow']) + '</p>') if p.get('flow') else ''
        bilgiler = ''.join(f'<div><dt>{k}</dt><dd>{e(v)}</dd></div>' for k, v in (
            (D['fikir'], p['idea']), (D['is_'], p['role']),
            (D['cikti'], p['outputs']), (D['statu'], p['status'])))
        kredi = f'<p class="credit-note">{e(p["credit"])}</p>' if p.get('credit') else ''
        diziler = ''.join(
            f'<section class="detail-chain"><h2>{e(c["title"])}</h2><div class="detail-gallery compact">{"".join(gorsel(s, ust) for s in c["items"])}</div></section>'
            for c in p.get('chains', []))
        galeri = f'<div class="detail-gallery">{"".join(gorsel(s, ust) for s in p["stills"])}</div>' if p['stills'] else ''
        sonraki = projeler[(i + 1) % len(projeler)]
        aciklama = e(p['idea'], quote=True)
        baslik = e(f'{p["name"]} | Mon Digital')
        kapak = videolar[0][0] + '-kapak' if videolar else p.get('cover', p['id'] + '-kapak')
        sayfa = f'''<!doctype html>
<html lang="{dil}">
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
<meta property="og:image" content="{ust}medya/{kapak}.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="{ust}stil.css">
<link rel="icon" href="{ust}ikon.svg" type="image/svg+xml">
</head>
<body class="detail-page">
<header class="site-header"><a class="logo" href="{ana}" aria-label="{D["ana"]}"><img src="{ust}medya/mon-logo-mark.png" alt="MON" width="150" height="50"></a><div class="detail-links"><a class="detail-back" href="{ana}#secili-isler">{D["geri"]}</a><a class="detail-back lang-link" href="{D["karsi"]}/{p["id"]}.html" hreflang="{D["karsi_kod"]}" lang="{D["karsi_kod"]}" aria-label="{D["karsi_ad"]}">{D["karsi_kod"].upper()}</a></div></header>
<main class="detail">
<div class="detail-head"><p class="work-tag">{e(p["tag"])}</p><h1>{e(p["name"])}</h1><p class="detail-line">{e(p["title"])}</p></div>
<div class="detail-layout{" many" if p.get("films") else ""}"><div class="film-list">{filmler}</div><div class="detail-copy"><dl class="facts">{bilgiler}</dl>{kredi}<a class="text-link" href="{MAIL}">{D["yaz"]}</a></div></div>
{pano}{akis}{diziler}{galeri}
<a class="next-project" href="{sonraki["id"]}.html"><span>{D["sonraki"]}: {e(sonraki["name"])}</span><span aria-hidden="true">↗</span></a>
</main>
<footer class="site-footer"><address>Mon Digital<br>{D["adres"]}</address><a href="mailto:hello@mondigital.ai">hello@mondigital.ai</a></footer>
<script src="{ust}ortak.js"></script>
</body>
</html>
'''
        open(os.path.join(KOK, D['klasor'], p['id'] + '.html'), 'w', encoding='utf-8', newline='\n').write(sayfa)
    print(len(projeler), dil, 'sayfa üretildi')


for dil, D in DILLER.items():
    uret(dil, D)
