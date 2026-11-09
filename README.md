# Fizik 1 (FZM 105) - Tek Boyutta Doğrusal Hareket ve Vektörler
### *~ Berk'ten Sevgilerle ~*

Bu proje, **Fizik 1 (FZM 105)** dersi kapsamında işlenen Fizik ve Ölçüm, Tek Boyutta Doğrusal Hareket ve Vektörler konularına ait tüm teorik notları, formül türetimlerini, çözümlü ders içi problemleri ve sınav özetlerini **"Kâğıt Poster"** tasarım diliyle hazırlanmış interaktif bir sunum ve stüdyo kalitesinde bir motion graphics animasyon motoru olarak bir araya getirir.

---

## 🎨 Tasarım Estetiği: "Kâğıt Poster"
* **Ham Kâğıt Zemini:** `#F3F0E6` (Lifli, sıcak kitap kâğıdı dokusu)
* **Baskı Mürekkebi:** `#111410` (Katı serigrafi mürekkep siyahı)
* **Teknik Ton:** `#68725F` (Zeytin yeşili eksenler ve kılavuzlar)
* **Vurgu:** `#D5FA73` (Asit neon lime bantlar ve formül hapları)
* **Tipografi:** Oswald 900 (kalın, dar başlıklar) • Playfair Display (editoryal serif) • Space Mono (teknik veriler)

---

## 📂 Dosya Yapısı ve Özellikler

| Dosya | Açıklama |
| :--- | :--- |
| **`index.html`** | 1920×1080 Motion Graphics Açıklayıcı Animasyon Motoru. `window.seek(t)` ile tam deterministik çalışır. Tarayıcıda ses efektleriyle canlı izlenebilir. |
| **`Fizik1_Kagit_Poster_Sunum.html`** | 25 slaytlık, KaTeX matematik motorlu, tam ekran (`F`) ve tek tıkla **PDF olarak yazdırılabilir** interaktif sunum. |
| **`out/final.mp4`** | 1080p 30 FPS H.264 stereo foley ses efektli motion graphics açıklayıcı videosu (24 saniye). |
| **`stil-prompt.md`** | Bu görsel dili gelecekte her türlü konuya uyarlayabilen zanaat prompt kılavuzu. |

---

## 🚀 Netlify Dağıtımı (Deployment)

Bu repo Netlify için doğrudan hazır (Zero-Config) statik site formatındadır:

1. [Netlify](https://app.netlify.com/) paneline giriş yapın.
2. **"Add new site" > "Import an existing project"** seçeneğine tıklayın.
3. GitHub hesabınızı bağlayıp `Balcayy-ai/Fizik1` deposunu seçin.
4. **Build settings:**
   - **Base directory:** Boş bırakın (kök dizin)
   - **Build command:** Boş bırakın (statik HTML)
   - **Publish directory:** `.` (kök dizin)
5. **"Deploy site"** butonuna basarak sitenizi saniyeler içinde yayına alın!

---

## ⌨️ Sunum Kısayolları

* **Sağ Ok / Sol Ok / Boşluk:** Slayt değiştirme (Web Audio API kâğıt sesi eşliğinde)
* **F:** Tam ekran aç / kapat
* **🖨️ PDF / Yazdır:** Her slayt 1 sayfa olacak şekilde A4/PDF çıktısı
