import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { getQueryFn, apiRequest, queryClient } from "@/lib/queryClient";
import { DiagnosticResponse } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, LogOut, Download, Eye } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

export default function AdminPage() {
  const { user, logoutMutation } = useAuth();
  const [selectedResponse, setSelectedResponse] = useState<DiagnosticResponse | null>(null);
  
  // Debug logs
  console.log('AdminPage - user:', user);
  console.log('AdminPage - user loading state:', user === undefined);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    source: "",
    dateFrom: "",
    dateTo: ""
  });

  const { data: responses, isLoading: responsesLoading, error: responsesError } = useQuery<DiagnosticResponse[]>({
    queryKey: ["/api/admin/responses"],
    queryFn: getQueryFn({ on401: "throw" }),
    enabled: !!user, // Só carrega se o usuário estiver autenticado
    retry: 2,
    retryDelay: 1000,
  });

  // Debug logs
  console.log('AdminPage - responses:', responses);
  console.log('AdminPage - responsesLoading:', responsesLoading);
  console.log('AdminPage - responsesError:', responsesError);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await apiRequest("PATCH", `/api/admin/responses/${id}/status`, { status });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/responses"] });
    }
  });

  const deleteResponseMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/admin/responses/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/responses"] });
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Atendido": return "bg-green-500 hover:bg-green-600";
      case "Visto": return "bg-yellow-500 hover:bg-yellow-600";
      case "Pendente": return "bg-red-500 hover:bg-red-600";
      default: return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const formatWhatsAppNumber = (phone: string) => {
    // Remove all non-numeric characters
    const cleanPhone = phone.replace(/\D/g, '');

    // If already starts with 55, use as is
    if (cleanPhone.startsWith('55')) {
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
      return areas.split(',').map(area => area.trim());
    }
    return [areas];
  };

  const exportToCSV = () => {
    if (!responses || responses.length === 0) return;

    const headers = [
      "Data", "Nome", "Email", "Telefone", "Empresa", "Cargo", "Faturamento", 
      "Colaboradores", "ERP", "Áreas com Gargalos", "Processo Demorado", "Oportunidades Perdidas"
    ];

    const csvContent = [
      headers.join(","),
      ...responses.map(response => [
        new Date(response.createdAt).toLocaleDateString("pt-BR"),
        `"${response.name}"`,
        `"${response.email}"`,
        `"${response.phone}"`,
        `"${response.company}"`,
        `"${response.position === 'Outro' ? response.customPosition : response.position}"`,
        `"${response.revenue}"`,
        `"${response.employees}"`,
        `"${response.erp}"`,
        `"${response.areas}"`,
        `"${response.timeConsumingProcess}"`,
        `"${response.lostOpportunities}"`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `diagnosticos_evolut_ia_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const filteredData = responses?.filter((response: any) => {
    const matchesSearch = !filters.search || 
      response.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      response.email.toLowerCase().includes(filters.search.toLowerCase()) ||
      response.company.toLowerCase().includes(filters.search.toLowerCase());

    const matchesStatus = !filters.status || response.status === filters.status;
    const matchesSource = !filters.source || response.source === filters.source;

    const matchesDateFrom = !filters.dateFrom || 
      new Date(response.createdAt) >= new Date(filters.dateFrom);
    const matchesDateTo = !filters.dateTo || 
      new Date(response.createdAt) <= new Date(filters.dateTo);

    return matchesSearch && matchesStatus && matchesSource && matchesDateFrom && matchesDateTo;
  }) || [];

  // Se não há usuário, mostrar loading
  if (!user) {
    return (
      <div className="min-h-screen bg-[#060606] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-white mx-auto mb-4" />
          <p className="text-white">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  if (responsesLoading) {
    return (
      <div className="min-h-screen bg-[#060606] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-white mx-auto mb-4" />
          <p className="text-white">Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (responsesError) {
    return (
      <div className="min-h-screen bg-[#060606] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Erro ao carregar dados: {responsesError.message}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-700"
          >
            Tentar Novamente
          </Button>
        </div>
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
              <h1 className="text-2xl font-bold text-white">Painel Administrativo</h1>
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
              <CardTitle className="text-white text-sm font-medium">Total de Respostas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{responses?.length || 0}</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm font-medium">Esta Semana</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {responses?.filter(r => {
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
              <CardTitle className="text-white text-sm font-medium">Hoje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {responses?.filter(r => {
                  if (!r.createdAt) return false;
                  const today = new Date();
                  const responseDate = new Date(r.createdAt);
                  return responseDate.toDateString() === today.toDateString();
                }).length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-gray-900 border-gray-800 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Input
                placeholder="Buscar por nome, email ou empresa"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem className="text-white" value="">Todos</SelectItem>
                  <SelectItem className="text-white" value="Pendente">Pendente</SelectItem>
                  <SelectItem className="text-white" value="Visto">Visto</SelectItem>
                  <SelectItem className="text-white" value="Atendido">Atendido</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filters.source} onValueChange={(value) => setFilters({...filters, source: value})}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Origem" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem className="text-white" value="">Todas</SelectItem>
                  <SelectItem className="text-white" value="página principal">Página Principal</SelectItem>
                  <SelectItem className="text-white" value="página de formulário">Página de Formulário</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="date"
                placeholder="Data inicial"
                value={filters.dateFrom}
                onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Input
                type="date"
                placeholder="Data final"
                value={filters.dateTo}
                onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Responses List */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Respostas do Diagnóstico</CardTitle>
            <CardDescription className="text-gray-400">
              Todas as respostas coletadas através do formulário de diagnóstico
            </CardDescription>
          </CardHeader>
          <CardContent>
            {responsesError ? (
              <div className="text-center py-8">
                <p className="text-red-400 mb-4">Erro ao carregar dados: {responsesError.message}</p>
                <Button 
                  onClick={() => window.location.reload()} 
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Tentar Novamente
                </Button>
              </div>
            ) : !filteredData || filteredData.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                {responses === undefined ? "Carregando respostas..." : "Nenhuma resposta encontrada"}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredData.map((response) => (
                  <motion.div
                    key={response.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800 p-4 rounded-lg border border-gray-700"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-white font-semibold">{response.name}</h3>
                        <p className="text-gray-400 text-sm">{response.company}</p>
                      </div>
                      <div className="text-right space-y-2">
                        <div>
                          <Badge variant="outline" className="block">
                            {response.createdAt ? 
                              new Date(response.createdAt).toLocaleDateString("pt-BR", {
                                timeZone: 'America/Sao_Paulo'
                              }) : "Data inválida"}
                          </Badge>
                        </div>
                        <div className="flex gap-2 items-center">
                          <Select
                            value={response.status || "Pendente"}
                            onValueChange={(status) => updateStatusMutation.mutate({ id: response.id, status })}
                          >
                            <SelectTrigger className={`w-24 h-7 text-xs text-white border-none ${getStatusColor(response.status || "Pendente")}`}>
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
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
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
                        <p className="text-white">{response.position === 'Outro' ? response.customPosition : response.position}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Faturamento:</span>
                        <p className="text-white">{response.revenue}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        variant={response.status === "Pendente" ? "default" : "outline"}
                        onClick={() => updateStatusMutation.mutate({ id: response.id, status: "Pendente" })}
                        className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                      >
                        Pendente
                      </Button>
                      <Button
                        size="sm"
                        variant={response.status === "Visto" ? "default" : "outline"}
                        onClick={() => updateStatusMutation.mutate({ id: response.id, status: "Visto" })}
                        className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                      >
                        Visto
                      </Button>
                      <Button
                        size="sm"
                        variant={response.status === "Atendido" ? "default" : "outline"}
                        onClick={() => updateStatusMutation.mutate({ id: response.id, status: "Atendido" })}
                        className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                      >
                        Atendido
                      </Button>
                      {user?.canDelete && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            if (confirm("Tem certeza que deseja excluir esta resposta?")) {
                              deleteResponseMutation.mutate(response.id);
                            }
                          }}
                          className="bg-red-700 border-red-600 text-white hover:bg-red-600"
                        >
                          Excluir
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Detailed View Modal */}
        {selectedResponse && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-800"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Detalhes da Resposta</h2>
                <div className="flex gap-2">
                  {selectedResponse.phone && (
                    <Button
                      onClick={() => window.open(formatWhatsAppNumber(selectedResponse.phone || ''), '_blank')}
                      className="bg-[#25D366] hover:bg-[#20B954] text-white"
                      size="sm"
                    >
                      <FaWhatsapp className="w-4 h-4 mr-2" />
                      Iniciar Conversa
                    </Button>
                  )}
                  <Button
                    onClick={() => setSelectedResponse(null)}
                    variant="outline"
                    size="sm"
                    className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                  >
                    Fechar
                  </Button>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400">Nome:</label>
                    <p className="text-white">{selectedResponse.name}</p>
                  </div>
                  <div>
                    <label className="text-gray-400">Email:</label>
                    <p className="text-white">{selectedResponse.email}</p>
                  </div>
                  <div>
                    <label className="text-gray-400">Telefone:</label>
                    <p className="text-white">{selectedResponse.phone}</p>
                  </div>
                  <div>
                    <label className="text-gray-400">Empresa:</label>
                    <p className="text-white">{selectedResponse.company}</p>
                  </div>
                  <div>
                    <label className="text-gray-400">Cargo:</label>
                    <p className="text-white">{selectedResponse.position === 'Outro' ? selectedResponse.customPosition : selectedResponse.position}</p>
                  </div>
                  <div>
                    <label className="text-gray-400">Faturamento:</label>
                    <p className="text-white">{selectedResponse.revenue}</p>
                  </div>
                  <div>
                    <label className="text-gray-400">Colaboradores:</label>
                    <p className="text-white">{selectedResponse.employees}</p>
                  </div>
                  <div>
                    <label className="text-gray-400">ERP:</label>
                    <p className="text-white">{selectedResponse.erp}</p>
                  </div>
                </div>

                <div>
                  <label className="text-gray-400">Áreas com Gargalos:</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formatAreasAsTags(selectedResponse.areas || '[]').map((area, index) => (
                      <Badge 
                        key={index}
                        className="bg-[#0066CC] hover:bg-[#0066CC] text-white text-xs px-2 py-1 cursor-default"
                      >
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-gray-400">Processo que Consome Tempo:</label>
                  <p className="text-white">{selectedResponse.timeConsumingProcess}</p>
                </div>

                <div>
                  <label className="text-gray-400">Onde Está Perdendo Dinheiro/Oportunidades:</label>
                  <p className="text-white">{selectedResponse.lostOpportunities}</p>
                </div>

                <div>
                  <label className="text-gray-400">Data de Submissão:</label>
                  <p className="text-white">
                    {selectedResponse.createdAt 
                      ? (() => {
                          try {
                            const date = new Date(selectedResponse.createdAt);
                            if (isNaN(date.getTime())) {
                              return "Data inválida";
                            }
                            return date.toLocaleString("pt-BR", {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                              timeZone: 'America/Sao_Paulo'
                            });
                          } catch (error) {
                            return "Data inválida";
                          }
                        })()
                      : "Data inválida"
                    }
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}