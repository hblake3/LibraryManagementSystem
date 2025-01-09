import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './SupabaseClient';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleLogOut = async (e) => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log('Logout error:', error.message);
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Checks if a user is already logged in (after refresh or navigation)
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null); //  if there's a session with a user, use that, otherwise use null
      setLoading(false);
    };

    getInitialSession();

    // listens for any auth changes (login, logout, token refresh)
    // updates the user state whenever auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    // Removes the listener when the component unmounts, Prevents memory leaks
    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, handleLogOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Makes it easy to use the auth context in other components
// Instead of importing useContext and AuthContext separately, components can just import useAuth
// Returns the current user and loading state
export const useAuth = () => {
  return useContext(AuthContext);
};
