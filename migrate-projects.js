
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
    console.log("Creating projects table...");
    
    // Create projects table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        links TEXT,
        pdf_path TEXT,
        image_path TEXT,
        revenue TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Add project_id column to expenses table
    await db.execute(sql`
      ALTER TABLE expenses 
      ADD COLUMN IF NOT EXISTS project_id INTEGER REFERENCES projects(id)
    `);

    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await client.end();
  }
}

migrate();
