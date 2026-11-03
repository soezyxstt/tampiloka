import { randomUUID } from "node:crypto";
import { S3Client, HeadObjectCommand, DeleteObjectCommand, CopyObjectCommand } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

const { CMS_STORAGE_ENDPOINT: endpoint, CMS_STORAGE_REGION: region, CMS_STORAGE_ACCESS_KEY_ID: accessKeyId, CMS_STORAGE_SECRET_ACCESS_KEY: secretAccessKey, CMS_STORAGE_BUCKET: bucket } = process.env;
if (!endpoint || !region || !accessKeyId || !secretAccessKey || !bucket || !process.argv.includes("--development-only")) throw new Error("Explicit development storage environment and --development-only are required");
if (process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production") throw new Error("Refusing production smoke test");
const client = new S3Client({ endpoint, region, forcePathStyle: true, credentials: { accessKeyId, secretAccessKey } });
const key = `smoke/${randomUUID()}`;
const copyKey = `smoke/${randomUUID()}`;
try {
  const post = await createPresignedPost(client, { Bucket: bucket, Key: key, Expires: 60, Fields: { "Content-Type": "text/plain" }, Conditions: [["content-length-range", 3, 3], ["eq", "$Content-Type", "text/plain"]] });
  const send = async bytes => { const data = new FormData(); for (const [name, value] of Object.entries(post.fields)) data.append(name, value); data.append("file", new Blob([bytes], { type: "text/plain" }), "test.txt"); return fetch(post.url, { method: "POST", body: data }); };
  const oversized = await send("four"); if (oversized.ok) throw new Error("POST policy accepted oversize file");
  const uploaded = await send("abc"); if (!uploaded.ok) throw new Error(`POST upload failed: ${uploaded.status}`);
  const head = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key })); if (head.ContentLength !== 3 || head.ContentType !== "text/plain" || !head.ETag) throw new Error("HEAD mismatch");
  await client.send(new CopyObjectCommand({ Bucket: bucket, Key: copyKey, CopySource: `${bucket}/${key}`, CopySourceIfMatch: head.ETag }));
  let refused = false; try { await client.send(new CopyObjectCommand({ Bucket: bucket, Key: copyKey, CopySource: `${bucket}/${key}`, CopySourceIfMatch: '"incorrect"' })); } catch { refused = true; }
  if (!refused) console.log("Neon ignored an invalid CopySourceIfMatch; completion verifies the copied object instead");
  const anonymous = await fetch(`${endpoint}/${bucket}/${key}`); if (anonymous.ok) throw new Error("Anonymous read unexpectedly succeeded");
  const copy = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: copyKey })); if (copy.ContentLength !== 3 || copy.ContentType !== "text/plain") throw new Error("Copied object HEAD mismatch");
  console.log("Development storage: POST size policy, upload, HEAD, copy and private read passed");
} finally { await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key })); await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: copyKey })); }
