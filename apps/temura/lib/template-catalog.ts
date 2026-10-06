/**
 * Catalog for Temura invitation designs.
 * Previews are served at /preview/[templateId].
 */

export const TEMURA_CATEGORIES = [
  { id: "adat", label: "Adat", tagline: "Sentuhan tradisi dari berbagai daerah di Indonesia." },
  { id: "game-kartun", label: "Game & kartun", tagline: "Dunia ceria untuk cerita kalian." },
  { id: "minimalist", label: "Minimalist", tagline: "Ruang lapang, detail kecil, dan rasa yang dekat." },
  { id: "islamic", label: "Islamic", tagline: "Tenang, hangat, dan tetap khidmat." },
  { id: "retro-nostalgia", label: "Retro & nostalgia", tagline: "Kenangan lama dengan cerita baru." },
] as const;

export type TemuraTemplateCategoryId = (typeof TEMURA_CATEGORIES)[number]["id"];
export type TemuraTemplateTierId = "essential" | "standard" | "studio";

export const TEMPLATE_TIERS = {
  essential: {
    label: "Essential",
    priceIdr: 125_000,
    originalPriceIdr: 175_000,
    note: "Islamic & minimalist. Penyesuaian dasar.",
  },
  standard: {
    label: "Standard",
    priceIdr: 149_000,
    originalPriceIdr: 199_000,
    note: "Adat, retro, game & kartun. Penyesuaian desain dan ornamen.",
  },
  studio: {
    label: "Custom",
    priceIdr: 249_000,
    originalPriceIdr: 349_000,
    note: "Desain custom sesuai kebutuhan kalian.",
  },
} as const;

export type TemuraTemplateCatalogItem = {
  id: string;
  name: string;
  categoryId: TemuraTemplateCategoryId;
  styleName: string;
  description: string;
  tier: TemuraTemplateTierId;
  priceIdr: number;
  customizationLevel: "Ringkas" | "Sedang" | "Luas";
  previewCoupleNames: "Nara & Aruna";
  /** Null until generated assets and finished previews are ready. */
  coverImage: string | null;
  assetStatus: "planned" | "ready";
  assetIds: readonly string[];
};

const ids = (prefix: string, first: number, last: number): string[] =>
  Array.from({ length: last - first + 1 }, (_, index) =>
    prefix + "-" + String(first + index).padStart(2, "0"),
  );

const sharedRomance = ids("orn-shared-romance", 1, 2);

