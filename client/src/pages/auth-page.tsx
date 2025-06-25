import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuthPage() {
  const { user, loginMutation } = useAuth();
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  // Redirect if already logged in
  if (user) {
    return <Redirect to="/admin" />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Attempting login with:', credentials);
    loginMutation.mutate(credentials);
  };

  return (
    <div className="min-h-screen bg-[#060606] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid lg:grid-cols-2 gap-8 items-center">
        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Admin Login</CardTitle>
              <CardDescription className="text-gray-400">
                Entre com suas credenciais para acessar o painel administrativo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white">Email</Label>
                  <Input
                    id="username"
                    type="email"
                    value={credentials.username}
                    onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="contato@evolutoficial.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="••••••••"
                    required
                  />
                </div>
                {loginMutation.error && (
                  <div className="text-red-400 text-sm mb-4">
                    {loginMutation.error.message}
                  </div>
                )}
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center lg:text-left"
        >
          <div className="mb-8">
            <img 
              src="https://i.ibb.co/rf3PXc8r/LOGO-Evolut-IA-com-texto-na-horizontal.png" 
              alt="Evolut IA" 
              className="h-12 w-auto mx-auto lg:mx-0 mb-8"
            />
          </div>
          <h1 className="text-4xl font-bold text-white mb-6">
            Painel Administrativo
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Gerencie as respostas do diagnóstico e acompanhe os leads da Evolut IA
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
              <div className="text-2xl font-bold text-blue-400 mb-2">100%</div>
              <div className="text-gray-400">Seguro</div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
              <div className="text-2xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-gray-400">Acesso</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}