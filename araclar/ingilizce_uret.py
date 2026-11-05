# İngilizce sayfaları Türkçe sayfalardan üretir: düzen tek yerde kalır, yalnızca metin ve yollar değişir.
# Türkçe metin değişince buradaki tablo da güncellenir; karşılığı bulunmayan Türkçe metin kalırsa betik durur.
# Çalıştırma: python araclar/ingilizce_uret.py (proje sayfaları için araclar/sayfalari_uret.py)
import os
import re

KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KONU_TR = 'Mon%20Digital%20proje%20g%C3%B6r%C3%BC%C5%9Fmesi'
KONU_EN = 'Mon%20Digital%20project%20enquiry'

TABLO = {
    # Baş bölümü
    'Mon Digital | Yaratıcı konsept, kampanya görseli ve reklam filmi': 'Mon Digital | Creative concepts, campaign visuals and ad films',
    'Mon Digital logosu ile Mentos, DAL ve Kremi çalışmalarından kareler': 'The Mon Digital logo with frames from the Mentos, DAL and Kremi projects',
    'Hizmetler | Mon Digital': 'Services | Mon Digital',
    'Mon Digital portfolyosu': 'Mon Digital portfolio',
    'content="Mon Digital\'in AI destekli filmleri, kampanya görselleri ve yaratıcı konseptleri."': 'content="Mon Digital’s AI-powered films, campaign visuals and creative concepts."',
    'AI destekli filmler, kampanya görselleri ve yaratıcı konseptler.': 'AI-powered films, campaign visuals and creative concepts.',
    # Gezinme
    'İçeriğe geç': 'Skip to content',
    'Projelere geç': 'Skip to projects',
    'Mon Digital ana sayfa': 'Mon Digital home',
    'aria-controls="ana-menu">Menü<': 'aria-controls="ana-menu">Menu<',
    'aria-label="Ana menü"': 'aria-label="Main menu"',
    '>Portfolyo</a>': '>Portfolio</a>',
    '>Hizmetler</a>': '>Services</a>',
    '>Hakkında</a>': '>About</a>',
    '>İletişim</a>': '>Contact</a>',
    '>Başa dön<': '>Back to top<',
    'aria-label="Projeyi kapat">Kapat <': 'aria-label="Close project">Close <',
    # Giriş
    'Mon Digital, AI destekli kreatif stüdyo': 'Mon Digital, an AI-powered creative studio',
    '>Projenizi anlatın <span': '>Tell us about your project <span',
    '>Projenizi anlatın<': '>Tell us about your project<',
    '>Portfolyoyu keşfedin<': '>Explore the portfolio<',
    # Seçilmiş işler
    '>Seçilmiş işler<': '>Selected work<',
    'Rumeli Hisarı önünde sahil yolu, Mentos filminden kare': 'The seaside road in front of Rumeli Hisarı, a frame from the Mentos film',
    'Elde tutulan Mentos paketi, filmden kare': 'A Mentos pack held in the hand, a frame from the film',
    'Sokakta Mentos dağıtımı, filmden kare': 'Mentos being handed out on the street, a frame from the film',
    '>Hibrit üretim<': '>Hybrid production<',
    '>Şehrin ritminde.<': '>In the rhythm of the city.<',
    'Kamera kaydetti, hayal gücü devam etti. Çekim ortağımızla birlikte yaptığımız çalışmada gerçekle başladık, sınırları yapay zekayla açtık.': 'The camera recorded, imagination kept going. Working with our shooting partner, we started with reality and opened up its limits with AI.',
    '<span>34 sn</span>': '<span>34 sec</span>',
    '>Projeyi incele<': '>View project<',
    '>Marka iş birliği<': '>Brand collaboration<',
    # Quinzell
    'Marka iş birliği · Quinzell': 'Brand collaboration · Quinzell',
    # Portfolyoya geçiş
    '>Daha fazlası portfolyoda.<': '>More in the portfolio.<',
    'Zeytinlikte taş masada ekmek ve DAL zeytinyağı': 'Bread and DAL olive oil on a stone table in an olive grove',
    'Pembe fotoğraf kabininde MELTY dudak balmı': 'MELTY lip balm in a pink photo booth',
    '>Konsept marka<': '>Concept brand<',
    '>Tüm projeleri görün <span': '>See all projects <span',
    # Hizmetler
    '<h2 id="offers-title">Hizmetler</h2>': '<h2 id="offers-title">Services</h2>',
    '<h1 id="page-title">Hizmetler</h1>': '<h1 id="page-title">Services</h1>',
    'Tek proje olarak ya da her ay düzenli üretimle çalışıyoruz. Portfolyoda moda, güzellik, gıda ve takı örnekleri var.': 'We work project by project or on a regular monthly basis. The portfolio includes fashion, beauty, food and jewelry examples.',
    'Tek proje olarak ya da her ay düzenli üretimle çalışıyoruz.': 'We work project by project or on a regular monthly basis.',
    '>Yaratıcı konsept<': '>Creative concept<',
    '>Kampanya görselleri<': '>Campaign visuals<',
    '>Film üretimi<': '>Film production<',
    '>Sürekli içerik üretimi<': '>Ongoing content production<',
    '<strong>Çıktı:</strong> kampanya fikri, görsel yön ve anlatım.': '<strong>Output:</strong> campaign idea, visual direction and narrative.',
    '<strong>Çıktı:</strong> ürün ve model görselleri, renk alternatifleri, kampanya serileri.': '<strong>Output:</strong> product and model visuals, color alternatives, campaign series.',
    '<strong>Çıktı:</strong> yayın formatına uyarlanmış kısa reklam ve moda filmleri.': '<strong>Output:</strong> short ads and fashion films adapted to publishing formats.',
    '<strong>Çıktı:</strong> aylık plana göre, aynı görsel dilde görsel ve video içerikler.': '<strong>Output:</strong> image and video content on a monthly plan, in one visual language.',
    '<strong>Çıktı:</strong> kurgu, renk ve sesi tamamlanmış, yayın formatına uyarlanmış kısa filmler.': '<strong>Output:</strong> short films with finished edit, color and sound, adapted to publishing formats.',
    'Gerektiğinde gerçek çekimle AI üretimini birleştiriyoruz.': 'When needed, we combine AI production with real shoots.',
    '>Tüm hizmetler<': '>All services<',
    '>Nasıl başlıyoruz?<': '>How do we start?<',
    'Ürününüzü, içerikleri nerede kullanacağınızı ve ihtiyaç duyduğunuz çıktıları paylaşın. Projenin kapsamını ve üretim yaklaşımını birlikte netleştirelim.': 'Share your product, where you will use the content and the outputs you need. Let’s define the project scope and production approach together.',
    '>Ek çalışmalar<': '>Additional work<',
    'Kreatif üretimin yanında, ihtiyaca göre ayrıca planlanan çalışmalar.': 'Planned separately as needed, alongside creative production.',
    '>Hesap ve girişim büyümesi<': '>Account and startup growth<',
    'Konumlandırma, içerik sütunları, dağıtım ve ölçüm; girişimler için değer önerisi ve lansman anlatısı. İster birlikte kuralım, ister ekibinize uygulamalı olarak öğretelim.': 'Positioning, content pillars, distribution and measurement; value proposition and launch narrative for startups. We can build it with you or teach your team hands-on.',
    '>Markaya özel AI asistanları<': '>Brand-specific AI assistants<',
    'Marka bilgisi ve iş akışınıza göre araştırma, fikir geliştirme, içerik uyarlama ve operasyonu destekleyen yapay zeka yardımcıları kurarız.': 'We build AI assistants around your brand knowledge and workflow to support research, ideation, content adaptation and operations.',
    # Hakkında
    '>Mon Digital hakkında<': '>About Mon Digital<',
    '2019’da kurulan MON Digital, markalar için yaratıcı konseptler, kampanya görselleri ve reklam filmleri üreten bir kreatif stüdyo.': 'Founded in 2019, MON Digital is a creative studio producing creative concepts, campaign visuals and ad films for brands.',
    'MON’un kurucusu Melis Ay, Galatasaray Lisesi’nin ardından Bahçeşehir Üniversitesi’nde reklamcılık, Universidad San Jorge’de pazarlama eğitimi aldı. Dijital dünyaya 2017’de bir sosyal medya stajıyla adım attı; sonraki yıllarda dijital pazarlama, sosyal medya ve içerik üretimi üzerine çalıştı. Bugün MON’da markalar için AI destekli görseller ve reklam filmleri üretiyor.': 'Melis Ay, MON’s founder, studied at Galatasaray High School, then advertising at Bahçeşehir University and marketing at Universidad San Jorge. After entering the digital world through a social media internship in 2017, Melis went on to work in digital marketing, social media and content production. Today, at MON, Melis creates AI-powered visuals and ad films for brands.',
    '>Çalışma biçimi<': '>How we work<',
    '<strong>Fikir</strong><span>Ürünü ve hedefi birlikte netleştiriyor, konsepti buna göre kuruyoruz.': '<strong>Idea</strong><span>We clarify the product and the goal together and build the concept around them.',
    '<strong>Üretim</strong><span>Görselleri ve filmleri belirlediğimiz yöne göre hazırlıyoruz.': '<strong>Production</strong><span>We create the visuals and films in the direction we set.',
    '<strong>Teslim</strong><span>Kurgu, renk ve sesi tamamlayıp yayın formatlarına uyarlıyoruz.': '<strong>Delivery</strong><span>We finish the edit, color and sound, and adapt them to publishing formats.',
    # İletişim
    'Sizin ürününüz için ne üretebiliriz?': 'What can we create for your product?',
    'Bir ürün fotoğrafı, yeni bir koleksiyon ya da henüz şekillenmemiş bir fikir… Aklınızdakini paylaşın; görsel yönü, içerik ihtiyacını ve üretim kapsamını birlikte netleştirelim.': 'A product photo, a new collection or an idea still taking shape… Share what’s on your mind, and let’s define the visual direction, content needs and production scope together.',
    '>Adınız<': '>Your name<',
    '>E-posta<': '>Email<',
    '>Aklınızda ne var?<': '>What’s on your mind?<',
    'Ürününüzden, ihtiyaç duyduğunuz içeriklerden ve planladığınız tarihten kısaca bahsedin.': 'Tell us briefly about your product, the content you need and your planned timing.',
    '>Bu alanı boş bırakın<': '>Leave this field empty<',
    '>Projenizi gönderin <span': '>Send your project <span',
    '>Projenizi gönderin<': '>Send your project<',
    'Bilgilerinizi yalnızca talebinize yanıt vermek için kullanırız.': 'We only use your details to respond to your request.',
    'Zekeriyaköy, Sarıyer, İstanbul': 'Zekeriyaköy, Sarıyer, Istanbul',
    '>Instagram’da yazın<': '>Write to us on Instagram<',
    '>Hizmetleri görün<': '>See our services<',
    'Bize ulaşın: <a': 'Reach us: <a',
    # Portfolyo girişi
    '<h1 id="baslik">Portfolyo</h1>': '<h1 id="baslik">Portfolio</h1>',
    'Her ürünün anlatılacak bir tarafı var. Biz o hikayeyi buluyor; reklam filmlerine, kampanya görsellerine ve markaya özgü görsel dünyalara dönüştürüyoruz.': 'Every product has a side worth telling. We find that story and turn it into ad films, campaign visuals and brand-specific visual worlds.',
    'Marka iş birliklerimizi ve bağımsız konsept çalışmalarımızı keşfedin.': 'Explore our brand collaborations and independent concept work.',
    '<dt>Katkımız</dt>': '<dt>Our contribution</dt>',
    '<dt>Üretilen içerikler</dt>': '<dt>Content produced</dt>',
    # Mentos
    '>Hibrit üretim, 34 sn<': '>Hybrid production, 34 sec<',
    'İstanbul’un gündelik akışına beklenmedik bir Mentos anı ekledik. Sokak ve sahil görüntülerini AI ile üretilen sahnelerle buluşturarak ferahlık fikrini şehrin ölçeğine taşıdık. Afternoon Film Pro ile hazırladığımız film, gerçek çekimle hayal gücünü aynı hikayede birleştiriyor.': 'We added an unexpected Mentos moment to Istanbul’s everyday flow. By bringing street and seaside footage together with AI-generated scenes, we carried the idea of freshness to the scale of the city. Made with Afternoon Film Pro, the film brings real footage and imagination into one story.',
    '34 saniyelik reklam filmi. Format: dikey, 9:16.': '34-second ad film. Format: vertical, 9:16.',
    'Afternoon Film Pro ile ortak üretim. Mentos için hazırlandı.': 'Co-produced with Afternoon Film Pro. Made for Mentos.',
    'MENTOS filmi: Şehrin ritminde, 34 saniye': 'MENTOS film: In the rhythm of the city, 34 seconds',
    'İstanbul’da kalabalık bir sahilde insanların üstünde havada süzülen dev Mentos şekeri': 'A giant Mentos candy floating above people on a crowded Istanbul seafront',
    # Happy to Wear
    # Quinzell portfolyo
    'Model giydirme, renk çalışması ve video üretimi tek süreçte ilerledi. Ekip, renk alternatiflerini model üzerinde görerek üretim kararlarını değerlendirebiliyor.': 'Model styling, color work and video production moved forward in one process. The team can weigh production decisions by seeing the color alternatives on a model.',
    'Quinzell ile marka iş birliği kapsamında hazırlandı.': 'Made as part of a brand collaboration with Quinzell.',
    # Kremi
    '>Dört ton, bir dokunuş.<': '>Four shades, one touch.<',
    '>Bağımsız konsept, 20 sn<': '>Independent concept, 20 sec<',
    'Dört renk için, ilhamlarını görünür kılan bir anlatım kurduk. Peach, Cherry Coke, Strawberry Velvet ve Coffee tonlarını ürün, lezzet çağrışımı, doku ve dudak üzerindeki görünüm arasında ilerleyen kısa bir filmde buluşturduk.': 'For four colors, we built a narrative that makes their inspirations visible. We brought the Peach, Cherry Coke, Strawberry Velvet and Coffee shades together in a short film that moves between product, flavor association, texture and the look on the lips.',
    'Ürün ve doku planları, renk anlatımı, AI destekli görsel ve hareket üretimi, kurgu.': 'Product and texture shots, color storytelling, AI-assisted visual and motion production, editing.',
    '20 saniyelik film. Format: dikey, 9:16.': '20-second film. Format: vertical, 9:16.',
    'Bağımsız konsept çalışması. Kremi ile iş birliği veya müşteri ilişkisi iddiası taşımaz.': 'Independent concept work. It does not claim any collaboration or client relationship with Kremi.',
    'Müzik: “Bossa Antigua”, Kevin MacLeod (incompetech.com), CC BY 4.0 lisansı (creativecommons.org/licenses/by/4.0). Film için kısaltıldı; ses düzeyi ve giriş/çıkış yumuşatmaları düzenlendi.': 'Music: “Bossa Antigua”, Kevin MacLeod (incompetech.com), licensed under CC BY 4.0 (creativecommons.org/licenses/by/4.0). Shortened for the film; volume and fades adjusted.',
    'KREMİ filmi: Dört ton, bir dokunuş, 20 saniye': 'KREMİ film: Four shades, one touch, 20 seconds',
    'Krem fonda kırmızı Kremi dudak balmı tüpü': 'A red Kremi lip balm tube on a cream background',
    # Frutibon
    '>Bitter çikolata, bütün meyve.<': '>Dark chocolate, whole fruit.<',
    '>Bağımsız konsept, 15 sn<': '>Independent concept, 15 sec<',
    'Çilek ve bitter çikolatanın birlikteliğini, arkadaşlar arasında paylaşılan küçük bir keyif anıyla anlattık. Ürün yakın planlarını sıcak bir buluşma sahnesiyle birleştirerek lezzet kadar paylaşma hissini de öne çıkardık.': 'We told the story of strawberry and dark chocolate through a small moment of pleasure shared among friends. Combining product close-ups with a warm get-together scene, we brought out the feeling of sharing as much as the flavor.',
    'Karakter ve sahne tasarımı, AI destekli görsel ve hareket üretimi, kurgu ve ses.': 'Character and scene design, AI-assisted visual and motion production, editing and sound.',
    '15 saniyelik film. Format: dikey, 9:16.': '15-second film. Format: vertical, 9:16.',
    'Bağımsız konsept çalışması. Kahve Dünyası / Frutibon ile iş birliği veya müşteri ilişkisi iddiası taşımaz.': 'Independent concept work. It does not claim any collaboration or client relationship with Kahve Dünyası / Frutibon.',
    'FRUTIBON filmi: Bitter çikolata, bütün meyve, 15 saniye': 'FRUTIBON film: Dark chocolate, whole fruit, 15 seconds',
    'Pembe kemerli mekanda çilekli Frutibon yiyen üç arkadaş': 'Three friends eating strawberry Frutibon in a pink arched space',
    # DAL
    '>Kökünden sofrana.<': '>From root to table.<',
    '>Konsept marka, 16 sn<': '>Concept brand, 16 sec<',
    'DAL için zeytinlikten sofraya uzanan bir görsel hikaye kurduk. Sıcak gün ışığını, doğal dokuları ve metal ambalajı aynı dünyada buluşturduk. Kısa film ve dokuz karelik görsel seri boyunca ürünün geldiği yerle tüketildiği an arasındaki bağı işledik.': 'For DAL, we built a visual story that runs from the olive grove to the table. We brought warm sunlight, natural textures and metal packaging into one world. Through a short film and a nine-frame visual series, we explored the bond between where the product comes from and the moment it is enjoyed.',
    'Sahne tasarımı, AI destekli görsel ve hareket üretimi, kurgu.': 'Scene design, AI-assisted visual and motion production, editing.',
    '16 saniyelik film, dokuz karelik kampanya görsel serisi. Format: dikey film, 4:5 görsel seri.': '16-second film, nine-frame campaign visual series. Format: vertical film, 4:5 visual series.',
    'Konsept marka çalışmasıdır. Ticari bir marka iş birliği kapsamında hazırlanmamıştır.': 'Concept brand work. Not created as part of a commercial brand collaboration.',
    'DAL filmi: Kökünden sofrana, 16 saniye': 'DAL film: From root to table, 16 seconds',
    'DAL × mon: zeytin, yağ dokuları, portreler ve metal ambalajı buluşturan dokuz karelik görsel seri': 'DAL × mon: a nine-frame visual series bringing together olives, oil textures, portraits and metal packaging',
    'DAL × mon görsel serisi': 'DAL × mon visual series',
    # Melty
    '>Bir kare de kendine.<': '>A frame for yourself.<',
    'MELTY’yi, gün içinde kendine ayırdığın küçük bir molanın parçası olarak hayal ettik. Fotoğraf kabini, kadife perde ve fotoğraf şeritleri etrafında kurduğumuz seri, dudak balmına samimi ve oyunbaz bir dünya açıyor.': 'We imagined MELTY as part of a small break you take for yourself during the day. Built around a photo booth, a velvet curtain and photo strips, the series opens a warm, playful world for the lip balm.',
    'Karakter ve mekan tasarımı, AI destekli görsel üretimi.': 'Character and location design, AI-assisted visual production.',
    'Dokuz karelik kampanya görsel serisi. Format: 4:5.': 'Nine-frame campaign visual series. Format: 4:5.',
    'MELTY × mon: çilek, pembe ürün, retro objeler ve sıcak ışıkla tasarlanmış dokuz karelik kampanya serisi': 'MELTY × mon: a nine-frame campaign series designed with strawberries, the pink product, retro objects and warm light',
    'MELTY × mon görsel serisi': 'MELTY × mon visual series',
    # Luma
    '>Işık iz bırakır.<': '>Light leaves a trace.<',
    'LUMA için gümüşün heykelsi formunu ve ışıkla değişen yüzeyini merkeze aldık. Atölye detaylarını, ürün yakın planlarını ve kullanım sahnelerini aynı seride buluşturarak takıyı hem bir tasarım nesnesi hem kişisel bir ifade olarak ele aldık.': 'For LUMA, we centered on silver’s sculptural form and its surface that changes with light. Bringing workshop details, product close-ups and lifestyle scenes into one series, we treated jewelry as both a design object and a personal expression.',
    'LUMA × mon: gümüş yüzük, küpe ve bilezikleri gösteren dokuz karelik kampanya serisi': 'LUMA × mon: a nine-frame campaign series showing a silver ring, earrings and bracelets',
    'LUMA × mon görsel serisi': 'LUMA × mon visual series',
    # Bölüm içi kısa etiketler
    # Giriş filmi, Happy to Wear, BPS ve Askıdan sahneye
    'Mon Digital stüdyo filmi': 'Mon Digital studio film',
    '</span> Filmi izle <small>28 sn</small>': '</span> Watch the film <small>28 sec</small>',
    '<strong>Mon Digital</strong> <span>Stüdyo filmi</span>': '<strong>Mon Digital</strong> <span>Studio film</span>',
    'Marka iş birliği · Hibrit üretim · 12 sn': 'Brand collaboration · Hybrid production · 12 sec',
    'Marka iş birliği · Hibrit üretim': 'Brand collaboration · Hybrid production',
    'Gerçek çekim, sınırsız sahne.': 'Real shoot, limitless scenes.',
    'Siyah fonda beyaz yelek, geniş paça pantolon ve boncuklu başlıkla duran kadın': 'A woman in a white vest, wide-leg trousers and a beaded headpiece against a black backdrop',
    'Happy to Wear filminden kare: Haussmann salonunda boncuklu başlıklı portre': 'A frame from the Happy to Wear film: a portrait with a beaded headpiece in a Haussmann salon',
    'Happy to Wear filminden kare: altın aynanın önünde beyaz takım': 'A frame from the Happy to Wear film: the white outfit in front of a gold mirror',
    'Fotoğrafları Happy to Wear çekti; sahneleri ve hareketi yapay zekayla ürettik. Marka çekimiyle AI üretimini tek filmde buluşturan bir çalışma.': 'Happy to Wear shot the photos; we created the scenes and the motion with AI. A project that brings a brand shoot and AI production into one film.',
    '<span>12 sn</span>': '<span>12 sec</span>',
    '<span>16 sn</span>': '<span>16 sec</span>',
    'Gözleri kapalı, koku kağıdını koklayan kadın': 'A woman with closed eyes smelling a scent strip',
    'Çiğ damlalı lavanta dalı, BPS filminden kare': 'A dew-covered lavender sprig, a frame from the BPS film',
    'Taş bir nişin önünde çiçek ve meyvelerle dizilmiş BPS esans şişeleri': 'BPS essence bottles lined up with flowers and fruit in front of a stone niche',
    'Her damlada bir dünya.': 'A world in every drop.',
    'Görülmeyen bir şeyi, kokuyu anlattık: tek bir damladan çiçeklere, meyvelere ve vanilyaya uzanan 16 saniyelik bir film.': 'We told the story of something you can’t see, scent: a 16-second film that moves from a single drop to flowers, fruit and vanilla.',
    'Marka iş birliği · 16 sn': 'Brand collaboration · 16 sec',
    'Koku görülmez; biz onu görünür kıldık. Koku kağıdıyla başlayan film, tek bir damlayla çiçek, meyve ve vanilya notalarına uzanıyor, sonunda BPS şişelerinde buluşuyor.': 'Scent can’t be seen, so we made it visible. Starting with a scent strip, the film follows a single drop into floral, fruit and vanilla notes and comes together in the BPS bottles.',
    'Film ve görsel üretimi, kurgu.': 'Film and visual production, editing.',
    '16 saniyelik film. Format: dikey, 9:16.': '16-second film. Format: vertical, 9:16.',
    'BPS ile marka iş birliği kapsamında hazırlandı.': 'Made as part of a brand collaboration with BPS.',
    'BPS filmi: Her damlada bir dünya, 16 saniye': 'BPS film: A world in every drop, 16 seconds',
    'Askıdan sahneye.': 'From hanger to stage.',
    'Aynı ürün, önce mankende, sonra model üzerinde: önden ve arkadan.': 'The same product, first on the mannequin, then on a model: front and back.',
    'Kaynak fotoğraflar değiştirilmedi.': 'Source photos were not altered.',
    'Beyaz şeritli eşofman takımı önden: önce gerçek ürün, sonra model üzerinde': 'The white striped tracksuit from the front: first the real product, then on a model',
    'Beyaz şeritli eşofman takımı arkadan: önce gerçek ürün, sonra model üzerinde': 'The white striped tracksuit from the back: first the real product, then on a model',
    'medya/quinzell-on.jpg': 'medya/quinzell-front.jpg',
    'medya/quinzell-arka.jpg': 'medya/quinzell-back.jpg',
    '<span>1</span>Model üzerinde': '<span>1</span>On a model',
    '<span>2</span>Kampanya görselleri': '<span>2</span>Campaign visuals',
    '<span>3</span>Reklam filmi': '<span>3</span>Ad film',
    'Beyaz şeritli eşofman takımıyla taş duvarlar arasında yürüyen model': 'A model walking between stone walls in the white striped tracksuit',
    'Açık havada beyaz şeritli eşofman takımının arkası': 'The back of the white striped tracksuit, outdoors',
    'Beyaz şeritli eşofman takımıyla açık havada taş yapıların önünde duran model': 'A model standing outdoors in front of stone structures in the white striped tracksuit',
    'Quinzell projesini inceleyin': 'View the Quinzell project',
    'Happy to Wear çekimi yaptı, görselleri bize gönderdi. Bu görsellerden yola çıkarak aynı kombini yapay zekayla yeni sahnelere taşıdık: siyah fonda yakın planlar, altın aynalı bir Haussmann salonunda hareket. Gerçek çekim işin temelini kurdu, yapay zeka sahneyi genişletti.': 'Happy to Wear did the shoot and sent us the images. Starting from them, we used AI to take the same outfit into new scenes: close-ups against a black backdrop, movement in a Haussmann salon with a gold mirror. The real shoot laid the foundation; AI extended the stage.',
    'Marka çekiminden gelen görsellerle AI destekli sahne ve hareket üretimi, film kurgusu.': 'AI-assisted scene and motion production from the brand’s shoot images, film editing.',
    '12 saniyelik moda filmi. Format: dikey, 9:16.': '12-second fashion film. Format: vertical, 9:16.',
    'Happy to Wear ile marka iş birliği kapsamında hazırlandı. Fotoğraf çekimi: Happy to Wear.': 'Made as part of a brand collaboration with Happy to Wear. Photography: Happy to Wear.',
    'HAPPY TO WEAR filmi: Gerçek çekim, sınırsız sahne, 12 saniye': 'HAPPY TO WEAR film: Real shoot, limitless scenes, 12 seconds',
    # Yeni giriş ve filmsiz Quinzell
    'Bir ürün fotoğrafından ne kadar ileri gidilebilir? Quinzell’in hayalet model fotoğraflarından yola çıkarak model üzerinde görseller ve renk alternatifleri hazırladık. Aynı ürünleri farklı renk ve sahnelerde ele alan çalışma, ekibin üretim öncesinde seçenekleri değerlendirmesine de alan açtı.': 'How far can a single product photo go? Starting from Quinzell’s ghost mannequin photos, we created on-model visuals and color alternatives. Showing the same products in different colors and scenes, the work also gave the team room to weigh their options before production.',
    'Marka iş birliği · Görsel seri': 'Brand collaboration · Visual series',
    # AI sistemleri ve sesli asistanlar
    '>Bağımsız konsept<': '>Independent concept<',
    '>AI sistemleri ve sesli asistanlar<': '>AI systems and voice assistants<',
    'Kreatif üretimin yanında, işletmelerin günlük işlerini kolaylaştıran yapay zeka çözümleri kuruyoruz.': 'Alongside creative production, we set up AI solutions that make everyday work easier for businesses.',
    '>İş süreçleri için AI sistemleri<': '>AI systems for business processes<',
    'Tekrarlayan işleri azaltan, ekibinizin işini kolaylaştıran yapay zeka sistemlerini işletmenize göre kuruyoruz.': 'We build AI systems around your business that reduce repetitive work and make your team’s work easier.',
    '>Sesli chatbotlar<': '>Voice chatbots<',
    'Müşterilerinizin konuşarak soru sorabildiği, markanızın bilgisiyle çalışan sesli sohbet asistanları kuruyoruz.': 'We set up voice chat assistants that work with your brand’s knowledge, so your customers can ask questions by speaking.',
    '>Sesli ajanlar<': '>Voice agents<',
    'Sesli görüşmelerde ekibinize destek olan, işletmenize göre kurgulanan yapay zeka ajanları hazırlıyoruz.': 'We prepare AI agents designed around your business that support your team in voice conversations.',
    'Bu konu hakkında görüşmek için bize ulaşın.': 'Get in touch to talk about this.',
    '>Bize ulaşın <span': '>Get in touch <span',
    'Beyaz şeritli eşofman takımı, model üzerinde': 'A white striped tracksuit on a model',
    'Model üzerinde ürün görselleri, kampanya görselleri. Format: dikey görsel.': 'On-model product visuals, campaign visuals. Format: vertical visuals.',
    'Yaratıcı konsept, kampanya görselleri, film üretimi, sürekli içerik üretimi, reklam yönetimi, web sitesi, AI sistemleri ve sesli ajanlar.': 'Creative concepts, campaign visuals, film production, ongoing content production, ad management, websites, AI systems and voice agents.',
    '>Reklam yönetimi<': '>Ad management<',
    '>Web sitesi<': '>Website<',
    '<strong>Çıktı:</strong> planlanıp yayına alınan reklam kampanyaları.': '<strong>Output:</strong> planned and launched ad campaigns.',
    '<strong>Çıktı:</strong> markanıza özel, yayına hazır web sitesi.': '<strong>Output:</strong> a ready-to-launch website made for your brand.',
    'Ben Monna, yapay zeka asistanınız. Buradan konuşabiliriz.': 'I’m Monna, your AI assistant. We can talk here.',
    'Fikirden yayına,<br><em>markanız için.</em>': 'From idea to launch,<br><em>for your brand.</em>',
    'Fikirlerinizi görsellere, filmlere ve dijital çözümlere dönüştürüyoruz. Yaratıcı fikirleri AI destekli üretimle hayata geçiriyor, projeye göre gerçek çekimle birleştiriyoruz.': 'We turn your ideas into visuals, films and digital solutions. We bring creative ideas to life with AI-powered production, combining them with real shoots depending on the project.',
    # Altyazılar Türkçe olduğu için İngilizce sayfada altyazısız film
    'medya/mon-tanitim-altyazi.mp4': 'medya/mon-tanitim.mp4',
    'Üç parmağında gümüş LUMA yüzükleriyle elini kameraya uzatan kadın': 'A woman reaching toward the camera with silver LUMA rings on three fingers',
    'Yeşil mermer tezgahta DAL zeytinyağı şişesi ve zeytinler': 'A DAL olive oil bottle and olives on a green marble counter',
    'Konsept marka, 12 sn': 'Concept brand, 12 sec',
    'AI destekli sahne, görsel ve hareket üretimi.': 'AI-assisted scene, visual and motion production.',
    '12 saniyelik film, dokuz karelik kampanya görsel serisi. Format: dikey film, 4:5 görsel seri.': '12-second film, nine-frame campaign visual series. Format: vertical film, 4:5 visual series.',
    'LUMA filmi: Işık iz bırakır, 12 saniye': 'LUMA film: Light leaves a trace, 12 seconds',
    'Melty şimdilik gizli: filmi gelince template etiketleri kaldırılır': 'Melty is hidden for now: remove the template tags when its film arrives',
}

