import { QueryClient } from "@tanstack/react-query";

/**
 * onError is not called if retry is enabled. But it still retries anyway.
 * @see https://github.com/TanStack/query/issues/1990
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // retry: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      keepPreviousData: true,
    },
  },
});
