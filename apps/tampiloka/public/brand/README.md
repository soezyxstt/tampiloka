# Tampiloka Brand Assets

Diekspor langsung dari Figma pada 2 Oktober 2026.
Sumber: https://www.figma.com/design/oR4rKJm4U5RSS51hb9jfA5/Tampiloka

- logos/{light,dark,black,white}/: symbol, wordmark, horizontal, vertical. SVG dengan teks menjadi outline; PNG transparan @1x dan @2x.
- icons/{light,dark,black,white}/: app icon 1024, PWA 512/192, maskable 512, Apple touch 180, favicon 16/32/48. PNG sesuai ukuran dalam nama.
- social/{light,dark,black,white}/: profile 512x512 dan OG image 1200x630. PNG dengan background.
- guides/: brand identity guide, typography guide, dan logo kit; masing-masing PNG 2x, SVG outline, PDF.
- tokens/: warna dan typography desktop/mobile dalam JSON serta CSS. CSS memakai breakpoint mobile di bawah 768px; sesuaikan dengan layout produk. Font Manrope dan Inter perlu dimuat terpisah.
- manifest.json: 97 file ekspor Figma dan 4 favicon ICO tambahan, sumber node, ukuran, dan SHA-256.

Light digunakan pada permukaan terang; dark pada permukaan gelap. Black dan white adalah logo monokrom. PNG logo transparan, sedangkan ikon dan media sosial memiliki background. Maskable memiliki ruang aman tambahan. Favicon ICO juga tersedia untuk setiap tema, berisi ukuran 16/32/48 dari PNG ekspor asli.

SVG logo sudah berupa outline sehingga tidak membutuhkan font. Wordmark Poppins Bold dan mockup panduan merupakan pendekatan editable terhadap PNG referensi. PNG referensi asli tetap berada satu folder di atas paket ini.


