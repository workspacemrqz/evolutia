
const { drizzle } = require("drizzle-orm/postgres-js");
const { sql } = require("drizzle-orm");
const postgres = require("postgres");

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL environment variable is not set");
  process.exit(1);
}

const client = postgres(connectionString);
const db = drizzle(client);

async function migrateExpenses() {
  try {
    console.log("Creating expenses table...");
    
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS expenses (
        id serial PRIMARY KEY,
        item text NOT NULL,
        value numeric(10,2) NOT NULL,
        paid_by text NOT NULL,
        created_at timestamp DEFAULT now()
      );
    `);
    
    console.log("Expenses table created successfully!");
    
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

migrateExpenses();
