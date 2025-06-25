import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-[#060606] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link href="/" className="inline-flex items-center text-[#BCBCBC] hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao início
        </Link>
        
        <h1 className="text-4xl font-bold text-white mb-8 uppercase">Termos de Uso</h1>
        
        <div className="prose prose-invert max-w-none">
          <div className="space-y-6 text-[#BCBCBC] leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Aceitação dos Termos</h2>
              <p>
                Ao acessar e usar os serviços da Evolut IA, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes termos, não poderá acessar o serviço.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Descrição do Serviço</h2>
              <p>
                A Evolut IA oferece soluções de inteligência artificial personalizadas para empresas, incluindo agentes de IA, automação de processos e análise de dados. Nossos serviços são fornecidos através de plataforma digital e consultoria especializada.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Registro e Conta</h2>
              <p>
                Para acessar certas funcionalidades do serviço, você deve criar uma conta fornecendo informações precisas, atuais e completas. Você é responsável por manter a confidencialidade de sua conta e senha.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Uso Aceitável</h2>
              <p>
                Você concorda em usar nossos serviços apenas para fins legais e de acordo com todos os regulamentos aplicáveis. É proibido usar nossos serviços para:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Atividades ilegais ou fraudulentas</li>
                <li>Violação de direitos de propriedade intelectual</li>
                <li>Distribuição de malware ou conteúdo prejudicial</li>
                <li>Spam ou comunicações não solicitadas</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo, tecnologia e materiais fornecidos através de nossos serviços são protegidos por direitos autorais, marcas registradas e outras leis de propriedade intelectual. Você não pode copiar, modificar ou distribuir nosso conteúdo sem autorização expressa.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Pagamentos e Reembolsos</h2>
              <p>
                Os preços dos serviços estão sujeitos a alterações. Oferecemos garantia de 60 dias para novos clientes. Cancelamentos devem ser solicitados com 30 dias de antecedência.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Limitação de Responsabilidade</h2>
              <p>
                A Evolut IA não será responsável por danos indiretos, incidentais, especiais ou consequenciais decorrentes do uso ou incapacidade de usar nossos serviços.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Modificações</h2>
              <p>
                Reservamos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação em nosso site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Contato</h2>
              <p>
                Para questões sobre estes termos, entre em contato conosco através dos canais disponíveis em nosso site.
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