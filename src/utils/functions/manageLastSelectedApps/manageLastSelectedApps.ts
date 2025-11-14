import { App } from '@app-types/app.types';

const STORAGE_KEY = 'lastSelectedApps';

export const manageLastSelectedApps = (
  currentApps: App[],
  selectedApp: App,
  maxItems: number = 3
): App[] => {
  if (maxItems <= 0) {
    return [];
  }

  const appsSet = new Set(currentApps);
  appsSet.delete(selectedApp);
  appsSet.add(selectedApp);

  return Array.from(appsSet).slice(-maxItems);
};

export const getLastSelectedAppsFromStorage = (): string[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    return JSON.parse(stored) || [];
  } catch {
    return [];
  }
};

export const saveLastSelectedAppsToStorage = (appIds: string[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appIds));
  } catch {}
};
