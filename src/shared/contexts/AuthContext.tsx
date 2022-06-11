import React, { useContext, useState } from 'react';

interface AuthData {
  email?: string;
  username?: string;
  id?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  authData?: AuthData;
  setAuthData: (val: AuthData) => void;
  joinAsGuest: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authData, setAuthData] = useState<AuthData | undefined>(undefined);

  const joinAsGuest = () => {
    const id = generateId();
    const username = 'guest-' + id;
    setAuthData({
      id,
      username,
    });
    setIsLoggedIn(true);
  };

  const generateId = () => {
    return new Date().valueOf().toString().split('').reverse().join('').slice(0, 6);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        authData,
        setAuthData,
        joinAsGuest,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
