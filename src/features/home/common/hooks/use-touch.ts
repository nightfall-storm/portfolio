import { useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(pointer: coarse)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

const getSnapshot = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
};

const getServerSnapshot = () => {
  return false;
};

export function useTouch() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
