import { App } from '@app-types/app.types';

/**
 * Pagina um array de apps
 * @param apps - Array de apps para paginar
 * @param page - Número da página (começando em 1)
 * @param itemsPerPage - Número de itens por página
 * @returns Array de apps da página solicitada
 */
export const paginateApps = (
  apps: App[],
  page: number,
  itemsPerPage: number
): App[] => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return apps.slice(startIndex, endIndex);
};
