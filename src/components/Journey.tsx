"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiBook, FiAward } from "react-icons/fi";
import { useLanguage } from "@/contexts/LanguageContext";

const items = [
  {
    icon: FiBook,
    titleKey: "s1Title",
    institutionKey: "s1Institution",
    periodKey: "s1Period",
    descKey: "s1Desc",
  },
  {
    icon: FiAward,
    titleKey: "s2Title",
    institutionKey: "s2Institution",
    periodKey: "s2Period",
    descKey: "s2Desc",
  },
];

export default function Journey() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/3 to-transparent pointer-events-none" />
      <div className="max-w-5xl mx-auto" ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            FORMAÇÃO &{" "}<span className="gradient-text">JORNADA</span>
          </h2>
          <p className="text-gray-400 text-lg">{t.journey.subtitle}</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-[2px] bg-white/5 hidden md:block">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-blue-500 via-cyan-500 to-blue-500 origin-top"
            />
          </div>

          <div className="space-y-12 md:space-y-16">
            {items.map((item, i) => {
              const Icon = item.icon;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={item.titleKey}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      className="group relative"
                    >
                      <div className="absolute -inset-[1px] bg-gradient-to-br from-blue-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-blue-500/20 group-hover:via-cyan-500/10 group-hover:to-blue-500/20 rounded-2xl blur-md transition-all duration-500 opacity-0 group-hover:opacity-100" />
                      <div className="relative glass rounded-2xl p-6 border border-white/5 group-hover:border-blue-500/30 transition-all duration-500">
                        <div className={`flex items-start gap-4 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center shrink-0 group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all duration-500">
                            <Icon className="w-5 h-5 text-blue-400" />
                          </div>
                          <div className={`flex-1 min-w-0 ${isLeft ? "md:text-right" : ""}`}>
                            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                              {(t.journey as Record<string, string>)[item.titleKey]}
                            </h3>
                            <p className="text-blue-400/80 text-sm font-mono mt-1">
                              {(t.journey as Record<string, string>)[item.institutionKey]}
                            </p>
                            <p className="text-gray-500 text-xs mt-1">
                              {(t.journey as Record<string, string>)[item.periodKey]}
                            </p>
                            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                              {(t.journey as Record<string, string>)[item.descKey]}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="hidden md:flex items-center justify-center w-8 shrink-0 relative z-10">
                    <div className="w-4 h-4 rounded-full bg-blue-500 border-[3px] border-[#0a0a1a] shadow-[0_0_12px_rgba(59,130,246,0.5)]" />
                  </div>

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="md:hidden mt-8 space-y-6">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -4 }}
                className="group relative"
              >
                <div className="absolute -inset-[1px] bg-gradient-to-br from-blue-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-blue-500/20 group-hover:via-cyan-500/10 group-hover:to-blue-500/20 rounded-2xl blur-md transition-all duration-500 opacity-0 group-hover:opacity-100" />
                <div className="relative glass rounded-2xl p-5 pl-10 border border-white/5 group-hover:border-blue-500/30 transition-all duration-500">
                  <div className="absolute left-3 top-6 w-3 h-3 rounded-full bg-blue-500 border-[3px] border-[#0a0a1a] shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {(t.journey as Record<string, string>)[item.titleKey]}
                      </h3>
                      <p className="text-blue-400/80 text-xs font-mono mt-1">
                        {(t.journey as Record<string, string>)[item.institutionKey]}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        {(t.journey as Record<string, string>)[item.periodKey]}
                      </p>
                      <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                        {(t.journey as Record<string, string>)[item.descKey]}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
