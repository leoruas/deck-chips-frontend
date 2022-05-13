import React, { useContext, useState } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
