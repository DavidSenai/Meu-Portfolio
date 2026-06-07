"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiExternalLink, FiGithub, FiFolder } from "react-icons/fi";
import { useLanguage } from "@/contexts/LanguageContext";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  language: string;
}

const repoSlugs = ["EstacaoAkira", "controle-do-mes", "sistema-folha-pagamento-java", "FinanceFlow"];

const repoDescriptions: Record<string, string> = {
  "EstacaoAkira": "App mobile para monitoramento climatico aos agricultores.",
  "controle-do-mes": "App de controle financeiro pessoal com dashboard interativo e categorizacao de gastos.",
  "sistema-folha-pagamento-java": "Sistema de folha de pagamento completo em Java com interface desktop.",
  "FinanceFlow": "App de controle financeiro com chatbot integrado e dashboard interativo.",
};

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Java: "#b07219",
  HTML: "#e34f26",
  CSS: "#1572b6",
};

export default function Projects() {
  const { t } = useLanguage();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(
      repoSlugs.map((slug) =>
        fetch(`https://api.github.com/repos/DavidSenai/${slug}`)
          .then((res) => (res.ok ? res.json() : null))
          .catch(() => null)
      )
    ).then((results) => {
      const valid = results.filter((r): r is Repo => r !== null);
      setRepos(valid);
      setLoading(false);
    });
  }, []);

  return (
    <section id="projects" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="section-title"
        >
          {t.projects.title} <span>{t.projects.titleSpan}</span>
        </motion.h2>

        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="glass rounded-2xl p-6 animate-pulse">
                <div className="w-10 h-10 rounded-xl bg-white/5 mb-4" />
                <div className="h-5 bg-white/5 rounded w-3/4 mb-3" />
                <div className="h-4 bg-white/5 rounded w-full mb-2" />
                <div className="h-4 bg-white/5 rounded w-2/3 mb-4" />
                <div className="flex gap-2 mb-4">
                  <div className="h-6 bg-white/5 rounded-full w-16" />
                  <div className="h-6 bg-white/5 rounded-full w-20" />
                </div>
                <div className="flex gap-3">
                  <div className="h-10 bg-white/5 rounded-xl flex-1" />
                  <div className="h-10 bg-white/5 rounded-xl flex-1" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, i) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="absolute -inset-[1px] bg-gradient-to-br from-blue-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-blue-500/30 group-hover:via-cyan-500/20 group-hover:to-blue-500/30 rounded-2xl blur-sm transition-all duration-500 opacity-0 group-hover:opacity-100" />
                <div className="glass glass-hover rounded-2xl p-6 h-full flex flex-col transition-all duration-300 border border-transparent hover:border-blue-500/30 relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                      <FiFolder className="w-5 h-5 text-blue-400" />
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors capitalize">
                    {repo.name.replace(/-/g, " ")}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 flex-1 leading-relaxed">
                    {repoDescriptions[repo.name] || repo.description || t.projects.fallbackDesc}
                  </p>

                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {repo.topics.slice(0, 4).map((topic) => (
                        <span
                          key={topic}
                          className="px-2.5 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}

                  {repo.language && repo.name !== "controle-do-mes" && repo.name !== "sistema-folha-pagamento-java" && (
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          backgroundColor:
                            languageColors[repo.language] || "#8b5cf6",
                        }}
                      />
                      <span className="text-xs text-gray-500">{repo.language}</span>
                    </div>
                  )}

                  <div className="flex gap-3 mt-auto">
                    {repo.homepage && (
                      <motion.a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl"
                      >
                        <FiExternalLink className="w-4 h-4" />
                        {t.projects.view}
                      </motion.a>
                    )}
                    <motion.a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium glass glass-hover text-gray-300 rounded-xl ${
                        repo.homepage ? "" : "flex-1"
                      }`}
                    >
                      <FiGithub className="w-4 h-4" />
                      {t.projects.code}
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && repos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-500">
              {t.projects.empty}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
