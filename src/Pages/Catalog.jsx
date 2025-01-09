import CatalogHeader from '../Components/CatalogHeader.jsx';
import Book from '../Components/Book.jsx';
import { useAuth } from '../Services/AuthContext.jsx';
import { supabase } from '../Services/SupabaseClient';
import { useEffect } from 'react';
import { useState } from 'react';

function Catalog() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // on mount, fetch the books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data, error } = await supabase
          .from('book')
          .select('*, author!inner(name)') // Just select the name from author
          .order('title', { ascending: true });

        console.log('Fetched data:', data); // Add this to see what we're getting

        if (error) {
          setError(error.message);
        } else {
          setBooks(data || []);
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
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
        <CatalogHeader />
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
      <CatalogHeader />
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
