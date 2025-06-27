
import { drizzle } from "drizzle-orm/postgres-js";
import { sql } from "drizzle-orm";
import postgres from "postgres";
import 'dotenv/config';

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

async function fullDiagnosis() {
  try {
    console.log("🔧 Iniciando diagnóstico completo do banco...\n");
    
    // 1. Teste de conexão básica
    console.log("1️⃣ Testando conexão básica...");
    await db.execute(sql`SELECT 1 as test`);
    console.log("✅ Conexão estabelecida com sucesso!\n");
    
    // 2. Listar todas as tabelas
    console.log("2️⃣ Listando tabelas existentes...");
    const tables = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log("📋 Tabelas encontradas:");
    tables.forEach(table => console.log(`  - ${table.table_name}`));
    console.log();
    
    // 3. Verificar estrutura da tabela projects
    console.log("3️⃣ Estrutura da tabela 'projects'...");
    try {
      const projectsColumns = await db.execute(sql`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns 
        WHERE table_name = 'projects' 
        ORDER BY ordinal_position
      `);
      
      console.log("📊 Colunas da tabela 'projects':");
      projectsColumns.forEach(col => {
        console.log(`  - ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'nullable' : 'not null'}) ${col.column_default ? `[default: ${col.column_default}]` : ''}`);
      });
      console.log();
      
      // Contar registros
      const projectCount = await db.execute(sql`SELECT COUNT(*) as total FROM projects`);
      console.log(`📈 Total de projetos: ${projectCount[0].total}\n`);
      
    } catch (error) {
      console.log("❌ Tabela 'projects' não existe ou erro:", error.message);
    }
    
    // 4. Verificar estrutura da tabela expenses
    console.log("4️⃣ Estrutura da tabela 'expenses'...");
    try {
      const expensesColumns = await db.execute(sql`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns 
        WHERE table_name = 'expenses' 
        ORDER BY ordinal_position
      `);
      
      console.log("📊 Colunas da tabela 'expenses':");
      expensesColumns.forEach(col => {
        console.log(`  - ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'nullable' : 'not null'}) ${col.column_default ? `[default: ${col.column_default}]` : ''}`);
      });
      console.log();
      
      // Contar registros
      const expenseCount = await db.execute(sql`SELECT COUNT(*) as total FROM expenses`);
      console.log(`📈 Total de gastos: ${expenseCount[0].total}\n`);
      
    } catch (error) {
      console.log("❌ Tabela 'expenses' não existe ou erro:", error.message);
    }
    
    // 5. Verificar se todas as colunas necessárias existem
    console.log("5️⃣ Verificando colunas obrigatórias...");
    
    const requiredProjectColumns = ['id', 'title', 'description', 'revenue', 'pdf_url', 'image_url', 'created_at'];
    const requiredExpenseColumns = ['id', 'item', 'description', 'value', 'paid_by', 'project_id', 'created_at'];
    
    // Verificar projects
    try {
      const projectsInfo = await db.execute(sql`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'projects'
      `);
      
      const existingProjectColumns = projectsInfo.map(col => col.column_name);
      
      console.log("🔍 Verificação colunas 'projects':");
      requiredProjectColumns.forEach(col => {
        const exists = existingProjectColumns.includes(col);
        console.log(`  ${exists ? '✅' : '❌'} ${col}`);
      });
      console.log();
      
    } catch (error) {
      console.log("❌ Erro ao verificar colunas da tabela projects");
    }
    
    // Verificar expenses
    try {
      const expensesInfo = await db.execute(sql`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'expenses'
      `);
      
      const existingExpenseColumns = expensesInfo.map(col => col.column_name);
      
      console.log("🔍 Verificação colunas 'expenses':");
      requiredExpenseColumns.forEach(col => {
        const exists = existingExpenseColumns.includes(col);
        console.log(`  ${exists ? '✅' : '❌'} ${col}`);
      });
      console.log();
      
    } catch (error) {
      console.log("❌ Erro ao verificar colunas da tabela expenses");
    }
    
    // 6. Testar inserção/deleção
    console.log("6️⃣ Testando operações de inserção...");
    
    try {
      // Teste projeto
      const testProject = await db.execute(sql`
        INSERT INTO projects (title, description, revenue) 
        VALUES ('TESTE_DIAGNÓSTICO', 'Projeto para teste de conectividade', 'R$ 1000') 
        RETURNING id, title
      `);
      
      if (testProject.length > 0) {
        console.log("✅ Inserção de projeto funcionando!");
        
        // Limpar teste
        await db.execute(sql`DELETE FROM projects WHERE title = 'TESTE_DIAGNÓSTICO'`);
        console.log("✅ Deleção de projeto funcionando!");
      }
      
    } catch (error) {
      console.log("❌ Erro ao testar inserção de projeto:", error.message);
    }
    
    try {
      // Teste expense
      const testExpense = await db.execute(sql`
        INSERT INTO expenses (item, description, value, paid_by) 
        VALUES ('TESTE_DIAGNÓSTICO', 'Gasto para teste de conectividade', 50.00, 'Sistema') 
        RETURNING id, item
      `);
      
      if (testExpense.length > 0) {
        console.log("✅ Inserção de gasto funcionando!");
        
        // Limpar teste
        await db.execute(sql`DELETE FROM expenses WHERE item = 'TESTE_DIAGNÓSTICO'`);
        console.log("✅ Deleção de gasto funcionando!");
      }
      
    } catch (error) {
      console.log("❌ Erro ao testar inserção de gasto:", error.message);
    }
    
    console.log("\n🎉 Diagnóstico completo finalizado!");
    
  } catch (error) {
    console.error("❌ Erro geral durante diagnóstico:", error.message);
    console.error("Stack:", error.stack);
  } finally {
    await client.end();
  }
}

fullDiagnosis();
