import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

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

export default function DiagnosticForm({ onClose }: { onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
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
    source: window.location.pathname === "/" ? "página principal" : window.location.pathname === "/formulario" ? "página de formulário" : "não informado",
  });

  const submitMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const submitData = {
        ...data,
        areas: JSON.stringify(data.areas)
      };
      console.log("Enviando dados do formulário:", submitData);
      console.log("Origem detectada:", data.source);
      const response = await apiRequest("POST", "/api/diagnostic", submitData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Diagnóstico enviado com sucesso!",
        description: "Redirecionando para agendamento...",
      });
      setTimeout(() => {
        window.open("https://wa.me/12974041539", "_blank");
        onClose();
      }, 1500);
    },
    onError: () => {
      toast({
        title: "Erro ao enviar diagnóstico",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  });

  // Auto-save partial form data
  const autoSaveMutation = useMutation({
    mutationFn: async (data: Partial<FormData>) => {
      const submitData = {
        ...data,
        areas: data.areas ? JSON.stringify(data.areas) : "[]"
      };
      const response = await apiRequest("POST", "/api/diagnostic", submitData);
      return response.json();
    },
    onError: () => {
      // Silent error for auto-save
    }
  });

  const steps = [
    {
      title: "Diagnóstico gratuito",
      subtitle: "Você está a poucos passos de descobrir onde sua empresa pode ganhar tempo, reduzir custos e crescer de verdade usando Inteligência Artificial",
      buttonText: "Começar"
    },
    {
      title: "Qual seu nome?",
      buttonText: "OK"
    },
    {
      title: "Qual o seu melhor e-mail para contato?",
      buttonText: "OK"
    },
    {
      title: "Show. Poderia me informar seu telefone?",
      buttonText: "OK"
    },
    {
      title: "De qual empresa você fala?",
      buttonText: "OK"
    },
    {
      title: "Qual o seu cargo?",
      buttonText: "OK"
    },
    {
      title: "Qual o faturamento anual da empresa?",
      buttonText: "OK"
    },
    {
      title: "Quantos colaboradores trabalham hoje na empresa?",
      buttonText: "OK"
    },
    {
      title: "Qual ERP vocês utilizam?",
      buttonText: "OK"
    },
    {
      title: "Quais áreas da empresa enfrentam mais gargalos hoje?",
      subtitle: "Escolha quantos quiser",
      buttonText: "OK"
    },
    {
      title: "Existe algum processo que consome tempo demais da equipe? *Qual?",
      buttonText: "OK"
    },
    {
      title: "Onde você sente que está perdendo mais dinheiro ou oportunidade?",
      buttonText: "OK"
    },
    {
      title: "Nosso time vai analisar cada detalhe para montar seu diagnóstico completo",
      subtitle: "Clique no botão abaixo para agendar sua reunião estratégica e conhecer o resultado final deste processo",
      buttonText: "AGENDAR MINHA REUNIÃO"
    }
  ];

  const positionOptions = [
    "CEO / Founder",
    "Diretor(a) / Gerente",
    "Coordenador(a)",
    "Analista / Técnico",
    "Outro"
  ];

  const revenueOptions = [
    "Até R$ 500 mil",
    "De R$ 500 mil a R$ 2 milhões",
    "De R$ 2 a R$ 10 milhões",
    "Acima de R$ 10 milhões"
  ];

  const areaOptions = [
    "Atendimento",
    "Vendas / Comercial",
    "Financeiro",
    "RH",
    "Logística",
    "Operações",
    "Marketing",
    "Outro"
  ];

  const handleNext = () => {
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
          'form_source': 'modal_diagnostico',
          'pixel_id': '706592518905036'
        });
        
        // Evento específico para Facebook Pixel (Lead)
        window.dataLayer.push({
          'event': 'facebook_lead',
          'fb_event_type': 'Lead',
          'pixel_id': '706592518905036',
          'lead_source': 'modal_diagnostico'
        });
        
        console.log('Eventos de conversão disparados via GTM: form_conversion e facebook_lead');
      }
      
      // Handle final submission
      submitMutation.mutate(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    // Auto-save partial data when user closes form
    if (currentStep > 0) {
      const partialData = { ...formData };
      // Only save if we have at least name or email
      if (partialData.name || partialData.email) {
        autoSaveMutation.mutate(partialData);
      }
    }
    onClose();
  };

  const handleAreaToggle = (area: string) => {
    setFormData(prev => ({
      ...prev,
      areas: prev.areas.includes(area)
        ? prev.areas.filter(a => a !== area)
        : [...prev.areas, area]
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return null;
      case 1:
        return (
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            placeholder="Digite seu nome"
            autoFocus
          />
        );
      case 2:
        return (
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full p-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            placeholder="Digite seu e-mail"
            autoFocus
          />
        );
      case 3:
        return (
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full p-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            placeholder="Digite seu telefone"
            autoFocus
          />
        );
      case 4:
        return (
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
            className="w-full p-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            placeholder="Nome da empresa"
            autoFocus
          />
        );
      case 5:
        return (
          <div className="space-y-4">
            {positionOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setFormData(prev => ({ ...prev, position: option }));
                  if (option !== "Outro") {
                    setTimeout(handleNext, 300);
                  }
                }}
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
                value={formData.customPosition}
                onChange={(e) => setFormData(prev => ({ ...prev, customPosition: e.target.value }))}
                className="w-full p-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none mt-4"
                placeholder="Especifique seu cargo"
                autoFocus
              />
            )}
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            {revenueOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setFormData(prev => ({ ...prev, revenue: option }));
                  setTimeout(handleNext, 300);
                }}
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
            value={formData.employees}
            onChange={(e) => setFormData(prev => ({ ...prev, employees: e.target.value }))}
            className="w-full p-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            placeholder="Número de colaboradores"
            autoFocus
          />
        );
      case 8:
        return (
          <input
            type="text"
            value={formData.erp}
            onChange={(e) => setFormData(prev => ({ ...prev, erp: e.target.value }))}
            className="w-full p-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            placeholder="Nome do ERP utilizado"
            autoFocus
          />
        );
      case 9:
        return (
          <div className="grid grid-cols-2 gap-4">
            {areaOptions.map((area) => (
              <button
                key={area}
                onClick={() => handleAreaToggle(area)}
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
            value={formData.timeConsumingProcess}
            onChange={(e) => setFormData(prev => ({ ...prev, timeConsumingProcess: e.target.value }))}
            className="w-full p-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none h-32 resize-none"
            placeholder="Descreva o processo que consome muito tempo"
            autoFocus
          />
        );
      case 11:
        return (
          <textarea
            value={formData.lostOpportunities}
            onChange={(e) => setFormData(prev => ({ ...prev, lostOpportunities: e.target.value }))}
            className="w-full p-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none h-32 resize-none"
            placeholder="Onde você sente que está perdendo dinheiro ou oportunidades"
            autoFocus
          />
        );
      default:
        return null;
    }
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
      case 8: return true; // ERP is optional
      case 9: return formData.areas.length > 0;
      case 10: return true; // Time consuming process is optional
      case 11: return true; // Lost opportunities is optional
      default: return true;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#060606] rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-800"
      >
        <div className="flex justify-between items-center mb-8">
          <div className="text-sm text-gray-400">
            {currentStep + 1} de {steps.length}
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            {steps[currentStep].title}
          </h2>
          {steps[currentStep].subtitle && (
            <p className="text-gray-400">
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
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={!canProceed() || submitMutation.isPending}
            className={`ml-auto px-8 py-3 rounded-lg font-semibold transition-all ${
              canProceed() && !submitMutation.isPending
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            {submitMutation.isPending ? "Enviando..." : steps[currentStep].buttonText}
          </button>
        </div>

        <div className="mt-6 bg-gray-800 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </motion.div>
    </div>
  );
}