import { DictionaryProvider } from '@context/DictionaryContext';

import { default as AS } from '@utils/enums/assertions.enum';

import { challengePtBR } from '@dictionaries/default-language-collections/ptBR/challenge-pt-BR';

import EmptyState from '../EmptyState';
import { ELEMENTS } from '../EmptyState.enum';

const HAVE_CLASS = 'have.class';
const DICTIONARY = challengePtBR;

describe('<EmptyState />', () => {
  const mountWithProvider = (searchTerm: string) => {
    cy.mount(
      <DictionaryProvider>
        <EmptyState searchTerm={searchTerm} />
      </DictionaryProvider>
    );
  };

  it('should render empty state message', () => {
    mountWithProvider('teste');

    cy.getByDataCy(ELEMENTS.EMPTY_STATE).should(AS.BE_VISIBLE);
    cy.getByDataCy(ELEMENTS.EMPTY_STATE_ICON).should(AS.BE_VISIBLE);
  });

  it('should display search term in message', () => {
    mountWithProvider('slack');

    cy.getByDataCy(ELEMENTS.EMPTY_STATE_MESSAGE)
      .should(AS.BE_VISIBLE)
      .and('contain', 'slack');
  });

  it('should display dictionary noResults text', () => {
    mountWithProvider('teste');

    cy.getByDataCy(ELEMENTS.EMPTY_STATE_MESSAGE)
      .should(AS.BE_VISIBLE)
      .and('contain', DICTIONARY.noResults);
  });

  it('should have icon visible', () => {
    mountWithProvider('teste');

    cy.getByDataCy(ELEMENTS.EMPTY_STATE_ICON).should(AS.BE_VISIBLE);
    cy.getByDataCy(ELEMENTS.EMPTY_STATE_ICON).should(HAVE_CLASS, 'size-9');
  });

  it('should have correct CSS classes', () => {
    mountWithProvider('teste');

    cy.getByDataCy(ELEMENTS.EMPTY_STATE).should(HAVE_CLASS, 'text-center');
  });
});
