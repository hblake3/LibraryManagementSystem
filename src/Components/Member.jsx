import MemberModal from '../Components/MemberModal.jsx';
import { useState } from 'react';
import { useEffect } from 'react';

function Member(props) {
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
    console.log(`MemberID: ${props.memberid}`);
  };

  useEffect(() => {
    console.log(`isClicked?: ${isClicked}`);
  }, [isClicked]);

  return (
    <>
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

export default Member;