# Türkçe harf içeren ama çevrilmemesi gereken özel adlar
OZEL = ('Zekeriyaköy', 'Sarıyer', 'Rumeli Hisarı', 'Bahçeşehir', 'KREMİ', 'Kahve Dünyası', 'Melis', 'Türkçe')
TURKCE = re.compile(r'[çğıöşüİÇĞÖŞÜ]|\b(ve|için|bir|ile|fotoğraf|görsel|filmi|sn|saniye|üretim|marka)\b')
kullanilan = set()


def cevir(t):
    for tr in sorted(TABLO, key=len, reverse=True):
        if tr in t:
            kullanilan.add(tr)
            t = t.replace(tr, TABLO[tr])
    return t


def denetle(t, ad):
    """Görünen metinde ve erişilebilirlik alanlarında Türkçe kalmadığını doğrular."""
    govde = re.sub(r'<script.*?</script>|<style.*?</style>', '', t, flags=re.S)
    parcalar = re.findall(r'(?:alt|aria-label|placeholder|title|content)="([^"]*)"', govde) + re.findall(r'>([^<]+)<', govde)
    kalan = []
    for p in parcalar:
        s = p
        for o in OZEL:
            s = s.replace(o, '')
        if TURKCE.search(s):
            kalan.append(p.strip()[:90])
    assert not kalan, (ad, kalan)


