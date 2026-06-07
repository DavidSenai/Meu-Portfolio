"use client";

import { motion } from "framer-motion";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiPython,
  SiGit,
  SiGithub,
  SiMysql,
  SiOpenjdk,
} from "react-icons/si";
import { useLanguage } from "@/contexts/LanguageContext";

const techs = [
  { name: "HTML", icon: SiHtml5, color: "#e34f26" },
  { name: "CSS", icon: SiCss, color: "#1572b6" },
  { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
  { name: "React", icon: SiReact, color: "#61dafb" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Python", icon: SiPython, color: "#3776ab" },
  { name: "Java", icon: SiOpenjdk, color: "#b07219" },
  { name: "Git", icon: SiGit, color: "#f05032" },
  { name: "GitHub", icon: SiGithub, color: "#ffffff" },
  { name: "MySQL", icon: SiMysql, color: "#4479a1" },
];

export default function Technologies() {
  const { t } = useLanguage();
  return (
    <section id="technologies" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="section-title"
        >
          {t.tech.title}
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-4">
          {techs.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group relative"
              >
                <div className="glass rounded-2xl p-5 sm:p-6 text-center transition-all duration-300 h-full flex flex-col items-center justify-center gap-3 w-28 sm:w-32 border border-transparent hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-xl bg-current opacity-0 group-hover:opacity-10 blur-lg transition-opacity duration-300" style={{ color: tech.color }} />
                    <Icon
                      className="w-8 h-8 sm:w-10 sm:h-10 transition-all duration-300 group-hover:scale-110"
                      style={{ color: tech.color }}
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                    {tech.name}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
