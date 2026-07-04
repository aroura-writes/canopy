import React, { createContext, useState, useContext, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [publicSettings, setPublicSettings] = useState(null);

  const checkUserAuth = async () => {
    setIsLoadingAuth(true);
    try {
      const u = await base44.auth.me();
      setUser(u);
      setIsAuthenticated(true);
      setAuthError(null);
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
      if (err?.code === 'user_not_registered' || err?.type === 'user_not_registered') {
        setAuthError({ type: 'user_not_registered' });
      } else {
        setAuthError(null);
      }
    } finally {
      setIsLoadingAuth(false);
      setAuthChecked(true);
    }
  };

  useEffect(() => {
    checkUserAuth();
  }, []);

  const logout = async (redirectUrl) => {
    await base44.auth.logout(redirectUrl);
  };

  const redirectToLogin = (nextUrl) => {
    base44.auth.redirectToLogin(nextUrl);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingAuth,
        authChecked,
        authError,
        checkUserAuth,
        logout,
        redirectToLogin,
        publicSettings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};