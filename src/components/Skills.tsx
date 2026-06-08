"use client";

import React, { useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Cpu, Code2, Layers } from "lucide-react";
import { resumeData } from "../data/resumeData";

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 px-6 md:px-12 lg:px-24 z-10 bg-zinc-950/20 border-t border-zinc-900/60">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Title */}
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/80 text-cyan-400 text-xs font-mono">
            <Cpu className="w-3 h-3 animate-spin" />
            VISUAL MATRIX
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
            Technical Capabilities
          </h2>
          <p className="max-w-xl text-zinc-400 font-light text-sm sm:text-base">
            Bento-grid distribution of skills across artificial intelligence, systems coding, and web environments.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resumeData.skills.map((categoryObj, index) => {
            const icons = [Cpu, Code2, Layers];
            const IconComponent = icons[index % icons.length];
            const isFirst = index === 0;

            const gridClass = isFirst 
              ? "md:col-span-2 md:row-span-1" 
              : "md:col-span-1";

            return (
              <GlowCard 
                key={categoryObj.category}
                className={`${gridClass} group relative p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-md overflow-hidden transition-colors duration-500 hover:bg-zinc-900/60`}
                glowColor={isFirst ? "rgba(16,185,129,0.12)" : index === 1 ? "rgba(6,182,212,0.12)" : "rgba(59,130,246,0.12)"}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              >
                <div className="space-y-6 h-full flex flex-col justify-between relative z-10">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl border border-zinc-800 bg-zinc-950 ${
                        isFirst 
                          ? "text-emerald-400 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]" 
                          : index === 1 
                          ? "text-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]" 
                          : "text-blue-400 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                      } transition-all duration-300`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-semibold text-white tracking-wide">
                        {categoryObj.category}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                      {isFirst 
                        ? "Deep neural layers, language engineering models, and inferencing architecture optimizations."
                        : index === 1
                        ? "Core language foundations spanning systems engineering to responsive application layers."
                        : "Distributed hosting, web servers, state synchronization, and styling tools."}
                    </p>
                  </div>

                  {/* Skills tags list */}
                  <div className="flex flex-wrap gap-2.5 pt-4">
                    {categoryObj.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-950 border border-zinc-800 text-zinc-300 transition-all duration-300 hover:border-zinc-700 hover:text-white select-none"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Glowing Interactive Card Wrapper
interface GlowCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

function GlowCard({ children, className, glowColor = "rgba(56,189,248,0.1)", ...props }: GlowCardProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      className={`${className}`}
      {...props}
    >
      {/* Glow Overlay */}
      {isFocused && (
        <div
          className="pointer-events-none absolute -inset-px transition duration-300 rounded-2xl animate-fade-in"
          style={{
            background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 70%)`
          }}
        />
      )}
      {children}
    </motion.div>
  );
}
