"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
      }}
      className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/80 hover:border-gold hover:text-gold"
    >
      Sign out
    </button>
  );
}
