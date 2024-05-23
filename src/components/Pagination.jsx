import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Pagination = () => {
  const { booksPerPage, setBooksPerPage, setCurrentPage, books } =
    useContext(AppContext);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(books.length / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="d-flex flex-column align-items-center mt-4">
      <div className="mb-3">
        <label htmlFor="booksPerPage" className="form-label me-2">
          Books per page:
        </label>
        <select
          id="booksPerPage"
          className="form-select"
          onChange={(e) => setBooksPerPage(Number(e.target.value))}
          style={{ width: "auto" }}
        >
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button
              className="page-link"
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
