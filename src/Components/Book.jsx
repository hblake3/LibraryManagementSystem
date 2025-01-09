function Book(props) {
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

  return (
    <tr className="table-row">
      <td className="status-cell" data-tooltip={toolTips[props.status]}>
        {statusTypes[props.status]}
      </td>
      <td>{props.title}</td>
      <td>{props.author}</td>
      <td>{props.year}</td>
      <td>{props.isbn}</td>
    </tr>
  );
}

export default Book;
