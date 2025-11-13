import { default as AS } from '@utils/enums/assertions.enum';

import { challengePtBR } from '@dictionaries/default-language-collections/ptBR/challenge-pt-BR';

import SearchInput from '../SearchInput';
import { ELEMENTS } from '../SearchInput.enum';

const HAVE_CLASS = 'have.class';
const DICTIONARY = challengePtBR;

describe('<SearchInput />', () => {
  it('should render search input', () => {
    const onChange = cy.stub();
    cy.mount(
      <SearchInput
        value=""
        onChange={onChange}
        placeholder={DICTIONARY.searchPlaceholder}
      />
    );

    cy.getByDataCy(ELEMENTS.SEARCH_INPUT).should(AS.BE_VISIBLE);
    cy.getByDataCy(ELEMENTS.SEARCH_INPUT_FIELD).should(
      AS.HAVE_ATTR,
      AS.PLACEHOLDER,
      DICTIONARY.searchPlaceholder
    );
  });

  it('should display current value', () => {
    const onChange = cy.stub();
    cy.mount(
      <SearchInput
        value="teste"
        onChange={onChange}
        placeholder={DICTIONARY.searchPlaceholder}
      />
    );

    cy.getByDataCy(ELEMENTS.SEARCH_INPUT_FIELD).should(AS.HAVE_VALUE, 'teste');
  });

  it('should call onChange when user types', () => {
    const onChange = cy.stub();
    cy.mount(
      <SearchInput
        value=""
        onChange={onChange}
        placeholder={DICTIONARY.searchPlaceholder}
      />
    );

    cy.getByDataCy(ELEMENTS.SEARCH_INPUT_FIELD).type('slack');
    cy.wrap(onChange).should('have.been.called');
  });

  it('should have search icon visible', () => {
    const onChange = cy.stub();
    cy.mount(
      <SearchInput
        value=""
        onChange={onChange}
        placeholder={DICTIONARY.searchPlaceholder}
      />
    );

    cy.getByDataCy(ELEMENTS.SEARCH_INPUT_ICON).should(AS.BE_VISIBLE);
  });

  it('should have correct CSS classes', () => {
    const onChange = cy.stub();
    cy.mount(
      <SearchInput
        value=""
        onChange={onChange}
        placeholder={DICTIONARY.searchPlaceholder}
      />
    );

    cy.getByDataCy(ELEMENTS.SEARCH_INPUT).should(HAVE_CLASS, 'input');
    cy.getByDataCy(ELEMENTS.SEARCH_INPUT).should(HAVE_CLASS, 'w-full');
  });
});
