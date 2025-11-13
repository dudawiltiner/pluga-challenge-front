import { App } from '@app-types/app.types';

/**
 * Filtra apps por nome (case insensitive)
 * @param apps - Array de apps para filtrar
 * @param searchTerm - Termo de busca
 * @returns Array de apps filtrados
 */
export const filterApps = (apps: App[], searchTerm: string): App[] => {
  if (!searchTerm.trim()) {
    return apps;
  }

  const normalizedSearch = searchTerm.toLowerCase();
  return apps.filter((app) =>
    app.name.toLowerCase().includes(normalizedSearch)
  );
};
