import { createContext, useContext, useState, useEffect } from 'react';
import { signInAdmin, signOutAdmin, onAuthChange } from '../services/auth';
import { isFirebaseConfigured } from '../services/firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for demo session
    const demoSession = sessionStorage.getItem('hcs-demo-admin');
    if (demoSession) {
      const user = JSON.parse(demoSession);
      setCurrentUser(user);
      setIsAdmin(true);
      setLoading(false);
      return;
    }

    if (!isFirebaseConfigured()) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthChange((user) => {
      setCurrentUser(user);
      setIsAdmin(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    const user = await signInAdmin(email, password);
    
    if (!isFirebaseConfigured()) {
      // Demo mode — store in session
      const demoUser = { uid: 'demo-admin', email, displayName: 'Demo Admin' };
      sessionStorage.setItem('hcs-demo-admin', JSON.stringify(demoUser));
      setCurrentUser(demoUser);
      setIsAdmin(true);
    } else {
      setCurrentUser(user);
      setIsAdmin(true);
    }
    
    return user;
  };

  const logout = async () => {
    await signOutAdmin();
    sessionStorage.removeItem('hcs-demo-admin');
    setCurrentUser(null);
    setIsAdmin(false);
  };

  const value = {
    currentUser,
    isAdmin,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
