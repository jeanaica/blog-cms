import { useCallback, useState } from 'react';

type SessionStorageHook<T> = [T | undefined, (newValue: T) => void];

export default function useSessionStorage<T>(
  key: string,
  initialValue?: T
): SessionStorageHook<T> {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item =
        typeof window !== 'undefined'
          ? window.sessionStorage.getItem(key)
          : null;

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(prev => {
          const valueToStore =
            value instanceof Function ? value(prev) : value;
          if (typeof window !== 'undefined') {
            window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
          }
          return valueToStore;
        });
      } catch (error) {
        console.error(error);
      }
    },
    [key]
  );

  return [storedValue, setValue];
}
