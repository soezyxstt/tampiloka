/**
 * Compact client-safe WebP index generated from the exact variants in
 * public/assets/templates/manifest.json. Hash and byte metadata stay server-side.
 */

type VariantRow = readonly [url: string, width: number, height: number];
type AssetRow = readonly [
  kind: "background" | "ornament",
  full: VariantRow,
  small: VariantRow,
  thumbnail: VariantRow,
];

const assetRows = {
  "bg-adat-bali": ["background", ["/assets/templates/backgrounds/bg-adat-bali.webp",1024,1536], ["/assets/templates/backgrounds/bg-adat-bali-480.webp",480,720], ["/assets/templates/backgrounds/bg-adat-bali-thumb.webp",240,360]],
  "bg-adat-betawi": ["background", ["/assets/templates/backgrounds/bg-adat-betawi.webp",1024,1536], ["/assets/templates/backgrounds/bg-adat-betawi-480.webp",480,720], ["/assets/templates/backgrounds/bg-adat-betawi-thumb.webp",240,360]],
  "bg-adat-jawa": ["background", ["/assets/templates/backgrounds/bg-adat-jawa.webp",1024,1536], ["/assets/templates/backgrounds/bg-adat-jawa-480.webp",480,720], ["/assets/templates/backgrounds/bg-adat-jawa-thumb.webp",240,360]],
  "bg-adat-minang": ["background", ["/assets/templates/backgrounds/bg-adat-minang.webp",1024,1536], ["/assets/templates/backgrounds/bg-adat-minang-480.webp",480,720], ["/assets/templates/backgrounds/bg-adat-minang-thumb.webp",240,360]],
  "bg-adat-sunda": ["background", ["/assets/templates/backgrounds/bg-adat-sunda.webp",1024,1536], ["/assets/templates/backgrounds/bg-adat-sunda-480.webp",480,720], ["/assets/templates/backgrounds/bg-adat-sunda-thumb.webp",240,360]],
  "bg-game-block-blast": ["background", ["/assets/templates/backgrounds/bg-game-block-blast.webp",1024,1536], ["/assets/templates/backgrounds/bg-game-block-blast-480.webp",480,720], ["/assets/templates/backgrounds/bg-game-block-blast-thumb.webp",240,360]],
  "bg-game-minecraft": ["background", ["/assets/templates/backgrounds/bg-game-minecraft.webp",1024,1536], ["/assets/templates/backgrounds/bg-game-minecraft-480.webp",480,720], ["/assets/templates/backgrounds/bg-game-minecraft-thumb.webp",240,360]],
  "bg-game-tom-jerry": ["background", ["/assets/templates/backgrounds/bg-game-tom-jerry.webp",1024,1536], ["/assets/templates/backgrounds/bg-game-tom-jerry-480.webp",480,720], ["/assets/templates/backgrounds/bg-game-tom-jerry-thumb.webp",240,360]],
  "bg-game-upin-ipin": ["background", ["/assets/templates/backgrounds/bg-game-upin-ipin.webp",1024,1536], ["/assets/templates/backgrounds/bg-game-upin-ipin-480.webp",480,720], ["/assets/templates/backgrounds/bg-game-upin-ipin-thumb.webp",240,360]],
  "bg-islamic-mawaddah": ["background", ["/assets/templates/backgrounds/bg-islamic-mawaddah.webp",1024,1536], ["/assets/templates/backgrounds/bg-islamic-mawaddah-480.webp",480,720], ["/assets/templates/backgrounds/bg-islamic-mawaddah-thumb.webp",240,360]],
  "bg-islamic-rahmah": ["background", ["/assets/templates/backgrounds/bg-islamic-rahmah.webp",1024,1536], ["/assets/templates/backgrounds/bg-islamic-rahmah-480.webp",480,720], ["/assets/templates/backgrounds/bg-islamic-rahmah-thumb.webp",240,360]],
  "bg-islamic-sakinah": ["background", ["/assets/templates/backgrounds/bg-islamic-sakinah.webp",1024,1536], ["/assets/templates/backgrounds/bg-islamic-sakinah-480.webp",480,720], ["/assets/templates/backgrounds/bg-islamic-sakinah-thumb.webp",240,360]],
  "bg-minimalist-eunoia": ["background", ["/assets/templates/backgrounds/bg-minimalist-eunoia.webp",1024,1536], ["/assets/templates/backgrounds/bg-minimalist-eunoia-480.webp",480,720], ["/assets/templates/backgrounds/bg-minimalist-eunoia-thumb.webp",240,360]],
  "bg-minimalist-ruang-rindu": ["background", ["/assets/templates/backgrounds/bg-minimalist-ruang-rindu.webp",1024,1536], ["/assets/templates/backgrounds/bg-minimalist-ruang-rindu-480.webp",480,720], ["/assets/templates/backgrounds/bg-minimalist-ruang-rindu-thumb.webp",240,360]],
  "bg-minimalist-senja": ["background", ["/assets/templates/backgrounds/bg-minimalist-senja.webp",1024,1536], ["/assets/templates/backgrounds/bg-minimalist-senja-480.webp",480,720], ["/assets/templates/backgrounds/bg-minimalist-senja-thumb.webp",240,360]],
  "bg-retro-kabar-bahagia": ["background", ["/assets/templates/backgrounds/bg-retro-kabar-bahagia.webp",1024,1536], ["/assets/templates/backgrounds/bg-retro-kabar-bahagia-480.webp",480,720], ["/assets/templates/backgrounds/bg-retro-kabar-bahagia-thumb.webp",240,360]],
  "bg-retro-layar-tancep": ["background", ["/assets/templates/backgrounds/bg-retro-layar-tancep.webp",1024,1536], ["/assets/templates/backgrounds/bg-retro-layar-tancep-480.webp",480,720], ["/assets/templates/backgrounds/bg-retro-layar-tancep-thumb.webp",240,360]],
  "bg-retro-sundown-letters": ["background", ["/assets/templates/backgrounds/bg-retro-sundown-letters.webp",1024,1536], ["/assets/templates/backgrounds/bg-retro-sundown-letters-480.webp",480,720], ["/assets/templates/backgrounds/bg-retro-sundown-letters-thumb.webp",240,360]],
  "orn-adat-bali-01": ["ornament", ["/assets/templates/ornaments/orn-adat-bali-01.webp",1024,1024], ["/assets/templates/ornaments/orn-adat-bali-01-512.webp",512,512], ["/assets/templates/ornaments/orn-adat-bali-01-thumb.webp",192,192]],
  "orn-adat-bali-02": ["ornament", ["/assets/templates/ornaments/orn-adat-bali-02.webp",1024,1024], ["/assets/templates/ornaments/orn-adat-bali-02-512.webp",512,512], ["/assets/templates/ornaments/orn-adat-bali-02-thumb.webp",192,192]],
  "orn-adat-bali-03": ["ornament", ["/assets/templates/ornaments/orn-adat-bali-03.webp",1024,1024], ["/assets/templates/ornaments/orn-adat-bali-03-512.webp",512,512], ["/assets/templates/ornaments/orn-adat-bali-03-thumb.webp",192,192]],
  "orn-adat-bali-04": ["ornament", ["/assets/templates/ornaments/orn-adat-bali-04.webp",1024,1024], ["/assets/templates/ornaments/orn-adat-bali-04-512.webp",512,512], ["/assets/templates/ornaments/orn-adat-bali-04-thumb.webp",192,192]],
  "orn-adat-bali-05": ["ornament", ["/assets/templates/ornaments/orn-adat-bali-05.webp",1024,1024], ["/assets/templates/ornaments/orn-adat-bali-05-512.webp",512,512], ["/assets/templates/ornaments/orn-adat-bali-05-thumb.webp",192,192]],
  "orn-adat-bali-06": ["ornament", ["/assets/templates/ornaments/orn-adat-bali-06.webp",1024,1024], ["/assets/templates/ornaments/orn-adat-bali-06-512.webp",512,512], ["/assets/templates/ornaments/orn-adat-bali-06-thumb.webp",192,192]],
  "orn-adat-betawi-01": ["ornament", ["/assets/templates/ornaments/orn-adat-betawi-01.webp",1024,1024], ["/assets/templates/ornaments/orn-adat-betawi-01-512.webp",512,512], ["/assets/templates/ornaments/orn-adat-betawi-01-thumb.webp",192,192]],
  "orn-adat-betawi-02": ["ornament", ["/assets/templates/ornaments/orn-adat-betawi-02.webp",1024,1024], ["/assets/templates/ornaments/orn-adat-betawi-02-512.webp",512,512], ["/assets/templates/ornaments/orn-adat-betawi-02-thumb.webp",192,192]],
  "orn-adat-betawi-03": ["ornament", ["/assets/templates/ornaments/orn-adat-betawi-03.webp",1024,1024], ["/assets/templates/ornaments/orn-adat-betawi-03-512.webp",512,512], ["/assets/templates/ornaments/orn-adat-betawi-03-thumb.webp",192,192]],
  "orn-adat-betawi-04": ["ornament", ["/assets/templates/ornaments/orn-adat-betawi-04.webp",1024,1024], ["/assets/templates/ornaments/orn-adat-betawi-04-512.webp",512,512], ["/assets/templates/ornaments/orn-adat-betawi-04-thumb.webp",192,192]],
  "orn-adat-betawi-05": ["ornament", ["/assets/templates/ornaments/orn-adat-betawi-05.webp",1024,1024], ["/assets/templates/ornaments/orn-adat-betawi-05-512.webp",512,512], ["/assets/templates/ornaments/orn-adat-betawi-05-thumb.webp",192,192]],
  "orn-adat-betawi-06": ["ornament", ["/assets/templates/ornaments/orn-adat-betawi-06.webp",1024,1024], ["/assets/templates/ornaments/orn-adat-betawi-06-512.webp",512,512], ["/assets/templates/ornaments/orn-adat-betawi-06-thumb.webp",192,192]],
  "orn-adat-jawa-01": ["ornament", ["/assets/templates/ornaments/orn-adat-jawa-01.webp",1024,1024], ["/assets/templates/ornaments/orn-adat-jawa-01-512.webp",512,512], ["/assets/templates/ornaments/orn-adat-jawa-01-thumb.webp",192,192]],
  "orn-adat-jawa-02": ["ornament", ["/assets/templates/ornaments/orn-adat-jawa-02.webp",1024,1024], ["/assets/templates/ornaments/orn-adat-jawa-02-512.webp",512,512], ["/assets/templates/ornaments/orn-adat-jawa-02-thumb.webp",192,192]],
  "orn-adat-jawa-03": ["ornament", ["/assets/templates/ornaments/orn-adat-jawa-03.webp",1024,1024], ["/assets/templates/ornaments/orn-adat-jawa-03-512.webp",512,512], ["/assets/templates/ornaments/orn-adat-jawa-03-thumb.webp",192,192]],
  "orn-adat-jawa-04": ["ornament", ["/assets/templates/ornaments/orn-adat-jawa-04.webp",1024,1024], ["/assets/templates/ornaments/orn-adat-jawa-04-512.webp",512,512], ["/assets/templates/ornaments/orn-adat-jawa-04-thumb.webp",192,192]],
  "orn-adat-jawa-05": ["ornament", ["/assets/templates/ornaments/orn-adat-jawa-05.webp",1024,1024], ["/assets/templates/ornaments/orn-adat-jawa-05-512.webp",512,512], ["/assets/templates/ornaments/orn-adat-jawa-05-thumb.webp",192,192]],
  "orn-adat-jawa-06": ["ornament", ["/assets/templates/ornaments/orn-adat-jawa-06.webp",1024,1024], ["/assets/templates/ornaments/orn-adat-jawa-06-512.webp",512,512], ["/assets/templates/ornaments/orn-adat-jawa-06-thumb.webp",192,192]],
  "orn-adat-minang-01": ["ornament", ["/assets/templates/ornaments/orn-adat-minang-01.webp",1024,1024], ["/assets/templates/ornaments/orn-adat-minang-01-512.webp",512,512], ["/assets/templates/ornaments/orn-adat-minang-01-thumb.webp",192,192]],
  "orn-adat-minang-02": ["ornament", ["/assets/templates/ornaments/orn-adat-minang-02.webp",1024,1024], ["/assets/templates/ornaments/orn-adat-minang-02-512.webp",512,512], ["/assets/templates/ornaments/orn-adat-minang-02-thumb.webp",192,192]],
  "orn-adat-minang-03": ["ornament", ["/assets/templates/ornaments/orn-adat-minang-03.webp",1024,1024], ["/assets/templates/ornaments/orn-adat-minang-03-512.webp",512,512], ["/assets/templates/ornaments/orn-adat-minang-03-thumb.webp",192,192]],
  "orn-adat-minang-04": ["ornament", ["/assets/templates/ornaments/orn-adat-minang-04.webp",1024,1024], ["/assets/templates/ornaments/orn-adat-minang-04-512.webp",512,512], ["/assets/templates/ornaments/orn-adat-minang-04-thumb.webp",192,192]],
  "orn-adat-minang-05": ["ornament", ["/assets/templates/ornaments/orn-adat-minang-05.webp",1024,1024], ["/assets/templates/ornaments/orn-adat-minang-05-512.webp",512,512], ["/assets/templates/ornaments/orn-adat-minang-05-thumb.webp",192,192]],
  "orn-adat-minang-06": ["ornament", ["/assets/templates/ornaments/orn-adat-minang-06.webp",1024,1024], ["/assets/templates/ornaments/orn-adat-minang-06-512.webp",512,512], ["/assets/templates/ornaments/orn-adat-minang-06-thumb.webp",192,192]],
  "orn-adat-sunda-01": ["ornament", ["/assets/templates/ornaments/orn-adat-sunda-01.webp",1024,1024], ["/assets/templates/ornaments/orn-adat-sunda-01-512.webp",512,512], ["/assets/templates/ornaments/orn-adat-sunda-01-thumb.webp",192,192]],
  "orn-adat-sunda-02": ["ornament", ["/assets/templates/ornaments/orn-adat-sunda-02.webp",1024,1024], ["/assets/templates/ornaments/orn-adat-sunda-02-512.webp",512,512], ["/assets/templates/ornaments/orn-adat-sunda-02-thumb.webp",192,192]],
  "orn-adat-sunda-03": ["ornament", ["/assets/templates/ornaments/orn-adat-sunda-03.webp",1024,1024], ["/assets/templates/ornaments/orn-adat-sunda-03-512.webp",512,512], ["/assets/templates/ornaments/orn-adat-sunda-03-thumb.webp",192,192]],
  "orn-adat-sunda-04": ["ornament", ["/assets/templates/ornaments/orn-adat-sunda-04.webp",1024,1024], ["/assets/templates/ornaments/orn-adat-sunda-04-512.webp",512,512], ["/assets/templates/ornaments/orn-adat-sunda-04-thumb.webp",192,192]],
  "orn-adat-sunda-05": ["ornament", ["/assets/templates/ornaments/orn-adat-sunda-05.webp",1024,1024], ["/assets/templates/ornaments/orn-adat-sunda-05-512.webp",512,512], ["/assets/templates/ornaments/orn-adat-sunda-05-thumb.webp",192,192]],
  "orn-adat-sunda-06": ["ornament", ["/assets/templates/ornaments/orn-adat-sunda-06.webp",1024,1024], ["/assets/templates/ornaments/orn-adat-sunda-06-512.webp",512,512], ["/assets/templates/ornaments/orn-adat-sunda-06-thumb.webp",192,192]],
  "orn-game-block-blast-01": ["ornament", ["/assets/templates/ornaments/orn-game-block-blast-01.webp",1024,1024], ["/assets/templates/ornaments/orn-game-block-blast-01-512.webp",512,512], ["/assets/templates/ornaments/orn-game-block-blast-01-thumb.webp",192,192]],
  "orn-game-block-blast-02": ["ornament", ["/assets/templates/ornaments/orn-game-block-blast-02.webp",1024,1024], ["/assets/templates/ornaments/orn-game-block-blast-02-512.webp",512,512], ["/assets/templates/ornaments/orn-game-block-blast-02-thumb.webp",192,192]],
  "orn-game-block-blast-03": ["ornament", ["/assets/templates/ornaments/orn-game-block-blast-03.webp",1024,1024], ["/assets/templates/ornaments/orn-game-block-blast-03-512.webp",512,512], ["/assets/templates/ornaments/orn-game-block-blast-03-thumb.webp",192,192]],
  "orn-game-block-blast-04": ["ornament", ["/assets/templates/ornaments/orn-game-block-blast-04.webp",1024,1024], ["/assets/templates/ornaments/orn-game-block-blast-04-512.webp",512,512], ["/assets/templates/ornaments/orn-game-block-blast-04-thumb.webp",192,192]],
  "orn-game-block-blast-05": ["ornament", ["/assets/templates/ornaments/orn-game-block-blast-05.webp",1024,1024], ["/assets/templates/ornaments/orn-game-block-blast-05-512.webp",512,512], ["/assets/templates/ornaments/orn-game-block-blast-05-thumb.webp",192,192]],
  "orn-game-block-blast-06": ["ornament", ["/assets/templates/ornaments/orn-game-block-blast-06.webp",1024,1024], ["/assets/templates/ornaments/orn-game-block-blast-06-512.webp",512,512], ["/assets/templates/ornaments/orn-game-block-blast-06-thumb.webp",192,192]],
  "orn-game-minecraft-01": ["ornament", ["/assets/templates/ornaments/orn-game-minecraft-01.webp",1024,1024], ["/assets/templates/ornaments/orn-game-minecraft-01-512.webp",512,512], ["/assets/templates/ornaments/orn-game-minecraft-01-thumb.webp",192,192]],
  "orn-game-minecraft-02": ["ornament", ["/assets/templates/ornaments/orn-game-minecraft-02.webp",1024,1024], ["/assets/templates/ornaments/orn-game-minecraft-02-512.webp",512,512], ["/assets/templates/ornaments/orn-game-minecraft-02-thumb.webp",192,192]],
  "orn-game-minecraft-03": ["ornament", ["/assets/templates/ornaments/orn-game-minecraft-03.webp",1024,1024], ["/assets/templates/ornaments/orn-game-minecraft-03-512.webp",512,512], ["/assets/templates/ornaments/orn-game-minecraft-03-thumb.webp",192,192]],
  "orn-game-minecraft-04": ["ornament", ["/assets/templates/ornaments/orn-game-minecraft-04.webp",1024,1024], ["/assets/templates/ornaments/orn-game-minecraft-04-512.webp",512,512], ["/assets/templates/ornaments/orn-game-minecraft-04-thumb.webp",192,192]],
  "orn-game-minecraft-05": ["ornament", ["/assets/templates/ornaments/orn-game-minecraft-05.webp",1024,1024], ["/assets/templates/ornaments/orn-game-minecraft-05-512.webp",512,512], ["/assets/templates/ornaments/orn-game-minecraft-05-thumb.webp",192,192]],
  "orn-game-minecraft-06": ["ornament", ["/assets/templates/ornaments/orn-game-minecraft-06.webp",1024,1024], ["/assets/templates/ornaments/orn-game-minecraft-06-512.webp",512,512], ["/assets/templates/ornaments/orn-game-minecraft-06-thumb.webp",192,192]],
  "orn-game-tom-jerry-01": ["ornament", ["/assets/templates/ornaments/orn-game-tom-jerry-01.webp",1024,1024], ["/assets/templates/ornaments/orn-game-tom-jerry-01-512.webp",512,512], ["/assets/templates/ornaments/orn-game-tom-jerry-01-thumb.webp",192,192]],
  "orn-game-tom-jerry-02": ["ornament", ["/assets/templates/ornaments/orn-game-tom-jerry-02.webp",1024,1024], ["/assets/templates/ornaments/orn-game-tom-jerry-02-512.webp",512,512], ["/assets/templates/ornaments/orn-game-tom-jerry-02-thumb.webp",192,192]],
  "orn-game-tom-jerry-03": ["ornament", ["/assets/templates/ornaments/orn-game-tom-jerry-03.webp",1024,1024], ["/assets/templates/ornaments/orn-game-tom-jerry-03-512.webp",512,512], ["/assets/templates/ornaments/orn-game-tom-jerry-03-thumb.webp",192,192]],
  "orn-game-tom-jerry-04": ["ornament", ["/assets/templates/ornaments/orn-game-tom-jerry-04.webp",1024,1024], ["/assets/templates/ornaments/orn-game-tom-jerry-04-512.webp",512,512], ["/assets/templates/ornaments/orn-game-tom-jerry-04-thumb.webp",192,192]],
  "orn-game-tom-jerry-05": ["ornament", ["/assets/templates/ornaments/orn-game-tom-jerry-05.webp",1024,1024], ["/assets/templates/ornaments/orn-game-tom-jerry-05-512.webp",512,512], ["/assets/templates/ornaments/orn-game-tom-jerry-05-thumb.webp",192,192]],
  "orn-game-tom-jerry-06": ["ornament", ["/assets/templates/ornaments/orn-game-tom-jerry-06.webp",1024,1024], ["/assets/templates/ornaments/orn-game-tom-jerry-06-512.webp",512,512], ["/assets/templates/ornaments/orn-game-tom-jerry-06-thumb.webp",192,192]],
  "orn-game-upin-ipin-01": ["ornament", ["/assets/templates/ornaments/orn-game-upin-ipin-01.webp",1024,1024], ["/assets/templates/ornaments/orn-game-upin-ipin-01-512.webp",512,512], ["/assets/templates/ornaments/orn-game-upin-ipin-01-thumb.webp",192,192]],
  "orn-game-upin-ipin-02": ["ornament", ["/assets/templates/ornaments/orn-game-upin-ipin-02.webp",1024,1024], ["/assets/templates/ornaments/orn-game-upin-ipin-02-512.webp",512,512], ["/assets/templates/ornaments/orn-game-upin-ipin-02-thumb.webp",192,192]],
  "orn-game-upin-ipin-03": ["ornament", ["/assets/templates/ornaments/orn-game-upin-ipin-03.webp",1024,1024], ["/assets/templates/ornaments/orn-game-upin-ipin-03-512.webp",512,512], ["/assets/templates/ornaments/orn-game-upin-ipin-03-thumb.webp",192,192]],
  "orn-game-upin-ipin-04": ["ornament", ["/assets/templates/ornaments/orn-game-upin-ipin-04.webp",1024,1024], ["/assets/templates/ornaments/orn-game-upin-ipin-04-512.webp",512,512], ["/assets/templates/ornaments/orn-game-upin-ipin-04-thumb.webp",192,192]],
  "orn-game-upin-ipin-05": ["ornament", ["/assets/templates/ornaments/orn-game-upin-ipin-05.webp",1024,1024], ["/assets/templates/ornaments/orn-game-upin-ipin-05-512.webp",512,512], ["/assets/templates/ornaments/orn-game-upin-ipin-05-thumb.webp",192,192]],
  "orn-game-upin-ipin-06": ["ornament", ["/assets/templates/ornaments/orn-game-upin-ipin-06.webp",1024,1024], ["/assets/templates/ornaments/orn-game-upin-ipin-06-512.webp",512,512], ["/assets/templates/ornaments/orn-game-upin-ipin-06-thumb.webp",192,192]],
  "orn-islamic-01": ["ornament", ["/assets/templates/ornaments/orn-islamic-01.webp",1024,1024], ["/assets/templates/ornaments/orn-islamic-01-512.webp",512,512], ["/assets/templates/ornaments/orn-islamic-01-thumb.webp",192,192]],
  "orn-islamic-02": ["ornament", ["/assets/templates/ornaments/orn-islamic-02.webp",1024,1024], ["/assets/templates/ornaments/orn-islamic-02-512.webp",512,512], ["/assets/templates/ornaments/orn-islamic-02-thumb.webp",192,192]],
  "orn-islamic-03": ["ornament", ["/assets/templates/ornaments/orn-islamic-03.webp",1024,1024], ["/assets/templates/ornaments/orn-islamic-03-512.webp",512,512], ["/assets/templates/ornaments/orn-islamic-03-thumb.webp",192,192]],
  "orn-islamic-04": ["ornament", ["/assets/templates/ornaments/orn-islamic-04.webp",1024,1024], ["/assets/templates/ornaments/orn-islamic-04-512.webp",512,512], ["/assets/templates/ornaments/orn-islamic-04-thumb.webp",192,192]],
  "orn-islamic-05": ["ornament", ["/assets/templates/ornaments/orn-islamic-05.webp",1024,1024], ["/assets/templates/ornaments/orn-islamic-05-512.webp",512,512], ["/assets/templates/ornaments/orn-islamic-05-thumb.webp",192,192]],
  "orn-islamic-06": ["ornament", ["/assets/templates/ornaments/orn-islamic-06.webp",1024,1024], ["/assets/templates/ornaments/orn-islamic-06-512.webp",512,512], ["/assets/templates/ornaments/orn-islamic-06-thumb.webp",192,192]],
  "orn-minimalist-eunoia-01": ["ornament", ["/assets/templates/ornaments/orn-minimalist-eunoia-01.webp",1024,1024], ["/assets/templates/ornaments/orn-minimalist-eunoia-01-512.webp",512,512], ["/assets/templates/ornaments/orn-minimalist-eunoia-01-thumb.webp",192,192]],
  "orn-minimalist-eunoia-02": ["ornament", ["/assets/templates/ornaments/orn-minimalist-eunoia-02.webp",1024,1024], ["/assets/templates/ornaments/orn-minimalist-eunoia-02-512.webp",512,512], ["/assets/templates/ornaments/orn-minimalist-eunoia-02-thumb.webp",192,192]],
  "orn-minimalist-eunoia-03": ["ornament", ["/assets/templates/ornaments/orn-minimalist-eunoia-03.webp",1024,1024], ["/assets/templates/ornaments/orn-minimalist-eunoia-03-512.webp",512,512], ["/assets/templates/ornaments/orn-minimalist-eunoia-03-thumb.webp",192,192]],
  "orn-minimalist-eunoia-04": ["ornament", ["/assets/templates/ornaments/orn-minimalist-eunoia-04.webp",1024,1024], ["/assets/templates/ornaments/orn-minimalist-eunoia-04-512.webp",512,512], ["/assets/templates/ornaments/orn-minimalist-eunoia-04-thumb.webp",192,192]],
  "orn-minimalist-eunoia-05": ["ornament", ["/assets/templates/ornaments/orn-minimalist-eunoia-05.webp",1024,1024], ["/assets/templates/ornaments/orn-minimalist-eunoia-05-512.webp",512,512], ["/assets/templates/ornaments/orn-minimalist-eunoia-05-thumb.webp",192,192]],
  "orn-minimalist-eunoia-06": ["ornament", ["/assets/templates/ornaments/orn-minimalist-eunoia-06.webp",1024,1024], ["/assets/templates/ornaments/orn-minimalist-eunoia-06-512.webp",512,512], ["/assets/templates/ornaments/orn-minimalist-eunoia-06-thumb.webp",192,192]],
  "orn-minimalist-ruang-rindu-01": ["ornament", ["/assets/templates/ornaments/orn-minimalist-ruang-rindu-01.webp",1024,1024], ["/assets/templates/ornaments/orn-minimalist-ruang-rindu-01-512.webp",512,512], ["/assets/templates/ornaments/orn-minimalist-ruang-rindu-01-thumb.webp",192,192]],
  "orn-minimalist-ruang-rindu-02": ["ornament", ["/assets/templates/ornaments/orn-minimalist-ruang-rindu-02.webp",1024,1024], ["/assets/templates/ornaments/orn-minimalist-ruang-rindu-02-512.webp",512,512], ["/assets/templates/ornaments/orn-minimalist-ruang-rindu-02-thumb.webp",192,192]],
  "orn-minimalist-ruang-rindu-03": ["ornament", ["/assets/templates/ornaments/orn-minimalist-ruang-rindu-03.webp",1024,1024], ["/assets/templates/ornaments/orn-minimalist-ruang-rindu-03-512.webp",512,512], ["/assets/templates/ornaments/orn-minimalist-ruang-rindu-03-thumb.webp",192,192]],
  "orn-minimalist-ruang-rindu-04": ["ornament", ["/assets/templates/ornaments/orn-minimalist-ruang-rindu-04.webp",1024,1024], ["/assets/templates/ornaments/orn-minimalist-ruang-rindu-04-512.webp",512,512], ["/assets/templates/ornaments/orn-minimalist-ruang-rindu-04-thumb.webp",192,192]],
  "orn-minimalist-ruang-rindu-05": ["ornament", ["/assets/templates/ornaments/orn-minimalist-ruang-rindu-05.webp",1024,1024], ["/assets/templates/ornaments/orn-minimalist-ruang-rindu-05-512.webp",512,512], ["/assets/templates/ornaments/orn-minimalist-ruang-rindu-05-thumb.webp",192,192]],
  "orn-minimalist-ruang-rindu-06": ["ornament", ["/assets/templates/ornaments/orn-minimalist-ruang-rindu-06.webp",1024,1024], ["/assets/templates/ornaments/orn-minimalist-ruang-rindu-06-512.webp",512,512], ["/assets/templates/ornaments/orn-minimalist-ruang-rindu-06-thumb.webp",192,192]],
  "orn-minimalist-senja-01": ["ornament", ["/assets/templates/ornaments/orn-minimalist-senja-01.webp",1024,1024], ["/assets/templates/ornaments/orn-minimalist-senja-01-512.webp",512,512], ["/assets/templates/ornaments/orn-minimalist-senja-01-thumb.webp",192,192]],
  "orn-minimalist-senja-02": ["ornament", ["/assets/templates/ornaments/orn-minimalist-senja-02.webp",1024,1024], ["/assets/templates/ornaments/orn-minimalist-senja-02-512.webp",512,512], ["/assets/templates/ornaments/orn-minimalist-senja-02-thumb.webp",192,192]],
  "orn-minimalist-senja-03": ["ornament", ["/assets/templates/ornaments/orn-minimalist-senja-03.webp",1024,1024], ["/assets/templates/ornaments/orn-minimalist-senja-03-512.webp",512,512], ["/assets/templates/ornaments/orn-minimalist-senja-03-thumb.webp",192,192]],
  "orn-minimalist-senja-04": ["ornament", ["/assets/templates/ornaments/orn-minimalist-senja-04.webp",1024,1024], ["/assets/templates/ornaments/orn-minimalist-senja-04-512.webp",512,512], ["/assets/templates/ornaments/orn-minimalist-senja-04-thumb.webp",192,192]],
  "orn-minimalist-senja-05": ["ornament", ["/assets/templates/ornaments/orn-minimalist-senja-05.webp",1024,1024], ["/assets/templates/ornaments/orn-minimalist-senja-05-512.webp",512,512], ["/assets/templates/ornaments/orn-minimalist-senja-05-thumb.webp",192,192]],
  "orn-minimalist-senja-06": ["ornament", ["/assets/templates/ornaments/orn-minimalist-senja-06.webp",1024,1024], ["/assets/templates/ornaments/orn-minimalist-senja-06-512.webp",512,512], ["/assets/templates/ornaments/orn-minimalist-senja-06-thumb.webp",192,192]],
  "orn-retro-01": ["ornament", ["/assets/templates/ornaments/orn-retro-01.webp",1024,1024], ["/assets/templates/ornaments/orn-retro-01-512.webp",512,512], ["/assets/templates/ornaments/orn-retro-01-thumb.webp",192,192]],
  "orn-retro-02": ["ornament", ["/assets/templates/ornaments/orn-retro-02.webp",1024,1024], ["/assets/templates/ornaments/orn-retro-02-512.webp",512,512], ["/assets/templates/ornaments/orn-retro-02-thumb.webp",192,192]],
  "orn-retro-03": ["ornament", ["/assets/templates/ornaments/orn-retro-03.webp",1024,1024], ["/assets/templates/ornaments/orn-retro-03-512.webp",512,512], ["/assets/templates/ornaments/orn-retro-03-thumb.webp",192,192]],
  "orn-retro-04": ["ornament", ["/assets/templates/ornaments/orn-retro-04.webp",1024,1024], ["/assets/templates/ornaments/orn-retro-04-512.webp",512,512], ["/assets/templates/ornaments/orn-retro-04-thumb.webp",192,192]],
  "orn-retro-05": ["ornament", ["/assets/templates/ornaments/orn-retro-05.webp",1024,1024], ["/assets/templates/ornaments/orn-retro-05-512.webp",512,512], ["/assets/templates/ornaments/orn-retro-05-thumb.webp",192,192]],
  "orn-retro-06": ["ornament", ["/assets/templates/ornaments/orn-retro-06.webp",1024,1024], ["/assets/templates/ornaments/orn-retro-06-512.webp",512,512], ["/assets/templates/ornaments/orn-retro-06-thumb.webp",192,192]],
  "orn-shared-romance-01": ["ornament", ["/assets/templates/ornaments/orn-shared-romance-01.webp",1024,1024], ["/assets/templates/ornaments/orn-shared-romance-01-512.webp",512,512], ["/assets/templates/ornaments/orn-shared-romance-01-thumb.webp",192,192]],
  "orn-shared-romance-02": ["ornament", ["/assets/templates/ornaments/orn-shared-romance-02.webp",1024,1024], ["/assets/templates/ornaments/orn-shared-romance-02-512.webp",512,512], ["/assets/templates/ornaments/orn-shared-romance-02-thumb.webp",192,192]],
  "orn-shared-romance-03": ["ornament", ["/assets/templates/ornaments/orn-shared-romance-03.webp",1024,1024], ["/assets/templates/ornaments/orn-shared-romance-03-512.webp",512,512], ["/assets/templates/ornaments/orn-shared-romance-03-thumb.webp",192,192]],
  "orn-shared-romance-04": ["ornament", ["/assets/templates/ornaments/orn-shared-romance-04.webp",1024,1024], ["/assets/templates/ornaments/orn-shared-romance-04-512.webp",512,512], ["/assets/templates/ornaments/orn-shared-romance-04-thumb.webp",192,192]],
  "orn-shared-romance-05": ["ornament", ["/assets/templates/ornaments/orn-shared-romance-05.webp",1024,1024], ["/assets/templates/ornaments/orn-shared-romance-05-512.webp",512,512], ["/assets/templates/ornaments/orn-shared-romance-05-thumb.webp",192,192]],
  "orn-shared-romance-06": ["ornament", ["/assets/templates/ornaments/orn-shared-romance-06.webp",1024,1024], ["/assets/templates/ornaments/orn-shared-romance-06-512.webp",512,512], ["/assets/templates/ornaments/orn-shared-romance-06-thumb.webp",192,192]],
} as const satisfies Record<string, AssetRow>;

export type RuntimeVariant = { url: string; width: number; height: number };
export type RuntimeAsset = {
  id: string;
  kind: "background" | "ornament";
  full: RuntimeVariant;
  small: RuntimeVariant;
  thumbnail: RuntimeVariant;
};

function variant([url, width, height]: VariantRow): RuntimeVariant {
  return { url, width, height };
}

export function getRuntimeAsset(id: string): RuntimeAsset {
  const row = (assetRows as Record<string, AssetRow | undefined>)[id];
  if (!row) throw new Error(`Unknown Temura runtime asset: ${id}`);
  const [kind, full, small, thumbnail] = row;
  return { id, kind, full: variant(full), small: variant(small), thumbnail: variant(thumbnail) };
}
