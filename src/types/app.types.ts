export interface App {
  app_id: string;
  name: string;
  icon: string;
  color: string;
  link: string;
}

export interface AppsContextValue {
  apps: App[];
  search: string;
  page: number;
  selectedApp: App | null;
  lastSelectedApps: App[];
  isLoading: boolean;
  filteredApps: App[];
  maxPage: number;
  pagedFilteredApps: App[];
  handleSearch: (value: string) => void;
  handlePageChange: (newPage: number) => void;
  handleSelectedApp: (app: App) => void;
  clearSelectedApp: () => void;
}
