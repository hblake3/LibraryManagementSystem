import AlertMessage from '../Components/AlertMessage.jsx';
import MemberModal from '../Components/MemberModal.jsx';
import { useState } from 'react';
import { useEffect } from 'react';

function Member(props) {
  const [isClicked, setIsClicked] = useState(false);
  const [showAlert, setShowAlert] = useState(null);

  const statusTypes = {
    1: '🟢',
    2: '🟡',
    3: '🔴',
  };

  const toolTips = {
    1: 'Active',
    2: 'Halted',
    3: 'Deactivated',
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
    console.log(`MemberID: ${props.memberid}`);
  };

  const handleSaveChanges = async () => {
    setShowAlert(true);
    await props.onUpdate();
    setIsClicked(false);
  };

  return (
    <>
      {showAlert && (
        <AlertMessage message="Changes saved successfully!" type="success" />
      )}
      <tr className="table-row" onClick={handleClick}>
        <td className="status-cell" data-tooltip={toolTips[props.status]}>
          {statusTypes[props.status]}
        </td>
        <td>{props.memberid}</td>
        <td>{props.nameLast}</td>
        <td>{props.nameFirst}</td>
        <td>{props.email}</td>
        <td>{props.phone}</td>
        <td>{props.address}</td>
      </tr>
      {isClicked && (
        <MemberModal
          saveChanges={handleSaveChanges}
          onClose={handleClick}
          memberid={props.memberid}
          nameFirst={props.nameFirst}
          nameLast={props.nameLast}
          email={props.email}
          phone={props.phone}
          address={props.address}
          status={props.status}
          onClose={() => setIsClicked(false)}
          saveChanges={handleSaveChanges}
        />
      )}
    </>
  );
}

export default Member;
