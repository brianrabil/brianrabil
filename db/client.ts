import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import * as schema from "./schema";
import path from "node:path";

const dbPath = path.join(process.cwd(), "sqlite.db");

export const client = new Database(dbPath, { create: true });

export const db = drizzle(client, { schema });
