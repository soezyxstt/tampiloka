import "server-only";
import { S3Client } from "@aws-sdk/client-s3";

export function storageClient() {
  const { CMS_STORAGE_ENDPOINT, CMS_STORAGE_REGION, CMS_STORAGE_ACCESS_KEY_ID, CMS_STORAGE_SECRET_ACCESS_KEY, CMS_STORAGE_BUCKET } = process.env;
  if (!CMS_STORAGE_ENDPOINT || !CMS_STORAGE_REGION || !CMS_STORAGE_ACCESS_KEY_ID || !CMS_STORAGE_SECRET_ACCESS_KEY || !CMS_STORAGE_BUCKET) throw new Error("Storage is not configured");
  const endpoint = new URL(CMS_STORAGE_ENDPOINT);
  if (endpoint.protocol !== "https:" || !endpoint.hostname.endsWith(".aws.neon.tech")) throw new Error("Invalid storage endpoint");
  return { bucket: CMS_STORAGE_BUCKET, client: new S3Client({ endpoint: endpoint.href, region: CMS_STORAGE_REGION, forcePathStyle: true, credentials: { accessKeyId: CMS_STORAGE_ACCESS_KEY_ID, secretAccessKey: CMS_STORAGE_SECRET_ACCESS_KEY } }) };
}
