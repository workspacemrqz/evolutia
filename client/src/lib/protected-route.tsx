import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route } from "wouter";

export function ProtectedRoute({
  path,
  component: Component,
}: {
  path: string;
  component: () => React.JSX.Element;
}) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Route path={path}>
        <div className="flex items-center justify-center min-h-screen bg-[#060606]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-white mx-auto mb-4" />
            <p className="text-white">Verificando autenticação...</p>
          </div>
        </div>
      </Route>
    );
  }

  if (!user) {
    return (
      <Route path={path}>
        {() => {
          window.location.href = '/auth';
          return (
            <div className="flex items-center justify-center min-h-screen bg-[#060606]">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-white mx-auto mb-4" />
                <p className="text-white">Redirecionando para login...</p>
              </div>
            </div>
          );
        }}
      </Route>
    );
  }

  return <Route path={path} component={Component} />;
}