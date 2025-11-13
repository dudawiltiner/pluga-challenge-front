import { default as AS } from '@utils/enums/assertions.enum';

import Pagination from '../Pagination';
import { ELEMENTS } from '../Pagination.enum';

const HAVE_CLASS = 'have.class';

describe('<Pagination />', () => {
  it('should render pagination buttons', () => {
    const onPageChange = cy.stub();
    cy.mount(
      <Pagination currentPage={1} maxPage={3} onPageChange={onPageChange} />
    );

    cy.getByDataCy(ELEMENTS.PAGINATION).should(AS.EXIST);
    cy.getByDataCy(`${ELEMENTS.PAGINATION_PAGE}-1`).should(AS.BE_VISIBLE);
    cy.getByDataCy(`${ELEMENTS.PAGINATION_PAGE}-2`).should(AS.BE_VISIBLE);
    cy.getByDataCy(`${ELEMENTS.PAGINATION_PAGE}-3`).should(AS.BE_VISIBLE);
  });

  it('should highlight current page', () => {
    const onPageChange = cy.stub();
    cy.mount(
      <Pagination currentPage={2} maxPage={3} onPageChange={onPageChange} />
    );

    cy.getByDataCy(`${ELEMENTS.PAGINATION_PAGE}-2`).should(
      HAVE_CLASS,
      'btn-active'
    );
  });

  it('should disable previous button on first page', () => {
    const onPageChange = cy.stub();
    cy.mount(
      <Pagination currentPage={1} maxPage={3} onPageChange={onPageChange} />
    );

    cy.getByDataCy(ELEMENTS.PAGINATION_PREVIOUS).should(
      HAVE_CLASS,
      'btn-disabled'
    );
  });

  it('should disable next button on last page', () => {
    const onPageChange = cy.stub();
    cy.mount(
      <Pagination currentPage={3} maxPage={3} onPageChange={onPageChange} />
    );

    cy.getByDataCy(ELEMENTS.PAGINATION_NEXT).should(HAVE_CLASS, 'btn-disabled');
  });

  it('should call onPageChange when a page is clicked', () => {
    const onPageChange = cy.stub();
    cy.mount(
      <Pagination currentPage={1} maxPage={3} onPageChange={onPageChange} />
    );

    cy.getByDataCy(`${ELEMENTS.PAGINATION_PAGE}-2`).click();
    cy.wrap(onPageChange).should('have.been.calledWith', 2);
  });

  it('should call onPageChange when previous button is clicked', () => {
    const onPageChange = cy.stub();
    cy.mount(
      <Pagination currentPage={2} maxPage={3} onPageChange={onPageChange} />
    );

    cy.getByDataCy(ELEMENTS.PAGINATION_PREVIOUS).click();
    cy.wrap(onPageChange).should('have.been.calledWith', 1);
  });

  it('should call onPageChange when next button is clicked', () => {
    const onPageChange = cy.stub();
    cy.mount(
      <Pagination currentPage={2} maxPage={3} onPageChange={onPageChange} />
    );

    cy.getByDataCy(ELEMENTS.PAGINATION_NEXT).click();
    cy.wrap(onPageChange).should('have.been.calledWith', 3);
  });
});
