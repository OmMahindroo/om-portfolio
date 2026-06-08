"use client";

import React from "react";
import { Mail, MapPin, Cpu } from "lucide-react";
import { resumeData } from "../data/resumeData";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-6 md:px-12 lg:px-24 border-t border-zinc-900/80 bg-zinc-950 z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        
        {/* Left Side: Name and title */}
        <div className="space-y-3">
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-850 text-emerald-400">
              <Cpu className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold text-white tracking-wide">
              {resumeData.name}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 font-light max-w-sm">
            {resumeData.title}
          </p>
        </div>

        {/* Middle: Contacts */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-zinc-400 font-mono text-xs sm:text-sm">
          <a
            href={`mailto:${resumeData.contact.email}`}
            className="flex items-center gap-2 transition-colors hover:text-white group"
          >
            <Mail className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            {resumeData.contact.email}
          </a>
          <span className="hidden sm:inline w-1 h-1 rounded-full bg-zinc-800" />
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-cyan-400" />
            {resumeData.contact.location}
          </div>
        </div>

        {/* Right Side: Links & Copyright */}
        <div className="space-y-3 md:text-right">
          <div className="flex items-center justify-center md:justify-end gap-4 text-zinc-500">
            <a
              href={resumeData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-zinc-900 bg-zinc-900/30 hover:bg-zinc-900 hover:border-zinc-850 hover:text-white transition-all flex items-center justify-center"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.2 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a
              href={resumeData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-zinc-900 bg-zinc-900/30 hover:bg-zinc-900 hover:border-zinc-850 hover:text-white transition-all flex items-center justify-center"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
          <p className="text-[10px] text-zinc-600 font-light">
            &copy; {currentYear} Om Mahindroo. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
