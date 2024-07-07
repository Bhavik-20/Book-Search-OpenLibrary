import React from 'react';

interface BookItemProps {
  book: {
    title: string;
    author_name: string[];
    first_publish_year: number;
    isbn: string[];
    number_of_pages_median: number;
  };
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  return (
    <div className="book-item">
      <h3>{book.title}</h3>
      <p>Author(s): {book.author_name.join(', ')}</p>
      <p>First Published: {book.first_publish_year}</p>
      <p>ISBN: {book.isbn?.[0]}</p>
      <p>Pages: {book.number_of_pages_median}</p>
      <hr />
    </div>
  );
};

export default BookItem;
