import { default as AS } from '@utils/enums/assertions.enum';

import AppCard from '../AppCard';
import { ELEMENTS } from '../AppCard.enum';

const HAVE_CLASS = 'have.class';

describe('<AppCard />', () => {
  const mockApp = {
    app_id: '1',
    name: 'Slack',
    icon: 'https://example.com/slack.png',
    color: '#4A154B',
    link: 'https://slack.com',
  };

  it('should render card with app information', () => {
    const onAppClick = cy.stub();
    cy.mount(<AppCard app={mockApp} onClick={onAppClick} />);

    cy.getByDataCy(ELEMENTS.APP_CARD).should(AS.BE_VISIBLE);
    cy.getByDataCy(ELEMENTS.APP_CARD_NAME).should(AS.HAVE_TEXT, mockApp.name);
    cy.getByDataCy(ELEMENTS.APP_CARD_IMAGE).should(AS.BE_VISIBLE);
  });

  it('should call onClick when card is clicked', () => {
    const onAppClick = cy.stub();
    cy.mount(<AppCard app={mockApp} onClick={onAppClick} />);

    cy.getByDataCy(ELEMENTS.APP_CARD).click();
    cy.wrap(onAppClick).should('have.been.calledWith', mockApp);
  });

  it('should apply correct background color', () => {
    const onAppClick = cy.stub();
    cy.mount(<AppCard app={mockApp} onClick={onAppClick} />);

    cy.getByDataCy(ELEMENTS.APP_CARD_IMAGE)
      .parent()
      .should('have.attr', 'style')
      .and('include', 'background-color');
  });

  it('should have correct CSS classes', () => {
    const onAppClick = cy.stub();
    cy.mount(<AppCard app={mockApp} onClick={onAppClick} />);

    cy.getByDataCy(ELEMENTS.APP_CARD).should(HAVE_CLASS, 'card');
    cy.getByDataCy(ELEMENTS.APP_CARD).should(HAVE_CLASS, 'card-sm');
    cy.getByDataCy(ELEMENTS.APP_CARD).should(HAVE_CLASS, 'cursor-pointer');
  });
});
