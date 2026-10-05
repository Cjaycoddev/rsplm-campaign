"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";

type Kind = "ok" | "err";
type Toast = { id: number; msg: string; kind: Kind };

const ToastCtx = createContext<(msg: string, kind?: Kind) => void>(() => {});

export function useAdminToast() {
  return useContext(ToastCtx);
}

export function AdminToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);

  const show = useCallback((msg: string, kind: Kind = "ok") => {
    const id = Date.now();
    setToast({ id, msg, kind });
    window.setTimeout(() => {
      setToast((cur) => (cur?.id === id ? null : cur));
    }, 3400);
  }, []);

  return (
    <ToastCtx.Provider value={show}>
      {children}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ y: 56, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 28, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className={`pointer-events-none fixed bottom-6 left-1/2 z-[90] flex max-w-[90vw] -translate-x-1/2 items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-[0_16px_40px_-12px_rgba(11,93,42,0.45)] ${
              toast.kind === "ok" ? "bg-green-deep text-white" : "bg-campaignred text-white"
            }`}
            role="status"
          >
            {toast.kind === "ok" ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </ToastCtx.Provider>
  );
}
