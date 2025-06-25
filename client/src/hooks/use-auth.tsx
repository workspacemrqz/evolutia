import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, ReactNode } from 'react';

interface User {
  id: number;
  username: string;
  canDelete?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginMutation: any;
  logoutMutation: any;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const fetchUser = async (): Promise<User | null> => {
  try {
    const response = await fetch('/api/user', {
      credentials: 'include',
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.user || data;
  } catch (error) {
    return null;
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const { data: user, isLoading, error } = useQuery<User | null>({
    queryKey: ['user'],
    queryFn: fetchUser,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const loginMutation = useMutation<any, Error, { username: string; password: string }>({
    mutationFn: async ({ username, password }) => {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Login failed');
      }

      return response.json();
    },
    onSuccess: (data) => {
      // Force refetch user data to get the complete user object with canDelete
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.refetchQueries({ queryKey: ['user'] });
    },
  });

  const logoutMutation = useMutation<any, Error, void>({
    mutationFn: async () => {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const login = async (username: string, password: string) => {
    try {
      await loginMutation.mutateAsync({ username, password });
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        login,
        logout,
        loginMutation,
        logoutMutation,
        isLoading: isLoading || loginMutation.isPending || logoutMutation.isPending,
        isAuthenticated: !!user,
        error: error as Error | null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}