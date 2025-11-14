import { App } from '@app-types/app.types';

export const paginateApps = (
  apps: App[],
  page: number,
  itemsPerPage: number
): App[] => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return apps.slice(startIndex, endIndex);
};
