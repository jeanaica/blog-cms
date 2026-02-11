import { type MutableRefObject, useEffect, useRef, useState } from 'react';

export function useHover<T>(): [MutableRefObject<T>, boolean] {
  const [value, setValue] = useState<boolean>(false);
  const ref: any = useRef<T | null>(null);
  useEffect(() => {
    const node: any = ref.current;
    if (node) {
      const handleMouseOver = (): void => setValue(true);
      const handleMouseOut = (): void => setValue(false);
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);
      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      };
    }
  }, []);
  return [ref, value];
}
