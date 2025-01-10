import { CircleX } from 'lucide-react';
import { MemberService } from '../Services/MemberService';
import { supabase } from '../Services/SupabaseClient';
import { useState } from 'react';

function MemberModal(props) {
  const memberService = new MemberService(supabase);

  // Initialize state with props values
  const [formData, setFormData] = useState({
    status: props.status,
    nameFirst: props.nameFirst,
    nameLast: props.nameLast,
    email: props.email,
    phone: props.phone,
    address: props.address,
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

      const updatedMember = await memberService.updateMember(
        props.memberid,
        dataToUpdate
      );
      if (updatedMember) {
        props.saveChanges();
      }
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };

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
              <input type="text" disabled value={props.memberid} />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value={1}>🟢 Active</option>
                <option value={2}>🟡 Halted</option>
                <option value={3}>🔴 Deactivated</option>
              </select>
            </div>

            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="nameFirst"
                value={formData.nameFirst}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="nameLast"
                value={formData.nameLast}
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

export default MemberModal;
