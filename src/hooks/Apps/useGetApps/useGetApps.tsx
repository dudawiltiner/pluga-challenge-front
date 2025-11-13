import { useQuery } from '@tanstack/react-query';

import { fetchGetApps } from './fetchGetApps';
import { RequestApps } from './types';

export function useGetApps({ url }: RequestApps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['apps', url],
    queryFn: () => fetchGetApps({ url }),
    refetchOnWindowFocus: false,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });

  return {
    data,
    isLoading,
    error,
  };
}
