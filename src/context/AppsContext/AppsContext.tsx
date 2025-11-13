import React, { createContext, useEffect, useMemo, useState } from 'react';

import { useGetApps } from '@hooks/Apps/useGetApps';

import {
  calculateMaxPage,
  filterApps,
  getLastSelectedAppsFromStorage,
  manageLastSelectedApps,
  paginateApps,
  saveLastSelectedAppsToStorage,
} from '@utils/functions';

import { App, AppsContextValue } from '@app-types/app.types';

const ITEMS_PER_PAGE = 12;
const MAX_LAST_SELECTED_APPS = 3;

export const AppsContext = createContext<AppsContextValue | undefined>(
  undefined
);

interface AppsProviderProps {
  children: React.ReactNode;
}

export const AppsProvider: React.FC<AppsProviderProps> = ({ children }) => {
  const { data: appsData, isLoading } = useGetApps({});
  const [apps, setApps] = useState<App[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [lastSelectedApps, setLastSelectedApps] = useState<App[]>([]);

  useEffect(() => {
    if (appsData) {
      setApps(appsData);

      const appsByAppId = appsData.reduce(
        (acc, app) => {
          acc[app.app_id] = app;
          return acc;
        },
        {} as Record<string, App>
      );

      const storedLastSelectedAppIds = getLastSelectedAppsFromStorage();
      const lastSelectedAppsData = storedLastSelectedAppIds
        .map((appId: string) => appsByAppId[appId])
        .filter(Boolean);
      setLastSelectedApps(lastSelectedAppsData);
    }
  }, [appsData]);

  const filteredApps = useMemo(() => {
    return filterApps(apps, search);
  }, [apps, search]);

  const maxPage = useMemo(() => {
    return calculateMaxPage(filteredApps.length, ITEMS_PER_PAGE);
  }, [filteredApps.length]);

  const pagedFilteredApps = useMemo(() => {
    return paginateApps(filteredApps, page, ITEMS_PER_PAGE);
  }, [filteredApps, page]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSelectedApp = (app: App) => {
    setSelectedApp(app);

    const newLastSelectedApps = manageLastSelectedApps(
      lastSelectedApps,
      app,
      MAX_LAST_SELECTED_APPS
    );
    setLastSelectedApps(newLastSelectedApps);

    const newLastSelectedAppIds = newLastSelectedApps.map((app) => app.app_id);
    saveLastSelectedAppsToStorage(newLastSelectedAppIds);
  };

  const clearSelectedApp = () => {
    setSelectedApp(null);
  };

  const value: AppsContextValue = {
    apps,
    search,
    page,
    selectedApp,
    lastSelectedApps,
    isLoading,
    filteredApps,
    maxPage,
    pagedFilteredApps,
    handleSearch,
    handlePageChange,
    handleSelectedApp,
    clearSelectedApp,
  };

  return <AppsContext.Provider value={value}>{children}</AppsContext.Provider>;
};

export const useApps = (): AppsContextValue => {
  const context = React.useContext(AppsContext);

  if (!context) {
    throw new Error('useApps deve ser usado dentro de um AppsProvider');
  }

  return context;
};
