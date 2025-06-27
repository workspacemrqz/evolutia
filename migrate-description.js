
import { drizzle } from "drizzle-orm/postgres-js";
import { sql } from "drizzle-orm";
import postgres from "postgres";
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL não encontrada no arquivo .env");
  process.exit(1);
}

const client = postgres(connectionString, {
  ssl: false,
  max: 1,
});

const db = drizzle(client);

async function addDescriptionColumn() {
  try {
    console.log("Adicionando coluna 'description' à tabela expenses...");
    
    await db.execute(sql`
      ALTER TABLE expenses 
      ADD COLUMN IF NOT EXISTS description TEXT;
    `);
    
    console.log("✅ Coluna 'description' adicionada com sucesso!");
    
  } catch (error) {
    console.error("❌ Erro ao adicionar coluna:", error);
  } finally {
    await client.end();
  }
}

addDescriptionColumn();
