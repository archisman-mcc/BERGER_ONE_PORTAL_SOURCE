import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount, onPageChange }) => {
    return (
        <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={onPageChange}
            containerClassName={'pagination'}
            activeClassName={'active'}
        />
    );
};

export default Pagination;
