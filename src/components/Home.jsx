import React from "react";
import Title from "./Title";
import BookTable from "./BookTable";
import Pagination from "./Pagination";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <Title />
      <div className="container mt-4">
        <BookTable />
        <Pagination />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
