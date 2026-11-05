// İngilizce proje içeriği. Yapı ve dosya adları ../projeler.js ile aynı kalır; değiştirince araclar/sayfalari_uret.py yeniden çalıştırılır.
window.MON_PROJECTS = [
  {
    "id": "mentos",
    "name": "MENTOS",
    "title": "In the rhythm of the city.",
    "tag": "Hybrid production",
    "duration": "34 sec",
    "idea": "We added an unexpected Mentos moment to Istanbul’s everyday flow. By bringing street and seaside footage together with AI-generated scenes, we carried the idea of freshness to the scale of the city. Made with Afternoon Film Pro, the film brings real footage and imagination into one story.",
    "role": "The camera recorded, imagination kept going. Working with our shooting partner, we started with reality and opened up its limits with AI.",
    "outputs": "34-second ad film. Format: vertical, 9:16.",
    "status": "Co-produced with Afternoon Film Pro. Made for Mentos.",
    "stills": [],
    "alt": "A person carrying a blue Mentos tote bag"
  },
  {
    "id": "bps",
    "name": "BPS",
    "title": "A world in every drop.",
    "tag": "Brand collaboration",
    "duration": "16 sec",
    "idea": "Scent can’t be seen, so we made it visible. Starting with a scent strip, the film follows a single drop into floral, fruit and vanilla notes and comes together in the BPS bottles.",
    "role": "Film and visual production, editing.",
    "outputs": "16-second film. Format: vertical, 9:16.",
    "status": "Made as part of a brand collaboration with BPS.",
    "stills": [],
    "alt": "BPS essence bottles arranged with flowers and fruit on stone steps"
  },
  {
    "id": "dal",
    "name": "DAL",
    "title": "From root to table.",
    "tag": "Concept brand",
    "duration": "16 sec",
    "idea": "For DAL, we built a visual story that runs from the olive grove to the table. We brought warm sunlight, natural textures and metal packaging into one world. Through a short film and a nine-frame visual series, we explored the bond between where the product comes from and the moment it is enjoyed.",
    "role": "Scene design, AI-assisted visual and motion production, editing.",
    "outputs": "16-second film, nine-frame campaign visual series. Format: vertical film, 4:5 visual series.",
    "status": "Concept brand work. Not created as part of a commercial brand collaboration.",
    "stills": [
      ["dal-pano", "DAL × mon visual series", 1000, 1250]
    ],
    "alt": "Bread and DAL olive oil on a stone table in an olive grove"
  },
  {
    "id": "kremi",
    "name": "KREMİ",
    "title": "Four shades, one touch.",
    "tag": "Independent concept",
    "duration": "20 sec",
    "idea": "For four colors, we built a narrative that makes their inspirations visible. We brought the Peach, Cherry Coke, Strawberry Velvet and Coffee shades together in a short film that moves between product, flavor association, texture and the look on the lips.",
    "role": "Product and texture shots, color storytelling, AI-assisted visual and motion production, editing.",
    "outputs": "20-second film. Format: vertical, 9:16.",
    "status": "Independent concept work. It does not claim any collaboration or client relationship with Kremi.",
    "credit": "Music: “Bossa Antigua”, Kevin MacLeod (incompetech.com), licensed under CC BY 4.0 (creativecommons.org/licenses/by/4.0). Shortened for the film; volume and fades adjusted.",
    "stills": [],
    "alt": "A red Kremi lip balm tube on a cream background"
  },
  {
    "id": "happy-to-wear",
    "name": "HAPPY TO WEAR",
    "title": "Your day changes, your sparkle stays.",
    "tag": "Brand collaboration",
    "duration": "15 sec",
    "idea": "We explored a single outfit through the day’s changing light and atmosphere. Taking the beige trench coat and gold sequin skirt into a city story from morning to evening, we highlighted the collection’s character across different moments.",
    "role": "Scene design from the brand’s products, AI-assisted visual and motion production, film editing.",
    "outputs": "15-second fashion film. Format: vertical, 9:16.",
    "status": "Made as part of a brand collaboration with Happy to Wear.",
    "stills": [],
    "alt": "A woman walking across a sunny stone square in a beige trench coat and gold sequin skirt"
  },
  {
    "id": "quinzell",
    "name": "QUINZELL",
    "title": "From ghost mannequin to fashion film.",
    "tag": "Brand collaboration",
    "duration": "3 films",
    "idea": "How far can a single product photo go? Starting from Quinzell’s ghost mannequin photos, we created on-model visuals, color alternatives and three short fashion films. Showing the same products in different colors and scenes, the work also gave the team room to weigh their options before production.",
    "role": "Model styling, color work and video production moved forward in one process. The team can weigh production decisions by seeing the color alternatives on a model.",
    "outputs": "Three short fashion films and visual series for two products. Format: vertical film, vertical visuals.",
    "status": "Made as part of a brand collaboration with Quinzell.",
    "films": [
      ["quinzell-renk", "Color change", "18 sec"],
      ["quinzell-gece", "The night is your rhythm", "16 sec"],
      ["quinzell", "In the rhythm of the day", "10 sec"]
    ],
    "flow": ["Source photo", "On model", "Color alternatives", "Film"],
    "chains": [
      {
        "title": "Navy and cream set",
        "items": [
          ["quinzell-u1-manken", "Source photo: ghost mannequin", 640, 853],
          ["quinzell-u1-model", "Generated visual: on model", 640, 960],
          ["quinzell-u1-renk1", "Generated visual: sage color alternative", 640, 960],
          ["quinzell-u1-renk2", "Generated visual: burgundy color alternative", 640, 960]
        ]
      },
      {
        "title": "Striped tracksuit",
        "items": [
          ["quinzell-u2-manken", "Source photo: ghost mannequin", 640, 853],
          ["quinzell-u2-model", "Generated visual: on model", 640, 960],
          ["quinzell-u2-renk1", "Generated visual: burgundy color alternative", 640, 960],
          ["quinzell-u2-renk2", "Generated visual: navy color alternative", 640, 960]
        ]
      }
    ],
    "stills": [],
    "alt": "A woman walking on a treadmill in a navy and cream Quinzell set"
  },
  {
    "id": "frutibon",
    "name": "FRUTIBON",
    "title": "Dark chocolate, whole fruit.",
    "tag": "Independent concept",
    "duration": "15 sec",
    "idea": "We told the story of strawberry and dark chocolate through a small moment of pleasure shared among friends. Combining product close-ups with a warm get-together scene, we brought out the feeling of sharing as much as the flavor.",
    "role": "Character and scene design, AI-assisted visual and motion production, editing and sound.",
    "outputs": "15-second film. Format: vertical, 9:16.",
    "status": "Independent concept work. It does not claim any collaboration or client relationship with Kahve Dünyası / Frutibon.",
    "stills": [],
    "alt": "Three friends eating strawberry Frutibon in a pink arched space"
  },
  {
    "id": "melty", "gorselOnly": true,
    "name": "MELTY",
    "title": "A frame for yourself.",
    "tag": "Concept brand",
    "idea": "We imagined MELTY as part of a small break you take for yourself during the day. Built around a photo booth, a velvet curtain and photo strips, the series opens a warm, playful world for the lip balm.",
    "role": "Character and location design, AI-assisted visual production.",
    "outputs": "Nine-frame campaign visual series. Format: 4:5.",
    "status": "Concept brand work. Not created as part of a commercial brand collaboration.",
    "stills": [
      ["melty-gorsel-dunya", "MELTY × mon visual series", 1000, 1250]
    ],
    "alt": "MELTY lip balm in a pink photo booth"
  },
  {
    "id": "luma", "gorselOnly": true,
    "name": "LUMA",
    "title": "Light leaves a trace.",
    "tag": "Concept brand",
    "idea": "For LUMA, we centered on silver’s sculptural form and its surface that changes with light. Bringing workshop details, product close-ups and lifestyle scenes into one series, we treated jewelry as both a design object and a personal expression.",
    "role": "AI-assisted scene and visual production.",
    "outputs": "Nine-frame campaign visual series. Format: 4:5.",
    "status": "Concept brand work. Not created as part of a commercial brand collaboration.",
    "stills": [
      ["luma-pano", "LUMA × mon visual series", 1000, 1250]
    ],
    "alt": "A sculptural silver LUMA ring on a dark background"
  }
];
