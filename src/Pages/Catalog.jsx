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

  useEffect(() => {
    fetchBooks();
  }, []);

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
              <th>Title</th>
              <th>Author</th>
              <th>Published</th>
              <th>ISBN</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <Book
                key={book.bookid}
                status={book.status}
                title={book.title}
                isbn={book.isbn}
                year={book.year}
                author={book.author?.name} // get name from author table after join
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Catalog;
