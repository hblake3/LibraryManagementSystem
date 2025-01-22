import { CircleX } from 'lucide-react';
import { BookService } from '../Services/BookService';
import { supabase } from '../Services/SupabaseClient';
import { useEffect, useState } from 'react';

function BookModal(props) {
  const bookService = new BookService(supabase);
  const [allAuthors, setAllAuthors] = useState([]);
  const [allBookTitles, setAllBooksTitles] = useState([]);

  // Initialize state with props values
  const [formData, setFormData] = useState({
    status: props.status,
    bookid: props.bookid,
    title: props.title,
    author: props.author,
    year: props.year,
    isbn: props.isbn,
    genres: props.genre,
  });

  const newGenresSet = new Set(); // create a set that will manage the genre(s) changes
  props.genre.split(', ').forEach((genre) => newGenresSet.add(genre)); // fill the set with the pre-existing genres

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeFieldset = (e) => {
    if (!newGenresSet.has(e.target.name)) {
      newGenresSet.add(e.target.name);
    } else {
      newGenresSet.delete(e.target.name);
    }
    setFormData((prev) => ({
      ...prev,
      genres: Array.from(newGenresSet).join(', '), // convert from set to comma-seperated string
    }));
    console.log(formData);
  };

  const handleSave = async () => {
    try {
      // Convert status to number if it's being received as string
      const dataToUpdate = {
        ...formData,
        status: parseInt(formData.status),
      };

      console.log(JSON.stringify(dataToUpdate));

      const updatedBook = await bookService.updateBook(
        props.bookid,
        dataToUpdate
      );
      if (updatedBook) {
        console.log('updateBook successful!');
        props.saveChanges();
      } else {
        console.log('updateBook did not succeed...');
      }
    } catch (e) {
      console.error('Error updating book:', e);
    }
  };

  function inGenres(genreType) {
    if (!formData.genres) return false;
    let genreArray = formData.genres.split(', ');
    return genreArray.includes(genreType);
  }

  useEffect(() => {
    const loadAuthors = async () => {
      try {
        const authorsList = await bookService.getAllAuthors();
        setAllAuthors(authorsList);
      } catch (error) {}
    };

    loadAuthors();
  }, []);

  useEffect(() => {
    const loadBookTitles = async () => {
      try {
        const booksList = await bookService.getBookTitles();
        setAllBooksTitles(booksList);
      } catch (error) {}
    };

    loadBookTitles();
  }, []);

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">Edit Book</h2>
            <button className="modal-close" onClick={props.onClose}>
              <CircleX />
            </button>
          </div>

          {/* Book ID */}
          <form className="modal-form">
            <div className="form-group">
              <label>Book ID</label>
              <input type="text" disabled value={props.bookid} />
            </div>

            {/* Book Status */}
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value={1}>🟢 Available</option>
                <option value={2}>🟡 On Hold</option>
                <option value={3}>🔴 Checked Out</option>
                <option value={4}>🔧 Under Repair</option>
                <option value={5}>❌ Lost / Missing</option>
              </select>
            </div>

            {/* Book Title */}
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                list="booksList"
              />
              <datalist id="booksList">
                {allBookTitles.map((book) => (
                  <option key={book.title} value={book.title} />
                ))}
              </datalist>
            </div>

            {/* Book Author */}
            <div className="form-group">
              <label>Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                list="authorsList"
              />
              <datalist id="authorsList">
                {allAuthors.map((author) => (
                  <option key={author.name} value={author.name} />
                ))}
              </datalist>
            </div>

            {/* Book Genre(s) */}
            <div className="form-group">
              <label>Genre(s)</label>
              <fieldset onChange={handleChangeFieldset}>
                <div className="genre-grid">
                  <div className="genre-item">
                    <input
                      type="checkbox"
                      id="Science Fiction"
                      name="Science Fiction"
                      defaultChecked={inGenres('Science Fiction')}
                    />
                    <label htmlFor="Science Fiction">Science Fiction</label>
                  </div>
                  <div className="genre-item">
                    <input
                      type="checkbox"
                      id="Fantasy"
                      name="Fantasy"
                      defaultChecked={inGenres('Fantasy')}
                    />
                    <label htmlFor="Fantasy">Fantasy</label>
                  </div>
                  <div className="genre-item">
                    <input
                      type="checkbox"
                      id="Mystery"
                      name="Mystery"
                      defaultChecked={inGenres('Mystery')}
                    />
                    <label htmlFor="Mystery">Mystery</label>
                  </div>
                  <div className="genre-item">
                    <input
                      type="checkbox"
                      id="Romance"
                      name="Romance"
                      defaultChecked={inGenres('Romance')}
                    />
                    <label htmlFor="Romance">Romance</label>
                  </div>
                  <div className="genre-item">
                    <input
                      type="checkbox"
                      id="Thriller"
                      name="Thriller"
                      defaultChecked={inGenres('Thriller')}
                    />
                    <label htmlFor="Thriller">Thriller</label>
                  </div>
                  <div className="genre-item">
                    <input
                      type="checkbox"
                      id="Historical Fiction"
                      name="Historical Fiction"
                      defaultChecked={inGenres('Historical Fiction')}
                    />
                    <label htmlFor="Historical Fiction">
                      Historical Fiction
                    </label>
                  </div>
                  <div className="genre-item">
                    <input
                      type="checkbox"
                      id="Biography"
                      name="Biography"
                      defaultChecked={inGenres('Biography')}
                    />
                    <label htmlFor="Biography">Biography</label>
                  </div>
                  <div className="genre-item">
                    <input
                      type="checkbox"
                      id="Self-Help"
                      name="Self-Help"
                      defaultChecked={inGenres('Self-Help')}
                    />
                    <label htmlFor="Self-Help">Self-Help</label>
                  </div>
                  <div className="genre-item">
                    <input
                      type="checkbox"
                      id="Horror"
                      name="Horror"
                      defaultChecked={inGenres('Horror')}
                    />
                    <label htmlFor="Horror">Horror</label>
                  </div>
                  <div className="genre-item">
                    <input
                      type="checkbox"
                      id="Adventure"
                      name="Adventure"
                      defaultChecked={inGenres('Adventure')}
                    />
                    <label htmlFor="Adventure">Adventure</label>
                  </div>
                </div>
              </fieldset>
            </div>

            {/* Book Year */}
            <div className="form-group">
              <label>Year</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
              />
            </div>

            {/* Book ISBN */}
            <div className="form-group">
              <label>ISBN</label>
              <input
                type="text"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
              />
            </div>

            <div className="modal-actions">
              <button type="button" onClick={props.onClose}>
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="save-button"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default BookModal;
