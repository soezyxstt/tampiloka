import { S3Client, PutBucketCorsCommand, GetBucketCorsCommand } from "@aws-sdk/client-s3";

const { CMS_STORAGE_ENDPOINT, CMS_STORAGE_REGION, CMS_STORAGE_ACCESS_KEY_ID, CMS_STORAGE_SECRET_ACCESS_KEY, CMS_STORAGE_BUCKET, CMS_STORAGE_CORS_ORIGINS } = process.env;
if (!CMS_STORAGE_ENDPOINT || !CMS_STORAGE_REGION || !CMS_STORAGE_ACCESS_KEY_ID || !CMS_STORAGE_SECRET_ACCESS_KEY || !CMS_STORAGE_BUCKET || !CMS_STORAGE_CORS_ORIGINS) throw new Error("Storage configuration and explicit CORS origins required");
const origins = CMS_STORAGE_CORS_ORIGINS.split(",").map(x => x.trim()).filter(Boolean);
if (!origins.length || origins.some(x => !/^https:\/\/[a-z0-9*.-]+$/.test(x) && !/^http:\/\/localhost:\d+$/.test(x))) throw new Error("Invalid CORS origins");
const client = new S3Client({ endpoint: CMS_STORAGE_ENDPOINT, region: CMS_STORAGE_REGION, forcePathStyle: true, credentials: { accessKeyId: CMS_STORAGE_ACCESS_KEY_ID, secretAccessKey: CMS_STORAGE_SECRET_ACCESS_KEY } });
await client.send(new PutBucketCorsCommand({ Bucket: CMS_STORAGE_BUCKET, CORSConfiguration: { CORSRules: [{ AllowedOrigins: origins, AllowedMethods: ["POST"], AllowedHeaders: ["content-type"], MaxAgeSeconds: 300 }] } }));
const result = await client.send(new GetBucketCorsCommand({ Bucket: CMS_STORAGE_BUCKET }));
if (JSON.stringify(result.CORSRules?.[0]?.AllowedOrigins?.slice().sort()) !== JSON.stringify(origins.slice().sort())) throw new Error("CORS verification failed");
console.log("Storage CORS configured and verified");
