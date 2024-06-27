import React from 'react';
import { MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <nav aria-label='Table Pagination'>
      <MDBPagination className='mb-0'>
        <MDBPaginationItem disabled={currentPage === 1}>
          <MDBPaginationLink onClick={() => handlePageChange(currentPage - 1)} tabIndex={-1} aria-disabled='true'>
            Previous
          </MDBPaginationLink>
        </MDBPaginationItem>
        {Array.from({ length: totalPages }, (_, index) => (
          <MDBPaginationItem key={index} active={index + 1 === currentPage}>
            <MDBPaginationLink onClick={() => handlePageChange(index + 1)}>{index + 1}</MDBPaginationLink>
          </MDBPaginationItem>
        ))}
        <MDBPaginationItem disabled={currentPage === totalPages}>
          <MDBPaginationLink onClick={() => handlePageChange(currentPage + 1)}>Next</MDBPaginationLink>
        </MDBPaginationItem>
      </MDBPagination>
    </nav>
  );
};

export default Pagination;