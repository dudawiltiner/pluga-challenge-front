import { App } from '@app-types/app.types';

export const filterApps = (apps: App[], searchTerm: string): App[] => {
  if (!searchTerm.trim()) {
    return apps;
  }

  const normalizedSearch = searchTerm.toLowerCase();
  return apps.filter((app) =>
    app.name.toLowerCase().includes(normalizedSearch)
  );
};