export const TEMPLATE_CATALOG: readonly TemuraTemplateCatalogItem[] = [
  {
    id: "adat-sunda", name: "Sawala", categoryId: "adat", styleName: "Sunda Priangan",
    description: "Batik Garut, bunga lembut, dan warna bumi yang teduh.", tier: "standard",
    priceIdr: TEMPLATE_TIERS.standard.priceIdr, customizationLevel: "Sedang", previewCoupleNames: "Nara & Aruna",
    coverImage: "/assets/templates/backgrounds/bg-adat-sunda.webp", assetStatus: "ready",
    assetIds: ["bg-adat-sunda", ...ids("orn-adat-sunda", 1, 6), ...sharedRomance],
  },
  {
    id: "adat-bali", name: "Purnama", categoryId: "adat", styleName: "Bali tropis",
    description: "Kamboja, dedaunan tropis, dan aksen hangat yang anggun.", tier: "standard",
    priceIdr: TEMPLATE_TIERS.standard.priceIdr, customizationLevel: "Sedang", previewCoupleNames: "Nara & Aruna",
    coverImage: "/assets/templates/backgrounds/bg-adat-bali.webp", assetStatus: "ready",
    assetIds: ["bg-adat-bali", ...ids("orn-adat-bali", 1, 6), ...sharedRomance],
  },
  {
    id: "adat-jawa", name: "Sekar Mataram", categoryId: "adat", styleName: "Jawa klasik",
    description: "Geometri batik, melati, dan tata letak klasik yang lapang.", tier: "standard",
    priceIdr: TEMPLATE_TIERS.standard.priceIdr, customizationLevel: "Sedang", previewCoupleNames: "Nara & Aruna",
    coverImage: "/assets/templates/backgrounds/bg-adat-jawa.webp", assetStatus: "ready",
    assetIds: ["bg-adat-jawa", ...ids("orn-adat-jawa", 1, 6), ...sharedRomance],
  },
  {
    id: "adat-minang", name: "Rangkiang", categoryId: "adat", styleName: "Minangkabau",
    description: "Songket berwarna emas dan siluet rumah gadang yang halus.", tier: "standard",
    priceIdr: TEMPLATE_TIERS.standard.priceIdr, customizationLevel: "Sedang", previewCoupleNames: "Nara & Aruna",
    coverImage: "/assets/templates/backgrounds/bg-adat-minang.webp", assetStatus: "ready",
    assetIds: ["bg-adat-minang", ...ids("orn-adat-minang", 1, 6), ...sharedRomance],
  },
  {
    id: "adat-betawi", name: "Kembang Kelapa", categoryId: "adat", styleName: "Betawi",
    description: "Warna cerah, sulur kembang kelapa, dan bordir encim.", tier: "standard",
    priceIdr: TEMPLATE_TIERS.standard.priceIdr, customizationLevel: "Sedang", previewCoupleNames: "Nara & Aruna",
    coverImage: "/assets/templates/backgrounds/bg-adat-betawi.webp", assetStatus: "ready",
    assetIds: ["bg-adat-betawi", ...ids("orn-adat-betawi", 1, 6), ...sharedRomance],
  },
  {
    id: "game-minecraft", name: "Dunia Balok", categoryId: "game-kartun", styleName: "Minecraft",
    description: "Petualangan voxel dengan blok, bunga, dan kejutan kecil.", tier: "standard",
    priceIdr: TEMPLATE_TIERS.standard.priceIdr, customizationLevel: "Luas", previewCoupleNames: "Nara & Aruna",
    coverImage: "/assets/templates/backgrounds/bg-game-minecraft.webp", assetStatus: "ready",
    assetIds: ["bg-game-minecraft", ...ids("orn-game-minecraft", 1, 6)],
  },
  {
    id: "game-tom-jerry", name: "Tom & Jerry", categoryId: "game-kartun", styleName: "Tom & Jerry",
    description: "Kartun klasik dengan detail pernikahan yang ceria.", tier: "standard",
    priceIdr: TEMPLATE_TIERS.standard.priceIdr, customizationLevel: "Luas", previewCoupleNames: "Nara & Aruna",
    coverImage: "/assets/templates/backgrounds/bg-game-tom-jerry.webp", assetStatus: "ready",
    assetIds: ["bg-game-tom-jerry", ...ids("orn-game-tom-jerry", 1, 6)],
  },
  {
    id: "game-block-blast", name: "Susun Bahagia", categoryId: "game-kartun", styleName: "Block Blast",
    description: "Balok warna-warni dan bentuk puzzle yang terasa playful.", tier: "standard",
    priceIdr: TEMPLATE_TIERS.standard.priceIdr, customizationLevel: "Luas", previewCoupleNames: "Nara & Aruna",
    coverImage: "/assets/templates/backgrounds/bg-game-block-blast.webp", assetStatus: "ready",
    assetIds: ["bg-game-block-blast", ...ids("orn-game-block-blast", 1, 6)],
  },
  {
    id: "game-upin-ipin", name: "Kampung Ceria", categoryId: "game-kartun", styleName: "Upin & Ipin",
    description: "Kampung yang akrab, teman-teman ceria, dan warna hangat.", tier: "standard",
    priceIdr: TEMPLATE_TIERS.standard.priceIdr, customizationLevel: "Luas", previewCoupleNames: "Nara & Aruna",
    coverImage: "/assets/templates/backgrounds/bg-game-upin-ipin.webp", assetStatus: "ready",
    assetIds: ["bg-game-upin-ipin", ...ids("orn-game-upin-ipin", 1, 6)],
  },
  {
    id: "minimalist-eunoia", name: "Eunoia", categoryId: "minimalist", styleName: "Editorial romance",
    description: "Tipografi berkarakter, bidang kosong, dan satu aksen bunga.", tier: "essential",
    priceIdr: TEMPLATE_TIERS.essential.priceIdr, customizationLevel: "Ringkas", previewCoupleNames: "Nara & Aruna",
    coverImage: "/assets/templates/backgrounds/bg-minimalist-eunoia.webp", assetStatus: "ready",
    assetIds: ["bg-minimalist-eunoia", ...ids("orn-minimalist-eunoia", 1, 6), ...sharedRomance],
  },
  {
    id: "minimalist-ruang-rindu", name: "Ruang Rindu", categoryId: "minimalist", styleName: "Romantic whitespace",
    description: "Ruang putih yang luas, garis tipis, dan gerak yang lembut.", tier: "essential",
    priceIdr: TEMPLATE_TIERS.essential.priceIdr, customizationLevel: "Ringkas", previewCoupleNames: "Nara & Aruna",
    coverImage: "/assets/templates/backgrounds/bg-minimalist-ruang-rindu.webp", assetStatus: "ready",
    assetIds: ["bg-minimalist-ruang-rindu", ...ids("orn-minimalist-ruang-rindu", 1, 6), ...sharedRomance],
  },
  {
    id: "minimalist-senja", name: "Senja", categoryId: "minimalist", styleName: "Soft botanical",
    description: "Latar lembut dengan ornamen botani kecil dan ritme tenang.", tier: "essential",
    priceIdr: TEMPLATE_TIERS.essential.priceIdr, customizationLevel: "Ringkas", previewCoupleNames: "Nara & Aruna",
    coverImage: "/assets/templates/backgrounds/bg-minimalist-senja.webp", assetStatus: "ready",
    assetIds: ["bg-minimalist-senja", ...ids("orn-minimalist-senja", 1, 6), ...sharedRomance],
  },
  {
    id: "islamic-sakinah", name: "Sakinah", categoryId: "islamic", styleName: "Arch minimal",
    description: "Lengkung arsitektural sederhana dengan warna netral hangat.", tier: "essential",
    priceIdr: TEMPLATE_TIERS.essential.priceIdr, customizationLevel: "Ringkas", previewCoupleNames: "Nara & Aruna",
    coverImage: "/assets/templates/backgrounds/bg-islamic-sakinah.webp", assetStatus: "ready",
    assetIds: ["bg-islamic-sakinah", ...ids("orn-islamic", 1, 2), ...sharedRomance],
  },
  {
    id: "islamic-mawaddah", name: "Mawaddah", categoryId: "islamic", styleName: "Garden geometry",
    description: "Motif geometri yang tertata dengan aksen dedaunan lembut.", tier: "essential",
    priceIdr: TEMPLATE_TIERS.essential.priceIdr, customizationLevel: "Ringkas", previewCoupleNames: "Nara & Aruna",
    coverImage: "/assets/templates/backgrounds/bg-islamic-mawaddah.webp", assetStatus: "ready",
    assetIds: ["bg-islamic-mawaddah", ...ids("orn-islamic", 3, 4), ...sharedRomance],
  },
  {
    id: "islamic-rahmah", name: "Rahmah", categoryId: "islamic", styleName: "Ivory and gold",
    description: "Garis keemasan, ruang bersih, dan ornamen floral yang ringan.", tier: "essential",
    priceIdr: TEMPLATE_TIERS.essential.priceIdr, customizationLevel: "Ringkas", previewCoupleNames: "Nara & Aruna",
    coverImage: "/assets/templates/backgrounds/bg-islamic-rahmah.webp", assetStatus: "ready",
    assetIds: ["bg-islamic-rahmah", ...ids("orn-islamic", 5, 6), ...sharedRomance],
  },
  {
    id: "retro-kabar-bahagia", name: "Kabar Bahagia", categoryId: "retro-nostalgia", styleName: "Indonesia tempo dulu",
    description: "Kartu pos lawas, kertas krem, dan aksen merah bata.", tier: "standard",
    priceIdr: TEMPLATE_TIERS.standard.priceIdr, customizationLevel: "Sedang", previewCoupleNames: "Nara & Aruna",
    coverImage: "/assets/templates/backgrounds/bg-retro-kabar-bahagia.webp", assetStatus: "ready",
    assetIds: ["bg-retro-kabar-bahagia", ...ids("orn-retro", 1, 2), ...sharedRomance],
  },
  {
    id: "retro-layar-tancep", name: "Layar Tancep", categoryId: "retro-nostalgia", styleName: "Bioskop keliling",
    description: "Palet film lawas, tiket bioskop, dan suasana malam kampung.", tier: "standard",
    priceIdr: TEMPLATE_TIERS.standard.priceIdr, customizationLevel: "Sedang", previewCoupleNames: "Nara & Aruna",
    coverImage: "/assets/templates/backgrounds/bg-retro-layar-tancep.webp", assetStatus: "ready",
    assetIds: ["bg-retro-layar-tancep", ...ids("orn-retro", 3, 4), ...sharedRomance],
  },
  {
    id: "retro-sundown-letters", name: "Sundown Letters", categoryId: "retro-nostalgia", styleName: "Western vintage",
    description: "Surat berstempel, bunga kering, dan rona matahari terbenam.", tier: "standard",
    priceIdr: TEMPLATE_TIERS.standard.priceIdr, customizationLevel: "Sedang", previewCoupleNames: "Nara & Aruna",
    coverImage: "/assets/templates/backgrounds/bg-retro-sundown-letters.webp", assetStatus: "ready",
    assetIds: ["bg-retro-sundown-letters", ...ids("orn-retro", 5, 6), ...sharedRomance],
  },
];

