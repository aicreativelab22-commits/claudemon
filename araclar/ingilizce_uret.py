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
    'Ürün fotoğraflarınızı model görsellerine, kampanya serilerine ve kısa reklam filmlerine dönüştürüyoruz. Projeye göre AI üretimini gerçek çekimle birleştiriyoruz.': 'We turn your product photos into model imagery, campaign series and short ad films. Depending on the project, we combine AI production with real shoots.',
    'Hizmetler | Mon Digital': 'Services | Mon Digital',
    'Yaratıcı konsept, kampanya görselleri, film üretimi, sürekli içerik üretimi ve ek çalışmalar.': 'Creative concepts, campaign visuals, film production, ongoing content production and additional work.',
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
    'Ürününüz.<br><em>Sınırsız dünya.</em>': 'Your product.<br><em>A limitless world.</em>',
    '>Projenizi anlatın <span': '>Tell us about your project <span',
    '>Projenizi anlatın<': '>Tell us about your project<',
    '>Portfolyoyu keşfedin<': '>Explore the portfolio<',
    'Mentos filmi: Şehrin ritminde': 'Mentos film: In the rhythm of the city',
    '</span> Filmi izle <small>34 sn</small>': '</span> Watch the film <small>34 sec</small>',
    'Hibrit üretim, gerçek çekim ve AI': 'Hybrid production, real footage and AI',
    # Seçilmiş işler
    '>Seçilmiş işler<': '>Selected work<',
    'Rumeli Hisarı önünde sahil yolu, Mentos filminden kare': 'The seaside road in front of Rumeli Hisarı, a frame from the Mentos film',
    'Elde tutulan Mentos paketi, filmden kare': 'A Mentos pack held in the hand, a frame from the film',
    'Sokakta Mentos dağıtımı, filmden kare': 'Mentos being handed out on the street, a frame from the film',
    '>Hibrit üretim<': '>Hybrid production<',
    '>Şehrin ritminde.<': '>In the rhythm of the city.<',
    'Kamera kaydetti, hayal gücü devam etti. Çekim ortağımızla birlikte yaptığımız çalışmada gerçekle başladık, sınırları yapay zekâyla açtık.': 'The camera recorded, imagination kept going. Working with our shooting partner, we started with reality and opened up its limits with AI.',
    '<span>34 sn</span>': '<span>34 sec</span>',
    '<span>15 sn</span>': '<span>15 sec</span>',
    '>Projeyi incele<': '>View project<',
    'Güneşli taş meydanda bej trençkot ve altın payetli etekle yürüyen kadın': 'A woman walking across a sunny stone square in a beige trench coat and gold sequin skirt',
    'Happy to Wear filminden kare': 'A frame from the Happy to Wear film',
    '>Marka iş birliği<': '>Brand collaboration<',
    '>Günün değişir, ışıltın kalır.<': '>Your day changes, your sparkle stays.<',
    'Günün ilk ışığından akşama, aynı şehirde tek bir kombin. Ürün aynı kalırken hissettirdiği değişiyor.': 'One outfit in the same city, from first light to evening. The product stays the same; the way it feels changes.',
    # Quinzell
    'Marka iş birliği · Quinzell': 'Brand collaboration · Quinzell',
    '>Hayalet modelden moda filmine.<': '>From ghost mannequin to fashion film.<',
    'Bir ürün fotoğrafından ne kadar ileri gidilebilir? Quinzell’in hayalet model fotoğraflarından yola çıkarak model üzerinde görseller, renk alternatifleri ve üç kısa moda filmi hazırladık. Aynı ürünleri farklı renk ve sahnelerde ele alan çalışma, ekibin üretim öncesinde seçenekleri değerlendirmesine de alan açtı.': 'How far can a single product photo go? Starting from Quinzell’s ghost mannequin photos, we created on-model visuals, color alternatives and three short fashion films. Showing the same products in different colors and scenes, the work also gave the team room to weigh their options before production.',
    '>Kaynak<': '>Source<',
    '>Üretilen<': '>Generated<',
    'Kaynak fotoğraf: hayalet model olarak çekilmiş lacivert-krem fermuarlı takım': 'Source photo: a navy and cream zip-up set shot on a ghost mannequin',
    'Kaynak fotoğraf: hayalet model olarak çekilmiş siyah, beyaz-kırmızı şeritli eşofman takımı': 'Source photo: a black tracksuit with white and red stripes shot on a ghost mannequin',
    'Üretilen görsel: aynı takımın lacivert renkte model üzerindeki görünümü': 'Generated visual: the same set in navy, on a model',
    'Üretilen görsel: takımın adaçayı renk alternatifi, başka bir model üzerinde': 'Generated visual: the sage color alternative of the set, on another model',
    'Üretilen görsel: takımın bordo renk alternatifi, başka bir model üzerinde': 'Generated visual: the burgundy color alternative of the set, on another model',
    'Üretilen film: koşu bandında lacivert-krem takımla yürüyen kadın, renk değişimi filminden kare': 'Generated film: a woman walking on a treadmill in the navy and cream set, a frame from the color change film',
    '</span> Kaynak fotoğraf<': '</span> Source photo<',
    'Ürünün hayalet model fotoğrafı.': 'The product’s ghost mannequin photo.',
    '</span> Model üzerinde<': '</span> On model<',
    'Ürün, model üzerinde görselleştirildi.': 'The product, visualized on a model.',
    '</span> Renk alternatifleri<': '</span> Color alternatives<',
    'Aynı takım, adaçayı ve bordo renklerde.': 'The same set in sage and burgundy.',
    'Quinzell filmlerini izle': 'Watch the Quinzell films',
    'Renk değişimi filmi, 18 sn.': 'Color change film, 18 sec.',
    'Diğer ürün dizisi ve üç film proje sayfasında.': 'The other product series and all three films are on the project page.',
    # Portfolyoya geçiş
    '>Daha fazlası portfolyoda.<': '>More in the portfolio.<',
    'Zeytinlikte taş masada ekmek ve DAL zeytinyağı': 'Bread and DAL olive oil on a stone table in an olive grove',
    'Pembe fotoğraf kabininde MELTY dudak balmı': 'MELTY lip balm in a pink photo booth',
    'Koyu fonda heykelsi gümüş LUMA yüzük': 'A sculptural silver LUMA ring on a dark background',
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
    'Marka bilgisi ve iş akışınıza göre araştırma, fikir geliştirme, içerik uyarlama ve operasyonu destekleyen yapay zekâ yardımcıları kurarız.': 'We build AI assistants around your brand knowledge and workflow to support research, ideation, content adaptation and operations.',
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
    'Monna ile sohbet edin': 'Chat with Monna',
    'Zekeriyaköy, Sarıyer, İstanbul': 'Zekeriyaköy, Sarıyer, Istanbul',
    '>Instagram’da yazın<': '>Write to us on Instagram<',
    '>Hizmetleri görün<': '>See our services<',
    'Bize ulaşın: <a': 'Reach us: <a',
    # Portfolyo girişi
    '<h1 id="baslik">Portfolyo</h1>': '<h1 id="baslik">Portfolio</h1>',
    'Her ürünün anlatılacak bir tarafı var. Biz o hikâyeyi buluyor; reklam filmlerine, kampanya görsellerine ve markaya özgü görsel dünyalara dönüştürüyoruz.': 'Every product has a side worth telling. We find that story and turn it into ad films, campaign visuals and brand-specific visual worlds.',
    'Marka iş birliklerimizi ve bağımsız konsept çalışmalarımızı keşfedin.': 'Explore our brand collaborations and independent concept work.',
    '<dt>Katkımız</dt>': '<dt>Our contribution</dt>',
    '<dt>Üretilen içerikler</dt>': '<dt>Content produced</dt>',
    # Mentos
    '>Hibrit üretim, 34 sn<': '>Hybrid production, 34 sec<',
    'İstanbul’un gündelik akışına beklenmedik bir Mentos anı ekledik. Sokak ve sahil görüntülerini AI ile üretilen sahnelerle buluşturarak ferahlık fikrini şehrin ölçeğine taşıdık. Afternoon Film Pro ile hazırladığımız film, gerçek çekimle hayal gücünü aynı hikâyede birleştiriyor.': 'We added an unexpected Mentos moment to Istanbul’s everyday flow. By bringing street and seaside footage together with AI-generated scenes, we carried the idea of freshness to the scale of the city. Made with Afternoon Film Pro, the film brings real footage and imagination into one story.',
    '34 saniyelik reklam filmi. Format: dikey, 9:16.': '34-second ad film. Format: vertical, 9:16.',
    'Afternoon Film Pro ile ortak üretim. Mentos için hazırlandı.': 'Co-produced with Afternoon Film Pro. Made for Mentos.',
    'MENTOS filmi: Şehrin ritminde, 34 saniye': 'MENTOS film: In the rhythm of the city, 34 seconds',
    'İstanbul’da kalabalık bir sahilde insanların üstünde havada süzülen dev Mentos şekeri': 'A giant Mentos candy floating above people on a crowded Istanbul seafront',
    # Happy to Wear
    'Marka iş birliği · 15 sn': 'Brand collaboration · 15 sec',
    'Tek bir kombini, günün değişen ışığı ve atmosferi içinde ele aldık. Bej trençkot ve altın payetli eteği sabahtan akşama uzanan bir şehir hikâyesine taşıyarak koleksiyonun farklı anlara eşlik eden karakterini öne çıkardık.': 'We explored a single outfit through the day’s changing light and atmosphere. Taking the beige trench coat and gold sequin skirt into a city story from morning to evening, we highlighted the collection’s character across different moments.',
    'Marka ürünlerinden sahne tasarımı, AI destekli görsel ve hareket üretimi, film kurgusu.': 'Scene design from the brand’s products, AI-assisted visual and motion production, film editing.',
    '15 saniyelik moda filmi. Format: dikey, 9:16.': '15-second fashion film. Format: vertical, 9:16.',
    'Happy to Wear ile marka iş birliği kapsamında hazırlandı.': 'Made as part of a brand collaboration with Happy to Wear.',
    'HAPPY TO WEAR filmi: Günün değişir, ışıltın kalır, 15 saniye': 'HAPPY TO WEAR film: Your day changes, your sparkle stays, 15 seconds',
    # Quinzell portfolyo
    'Marka iş birliği · 3 film': 'Brand collaboration · 3 films',
    'Model giydirme, renk çalışması ve video üretimi tek süreçte ilerledi. Ekip, renk alternatiflerini model üzerinde görerek üretim kararlarını değerlendirebiliyor.': 'Model styling, color work and video production moved forward in one process. The team can weigh production decisions by seeing the color alternatives on a model.',
    'Üç kısa moda filmi ve iki ürün için görsel dizi. Format: dikey film, dikey görsel.': 'Three short fashion films and visual series for two products. Format: vertical film, vertical visuals.',
    'Quinzell ile marka iş birliği kapsamında hazırlandı.': 'Made as part of a brand collaboration with Quinzell.',
    'QUINZELL filmi: Renk değişimi, 18 saniye': 'QUINZELL film: Color change, 18 seconds',
    'Koşu bandında lacivert-krem Quinzell takımıyla yürüyen kadın': 'A woman walking on a treadmill in a navy and cream Quinzell set',
    '<figcaption>Renk değişimi, 18 sn</figcaption>': '<figcaption>Color change, 18 sec</figcaption>',
    'Kaynak fotoğraf<span aria-hidden="true"> → </span>Model üzerinde<span aria-hidden="true"> → </span>Renk alternatifleri<span aria-hidden="true"> → </span>Film': 'Source photo<span aria-hidden="true"> → </span>On model<span aria-hidden="true"> → </span>Color alternatives<span aria-hidden="true"> → </span>Film',
    '<h3>Lacivert-krem takım</h3>': '<h3>Navy and cream set</h3>',
    '<h3>Şeritli eşofman takımı</h3>': '<h3>Striped tracksuit</h3>',
    '>Kaynak fotoğraf: hayalet model</li>': '>Source photo: ghost mannequin</li>',
    '>Üretilen görsel: model üzerinde</li>': '>Generated visual: on model</li>',
    '>Üretilen görsel: adaçayı renk alternatifi</li>': '>Generated visual: sage color alternative</li>',
    '>Üretilen görsel: bordo renk alternatifi</li>': '>Generated visual: burgundy color alternative</li>',
    '>Üretilen görsel: lacivert renk alternatifi</li>': '>Generated visual: navy color alternative</li>',
    'Aynı takımın lacivert renkte model üzerindeki görünümü': 'The same set in navy, on a model',
    'Aynı takımın siyah renkte model üzerindeki görünümü': 'The same set in black, on a model',
    'Takımın adaçayı renk alternatifi': 'The sage color alternative of the set',
    'Takımın bordo renk alternatifi': 'The burgundy color alternative of the set',
    'Takımın lacivert renk alternatifi': 'The navy color alternative of the set',
    '<h3>Diğer filmler</h3>': '<h3>Other films</h3>',
    'QUINZELL filmi: Gece senin ritmin, 16 saniye': 'QUINZELL film: The night is your rhythm, 16 seconds',
    'Gece çatı sahasında bordo şeritli takımla yürüyen erkek': 'A man walking across a rooftop court at night in a burgundy striped set',
    '<figcaption>Gece senin ritmin, 16 sn</figcaption>': '<figcaption>The night is your rhythm, 16 sec</figcaption>',
    'QUINZELL filmi: Günün ritminde, 10 saniye': 'QUINZELL film: In the rhythm of the day, 10 seconds',
    'Kafe önünde krem renkli takım giyen kadın': 'A woman in a cream set in front of a café',
    '<figcaption>Günün ritminde, 10 sn</figcaption>': '<figcaption>In the rhythm of the day, 10 sec</figcaption>',
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
    'Pembe kemerli mekânda çilekli Frutibon yiyen üç arkadaş': 'Three friends eating strawberry Frutibon in a pink arched space',
    # DAL
    '>Kökünden sofrana.<': '>From root to table.<',
    '>Konsept marka, 16 sn<': '>Concept brand, 16 sec<',
    'DAL için zeytinlikten sofraya uzanan bir görsel hikâye kurduk. Sıcak gün ışığını, doğal dokuları ve metal ambalajı aynı dünyada buluşturduk. Kısa film ve dokuz karelik görsel seri boyunca ürünün geldiği yerle tüketildiği an arasındaki bağı işledik.': 'For DAL, we built a visual story that runs from the olive grove to the table. We brought warm sunlight, natural textures and metal packaging into one world. Through a short film and a nine-frame visual series, we explored the bond between where the product comes from and the moment it is enjoyed.',
    'Sahne tasarımı, AI destekli görsel ve hareket üretimi, kurgu.': 'Scene design, AI-assisted visual and motion production, editing.',
    '16 saniyelik film, dokuz karelik kampanya görsel serisi. Format: dikey film, 4:5 görsel seri.': '16-second film, nine-frame campaign visual series. Format: vertical film, 4:5 visual series.',
    'Konsept marka çalışmasıdır. Ticari bir marka iş birliği kapsamında hazırlanmamıştır.': 'Concept brand work. Not created as part of a commercial brand collaboration.',
    'DAL filmi: Kökünden sofrana, 16 saniye': 'DAL film: From root to table, 16 seconds',
    'DAL × mon: zeytin, yağ dokuları, portreler ve metal ambalajı buluşturan dokuz karelik görsel seri': 'DAL × mon: a nine-frame visual series bringing together olives, oil textures, portraits and metal packaging',
    'DAL × mon görsel serisi': 'DAL × mon visual series',
    # Melty
    '>Bir kare de kendine.<': '>A frame for yourself.<',
    'MELTY’yi, gün içinde kendine ayırdığın küçük bir molanın parçası olarak hayal ettik. Fotoğraf kabini, kadife perde ve fotoğraf şeritleri etrafında kurduğumuz seri, dudak balmına samimi ve oyunbaz bir dünya açıyor.': 'We imagined MELTY as part of a small break you take for yourself during the day. Built around a photo booth, a velvet curtain and photo strips, the series opens a warm, playful world for the lip balm.',
    'Karakter ve mekân tasarımı, AI destekli görsel üretimi.': 'Character and location design, AI-assisted visual production.',
    'Dokuz karelik kampanya görsel serisi. Format: 4:5.': 'Nine-frame campaign visual series. Format: 4:5.',
    'MELTY × mon: çilek, pembe ürün, retro objeler ve sıcak ışıkla tasarlanmış dokuz karelik kampanya serisi': 'MELTY × mon: a nine-frame campaign series designed with strawberries, the pink product, retro objects and warm light',
    'MELTY × mon görsel serisi': 'MELTY × mon visual series',
    # Luma
    '>Işık iz bırakır.<': '>Light leaves a trace.<',
    'LUMA için gümüşün heykelsi formunu ve ışıkla değişen yüzeyini merkeze aldık. Atölye detaylarını, ürün yakın planlarını ve kullanım sahnelerini aynı seride buluşturarak takıyı hem bir tasarım nesnesi hem kişisel bir ifade olarak ele aldık.': 'For LUMA, we centered on silver’s sculptural form and its surface that changes with light. Bringing workshop details, product close-ups and lifestyle scenes into one series, we treated jewelry as both a design object and a personal expression.',
    'AI destekli sahne ve görsel üretimi.': 'AI-assisted scene and visual production.',
    'LUMA × mon: gümüş yüzük, küpe ve bilezikleri gösteren dokuz karelik kampanya serisi': 'LUMA × mon: a nine-frame campaign series showing a silver ring, earrings and bracelets',
    'LUMA × mon görsel serisi': 'LUMA × mon visual series',
    # Bölüm içi kısa etiketler
    '</span> Film<': '</span> Film<',
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
