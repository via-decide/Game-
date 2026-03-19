import { useState, useEffect, useCallback } from 'react';
import { auth, signInWithGoogle, logout as firebaseLogout } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export const useAuth = (addLog: (msg: string, type: string) => void) => {
  const [user, setUser] = useState<{
    uid: string;
    displayName: string | null;
    email: string | null;
  } | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoginLoading(true);
    addLog('Initiating Google Login...', 'system');
    try {
      await signInWithGoogle();
      addLog('Login popup completed.', 'system');
    } catch (error: any) {
      addLog(`Login failed: ${error.message}`, 'danger');
      console.error('Login error:', error);
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseLogout();
      setUser(null);
      addLog('Logged out successfully.', 'system');
    } catch (error: any) {
      addLog(`Logout failed: ${error.message}`, 'danger');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser({
          uid: authUser.uid,
          displayName: authUser.displayName,
          email: authUser.email,
        });
        addLog(`Auth connected: ${authUser.displayName || 'User'}`, 'system');
      } else {
        setUser(null);
        addLog('Auth: No active session.', 'system');
      }
      setIsAuthReady(true);
    }, (error) => {
      console.error('Auth state error:', error);
      addLog(`Auth error: ${error.message}`, 'danger');
      setIsAuthReady(true);
    });

    return () => unsubscribe();
  }, [addLog]);

  return { user, isAuthReady, isLoginLoading, handleLogin, handleLogout };
};
