import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    // DIRECT_URL yoksa DATABASE_URL'e düşer (Vercel build'de güvenli)
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "",
  },
});
