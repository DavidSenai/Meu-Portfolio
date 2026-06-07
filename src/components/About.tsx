"use client";

import { motion } from "framer-motion";
import {
  FiCode,
  FiTrendingUp,
  FiHeart,
  FiBookOpen,
  FiMapPin,
} from "react-icons/fi";
import { useLanguage } from "@/contexts/LanguageContext";

const highlightIcons = [FiHeart, FiTrendingUp, FiBookOpen, FiCode] as const;
const highlightColors = ["text-red-400", "text-green-400", "text-blue-400", "text-cyan-400"];

export default function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="relative py-24 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/3 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="section-title"
        >
          {t.about.title} <span>{t.about.titleSpan}</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl blur-3xl opacity-30 animate-pulse" />
              <div className="absolute inset-0 rounded-3xl border-2 border-blue-400/30 shadow-[0_0_30px_rgba(59,130,246,0.3)]" />
              <div className="relative w-full h-full rounded-3xl glass flex flex-col items-center justify-center gap-4 p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 pointer-events-none" />
                <div className="relative w-28 h-28 rounded-full overflow-hidden ring-2 ring-blue-400/50 shadow-lg shadow-blue-500/30">
                  <img
                    src="https://avatars.githubusercontent.com/u/168434046?v=4"
                    alt="David Andrade"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center relative">
                  <h3 className="text-xl font-semibold text-white">David Andrade</h3>
                  <p className="text-blue-400 font-mono text-sm mt-1">Full Stack Developer</p>
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-xs relative">
                  <FiMapPin className="w-3 h-3" />
                  <span>Sumare-SP, Brasil</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-gray-300 leading-relaxed text-lg">
              {t.about.p1}
            </p>

            <p className="text-gray-400 leading-relaxed">
              {t.about.p2a} <span className="text-blue-400">React</span>,{" "}
              <span className="text-blue-400">JavaScript</span>,{" "}
              <span className="text-blue-400">IA</span> e{" "}
              <span className="text-blue-400">Node.js</span>, {t.about.p2b}
            </p>

            <p className="text-gray-400 leading-relaxed">
              {t.about.p3}
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              {t.about.highlights.map((label, i) => {
                const Icon = highlightIcons[i];
                return (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm text-gray-300"
                  >
                    <Icon className={`w-4 h-4 ${highlightColors[i]}`} />
                    <span>{label}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
