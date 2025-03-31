import { PaginationProps } from './types';

const Pagination = ({
  currentPage,
  totalPosts,
  postsPerPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <div className='flex justify-between items-center mt-4'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <span>
        Page {currentPage} / {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
