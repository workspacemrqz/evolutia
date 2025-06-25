import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import TermsOfUse from "@/pages/terms-of-use";
import PrivacyPolicy from "@/pages/privacy-policy";
import LGPD from "@/pages/lgpd";
import AuthPage from "@/pages/auth-page";
import AdminPage from "@/pages/admin-page";
import FormularioPage from "@/pages/formulario";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/formulario" component={FormularioPage} />
      <Route path="/termos-de-uso" component={TermsOfUse} />
      <Route path="/politica-de-privacidade" component={PrivacyPolicy} />
      <Route path="/lgpd" component={LGPD} />
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/admin" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;