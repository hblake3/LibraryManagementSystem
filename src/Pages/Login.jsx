import { supabase } from '../Services/SupabaseClient.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Services/AuthContext.jsx';

function Login() {
  const [email, setEmail] = useState(''); // email supplied by user, set through onChange
  const [password, setPassword] = useState(''); // password supplied by user, set through onChange
  const [loading, setLoading] = useState(false); // sets state to disable/enable functions while loading
  const [error, setError] = useState(''); // manage error messages
  const { user, loading: authLoading } = useAuth(); // gets auth/user and loading status
  const navigate = useNavigate();

  const cityName = 'West Valenstead';

  // handles the login function following form submission
  const handleLogin = async (e) => {
    setError(''); // reset the error message
    e.preventDefault(); // prevent any default behavior from the button
    setLoading(true); // show loading state (ie. disable the login button)

    // attempt supabase sign in using email and password supplied from input form
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    // if supabase returns with an error...
    if (error) {
      console.log('Login error:', error.message);
      setError(error.message);
      setLoading(false);
      return;
    }

    // If we got here, we have successfully signed in - redirect to the main application page
    // redirect logic will go here...
    setLoading(false);
    navigate('/Dashboard');
  };

  // update the stored email on change
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // update the stored pw on change
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const { handleLogOut } = useAuth();

  // If auth is still initializing, show loading
  if (authLoading) {
    return (
      <div>
        <p>Checking login status...</p>
      </div>
    );
  }

  // If user is already logged in, show welcome / REDIRECT TO APP PAGE. We can probably delete the HTML below and simply redirect...
  if (user) {
    return (
      <>
        <h1 className="h1">
          Welcome to the {cityName}
          <br />
          Library Management System
        </h1>

        <div className="welcome-message">Welcome back {user.email}!</div>

        <form>
          <button
            className="input-button-login"
            onClick={() => navigate('/Dashboard')}
          >
            Continue to Dashboard
          </button>
          <div
            style={{
              textAlign: 'center',
              margin: '0.5rem 0',
              color: 'var(--text-secondary)',
            }}
          >
            <div className="signout-prompt">
              Not {user.email}?{' '}
              <span onClick={handleLogOut} className="signout-link">
                Sign Out
              </span>
            </div>
          </div>
          <label className="login-error-message" id="login-error">
            {error}
          </label>
        </form>
      </>
    );
  }

  // display login prompt if user is not signed in already
  return (
    <>
      <h1 className="h1-login">
        Welcome to the {cityName}
        <br />
        Library Management System
      </h1>

      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input
          className="input-text-email"
          type="text"
          id="login-email"
          value={email}
          onChange={handleEmail}
          required={true}
        />

        <br />

        <label>Password</label>
        <input
          className="input-text-password"
          type="password"
          id="login-password"
          value={password}
          onChange={handlePassword}
          required={true}
        />

        <br />

        <button
          className="input-button-login"
          id="login-button"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <label className="login-error-message" id="login-error">
          {error}
        </label>
      </form>
    </>
  );
}

export default Login;
