import { App } from '@app-types/app.types';

const STORAGE_KEY = 'lastSelectedApps';

/**
 * Gerencia a lista de últimos apps selecionados
 * Remove duplicatas, move o app selecionado para o final e mantém apenas os últimos N itens
 * @param currentApps - Lista atual de apps selecionados
 * @param selectedApp - App que foi selecionado
 * @param maxItems - Número máximo de itens a manter (padrão: 3)
 * @returns Nova lista de apps selecionados
 */
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

/**
 * Obtém os IDs dos últimos apps selecionados do localStorage
 * @returns Array de IDs dos apps
 */
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

/**
 * Salva os IDs dos últimos apps selecionados no localStorage
 * @param appIds - Array de IDs dos apps para salvar
 */
export const saveLastSelectedAppsToStorage = (appIds: string[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appIds));
  } catch {
    // Silently fail if localStorage is not available
  }
};
