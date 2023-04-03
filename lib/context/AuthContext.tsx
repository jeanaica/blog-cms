import React, { useContext } from 'react';
import { User } from 'types/User';

export type AuthContextProps = {
  user: User | null;
};

export const AuthContext = React.createContext<AuthContextProps>({
  user: null,
});

export const useAuth = () => useContext(AuthContext);
