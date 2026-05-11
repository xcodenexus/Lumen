import { useEffect, useRef } from "react";

export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  options: { meta?: boolean; shift?: boolean } = {}
) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const metaPressed = e.metaKey || e.ctrlKey;
      if (
        e.key.toLowerCase() === key.toLowerCase() &&
        (!options.meta || metaPressed) &&
        (!options.shift || e.shiftKey)
      ) {
        e.preventDefault();
        callbackRef.current();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [key, options.meta, options.shift]);
}
