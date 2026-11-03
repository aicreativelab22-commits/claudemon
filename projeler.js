// Proje içeriğinin tek kaynağı. Değiştirince araclar/sayfalari_uret.py ile projeler/*.html yeniden üretilir.
window.MON_PROJECTS = [
  {
    "id": "mentos",
    "name": "MENTOS",
    "title": "Şehrin ritminde.",
    "tag": "Hibrit üretim",
    "duration": "34 sn",
    "idea": "Şehir hiç durmaz; Mentos da. İstanbul’un sokaklarından sahiline uzanan bu filmde marka, günün akışına küçük bir ferahlık anı olarak katılıyor.",
    "role": "Filmi prodüksiyon ekibimizle İstanbul’da, gerçek mekânlarda çektik. Sette mümkün olmayan sahneleri ve efektleri AI üretimle ekledik. Kurgu ve sesle iki kaynağı tek ritimde birleştirdik.",
    "outputs": "34 saniyelik reklam filmi. Format: dikey, 9:16.",
    "status": "Mentos için hazırlandı. Gerçek çekim ve AI üretimi bir arada kullanıldı.",
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
    "decisions": {
      "image": "dal-kare",
      "items": [
        [50, 46, "Metal gövde", "Mat metal ambalaj ve zeytin yeşili kapak, ürüne tek bakışta tanınan bir imza veriyor."],
        [70, 22, "Yaprak gölgesi", "Duvara düşen zeytin dalı gölgesi, ürünü doğaya bağlıyor; sahne zeytinliğin içinde gibi hissettiriyor."],
        [62, 82, "Yeşil mermer", "Damarlı yeşil mermer zeytinin rengini tekrar ediyor; ürünle yarışan başka bir renk kalmıyor."]
      ]
    },
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
    "status": "Bağımsız konsept çalışma. Kremi ile iş birliği veya müşteri ilişkisi iddiası taşımaz.",
    "credit": "Müzik: “Bossa Antigua”, Kevin MacLeod (incompetech.com), CC BY 4.0 lisansı (creativecommons.org/licenses/by/4.0). Film için kısaltıldı; ses düzeyi ve giriş/çıkış yumuşatmaları düzenlendi.",
    "decisions": {
      "image": "kremi-kapak",
      "items": [
        [37, 32, "Akış", "Tüpün üstünden akan krem, ürünün kıvamını tek bakışta gösteriyor."],
        [14, 45, "Ton adı", "Her tonun adı kadrajın iki yanında küçük duruyor; ilgi ürünün renginde kalıyor."],
        [58, 77, "Metal uç", "Metal uç, ürünün nasıl kullanıldığını söylemeden anlatıyor; film sonra dudak üzerindeki sonuca gidiyor."]
      ]
    },
    "stills": [],
    "alt": "Krem fonda kırmızı Kremi dudak balmı tüpü"
  },
  {
    "id": "happy-to-wear",
    "name": "HAPPY TO WEAR",
    "title": "Gün değişir, ışıltın kalır.",
    "tag": "Müşteri işi",
    "duration": "15 sn",
    "idea": "Günün ilk ışığından akşama, aynı şehirde tek bir kombin. Bej trençkot ve altın payetli etek her saatte yeni bir ışıkla buluşuyor; ürün aynı kalırken hissettirdiği değişiyor.",
    "role": "Marka ürünlerinden sahne tasarımı, AI destekli görsel ve hareket üretimi, film kurgusu.",
    "outputs": "15 saniyelik moda filmi. Format: dikey, 9:16.",
    "status": "Gerçek müşteri işi. Happy to Wear için hazırlandı.",
    "stills": [],
    "alt": "Güneşli taş meydanda bej trençkot ve altın payetli etekle yürüyen kadın"
  },
  {
    "id": "quinzell",
    "name": "QUINZELL",
    "title": "Hayalet modelden moda filmine.",
    "tag": "AI moda",
    "duration": "3 film",
    "idea": "Hayalet model fotoğrafından yola çıkıp ürünü model üzerinde göstermek, renk seçeneklerini açmak ve aynı görselleri harekete taşımak. Model giydirme, renk çalışması ve video üretimi tek süreçte ilerliyor.",
    "role": "Hayalet model fotoğraflarından ürünü model üzerinde görselleştirme, renk alternatifleri geliştirme ve görselleri videoya dönüştürme.",
    "outputs": "Üç kısa moda filmi, model üzerinde ürün görselleri ve renk alternatifleri. Format: dikey film, dikey görsel.",
    "status": "Portfolyo çalışması. AI destekli moda görseli ve video üretimi.",
    "films": [
      ["quinzell-renk", "Renk değişimi", "18 sn"],
      ["quinzell-gece", "Gece senin ritmin", "16 sn"],
      ["quinzell", "Günün ritminde", "10 sn"]
    ],
    "chains": [
      {
        "title": "Lacivert-krem takım",
        "items": [
          ["quinzell-u1-manken", "Hayalet model", 640, 853],
          ["quinzell-u1-model", "Model üzerinde", 640, 960],
          ["quinzell-u1-renk1", "Model ve renk alternatifi: adaçayı", 640, 960],
          ["quinzell-u1-renk2", "Model ve renk alternatifi: bordo", 640, 960]
        ]
      },
      {
        "title": "Şeritli eşofman takımı",
        "items": [
          ["quinzell-u2-manken", "Hayalet model", 640, 853],
          ["quinzell-u2-model", "Model üzerinde", 640, 960],
          ["quinzell-u2-renk1", "Renk alternatifi: bordo", 640, 960],
          ["quinzell-u2-renk2", "Renk alternatifi: lacivert", 640, 960]
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
    "status": "Bağımsız konsept çalışma. Kahve Dünyası / Frutibon ile iş birliği veya müşteri ilişkisi iddiası taşımaz.",
    "stills": [],
    "alt": "Pembe kemerli mekânda çilekli Frutibon yiyen üç arkadaş"
  },
  {
    "id": "melty",
    "name": "MELTY",
    "title": "Bir kare de kendine.",
    "tag": "Konsept marka",
    "duration": "12 sn",
    "idea": "Bir fotoğraf kabinindeki küçük mola. Dudak balmı, kadife perde ve fotoğraf şeridiyle gündelik bir ürün kişisel bir anın parçası oluyor.",
    "role": "Karakter ve mekân tasarımı, AI destekli sahne ve hareket üretimi, kurgu.",
    "outputs": "12 saniyelik film, dokuz karelik kampanya görsel serisi. Format: dikey film, 4:5 görsel seri.",
    "status": "Konsept marka çalışması. Ticari müşteri işi değildir.",
    "decisions": {
      "image": "melty-kapak",
      "items": [
        [14, 12, "Kadife perde", "Bordo kadife perde fotoğraf kabinini tek kadrajda anlatıyor ve pembe ürünü öne çıkarıyor."],
        [80, 38, "Yüzün yanında", "Tüp kameraya bir poz gibi tutuluyor; ürün reklam objesi değil, anın parçası oluyor."],
        [33, 65, "Sıcak doku", "Krem triko ve bordo çanta askısı perdeyle aynı paletten geliyor; sahneye nostaljik bir sıcaklık katıyor."]
      ]
    },
    "stills": [
      ["melty-gorsel-dunya", "MELTY × mon görsel serisi", 1000, 1250]
    ],
    "alt": "Pembe fotoğraf kabininde MELTY dudak balmı"
  },
  {
    "id": "luma",
    "name": "LUMA",
    "title": "Işık iz bırakır.",
    "tag": "Konsept marka",
    "duration": "40 sn",
    "idea": "Gümüşün yüzeyi, atölyedeki dokunuş ve takının kullanımı. Yakın planlarla malzemeyi, portrelerle ürünün kişisel tarafını anlatan bir film.",
    "role": "AI destekli sahne üretimi ve altı sahneyi bir araya getiren film kurgusu.",
    "outputs": "40 saniyelik film, dokuz karelik kampanya görsel serisi. Format: dikey film, 4:5 görsel seri.",
    "status": "Konsept marka çalışması. Ticari müşteri işi değildir.",
    "stills": [
      ["luma-pano", "LUMA × mon görsel serisi", 1000, 1250]
    ],
    "alt": "Koyu fonda heykelsi gümüş LUMA yüzük"
  },
  {
    "id": "lost-cherry",
    "name": "TOM FORD / LOST CHERRY",
    "title": "Kırmızı perde.",
    "tag": "Bağımsız konsept",
    "duration": "40 sn",
    "idea": "Parfüm bir sahnenin merkezine yerleşiyor. Bordo perde, tek ışık ve cam yansımaları; şişeden kişisel kullanım anına uzanan ortak bir atmosfer kuruyor.",
    "role": "AI destekli sahne üretimi ve altı sahneyi bir araya getiren film kurgusu.",
    "outputs": "40 saniyelik film. Format: dikey, 9:16.",
    "status": "Bağımsız konsept çalışma. TOM FORD ile iş birliği veya müşteri ilişkisi iddiası taşımaz.",
    "stills": [],
    "alt": "Bordo perdelerin önünde Lost Cherry parfüm şişesi"
  }
];
