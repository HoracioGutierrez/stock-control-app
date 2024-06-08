import { defineConfig } from "drizzle-kit";
import { loadEnvConfig } from '@next/env';
import { cwd } from "node:process";

loadEnvConfig(cwd())

export default defineConfig({
  dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
  schema: "./schema.ts",
  out: "./drizzle",
  dbCredentials : {
    /* host: process.env.POSTGRES_HOST as string,
    database: process.env.POSTGRES_DATABASE as string, */
    url: process.env.DATABASE_URL as string,
    /* ssl: true,
    password: process.env.POSTGRES_PASSWORD as string,
    user: process.env.POSTGRES_USER as string, */
  }
});