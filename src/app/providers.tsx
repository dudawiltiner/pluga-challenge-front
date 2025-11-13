'use client';

import { useState } from 'react';

import { DictionaryProvider } from '@context/DictionaryContext';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 2,
            staleTime: 5 * 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <DictionaryProvider>{children}</DictionaryProvider>
    </QueryClientProvider>
  );
}
