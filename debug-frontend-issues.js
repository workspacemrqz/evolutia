
import fs from 'fs';
import path from 'path';

console.log("🔍 Analisando arquivos para encontrar problemas...\n");

// 1. Verificar se os arquivos de build existem
const distPath = './dist/public';
const buildFiles = ['index.html', 'assets'];

console.log("1️⃣ Verificando arquivos de build...");
buildFiles.forEach(file => {
  const filePath = path.join(distPath, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} existe`);
  } else {
    console.log(`❌ ${file} não encontrado`);
  }
});

// 2. Verificar rotas da API
console.log("\n2️⃣ Verificando routes.ts...");
try {
  const routesContent = fs.readFileSync('./server/routes.ts', 'utf8');
  
  // Verificar rota de projetos
  if (routesContent.includes('POST') && routesContent.includes('/admin/projects')) {
    console.log("✅ Rota POST /admin/projects encontrada");
  } else {
    console.log("❌ Rota POST /admin/projects não encontrada");
  }
  
  // Verificar rota de expenses
  if (routesContent.includes('/admin/expenses')) {
    console.log("✅ Rota /admin/expenses encontrada");
  } else {
    console.log("❌ Rota /admin/expenses não encontrada");
  }
  
} catch (error) {
  console.log("❌ Erro ao ler routes.ts:", error.message);
}

// 3. Verificar schema do banco
console.log("\n3️⃣ Verificando schema.ts...");
try {
  const schemaContent = fs.readFileSync('./shared/schema.ts', 'utf8');
  
  if (schemaContent.includes('projects') && schemaContent.includes('expenses')) {
    console.log("✅ Schemas projects e expenses encontrados");
  } else {
    console.log("❌ Problemas nos schemas");
  }
  
} catch (error) {
  console.log("❌ Erro ao ler schema.ts:", error.message);
}

// 4. Verificar admin-page.tsx
console.log("\n4️⃣ Verificando admin-page.tsx...");
try {
  const adminPagePath = './client/src/pages/admin-page.tsx';
  if (fs.existsSync(adminPagePath)) {
    const adminContent = fs.readFileSync(adminPagePath, 'utf8');
    
    // Verificar se tem tratamento de erro
    if (adminContent.includes('catch') || adminContent.includes('error')) {
      console.log("✅ Tratamento de erro encontrado no admin");
    } else {
      console.log("⚠️ Possível falta de tratamento de erro no admin");
    }
    
    // Verificar se tem toast/notificação
    if (adminContent.includes('toast') || adminContent.includes('notification')) {
      console.log("✅ Sistema de notificação encontrado");
    } else {
      console.log("⚠️ Possível falta de feedback visual");
    }
    
  } else {
    console.log("❌ admin-page.tsx não encontrado");
  }
  
} catch (error) {
  console.log("❌ Erro ao analisar admin-page:", error.message);
}

console.log("\n🎯 Análise concluída!");
