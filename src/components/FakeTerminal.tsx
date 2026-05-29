"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

const codeLines = [
  { text: "function helloWorld() {", indent: false },
  { text: 'console.log("Hello World");', indent: true },
  { text: "}", indent: false },
  { text: "", indent: false },
  { text: "helloWorld();", indent: false },
];

export default function FakeTerminal() {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [typing, setTyping] = useState(false);
  const [done, setDone] = useState(false);

  const typeLine = useCallback(
    (full: string, lineIndex: number) =>
      new Promise<void>((resolve) => {
        let charIndex = 0;
        setTyping(true);
        const interval = setInterval(() => {
          charIndex++;
          setDisplayed((prev) => {
            const updated = [...prev];
            updated[lineIndex] = full.slice(0, charIndex);
            return updated;
          });
          if (charIndex >= full.length) {
            clearInterval(interval);
            setTyping(false);
            resolve();
          }
        }, 35);
      }),
    []
  );

  useEffect(() => {
    (async () => {
      for (let i = 0; i < codeLines.length; i++) {
        const line = codeLines[i];
        setDisplayed((prev) => [...prev, ""]);
        await new Promise((r) => setTimeout(r, 200));
        if (line.text) {
          await typeLine(line.text, i);
        }
        await new Promise((r) => setTimeout(r, 100));
      }
      setDone(true);
    })();
  }, [typeLine]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      className="w-full max-w-md mx-auto"
    >
      <div className="relative rounded-xl overflow-hidden bg-[#0d1117] border border-[#30363d] shadow-lg shadow-blue-500/5">
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#30363d] bg-[#161b22]">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-[8px] tracking-widest text-[#8b949e] uppercase font-mono">bash</span>
        </div>
        <div className="p-5 font-mono text-sm leading-relaxed min-h-[160px]">
          {displayed.map((line, i) => (
            <div key={i} className="flex">
              <span className="text-[#8b949e] mr-3 select-none w-4 text-right shrink-0">
                {i + 1}
              </span>
              <span className={`text-[#e6edf3] ${codeLines[i]?.indent ? "ml-4" : ""}`}>
                {line || " "}
              </span>
            </div>
          ))}
          {!done && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="inline-block w-[6px] h-4 bg-[#58a6ff] align-middle ml-0.5"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
