import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, FormCheck } from 'react-bootstrap';
import SearchBar from './SearchBar';
import BookList from './BookList';

interface Book {
  title: string;
  author_name: string[];
  first_publish_year: number;
  isbn: string[];
  number_of_pages_median: number;
}

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [sortByYear, setSortByYear] = useState(false);
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      if (query.length < 3) {
        setBooks([]);
        return;
      }

      try {
        setSearching(true);
        const response = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
        let booksData = response.data.docs.map((doc: any) => ({
          title: doc.title,
          author_name: doc.author_name || [],
          first_publish_year: doc.first_publish_year || 'N/A',
          isbn: doc.isbn || [],
          number_of_pages_median: doc.number_of_pages_median || 'N/A',
        }));

        if (sortByYear) {
          booksData = booksData.sort((a: Book, b: Book) => a.first_publish_year - b.first_publish_year);
        }

        setBooks(booksData);
        setSearching(false);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [query, sortByYear]); // Trigger effect when query or sortByYear changes

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  return (
    <Container>
      <br />
      <center><h1>Book Search</h1></center>
      <br />
      <SearchBar onSearch={handleSearch} />
      <br />
      <FormCheck 
        type="switch" 
        id="sort-switch" 
        label="Sort by Year" 
        checked={sortByYear}
        onChange={() => setSortByYear(!sortByYear)}
      />
      <hr />
      <BookList books={books} />
    </Container>
  );
};

export default App;
