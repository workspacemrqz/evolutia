import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

// Declarações para pixels de conversão
declare global {
  interface Window {
    fbq: any;
    gtag: any;
    dataLayer: any[];
  }
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  customPosition: string;
  revenue: string;
  employees: string;
  erp: string;
  areas: string[];
  timeConsumingProcess: string;
  lostOpportunities: string;
  source: string;
}

function FormularioPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    customPosition: "",
    revenue: "",
    employees: "",
    erp: "",
    areas: [],
    timeConsumingProcess: "",
    lostOpportunities: "",
    source: "formulario"
  });

  const submitMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const submitData = {
        ...data,
        areas: JSON.stringify(data.areas)
      };
      const response = await apiRequest("POST", "/api/diagnostic", submitData);
      return response.json();
    },
    onSuccess: () => {
      alert('Diagnóstico enviado com sucesso! Redirecionando para agendamento...');
      setTimeout(() => {
        window.open('https://wa.me/12974041539', '_blank');
      }, 1500);
    },
    onError: () => {
      alert('Erro ao enviar diagnóstico. Tente novamente mais tarde.');
    }
  });

  const steps = [
    { title: "Diagnóstico gratuito", subtitle: "Você está a poucos passos de descobrir onde sua empresa pode ganhar tempo, reduzir custos e crescer de verdade usando Inteligência Artificial", buttonText: "Começar" },
    { title: "Qual seu nome?", buttonText: "OK" },
    { title: "Qual o seu melhor e-mail para contato?", buttonText: "OK" },
    { title: "Show. Poderia me informar seu telefone?", buttonText: "OK" },
    { title: "De qual empresa você fala?", buttonText: "OK" },
    { title: "Qual o seu cargo?", buttonText: "OK" },
    { title: "Qual o faturamento anual da empresa?", buttonText: "OK" },
    { title: "Quantos colaboradores trabalham hoje na empresa?", buttonText: "OK" },
    { title: "Qual ERP vocês utilizam?", buttonText: "OK" },
    { title: "Quais áreas da empresa enfrentam mais gargalos hoje?", subtitle: "Escolha quantos quiser", buttonText: "OK" },
    { title: "Existe algum processo que consome tempo demais da equipe? *Qual?", buttonText: "OK" },
    { title: "Onde você sente que está perdendo mais dinheiro ou oportunidade?", buttonText: "OK" },
    { title: "Nosso time vai analisar cada detalhe para montar seu diagnóstico completo", subtitle: "Clique no botão abaixo para agendar sua reunião estratégica e conhecer o resultado final deste processo", buttonText: "AGENDAR MINHA REUNIÃO" }
  ];

  const positionOptions = ["CEO / Founder", "Diretor(a) / Gerente", "Coordenador(a)", "Analista / Técnico", "Outro"];
  const revenueOptions = ["Até R$ 500 mil", "De R$ 500 mil a R$ 2 milhões", "De R$ 2 a R$ 10 milhões", "Acima de R$ 10 milhões"];
  const areaOptions = ["Atendimento", "Vendas / Comercial", "Financeiro", "RH", "Logística", "Operações", "Marketing", "Outro"];

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectPosition = (position: string) => {
    setFormData(prev => ({ ...prev, position }));
    if (position !== "Outro") {
      setFormData(prev => ({ ...prev, customPosition: "" }));
      setTimeout(goNext, 300);
    }
  };

  const selectRevenue = (revenue: string) => {
    setFormData(prev => ({ ...prev, revenue }));
    setTimeout(goNext, 300);
  };

  const toggleArea = (area: string) => {
    setFormData(prev => ({
      ...prev,
      areas: prev.areas.includes(area)
        ? prev.areas.filter(a => a !== area)
        : [...prev.areas, area]
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return true;
      case 1: return formData.name.trim() !== "";
      case 2: return formData.email.trim() !== "";
      case 3: return formData.phone.trim() !== "";
      case 4: return formData.company.trim() !== "";
      case 5: return formData.position !== "" && (formData.position !== "Outro" || formData.customPosition.trim() !== "");
      case 6: return formData.revenue !== "";
      case 7: return formData.employees.trim() !== "";
      case 8: return true;
      case 9: return formData.areas.length > 0;
      case 10: return true;
      case 11: return true;
      default: return true;
    }
  };

  const goNext = () => {
    if (!canProceed()) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Disparar eventos de conversão via Google Tag Manager
      if (typeof window.dataLayer !== 'undefined') {
        // Evento principal de conversão
        window.dataLayer.push({
          'event': 'form_conversion',
          'event_category': 'formulario',
          'event_action': 'agendamento_reuniao',
          'event_label': 'lead_gerado',
          'conversion_type': 'lead',
          'form_source': 'formulario_diagnostico',
          'pixel_id': '706592518905036'
        });
        
        // Evento específico para Facebook Pixel (Lead)
        window.dataLayer.push({
          'event': 'facebook_lead',
          'fb_event_type': 'Lead',
          'pixel_id': '706592518905036',
          'lead_source': 'formulario_diagnostico'
        });
        
        console.log('Eventos de conversão disparados via GTM: form_conversion e facebook_lead');
      }
      
      // Disparar evento Lead diretamente no Meta Pixel
      if (typeof window.fbq !== 'undefined') {
        window.fbq('track', 'Lead', {
          source: 'formulario_diagnostico',
          content_name: 'Diagnóstico Gratuito',
          value: 0,
          currency: 'BRL'
        });
        console.log('Evento Lead disparado diretamente via Meta Pixel');
      }
      
      submitMutation.mutate(formData);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return null;
      case 1:
        return (
          <input
            type="text"
            className="w-full p-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            placeholder="Digite seu nome"
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
            autoFocus
          />
        );
      case 2:
        return (
          <input
            type="email"
            className="w-full p-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            placeholder="Digite seu e-mail"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            autoFocus
          />
        );
      case 3:
        return (
          <input
            type="tel"
            className="w-full p-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            placeholder="Digite seu telefone"
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            autoFocus
          />
        );
      case 4:
        return (
          <input
            type="text"
            className="w-full p-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            placeholder="Nome da empresa"
            value={formData.company}
            onChange={(e) => updateFormData('company', e.target.value)}
            autoFocus
          />
        );
      case 5:
        return (
          <div className="space-y-3">
            {positionOptions.map((option) => (
              <button
                key={option}
                onClick={() => selectPosition(option)}
                className={`w-full p-4 text-left rounded-lg border transition-all ${
                  formData.position === option
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "bg-gray-800 border-gray-600 text-white hover:border-blue-500"
                }`}
              >
                {option}
              </button>
            ))}
            {formData.position === "Outro" && (
              <input
                type="text"
                className="w-full p-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none mt-4"
                placeholder="Especifique seu cargo"
                value={formData.customPosition}
                onChange={(e) => updateFormData('customPosition', e.target.value)}
                autoFocus
              />
            )}
          </div>
        );
      case 6:
        return (
          <div className="space-y-3">
            {revenueOptions.map((option) => (
              <button
                key={option}
                onClick={() => selectRevenue(option)}
                className={`w-full p-4 text-left rounded-lg border transition-all ${
                  formData.revenue === option
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "bg-gray-800 border-gray-600 text-white hover:border-blue-500"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        );
      case 7:
        return (
          <input
            type="number"
            className="w-full p-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            placeholder="Número de colaboradores"
            value={formData.employees}
            onChange={(e) => updateFormData('employees', e.target.value)}
            autoFocus
          />
        );
      case 8:
        return (
          <input
            type="text"
            className="w-full p-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            placeholder="Nome do ERP utilizado"
            value={formData.erp}
            onChange={(e) => updateFormData('erp', e.target.value)}
            autoFocus
          />
        );
      case 9:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {areaOptions.map((area) => (
              <button
                key={area}
                onClick={() => toggleArea(area)}
                className={`p-4 text-left rounded-lg border transition-all ${
                  formData.areas.includes(area)
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "bg-gray-800 border-gray-600 text-white hover:border-blue-500"
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        );
      case 10:
        return (
          <textarea
            className="w-full p-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none h-32 resize-none"
            placeholder="Descreva o processo que consome muito tempo"
            value={formData.timeConsumingProcess}
            onChange={(e) => updateFormData('timeConsumingProcess', e.target.value)}
            autoFocus
          />
        );
      case 11:
        return (
          <textarea
            className="w-full p-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none h-32 resize-none"
            placeholder="Onde você sente que está perdendo dinheiro ou oportunidades"
            value={formData.lostOpportunities}
            onChange={(e) => updateFormData('lostOpportunities', e.target.value)}
            autoFocus
          />
        );
      default:
        return null;
    }
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && canProceed()) {
        goNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, formData]);

  // O PageView já é disparado automaticamente pelo Meta Pixel no HTML

  return (
    <div className="min-h-screen bg-[#060606] text-white flex flex-col items-center justify-center p-5">
      <div className="mb-6 text-center">
        <img 
          src="https://i.ibb.co/rf3PXc8r/LOGO-Evolut-IA-com-texto-na-horizontal.png" 
          alt="Evolut IA Logo"
          className="h-auto w-auto max-w-[250px] max-h-[80px] object-contain mx-auto animate-float"
        />
      </div>

      <div className="max-w-[600px] w-full bg-gradient-to-br from-[#060606] to-[#0D0D0D] border border-gray-700 rounded-3xl p-10 shadow-2xl">
        <div className="text-center text-gray-400 text-sm mb-5">
          {currentStep + 1} de {steps.length}
        </div>

        <div className="bg-gray-700 rounded-xl h-2 mb-8 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#1A3B93] to-[#3064EF] h-full rounded-xl transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            {steps[currentStep].title}
          </h2>
          {steps[currentStep].subtitle && (
            <p className="text-gray-400 text-base">
              {steps[currentStep].subtitle}
            </p>
          )}
        </div>

        <div className="mb-8">
          {renderStepContent()}
        </div>

        <div className="flex justify-between items-center">
          {currentStep > 0 && (
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer text-base"
            >
              ← Voltar
            </button>
          )}

          <button
            onClick={goNext}
            disabled={!canProceed() || submitMutation.isPending}
            className={`px-8 py-4 rounded-lg font-semibold transition-all text-base ml-auto ${
              canProceed() && !submitMutation.isPending
                ? "bg-gradient-to-r from-[#1A3B93] to-[#3064EF] text-white hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            {submitMutation.isPending ? "Enviando..." : steps[currentStep].buttonText}
          </button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="bg-gradient-to-r from-[#1A3B93] to-[#3064EF] text-white px-5 py-3 rounded-lg text-base font-semibold shadow-lg shadow-blue-500/20 inline-flex items-center gap-2">
          <div className="clock-animation">
            <div className="clock-face">
              <div className="clock-hand hour-hand"></div>
              <div className="clock-hand minute-hand"></div>
            </div>
          </div>
          Só Hoje {getCurrentDate()} Diagnóstico Gratuito com Vagas Limitadas
        </div>
      </div>
    </div>
  );
}

export default FormularioPage;