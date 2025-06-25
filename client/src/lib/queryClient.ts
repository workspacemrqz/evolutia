import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  data?: any
): Promise<Response> {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
    });

    console.log('API Request:', method, url, 'Status:', response.status);

    return response;
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401 }) =>
  async ({ queryKey }) => {
  const url = queryKey[0];
  try {
    const response = await apiRequest("GET", url);
    if (response.status === 401) {
      console.log('getQueryFn - 401 detected, handling...');
      if (on401 === "throw") {
        throw new Error("Unauthorized - 401");
      } else {
        return null;
      }
    }
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('getQueryFn error:', error);
    if (on401 === "throw" && (error as Error).message.includes('401')) {
      throw error;
    }
    if ((error as Error).message.includes('401') || (error as Error).message.includes('Unauthorized')) {
      return null;
    }
    throw error;
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});