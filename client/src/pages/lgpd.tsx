import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function LGPD() {
  return (
    <div className="min-h-screen bg-[#060606] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link href="/" className="inline-flex items-center text-[#BCBCBC] hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao início
        </Link>
        
        <h1 className="text-4xl font-bold text-white mb-8 uppercase">Lei Geral de Proteção de Dados (LGPD)</h1>
        
        <div className="prose prose-invert max-w-none">
          <div className="space-y-6 text-[#BCBCBC] leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Compromisso com a LGPD</h2>
              <p>
                A Evolut IA está comprometida com o cumprimento integral da Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Esta página detalha como tratamos os dados pessoais em conformidade com a legislação brasileira.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Definições Importantes</h2>
              <div className="space-y-3">
                <p><strong>Dados Pessoais:</strong> Informações relacionadas a pessoa natural identificada ou identificável.</p>
                <p><strong>Dados Sensíveis:</strong> Dados sobre origem racial, convicções religiosas, opiniões políticas, dados genéticos, biométricos, relativos à saúde ou à vida sexual.</p>
                <p><strong>Titular:</strong> Pessoa natural a quem se referem os dados pessoais.</p>
                <p><strong>Controlador:</strong> A Evolut IA, responsável pelas decisões sobre o tratamento de dados pessoais.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Bases Legais para Tratamento</h2>
              <p>
                Tratamos dados pessoais com base nas seguintes hipóteses legais:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Consentimento do titular</li>
                <li>Execução de contrato ou procedimentos preliminares</li>
                <li>Cumprimento de obrigação legal</li>
                <li>Legítimo interesse</li>
                <li>Exercício regular de direitos em processo judicial</li>
                <li>Proteção da vida ou integridade física</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Direitos dos Titulares</h2>
              <p>
                Conforme previsto na LGPD, você possui os seguintes direitos:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Confirmação e acesso:</strong> Saber se tratamos seus dados e acessá-los</li>
                <li><strong>Correção:</strong> Solicitar a correção de dados incompletos ou inexatos</li>
                <li><strong>Anonimização ou eliminação:</strong> Requerer a anonimização ou eliminação de dados desnecessários</li>
                <li><strong>Portabilidade:</strong> Solicitar a portabilidade dos dados para outro fornecedor</li>
                <li><strong>Eliminação:</strong> Requerer a eliminação de dados tratados com consentimento</li>
                <li><strong>Informação:</strong> Obter informações sobre compartilhamento de dados</li>
                <li><strong>Revogação:</strong> Revogar o consentimento a qualquer momento</li>
                <li><strong>Revisão:</strong> Solicitar revisão de decisões automatizadas</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Tratamento de Dados Sensíveis</h2>
              <p>
                Não coletamos dados pessoais sensíveis de forma rotineira. Quando necessário, sempre solicitamos consentimento específico e implementamos medidas de segurança adicionais.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Medidas de Segurança</h2>
              <p>
                Implementamos medidas técnicas e administrativas para proteger os dados pessoais:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Criptografia de dados em trânsito e em repouso</li>
                <li>Controle de acesso baseado em funções</li>
                <li>Auditoria e monitoramento contínuo</li>
                <li>Treinamento regular de funcionários</li>
                <li>Avaliação de impacto à proteção de dados</li>
                <li>Plano de resposta a incidentes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Compartilhamento de Dados</h2>
              <p>
                Compartilhamos dados pessoais apenas quando:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Autorizado pelo titular</li>
                <li>Necessário para execução de contratos</li>
                <li>Exigido por lei ou ordem judicial</li>
                <li>Para proteção da vida ou integridade física</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Transferência Internacional</h2>
              <p>
                Quando necessário transferir dados para outros países, garantimos que o país de destino oferece grau de proteção adequado ou implementamos salvaguardas apropriadas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Incidentes de Segurança</h2>
              <p>
                Em caso de incidente que possa acarretar risco aos direitos e liberdades dos titulares, comunicaremos à ANPD e aos titulares afetados nos prazos legais estabelecidos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">10. Encarregado de Proteção de Dados (DPO)</h2>
              <p>
                Designamos um Encarregado de Proteção de Dados para atuar como canal de comunicação entre a empresa, titulares e a ANPD. Entre em contato através dos canais disponíveis em nosso site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">11. Como Exercer seus Direitos</h2>
              <p>
                Para exercer qualquer direito previsto na LGPD, entre em contato conosco através dos canais disponíveis. Responderemos em até 15 dias corridos, podendo ser prorrogado por mais 15 dias mediante justificativa.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">12. Alterações</h2>
              <p>
                Esta política pode ser atualizada para refletir mudanças em nossas práticas ou na legislação. Comunicaremos alterações significativas através de nossos canais oficiais.
              </p>
            </section>

            <div className="border-t border-gray-800 pt-6 mt-8">
              <p className="text-sm text-[#BCBCBC]">
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}