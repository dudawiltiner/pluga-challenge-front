/**
 * Calcula o número máximo de páginas baseado no total de itens e itens por página
 * @param totalItems - Total de itens
 * @param itemsPerPage - Número de itens por página
 * @returns Número máximo de páginas (mínimo 1)
 */
export const calculateMaxPage = (
  totalItems: number,
  itemsPerPage: number
): number => {
  return Math.ceil(totalItems / itemsPerPage) || 1;
};
