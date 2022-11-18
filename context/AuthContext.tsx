import { User } from 'firebase/auth';
import React, { useContext } from 'react';

export type AuthContextProps = {
  user: User | null;
};

export const AuthContext = React.createContext<AuthContextProps>({
  user: null,
});

export const useAuth = () => useContext(AuthContext);
