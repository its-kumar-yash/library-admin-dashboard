import axios from "axios";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: "title",
    direction: "asc",
  });

  

  useEffect(() => {
    const fetchBooksAndAuthors = async () => {
      setLoading(true);
      try {
        // Fetch books
        const bookResponse = await axios.get('https://openlibrary.org/search.json?q=love');
        const bookData = bookResponse.data.docs;
        // Extract author keys
        const authorNames = bookData.map((book) => book.author_name[0]);
        console.log(bookData);
        // Fetch author details in parallel
        const authorResponses = await axios.all(
          authorNames.map((name) =>
            axios.get(`https://openlibrary.org/search/authors.json?q=${encodeURIComponent(name)}`)
          )
        );

        // Map author details to books
        const booksWithAuthorDetails = bookData.map((book, index) => {
          const authorDetail = authorResponses[index].data.docs[0];
          return {
            ...book,
            author_birth_date: authorDetail?.birth_date || 'N/A',
            author_top_work: authorDetail?.top_work || 'N/A',
          };
        });

        setBooks(booksWithAuthorDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooksAndAuthors();
  }, []);

  const sortedBooks = useMemo(() => {
    let sortableBooks = [...books];
    if (sortConfig !== null) {
      sortableBooks.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableBooks;
  }, [books, sortConfig]);
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <AppContext.Provider
      value={{
        books,
        loading,
        currentBooks,
        currentPage,
        booksPerPage,
        sortConfig,
        setBooks,
        setCurrentPage,
        setBooksPerPage,
        setSortConfig,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
