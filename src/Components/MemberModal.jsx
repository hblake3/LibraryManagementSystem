import { CircleX } from 'lucide-react';

function MemberModal(props) {
  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">Edit Member</h2>
            <button className="modal-close" onClick={props.onClose}>
              <CircleX />
            </button>
          </div>

          <form className="modal-form">
            <div className="form-group">
              <label>Member ID</label>
              <input type="text" disabled defaultValue={props.memberid} />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select defaultValue={props.status}>
                <option value={1}>🟢 Active</option>
                <option value={2}>🟡 Halted</option>
                <option value={3}>🔴 Deactivated</option>
              </select>
            </div>

            <div className="form-group">
              <label>First Name</label>
              <input type="text" defaultValue={props.nameFirst} />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input type="text" defaultValue={props.nameLast} />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" defaultValue={props.email} />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input type="tel" defaultValue={props.phone} />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input type="text" defaultValue={props.address} />
            </div>

            <div className="modal-actions">
              <button type="button" onClick={props.onClose}>
                Cancel
              </button>
              <button
                type="button"
                onClick={props.saveChanges}
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

export default MemberModal;
