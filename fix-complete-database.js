
import { drizzle } from "drizzle-orm/postgres-js";
import { sql } from "drizzle-orm";
import postgres from "postgres";
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ DATABASE_URL é obrigatória");
  process.exit(1);
}

const client = postgres(connectionString, { ssl: false });
const db = drizzle(client);

async function fixCompleteDatabase() {
  try {
    console.log("🔧 Corrigindo/criando estrutura completa do banco...\n");
    
    // 1. Criar/corrigir tabela projects
    console.log("1️⃣ Criando/corrigindo tabela 'projects'...");
    
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
    
    // Garantir que todas as colunas existem
    const projectColumns = [
      { name: 'title', type: 'TEXT NOT NULL' },
      { name: 'description', type: 'TEXT' },
      { name: 'links', type: 'TEXT' },
      { name: 'pdf_url', type: 'TEXT' },
      { name: 'image_url', type: 'TEXT' },
      { name: 'revenue', type: 'TEXT NOT NULL' },
      { name: 'created_at', type: 'TIMESTAMP DEFAULT NOW()' }
    ];
    
    for (const col of projectColumns) {
      try {
        await db.execute(sql.raw(`
          ALTER TABLE projects 
          ADD COLUMN IF NOT EXISTS ${col.name} ${col.type}
        `));
        console.log(`✅ Coluna '${col.name}' verificada`);
      } catch (error) {
        console.log(`ℹ️ Coluna '${col.name}': ${error.message}`);
      }
    }
    
    // 2. Criar/corrigir tabela expenses
    console.log("\n2️⃣ Criando/corrigindo tabela 'expenses'...");
    
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
    const expenseColumns = [
      { name: 'item', type: 'TEXT NOT NULL' },
      { name: 'description', type: 'TEXT' },
      { name: 'value', type: 'NUMERIC(10,2) NOT NULL' },
      { name: 'paid_by', type: 'TEXT NOT NULL' },
      { name: 'project_id', type: 'INTEGER REFERENCES projects(id)' },
      { name: 'created_at', type: 'TIMESTAMP DEFAULT NOW()' }
    ];
    
    for (const col of expenseColumns) {
      try {
        await db.execute(sql.raw(`
          ALTER TABLE expenses 
          ADD COLUMN IF NOT EXISTS ${col.name} ${col.type}
        `));
        console.log(`✅ Coluna '${col.name}' verificada`);
      } catch (error) {
        console.log(`ℹ️ Coluna '${col.name}': ${error.message}`);
      }
    }
    
    // 3. Criar tabela responses se não existir
    console.log("\n3️⃣ Criando/corrigindo tabela 'responses'...");
    
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS responses (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        company TEXT NOT NULL,
        position TEXT NOT NULL,
        custom_position TEXT,
        revenue TEXT NOT NULL,
        employees TEXT NOT NULL,
        erp TEXT NOT NULL,
        areas TEXT NOT NULL,
        time_consuming_process TEXT NOT NULL,
        lost_opportunities TEXT NOT NULL,
        source TEXT,
        status TEXT DEFAULT 'Pendente',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    
    console.log("✅ Tabela 'responses' verificada");
    
    // 4. Verificar estruturas finais
    console.log("\n4️⃣ Verificando estruturas finais...");
    
    const tables = ['projects', 'expenses', 'responses'];
    
    for (const tableName of tables) {
      try {
        const columns = await db.execute(sql.raw(`
          SELECT column_name, data_type, is_nullable 
          FROM information_schema.columns 
          WHERE table_name = '${tableName}' 
          ORDER BY ordinal_position
        `));
        
        console.log(`\n📊 Estrutura final da tabela '${tableName}':`);
        columns.forEach(col => {
          console.log(`  - ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'nullable' : 'not null'})`);
        });
        
        const count = await db.execute(sql.raw(`SELECT COUNT(*) as total FROM ${tableName}`));
        console.log(`📈 Total de registros: ${count[0].total}`);
        
      } catch (error) {
        console.log(`❌ Erro ao verificar tabela '${tableName}':`, error.message);
      }
    }
    
    console.log("\n🎉 Estrutura do banco corrigida com sucesso!");
    
  } catch (error) {
    console.error("❌ Erro geral:", error.message);
    console.error("Stack:", error.stack);
  } finally {
    await client.end();
  }
}

fixCompleteDatabase();
