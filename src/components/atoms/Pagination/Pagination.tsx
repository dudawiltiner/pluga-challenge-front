import React from 'react';

import { ELEMENTS } from './Pagination.enum';
import { PaginationProps } from './Pagination.types';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  maxPage,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < maxPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="text-center" data-cy={ELEMENTS.PAGINATION}>
      <div className="join">
        <button
          data-cy={ELEMENTS.PAGINATION_PREVIOUS}
          onClick={handlePrevious}
          className={`join-item btn ${currentPage === 1 ? 'btn-disabled' : ''}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        {Array.from({ length: maxPage }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={`p${pageNum}`}
            data-cy={`${ELEMENTS.PAGINATION_PAGE}-${pageNum}`}
            onClick={() => onPageChange(pageNum)}
            className={`join-item btn ${pageNum === currentPage ? 'btn-active' : ''}`}
          >
            {pageNum}
          </button>
        ))}
        <button
          data-cy={ELEMENTS.PAGINATION_NEXT}
          onClick={handleNext}
          className={`join-item btn ${currentPage === maxPage ? 'btn-disabled' : ''}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
