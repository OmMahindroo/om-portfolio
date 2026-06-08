"use client";

import React, { useState } from "react";
import NeuralCanvas from "../components/NeuralCanvas";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Timeline from "../components/Timeline";
import Footer from "../components/Footer";
import AIChatbot from "../components/AIChatbot";

export default function Home() {
  const [chatbotOpen, setChatbotOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30 selection:text-white overflow-x-hidden scroll-smooth">
      
      {/* 1. Interactive Neural Network Backdrop */}
      <NeuralCanvas />

      {/* Main Content Layout */}
      <main className="relative w-full">
        
        {/* 2. Hero Header Introduction */}
        <Hero onInteractAI={() => setChatbotOpen(true)} />

        {/* 3. Skills Bento Visual Matrix */}
        <Skills />

        {/* 4. Projects Showcase Cards */}
        <Projects />

        {/* 5. Chronology Timeline */}
        <Timeline />

      </main>

      {/* 6. Contact & Footer */}
      <Footer />

      {/* 7. Interactive Floating AI Resume Chatbot terminal */}
      <AIChatbot isOpen={chatbotOpen} setIsOpen={setChatbotOpen} />

    </div>
  );
}
