import React, { useContext } from 'react';
import { Auth } from 'lib/auth/Auth';

export type AuthContextProps = {
  user: Auth | null;
};

export const AuthContext = React.createContext<AuthContextProps>({
  user: null,
});

export const useAuth = () => useContext(AuthContext);
