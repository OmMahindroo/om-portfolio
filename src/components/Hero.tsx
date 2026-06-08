"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bot } from "lucide-react";

interface HeroProps {
  onInteractAI: () => void;
}

export default function Hero({ onInteractAI }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 overflow-hidden z-10">
      <div className="max-w-4xl w-full text-center space-y-8">
        
        {/* Visual badge: System online */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-950/80 backdrop-blur-md text-emerald-400 text-xs font-mono shadow-inner shadow-emerald-500/5 select-none"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          SYSTEM INTELLIGENCE ACTIVE
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.3 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight font-sans"
        >
          Om Mahindroo
          <span className="block mt-2 text-2xl sm:text-4xl md:text-5xl font-semibold bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
            AI Engineer & Intelligent Systems Developer
          </span>
        </motion.h1>

        {/* Short abstract description */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.45 }}
          className="max-w-2xl mx-auto text-zinc-400 text-base sm:text-lg md:text-xl font-light leading-relaxed"
        >
          Specializing in the orchestration of advanced **Generative AI pipelines**, low-latency **IoT hardware-software fusion**, and robust **decentralized system architectures**.
        </motion.p>

        {/* Call to action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <a
            href="#projects"
            className="group relative flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-zinc-950 font-medium transition-all duration-300 hover:bg-zinc-100 hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] w-full sm:w-auto justify-center"
          >
            View Work
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>

          <button
            onClick={onInteractAI}
            className="group flex items-center gap-2 px-6 py-3.5 rounded-xl border border-zinc-800 bg-zinc-950/70 text-white font-medium backdrop-blur-md transition-all duration-300 hover:border-emerald-500/50 hover:bg-zinc-900 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] hover:scale-[1.03] active:scale-[0.98] w-full sm:w-auto justify-center"
          >
            <Bot className="w-4 h-4 text-emerald-400 group-hover:animate-bounce" />
            Interact with AI
          </button>
        </motion.div>

        {/* Professional Connections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="flex items-center justify-center gap-6 pt-6 text-zinc-500"
        >
          <a
            href="https://github.com/OmMahindroo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-mono transition-colors hover:text-white hover:underline decoration-zinc-700"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.2 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            github/OmMahindroo
          </a>
          <span className="w-1 h-1 rounded-full bg-zinc-800" />
          <a
            href="https://www.linkedin.com/in/om-mahindroo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-mono transition-colors hover:text-white hover:underline decoration-zinc-700"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            linkedin/om-mahindroo
          </a>
        </motion.div>
      </div>

      {/* Decorative backdrop mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse duration-[8000ms]" />
    </section>
  );
}
