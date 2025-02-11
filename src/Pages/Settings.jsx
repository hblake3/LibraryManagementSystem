import Header from '../Components/Header.jsx';

function Settings() {
  return (
    <>
      <Header />
      <h1>User Settings</h1>
      <ul>
        <li>Change Password</li>
        <li>Modify Personal Information</li>
        <li>etc.</li>
      </ul>
      <h1>Library Settings</h1>
      <ul>
        <li>Modify Late Fees</li>
        <li>Add Genre(s)</li>
        <li>etc.</li>
      </ul>
    </>
  );
}

export default Settings;
