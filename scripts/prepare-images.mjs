import sharp from 'sharp';
import { mkdir, access, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
const source = fileURLToPath(new URL('../public/generated/', import.meta.url));
const target = fileURLToPath(new URL('../public/images/', import.meta.url));
await mkdir(target, { recursive: true });
const images = JSON.parse(await readFile(new URL('./image-manifest.json', import.meta.url), 'utf8'));
for (const [id, name] of images) {
  const filename = `Gemini_Generated_Image_${id}.jpg`;
  let file = resolve(source, filename);
  try { await access(file); } catch {
    if (!process.argv[2]) throw new Error(`Missing source: ${name}`);
    file = resolve(process.argv[2], filename);
    await access(file);
  }
  await sharp(file).resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 84 }).toFile(resolve(target, `${name}.webp`));
  console.log(`Prepared ${name}.webp`);
}
