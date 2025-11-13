import React from 'react';

import { AppCard } from '@components/atoms/AppCard';
import { Pagination } from '@components/atoms/Pagination';
import { SearchInput } from '@components/atoms/SearchInput';
import { AppModal } from '@components/molecules/AppModal';
import { EmptyState } from '@components/molecules/EmptyState';

import { useApps } from '@context/AppsContext';
import { useDictionary } from '@context/DictionaryContext';

import { App } from '@app-types/app.types';

const AppsList: React.FC = () => {
  const { dictionary } = useDictionary();
  const {
    isLoading,
    search,
    pagedFilteredApps,
    maxPage,
    page,
    selectedApp,
    lastSelectedApps,
    handleSearch,
    handlePageChange,
    handleSelectedApp,
    clearSelectedApp,
  } = useApps();

  return (
    <>
      <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto p-6">
        <h1 className="text-3xl text-center">{dictionary.title}</h1>
        <SearchInput
          value={search}
          onChange={handleSearch}
          placeholder={dictionary.searchPlaceholder}
        />
        {isLoading ? (
          <div className="text-center">
            <span className="loading loading-spinner" />
          </div>
        ) : pagedFilteredApps.length === 0 ? (
          <EmptyState searchTerm={search} />
        ) : (
          <>
            <div className="grid grid-cols-4 gap-6">
              {pagedFilteredApps.map((app: App) => (
                <AppCard
                  key={app.app_id}
                  app={app}
                  onClick={handleSelectedApp}
                />
              ))}
            </div>
            <Pagination
              currentPage={page}
              maxPage={maxPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
      <AppModal
        selectedApp={selectedApp}
        lastSelectedApps={lastSelectedApps}
        onAppSelect={handleSelectedApp}
        onClose={clearSelectedApp}
      />
    </>
  );
};

export default AppsList;