export type TemplateAssetKind = "portrait-background" | "ornament";
export type TemplateAssetManifestItem = {
  id: string;
  filename: string;
  path: string;
  kind: TemplateAssetKind;
  templateIds: readonly string[];
  promptBatch: string;
  concept: string;
  width: 1200;
  height: 1200 | 1800;
  format: "png";
  alpha: boolean;
  status: "planned";
};

type OrnamentPack = {
  prefix: string;
  promptBatch: string;
  templateIds: readonly string[];
  concepts: readonly string[];
};

const ornamentPacks: readonly OrnamentPack[] = [
  {
    prefix: "orn-shared-romance", promptBatch: "bulk-01-romance-ornaments",
    templateIds: TEMPLATE_CATALOG.map((item) => item.id),
    concepts: [
      "blush rose and foliage corner spray", "small white flower branch",
      "loose satin ribbon bow", "unlettered ivory envelope with tiny heart seal",
      "soft torn-paper frame corner", "airy watercolor leaf cluster",
    ],
  },
  {
    prefix: "orn-adat-sunda", promptBatch: "bulk-02-adat-sunda",
    templateIds: ["adat-sunda"],
    concepts: ["Garut-style lereng batik corner", "peacock feather and leaves", "melati blossom branch", "woven bamboo texture medallion", "slim carved wood frame corner", "small gold leaf divider"],
  },
  {
    prefix: "orn-adat-bali", promptBatch: "bulk-03-adat-bali",
    templateIds: ["adat-bali"],
    concepts: ["frangipani flower cluster", "tropical palm leaf spray", "woven palm-leaf ribbon", "gentle stone arch fragment", "marigold garland loop", "small shell and leaf ornament"],
  },
  {
    prefix: "orn-adat-jawa", promptBatch: "bulk-04-adat-jawa",
    templateIds: ["adat-jawa"],
    concepts: ["jasmine garland corner", "abstract kawung-inspired geometry medallion", "fine batik-inspired floral border", "carved teak frame corner", "soft gold leaf divider", "folded ivory fan with floral edge"],
  },
  {
    prefix: "orn-adat-minang", promptBatch: "bulk-05-adat-minang",
    templateIds: ["adat-minang"],
    concepts: ["songket-inspired gold corner panel", "rumah gadang roof silhouette ornament", "red and gold woven ribbon", "tropical flower sprig", "fine gold filigree divider", "woven textile rosette"],
  },
  {
    prefix: "orn-adat-betawi", promptBatch: "bulk-06-adat-betawi",
    templateIds: ["adat-betawi"],
    concepts: ["kembang kelapa branch", "encim embroidery flower corner", "bright tropical flower garland", "Betawi-style floral tile medallion", "woven bamboo fan corner", "red and cream ribbon loop"],
  },
  {
    prefix: "orn-game-minecraft", promptBatch: "bulk-07-minecraft-ornaments",
    templateIds: ["game-minecraft"],
    concepts: ["Minecraft grass block with tiny flowers", "Minecraft pixel bouquet", "Minecraft redstone torch", "Minecraft chest decorated for a wedding", "friendly Minecraft creeper head", "Minecraft Steve and Alex dressed for a wedding"],
  },
  {
    prefix: "orn-game-tom-jerry", promptBatch: "single-tom-jerry-ornaments",
    templateIds: ["game-tom-jerry"],
    concepts: ["Tom and Jerry together with a wedding flower", "blank ivory envelope with cream bow and red wax seal", "Jerry with a blush bouquet", "tiny cheese heart ornament", "vintage cartoon mouse-hole arch with a floral accent", "cream ribbon with decorative paw-print trail"],
  },
  {
    prefix: "orn-game-block-blast", promptBatch: "bulk-09-block-blast-ornaments",
    templateIds: ["game-block-blast"],
    concepts: ["bright wooden puzzle block cluster", "stacked jewel-tone square blocks", "heart-shaped block puzzle", "pixel flower built from colored squares", "rounded game-star burst", "small celebratory block confetti"],
  },
  {
    prefix: "orn-game-upin-ipin", promptBatch: "bulk-10-upin-ipin-ornaments",
    templateIds: ["game-upin-ipin"],
    concepts: ["Upin and Ipin wearing festive wedding clothes", "Kak Ros holding a flower", "Mail with a small gift", "Mei Mei with a bouquet", "Jarjit with a celebratory pennant", "kampung house and banana-leaf cluster"],
  },
  {
    prefix: "orn-minimalist-eunoia", promptBatch: "bulk-11-minimalist-eunoia-ornaments",
    templateIds: ["minimalist-eunoia"],
    concepts: ["single-line tulip drawing", "fine silver frame corner", "small pressed rose", "minimal paper ribbon", "thin oval portrait frame", "tiny hand-painted heart"],
  },
  {
    prefix: "orn-minimalist-ruang-rindu", promptBatch: "bulk-12-minimalist-ruang-rindu-ornaments",
    templateIds: ["minimalist-ruang-rindu"],
    concepts: ["delicate botanical contour drawing", "thin blush arch outline", "small white flower stem", "soft translucent ribbon", "tiny gold dot constellation", "light ivory torn-paper edge"],
  },
  {
    prefix: "orn-minimalist-senja", promptBatch: "bulk-13-minimalist-senja-ornaments",
    templateIds: ["minimalist-senja"],
    concepts: ["dried wildflower sprig", "soft peach watercolor wash", "fine olive branch", "small sunset circle", "minimal scallop frame edge", "tiny cream ribbon bow"],
  },
  {
    prefix: "orn-islamic", promptBatch: "bulk-14-islamic-ornaments",
    templateIds: ["islamic-sakinah", "islamic-mawaddah", "islamic-rahmah"],
    concepts: ["Sakinah: minimal ivory arch frame", "Sakinah: fine olive branch and gold divider", "Mawaddah: non-sacred geometric star pattern panel", "Mawaddah: paired botanical corner sprays", "Rahmah: ivory and gold floral frame corner", "Rahmah: pomegranate blossom and gold leaf divider"],
  },
  {
    prefix: "orn-retro", promptBatch: "bulk-15-retro-ornaments",
    templateIds: ["retro-kabar-bahagia", "retro-layar-tancep", "retro-sundown-letters"],
    concepts: ["Kabar Bahagia: blank vintage Indonesian postcard corner", "Kabar Bahagia: old airmail envelope with no writing", "Layar Tancep: blank vintage cinema ticket", "Layar Tancep: small portable film projector silhouette", "Sundown Letters: blank western-era love letter with wax seal", "Sundown Letters: dried prairie flowers and ribbon"],
  },
];

