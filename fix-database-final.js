
import { drizzle } from "drizzle-orm/postgres-js";
import { sql } from "drizzle-orm";
import postgres from "postgres";
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL é obrigatória");
  process.exit(1);
}

const client = postgres(connectionString, { ssl: false });
const db = drizzle(client);

async function fixDatabase() {
  try {
    console.log("🔧 Corrigindo estrutura do banco de dados...");
    
    // 1. Garantir que todas as tabelas existem
    console.log("📋 Criando/verificando tabelas...");
    
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        links TEXT,
        pdf_url TEXT,
        image_url TEXT,
        revenue TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    
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
    
    // 2. Verificar estruturas
    console.log("🔍 Verificando estruturas das tabelas...");
    
    const projectsStructure = await db.execute(sql`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'projects' 
      ORDER BY ordinal_position
    `);
    
    const expensesStructure = await db.execute(sql`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'expenses' 
      ORDER BY ordinal_position
    `);
    
    console.log("📊 Estrutura da tabela projects:");
    projectsStructure.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'nullable' : 'not null'})`);
    });
    
    console.log("📊 Estrutura da tabela expenses:");
    expensesStructure.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'nullable' : 'not null'})`);
    });
    
    // 3. Testar inserção de projeto
    console.log("🧪 Testando inserção de projeto...");
    
    try {
      const testProject = await db.execute(sql`
        INSERT INTO projects (title, description, revenue) 
        VALUES ('Teste', 'Projeto de teste', 'R$ 1000') 
        RETURNING id, title
      `);
      
      if (testProject.length > 0) {
        console.log("✅ Inserção de projeto funcionando!");
        
        // Limpar teste
        await db.execute(sql`DELETE FROM projects WHERE title = 'Teste'`);
      }
    } catch (error) {
      console.error("❌ Erro ao testar inserção de projeto:", error.message);
    }
    
    // 4. Testar inserção de expense
    console.log("🧪 Testando inserção de gasto...");
    
    try {
      const testExpense = await db.execute(sql`
        INSERT INTO expenses (item, description, value, paid_by) 
        VALUES ('Teste', 'Gasto de teste', 100.00, 'Teste User') 
        RETURNING id, item
      `);
      
      if (testExpense.length > 0) {
        console.log("✅ Inserção de gasto funcionando!");
        
        // Limpar teste
        await db.execute(sql`DELETE FROM expenses WHERE item = 'Teste'`);
      }
    } catch (error) {
      console.error("❌ Erro ao testar inserção de gasto:", error.message);
    }
    
    console.log("✅ Verificação do banco concluída!");
    
  } catch (error) {
    console.error("❌ Erro geral:", error);
  } finally {
    await client.end();
  }
}

fixDatabase();
