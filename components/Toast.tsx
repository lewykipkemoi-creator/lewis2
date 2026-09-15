"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

type ToastContextType = { showToast: (message: string) => void };
const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    setMessage(msg);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setMessage(null), 2800);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className={`fixed right-4 bottom-4 sm:right-5 sm:bottom-5 z-[200] rounded-xl border border-white/10 border-l-2 border-l-indigo-500 bg-[#171720] px-4 py-3 text-[13px] shadow-2xl transition-all duration-300 max-w-[calc(100vw-2rem)] ${
          message ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"
        }`}
      >
        {message}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
