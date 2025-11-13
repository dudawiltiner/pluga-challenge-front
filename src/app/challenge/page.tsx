'use client';

import { AppsList } from '@components/screens/AppsList';

import { AppsProvider } from '@context/AppsContext/AppsContext';

export default function ChallengePage() {
  return (
    <AppsProvider>
      <AppsList />
    </AppsProvider>
  );
}
