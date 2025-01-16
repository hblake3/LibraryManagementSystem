import Header from '../Components/Header.jsx';
import Book from '../Components/Book.jsx';
import AlertMessage from '../Components/AlertMessage.jsx';
import { BookService } from '../Services/BookService';
import { supabase } from '../Services/SupabaseClient';
import { useEffect } from 'react';
import { useState } from 'react';

function Catalog() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const bookService = new BookService(supabase);

  // on mount, fetch the books
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const data = await bookService.getBooks();
      setBooks(data || []);
      // save was successful, so let's reset it
      if (saveSuccess) {
        console.log(`Book Save Success: ${saveSuccess}`);
        saveSuccess(false);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // used for debugging - displays books retrieved from DB book table
  // useEffect(() => {
  //   console.log('Books:', JSON.stringify(books, null, 2));
  // }, [books]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBookUpdate = async () => {
    await fetchBooks(); // First get the fresh member data
    setSaveSuccess(true); // Then show alert message
    console.log(`saveSuccess: ${saveSuccess}`);
  };

  // Show loading state
  if (loading) {
    return <div>Loading catalog...</div>;
  }

  // Show error state
  if (error) {
    return (
      <>
        <Header />
        <h1>Browse Catalog</h1>
        <div>
          <label className="login-error-message">
            Error loading catalog: {error}
          </label>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <h1>Browse Catalog</h1>
      <div className="data-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>BookID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Published</th>
              <th>ISBN</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <Book
                key={book.bookid}
                bookid={book.bookid}
                status={book.status}
                title={book.title}
                isbn={book.isbn}
                year={book.year}
                author={book.author?.name} // checks if book.author exists. if yes, return name property. if no, return `undefined`
                genre={book.book_genre?.map((bg) => bg.genre?.type).join(', ')} // since genres are returned as an array, they need to be mapped for display
                onUpdate={handleBookUpdate}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Catalog;
