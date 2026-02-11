import { useCallback } from 'react';
import { useBlocker } from 'react-router-dom';

export const useWarnIfUnsavedChanges = (isDirty: boolean) => {
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isDirty && currentLocation.pathname !== nextLocation.pathname
  );

  const shouldWarn = blocker.state === 'blocked';

  const navigate = useCallback(() => {
    if (blocker.state === 'blocked') {
      blocker.proceed();
    }
  }, [blocker]);

  const cancelNavigate = useCallback(() => {
    if (blocker.state === 'blocked') {
      blocker.reset();
    }
  }, [blocker]);

  return { navigate, cancelNavigate, shouldWarn };
};
