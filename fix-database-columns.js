
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

async function fixDatabase() {
  try {
    console.log("Fixing database columns...");
    
    // Check if projects table exists and fix column names
    console.log("Checking projects table...");
    
    // Rename pdf_path to pdf_url if exists
    try {
      await db.execute(sql`
        ALTER TABLE projects 
        RENAME COLUMN pdf_path TO pdf_url
      `);
      console.log("✅ Renamed pdf_path to pdf_url");
    } catch (error) {
      if (error.message.includes('does not exist')) {
        console.log("⚠️ pdf_path column doesn't exist, checking pdf_url...");
        try {
          await db.execute(sql`
            ALTER TABLE projects 
            ADD COLUMN IF NOT EXISTS pdf_url TEXT
          `);
          console.log("✅ Added pdf_url column");
        } catch (e) {
          console.log("ℹ️ pdf_url column already exists");
        }
      }
    }

    // Rename image_path to image_url if exists
    try {
      await db.execute(sql`
        ALTER TABLE projects 
        RENAME COLUMN image_path TO image_url
      `);
      console.log("✅ Renamed image_path to image_url");
    } catch (error) {
      if (error.message.includes('does not exist')) {
        console.log("⚠️ image_path column doesn't exist, checking image_url...");
        try {
          await db.execute(sql`
            ALTER TABLE projects 
            ADD COLUMN IF NOT EXISTS image_url TEXT
          `);
          console.log("✅ Added image_url column");
        } catch (e) {
          console.log("ℹ️ image_url column already exists");
        }
      }
    }

    // Ensure all required columns exist
    await db.execute(sql`
      ALTER TABLE projects 
      ADD COLUMN IF NOT EXISTS title TEXT NOT NULL DEFAULT 'Untitled'
    `);

    await db.execute(sql`
      ALTER TABLE projects 
      ADD COLUMN IF NOT EXISTS revenue TEXT NOT NULL DEFAULT '0'
    `);

    await db.execute(sql`
      ALTER TABLE projects 
      ADD COLUMN IF NOT EXISTS description TEXT
    `);

    await db.execute(sql`
      ALTER TABLE projects 
      ADD COLUMN IF NOT EXISTS links TEXT
    `);

    await db.execute(sql`
      ALTER TABLE projects 
      ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW()
    `);

    console.log("✅ Database structure fixed successfully!");
    
    // Show final table structure
    const result = await db.execute(sql`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'projects'
      ORDER BY ordinal_position
    `);
    
    console.log("\n📋 Current projects table structure:");
    result.forEach(row => {
      console.log(`  ${row.column_name}: ${row.data_type} (${row.is_nullable === 'YES' ? 'nullable' : 'not null'})`);
    });

  } catch (error) {
    console.error("❌ Error fixing database:", error);
  } finally {
    await client.end();
  }
}

fixDatabase();
