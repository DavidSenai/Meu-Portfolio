"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import { useLanguage } from "@/contexts/LanguageContext";

const sectionIds = ["#hero", "#journey", "#technologies", "#projects", "#contact"];

function useVisitCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const stored = localStorage.getItem("visitCount");
    const current = stored ? parseInt(stored, 10) : 0;
    const updated = current + 1;
    localStorage.setItem("visitCount", String(updated));
    setCount(updated);
  }, []);
  return count;
}

export default function Navbar() {
  const { locale, setLocale, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#hero");
  const visits = useVisitCount();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    for (const id of sectionIds) {
      const el = document.querySelector(id);
      if (!el) continue;
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActive(id);
            }
          }
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const navLinks = sectionIds.map((id) => ({
    href: id,
    label: t.nav[id],
  }));

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a1a]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <motion.a
            href="#hero"
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold gradient-text"
          >
            DA
          </motion.a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActive(link.href)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                  active === link.href
                    ? "text-blue-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.label}
                {active === link.href && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-blue-500/10 rounded-lg border border-blue-500/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm group hover:border-blue-500/30 hover:shadow-[0_0_12px_rgba(59,130,246,0.15)] transition-all duration-300"
            >
              <FiEye className="w-3 h-3 text-blue-400/70 group-hover:text-blue-400 transition-colors" />
              <span className="text-[11px] font-mono text-gray-400 group-hover:text-blue-300 transition-colors">
                {visits} visitas
              </span>
            </motion.div>

            <button
              onClick={() => setLocale(locale === "pt-BR" ? "en" : "pt-BR")}
              className="relative px-2.5 py-1 text-[11px] font-mono font-medium rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-blue-500/30 hover:shadow-[0_0_10px_rgba(59,130,246,0.1)] transition-all duration-300 overflow-hidden group"
            >
              <motion.span
                key={locale}
                initial={{ y: -12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 12, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="inline-block"
              >
                {locale === "pt-BR" ? "PT" : "EN"}
              </motion.span>
            </button>

            <div className="md:hidden">
              <MobileMenu navLinks={navLinks} setActive={setActive} />
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

function MobileMenu({
  navLinks,
  setActive,
}: {
  navLinks: { href: string; label: string }[];
  setActive: (h: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="relative w-10 h-10 flex items-center justify-center text-white"
        aria-label="Menu"
      >
        <div className="flex flex-col gap-1.5">
          <motion.span
            animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-[2px] bg-white rounded origin-center"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-[2px] bg-white rounded"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-[2px] bg-white rounded origin-center"
          />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[#0a0a1a]/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => { setOpen(false); setActive(link.href); }}
                  className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
