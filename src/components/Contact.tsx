"use client";

import { motion } from "framer-motion";
import { FiLinkedin, FiGithub } from "react-icons/fi";

const contacts = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/david-andrade-2085b1322/",
    icon: FiLinkedin,
  },
  {
    name: "GitHub",
    url: "https://github.com/DavidSenai",
    icon: FiGithub,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 px-4">
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="section-title"
        >
          Entre em <span>Contato</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 text-center text-lg mb-12 max-w-xl mx-auto"
        >
          Vamos trabalhar juntos? Estou aberto a novas oportunidades e colaboracoes.
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap justify-center gap-6"
        >
          {contacts.map((contact) => {
            const Icon = contact.icon;
            return (
              <motion.a
                key={contact.name}
                href={contact.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={cardVariants}
                whileHover={{ scale: 1.05, y: -6 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-[280px]"
              >
                <div className="absolute -inset-[1px] bg-gradient-to-br from-blue-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-blue-500/30 group-hover:via-cyan-500/20 group-hover:to-blue-500/30 rounded-2xl blur-md transition-all duration-500 opacity-0 group-hover:opacity-100" />
                <div className="relative glass rounded-2xl p-8 flex flex-col items-center gap-5 border border-white/5 group-hover:border-blue-500/30 transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all duration-500">
                    <Icon className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-500" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-500">
                      {contact.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Clique para abrir</p>
                  </div>
                  <div className="w-full h-[2px] bg-gradient-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
