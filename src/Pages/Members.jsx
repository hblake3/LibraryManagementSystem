import Header from '../Components/Header.jsx';
import Member from '../Components/Member.jsx';
import { MemberService } from '../Services/MemberService';
import { supabase } from '../Services/SupabaseClient';
import { useEffect } from 'react';
import { useState } from 'react';

function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const memberService = new MemberService(supabase);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const data = await memberService.getMembers();
      setMembers(data || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Show loading state
  if (loading) {
    return <div>Loading members...</div>;
  }

  // Show error state
  if (error) {
    return (
      <>
        <Header />
        <div>
          <h1>Library Members</h1>
          <label className="login-error-message">
            Error loading members: {error}
          </label>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <h1>Library Members</h1>
      <div className="data-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Member ID</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <Member
                key={member.memberid}
                memberid={member.memberid}
                status={member.status}
                nameLast={member.nameLast}
                nameFirst={member.nameFirst}
                email={member.email}
                phone={member.phone}
                address={member.address}
                onUpdate={fetchMembers}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Members;
