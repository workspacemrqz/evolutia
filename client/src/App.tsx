import { Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import HomePage from "@/pages/home";
import FormularioPage from "@/pages/formulario";
import LGPDPage from "@/pages/lgpd";
import PrivacyPolicyPage from "@/pages/privacy-policy";
import TermsOfUsePage from "@/pages/terms-of-use";
import AuthPage from "@/pages/auth-page";
import AdminPage from "@/pages/admin-page";
import { ProtectedRoute } from "@/lib/protected-route";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function App() {
  console.log('App rendering...');

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="App">
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/formulario" component={FormularioPage} />
            <Route path="/lgpd" component={LGPDPage} />
            <Route path="/politica-de-privacidade" component={PrivacyPolicyPage} />
            <Route path="/termos-de-uso" component={TermsOfUsePage} />
            <Route path="/auth" component={AuthPage} />
            <Route path="/admin-test" component={() => {
              console.log('Admin test route accessed');
              return (
                <div className="min-h-screen bg-[#060606] flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-white text-2xl">Teste da Rota Admin</h1>
                    <p className="text-gray-400 mt-4">Se você vê isso, o roteamento está funcionando</p>
                  </div>
                </div>
              );
            }} />
            <ProtectedRoute path="/admin" component={AdminPage} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;