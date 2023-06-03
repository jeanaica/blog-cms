import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const useWarnIfUnsavedChanges = (isDirty: boolean) => {
  const router = useRouter();
  const [isBlocking, setIsBlocking] = useState(false);
  const [shouldWarn, setShouldWarn] = useState(false);
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  useEffect(() => {
    const routeChangeStart = (url: string) => {
      if (isDirty && isBlocking) {
        router.events.emit('routeChangeError');
        setShouldWarn(true);
        setNextUrl(url);
        throw 'routeChange aborted.';
      } else {
        setNextUrl(url);
      }
    };

    const routeChangeComplete = () => {
      setShouldWarn(false);
    };

    router.events.on('routeChangeStart', routeChangeStart);
    router.events.on('routeChangeComplete', routeChangeComplete);
    router.events.on('routeChangeError', routeChangeComplete);

    return () => {
      router.events.off('routeChangeStart', routeChangeStart);
      router.events.off('routeChangeComplete', routeChangeComplete);
      router.events.off('routeChangeError', routeChangeComplete);
    };
  }, [isDirty, isBlocking, router.events]);

  useEffect(() => {
    setIsBlocking(isDirty);
  }, [isDirty]);

  const navigate = async () => {
    setIsBlocking(false);
    setShouldWarn(false);

    if (nextUrl) {
      try {
        await router.push(nextUrl);
      } catch (error) {
        // NOOP
      }
    }
  };

  const cancelNavigate = () => {
    setShouldWarn(false);
  };

  return { navigate, cancelNavigate, shouldWarn };
};
