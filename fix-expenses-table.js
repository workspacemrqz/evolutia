
import { drizzle } from "drizzle-orm/postgres-js";
import { sql } from "drizzle-orm";
import postgres from "postgres";
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;
const client = postgres(connectionString, { ssl: false });
const db = drizzle(client);

async function fixExpensesTable() {
  try {
    console.log("🔧 Corrigindo tabela expenses...");
    
    // Recriar tabela expenses com estrutura correta
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS expenses (
        id SERIAL PRIMARY KEY,
        item TEXT NOT NULL,
        description TEXT,
        value NUMERIC(10,2) NOT NULL,
        paid_by TEXT NOT NULL,
        project_id INTEGER REFERENCES projects(id),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    
    // Garantir que todas as colunas existem
    const columns = [
      'ALTER TABLE expenses ADD COLUMN IF NOT EXISTS description TEXT',
      'ALTER TABLE expenses ADD COLUMN IF NOT EXISTS paid_by TEXT NOT NULL DEFAULT \'Gabriel Camargo\'',
      'ALTER TABLE expenses ADD COLUMN IF NOT EXISTS project_id INTEGER REFERENCES projects(id)'
    ];
    
    for (const column of columns) {
      try {
        await db.execute(sql.raw(column));
        console.log(`✅ ${column}`);
      } catch (error) {
        console.log(`ℹ️ ${column}: ${error.message}`);
      }
    }
    
    console.log("✅ Tabela expenses corrigida!");
    
  } catch (error) {
    console.error("❌ Erro:", error.message);
  } finally {
    await client.end();
  }
}

fixExpensesTable();
