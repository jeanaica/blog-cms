import { ReactNode, useSyncExternalStore, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: ReactNode;
  wrapperId: string;
};

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

function ReactPortal({ children, wrapperId = 'portal-root' }: Props) {
  const elementRef = useRef<HTMLElement | null>(null);

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      let element = document.getElementById(wrapperId);
      let systemCreated = false;

      if (!element) {
        systemCreated = true;
        element = createWrapperAndAppendToBody(wrapperId);
      }
      elementRef.current = element;
      onStoreChange();

      return () => {
        if (systemCreated && element && element.parentNode) {
          element.parentNode.removeChild(element);
        }
        elementRef.current = null;
      };
    },
    [wrapperId]
  );

  const wrapperElement = useSyncExternalStore(subscribe, () => elementRef.current);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
}

export default ReactPortal;
