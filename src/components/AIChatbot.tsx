"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Terminal, RefreshCw, Sparkles } from "lucide-react";
import { getBotResponse, BotResponse } from "../utils/chatbotEngine";

interface AIChatbotProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
  isStreaming?: boolean;
}

export default function AIChatbot({ isOpen, setIsOpen }: AIChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "Hi! 👋 I am Om's AI Portfolio Assistant. I have deep knowledge of his projects, technical skills, education, and achievements.\n\nHow can I help you today? Feel free to ask me anything or click one of the quick options below:"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([
    "Summarize Om's AI Skills",
    "Tell me about the Drishti Stick",
    "What is the AI Website Builder?",
    "How can I contact Om?"
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Handle message sending
  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    // 1. Add User Message
    const userMsg: ChatMessage = { sender: "user", text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // 2. Fetch answer details from local engine
    const responseData = getBotResponse(textToSend);

    // 3. Simulated network delay (800ms)
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsTyping(false);

    // 4. Stream response character by character
    const fullText = responseData.answer;
    let currentText = "";
    
    // Add an empty streaming bot message
    setMessages((prev) => [...prev, { sender: "bot", text: "", isStreaming: true }]);

    const words = fullText.split(" ");
    let wordIndex = 0;

    const streamInterval = setInterval(() => {
      if (wordIndex < words.length) {
        currentText += (wordIndex === 0 ? "" : " ") + words[wordIndex];
        setMessages((prev) => {
          const next = [...prev];
          const lastIdx = next.length - 1;
          if (next[lastIdx]?.sender === "bot") {
            next[lastIdx] = { sender: "bot", text: currentText, isStreaming: true };
          }
          return next;
        });
        wordIndex++;
      } else {
        clearInterval(streamInterval);
        // Turn off streaming tag
        setMessages((prev) => {
          const next = [...prev];
          const lastIdx = next.length - 1;
          if (next[lastIdx]?.sender === "bot") {
            next[lastIdx] = { sender: "bot", text: fullText };
          }
          return next;
        });
        // Update suggestions
        setCurrentSuggestions(responseData.suggestions);
      }
    }, 25); // Fast fluid text streaming
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend(inputValue);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        sender: "bot",
        text: "Hi! 👋 I am Om's AI Portfolio Assistant. I have deep knowledge of his projects, technical skills, education, and achievements.\n\nHow can I help you today? Feel free to ask me anything or click one of the quick options below:"
      }
    ]);
    setCurrentSuggestions([
      "Summarize Om's AI Skills",
      "Tell me about the Drishti Stick",
      "What is the AI Website Builder?",
      "How can I contact Om?"
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative p-4 rounded-full border shadow-2xl transition-all duration-300 ${
          isOpen
            ? "bg-zinc-950 border-zinc-800 text-zinc-400 rotate-90"
            : "bg-gradient-to-r from-emerald-500 to-cyan-500 border-transparent text-zinc-950 hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]"
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        )}
      </motion.button>

      {/* Expanded Chat Pane */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 150 }}
            className="absolute bottom-20 right-0 w-[90vw] sm:w-[420px] h-[550px] rounded-2xl border border-zinc-800/80 bg-zinc-950/95 backdrop-blur-xl shadow-[0_15px_50px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col z-50"
          >
            {/* Header */}
            <div className="p-4 border-b border-zinc-900 flex items-center justify-between bg-zinc-900/40">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-950 text-emerald-400">
                  <Bot className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    Resume Intelligence
                  </h3>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">
                      Client Sandbox
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleReset}
                  title="Reset Conversation"
                  className="p-1.5 rounded-md hover:bg-zinc-900 text-zinc-500 hover:text-white transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-md hover:bg-zinc-900 text-zinc-500 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-950">
              {messages.map((msg, i) => {
                const isUser = msg.sender === "user";
                return (
                  <div
                    key={i}
                    className={`flex items-start gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    {!isUser && (
                      <div className="p-1 rounded bg-zinc-900 border border-zinc-800 text-emerald-400 shrink-0 mt-0.5">
                        <Terminal className="w-3 h-3" />
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed whitespace-pre-line border font-sans ${
                        isUser
                          ? "bg-zinc-900 border-zinc-800 text-white rounded-tr-none"
                          : "bg-zinc-950 border-zinc-900 text-zinc-300 rounded-tl-none font-light"
                      }`}
                    >
                      {/* Simple formatting handler for header markdown */}
                      {msg.text.split("\n").map((line, idx) => {
                        if (line.startsWith("### ")) {
                          return (
                            <h4 key={idx} className="font-bold text-white text-sm mt-2 mb-1">
                              {line.replace("### ", "")}
                            </h4>
                          );
                        }
                        if (line.startsWith("#### ")) {
                          return (
                            <h5 key={idx} className="font-semibold text-emerald-400 text-xs mt-2 mb-1 font-mono">
                              {line.replace("#### ", "")}
                            </h5>
                          );
                        }
                        return <p key={idx} className="mb-1">{line}</p>;
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Typing State */}
              {isTyping && (
                <div className="flex items-start gap-2.5 justify-start">
                  <div className="p-1 rounded bg-zinc-900 border border-zinc-800 text-emerald-400 shrink-0 mt-0.5">
                    <Terminal className="w-3 h-3" />
                  </div>
                  <div className="bg-zinc-950 border border-zinc-900 text-zinc-500 rounded-2xl rounded-tl-none px-4 py-3 text-xs">
                    <div className="flex items-center gap-1.5 font-mono">
                      <span>Analyzing vector DB</span>
                      <span className="flex gap-0.5">
                        <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce" />
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Suggestions Chips Area */}
            {currentSuggestions.length > 0 && (
              <div className="p-3 border-t border-zinc-900 bg-zinc-950 flex flex-wrap gap-1.5 items-center justify-start max-h-[110px] overflow-y-auto">
                {currentSuggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    disabled={isTyping}
                    className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium border border-zinc-800 bg-zinc-900/40 text-emerald-400 hover:text-white hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3 border-t border-zinc-900 bg-zinc-950/40 flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                placeholder={isTyping ? "Model computing..." : "Query Om's experience..."}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isTyping}
                className="flex-1 bg-zinc-900/60 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/60 focus:bg-zinc-900 transition-all font-sans"
              />
              <button
                onClick={() => handleSend(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:bg-zinc-900 border border-transparent disabled:border-zinc-850 text-zinc-950 disabled:text-zinc-650 transition-all cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
