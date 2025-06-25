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
    console.log('getQueryFn - Making request to:', url);
    const response = await apiRequest("GET", url);
    console.log('getQueryFn - Response status:', response.status);

    if (response.status === 401) {
      console.log('getQueryFn - 401 detected, behavior:', on401);
      if (on401 === "throw") {
        throw new Error("Unauthorized - 401");
      } else {
        return null;
      }
    }
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('getQueryFn - Response data:', data);
    return data;
  } catch (error) {
    console.error('getQueryFn error:', error);
    if (on401 === "throw" && (error as Error).message.includes('401')) {
      throw error;
    }
    if ((error as Error).message.includes('401') || (error as Error).message.includes('Unauthorized')) {
      console.log('getQueryFn - Returning null due to 401');
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
```