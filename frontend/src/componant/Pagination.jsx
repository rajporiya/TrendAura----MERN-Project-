import React from "react";
import "../componentStyles/Pagination.css";
import { useSelector } from "react-redux";

function Pagination({
  currentPage,
  onPageChange,
  activeClass = "active",
  nextPageteText = "Next",
  lastPageText = "Last",
  firstPageText = "1st",
  prevPageText = "Prev",
}) {
  const { totalPages, products } = useSelector((state) => state.product);
  // No product or page only 1
  if (products.length === 0 || totalPages <= 1) return null;

  // generate page number
  const getPageNumbers = () => {
    // pagination number sotore
    const PageNumbers = [];
    // pgn. show before and after page 
    const pageWindow = 2;

    for (let i = Math.max(1, currentPage - pageWindow);
      i <= Math.min(totalPages, currentPage + pageWindow);
      i++) 
    {
      PageNumbers.push(i);
    }
    return PageNumbers;
  };
  return (
    <div className="pagination">
      {currentPage > 1 && (
        <>
          <button className="pagination-btn" onClick={() => onPageChange(1)}>{firstPageText}</button>
          <button className="pagination-btn"
            onClick={() => onPageChange(currentPage - 1)}
          >{prevPageText}</button>
        </>
      )}

      {/* Page Number */}
      { getPageNumbers().map((number) => (
        <button
          className={`pagination-btn ${currentPage === number ? ' ' + activeClass : ''}`}
          key={number}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}

      {/* next and last btn */}
      {currentPage < totalPages && (
        <>
          <button  className="pagination-btn"
            onClick={() => onPageChange(currentPage + 1)}
          >{ nextPageteText}</button>
          <button
            className="pagination-btn"
            onClick={() => onPageChange(totalPages)}
          > {lastPageText} </button>
        </>
      )}
      
      

    </div>
  );
}

export default Pagination;
