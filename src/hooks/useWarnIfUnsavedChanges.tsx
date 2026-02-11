import { useCallback, useState } from 'react';
import { useBlocker } from 'react-router-dom';

export const useWarnIfUnsavedChanges = (isDirty: boolean) => {
  const [shouldWarn, setShouldWarn] = useState(false);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isDirty && currentLocation.pathname !== nextLocation.pathname
  );

  if (blocker.state === 'blocked' && !shouldWarn) {
    setShouldWarn(true);
  }

  const navigate = useCallback(() => {
    setShouldWarn(false);
    if (blocker.state === 'blocked') {
      blocker.proceed();
    }
  }, [blocker]);

  const cancelNavigate = useCallback(() => {
    setShouldWarn(false);
    if (blocker.state === 'blocked') {
      blocker.reset();
    }
  }, [blocker]);

  return { navigate, cancelNavigate, shouldWarn };
};
