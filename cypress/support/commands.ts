/* eslint-disable @typescript-eslint/no-namespace */

/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getByDataCy(dataCyValue: string): Chainable<JQuery<HTMLElement>>;
  }
}

Cypress.Commands.add('getByDataCy', (dataCyValue) => {
  return cy.get(`[data-cy="${dataCyValue}"]`);
});
