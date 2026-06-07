"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

type Locale = "pt-BR" | "en";

interface Translations {
  nav: Record<string, string>;
  hero: { badge: string; tagline: string; cta: string };
  about: { title: string; titleSpan: string; p1: string; p2a: string; p2b: string; p3: string; highlights: string[] };
  tech: { title: string };
  projects: { title: string; titleSpan: string; view: string; code: string; empty: string; fallbackDesc: string };
  contact: { title: string; titleSpan: string; desc: string; click: string };
  footer: { rights: string };
  loading: { text: string };
  journey: {
    subtitle: string;
    s1Title: string;
    s1Institution: string;
    s1Period: string;
    s1Desc: string;
    s2Title: string;
    s2Institution: string;
    s2Period: string;
    s2Desc: string;
  };
}

const translations: Record<Locale, Translations> = {
  "pt-BR": {
    nav: {
      "#hero": "Inicio",
      "#technologies": "Tecnologias",
      "#projects": "Projetos",
      "#contact": "Contato",
      "#journey": "Jornada",
    },
    hero: {
      badge: "Desenvolvedor Full Stack",
      tagline: "Estudante de Ciencia da Computacao. Desenvolvo aplicacoes web, exploro novas tecnologias e transformo ideias em solucoes digitais modernas e eficientes.",
      cta: "Ver Projetos",
    },
    about: {
      title: "Sobre",
      titleSpan: "Mim",
      p1: "Sou um desenvolvedor apaixonado por tecnologia, sempre em busca de evolucao constante. Meu interesse em desenvolvimento de software me impulsiona a criar solucoes criativas e funcionais, transformando ideias em experiencias digitais modernas e impactantes.",
      p2a: "Atraves de projetos pessoais e aprendizado continuo, venho explorando tecnologias como",
      p2b: "sempre aplicando boas praticas de desenvolvimento, performance e experiencia do usuario em cada projeto.",
      p3: "Acredito que a tecnologia tem o poder de transformar vidas e estou comprometido em criar solucoes que facam a diferenca, combinando criatividade, codigo limpo e as melhores ferramentas do mercado.",
      highlights: [
        "Paixao por tecnologia",
        "Evolucao constante",
        "Aprendizado continuo",
        "Projetos pessoais",
      ],
    },
    tech: {
      title: "Tecnologias",
    },
    projects: {
      title: "Meus",
      titleSpan: "Projetos",
      view: "Ver Projeto",
      code: "Codigo",
      empty: "Nenhum repositorio encontrado no momento.",
      fallbackDesc: "Projeto desenvolvido com tecnologias modernas.",
    },
    contact: {
      title: "Entre em",
      titleSpan: "Contato",
      desc: "Vamos trabalhar juntos? Estou aberto a novas oportunidades e colaboracoes.",
      click: "Clique para abrir",
    },
    footer: {
      rights: "Todos os direitos reservados.",
    },
    loading: {
      text: "Carregando...",
    },
    journey: {
      subtitle: "Minha trajetoria na tecnologia.",
      s1Title: "Desenvolvimento de Sistemas",
      s1Institution: "SENAI — Curso Tecnico",
      s1Period: "Jan 2024 — Dez 2025",
      s1Desc: "Formacao tecnica focada em logica de programacao, desenvolvimento de software, banco de dados, Java, desenvolvimento web, versionamento com Git e boas praticas de desenvolvimento.",
      s2Title: "Ciencia da Computacao",
      s2Institution: "Universidade Anhembi Morumbi — Graduacao",
      s2Period: "Jan 2026 — Dez 2029",
      s2Desc: "Graduacao voltada para engenharia de software, algoritmos, estruturas de dados, inteligencia artificial, computacao em nuvem, banco de dados e desenvolvimento de aplicacoes escalaveis.",
    },
  },
  en: {
    nav: {
      "#hero": "Home",
      "#technologies": "Technologies",
      "#projects": "Projects",
      "#contact": "Contact",
      "#journey": "Journey",
    },
    hero: {
      badge: "Full Stack Developer",
      tagline: "Computer Science student. I build web applications, explore new technologies, and turn ideas into modern, efficient digital solutions.",
      cta: "View Projects",
    },
    about: {
      title: "About",
      titleSpan: "Me",
      p1: "I am a developer passionate about technology, always seeking constant evolution. My interest in software development drives me to create creative and functional solutions, turning ideas into modern and impactful digital experiences.",
      p2a: "Through personal projects and continuous learning, I have been exploring technologies such as",
      p2b: "always applying best practices in development, performance, and user experience in every project.",
      p3: "I believe technology has the power to transform lives, and I am committed to creating solutions that make a difference, combining creativity, clean code, and the best tools in the market.",
      highlights: [
        "Passion for technology",
        "Constant evolution",
        "Continuous learning",
        "Personal projects",
      ],
    },
    tech: {
      title: "Technologies",
    },
    projects: {
      title: "My",
      titleSpan: "Projects",
      view: "View Project",
      code: "Code",
      empty: "No repositories found at the moment.",
      fallbackDesc: "Project built with modern technologies.",
    },
    contact: {
      title: "Get in",
      titleSpan: "Touch",
      desc: "Let's work together? I'm open to new opportunities and collaborations.",
      click: "Click to open",
    },
    footer: {
      rights: "All rights reserved.",
    },
    loading: {
      text: "Loading...",
    },
    journey: {
      subtitle: "My journey in technology.",
      s1Title: "Systems Development",
      s1Institution: "SENAI — Technical Course",
      s1Period: "Jan 2024 — Dec 2025",
      s1Desc: "Technical education focused on programming logic, software development, databases, Java, web development, Git versioning, and development best practices.",
      s2Title: "Computer Science",
      s2Institution: "Anhembi Morumbi University — Bachelor's",
      s2Period: "Jan 2026 — Dec 2029",
      s2Desc: "Bachelor's degree focused on software engineering, algorithms, data structures, artificial intelligence, cloud computing, databases, and scalable application development.",
    },
  },
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt-BR");

  useEffect(() => {
    const stored = localStorage.getItem("locale") as Locale | null;
    if (stored && translations[stored]) {
      setLocaleState(stored);
    } else {
      const browserLang = navigator.language;
      const detected = browserLang.startsWith("en") ? "en" : "pt-BR";
      setLocaleState(detected);
      localStorage.setItem("locale", detected);
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
  }, []);

  const value: LanguageContextType = {
    locale,
    setLocale,
    t: translations[locale],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
