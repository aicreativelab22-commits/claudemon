// Proje içeriğinin tek kaynağı. Değiştirince araclar/sayfalari_uret.py ile projeler/*.html yeniden üretilir.
window.MON_PROJECTS = [
  {
    "id": "mentos",
    "name": "MENTOS",
    "title": "Şehrin ritminde.",
    "tag": "Hibrit üretim",
    "duration": "34 sn",
    "idea": "Şehir hiç durmaz; Mentos da. İstanbul’un sokaklarından sahiline uzanan bu filmde marka, günün akışına küçük bir ferahlık anı olarak katılıyor.",
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
    "idea": "Zeytinlikten sofraya uzanan kısa bir film. Aynı karakter, sıcak gün ışığı ve metal ambalaj, doğayla ürün arasında bağ kuruyor.",
    "role": "Sahne tasarımı, AI destekli görsel ve hareket üretimi, kurgu.",
    "outputs": "16 saniyelik film, dokuz karelik kampanya görsel serisi. Format: dikey film, 4:5 görsel seri.",
    "status": "Konsept marka çalışması. Ticari müşteri işi değildir.",
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
    "idea": "Peach, Cherry Coke, Strawberry Velvet ve Coffee. Her ton aynı akışla anlatılıyor: ürün, ilham aldığı lezzet, doku ve dudak üzerindeki sonuç.",
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
    "tag": "Müşteri işi",
    "duration": "15 sn",
    "idea": "Günün ilk ışığından akşama, aynı şehirde tek bir kombin. Bej trençkot ve altın payetli etek her saatte yeni bir ışıkla buluşuyor; ürün aynı kalırken hissettirdiği değişiyor.",
    "role": "Marka ürünlerinden sahne tasarımı, AI destekli görsel ve hareket üretimi, film kurgusu.",
    "outputs": "15 saniyelik moda filmi. Format: dikey, 9:16.",
    "status": "Müşteri işi. Happy to Wear için hazırlandı.",
    "stills": [],
    "alt": "Güneşli taş meydanda bej trençkot ve altın payetli etekle yürüyen kadın"
  },
  {
    "id": "quinzell",
    "name": "QUINZELL",
    "title": "Hayalet modelden moda filmine.",
    "tag": "Müşteri işi",
    "duration": "3 film",
    "idea": "Quinzell, yeni çıkacak bir giyim markası. Hayalet model fotoğrafından yola çıkıp ürünü model üzerinde gösterdik, renk seçeneklerini açtık ve aynı görselleri üç kısa moda filmine taşıdık.",
    "role": "Model giydirme, renk çalışması ve video üretimi tek süreçte ilerledi. Ekip, renk alternatiflerini model üzerinde görerek üretim kararlarını değerlendirebiliyor.",
    "outputs": "Üç kısa moda filmi ve iki ürün için görsel dizi. Format: dikey film, dikey görsel.",
    "status": "Müşteri işi. Quinzell için hazırlandı.",
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
    "idea": "Bütün çilek, akan bitter çikolata ve üç arkadaşın paylaştığı bir an. Pembe ve bordo tonlarda kurulan sahnelerde ürün, paylaşılan küçük bir keyfe dönüşüyor.",
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
    "idea": "Bir fotoğraf kabinindeki küçük mola. Dudak balmı, kadife perde ve fotoğraf şeridiyle gündelik bir ürün kişisel bir anın parçası oluyor.",
    "role": "Karakter ve mekân tasarımı, AI destekli görsel üretimi.",
    "outputs": "Dokuz karelik kampanya görsel serisi. Format: 4:5.",
    "status": "Konsept marka çalışması. Ticari müşteri işi değildir.",
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
    "idea": "Gümüşün yüzeyi, atölyedeki dokunuş ve takının kullanımı. Yakın planlarla malzemeyi, portrelerle ürünün kişisel tarafını anlatan bir çalışma.",
    "role": "AI destekli sahne ve görsel üretimi.",
    "outputs": "Dokuz karelik kampanya görsel serisi. Format: 4:5.",
    "status": "Konsept marka çalışması. Ticari müşteri işi değildir.",
    "stills": [
      ["luma-pano", "LUMA × mon görsel serisi", 1000, 1250]
    ],
    "alt": "Koyu fonda heykelsi gümüş LUMA yüzük"
  }
];
