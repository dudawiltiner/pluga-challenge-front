/// <reference types="jest" />
import { calculateMaxPage } from './calculateMaxPage';

describe('calculateMaxPage', () => {
  it('deve retornar 1 quando o total de itens é 0', () => {
    expect(calculateMaxPage(0, 12)).toBe(1);
  });

  it('deve retornar 1 quando o total de itens é menor que itemsPerPage', () => {
    expect(calculateMaxPage(5, 12)).toBe(1);
  });

  it('deve retornar 1 quando o total de itens é igual a itemsPerPage', () => {
    expect(calculateMaxPage(12, 12)).toBe(1);
  });

  it('deve retornar 2 quando o total de itens é 13', () => {
    expect(calculateMaxPage(13, 12)).toBe(2);
  });

  it('deve retornar 3 quando o total de itens é 25', () => {
    expect(calculateMaxPage(25, 12)).toBe(3);
  });

  it('deve arredondar para cima corretamente', () => {
    expect(calculateMaxPage(24, 12)).toBe(2);
    expect(calculateMaxPage(25, 12)).toBe(3);
  });
});
