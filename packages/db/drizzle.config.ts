import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schema",
  out: "./src/migrations",
  driver: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
} satisfies Config;