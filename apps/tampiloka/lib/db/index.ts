import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
let instance: ReturnType<typeof drizzle<typeof schema>> | undefined;
export function getDb() {
  if (!process.env.CMS_DATABASE_URL) throw new Error("CMS database is not configured");
  return instance ??= drizzle(new Pool({ connectionString: process.env.CMS_DATABASE_URL }), { schema });
}
