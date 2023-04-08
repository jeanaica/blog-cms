import { ReactNode, useCallback, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';

import { AuthContext } from 'lib/auth/AuthContext';
import { auth } from 'lib/firebase/client';

import { Auth } from 'lib/auth/Auth';

import useSessionStorage from 'shared/utils/hooks/useSessionStorage';

type Props = {
  children: ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  const [authUser, setAuthUser] = useState<Auth | null>(null);
  const [idToken, setIdToken] = useSessionStorage<string>('token', undefined);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      console.log(`refreshing token...`);
      const user = auth.currentUser;
      try {
        if (user) {
          const token: string = await user.getIdToken(true);

          setIdToken(token);
        }
      } catch (error) {
        setIdToken('');
        if (pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }, 10 * 60 * 1000);
    return () => clearInterval(handle);
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        try {
          const token: string = await user.getIdToken();

          setAuthUser({
            displayName: user.displayName!,
            email: user.email!,
          });

          setIdToken(token);
        } catch (error) {
          setIdToken('');
          if (pathname !== '/login') {
            window.location.href = '/login';
          }
        }
      } else {
        // User is signed out
        setIdToken('');
        if (pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    });
  }, [pathname, setIdToken]);

  useEffect(() => {
    if (pathname === '/login' && idToken) {
      window.location.href = '/';
    }
  }, [pathname, idToken]);

  return (
    <AuthContext.Provider value={{ user: authUser }}>
      {children}
    </AuthContext.Provider>
  );
};
