"use client";

import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function ComposerToggle({
  open,
  onToggle,
  showLabel = "Show composer",
  hideLabel = "Hide composer",
}: {
  open: boolean;
  onToggle: () => void;
  showLabel?: string;
  hideLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center gap-2 rounded-full border border-green-deep/20 bg-white px-3 py-1.5 text-xs font-semibold text-green-deep"
    >
      {open ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
      {open ? hideLabel : showLabel}
    </button>
  );
}

export function SlideComposer({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      initial={false}
      animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={open ? "overflow-visible" : "overflow-hidden"}
    >
      {children}
    </motion.div>
  );
}
