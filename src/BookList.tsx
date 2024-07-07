import React from 'react';
import BookItem from './BookItem';

interface BookListProps {
  books: {
    title: string;
    author_name: string[];
    first_publish_year: number;
    isbn: string[];
    number_of_pages_median: number;
  }[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <div className="book-list">
      {books.map((book, index) => (
        <BookItem key={index} book={book} />
      ))}
    </div>
  );
};

export default BookList;
