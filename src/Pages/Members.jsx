import Header from '../Components/Header.jsx';
import Member from '../Components/Member.jsx';
import { supabase } from '../Services/SupabaseClient';
import { useEffect } from 'react';
import { useState } from 'react';

function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // on mount, fetch the members
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const { data, error } = await supabase
          .from('member')
          .select('*')
          .order('nameLast', { ascending: true });
        if (error) {
          setError(error.message);
        } else {
          setMembers(data || []);
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
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
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Members;
