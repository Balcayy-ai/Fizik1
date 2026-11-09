# Stil Prompt: Kâğıt Poster (Paper Poster)

Bu prompt, referans tasarım dilini ("Kâğıt Poster") eksiksiz bir hareketli grafik (motion graphics) ve açıklayıcı video (explainer video) üretim sistemine dönüştürmek için hazırlanmış zanaat kılavuzudur. Amaç bir slayt gösterisi ya da kartların sağdan sola kaydığı standart bir sunum yapmak değil; sahnelerin birbirinin içinden doğduğu, illüstrasyonların ve matematiksel formüllerin fiziksel olarak krem kâğıt üzerine düz mürekkeple basılmış gibi hissettirdiği, stüdyo kalitesinde bir görsel anlatım üretmektir.

---

# 1. PROJECT CONFIGURATION — EDIT SETTINGS ONLY HERE

**Topic:** {{KONU}}

- Storyboard: {{STORYBOARD}}
- Voiceover: {{SES}}
- Subtitles: Disabled
- Duration without voiceover: 30 seconds
- Format: {{BICIM}}
- Frame rate: 30 fps
- Sound effects: {{EFEKT}}
- Background music: {{MUZIK}}
- Final video format: MP4 (out/final.mp4)

This is the only editable section and the single source of truth. The topic is free text, a sentence or a paragraph; every object, fact, label, number and scene must come from it or from the narration, never from examples elsewhere in this prompt. The same prompt must work for unrelated subjects. All on-screen text is in the language of the topic. If the topic names real products or companies, use their authentic logos and colours, never invented branding.

# 2. HOW TO WORK — CLAUDE CODE

You are running in Claude Code inside a project folder.

- **Build:** create the animation here as `index.html` (plus JS/CSS files if useful). Expose `window.seek(t)` (t in seconds) that draws the exact frame for time t deterministically: no dependence on requestAnimationFrame timing, `Date.now()` or unseeded `Math.random()`. Timing is proportional to the resolved duration, never hard-coded.
- **Render:** drive headless Chrome (Chrome DevTools Protocol, Puppeteer or Playwright; install what is missing), call `seek(i / fps)` for every frame, capture at the configured native resolution and encode with ffmpeg to `out/final.mp4` (H.264, yuv420p).
- **Voiceover enabled:** the recording is in this folder and its duration is the master clock. Get word-level timestamps with Whisper (mlx-whisper or openai-whisper; install if missing) and align each visual idea to the moment it is spoken. Mux the recording into the final MP4. Never invent narration or timestamps.
- **Voiceover disabled:** use the fixed duration and let the pictures, concise on-screen text and moving diagrams carry the explanation.
- **Sound effects enabled:** fetch CC0 sounds from Openverse, `https://api.openverse.org/v1/audio/?q=<search>&license=cc0` (no key needed). Keep them sparse and tied to meaningful moments, place them with ffmpeg at exact timestamps, list sources in `CREDITS.md`.
- **Background music enabled:** use only the music file the user placed in this folder, mixed well below the narration with ducking. Do not synthesize music.
- **Storyboard enabled:** first write a scene table (time, idea, composition, motion, on-screen text) and render PNG preview frames of the key scenes, then stop and ask for approval. Disabled: plan internally and deliver the finished video.

# 3. QUALITY STANDARD

- **An explanation, not a demo reel.** Decide what the viewer must understand, then make the graphics themselves explain it: objects that transform, diagrams that build, numbers that move. Decoration that teaches nothing is cut.
- **Connected storytelling.** Scenes grow out of each other; an element from one idea becomes the start of the next. It must never feel like a slideshow of separate cards.
- **Clear hierarchy.** One main idea per moment, one focal point, generous margins, text readable on a phone and held still long enough to read.
- **Smooth.** Easing on everything, no jitter, no popping, no frame where nothing is decided.

# 4. VERIFICATION

Render many frames as PNG across the whole timeline and look at them. Fix overflowing, overlapping, unreadable, empty or broken frames, and anything that looks generic rather than in this style, until you are proud of the result. Then render the final MP4 and report briefly what it shows.

---

# 5. GÖRSEL DİL VE PALET (VISUAL LANGUAGE & PALETTE)

"Kâğıt Poster" stili, geleneksel serigrafi (screen printing), risograf ve 20. yüzyıl ortası İsviçre/Alman teknik poster tasarımının modern dijital hareketle buluşmasıdır.

### Renk Paleti ve Kesin Kodlar:
1. **Krem (Ham Kağıt Zemini): `#F3F0E6` (Oran: ~60%)**
   - Asla saf dijital beyaz (`#FFFFFF`) kullanılmaz. Sıcak, dokulu, selüloz ve pamuk karışımı mat kitap kağıdıdır.
2. **Koyu Mürekkep (Deep Charcoal Ink): `#111410` (Oran: ~25%)**
   - Katı baskı mürekkebi. Hafif sıcak zeytiniye çalan siyah. Ana çizimler, kalın tipografi, sınır çerçeveleri ve koyu arka plan blokları bu renkle basılır.
3. **Zeytin Yeşili (Olive Drab): `#68725F` (Oran: ~10%)**
   - İkincil teknik ton. Eksen çizgileri, kılavuzlar, alt başlıklar, açıklayıcı teknik etiketler ve gölge katmanları için kullanılır.
