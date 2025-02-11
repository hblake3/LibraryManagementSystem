import BookModal from './BookModal.jsx';
import { useState } from 'react';

function Book_New(props) {
  const [isClicked, setIsClicked] = useState(false);

  const statusTypes = {
    1: '🟢',
    2: '🟡',
    3: '🔴',
    4: '🔧',
    5: '❌',
  };

  const toolTips = {
    1: 'Available',
    2: 'On Hold',
    3: 'Checked Out',
    4: 'Under Repair',
    5: 'Lost / Missing',
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
    console.log(`BookID: ${props.bookid}`);
  };

  const handleSaveChanges = async () => {
    await props.onUpdate();
    setIsClicked(false);
  };

  return (
    <>
      <button onClick={handleClick} className="new-member-book-button">
        Add New Book
      </button>
      {isClicked && (
        <BookModal
          onClose={handleClick}
          saveChanges={handleSaveChanges}
          bookid={props.bookid}
          status={props.status}
          title={props.title}
          author={props.author}
          year={props.year}
          isbn={props.isbn}
          genre={props.genre}
        />
      )}
    </>
  );
}

export default Book_New;
