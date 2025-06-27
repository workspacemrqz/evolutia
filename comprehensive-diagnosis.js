
import { drizzle } from "drizzle-orm/postgres-js";
import { sql } from "drizzle-orm";
import postgres from "postgres";
import fs from "fs";
import path from "path";
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ DATABASE_URL não encontrada");
  process.exit(1);
}

const client = postgres(connectionString, { ssl: false });
const db = drizzle(client);

async function comprehensiveDiagnosis() {
  try {
    console.log("🔍 DIAGNÓSTICO COMPLETO DO SISTEMA");
    console.log("=====================================\n");

    // 1. Testar conexão com banco
    console.log("1️⃣ Testando conexão com o banco de dados...");
    await db.execute(sql`SELECT 1 as test`);
    console.log("✅ Conexão com banco estabelecida\n");

    // 2. Verificar todas as tabelas
    console.log("2️⃣ Verificando estrutura das tabelas...");
    
    const tables = ['projects', 'expenses', 'diagnostic_responses'];
    
    for (const tableName of tables) {
      try {
        console.log(`\n📋 Tabela: ${tableName}`);
        
        const columns = await db.execute(sql.raw(`
          SELECT column_name, data_type, is_nullable, column_default
          FROM information_schema.columns 
          WHERE table_name = '${tableName}' 
          ORDER BY ordinal_position
        `));
        
        if (columns.length === 0) {
          console.log(`❌ Tabela '${tableName}' não existe!`);
          continue;
        }
        
        console.log(`✅ Colunas da tabela '${tableName}':`);
        columns.forEach(col => {
          const nullable = col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL';
          const defaultVal = col.column_default ? ` [default: ${col.column_default}]` : '';
          console.log(`   - ${col.column_name}: ${col.data_type} ${nullable}${defaultVal}`);
        });
        
        const count = await db.execute(sql.raw(`SELECT COUNT(*) as total FROM ${tableName}`));
        console.log(`📊 Total de registros: ${count[0].total}`);
        
      } catch (error) {
        console.log(`❌ Erro na tabela '${tableName}': ${error.message}`);
      }
    }

    // 3. Testar inserção de projeto
    console.log("\n3️⃣ Testando inserção de projeto...");
    try {
      const testProject = await db.execute(sql`
        INSERT INTO projects (title, description, revenue) 
        VALUES ('Teste Diagnóstico', 'Projeto de teste', 'R$ 1.000,00')
        RETURNING id, title
      `);
      console.log("✅ Inserção de projeto funcionando:", testProject[0]);
      
      // Limpar teste
      await db.execute(sql`DELETE FROM projects WHERE title = 'Teste Diagnóstico'`);
      console.log("✅ Limpeza do teste realizada");
      
    } catch (error) {
      console.log("❌ Erro ao inserir projeto:", error.message);
    }

    // 4. Testar inserção de despesa
    console.log("\n4️⃣ Testando inserção de despesa...");
    try {
      const testExpense = await db.execute(sql`
        INSERT INTO expenses (item, description, value, paid_by) 
        VALUES ('Teste Diagnóstico', 'Despesa de teste', 100.00, 'Gabriel Camargo')
        RETURNING id, item
      `);
      console.log("✅ Inserção de despesa funcionando:", testExpense[0]);
      
      // Limpar teste
      await db.execute(sql`DELETE FROM expenses WHERE item = 'Teste Diagnóstico'`);
      console.log("✅ Limpeza do teste realizada");
      
    } catch (error) {
      console.log("❌ Erro ao inserir despesa:", error.message);
    }

    // 5. Verificar arquivos de upload
    console.log("\n5️⃣ Verificando diretórios de upload...");
    
    const directories = [
      './uploads',
      './static',
      './static/projects'
    ];
    
    for (const dir of directories) {
      if (fs.existsSync(dir)) {
        const stats = fs.statSync(dir);
        console.log(`✅ ${dir} existe (permissões: ${stats.mode.toString(8)})`);
      } else {
        console.log(`❌ ${dir} não existe`);
        try {
          fs.mkdirSync(dir, { recursive: true });
          console.log(`✅ ${dir} criado`);
        } catch (error) {
          console.log(`❌ Erro ao criar ${dir}: ${error.message}`);
        }
      }
    }

    // 6. Verificar schema de validação
    console.log("\n6️⃣ Verificando esquemas de validação...");
    
    const schemaPath = './shared/schema.ts';
    if (fs.existsSync(schemaPath)) {
      const schemaContent = fs.readFileSync(schemaPath, 'utf8');
      
      console.log("✅ Schema encontrado");
      console.log("📋 Verificando definições:");
      
      if (schemaContent.includes('projects = pgTable')) {
        console.log("   ✅ Tabela projects definida");
      } else {
        console.log("   ❌ Tabela projects não definida");
      }
      
      if (schemaContent.includes('expenses = pgTable')) {
        console.log("   ✅ Tabela expenses definida");
      } else {
        console.log("   ❌ Tabela expenses não definida");
      }
      
      if (schemaContent.includes('expenseSchema')) {
        console.log("   ✅ Schema de validação de despesas definido");
      } else {
        console.log("   ❌ Schema de validação de despesas não definido");
      }
      
    } else {
      console.log("❌ Arquivo schema.ts não encontrado");
    }

    // 7. Verificar routes
    console.log("\n7️⃣ Verificando rotas da API...");
    
    const routesPath = './server/routes.ts';
    if (fs.existsSync(routesPath)) {
      const routesContent = fs.readFileSync(routesPath, 'utf8');
      
      console.log("✅ Arquivo de rotas encontrado");
      
      const routes = [
        { path: '/api/admin/projects', method: 'GET' },
        { path: '/api/admin/projects', method: 'POST' },
        { path: '/api/admin/expenses', method: 'GET' },
        { path: '/api/admin/expenses', method: 'POST' }
      ];
      
      routes.forEach(route => {
        const routePattern = new RegExp(`app\\.${route.method.toLowerCase()}\\(["']${route.path.replace(/\//g, '\\/')}["']`);
        if (routePattern.test(routesContent)) {
          console.log(`   ✅ ${route.method} ${route.path} definida`);
        } else {
          console.log(`   ❌ ${route.method} ${route.path} não encontrada`);
        }
      });
      
    } else {
      console.log("❌ Arquivo de rotas não encontrado");
    }

    console.log("\n🎯 DIAGNÓSTICO CONCLUÍDO!");
    
  } catch (error) {
    console.error("❌ Erro durante diagnóstico:", error.message);
  } finally {
    await client.end();
  }
}

comprehensiveDiagnosis();