def yaz(yol, t):
    tam = os.path.join(KOK, yol)
    os.makedirs(os.path.dirname(tam), exist_ok=True)
    with open(tam, 'w', encoding='utf-8', newline='\n') as f:
        f.write(t)


def oku(yol):
    with open(os.path.join(KOK, yol), encoding='utf-8') as f:
        return f.read().replace('\r\n', '\n')


def ortak(t):
    t = t.replace('<html lang="tr">', '<html lang="en">').replace('content="tr_TR"', 'content="en_US"').replace(KONU_TR, KONU_EN)
    return re.sub(r'="(medya/|yazi/)', r'="../\1', t).replace('="ikon.svg"', '="../ikon.svg"').replace('="asistan.css"', '="../asistan.css"')


def site_sayfasi(kaynak, hedef, gecis_tr, gecis_en):
    t = cevir(oku(kaynak))
    t = ortak(t).replace('="stil.css"', '="../stil.css"')
    for b in ('ortak.js', 'site.js', 'asistan.js', 'ipek.js'):
        t = t.replace(f'src="{b}"', f'src="../{b}"')
    t = t.replace('"portfolyo/index.html"', '"../portfolyo/en/index.html"').replace('href="hizmetler.html"', 'href="services.html"')
    t = t.replace('href="projeler/', 'href="projects/')
    assert gecis_tr in t, gecis_tr
    t = t.replace(gecis_tr, gecis_en)
    denetle(t, hedef)
    yaz(hedef, t)


