import Header from '../Components/Header.jsx';
import Book from '../Components/Book.jsx';
import Book_New from '../Components/Book_New.jsx';
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
  const [nextBookID, setNextBookID] = useState(null);

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
        setSaveSuccess(false);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // do this on mount
  useEffect(() => {
    const initializeData = async () => {
      await fetchBooks();
      await handleNextBookID();
    };
    initializeData();
  }, []);

  const handleBookUpdate = async () => {
    await fetchBooks(); // First get the fresh book data
    setSaveSuccess(true); // Then show alert message
    console.log(`saveSuccess: ${saveSuccess}`);
  };

  const handleNextBookID = async () => {
    setNextBookID(await bookService.getNextBookID());
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
      {saveSuccess && (
        <AlertMessage
          message="Changes saved successfully!"
          type="success"
          onDismiss={() => setSaveSuccess(false)}
        />
      )}
      <h1>Browse Catalog</h1>
      <div className="new-member-book-container">
        <Book_New
          status={1}
          saveChanges={''}
          onClose={''}
          bookid={nextBookID}
          title={''}
          author={''}
          year={null}
          isbn={''}
          genre={''}
          onUpdate={handleBookUpdate}
        />
      </div>

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
