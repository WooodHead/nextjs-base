import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      keepPreviousData: true,
    },
  },
});