site_sayfasi('index.html', 'en/index.html',
             '<a class="lang-link" href="en/index.html" hreflang="en" lang="en" aria-label="English">EN</a>',
             '<a class="lang-link" href="../index.html" hreflang="tr" lang="tr" aria-label="Türkçe">TR</a>')
site_sayfasi('hizmetler.html', 'en/services.html',
             '<a class="lang-link" href="en/services.html" hreflang="en" lang="en" aria-label="English">EN</a>',
             '<a class="lang-link" href="../hizmetler.html" hreflang="tr" lang="tr" aria-label="Türkçe">TR</a>')

t = cevir(oku('portfolyo/index.html'))
t = ortak(t)
for d in ('portfolyo.css', 'yelpaze.css'):
    t = t.replace(f'="{d}"', f'="../{d}"')
for b in ('yelpaze.js', 'portfolyo.js', 'ipek.js', 'asistan.js'):
    t = t.replace(f'src="{b}"', f'src="../{b}"')
t = t.replace('<link rel="canonical" href="https://portfolio.mondigital.ai/">', '<link rel="canonical" href="https://portfolio.mondigital.ai/en/">')
t = t.replace('<meta property="og:url" content="https://portfolio.mondigital.ai/">', '<meta property="og:url" content="https://portfolio.mondigital.ai/en/">')
t = t.replace('href="https://www.mondigital.ai/" aria-label', 'href="https://www.mondigital.ai/en/" aria-label')
t = t.replace('https://www.mondigital.ai/hizmetler.html', 'https://www.mondigital.ai/en/services.html')
GECIS = '<a class="lang-link" href="en/index.html" hreflang="en" lang="en" aria-label="English">EN</a>'
assert GECIS in t
t = t.replace(GECIS, '<a class="lang-link" href="../index.html" hreflang="tr" lang="tr" aria-label="Türkçe">TR</a>')
denetle(t, 'portfolyo/en/index.html')
yaz('portfolyo/en/index.html', t)

bos = set(TABLO) - kullanilan
assert not bos, ('Tabloda karşılığı kalmayan metinler', sorted(bos))
print('3 İngilizce sayfa üretildi')
