import React from "react";

const BookCard = () => {
  const books = [
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      publisher: "HarperCollins",
      cover: "https://covers.openlibrary.org/b/title/The%20Alchemist-M.jpg"
    },
    {
      title: "1984",
      author: "George Orwell",
      publisher: "Secker & Warburg",
      cover: "https://covers.openlibrary.org/b/title/1984-M.jpg"
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      publisher: "Charles Scribner's Sons",
      cover: "https://covers.openlibrary.org/b/title/The%20Great%20Gatsby-M.jpg"
    }
  ];

  return (
    <div>
      {books.map((book, index) => (
        <div className="book-card" key={index}>

          <img
            src={book.cover}
            alt={book.title}
            width="200"
          />

          <h2>{book.title}</h2>

          <p>
            <strong>Author:</strong> {book.author}
          </p>

          <p>
            <strong>Publisher:</strong> {book.publisher}
          </p>

        </div>
      ))}
    </div>
  );
};

export default BookCard;