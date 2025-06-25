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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, LogOut, Download, Eye, Trash2, Search, Filter, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

export default function AdminPage() {
  const { user, logoutMutation } = useAuth();
  const [selectedResponse, setSelectedResponse] =
    useState<DiagnosticResponse | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    source: "",
    dateFrom: "",
    dateTo: "",
    revenue: "",
    employees: "",
    position: "",
  });

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

  const clearFilters = () => {
    setFilters({
      search: "",
      status: "",
      source: "",
      dateFrom: "",
      dateTo: "",
      revenue: "",
      employees: "",
      position: "",
    });
  };

  const updateFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Apply filters to responses
  const filteredResponses = responses?.filter((response) => {
    // Search filter (nome, email, empresa)
    const searchMatch = !filters.search || 
      response.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      response.email.toLowerCase().includes(filters.search.toLowerCase()) ||
      response.company.toLowerCase().includes(filters.search.toLowerCase());

    // Status filter
    const statusMatch = !filters.status || response.status === filters.status;

    // Source filter
    const sourceMatch = !filters.source || 
      (filters.source === "página principal" && (response.source === "página principal" || response.source === "homepage")) ||
      (filters.source === "página de formulário" && (response.source === "página de formulário" || response.source === "formulario")) ||
      (filters.source === "não informado" && (!response.source || response.source === "não informado"));

    // Date filters
    const dateFromMatch = !filters.dateFrom || 
      new Date(response.createdAt) >= new Date(filters.dateFrom);
    const dateToMatch = !filters.dateTo || 
      new Date(response.createdAt) <= new Date(filters.dateTo + "T23:59:59");

    // Revenue filter
    const revenueMatch = !filters.revenue || response.revenue === filters.revenue;

    // Employees filter
    const employeesMatch = !filters.employees || response.employees === filters.employees;

    // Position filter
    const positionMatch = !filters.position || 
      response.position === filters.position ||
      (response.position === "Outro" && response.customPosition?.toLowerCase().includes(filters.position.toLowerCase()));

    return searchMatch && statusMatch && sourceMatch && dateFromMatch && dateToMatch && revenueMatch && employeesMatch && positionMatch;
  }) || [];

  const exportToCSV = () => {
    const dataToExport = filteredResponses.length > 0 ? filteredResponses : responses;
    if (!dataToExport || dataToExport.length === 0) return;

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
      ...dataToExport.map((response) =>
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
    link.download = `diagnosticos_evolut_ia_${filteredResponses.length > 0 ? 'filtrados_' : ''}${new Date().toISOString().split("T")[0]}.csv`;
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                Filtradas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">
                {filteredResponses.length}
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

        {/* Filters Section */}
        <Card className="bg-gray-900 border-gray-800 mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-white flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filtros Inteligentes
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Filtre as respostas por qualquer critério
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    console.log('Toggle filters clicked. Current state:', showFilters);
                    setShowFilters(!showFilters);
                  }}
                  variant="outline"
                  className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {showFilters ? 'Ocultar' : 'Mostrar'} Filtros
                </Button>
                {(Object.values(filters).some(v => v !== "") || filteredResponses.length !== responses?.length) && (
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    className="bg-red-600 border-red-500 text-white hover:bg-red-700"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Limpar Filtros
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          {showFilters && (
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search Filter */}
                <div className="space-y-2">
                  <Label className="text-white text-sm">Buscar</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Nome, email ou empresa..."
                      value={filters.search}
                      onChange={(e) => updateFilter('search', e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>

                {/* Status Filter */}
                <div className="space-y-2">
                  <Label className="text-white text-sm">Status</Label>
                  <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Todos os status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos os status</SelectItem>
                      <SelectItem value="Pendente">Pendente</SelectItem>
                      <SelectItem value="Visto">Visto</SelectItem>
                      <SelectItem value="Atendido">Atendido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Source Filter */}
                <div className="space-y-2">
                  <Label className="text-white text-sm">Origem</Label>
                  <Select value={filters.source} onValueChange={(value) => updateFilter('source', value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Todas as origens" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todas as origens</SelectItem>
                      <SelectItem value="página principal">Página Principal</SelectItem>
                      <SelectItem value="página de formulário">Página Formulário</SelectItem>
                      <SelectItem value="não informado">Não informado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Revenue Filter */}
                <div className="space-y-2">
                  <Label className="text-white text-sm">Faturamento</Label>
                  <Select value={filters.revenue} onValueChange={(value) => updateFilter('revenue', value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Todos os faturamentos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos os faturamentos</SelectItem>
                      <SelectItem value="Até R$ 500 mil">Até R$ 500 mil</SelectItem>
                      <SelectItem value="De R$ 500 mil a R$ 2 milhões">De R$ 500 mil a R$ 2 milhões</SelectItem>
                      <SelectItem value="De R$ 2 a R$ 10 milhões">De R$ 2 a R$ 10 milhões</SelectItem>
                      <SelectItem value="Acima de R$ 10 milhões">Acima de R$ 10 milhões</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Employees Filter */}
                <div className="space-y-2">
                  <Label className="text-white text-sm">Colaboradores</Label>
                  <Select value={filters.employees} onValueChange={(value) => updateFilter('employees', value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Todos os tamanhos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos os tamanhos</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2-10">2-10</SelectItem>
                      <SelectItem value="11-50">11-50</SelectItem>
                      <SelectItem value="51-200">51-200</SelectItem>
                      <SelectItem value="201-500">201-500</SelectItem>
                      <SelectItem value="500+">500+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Position Filter */}
                <div className="space-y-2">
                  <Label className="text-white text-sm">Cargo</Label>
                  <Select value={filters.position} onValueChange={(value) => updateFilter('position', value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Todos os cargos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos os cargos</SelectItem>
                      <SelectItem value="CEO / Founder">CEO / Founder</SelectItem>
                      <SelectItem value="Diretor(a) / Gerente">Diretor(a) / Gerente</SelectItem>
                      <SelectItem value="Coordenador(a)">Coordenador(a)</SelectItem>
                      <SelectItem value="Analista / Técnico">Analista / Técnico</SelectItem>
                      <SelectItem value="Outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Date From Filter */}
                <div className="space-y-2">
                  <Label className="text-white text-sm">Data Inicial</Label>
                  <Input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => updateFilter('dateFrom', e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                {/* Date To Filter */}
                <div className="space-y-2">
                  <Label className="text-white text-sm">Data Final</Label>
                  <Input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => updateFilter('dateTo', e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Responses List */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">
              Respostas do Diagnóstico
              {filteredResponses.length !== responses?.length && (
                <span className="text-blue-400 text-sm ml-2">
                  ({filteredResponses.length} de {responses?.length || 0})
                </span>
              )}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {filteredResponses.length !== responses?.length 
                ? "Respostas filtradas conforme critérios selecionados" 
                : "Todas as respostas coletadas através do formulário de diagnóstico"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!responses || responses.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                Nenhuma resposta encontrada
              </div>
            ) : filteredResponses.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Filter className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                <p className="text-lg mb-2">Nenhuma resposta encontrada com os filtros aplicados</p>
                <p className="text-sm">Tente ajustar os critérios de filtro ou limpar os filtros</p>
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="mt-4 bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                >
                  <X className="w-4 h-4 mr-2" />
                  Limpar Filtros
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredResponses.map((response) => (
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

        {/* Detailed View Modal */}
        {selectedResponse && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-800"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">
                  Detalhes da Resposta
                </h2>
                <div className="flex gap-2">
                  {selectedResponse.phone && (
                    <Button
                      onClick={() =>
                        window.open(
                          formatWhatsAppNumber(selectedResponse.phone || ""),
                          "_blank",
                        )
                      }
                      className="bg-[#25D366] hover:bg-[#20B954] text-white"
                      size="sm"
                    >
                      <FaWhatsapp className="w-4 h-4 mr-2" />
                      Iniciar Conversa
                    </Button>
                  )}
                  {user?.canDelete && (
                    <Button
                      onClick={() => {
                        if (window.confirm("Tem certeza que deseja excluir esta resposta? Esta ação não pode ser desfeita.")) {
                          deleteResponseMutation.mutate(selectedResponse.id);
                        }
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white"
                      size="sm"
                      disabled={deleteResponseMutation.isPending}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      {deleteResponseMutation.isPending ? "Excluindo..." : "Excluir"}
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
                    <p className="text-white">
                      {selectedResponse.position === "Outro"
                        ? selectedResponse.customPosition
                        : selectedResponse.position}
                    </p>
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
                    {formatAreasAsTags(selectedResponse.areas || "[]").map(
                      (area, index) => (
                        <Badge
                          key={index}
                          className="bg-[#0066CC] hover:bg-[#0066CC] text-white text-xs px-2 py-1 cursor-default"
                        >
                          {area}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-gray-400">
                    Processo que Consome Tempo:
                  </label>
                  <p className="text-white">
                    {selectedResponse.timeConsumingProcess}
                  </p>
                </div>

                <div>
                  <label className="text-gray-400">
                    Onde Está Perdendo Dinheiro/Oportunidades:
                  </label>
                  <p className="text-white">
                    {selectedResponse.lostOpportunities}
                  </p>
                </div>

                <div>
                  <label className="text-gray-400">Origem do Formulário:</label>
                  <p className="text-white">
                  {selectedResponse.source === "página principal" 
                          ? "Página Principal" 
                          : selectedResponse.source === "página de formulário" 
                          ? "Página Formulário" 
                          : selectedResponse.source || "Não informado"}
                  </p>
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
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              timeZone: "America/Sao_Paulo",
                            });
                          } catch (error) {
                            return "Data inválida";
                          }
                        })()
                      : "Data inválida"}
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