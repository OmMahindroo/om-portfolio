"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, Calendar, Award, ShieldAlert, Cpu, Sparkles, Database, ShieldCheck, ChevronDown, ExternalLink } from "lucide-react";
import { resumeData, Project } from "../data/resumeData";

export default function Projects() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Associate icons with projects for a higher visual tier
  const getProjectIcon = (title: string) => {
    if (title.toLowerCase().includes("website")) return <Sparkles className="w-5 h-5 text-emerald-400" />;
    if (title.toLowerCase().includes("dhrishti")) return <Cpu className="w-5 h-5 text-amber-400" />;
    if (title.toLowerCase().includes("voting")) return <ShieldCheck className="w-5 h-5 text-cyan-400" />;
    return <Database className="w-5 h-5 text-blue-400" />;
  };

  return (
    <section id="projects" className="relative py-24 px-6 md:px-12 lg:px-24 z-10">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/80 text-emerald-400 text-xs font-mono">
              <FolderGit2 className="w-3.5 h-3.5" />
              INTELLIGENT SYSTEMS PORTFOLIO
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
              Selected Projects
            </h2>
            <p className="max-w-xl text-zinc-400 font-light text-sm sm:text-base">
              A curated collection of production builds. Click any card to expand deep architectural metrics and technical specs.
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-6">
          {resumeData.projects.map((project, index) => {
            const isExpanded = expandedIndex === index;
            const hasPatent = !!project.patentStatus;

            return (
              <motion.div
                key={project.title}
                layout="position"
                transition={{ type: "spring", stiffness: 100, damping: 18 }}
                className={`relative rounded-2xl border ${
                  isExpanded 
                    ? "border-zinc-700/80 bg-zinc-900/50" 
                    : "border-zinc-800/80 bg-zinc-900/30 hover:border-zinc-700/50 hover:bg-zinc-900/40"
                } backdrop-blur-md overflow-hidden transition-all duration-300`}
              >
                {/* Top decorative line */}
                {isExpanded && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500" />
                )}

                {/* Primary Card View (Header and info) */}
                <div 
                  onClick={() => toggleExpand(index)}
                  className="p-6 sm:p-8 cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-6 select-none"
                >
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800">
                        {getProjectIcon(project.title)}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide flex items-center gap-2">
                        {project.title}
                      </h3>
                      {hasPatent && (
                        <span className="px-2.5 py-0.5 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400 text-[10px] font-mono tracking-wider">
                          {project.patentStatus}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-emerald-400/95 font-mono">
                      {project.tagline}
                    </p>
                    <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-3xl">
                      {project.description}
                    </p>
                  </div>

                  {/* Summary Metrics & Toggle */}
                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t border-zinc-800/40 md:border-t-0 pt-4 md:pt-0">
                    <div className="flex gap-4 sm:gap-6">
                      {project.metrics.slice(0, 2).map((m) => (
                        <div key={m.label} className="text-left">
                          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                            {m.label}
                          </div>
                          <div className="text-base font-bold text-white">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className={`p-2 rounded-full border border-zinc-800 bg-zinc-950 text-zinc-400 transition-transform duration-300 ${
                      isExpanded ? "rotate-185 text-emerald-400 border-emerald-500/20" : "group-hover:text-white"
                    }`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Expanded Architectural Details */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-8 sm:px-8 sm:pb-8 border-t border-zinc-800/60 space-y-6 pt-6">
                        
                        {/* Long description */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                            System Architecture & Overview
                          </h4>
                          <p className="text-sm text-zinc-300 font-light leading-relaxed">
                            {project.longDescription}
                          </p>
                        </div>

                        {/* Bullet points & metrics */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          
                          {/* Deep technical details */}
                          <div className="lg:col-span-2 space-y-3">
                            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                              Core Implementations
                            </h4>
                            <ul className="space-y-2.5">
                              {project.bulletPoints.map((bp, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                                  {bp}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Detailed Metrics Panel */}
                          <div className="rounded-xl border border-zinc-850 bg-zinc-950/60 p-5 space-y-4 h-fit">
                            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                              Engineering Metrics
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                              {project.metrics.map((m) => (
                                <div key={m.label} className="border-b border-zinc-900 pb-2">
                                  <div className="text-[10px] font-mono text-zinc-500 uppercase">
                                    {m.label}
                                  </div>
                                  <div className="text-lg font-bold text-white mt-1">
                                    {m.value}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Tech Stack Chips */}
                            <div className="pt-2 space-y-2">
                              <div className="text-[10px] font-mono text-zinc-500 uppercase">
                                Tech Stack
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {project.techStack.map((tech) => (
                                  <span 
                                    key={tech} 
                                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