const backgroundConcepts = [
  ["adat-sunda", "bulk-16-adat-and-romantic-backgrounds", "soft Sundanese textile border with generous ivory center"],
  ["adat-bali", "bulk-16-adat-and-romantic-backgrounds", "tropical Bali garden light with quiet center and no sacred figures"],
  ["adat-jawa", "bulk-16-adat-and-romantic-backgrounds", "Javanese ivory paper with restrained batik geometry at edges"],
  ["adat-minang", "bulk-16-adat-and-romantic-backgrounds", "warm ivory with Minang songket-inspired gold edge motifs"],
  ["adat-betawi", "bulk-16-adat-and-romantic-backgrounds", "Betawi floral accents around a clean pale center"],
  ["minimalist-eunoia", "bulk-16-adat-and-romantic-backgrounds", "white editorial paper with one fine blush botanical detail"],
  ["game-minecraft", "bulk-17-game-and-minimalist-backgrounds", "Minecraft block landscape at golden hour with clear text area"],
  ["game-tom-jerry", "single-tom-jerry-background", "pastel classic cartoon interior with skirting board and small mouse hole at bottom edge, large blank cream center"],
  ["game-block-blast", "bulk-17-game-and-minimalist-backgrounds", "colorful Block Blast-inspired puzzle world without game interface"],
  ["game-upin-ipin", "bulk-17-game-and-minimalist-backgrounds", "warm Upin and Ipin kampung landscape with clear text area"],
  ["minimalist-ruang-rindu", "bulk-17-game-and-minimalist-backgrounds", "warm-white minimalist canvas with very large negative space"],
  ["minimalist-senja", "bulk-17-game-and-minimalist-backgrounds", "soft peach sunset haze fading into blank ivory paper"],
  ["islamic-sakinah", "bulk-18-islamic-and-retro-backgrounds", "quiet ivory arch and botanical edge, no calligraphy"],
  ["islamic-mawaddah", "bulk-18-islamic-and-retro-backgrounds", "muted sage geometric pattern at edges, no sacred text"],
  ["islamic-rahmah", "bulk-18-islamic-and-retro-backgrounds", "ivory and gold floral corners with a clear central panel"],
  ["retro-kabar-bahagia", "bulk-18-islamic-and-retro-backgrounds", "aged Indonesian postcard paper with terracotta corners"],
  ["retro-layar-tancep", "bulk-18-islamic-and-retro-backgrounds", "old Indonesian outdoor cinema night in faded film colors"],
  ["retro-sundown-letters", "bulk-18-islamic-and-retro-backgrounds", "western vintage letter paper in muted sunset colors"],
] as const;

export const TEMPLATE_ASSET_MANIFEST: readonly TemplateAssetManifestItem[] = [
  ...backgroundConcepts.map(([templateId, promptBatch, concept]) => {
    const filename = "bg-" + templateId + ".png";
    return {
      id: "bg-" + templateId,
      filename,
      path: "/assets/templates/backgrounds/" + filename,
      kind: "portrait-background" as const,
      templateIds: [templateId],
      promptBatch,
      concept,
      width: 1200 as const,
      height: 1800 as const,
      format: "png" as const,
      alpha: false,
      status: "planned" as const,
    };
  }),
  ...ornamentPacks.flatMap((pack) =>
    pack.concepts.map((concept, index) => {
      const filename = pack.prefix + "-" + String(index + 1).padStart(2, "0") + ".png";
      return {
        id: filename.slice(0, -4),
        filename,
        path: "/assets/templates/ornaments/" + filename,
        kind: "ornament" as const,
        templateIds: pack.templateIds,
        promptBatch: pack.promptBatch,
        concept,
        width: 1200 as const,
        height: 1200 as const,
        format: "png" as const,
        alpha: true,
        status: "planned" as const,
      };
    }),
  ),
];
