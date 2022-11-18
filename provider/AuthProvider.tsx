import { ReactNode, useEffect, useState } from 'react';
import nookies from 'nookies';
import { onIdTokenChanged, User } from 'firebase/auth';

import { AuthContext } from '../context/AuthContext';
import { auth } from '../firebaseClient';

type Props = {
  children: ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).nookies = nookies;
    }
    return onIdTokenChanged(auth, async user => {
      console.log(`token changed!`);
      if (!user) {
        console.log(`no token found...`);
        setAuthUser(null);
        nookies.destroy(null, 'token');
        nookies.set(null, 'token', '', { path: '/' });
        return;
      }

      console.log(`updating token...`);
      const token = await user.getIdToken();
      setAuthUser(user);
      nookies.destroy(null, 'token');
      nookies.set(null, 'token', token, { path: '/' });
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      console.log(`refreshing token...`);
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user: authUser }}>
      {children}
    </AuthContext.Provider>
  );
};
