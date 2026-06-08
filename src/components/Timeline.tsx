"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Trophy, Award, Calendar } from "lucide-react";
import { resumeData, TimelineEvent } from "../data/resumeData";

export default function Timeline() {
  const getEventIcon = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "education":
        return <GraduationCap className="w-5 h-5 text-cyan-400" />;
      case "achievement":
        return <Trophy className="w-5 h-5 text-amber-400" />;
      case "certification":
        return <Award className="w-5 h-5 text-emerald-400" />;
      default:
        return <GraduationCap className="w-5 h-5 text-zinc-400" />;
    }
  };

  const getBorderColorClass = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "education":
        return "border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.05)]";
      case "achievement":
        return "border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.05)]";
      case "certification":
        return "border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]";
      default:
        return "border-zinc-800";
    }
  };

  const getNodeColorClass = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "education":
        return "bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]";
      case "achievement":
        return "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]";
      case "certification":
        return "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]";
      default:
        return "bg-zinc-700";
    }
  };

  return (
    <section id="timeline" className="relative py-24 px-6 md:px-12 lg:px-24 z-10 bg-zinc-950/10 border-t border-zinc-900/40">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/80 text-cyan-400 text-xs font-mono">
            <Calendar className="w-3.5 h-3.5" />
            CHRONOLOGY
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
            Journey & Achievements
          </h2>
          <p className="max-w-xl mx-auto text-zinc-400 font-light text-sm sm:text-base">
            Chronological log of academic research, national awards, and core industry training.
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l-2 border-zinc-850 ml-4 md:ml-8 space-y-12 py-2">
          {resumeData.timeline.map((event, index) => {
            return (
              <div key={event.title} className="relative pl-8 md:pl-12">
                
                {/* Visual Timeline Node */}
                <div className={`absolute top-1.5 -left-[7px] w-3 h-3 rounded-full ${getNodeColorClass(event.type)}`} />

                {/* Event Card */}
                <motion.div
                  initial={{ opacity: 0, x: -35 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 70, damping: 15, delay: 0.3 + index * 0.12 }}
                  className={`p-6 sm:p-8 rounded-2xl border bg-zinc-900/30 backdrop-blur-md space-y-4 hover:bg-zinc-900/50 hover:border-zinc-700/60 transition-colors duration-300 ${getBorderColorClass(event.type)}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-850">
                        {getEventIcon(event.type)}
                      </div>
                      <div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium tracking-wider bg-zinc-950 border border-zinc-800 text-zinc-400 uppercase">
                          {event.type}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide mt-1">
                          {event.title}
                        </h3>
                      </div>
                    </div>

                    <div className="text-sm font-semibold text-zinc-400 font-mono bg-zinc-950/60 px-3 py-1.5 rounded-lg border border-zinc-850/60 w-fit">
                      {event.year}
                    </div>
                  </div>

                  <div className="border-t border-zinc-850/50 pt-3">
                    <h4 className="text-sm font-semibold text-emerald-400/90 font-mono">
                      {event.subtitle}
                    </h4>
                    <p className="text-sm text-zinc-400 font-light leading-relaxed mt-2">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
