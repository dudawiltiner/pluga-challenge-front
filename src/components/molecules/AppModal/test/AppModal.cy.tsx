import { DictionaryProvider } from '@context/DictionaryContext';

import { default as AS } from '@utils/enums/assertions.enum';

import { challengePtBR } from '@dictionaries/default-language-collections/ptBR/challenge-pt-BR';

import { App } from '@app-types/app.types';

import AppModal from '../AppModal';
import { ELEMENTS } from '../AppModal.enum';

const HAVE_CLASS = 'have.class';
const DICTIONARY = challengePtBR;

describe('<AppModal />', () => {
  const mockApp: App = {
    app_id: '1',
    name: 'Slack',
    icon: 'https://example.com/slack.png',
    color: '#4A154B',
    link: 'https://slack.com',
  };

  const mockLastSelectedApps: App[] = [
    {
      app_id: '2',
      name: 'Trello',
      icon: 'https://example.com/trello.png',
      color: '#0079BF',
      link: 'https://trello.com',
    },
    {
      app_id: '3',
      name: 'GitHub',
      icon: 'https://example.com/github.png',
      color: '#181717',
      link: 'https://github.com',
    },
  ];

  const mountWithProvider = (
    selectedApp: App | null,
    lastSelectedApps: App[]
  ) => {
    const onAppSelect = cy.stub();
    const onClose = cy.stub();

    cy.mount(
      <DictionaryProvider>
        <AppModal
          selectedApp={selectedApp}
          lastSelectedApps={lastSelectedApps}
          onAppSelect={onAppSelect}
          onClose={onClose}
        />
      </DictionaryProvider>
    );

    return { onAppSelect, onClose };
  };

  it('should not render when selectedApp is null', () => {
    mountWithProvider(null, []);

    cy.getByDataCy(ELEMENTS.APP_MODAL).should(AS.NOT_EXIST);
  });

  it('should render modal when selectedApp is provided', () => {
    mountWithProvider(mockApp, []);

    cy.getByDataCy(ELEMENTS.APP_MODAL).should(AS.EXIST);
    cy.getByDataCy(ELEMENTS.APP_MODAL_NAME).should(AS.HAVE_TEXT, mockApp.name);
  });

  it('should display selected app information', () => {
    mountWithProvider(mockApp, []);

    cy.getByDataCy(ELEMENTS.APP_MODAL_NAME).should(AS.BE_VISIBLE);
    cy.getByDataCy(ELEMENTS.APP_MODAL_IMAGE).should(AS.BE_VISIBLE);
    cy.getByDataCy(ELEMENTS.APP_MODAL_ACCESS_BUTTON).should(
      AS.HAVE_ATTR,
      'href',
      mockApp.link
    );
  });

  it('should apply correct background color', () => {
    mountWithProvider(mockApp, []);

    cy.getByDataCy(ELEMENTS.APP_MODAL_IMAGE)
      .parent()
      .should('have.attr', 'style')
      .and('include', 'background-color');
  });

  it('should display last selected apps', () => {
    mountWithProvider(mockApp, mockLastSelectedApps);

    cy.contains('Trello').should(AS.BE_VISIBLE);
    cy.contains('GitHub').should(AS.BE_VISIBLE);
  });

  it('should call onAppSelect when a last selected app is clicked', () => {
    const { onAppSelect } = mountWithProvider(mockApp, mockLastSelectedApps);

    cy.contains('Trello').click();
    cy.wrap(onAppSelect).should('have.been.called');
  });

  it('should have access button visible', () => {
    mountWithProvider(mockApp, []);

    cy.getByDataCy(ELEMENTS.APP_MODAL_ACCESS_BUTTON).should(AS.BE_VISIBLE);
    cy.getByDataCy(ELEMENTS.APP_MODAL_ACCESS_BUTTON)
      .should(AS.HAVE_ATTR, 'href', mockApp.link)
      .and(AS.HAVE_ATTR, 'target', '_blank');
    cy.getByDataCy(ELEMENTS.APP_MODAL_ACCESS_BUTTON).should(
      HAVE_CLASS,
      'btn-primary'
    );
  });

  it('should display dictionary texts', () => {
    mountWithProvider(mockApp, mockLastSelectedApps);

    cy.contains(DICTIONARY.access).should(AS.BE_VISIBLE);
    cy.contains(DICTIONARY.lastViewed).should(AS.BE_VISIBLE);
  });
});
