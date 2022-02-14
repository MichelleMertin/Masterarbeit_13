import React, { useState, useEffect } from "react";
import Book from "./Book";
import "./Knopf.css";

const BookStore = ({ authorName }) => {
  const [books, setBooks] = useState([]);

  let API_URL = `https://www.googleapis.com/books/v1/volumes`;

  useEffect(() => {
    fetchBooksHandler();
  }, []);

  async function fetchBooksHandler() {
    const response = await fetch(
      `${API_URL}?q=inauthor:${authorName}&orderBy=newest&maxResults=3`
    );
    const data = await response.json();
    const transformedData = data.items.map((bookData) => {
      return {
        id: bookData.id,
        title: bookData.volumeInfo.title,
        author: bookData.volumeInfo.authors
      };
    });
    setBooks(transformedData);
    console.log(books);
  }

  return (
    <div>
      <Book recBooks={books} />
    </div>
  );
};

export default BookStore;
