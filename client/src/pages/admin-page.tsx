import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { getQueryFn, apiRequest, queryClient } from "@/lib/queryClient";
import { DiagnosticResponse, Expense, Project } from "@shared/schema";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, LogOut, Download, Eye, Trash2, Plus, DollarSign } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export default function AdminPage() {
  const { user, logoutMutation } = useAuth();
  const [selectedResponse, setSelectedResponse] =
    useState<DiagnosticResponse | null>(null);
  const [newExpense, setNewExpense] = useState({
    item: "",
    description: "",
    value: "",
    paidBy: "",
  });
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    links: "",
    pdfPath: "",
    imagePath: "",
    revenue: "",
  });
  const [showProjectForm, setShowProjectForm] = useState(false);

  const { data: responses, isLoading } = useQuery<DiagnosticResponse[]>({
    queryKey: ["/api/admin/responses"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const { data: expenses, isLoading: expensesLoading } = useQuery<Expense[]>({
    queryKey: ["/api/admin/expenses"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const { data: projects, isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/admin/projects"],
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

  const createExpenseMutation = useMutation({
    mutationFn: async (expense: { item: string; description: string, value: number; paidBy: string }) => {
      const response = await apiRequest("POST", "/api/admin/expenses", expense);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create expense");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/expenses"] });
      setNewExpense({ item: "", description: "", value: "", paidBy: "" });
      setShowExpenseForm(false);
    },
  });

  const deleteExpenseMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/admin/expenses/${id}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete expense");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/expenses"] });
    },
  });

    const createProjectMutation = useMutation({
    mutationFn: async (project: { title: string; description: string; links: string; pdfPath: string; imagePath: string; revenue: string; }) => {
      const response = await apiRequest("POST", "/api/admin/projects", project);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create project");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/projects"] });
      setNewProject({ title: "", description: "", links: "", pdfPath: "", imagePath: "", revenue: "" });
      setShowProjectForm(false);
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/admin/projects/${id}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete project");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/projects"] });
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

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseFloat(newExpense.value);
    if (isNaN(value) || value <= 0) {
      alert("Por favor, insira um valor válido");
      return;
    }
    createExpenseMutation.mutate({
      item: newExpense.item,
      description: newExpense.description,
      value,
      paidBy: newExpense.paidBy,
    });
  };

    const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    createProjectMutation.mutate({
      title: newProject.title,
      description: newProject.description,
      links: newProject.links,
      pdfPath: newProject.pdfPath,
      imagePath: newProject.imagePath,
      revenue: newProject.revenue,
    });
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

  const exportExpensesToCSV = () => {
    if (!expenses || expenses.length === 0) return;

    const headers = ["Data", "Item", "Descrição", "Valor", "Responsável"];

    const csvContent = [
      headers.join(","),
      ...expenses.map((expense) =>
        [
          new Date(expense.createdAt).toLocaleDateString("pt-BR"),
          `"${expense.item}"`,
          `"${expense.description || ''}"`,
          `"R$ ${parseFloat(expense.value.toString()).toFixed(2).replace('.', ',')}"`,
          `"${expense.paidBy}"`,
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `gastos_evolut_ia_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  const handleDownloadProject = (projectId: number) => {
    // Placeholder function for downloading the project as a ZIP file
    alert(`Download do projeto ${projectId} em formato .zip`);
  };

  if (isLoading || expensesLoading || projectsLoading) {
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

        {/* Main Content with Tabs */}
        <Tabs defaultValue="responses" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-900 border border-gray-800">
            <TabsTrigger value="responses" className="text-white data-[state=active]:bg-gray-800">
              Respostas do Diagnóstico
            </TabsTrigger>
            <TabsTrigger value="expenses" className="text-white data-[state=active]:bg-gray-800">
              Controle Financeiro
            </TabsTrigger>
             <TabsTrigger value="projects" className="text-white data-[state=active]:bg-gray-800">
              Projetos
            </TabsTrigger>
          </TabsList>

          {/* Responses Tab */}
          <TabsContent value="responses" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
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
          </TabsContent>

          {/* Expenses Tab */}
          <TabsContent value="expenses" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white">
                      Controle Financeiro
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Registre e acompanhe todos os gastos da empresa
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={exportExpensesToCSV}
                      variant="outline"
                      className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                      disabled={!expenses || expenses.length === 0}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Exportar CSV
                    </Button>
                    <Button
                      onClick={() => setShowExpenseForm(!showExpenseForm)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Gasto
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Expense Form */}
                {showExpenseForm && (
                  <form
                    onSubmit={handleCreateExpense}
                    className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-6"
                  >
                    <h3 className="text-white text-lg font-semibold mb-4">
                      Registrar Novo Gasto
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor="item" className="text-white">
                          Nome do Item
                        </Label>
                        <Input
                          id="item"
                          value={newExpense.item}
                          onChange={(e) =>
                            setNewExpense({ ...newExpense, item: e.target.value })
                          }
                          className="bg-gray-900 border-gray-600 text-white"
                          placeholder="Nome do item ou serviço"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="value" className="text-white">
                          Valor (R$)
                        </Label>
                        <Input
                          id="value"
                          type="number"
                          step="0.01"
                          value={newExpense.value}
                          onChange={(e) =>
                            setNewExpense({ ...newExpense, value: e.target.value })
                          }
                          className="bg-gray-900 border-gray-600 text-white"
                          placeholder="0,00"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <Label htmlFor="description" className="text-white">
                        Descrição (opcional)
                      </Label>
                      <Input
                        id="description"
                        value={newExpense.description}
                        onChange={(e) =>
                          setNewExpense({ ...newExpense, description: e.target.value })
                        }
                        className="bg-gray-900 border-gray-600 text-white"
                        placeholder="Detalhes sobre o item ou serviço"
                      />
                    </div>
                    <div className="mb-4">
                      <Label htmlFor="paidBy" className="text-white">
                        Responsável pelo Pagamento
                      </Label>
                        <Select
                            onValueChange={(value) =>
                              setNewExpense({ ...newExpense, paidBy: value })
                            }
                          >
                            <SelectTrigger className="bg-gray-900 border-gray-600 text-white w-full">
                              <SelectValue placeholder="Selecione o responsável" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Gabriel Camargo">Gabriel Camargo</SelectItem>
                              <SelectItem value="Gabriel Marquez">Gabriel Marquez</SelectItem>
                            </SelectContent>
                          </Select>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="submit"
                        disabled={createExpenseMutation.isPending}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        {createExpenseMutation.isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          "Registrar Gasto"
                        )}
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          setShowExpenseForm(false);
                          setNewExpense({ item: "", description: "", value: "", paidBy: "" });
                        }}
                        variant="outline"
                        className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                )}

                {/* Expenses Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="pt-6">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        <span className="ml-2 text-sm font-medium text-gray-400">Total de Gastos</span>
                      </div>
                      <div className="text-2xl font-bold text-white">
                        R$ {expenses?.reduce((sum, expense) => sum + parseFloat(expense.value.toString()), 0).toFixed(2).replace('.', ',') || "0,00"}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="pt-6">
                      <div className="flex items-center">
                        <span className="ml-2 text-sm font-medium text-gray-400">Número de Itens</span>
                      </div>
                      <div className="text-2xl font-bold text-white">
                        {expenses?.length || 0}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="pt-6">
                      <div className="flex items-center">
                        <span className="ml-2 text-sm font-medium text-gray-400">Este Mês</span>
                      </div>
                      <div className="text-2xl font-bold text-white">
                        R$ {expenses?.filter(expense => {
                          const expenseDate = new Date(expense.createdAt);
                          const now = new Date();
                          return expenseDate.getMonth() === now.getMonth() && 
                                 expenseDate.getFullYear() === now.getFullYear();
                        }).reduce((sum, expense) => sum + parseFloat(expense.value.toString()), 0).toFixed(2).replace('.', ',') || "0,00"}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Expenses List */}
                {!expenses || expenses.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    Nenhum gasto registrado
                  </div>
                ) : (
                  <div className="space-y-4">
                    {expenses.map((expense) => (
                      <motion.div
                        key={expense.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-800 p-4 rounded-lg border border-gray-700"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-white font-semibold text-lg">{expense.item}</h3>
                            {expense.description && (
                              <p className="text-gray-300 text-sm mt-1">{expense.description}</p>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 text-sm">
                              <div>
                                <span className="text-gray-400">Valor:</span>
                                <p className="text-green-400 font-semibold">
                                  R$ {parseFloat(expense.value.toString()).toFixed(2).replace('.', ',')}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-400">Responsável:</span>
                                <p className="text-white">{expense.paidBy}</p>
                              </div>
                              <div>
                                <span className="text-gray-400">Data:</span>
                                <p className="text-white">
                                  {new Date(expense.createdAt).toLocaleDateString("pt-BR", {
                                    timeZone: "America/Sao_Paulo",
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                          {user?.canDelete && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                if (window.confirm("Tem certeza que deseja excluir este gasto? Esta ação não pode ser desfeita.")) {
                                  deleteExpenseMutation.mutate(expense.id);
                                }
                              }}
                              className="bg-red-600 border-red-500 text-white hover:bg-red-700"
                              disabled={deleteExpenseMutation.isPending}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white">
                      Gerenciamento de Projetos
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Registre e acompanhe todos os projetos da empresa
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setShowProjectForm(!showProjectForm)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Projeto
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Project Form */}
                {showProjectForm && (
                  <form
                    onSubmit={handleCreateProject}
                    className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-6"
                  >
                    <h3 className="text-white text-lg font-semibold mb-4">
                      Criar Novo Projeto
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor="title" className="text-white">
                          Título
                        </Label>
                        <Input
                          id="title"
                          value={newProject.title}
                          onChange={(e) =>
                            setNewProject({ ...newProject, title: e.target.value })
                          }
                          className="bg-gray-900 border-gray-600 text-white"
                          placeholder="Nome do projeto"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="revenue" className="text-white">
                          Faturamento
                        </Label>
                        <Input
                          id="revenue"
                          value={newProject.revenue}
                          onChange={(e) =>
                            setNewProject({ ...newProject, revenue: e.target.value })
                          }
                          className="bg-gray-900 border-gray-600 text-white"
                          placeholder="R$ 0,00"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <Label htmlFor="description" className="text-white">
                        Descrição
                      </Label>
                      <Textarea
                        id="description"
                        value={newProject.description}
                        onChange={(e) =>
                          setNewProject({ ...newProject, description: e.target.value })
                        }
                        className="bg-gray-900 border-gray-600 text-white"
                        placeholder="Descrição do projeto"
                      />
                    </div>
                    <div className="mb-4">
                      <Label htmlFor="links" className="text-white">
                        Links
                      </Label>
                      <Input
                        id="links"
                        value={newProject.links}
                        onChange={(e) =>
                          setNewProject({ ...newProject, links: e.target.value })
                        }
                        className="bg-gray-900 border-gray-600 text-white"
                        placeholder="Links relacionados ao projeto"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor="pdfPath" className="text-white">
                          Caminho do PDF
                        </Label>
                        <Input
                          id="pdfPath"
                          value={newProject.pdfPath}
                          onChange={(e) =>
                            setNewProject({ ...newProject, pdfPath: e.target.value })
                          }
                          className="bg-gray-900 border-gray-600 text-white"
                          placeholder="Caminho para o arquivo PDF"
                        />
                      </div>
                      <div>
                        <Label htmlFor="imagePath" className="text-white">
                          Caminho da Imagem
                        </Label>
                        <Input
                          id="imagePath"
                          value={newProject.imagePath}
                          onChange={(e) =>
                            setNewProject({ ...newProject, imagePath: e.target.value })
                          }
                          className="bg-gray-900 border-gray-600 text-white"
                          placeholder="Caminho para a imagem"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="submit"
                        disabled={createProjectMutation.isPending}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        {createProjectMutation.isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          "Criar Projeto"
                        )}
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          setShowProjectForm(false);
                          setNewProject({ title: "", description: "", links: "", pdfPath: "", imagePath: "", revenue: "" });
                        }}
                        variant="outline"
                        className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                )}

                {/* Projects List */}
                {!projects || projects.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    Nenhum projeto registrado
                  </div>
                ) : (
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-800 p-6 rounded-lg border border-gray-700"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-white font-semibold text-xl mb-2">{project.title}</h3>
                            {project.description && (
                              <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-400">Faturamento:</span>
                                <p className="text-green-400 font-semibold">{project.revenue}</p>
                              </div>
                              <div>
                                <span className="text-gray-400">Custos Totais:</span>
                                <p className="text-red-400 font-semibold">
                                  R$ {project.totalCosts?.toFixed(2).replace('.', ',') || "0,00"}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-400">Lucro:</span>
                                <p className="text-blue-400 font-semibold">
                                  R$ {(parseFloat(project.revenue.replace(/[^\d,]/g, '').replace(',', '.')) - (project.totalCosts || 0)).toFixed(2).replace('.', ',')}
                                </p>
                              </div>
                            </div>
                            {project.links && (
                              <div className="mt-2">
                                <span className="text-gray-400 text-sm">Links:</span>
                                <p className="text-blue-400 text-sm">{project.links}</p>
                              </div>
                            )}
                            <div className="mt-2 text-sm">
                              <span className="text-gray-400">Data de Criação:</span>
                              <span className="text-white ml-2">
                                {new Date(project.createdAt).toLocaleDateString("pt-BR", {
                                  timeZone: "America/Sao_Paulo",
                                })}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleDownloadProject(project.id)}
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Download ZIP
                            </Button>
                            {user?.canDelete && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  if (window.confirm("Tem certeza que deseja excluir este projeto? Esta ação não pode ser desfeita.")) {
                                    deleteProjectMutation.mutate(project.id);
                                  }
                                }}
                                className="bg-red-600 border-red-500 text-white hover:bg-red-700"
                                disabled={deleteProjectMutation.isPending}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

        {/* Detailed View Modal */}