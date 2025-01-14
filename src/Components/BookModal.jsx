import { CircleX } from 'lucide-react';
// import { BookService } from '../Services/BookService';
import { supabase } from '../Services/SupabaseClient';
import { useState } from 'react';

function BookModal(props) {
  const bookService = new bookService(supabase);

  // Initialize state with props values
  const [formData, setFormData] = useState({
    status: props.status,
    title: props.title,
    author: props.author,
    year: props.year,
    isbn: props.isbn,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Convert status to number if it's being received as string
      const dataToUpdate = {
        ...formData,
        status: parseInt(formData.status),
      };

      const updatedBook = await bookService.updateBook(
        props.bookid,
        dataToUpdate
      );
      if (updatedBook) {
        props.saveChanges();
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

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

          <form className="modal-form">
            <div className="form-group">
              <label>Book ID</label>
              <input type="text" disabled value={props.memberid} />
            </div>

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
                <option value={3}>🔧 Under Repair</option>
                <option value={3}>❌ Lost / Missing</option>
              </select>
            </div>

            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
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
