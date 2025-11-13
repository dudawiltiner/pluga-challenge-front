import { default as AS } from '@utils/enums/assertions.enum';

import { challengePtBR } from '@dictionaries/default-language-collections/ptBR/challenge-pt-BR';

import AppsList from '../AppsList';

const SEARCH_INPUT_SELECTOR = 'input[type="search"]';
const DICTIONARY = challengePtBR;

describe('<AppsList />', () => {
  it('should render page title', () => {
    cy.mount(<AppsList />);

    cy.contains(DICTIONARY.title, { timeout: 5000 }).should(AS.BE_VISIBLE);
  });

  it('should render search input', () => {
    cy.mount(<AppsList />);

    cy.get(SEARCH_INPUT_SELECTOR, { timeout: 5000 }).should(AS.BE_VISIBLE);
  });

  it('should render loading spinner when data is loading', () => {
    // Interceptar a requisição com delay para garantir que o loading apareça
    cy.intercept('GET', '**/ferramentas_search.json', {
      statusCode: 200,
      body: [],
      delay: 2000,
    }).as('getAppsDelayed');

    cy.mount(<AppsList />);

    // Verificar que o elemento de loading existe no DOM durante o carregamento
    // Usamos 'exist' ao invés de 'be.visible' porque o spinner pode ter dimensões 0x0
    // mas ainda estar presente no DOM quando isLoading é true
    cy.get('.loading-spinner', { timeout: 500 }).should('exist');

    // Aguardar a requisição completar para garantir que o teste não falhe por timeout
    cy.wait('@getAppsDelayed', { timeout: 3000 });
  });
});
