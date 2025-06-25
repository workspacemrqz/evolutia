#!/usr/bin/env node

import "dotenv/config";
import pkg from 'pg';
const { Pool } = pkg;

// Banco de destino (seu banco atual)
const targetPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Dados de exemplo baseados na estrutura esperada
const sampleData = [
  {
    name: "João Silva",
    email: "joao.silva@empresa.com.br",
    phone: "(11) 99999-1234",
    company: "Tech Solutions LTDA",
    position: "gerente",
    custom_position: null,
    revenue: "R$ 1M - R$ 5M",
    employees: "11-50",
    erp: "SAP",
    areas: JSON.stringify(["vendas", "financeiro", "rh"]),
    time_consuming_process: "Processo manual de aprovação de vendas que demora 3-5 dias",
    lost_opportunities: "Perdemos cerca de 20% das vendas por demora no processo",
    status: "Pendente"
  },
  {
    name: "Maria Oliveira",
    email: "maria.oliveira@startup.com",
    phone: "(21) 88888-5678",
    company: "Startup Inovadora",
    position: "diretor",
    custom_position: null,
    revenue: "R$ 500K - R$ 1M",
    employees: "2-10",
    erp: "Não utilizo",
    areas: JSON.stringify(["vendas", "marketing"]),
    time_consuming_process: "Controle manual de estoque e relatórios financeiros",
    lost_opportunities: "Dificuldade em acompanhar métricas de conversão",
    status: "Visto"
  },
  {
    name: "Carlos Santos",
    email: "carlos@industria.com.br",
    phone: "(11) 77777-9012",
    company: "Indústria ABC",
    position: "proprietario",
    custom_position: null,
    revenue: "R$ 5M - R$ 10M",
    employees: "51-200",
    erp: "TOTVS",
    areas: JSON.stringify(["producao", "vendas", "financeiro"]),
    time_consuming_process: "Controle de produção e qualidade totalmente manual",
    lost_opportunities: "Retrabalho e desperdício por falta de automação",
    status: "Atendido"
  },
  {
    name: "Ana Costa",
    email: "ana.costa@consultoria.com",
    phone: "(31) 66666-3456",
    company: "Consultoria Estratégica",
    position: "outro",
    custom_position: "Sócia-fundadora",
    revenue: "R$ 100K - R$ 500K",
    employees: "2-10",
    erp: "QuickBooks",
    areas: JSON.stringify(["vendas", "administrativo"]),
    time_consuming_process: "Gestão de projetos e controle de horas dos consultores",
    lost_opportunities: "Dificuldade em precificar projetos adequadamente",
    status: "Pendente"
  },
  {
    name: "Pedro Ferreira",
    email: "pedro@ecommerce.com.br",
    phone: "(41) 55555-7890",
    company: "E-commerce Plus",
    position: "gerente",
    custom_position: null,
    revenue: "R$ 1M - R$ 5M",
    employees: "11-50",
    erp: "WooCommerce",
    areas: JSON.stringify(["vendas", "marketing", "atendimento"]),
    time_consuming_process: "Atendimento ao cliente e gestão de estoque",
    lost_opportunities: "Carrinho abandonado e falta de follow-up automatizado",
    status: "Visto"
  }
];

async function migrateData() {
  try {
    console.log("Iniciando migração com dados de exemplo...");
    
    const targetClient = await targetPool.connect();
    
    try {
      // Limpar dados existentes
      await targetClient.query('DELETE FROM diagnostic_responses');
      console.log("Dados existentes removidos.");
      
      // Inserir dados de exemplo
      const insertQuery = `
        INSERT INTO diagnostic_responses (
          name, email, phone, company, position, custom_position, 
          revenue, employees, erp, areas, time_consuming_process, 
          lost_opportunities, status, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW(), NOW())
        RETURNING id, name, email
      `;
      
      for (const data of sampleData) {
        const values = [
          data.name,
          data.email,
          data.phone,
          data.company,
          data.position,
          data.custom_position,
          data.revenue,
          data.employees,
          data.erp,
          data.areas,
          data.time_consuming_process,
          data.lost_opportunities,
          data.status
        ];
        
        const result = await targetClient.query(insertQuery, values);
        console.log(`✓ Inserido: ${result.rows[0].name} (${result.rows[0].email})`);
      }
      
      // Reset sequence
      await targetClient.query(`
        SELECT setval('diagnostic_responses_id_seq', COALESCE((SELECT MAX(id) FROM diagnostic_responses), 1))
      `);
      
      console.log("\n✅ Migração concluída com sucesso!");
      console.log(`📊 Total de registros inseridos: ${sampleData.length}`);
      
      // Verificar dados inseridos
      const countResult = await targetClient.query('SELECT COUNT(*) FROM diagnostic_responses');
      console.log(`📈 Total de registros no banco: ${countResult.rows[0].count}`);
      
    } finally {
      targetClient.release();
    }
    
  } catch (error) {
    console.error("❌ Erro durante a migração:", error);
  } finally {
    await targetPool.end();
  }
}

migrateData();