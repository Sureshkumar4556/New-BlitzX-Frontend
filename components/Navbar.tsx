"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || open ? "bg-void/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt="BlitzXCreatives" width={32} height={32} className="h-8 w-8" />
          <span className="font-display text-xl font-extrabold tracking-tight">
            <span className="text-chrome-gradient">BlitzX</span>
            <span className="text-bolt-gradient">Creatives</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 font-body text-sm text-chrome-300 md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="transition-colors hover:text-chrome-100">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <a href="/login" className="font-body text-sm text-chrome-300 hover:text-chrome-100">
            Log in
          </a>
          <a
            href="/register"
            className="rounded-sm bg-bolt-gradient px-4 py-2 font-body text-sm font-semibold text-void shadow-bolt-glow transition-transform hover:scale-[1.03]"
          >
            Get Started
          </a>
        </div>

        {/* Hamburger — mobile only */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="h-[2px] w-6 origin-center bg-chrome-100"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="h-[2px] w-6 bg-chrome-100"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="h-[2px] w-6 origin-center bg-chrome-100"
          />
        </button>
      </nav>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/5 bg-void/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-6 font-body text-base text-chrome-300">
              {links.map((l, i) => (
                <motion.li
                  key={l.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/5 py-3 transition-colors hover:text-chrome-100"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 px-6 pb-8">
              <a
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-sm border border-white/15 px-4 py-3 text-center font-body text-sm font-semibold text-chrome-100"
              >
                Log in
              </a>
              <a
                href="/register"
                onClick={() => setOpen(false)}
                className="rounded-sm bg-bolt-gradient px-4 py-3 text-center font-body text-sm font-semibold text-void shadow-bolt-glow"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
