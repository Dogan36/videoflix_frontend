import { createContext, useContext } from "react";

// 1) Den Context selbst
export const ToastContext = createContext();

/**
 * 2) Custom Hook, um den Context überall zu konsumieren
 */
export function useToast() {
  return useContext(ToastContext);
}