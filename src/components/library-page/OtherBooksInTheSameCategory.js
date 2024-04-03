import React from 'react';
import "./OtherBooksInTheSameCategory.scss";


const OtherBooksInTheSameCategory = ({ category, books }) => {
  const otherBooks = [
    { id: 1, title: "The Catcher in the Rye", author: "J.D. Salinger" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
    { id: 3, title: "1984", author: "George Orwell" },
  ];

  return (
    <div className="other-books">
      <h3>Other Books in the Same Category ({category})</h3>
      <ul>
        {books && books.length > 0 ? (
          books.map((book) => (
            <li key={book.id}>
              <a href={`/book/${book.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <strong>{book.title}</strong> by {book.author}
              </a>
            </li>
          ))
        ) : (
          <p>No books found in this category.</p>
        )}
      </ul>
      <h3>Other Books</h3>
      {otherBooks && otherBooks.length > 0 ? (
        otherBooks.map((book) => (
          <div key={book.id}>
            <a href={`/book/${book.title.toLowerCase().replace(/\s+/g, '-')}`}>
              <p>{book.title}</p>
            </a>
          </div>
        ))
      ) : (
        <p>No other books found.</p>
      )}
    </div>
  );
};

export default OtherBooksInTheSameCategory;
