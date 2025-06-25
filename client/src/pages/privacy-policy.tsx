import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#060606] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link href="/" className="inline-flex items-center text-[#BCBCBC] hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao início
        </Link>
        
        <h1 className="text-4xl font-bold text-white mb-8 uppercase">Política de Privacidade</h1>
        
        <div className="prose prose-invert max-w-none">
          <div className="space-y-6 text-[#BCBCBC] leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Informações que Coletamos</h2>
              <p>
                Coletamos informações que você nos fornece diretamente, como quando você cria uma conta, entra em contato conosco ou usa nossos serviços. Isso pode incluir:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Nome, e-mail, telefone e informações de contato</li>
                <li>Informações da empresa e cargo</li>
                <li>Dados de uso e interação com nossos serviços</li>
                <li>Informações de pagamento (processadas por terceiros seguros)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Como Usamos suas Informações</h2>
              <p>
                Utilizamos as informações coletadas para:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Fornecer, manter e melhorar nossos serviços</li>
                <li>Processar transações e enviar confirmações</li>
                <li>Enviar comunicações relacionadas aos serviços</li>
                <li>Responder a suas solicitações e fornecer suporte</li>
                <li>Personalizar sua experiência</li>
                <li>Cumprir obrigações legais</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Compartilhamento de Informações</h2>
              <p>
                Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Com seu consentimento explícito</li>
                <li>Para cumprir obrigações legais</li>
                <li>Com provedores de serviços que nos ajudam a operar</li>
                <li>Em caso de fusão, aquisição ou venda de ativos</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Segurança dos Dados</h2>
              <p>
                Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição. Utilizamos:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Criptografia end-to-end para dados sensíveis</li>
                <li>Servidores seguros em nuvem certificados</li>
                <li>Controles de acesso rigorosos</li>
                <li>Monitoramento contínuo de segurança</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Retenção de Dados</h2>
              <p>
                Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos descritos nesta política, a menos que um período de retenção mais longo seja exigido ou permitido por lei.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Seus Direitos</h2>
              <p>
                Você tem o direito de:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Acessar suas informações pessoais</li>
                <li>Corrigir informações imprecisas</li>
                <li>Solicitar a exclusão de seus dados</li>
                <li>Revogar consentimento</li>
                <li>Portabilidade dos dados</li>
                <li>Apresentar reclamações à autoridade competente</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Cookies e Tecnologias Similares</h2>
              <p>
                Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o uso do site e personalizar conteúdo. Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Alterações nesta Política</h2>
              <p>
                Podemos atualizar esta política de privacidade periodicamente. Notificaremos sobre mudanças significativas por e-mail ou através de nosso site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Contato</h2>
              <p>
                Para questões sobre esta política de privacidade ou para exercer seus direitos, entre em contato conosco através dos canais disponíveis em nosso site.
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