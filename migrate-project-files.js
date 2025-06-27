
import { drizzle } from "drizzle-orm/postgres-js";
import { sql } from "drizzle-orm";
import postgres from "postgres";
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

const client = postgres(connectionString, { ssl: false });
const db = drizzle(client);

async function migrate() {
  try {
    console.log("Updating projects table...");
    
    // Rename columns to new structure
    await db.execute(sql`
      ALTER TABLE projects 
      RENAME COLUMN pdf_path TO pdf_url
    `);

    await db.execute(sql`
      ALTER TABLE projects 
      RENAME COLUMN image_path TO image_url
    `);

    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await client.end();
  }
}

migrate();
