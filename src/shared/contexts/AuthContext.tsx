import React, { useContext, useState } from 'react';

interface AuthData {
  email: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  authData?: AuthData;
  setAuthData: (val: AuthData) => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authData, setAuthData] = useState<AuthData | undefined>(undefined);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        authData,
        setAuthData,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
