import { type FC, type ReactNode, useCallback, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';

import { AuthContext } from 'lib/auth/AuthContext';
import { auth } from 'lib/firebase/client';
import { Auth } from 'lib/auth/Auth';

import useSessionStorage from 'hooks/useSessionStorage';

type Props = {
  children: ReactNode;
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const [authUser, setAuthUser] = useState<Auth | null>(null);
  const [idToken, setIdToken] = useSessionStorage<string>('token', undefined);

  const handleLogout = useCallback(async () => {
    await signOut(auth).finally(() => {
      navigate('/login');
    });
  }, [navigate]);

  const verifyIdToken = useCallback(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        try {
          const verifiedToken = await user.getIdToken();
          setAuthUser({
            displayName: user.displayName!,
            email: user.email!,
          });

          setIdToken(verifiedToken);
        } catch {
          setIdToken('');
        }
      } else {
        setIdToken('');
      }
    });
  }, [setIdToken]);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(
      async () => {
        const user = auth.currentUser;
        try {
          if (user) {
            const token: string = await user.getIdToken(true);

            setIdToken(token);
          }
        } catch {
          setIdToken('');
        }
      },
      10 * 60 * 1000
    );
    return () => clearInterval(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    verifyIdToken();
  }, [pathname, verifyIdToken]);

  useEffect(() => {
    const tokenListener = (event: StorageEvent) => {
      const { storageArea, key, newValue, oldValue } = event;

      if (storageArea === sessionStorage && key === 'token') {
        if (newValue && newValue !== oldValue) {
          handleLogout();
        }
      }

      if (!key && !newValue) {
        handleLogout();
      }
    };
    window.addEventListener('storage', tokenListener);
    return () => window.removeEventListener('storage', tokenListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      !idToken &&
      pathname !== '/login' &&
      !pathname.includes('/view') &&
      !pathname.includes('/preview')
    ) {
      window.location.assign('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idToken]);

  return (
    <AuthContext.Provider value={{ user: authUser }}>
      {children}
    </AuthContext.Provider>
  );
};
