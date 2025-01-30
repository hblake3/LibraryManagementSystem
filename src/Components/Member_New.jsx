import MemberModal from './MemberModal.jsx';
import { useState } from 'react';

function Member_New(props) {
  const [isClicked, setIsClicked] = useState(false);

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
    console.log(`New Member ID: ${props.memberid}`);
  };

  const handleSaveChanges = async () => {
    await props.onUpdate();
    setIsClicked(false);
  };

  return (
    <>
      <button onClick={handleClick} className="new-member-button">
        Add New Member
      </button>
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
        />
      )}
    </>
  );
}

export default Member_New;
