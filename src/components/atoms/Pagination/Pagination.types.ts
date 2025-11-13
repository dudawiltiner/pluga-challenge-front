export interface PaginationProps {
  currentPage: number;
  maxPage: number;
  onPageChange: (page: number) => void;
}
