import { ReactNode, useCallback, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';

import { AuthContext } from 'lib/context/AuthContext';
import { auth } from 'lib/firebase/client';
import useSessionStorage from 'lib/hooks/useSessionStorage';

import { User } from 'types/User';

type Props = {
  children: ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [idToken, setIdToken] = useSessionStorage<string>('token', undefined);

  const verifyToken = useCallback(() => {
    return new Promise<string>((resolve, reject) => {
      onAuthStateChanged(auth, async user => {
        if (user) {
          try {
            const token: string = await user.getIdToken();

            setAuthUser({
              displayName: user.displayName!,
              email: user.email!,
            });

            resolve(token);
          } catch (error) {
            reject(error);
          }
        } else {
          // User is signed out
          setIdToken('');
          reject('No users available');
        }
      });
    });
  }, [setIdToken]);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      console.log(`refreshing token...`);
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);
    return () => clearInterval(handle);
  }, []);

  useEffect(() => {
    verifyToken()
      .then(token => setIdToken(token))
      .catch(err => {
        setIdToken('');
        if (pathname !== '/login') {
          window.location.href = '/login';
        }
      });
  }, [pathname, setIdToken, verifyToken]);

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
