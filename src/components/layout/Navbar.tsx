"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/manifesto", label: "Manifesto" },
  { href: "/analytics", label: "Analytics" },
  { href: "/media", label: "Media" },
  { href: "/gallery", label: "Gallery" },
  { href: "/join", label: "Join Us" },
];

const drawerTransition = { type: "spring" as const, damping: 30, stiffness: 240, mass: 0.9 };

const itemVariants = {
  hidden: { opacity: 0, x: 40, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.18 + i * 0.06,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
  exit: { opacity: 0, x: 20, transition: { duration: 0.15 } },
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="flag-stripe fixed top-0 z-[9999]" />

      <header className={`fixed top-1 z-[9998] w-full transition-all duration-300 ${scrolled || open ? "bg-green-forest/95 shadow-lg backdrop-blur-md" : "bg-transparent"}`}>
        <nav className="container-x flex h-20 items-center justify-between">
          <Link href="/" className="relative z-50 flex items-center gap-3">
            <Image src="/logo.png" alt="R-SPLM/F" width={48} height={48} className="rounded-full bg-white p-0.5" />
            <div className="hidden flex-col sm:flex">
              <span className="font-display text-lg font-bold leading-none text-white">R-SPLM/F</span>
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold">People First</span>
            </div>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`group relative text-sm font-medium transition-colors ${
                    active ? "text-gold" : "text-white/90 hover:text-gold"
                  }`}
                >
                  {l.label}

                  {/* Hover underline  grows from center */}
                  <span
                    className="pointer-events-none absolute -bottom-1.5 left-0 right-0 h-0.5 origin-center scale-x-0 rounded-full bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100"
                    aria-hidden="true"
                  />

                  {/* Active-page underline  slides between links */}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-gold"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Link href="/donate" className="hidden rounded-full bg-campaignred px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#A00D25] shadow-[0_8px_24px_-8px_rgba(200,16,46,0.5)] sm:inline-flex sm:items-center sm:gap-2">
              <Heart className="h-4 w-4" fill="white" stroke="white" /> Donate
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 lg:hidden"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[9996] bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            />

            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={drawerTransition}
              className="fixed right-0 top-0 z-[9997] h-screen w-[85%] max-w-sm overflow-y-auto bg-green-forest shadow-2xl lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Drawer header with X */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-green-forest/95 px-6 py-5 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <Image src="/logo.png" alt="R-SPLM/F" width={36} height={36} className="rounded-full bg-white p-0.5" />
                  <div className="flex flex-col">
                    <span className="font-display text-sm font-bold leading-none text-white">R-SPLM/F</span>
                    <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-gold">People First</span>
                  </div>
                </div>
                <motion.button
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  transition={{ delay: 0.1, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-gold hover:text-ink active:scale-95"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              <div className="flex flex-col px-6 pt-8 pb-12">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-gold"
                >
                  Menu
                </motion.div>

                <nav className="flex flex-col gap-1">
                  {links.map((l, i) => {
                    const active = pathname === l.href;
                    return (
                      <motion.div
                        key={l.href}
                        custom={i}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <Link
                          href={l.href}
                          className={`group flex items-center justify-between rounded-2xl px-4 py-4 text-lg font-semibold transition-colors ${active ? "bg-gold/15 text-gold" : "text-white hover:bg-white/5 hover:text-gold"}`}
                        >
                          {l.label}
                          <span className={`transition-transform duration-300 group-hover:translate-x-1 ${active ? "text-gold" : "text-white/40"}`}></span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                <motion.div
                  custom={links.length}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="mt-10"
                >
                  <Link
                    href="/donate"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-campaignred px-6 py-4 font-semibold text-white shadow-[0_12px_32px_-8px_rgba(200,16,46,0.6)] transition-all hover:bg-[#A00D25]"
                  >
                    <Heart className="h-4 w-4" fill="white" stroke="white" /> Donate Now
                  </Link>

                  <div className="mt-8 border-t border-white/10 pt-6 text-center">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
                      Next President  South Sudan 2026
                    </div>
                    <div className="mt-1 font-display text-sm font-bold text-white">
                      Hon. Nathaniel Garang&apos; Aduotdit
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}