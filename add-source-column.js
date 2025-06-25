
import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function addSourceColumn() {
  const client = await pool.connect();
  
  try {
    console.log("Verificando se a coluna 'source' já existe...");
    
    const checkColumn = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'diagnostic_responses' 
      AND column_name = 'source'
    `);
    
    if (checkColumn.rows.length === 0) {
      console.log("Adicionando coluna 'source'...");
      await client.query(`
        ALTER TABLE diagnostic_responses 
        ADD COLUMN source VARCHAR(50)
      `);
      
      console.log("Atualizando registros existentes...");
      await client.query(`
        UPDATE diagnostic_responses 
        SET source = 'não informado' 
        WHERE source IS NULL
      `);
      
      console.log("✅ Coluna 'source' adicionada com sucesso!");
    } else {
      console.log("✅ Coluna 'source' já existe!");
    }
    
  } catch (error) {
    console.error("❌ Erro ao adicionar coluna:", error);
  } finally {
    client.release();
    pool.end();
  }
}

addSourceColumn();
