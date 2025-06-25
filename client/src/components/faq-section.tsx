import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQSection() {
  const faqs = [
    {
      question: "Quanto tempo leva para implementar os agentes?",
      answer: "O processo de implementação leva em média 30 dias, incluindo análise, desenvolvimento personalizado, testes e treinamento da equipe. Projetos mais complexos podem levar até 60 dias"
    },
    {
      question: "Os agentes funcionam com nossos sistemas atuais?",
      answer: "Sim! Nossos agentes são desenvolvidos para se integrar perfeitamente com os sistemas que você já utiliza. Suportamos mais de 100 plataformas diferentes, incluindo CRMs, ERPs, e-mail, mensageria e muito mais"
    },
    {
      question: "Qual é o custo dos agentes?",
      answer: "O investimento varia de acordo com a complexidade e quantidade de agentes necessários. Oferecemos planos desde R$ 2.997/mês para empresas pequenas até soluções enterprise customizadas. Agende uma consultoria gratuita para receber um orçamento personalizado"
    },
    {
      question: "Como funciona o suporte técnico?",
      answer: "Oferecemos suporte 24/7 através de chat, e-mail e telefone. Cada cliente tem um gerente de conta dedicado e acesso a nossa equipe técnica especializada. Também fornecemos treinamento contínuo e atualizações regulares"
    },
    {
      question: "Os dados da minha empresa ficam seguros?",
      answer: "Absoluta segurança é nossa prioridade. Utilizamos criptografia end-to-end, servidores em nuvem certificados (AWS/Azure), e seguimos rigorosamente as normas LGPD, GDPR e SOC 2. Seus dados nunca são compartilhados com terceiros"
    },
    {
      question: "Posso cancelar a qualquer momento?",
      answer: "Sim, não temos fidelidade obrigatória. Você pode cancelar sua assinatura a qualquer momento com 30 dias de antecedência. Além disso, oferecemos 60 dias de garantia total - se não estiver satisfeito, devolvemos 100% do investimento"
    }
  ];

  return (
    <section id="faq" className="py-20 bg-[#060606]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-[#BCBCBC]">
            Esclarecemos as principais dúvidas sobre nossos agentes de IA e como eles podem transformar sua empresa
          </p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-[#0D0D0D] rounded-lg border-none">
              <AccordionTrigger className="px-6 py-4 text-left text-lg font-semibold text-white hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-[#BCBCBC]">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="text-center mt-12">
          <button className="gradient-bg text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105">
            Tirar Outras Dúvidas
          </button>
        </div>
      </div>
    </section>
  );
}