4. **Asit Lime Yeşili (Acid Lime Accent): `#D5FA73` (Oran: ~5%)**
   - **KATI KURAL:** Lime asla ana zemin olarak kullanılamaz. Yalnızca koyu mürekkep bloğunun içinde bir vurgu hapı (pill), kritik formül kutusu, koli/washi bant çıkartması veya en can alıcı vektör okunun üzerinde elektrikli bir temas noktası olarak kullanılır.

---

# 6. MALZEME VE YÜZEY (MATERIAL & SURFACE)

* **Sabit Kağıt Greni (Static Paper Grain):**
  - Ekranda titreşen ya da kaynayan video gürültüsü (noise) DEĞİLDİR. Kağıdın kendi dokusudur. Çözünürlükten bağımsız, deterministik bir prosedürel pattern ile oluşturulur.
* **Düz Mürekkep Baskı (Flat Screenprint Ink):**
  - Dijital parıltılar, cam efektleri, gradyan geçişleri ve yapay "drop shadow" kesinlikle yasaktır. Mürekkep kağıdın liflerine nüfuz etmiştir; gölgeler sert, düz kesimli ve ofsetlenmiş mürekkep bloklarıdır.
* **Washi / Koli Bandı Çıkartmaları (Masking Tape Tabs):**
  - Posterin üst kenarında veya modüler bilgi bloklarının üzerinde `#D5FA73` renginde, hafif açılı ($-1.5^\circ$ ile $+2^\circ$) şeffaf olmayan bantlar yer alır.

---

# 7. TİPOGRAFİ MİMARİSİ (TYPOGRAPHY)

* **Başlıklar (Display / Headlines):**
  - `Oswald`, `Anton` veya `League Gothic` (Google Fonts).
  - 900 Ultra-Bold, dar (condensed), büyük harf (UPPERCASE), sıkı harf aralığı (`letter-spacing: -0.01em`).
  - Boyut: 70px – 100px arası devasa ve heykelsi kontrast.
* **Alt Başlıklar & Anlatım (Editorial Serif):**
  - `Playfair Display` veya `Fraunces`.
  - 700 Bold İtalik veya Regular. Boyut: 22px – 28px. Bilimsel ve editoryal bir ciddiyet sağlar.
* **Veriler, Formüller ve Teknik Notlar (Technical Monospace):**
  - `Space Mono` veya `Fira Code`.
  - Sabit genişlikli, teknik arşiv havası veren, sayılar ve matematiksel semboller için ideal font.

---

# 8. KOMPOZİSYON VE İLLÜSTRASYON İLKELERİ

1. **Tek Büyük Odak İllüstrasyonu:**
   - Her sahne tek bir baskın görsel fikir üzerine kurulur (örneğin dairesel bir yörünge, 1D eksende fren yapan bir kütle bloğu, kovalayan iki eğri).
2. **Negatif Alan (Negative Space) Cömertliği:**
   - Kağıdın nefes almasına izin verilir. Bilgi ekranın köşelerine tıkıştırılmaz. Dışta en az 60px genişliğinde çift hatlı poster sınır çerçevesi bulunur.
3. **Cümle Yazmama Kuralı:**
   - Ekrana uzun paragraf metinleri yazılmaz. Görüntü konuşur; ekrandaki metinler formüller, fiziksel büyüklükler ve kısa teknik etiketlerdir.

---

# 9. HAREKET FELSEFESİ VE DÖNÜŞÜMLER (SIGNATURE MOTION)

* **Sahnelerin Birbirinden Doğması:**
  - Sahneler slide gibi kaybolup yeni kart gelmez. Sahne 1'deki dairesel yörünge doğrultulup Sahne 2'deki 1D hareket eksenine dönüşür. O eksendeki durma noktası, Sahne 3'teki iki araçlı kovalama grafiğinin orijin noktası olarak açılır. O kesişim noktası genişleyerek Sahne 4'teki Kartezyen koordinat sistemini doğurur.
* **Kamera ve Ölçekleme:**
  - Değişimler düz kesmeler (cut) veya yavaşça bir detaya girip (zoom-in) oradan yeni bir dünyaya açılan sürekli kamera hareketleriyle yapılır.
* **Easing:**
  - Doğrusal (linear) hareket yasaktır. Her hareket `easeInOutCubic` veya `easeOutExpo` ile yumuşatılır; önemli damgalarda hafif bir darbe hissi (`easeOutBack`) kullanılır.

---

# 10. KAÇINILMASI GEREKEN UCUZ HİLELER (CHEAP SHORTCUTS TO AVOID)

1. **Yapay Cam / Neomorfizm / Bulanıklık (Blur):** Kesinlikle yasak; her şey katı mürekkep ve kağıt sınırlarında kalmalıdır.
2. **Daktilo Yazı Efekti (Typewriter Effect):** Cümlelerin harf harf yazılması izleyiciyi yorar; metinler tek seferde net bir şekilde ekrana yerleşmeli ve okunurken sabit kalmalıdır.
3. **Yüzen Kartlar / Parıltılı Işıklar:** Dijital pazarlama template'leri yerine serigrafi mürekkep blokları kullanılmalıdır.
4. **Neon Lime'ın Zemin Olması:** Lime aşırı parlak bir renktir, zemin olursa estetiği mahveder. Yalnızca koyu arka planda küçük bir detay olmalıdır.
