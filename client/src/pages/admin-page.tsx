import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { getQueryFn, apiRequest, queryClient } from "@/lib/queryClient";
import { DiagnosticResponse } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, LogOut, Download, Eye, Trash2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function AdminPage() {
  const { user, logoutMutation } = useAuth();
  const [selectedResponse, setSelectedResponse] =
    useState<DiagnosticResponse | null>(null);
  

  const { data: responses, isLoading } = useQuery<DiagnosticResponse[]>({
    queryKey: ["/api/admin/responses"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await apiRequest(
        "PATCH",
        `/api/admin/responses/${id}/status`,
        { status },
      );
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/responses"] });
    },
  });

  const deleteResponseMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/admin/responses/${id}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete response");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/responses"] });
      setSelectedResponse(null);
    },
    onError: (error: Error) => {
      console.error("Delete error:", error.message);
      alert(error.message);
    },
  });

  

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Atendido":
        return "bg-green-500 hover:bg-green-600";
      case "Visto":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "Pendente":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const formatWhatsAppNumber = (phone: string) => {
    // Remove all non-numeric characters
    const cleanPhone = phone.replace(/\D/g, "");

    // If already starts with 55, use as is
    if (cleanPhone.startsWith("55")) {
      return `https://wa.me/${cleanPhone}`;
    }

    // If doesn't start with 55, add it
    return `https://wa.me/55${cleanPhone}`;
  };

  const formatAreasAsTags = (areas: string) => {
    try {
      const parsedAreas = JSON.parse(areas);
      if (Array.isArray(parsedAreas)) {
        return parsedAreas;
      }
    } catch (e) {
      // If parsing fails, try to split by comma
      return areas.split(",").map((area) => area.trim());
    }
    return [areas];
  };

  

  const exportToCSV = () => {
    if (!responses || responses.length === 0) return;

    const headers = [
      "Data",
      "Nome",
      "Email",
      "Telefone",
      "Empresa",
      "Cargo",
      "Faturamento",
      "Colaboradores",
      "ERP",
      "Áreas com Gargalos",
      "Processo Demorado",
      "Oportunidades Perdidas",
      "Origem",
    ];

    const csvContent = [
      headers.join(","),
      ...responses.map((response) =>
        [
          new Date(response.createdAt).toLocaleDateString("pt-BR"),
          `"${response.name}"`,
          `"${response.email}"`,
          `"${response.phone}"`,
          `"${response.company}"`,
          `"${response.position === "Outro" ? response.customPosition : response.position}"`,
          `"${response.revenue}"`,
          `"${response.employees}"`,
          `"${response.erp}"`,
          `"${response.areas}"`,
          `"${response.timeConsumingProcess}"`,
          `"${response.lostOpportunities}"`,
          `"${response.source === "formulario" ? "Página Formulário" : response.source === "homepage" ? "Página Principal" : response.source || "Não informado"}"`,
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `diagnosticos_evolut_ia_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#060606] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060606] p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <img
              src="https://i.ibb.co/rf3PXc8r/LOGO-Evolut-IA-com-texto-na-horizontal.png"
              alt="Evolut IA"
              className="h-8 w-auto"
            />
            <div>
              <h1 className="text-2xl font-bold text-white">
                Painel Administrativo
              </h1>
              <p className="text-gray-400">Bem-vindo, {user?.username}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={exportToCSV}
              variant="outline"
              className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
              disabled={!responses || responses.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar CSV
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm font-medium">
                Total de Respostas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {responses?.length || 0}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm font-medium">
                Esta Semana
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {responses?.filter((r) => {
                  if (!r.createdAt) return false;
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return new Date(r.createdAt) > weekAgo;
                }).length || 0}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm font-medium">
                Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {responses?.filter((r) => {
                  if (!r.createdAt) return false;
                  const today = new Date();
                  const responseDate = new Date(r.createdAt);
                  return responseDate.toDateString() === today.toDateString();
                }).length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="w-full">

          <Card className="bg-gray-900 border-gray-800 mt-6">
            <CardHeader>
              <CardTitle className="text-white">
                Respostas do Diagnóstico
              </CardTitle>
              <CardDescription className="text-gray-400">
                Todas as respostas coletadas através do formulário de diagnóstico
              </CardDescription>
            </CardHeader>
              <CardContent>
                {!responses || responses.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    Nenhuma resposta encontrada
                  </div>
                ) : (
                  <div className="space-y-4">
                    {responses.map((response) => (
                      <motion.div
                        key={response.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-800 p-4 rounded-lg border border-gray-700"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-white font-semibold">
                              {response.name}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              {response.company}
                            </p>
                          </div>
                          <div className="text-right space-y-2">
                            <div>
                              <Badge variant="outline" className="block">
                                {response.createdAt
                                  ? new Date(response.createdAt).toLocaleDateString(
                                      "pt-BR",
                                      {
                                        timeZone: "America/Sao_Paulo",
                                      },
                                    )
                                  : "Data inválida"}
                              </Badge>
                            </div>
                            <div className="flex gap-2 items-center">
                              <Select
                                value={response.status || "Pendente"}
                                onValueChange={(status) =>
                                  updateStatusMutation.mutate({
                                    id: response.id,
                                    status,
                                  })
                                }
                              >
                                <SelectTrigger
                                  className={`w-24 h-7 text-xs text-white border-none ${getStatusColor(response.status || "Pendente")}`}
                                >
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Pendente">Pendente</SelectItem>
                                  <SelectItem value="Visto">Visto</SelectItem>
                                  <SelectItem value="Atendido">Atendido</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedResponse(response)}
                                className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                Ver Detalhes
                              </Button>
                              {user?.canDelete && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    if (window.confirm("Tem certeza que deseja excluir esta resposta? Esta ação não pode ser desfeita.")) {
                                      deleteResponseMutation.mutate(response.id);
                                    }
                                  }}
                                  className="bg-red-600 border-red-500 text-white hover:bg-red-700"
                                  disabled={deleteResponseMutation.isPending}
                                >
                                  <Trash2 className="w-4 h-4 mr-1" />
                                  Excluir
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                          <div>
                            <span className="text-gray-400">Email:</span>
                            <p className="text-white">{response.email}</p>
                          </div>
                          <div>
                            <span className="text-gray-400">Telefone:</span>
                            <p className="text-white">{response.phone}</p>
                          </div>
                          <div>
                            <span className="text-gray-400">Cargo:</span>
                            <p className="text-white">
                              {response.position === "Outro"
                                ? response.customPosition
                                : response.position}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-400">Faturamento:</span>
                            <p className="text-white">{response.revenue}</p>
                          </div>
                          <div>
                            <span className="text-gray-400">Origem:</span>
                             <p className="text-white">
                              {response.source === "página principal" 
                              ? "Página Principal" 
                              : response.source === "página de formulário" 
                              ? "Página Formulário" 
                              : response.source || "Não informado"}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
          </Card>
        </div>

        {/* Detailed View Modal */}
        {selectedResponse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-800">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold text-white">
                  Detalhes da Resposta
                </h2>
                <Button
                  onClick={() => setSelectedResponse(null)}
                  variant="outline"
                  size="sm"
                  className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm font-medium">
                      Nome
                    </label>
                    <p className="text-white">{selectedResponse.name}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm font-medium">
                      Email
                    </label>
                    <p className="text-white">{selectedResponse.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm font-medium">
                      Telefone
                    </label>
                    <div className="flex items-center gap-2">
                      <p className="text-white">{selectedResponse.phone}</p>
                      <a
                        href={formatWhatsAppNumber(selectedResponse.phone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-500 hover:text-green-400"
                      >
                        <FaWhatsapp className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm font-medium">
                      Empresa
                    </label>
                    <p className="text-white">{selectedResponse.company}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm font-medium">
                      Cargo
                    </label>
                    <p className="text-white">
                      {selectedResponse.position === "Outro"
                        ? selectedResponse.customPosition
                        : selectedResponse.position}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm font-medium">
                      Faturamento
                    </label>
                    <p className="text-white">{selectedResponse.revenue}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm font-medium">
                      Número de Colaboradores
                    </label>
                    <p className="text-white">{selectedResponse.employees}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm font-medium">
                      ERP Atual
                    </label>
                    <p className="text-white">{selectedResponse.erp}</p>
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 text-sm font-medium">
                    Áreas com Gargalos
                  </label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {formatAreasAsTags(selectedResponse.areas).map(
                      (area, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-blue-900 text-blue-200 border-blue-700"
                        >
                          {area}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 text-sm font-medium">
                    Processo Mais Demorado
                  </label>
                  <p className="text-white bg-gray-800 p-3 rounded border border-gray-700">
                    {selectedResponse.timeConsumingProcess}
                  </p>
                </div>

                <div>
                  <label className="text-gray-400 text-sm font-medium">
                    Oportunidades Perdidas
                  </label>
                  <p className="text-white bg-gray-800 p-3 rounded border border-gray-700">
                    {selectedResponse.lostOpportunities}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm font-medium">
                      Data de Submissão
                    </label>
                    <p className="text-white">
                      {selectedResponse.createdAt
                        ? new Date(selectedResponse.createdAt).toLocaleString(
                            "pt-BR",
                            {
                              timeZone: "America/Sao_Paulo",
                            },
                          )
                        : "Data inválida"}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm font-medium">
                      Origem
                    </label>
                    <p className="text-white">
                      {selectedResponse.source === "página principal" 
                      ? "Página Principal" 
                      : selectedResponse.source === "página de formulário" 
                      ? "Página Formulário" 
                      : selectedResponse.source || "Não informado"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

    
}