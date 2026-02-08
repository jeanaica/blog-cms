import { useEffect, RefObject, useState } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useDetectOutsideClick(ref: RefObject<HTMLElement>) {
  const [isClickedOutside, setIsClickedOutside] = useState(false);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target as Element)) {
        setIsClickedOutside(true);
      } else {
        setIsClickedOutside(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside, {
      passive: true,
    });
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return isClickedOutside;
}

export default useDetectOutsideClick;
