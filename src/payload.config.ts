import { postgresAdapter } from "@payloadcms/db-postgres";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";
import collections from "./payload/collections";
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const allowedOrigins = [process.env.NEXT_PUBLIC_SERVER_URL].filter(Boolean);

export default buildConfig({
  admin: {
    user: "users",
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: "http://localhost:3000",
      collections: ["pages"],
    },
  },
  collections,
  db: postgresAdapter({
    disableCreateDatabase: false,
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
    push: false, // Should be false (this is just for demo purposes)
    migrationDir: path.resolve(dirname, "lib/migrations"),
  }),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "test-secret_key",
  cors: allowedOrigins,
  csrf: allowedOrigins,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
