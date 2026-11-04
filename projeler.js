// Proje içeriğinin tek kaynağı. Değiştirince araclar/sayfalari_uret.py ile projeler/*.html yeniden üretilir.
window.MON_PROJECTS = [
  {
    "id": "mentos",
    "name": "MENTOS",
    "title": "Şehrin ritminde.",
    "tag": "Hibrit üretim",
    "duration": "34 sn",
    "idea": "İstanbul’un gündelik akışına beklenmedik bir Mentos anı ekledik. Sokak ve sahil görüntülerini AI ile üretilen sahnelerle buluşturarak ferahlık fikrini şehrin ölçeğine taşıdık. Afternoon Film Pro ile hazırladığımız film, gerçek çekimle hayal gücünü aynı hikâyede birleştiriyor.",
    "role": "Kamera kaydetti, hayal gücü devam etti. Çekim ortağımızla birlikte yaptığımız çalışmada gerçekle başladık, sınırları yapay zekâyla açtık.",
    "outputs": "34 saniyelik reklam filmi. Format: dikey, 9:16.",
    "status": "Afternoon Film Pro ile ortak üretim. Mentos için hazırlandı.",
    "stills": [],
    "alt": "Mentos Ferahlığı Hisset yazılı mavi bez çanta taşıyan kişi"
  },
  {
    "id": "dal",
    "name": "DAL",
    "title": "Kökünden sofrana.",
    "tag": "Konsept marka",
    "duration": "16 sn",
    "idea": "DAL için zeytinlikten sofraya uzanan bir görsel hikâye kurduk. Sıcak gün ışığını, doğal dokuları ve metal ambalajı aynı dünyada buluşturduk. Kısa film ve dokuz karelik görsel seri boyunca ürünün geldiği yerle tüketildiği an arasındaki bağı işledik.",
    "role": "Sahne tasarımı, AI destekli görsel ve hareket üretimi, kurgu.",
    "outputs": "16 saniyelik film, dokuz karelik kampanya görsel serisi. Format: dikey film, 4:5 görsel seri.",
    "status": "Konsept marka çalışmasıdır. Ticari bir marka iş birliği kapsamında hazırlanmamıştır.",
    "stills": [
      ["dal-pano", "DAL × mon görsel serisi", 1000, 1250]
    ],
    "alt": "Zeytinlikte taş masada ekmek ve DAL zeytinyağı"
  },
  {
    "id": "kremi",
    "name": "KREMİ",
    "title": "Dört ton, bir dokunuş.",
    "tag": "Bağımsız konsept",
    "duration": "20 sn",
    "idea": "Dört renk için, ilhamlarını görünür kılan bir anlatım kurduk. Peach, Cherry Coke, Strawberry Velvet ve Coffee tonlarını ürün, lezzet çağrışımı, doku ve dudak üzerindeki görünüm arasında ilerleyen kısa bir filmde buluşturduk.",
    "role": "Ürün ve doku planları, renk anlatımı, AI destekli görsel ve hareket üretimi, kurgu.",
    "outputs": "20 saniyelik film. Format: dikey, 9:16.",
    "status": "Bağımsız konsept çalışması. Kremi ile iş birliği veya müşteri ilişkisi iddiası taşımaz.",
    "credit": "Müzik: “Bossa Antigua”, Kevin MacLeod (incompetech.com), CC BY 4.0 lisansı (creativecommons.org/licenses/by/4.0). Film için kısaltıldı; ses düzeyi ve giriş/çıkış yumuşatmaları düzenlendi.",
    "stills": [],
    "alt": "Krem fonda kırmızı Kremi dudak balmı tüpü"
  },
  {
    "id": "happy-to-wear",
    "name": "HAPPY TO WEAR",
    "title": "Günün değişir, ışıltın kalır.",
    "tag": "Marka iş birliği",
    "duration": "15 sn",
    "idea": "Tek bir kombini, günün değişen ışığı ve atmosferi içinde ele aldık. Bej trençkot ve altın payetli eteği sabahtan akşama uzanan bir şehir hikâyesine taşıyarak koleksiyonun farklı anlara eşlik eden karakterini öne çıkardık.",
    "role": "Marka ürünlerinden sahne tasarımı, AI destekli görsel ve hareket üretimi, film kurgusu.",
    "outputs": "15 saniyelik moda filmi. Format: dikey, 9:16.",
    "status": "Happy to Wear ile marka iş birliği kapsamında hazırlandı.",
    "stills": [],
    "alt": "Güneşli taş meydanda bej trençkot ve altın payetli etekle yürüyen kadın"
  },
  {
    "id": "quinzell",
    "name": "QUINZELL",
    "title": "Hayalet modelden moda filmine.",
    "tag": "Marka iş birliği",
    "duration": "3 film",
    "idea": "Bir ürün fotoğrafından ne kadar ileri gidilebilir? Quinzell’in hayalet model fotoğraflarından yola çıkarak model üzerinde görseller, renk alternatifleri ve üç kısa moda filmi hazırladık. Aynı ürünleri farklı renk ve sahnelerde ele alan çalışma, ekibin üretim öncesinde seçenekleri değerlendirmesine de alan açtı.",
    "role": "Model giydirme, renk çalışması ve video üretimi tek süreçte ilerledi. Ekip, renk alternatiflerini model üzerinde görerek üretim kararlarını değerlendirebiliyor.",
    "outputs": "Üç kısa moda filmi ve iki ürün için görsel dizi. Format: dikey film, dikey görsel.",
    "status": "Quinzell ile marka iş birliği kapsamında hazırlandı.",
    "films": [
      ["quinzell-renk", "Renk değişimi", "18 sn"],
      ["quinzell-gece", "Gece senin ritmin", "16 sn"],
      ["quinzell", "Günün ritminde", "10 sn"]
    ],
    "flow": ["Kaynak fotoğraf", "Model üzerinde", "Renk alternatifleri", "Film"],
    "chains": [
      {
        "title": "Lacivert-krem takım",
        "items": [
          ["quinzell-u1-manken", "Kaynak fotoğraf: hayalet model", 640, 853],
          ["quinzell-u1-model", "Üretilen görsel: model üzerinde", 640, 960],
          ["quinzell-u1-renk1", "Üretilen görsel: adaçayı renk alternatifi", 640, 960],
          ["quinzell-u1-renk2", "Üretilen görsel: bordo renk alternatifi", 640, 960]
        ]
      },
      {
        "title": "Şeritli eşofman takımı",
        "items": [
          ["quinzell-u2-manken", "Kaynak fotoğraf: hayalet model", 640, 853],
          ["quinzell-u2-model", "Üretilen görsel: model üzerinde", 640, 960],
          ["quinzell-u2-renk1", "Üretilen görsel: bordo renk alternatifi", 640, 960],
          ["quinzell-u2-renk2", "Üretilen görsel: lacivert renk alternatifi", 640, 960]
        ]
      }
    ],
    "stills": [],
    "alt": "Koşu bandında lacivert-krem Quinzell takımıyla yürüyen kadın"
  },
  {
    "id": "frutibon",
    "name": "FRUTIBON",
    "title": "Bitter çikolata, bütün meyve.",
    "tag": "Bağımsız konsept",
    "duration": "15 sn",
    "idea": "Çilek ve bitter çikolatanın birlikteliğini, arkadaşlar arasında paylaşılan küçük bir keyif anıyla anlattık. Ürün yakın planlarını sıcak bir buluşma sahnesiyle birleştirerek lezzet kadar paylaşma hissini de öne çıkardık.",
    "role": "Karakter ve sahne tasarımı, AI destekli görsel ve hareket üretimi, kurgu ve ses.",
    "outputs": "15 saniyelik film. Format: dikey, 9:16.",
    "status": "Bağımsız konsept çalışması. Kahve Dünyası / Frutibon ile iş birliği veya müşteri ilişkisi iddiası taşımaz.",
    "stills": [],
    "alt": "Pembe kemerli mekânda çilekli Frutibon yiyen üç arkadaş"
  },
  {
    "id": "melty", "gorselOnly": true,
    "name": "MELTY",
    "title": "Bir kare de kendine.",
    "tag": "Konsept marka",
    "idea": "MELTY’yi, gün içinde kendine ayırdığın küçük bir molanın parçası olarak hayal ettik. Fotoğraf kabini, kadife perde ve fotoğraf şeritleri etrafında kurduğumuz seri, dudak balmına samimi ve oyunbaz bir dünya açıyor.",
    "role": "Karakter ve mekân tasarımı, AI destekli görsel üretimi.",
    "outputs": "Dokuz karelik kampanya görsel serisi. Format: 4:5.",
    "status": "Konsept marka çalışmasıdır. Ticari bir marka iş birliği kapsamında hazırlanmamıştır.",
    "stills": [
      ["melty-gorsel-dunya", "MELTY × mon görsel serisi", 1000, 1250]
    ],
    "alt": "Pembe fotoğraf kabininde MELTY dudak balmı"
  },
  {
    "id": "luma", "gorselOnly": true,
    "name": "LUMA",
    "title": "Işık iz bırakır.",
    "tag": "Konsept marka",
    "idea": "LUMA için gümüşün heykelsi formunu ve ışıkla değişen yüzeyini merkeze aldık. Atölye detaylarını, ürün yakın planlarını ve kullanım sahnelerini aynı seride buluşturarak takıyı hem bir tasarım nesnesi hem kişisel bir ifade olarak ele aldık.",
    "role": "AI destekli sahne ve görsel üretimi.",
    "outputs": "Dokuz karelik kampanya görsel serisi. Format: 4:5.",
    "status": "Konsept marka çalışmasıdır. Ticari bir marka iş birliği kapsamında hazırlanmamıştır.",
    "stills": [
      ["luma-pano", "LUMA × mon görsel serisi", 1000, 1250]
    ],
    "alt": "Koyu fonda heykelsi gümüş LUMA yüzük"
  }
];
