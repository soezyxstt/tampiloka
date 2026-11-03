export const MAX_FILE_SIZE = 20 * 1024 * 1024;
export const MAX_SESSION_SIZE = 100 * 1024 * 1024;
export const MAX_SESSION_FILES = 20;
export const UPLOAD_EXPIRY_SECONDS = 300;

// SVG and HTML are deliberately excluded: uploaded content must not execute in a browser.
const types = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf"]);

export function validateUpload(input: { filename: unknown; contentType: unknown; size: unknown }, limits: { allowedTypes?: string[]; maxFileSize?: number } = {}): boolean {
  const { filename, contentType, size } = input;
  if (typeof filename !== "string" || !filename.trim() || filename.length > 255 || /[\x00-\x1f\x7f/\\]/.test(filename)) return false;
  if (typeof contentType !== "string" || !types.has(contentType)) return false;
  if (typeof size !== "number" || !Number.isSafeInteger(size) || size <= 0 || size > Math.min(MAX_FILE_SIZE, limits.maxFileSize ?? MAX_FILE_SIZE)) return false;
  const extensions: Record<string, string[]> = { "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"], "image/gif": [".gif"], "image/webp": [".webp"], "application/pdf": [".pdf"] };
  const ext = extensions[contentType].find(value => filename.toLowerCase().endsWith(value));
  return !!ext && (!limits.allowedTypes?.length || limits.allowedTypes.some(type => type.toLowerCase() === contentType || type.toLowerCase() === ext));
}

// Signatures establish format identity, not safety or malware absence.
export function matchesFileSignature(bytes: Uint8Array, type: string): boolean {
  const starts = (values: number[]) => values.every((value, i) => bytes[i] === value);
  const ascii = (offset: number, value: string) => [...value].every((c, i) => bytes[offset + i] === c.charCodeAt(0));
  switch (type) {
    case "image/jpeg": return starts([0xff, 0xd8, 0xff]);
    case "image/png": return starts([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    case "image/gif": return ascii(0, "GIF87a") || ascii(0, "GIF89a");
    case "image/webp": return ascii(0, "RIFF") && ascii(8, "WEBP");
    case "application/pdf": return ascii(0, "%PDF-");
    default: return false;
  }
}
