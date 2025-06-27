
import { drizzle } from "drizzle-orm/postgres-js";
import { sql } from "drizzle-orm";
import postgres from "postgres";
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ DATABASE_URL não encontrada");
  process.exit(1);
}

console.log("🔍 DATABASE_URL:", connectionString.replace(/:[^:]*@/, ':***@'));

const client = postgres(connectionString, { 
  ssl: false,
  max: 5,
  idle_timeout: 10,
  connect_timeout: 10
});

const db = drizzle(client);

async function completeSystemCheck() {
  try {
    console.log("🔧 Verificação completa do sistema...\n");
    
    // 1. Verificar conexão com banco
    console.log("1️⃣ Testando conexão com banco de dados...");
    await db.execute(sql`SELECT 1 as test`);
    console.log("✅ Conexão com banco OK\n");
    
    // 2. Verificar todas as tabelas
    console.log("2️⃣ Verificando estrutura das tabelas...");
    const tables = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log("📋 Tabelas encontradas:");
    tables.forEach(table => console.log(`  - ${table.table_name}`));
    console.log();
    
    // 3. Verificar colunas essenciais
    const requiredTables = {
      projects: ['id', 'title', 'description', 'links', 'pdf_url', 'image_url', 'revenue', 'created_at'],
      expenses: ['id', 'item', 'description', 'value', 'paid_by', 'project_id', 'created_at'],
      diagnostic_responses: ['id', 'name', 'email', 'status', 'created_at']
    };
    
    for (const [tableName, requiredColumns] of Object.entries(requiredTables)) {
      console.log(`3️⃣ Verificando tabela '${tableName}'...`);
      
      try {
        const columns = await db.execute(sql`
          SELECT column_name, data_type, is_nullable
          FROM information_schema.columns 
          WHERE table_name = ${tableName}
          ORDER BY ordinal_position
        `);
        
        const existingColumns = columns.map(col => col.column_name);
        
        console.log(`📊 Colunas existentes em '${tableName}':`);
        columns.forEach(col => {
          console.log(`  - ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'nullable' : 'not null'})`);
        });
        
        console.log(`🔍 Verificação de colunas obrigatórias:`);
        requiredColumns.forEach(col => {
          const exists = existingColumns.includes(col);
          console.log(`  ${exists ? '✅' : '❌'} ${col}`);
        });
        
        // Contar registros
        const count = await db.execute(sql`SELECT COUNT(*) as total FROM ${sql.identifier(tableName)}`);
        console.log(`📈 Total de registros: ${count[0].total}\n`);
        
      } catch (error) {
        console.log(`❌ Erro ao verificar tabela '${tableName}':`, error.message);
      }
    }
    
    // 4. Verificar arquivos do sistema
    console.log("4️⃣ Verificando arquivos do sistema...");
    
    const criticalFiles = [
      'dist/public/index.html',
      'static/index.html',
      'server/routes.ts',
      'server/db.ts',
      'shared/schema.ts'
    ];
    
    criticalFiles.forEach(filePath => {
      const exists = fs.existsSync(filePath);
      console.log(`  ${exists ? '✅' : '❌'} ${filePath}`);
    });
    
    // 5. Verificar diretórios de upload
    console.log("\n5️⃣ Verificando diretórios de upload...");
    
    const uploadDirs = [
      'uploads',
      'static',
      'static/projects',
      'dist/public',
      'dist/public/assets'
    ];
    
    uploadDirs.forEach(dirPath => {
      const exists = fs.existsSync(dirPath);
      console.log(`  ${exists ? '✅' : '❌'} ${dirPath}`);
      
      if (exists) {
        try {
          const stats = fs.statSync(dirPath);
          console.log(`    Permissões: ${(stats.mode & parseInt('777', 8)).toString(8)}`);
        } catch (error) {
          console.log(`    ❌ Erro ao verificar permissões: ${error.message}`);
        }
      }
    });
    
    // 6. Teste de operações CRUD
    console.log("\n6️⃣ Testando operações CRUD...");
    
    try {
      // Teste projeto
      const testProject = await db.execute(sql`
        INSERT INTO projects (title, description, revenue) 
        VALUES ('TESTE_SISTEMA', 'Projeto para teste completo do sistema', 'R$ 5000') 
        RETURNING id, title
      `);
      
      if (testProject.length > 0) {
        console.log("✅ Inserção de projeto OK");
        
        // Limpar teste
        await db.execute(sql`DELETE FROM projects WHERE title = 'TESTE_SISTEMA'`);
        console.log("✅ Deleção de projeto OK");
      }
      
      // Teste expense
      const testExpense = await db.execute(sql`
        INSERT INTO expenses (item, description, value, paid_by) 
        VALUES ('TESTE_SISTEMA', 'Gasto para teste completo', 100.00, 'Sistema') 
        RETURNING id, item
      `);
      
      if (testExpense.length > 0) {
        console.log("✅ Inserção de gasto OK");
        
        // Limpar teste
        await db.execute(sql`DELETE FROM expenses WHERE item = 'TESTE_SISTEMA'`);
        console.log("✅ Deleção de gasto OK");
      }
      
    } catch (error) {
      console.log("❌ Erro nos testes CRUD:", error.message);
    }
    
    console.log("\n🎉 Verificação completa finalizada!");
    
  } catch (error) {
    console.error("❌ Erro geral durante verificação:", error.message);
    console.error("Stack:", error.stack);
  } finally {
    await client.end();
  }
}

completeSystemCheck();
