# ChatGPT Images batch prompts

Current cartoon replacement: SpongeBob is retired, Doraemon was refused, and BoBoiBoy is excluded by the user. See `tom-jerry-replacement.md` for the current proposed replacement and pending single-image requests. Preserve the old prompt below as history; do not submit it again. Downloads are being collected through ChatGPT Library; see `download-report.md`.

These are production prompts. Generation is in progress; see generation-status.md for observed results. Run them at [ChatGPT Images](https://chatgpt.com/images), one batch at a time per conversation. Each prompt requests six separate image outputs. If the interface returns a single sheet instead, regenerate the six numbered items as separate outputs. Serialize browser input even when several remote generation jobs run in parallel.

## Output contract

- Ornament batches: six separate, isolated PNG assets, each on a genuinely transparent background with alpha. Square canvas, target 1200×1200, centered with generous safe padding. No checkerboard baked into the image.
- Background batches: six separate opaque PNG backgrounds, portrait 2:3, target 1200×1800. Keep the central text area visually quiet. Do not include any people, writing, dates, names, logos, watermarks, frames with text, or UI.
- One concept per generated image. Never combine the six concepts into a collage, grid, contact sheet, sprite, or single composition.
- A batch count is not proof of coverage: check that each numbered concept is actually different. If outputs repeat the first object, request the missing concepts one at a time, using only that concept in each new prompt. Do not reuse the first image as a reference for unrelated objects.
- Save each output under the exact filename supplied below. These are assets for web previews; text and couple names will be rendered in HTML.
- The current couple name used later in all template previews is Nara & Aruna. Do not draw the names in the images.

## 1. Shared romantic ornament pack

~~~text
Create exactly six separate downloadable PNG images, one for each numbered concept. Each must be an isolated wedding invitation ornament on a genuinely transparent background with a real alpha channel, square 1200×1200 target canvas, centered with generous safe margins. Create one object only per image. No collage, contact sheet, grid, sprite, checkerboard, text, letters, names, calligraphy, dates, logos, or watermark. Use refined watercolor and paper-craft illustration, soft blush, warm ivory, dusty rose, sage, delicate edges, suitable for layering over many visual styles. Keep each object readable at small mobile size. Use these filenames in this order:
1. orn-shared-romance-01.png — blush rose and foliage corner spray.
2. orn-shared-romance-02.png — small white flower branch.
3. orn-shared-romance-03.png — loose satin ribbon bow.
4. orn-shared-romance-04.png — unlettered ivory envelope with tiny heart seal.
5. orn-shared-romance-05.png — soft torn-paper frame corner.
6. orn-shared-romance-06.png — airy watercolor leaf cluster.
~~~

## 2. Adat Sunda ornament pack

~~~text
Create exactly six separate downloadable transparent PNG ornament images, one isolated object per image, square 1200×1200 target canvas with genuine alpha, generous padding, no clipping. Use careful West Java / Priangan references and a restrained palette of ivory, leaf green, muted blue, and warm gold. Keep cultural patterns decorative and respectful. No collage, contact sheet, checkerboard, words, names, dates, logos, watermark, or sacred symbols. One item per output:
1. orn-adat-sunda-01.png — Garut-style lereng batik corner.
2. orn-adat-sunda-02.png — peacock feather with soft leaves.
3. orn-adat-sunda-03.png — melati blossom branch.
4. orn-adat-sunda-04.png — woven bamboo texture medallion.
5. orn-adat-sunda-05.png — slim carved wood frame corner.
6. orn-adat-sunda-06.png — small gold leaf divider.
~~~

## 3. Adat Bali ornament pack

~~~text
Create exactly six separate downloadable transparent PNG ornament images, one isolated object per image, square 1200×1200 target canvas with genuine alpha, generous safe padding. Use tropical Bali colors: ivory, warm terracotta, leaf green, and marigold. Show only floral, foliage, and neutral architectural details. Do not depict gods, sacred offerings, ritual objects, or temple guardians. No collage, checkerboard, words, names, dates, logos, or watermark:
1. orn-adat-bali-01.png — frangipani flower cluster.
2. orn-adat-bali-02.png — tropical palm leaf spray.
3. orn-adat-bali-03.png — woven palm-leaf ribbon.
4. orn-adat-bali-04.png — gentle stone arch fragment, with no sacred figure.
5. orn-adat-bali-05.png — marigold garland loop.
6. orn-adat-bali-06.png — small shell and leaf ornament.
~~~

## 4. Adat Jawa ornament pack

~~~text
Create exactly six separate downloadable transparent PNG ornament images, one isolated object per image, square 1200×1200 target canvas with genuine alpha and generous padding. Use a restrained Javanese ivory, teak, deep indigo, and muted gold palette. Keep traditional pattern references decorative and accurate; no copied lettering or sacred text. No collage, checkerboard, words, names, dates, logos, or watermark:
1. orn-adat-jawa-01.png — jasmine garland corner.
2. orn-adat-jawa-02.png — abstract kawung-inspired geometry medallion.
3. orn-adat-jawa-03.png — fine batik-inspired floral border.
4. orn-adat-jawa-04.png — carved teak frame corner.
5. orn-adat-jawa-05.png — soft gold leaf divider.
6. orn-adat-jawa-06.png — folded ivory fan with floral edge.
~~~

## 5. Adat Minang ornament pack

~~~text
Create exactly six separate downloadable transparent PNG ornament images, one isolated object per image, square 1200×1200 target canvas with genuine alpha and generous padding. Use Minangkabau textile and architecture references in muted red, ivory, and gold. Keep the roof silhouette clearly recognizable as rumah gadang, and avoid mixing motifs from other regions. No collage, checkerboard, words, names, dates, logos, or watermark:
1. orn-adat-minang-01.png — songket-inspired gold corner panel.
2. orn-adat-minang-02.png — rumah gadang roof silhouette ornament.
3. orn-adat-minang-03.png — red and gold woven ribbon.
4. orn-adat-minang-04.png — tropical flower sprig.
5. orn-adat-minang-05.png — fine gold filigree divider.
6. orn-adat-minang-06.png — woven textile rosette.
~~~

## 6. Adat Betawi ornament pack

~~~text
Create exactly six separate downloadable transparent PNG ornament images, one isolated object per image, square 1200×1200 target canvas with genuine alpha and generous padding. Use a cheerful but restrained Betawi palette of red, cream, green, and gold; use regional flora and embroidery motifs respectfully. No caricatures, collage, checkerboard, words, names, dates, logos, or watermark:
1. orn-adat-betawi-01.png — kembang kelapa branch.
2. orn-adat-betawi-02.png — encim embroidery flower corner.
3. orn-adat-betawi-03.png — bright tropical flower garland.
4. orn-adat-betawi-04.png — Betawi-style floral tile medallion.
5. orn-adat-betawi-05.png — woven bamboo fan corner.
6. orn-adat-betawi-06.png — red and cream ribbon loop.
~~~

## 7. Minecraft ornament pack

~~~text
Create exactly six separate downloadable transparent PNG image outputs. Each output is one cleanly isolated object on a genuine transparent alpha background, square 1200×1200 target canvas, generous padding. Depict the requested recognizable Minecraft game characters and block-world objects as unofficial fan art for a proposed invitation theme. Do not use the Minecraft wordmark, interface screenshots, text, or watermark. No collage, grid, checkerboard, or multi-object scene:
1. orn-game-minecraft-01.png — Minecraft grass block with tiny flowers.
2. orn-game-minecraft-02.png — Minecraft pixel bouquet.
3. orn-game-minecraft-03.png — Minecraft redstone torch.
4. orn-game-minecraft-04.png — Minecraft chest decorated for a wedding.
5. orn-game-minecraft-05.png — friendly Minecraft creeper head.
6. orn-game-minecraft-06.png — Minecraft Steve and Alex dressed for a wedding.
~~~

## 8. SpongeBob SquarePants ornament pack

~~~text
Create exactly six separate downloadable transparent PNG image outputs, one isolated object or character per output, square 1200×1200 target canvas with genuine alpha and safe padding. Depict the requested recognizable SpongeBob SquarePants characters as unofficial fan art for a proposed invitation theme. Do not use the show wordmark, title text, episode imagery, or watermark. No collage, grid, or checkerboard:
1. orn-game-spongebob-01.png — SpongeBob SquarePants with a small wedding boutonniere.
2. orn-game-spongebob-02.png — Patrick Star holding a flower.
3. orn-game-spongebob-03.png — Gary the Snail beside a seashell.
4. orn-game-spongebob-04.png — Pineapple House silhouette.
5. orn-game-spongebob-05.png — friendly jellyfish cluster.
6. orn-game-spongebob-06.png — bubbles and coral corner.
~~~

## 9. Block Blast ornament pack

~~~text
Create exactly six separate downloadable transparent PNG ornament images, one isolated object per output, square 1200×1200 target canvas with genuine alpha and generous padding. Create original colorful assets evoking a cheerful block puzzle game without copying its logo, exact board, icons, or interface. No collage, grid, checkerboard, words, or watermark:
1. orn-game-block-blast-01.png — bright wooden puzzle block cluster.
2. orn-game-block-blast-02.png — stacked jewel-tone square blocks.
3. orn-game-block-blast-03.png — heart-shaped block puzzle.
4. orn-game-block-blast-04.png — pixel flower built from colored squares.
5. orn-game-block-blast-05.png — rounded game-star burst.
6. orn-game-block-blast-06.png — small celebratory block confetti.
~~~

## 10. Upin & Ipin ornament pack

~~~text
Create exactly six separate downloadable transparent PNG image outputs, one isolated character or object per output, square 1200×1200 target canvas with genuine alpha and safe padding. Depict the requested recognizable Upin & Ipin characters as unofficial fan art for a proposed invitation theme. Keep expressions warm and respectful. No show title, logos, captions, collage, grid, or watermark:
1. orn-game-upin-ipin-01.png — Upin and Ipin wearing festive wedding clothes.
2. orn-game-upin-ipin-02.png — Kak Ros holding a flower.
3. orn-game-upin-ipin-03.png — Mail with a small gift.
4. orn-game-upin-ipin-04.png — Mei Mei with a bouquet.
5. orn-game-upin-ipin-05.png — Jarjit with a celebratory pennant.
6. orn-game-upin-ipin-06.png — kampung house and banana-leaf cluster.
~~~

## 11. Minimalist Eunoia ornament pack

~~~text
Create exactly six separate downloadable transparent PNG ornament images, one isolated object per output, square 1200×1200 target canvas with genuine alpha and generous padding. Use the Temura website's restrained editorial feeling: warm white, deep ink, a distinctive fine serif line, one romantic detail at most. Make assets subtle and crisp at mobile size. No collage, checkerboard, words, names, dates, or watermark:
1. orn-minimalist-eunoia-01.png — single-line tulip drawing.
2. orn-minimalist-eunoia-02.png — fine silver frame corner.
3. orn-minimalist-eunoia-03.png — small pressed rose.
4. orn-minimalist-eunoia-04.png — minimal paper ribbon.
5. orn-minimalist-eunoia-05.png — thin oval portrait frame.
6. orn-minimalist-eunoia-06.png — tiny hand-painted heart.
~~~

## 12. Minimalist Ruang Rindu ornament pack

~~~text
Create exactly six separate downloadable transparent PNG ornament images, one isolated object per output, square 1200×1200 target canvas with genuine alpha and generous padding. Use generous white space, romantic restraint, thin lines, soft blush and warm ivory. Keep edges crisp, never cluttered. No collage, checkerboard, text, names, dates, or watermark:
1. orn-minimalist-ruang-rindu-01.png — delicate botanical contour drawing.
2. orn-minimalist-ruang-rindu-02.png — thin blush arch outline.
3. orn-minimalist-ruang-rindu-03.png — small white flower stem.
4. orn-minimalist-ruang-rindu-04.png — soft translucent ribbon.
5. orn-minimalist-ruang-rindu-05.png — tiny gold dot constellation.
6. orn-minimalist-ruang-rindu-06.png — light ivory torn-paper edge.
~~~

## 13. Minimalist Senja ornament pack

~~~text
Create exactly six separate downloadable transparent PNG ornament images, one isolated object per output, square 1200×1200 target canvas with genuine alpha and generous safe padding. Use a soft romantic sunset palette of peach, ivory, muted olive, and dusty rose, with a calm editorial finish. No collage, checkerboard, text, names, dates, or watermark:
1. orn-minimalist-senja-01.png — dried wildflower sprig.
2. orn-minimalist-senja-02.png — soft peach watercolor wash.
3. orn-minimalist-senja-03.png — fine olive branch.
4. orn-minimalist-senja-04.png — small sunset circle.
5. orn-minimalist-senja-05.png — minimal scallop frame edge.
6. orn-minimalist-senja-06.png — tiny cream ribbon bow.
~~~

## 14. Islamic ornament pack

~~~text
Create exactly six separate downloadable transparent PNG ornament images, one isolated object per output, square 1200×1200 target canvas with genuine alpha and generous safe padding. Keep forms respectful, contemporary, and restrained in ivory, sage, and muted gold. Do not draw Arabic calligraphy, Quran verses, hadith, religious words, or sacred text. The listed geometric motif is decorative and non-sacred. No collage, checkerboard, text, or watermark:
1. orn-islamic-01.png — Sakinah: minimal ivory arch frame.
2. orn-islamic-02.png — Sakinah: fine olive branch and gold divider.
3. orn-islamic-03.png — Mawaddah: non-sacred geometric star-pattern panel.
4. orn-islamic-04.png — Mawaddah: paired botanical corner sprays.
5. orn-islamic-05.png — Rahmah: ivory and gold floral frame corner.
6. orn-islamic-06.png — Rahmah: pomegranate blossom and gold-leaf divider.
~~~

## 15. Retro ornament pack

~~~text
Create exactly six separate downloadable transparent PNG ornament images, one isolated object per output, square 1200×1200 target canvas with genuine alpha and generous padding. Combine Indonesian nostalgia, old cinema, and old-western stationery as separate concepts. Use faded film colors, cream paper, terracotta, and muted ink. Leave all paper, letters, and tickets blank. No readable writing, collage, checkerboard, logo, or watermark:
1. orn-retro-01.png — Kabar Bahagia: blank vintage Indonesian postcard corner.
2. orn-retro-02.png — Kabar Bahagia: old airmail envelope with no writing.
3. orn-retro-03.png — Layar Tancep: blank vintage cinema ticket.
4. orn-retro-04.png — Layar Tancep: small portable film projector silhouette.
5. orn-retro-05.png — Sundown Letters: blank western-era love letter with wax seal.
6. orn-retro-06.png — Sundown Letters: dried prairie flowers and ribbon.
~~~

## 16. Adat and romantic portrait backgrounds

~~~text
Create exactly six separate opaque portrait PNG image outputs, one background per numbered concept, target 1200×1800 (2:3). Each is a quiet invitation background with a clear central/lower-middle area reserved for HTML typography. No people, text, names, dates, logos, watermark, collage, contact sheet, grid, or UI. Make each output follow its own regional or editorial art direction; do not force one style across all six:
1. bg-adat-sunda.png — soft Sundanese textile border with a generous ivory center.
2. bg-adat-bali.png — tropical Bali garden light, quiet center, no sacred figures.
3. bg-adat-jawa.png — Javanese ivory paper with restrained batik geometry at the edges.
4. bg-adat-minang.png — warm ivory with Minang songket-inspired gold edge motifs.
5. bg-adat-betawi.png — Betawi floral accents around a clean pale center.
6. bg-minimalist-eunoia.png — white editorial paper with one fine blush botanical detail.
~~~

## 17. Game and minimalist portrait backgrounds

~~~text
Create exactly six separate opaque portrait PNG image outputs, one background per numbered concept, target 1200×1800 (2:3). Reserve a clean central/lower-middle area for HTML text. Include no writing, names, dates, logo, watermark, UI, collage, contact sheet, or grid. Make each image fit its named theme independently:
1. bg-game-minecraft.png — Minecraft block landscape at golden hour with a clear text area.
2. bg-game-spongebob.png — bright SpongeBob SquarePants undersea world with a calm open center.
3. bg-game-block-blast.png — colorful Block Blast-inspired puzzle world without a game interface.
4. bg-game-upin-ipin.png — warm Upin and Ipin kampung landscape with a clear text area.
5. bg-minimalist-ruang-rindu.png — warm-white minimalist canvas with very large negative space.
6. bg-minimalist-senja.png — soft peach sunset haze fading into blank ivory paper.
~~~

## 18. Islamic and retro portrait backgrounds

~~~text
Create exactly six separate opaque portrait PNG image outputs, one background per numbered concept, target 1200×1800 (2:3). Keep a quiet central/lower-middle panel so HTML text stays legible. No people, text, calligraphy, sacred writing, names, dates, logos, watermark, UI, collage, contact sheet, or grid. Give each output its own named visual direction:
1. bg-islamic-sakinah.png — quiet ivory arch and botanical edge, no calligraphy.
2. bg-islamic-mawaddah.png — muted sage geometric pattern at edges, no sacred text.
3. bg-islamic-rahmah.png — ivory and gold floral corners with a clear central panel.
4. bg-retro-kabar-bahagia.png — aged Indonesian postcard paper with terracotta corners.
5. bg-retro-layar-tancep.png — old Indonesian outdoor cinema night in faded film colors.
6. bg-retro-sundown-letters.png — western vintage letter paper in muted sunset colors.
~~~

## Visual QA before adding files to the app

Check every image against its filename and concept. Confirm the ornament PNG has actual transparent pixels, the entire object is visible with clean edges, no stray text or artifacts appear, and regional details are not mixed. Check backgrounds for the right portrait crop, calm center, no accidental lettering, and readable contrast behind HTML text. Reject and regenerate any file that fails. Keep generation outputs in the original PNG format until reviewed; only then may a separate intake step create optimized WebP copies for web delivery.

Character-themed designs are unofficial concepts. Do not present them as endorsed or licensed by the relevant game or cartoon owners; confirm commercial usage rights before selling them, or replace them with original block-world, undersea, puzzle, and kampung characters.
