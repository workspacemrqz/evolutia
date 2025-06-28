import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/hooks/use-auth";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { Switch, Route } from "wouter";
import { ProtectedRoute } from "@/lib/protected-route";
import HomePage from "@/pages/home";
import FormularioPage from "@/pages/formulario";
import LGPDPage from "@/pages/lgpd";
import PrivacyPolicyPage from "@/pages/privacy-policy";
import TermsOfUsePage from "@/pages/terms-of-use";
import AuthPage from "@/pages/auth-page";
import AdminPage from "@/pages/admin-page";
import NotFound from "@/pages/not-found";

function App() {
  console.log('App rendering...');

  return (
    <div className="App min-h-screen bg-[#060606] text-white">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/formulario" component={FormularioPage} />
            <Route path="/lgpd" component={LGPDPage} />
            <Route path="/politica-de-privacidade" component={PrivacyPolicyPage} />
            <Route path="/termos-de-uso" component={TermsOfUsePage} />
            <Route path="/auth" component={AuthPage} />
            <ProtectedRoute path="/admin" component={AdminPage} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;