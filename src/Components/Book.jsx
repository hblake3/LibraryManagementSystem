import BookModal from './BookModal.jsx';
import { useState } from 'react';

function Book(props) {
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
    setIsClicked(true);
    console.log(`BookID: ${props.bookid}`);
  };

  const handleSaveChanges = async () => {
    await props.onUpdate();
    setIsClicked(false);
  };

  return (
    <>
      <tr className="table-row" onClick={handleClick}>
        <td className="status-cell" data-tooltip={toolTips[props.status]}>
          {statusTypes[props.status]}
        </td>
        <td>{props.bookid}</td>
        <td>{props.title}</td>
        <td>{props.author}</td>
        <td>{props.year}</td>
        <td>{props.isbn}</td>
        <td>{props.genre}</td>
      </tr>

      {isClicked && (
        <BookModal
          status={props.status}
          saveChanges={handleSaveChanges}
          onClose={handleClick}
          bookid={props.bookid}
          title={props.title}
          author={props.author}
          year={props.year}
          isbn={props.isbn}
          genre={props.genre}
          onClose={() => setIsClicked(false)}
        />
      )}
    </>
  );
}

export default Book;
