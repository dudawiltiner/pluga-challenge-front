/* eslint-disable @typescript-eslint/no-namespace */
import { AppsProvider } from '@context/AppsContext';
import { DictionaryProvider } from '@context/DictionaryContext';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mount } from 'cypress/react';
import { Context } from 'mocha';
import addContext from 'mochawesome/addContext';

import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: Infinity,
    },
  },
});

Cypress.Commands.add('mount', (component) =>
  mount(
    <QueryClientProvider client={queryClient}>
      <DictionaryProvider>
        <AppsProvider>{component}</AppsProvider>
      </DictionaryProvider>
    </QueryClientProvider>
  )
);

Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    const screenshot = `assets/${Cypress.spec.relative
      .replace('src/components/', '')
      .replace(
        '/test/',
        '/'
      )}/${runnable?.parent?.title.replace('<', '').replace(' />', '')} -- ${
      test.title
    } (failed).png`;
    const Test = { test } as Context;
    addContext(Test, screenshot);
  }
});
