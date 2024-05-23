import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { CSVLink } from "react-csv";

const BookTable = () => {
  const {
    books,
    currentBooks,
    loading,
    sortConfig,
    setSortConfig,
    currentPage,
    booksPerPage,
    setBooks,
  } = useContext(AppContext);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedBook, setEditedBook] = useState(null);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedBook({ ...currentBooks[index] });
  };

  const handleSave = (index) => {
    const updatedBooks = [...books];
    updatedBooks[(currentPage - 1) * booksPerPage + index] = editedBook;
    setBooks(updatedBooks);
    setEditIndex(-1);
  };

  const handleCancel = () => {
    setEditIndex(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSerialNo = (index) => {
    return (currentPage - 1) * booksPerPage + index + 1;
  };

  const headers = [
    { label: "Serial No.", key: "serial_no" },
    { label: "Ratings Average", key: "ratings_average" },
    { label: "Author Name", key: "author_name" },
    { label: "Title", key: "title" },
    { label: "First Publish Year", key: "first_publish_year" },
    { label: "Subject", key: "subject" },
    { label: "Author Birth Date", key: "author_birth_date" },
    { label: "Author Top Work", key: "author_top_work" },
  ];

  const csvData = books.map((book, index) => ({
    serial_no: getSerialNo(index),
    ratings_average: book.ratings_average || "N/A",
    author_name: book.author_name ? book.author_name.join(", ") : "N/A",
    title: book.title,
    first_publish_year: book.first_publish_year,
    subject: book.subject ? book.subject.join(", ") : "N/A",
    author_birth_date: book.author_birth_date || "N/A",
    author_top_work: book.author_top_work || "N/A",
  }));

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Book Records</h2>
        <CSVLink
          data={csvData}
          headers={headers}
          filename={"books.csv"}
          className="btn btn-primary"
          target="_blank"
        >
          Download CSV
        </CSVLink>
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="custom-thead">
            <tr>
              <th>Serial No.</th>
              <th
                onClick={() => handleSort("ratings_average")}
                className="sortable"
              >
                Ratings Average {getClassNamesFor("ratings_average")}
              </th>
              <th
                onClick={() => handleSort("author_name")}
                className="sortable"
              >
                Author Name {getClassNamesFor("author_name")}
              </th>
              <th onClick={() => handleSort("title")} className="sortable">
                Title {getClassNamesFor("title")}
              </th>
              <th
                onClick={() => handleSort("first_publish_year")}
                className="sortable"
              >
                First Publish Year {getClassNamesFor("first_publish_year")}
              </th>
              <th onClick={() => handleSort("subject")} className="sortable">
                Subject {getClassNamesFor("subject")}
              </th>
              <th
                onClick={() => handleSort("author_birth_date")}
                className="sortable"
              >
                Author Birth Date {getClassNamesFor("author_birth_date")}
              </th>
              <th
                onClick={() => handleSort("author_top_work")}
                className="sortable"
              >
                Author Top Work {getClassNamesFor("author_top_work")}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map((book, index) => (
              <tr key={`${book.key}-${index}`}>
                <td>{getSerialNo(index)}</td>
                {editIndex === index ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="ratings_average"
                        value={editedBook.ratings_average || ""}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="author_name"
                        value={
                          editedBook.author_name
                            ? editedBook.author_name.join(", ")
                            : ""
                        }
                        onChange={(e) =>
                          handleChange({
                            target: {
                              name: "author_name",
                              value: e.target.value
                                .split(",")
                                .map((name) => name.trim()),
                            },
                          })
                        }
                        className="form-control"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="title"
                        value={editedBook.title}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="first_publish_year"
                        value={editedBook.first_publish_year}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="subject"
                        value={
                          editedBook.subject
                            ? editedBook.subject.join(", ")
                            : ""
                        }
                        onChange={(e) =>
                          handleChange({
                            target: {
                              name: "subject",
                              value: e.target.value
                                .split(",")
                                .map((subject) => subject.trim()),
                            },
                          })
                        }
                        className="form-control"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="author_birth_date"
                        value={editedBook.author_birth_date || ""}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="author_top_work"
                        value={editedBook.author_top_work || ""}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => handleSave(index)}
                        className="btn btn-success btn-sm me-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn btn-secondary btn-sm"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{book.ratings_average || "N/A"}</td>
                    <td>
                      {book.author_name ? book.author_name.join(", ") : "N/A"}
                    </td>
                    <td>{book.title}</td>
                    <td>{book.first_publish_year}</td>
                    <td>{book.subject ? book.subject.join(", ") : "N/A"}</td>
                    <td>{book.author_birth_date || "N/A"}</td>
                    <td>{book.author_top_work || "N/A"}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(index)}
                        className="btn btn-primary btn-sm"
                      >
                        Edit
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookTable;
