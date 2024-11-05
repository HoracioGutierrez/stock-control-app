import { defineConfig } from "drizzle-kit";
import { loadEnvConfig } from '@next/env';
import { cwd } from "node:process";

loadEnvConfig(cwd())

export default defineConfig({
  dialect: "postgresql",
  schema: "./schema.ts",
  out: "./drizzle",
  dbCredentials : {
    url: process.env.DATABASE_URL as string,
  }
});