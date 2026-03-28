import { useSyncExternalStore } from "react";

/**
 * @function subscribe
 * @description Registers a listener for `POINTER_COARSE` changes.
 * 
 * @param callback - Execution block for state updates.
 * @returns - Unsubscribe cleanup function.
 */
const subscribe = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(pointer: coarse)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

/**
 * @function getSnapshot
 * @description Extracts the current `TOUCH_CAPABILITY` state.
 * 
 * @returns - `true` if current pointer is coarse.
 */
const getSnapshot = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
};

/**
 * @function getServerSnapshot
 * @description Server-side default for `TOUCH_CAPABILITY`.
 * 
 * @returns - `false` by default to prevent hydration mismatch.
 */
const getServerSnapshot = () => {
  return false;
};

/**
 * @hook useTouch
 * @description Hydration-safe detection for `POINTER_CAPABILITY`.
 * Subscribes to window `mediaQuery` changes to determine if the 
 * current environment supports `COARSE_TOUCH` interactions.
 * 
 * @returns - `true` if a touch-capable device is detected.
 * 
 * @example
 * const isTouch = useTouch();
 */
export function useTouch() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
