import { resumeData } from "../data/resumeData";

export interface BotResponse {
  answer: string;
  topic: string;
  suggestions: string[];
}

export function getBotResponse(userMessage: string): BotResponse {
  const query = userMessage.toLowerCase().trim();
  const words = query.split(/[\s,?.!/\\()\[\]{}#:]+/);

  // Helper matching functions
  const containsAny = (keywords: string[]) => keywords.some(k => query.includes(k));

  // 1. Projects - AI Website Builder
  if (containsAny(["website builder", "web builder", "builder", "gpt-4o", "generative ai", "code generation", "llm project"])) {
    const proj = resumeData.projects.find(p => p.title.includes("Website Builder"));
    return {
      answer: `### **${proj?.title}** (${proj?.tagline})
${proj?.longDescription}

**Live Demo URL:** [aiweb-builder.netlify.app](${proj?.liveUrl})

**Technical Bullet Points:**
${proj?.bulletPoints.map(bp => `- ${bp}`).join("\n")}

**Key Performance Metrics:**
${proj?.metrics.map(m => `- **${m.label}**: ${m.value}`).join("\n")}

**Tech Stack:** \`${proj?.techStack.join("`, `")}\``,
      topic: "AI Website Builder",
      suggestions: ["Tell me about Drishti Stick", "What is Om's experience with Python?", "Show all projects"]
    };
  }

  // 2. Projects - Drishti Stick
  if (containsAny(["drishti", "dhrishtti", "dhrishti", "stick", "iot", "assistive", "sensor", "esp32", "hardware", "patent"])) {
    const proj = resumeData.projects.find(p => p.title.toLowerCase().includes("dhrishti"));
    return {
      answer: `### **${proj?.title}** *(Patent Pending)* - ${proj?.tagline}
${proj?.longDescription}

**Technical Bullet Points:**
${proj?.bulletPoints.map(bp => `- ${bp}`).join("\n")}

**Key Performance Metrics:**
${proj?.metrics.map(m => `- **${m.label}**: ${m.value}`).join("\n")}

**Tech Stack:** \`${proj?.techStack.join("`, `")}\``,
      topic: "DHRISHTI STICK",
      suggestions: ["Summarize Om's AI Skills", "Tell me about XZIBIT 2026", "What is the AI Website Builder?"]
    };
  }

  // 3. Projects - Blockchain Voting System
  if (containsAny(["blockchain", "voting", "solidity", "ethereum", "smart contract", "decentralized voting"])) {
    const proj = resumeData.projects.find(p => p.title.toLowerCase().includes("voting"));
    return {
      answer: `### **${proj?.title}** (${proj?.tagline})
${proj?.longDescription}

**Technical Highlights:**
${proj?.bulletPoints.map(bp => `- ${bp}`).join("\n")}

**Key Metrics:**
${proj?.metrics.map(m => `- **${m.label}**: ${m.value}`).join("\n")}

**Tech Stack:** \`${proj?.techStack.join("`, `")}\``,
      topic: "Blockchain Voting",
      suggestions: ["Decentralized Cloud Storage", "Tell me about the Drishti Stick", "What languages does he know?"]
    };
  }

  // 4. Projects - Decentralized Cloud Storage
  if (containsAny(["storage", "cloud storage", "ipfs", "p2p", "aes-256", "cryptographic storage"])) {
    const proj = resumeData.projects.find(p => p.title.toLowerCase().includes("storage"));
    return {
      answer: `### **${proj?.title}** (${proj?.tagline})
${proj?.longDescription}

**Technical Highlights:**
${proj?.bulletPoints.map(bp => `- ${bp}`).join("\n")}

**Key Metrics:**
${proj?.metrics.map(m => `- **${m.label}**: ${m.value}`).join("\n")}

**Tech Stack:** \`${proj?.techStack.join("`, `")}\``,
      topic: "Decentralized Cloud Storage",
      suggestions: ["Blockchain Voting System", "Summarize Om's AI Skills", "View Education"]
    };
  }

  // 5. Skills - Core AI/ML
  if (containsAny(["ai", "ml", "machine learning", "deep learning", "nlp", "yolov8", "cnn", "gan", "models", "prompt engineering", "inference", "ollama", "claude", "assistants", "agents"])) {
    const aiSkills = resumeData.skills.find(s => s.category.includes("Core AI"))?.skills || [];
    return {
      answer: `### **Core AI/ML Expertise**
Om specializes in prompt engineering, context management, local LLM serving, and model optimization:

${aiSkills.map(s => `- **${s}**`).join("\n")}

*Om is experienced in context engineering using Claude Code & Cursor workspace tools, managing local LLMs via Ollama, fine-tuning, and running model inference optimizations.*`,
      topic: "AI/ML Skills",
      suggestions: ["Show Data & Machine Learning skills", "Tell me about the AI Website Builder", "What programming languages does he know?"]
    };
  }

  // 6. Skills - Languages
  if (containsAny(["languages", "programming language", "python", "typescript", "c++", "sql", "code"]) || words.includes("c")) {
    const langSkills = resumeData.skills.find(s => s.category === "Languages")?.skills || [];
    return {
      answer: `### **Programming Languages**
Om is highly proficient in both high-level rapid-application languages and lower-level system programming:

${langSkills.map(s => `- **${s}**`).join("\n")}

*Python is his primary driver for AI/ML modeling, TypeScript/SQL for web infrastructure, and C/C++ for low-latency firmware development on microcontrollers like ESP32.*`,
      topic: "Programming Languages",
      suggestions: ["Show core AI/ML skills", "What is the Drishti Stick?", "Tell me about KC College"]
    };
  }

  // 7. Skills - Infrastructure & Web
  if (containsAny(["infrastructure", "web", "next.js", "nextjs", "node", "express", "tailwind", "ui", "react", "shadcn", "docker", "git"])) {
    const webSkills = resumeData.skills.find(s => s.category.includes("Infrastructure"))?.skills || [];
    return {
      answer: `### **Infrastructure & Web Technologies**
Om designs responsive frontends and secure backends to support high-traffic AI services:

${webSkills.map(s => `- **${s}**`).join("\n")}

*His web development focus is on React/Next.js for aesthetic and interactive user experiences, combined with Express/Node.js for backend microservices and data pipelines.*`,
      topic: "Infrastructure & Web Skills",
      suggestions: ["What projects has he built?", "Summarize Om's AI Skills", "Tell me about his education"]
    };
  }

  // 12. Skills - Data Science & Machine Learning
  if (containsAny(["data science", "data wrangling", "eda", "exploratory data", "xgboost", "random forest", "pca", "dimension", "feature engineering", "rag", "vector database", "vector db", "pinecone", "chroma", "hugging face", "huggingface", "statistics", "calculus", "probability", "linear algebra"])) {
    const dsSkills = resumeData.skills.find(s => s.category.includes("Data & Machine"))?.skills || [];
    return {
      answer: `### **Data Science & Machine Learning**
Om holds strong experience in data preprocessing, exploratory analysis, and training classical ML ensembles:

${dsSkills.map(s => `- **${s}**`).join("\n")}

*He applies solid statistical modeling, linear algebra, vector databases (Chroma/Pinecone), RAG architectures, and custom feature engineering pipelines to enhance ML model accuracy.*`,
      topic: "Data Science & ML Skills",
      suggestions: ["Show core AI/ML skills", "What projects has he built?", "How can I contact Om?"]
    };
  }

  // 8. Education & Timeline
  if (containsAny(["education", "kc college", "college", "university", "student", "degree", "computer engineering", "gpa", "timeline"])) {
    const edu = resumeData.timeline.find(t => t.type === "education");
    return {
      answer: `### **Education Profile**
Om is currently completing his Bachelor of Engineering degree:

- **Institution:** ${edu?.title}
- **Degree:** ${edu?.subtitle}
- **Duration:** ${edu?.year}
- **Focus Areas:** ${edu?.description}
- **Location:** KanjurMarg, Mumbai`,
      topic: "Education",
      suggestions: ["What awards has he won?", "Show all projects", "Summarize Om's AI Skills"]
    };
  }

  // 9. Achievements & Certifications
  if (containsAny(["achievements", "certifications", "awards", "xzibit", "xzibit 2026", "runner-up", "national level", "nlp cert", "blockchain cert"])) {
    const certsAndAwards = resumeData.timeline.filter(t => t.type === "achievement" || t.type === "certification");
    return {
      answer: `### **Achievements & Industry Certifications**

${certsAndAwards.map(item => `#### **${item.title}** (${item.year})
*${item.subtitle}*
${item.description}`).join("\n\n")}`,
      topic: "Achievements & Certs",
      suggestions: ["Tell me about the Drishti Stick", "What projects has he built?", "How can I contact Om?"]
    };
  }

  // 10. Contact Info
  if (containsAny(["contact", "cintact", "conatct", "email", "mail", "phone", "location", "address", "linkedin", "github", "hire", "resume", "tact", "connect"])) {
    return {
      answer: `### **Contact & Professional Links**
You can connect with Om Mahindroo directly via:

- 📧 **Email:** [mahindrooom@gmail.com](mailto:mahindrooom@gmail.com)
- 📍 **Location:** ${resumeData.contact.location}
- 💼 **LinkedIn:** [Om Mahindroo](${resumeData.contact.linkedin})
- 💻 **GitHub:** [OmMahindroo](${resumeData.contact.github})

*Om is open to full-time opportunities, research collaborations, and internships in AI & intelligent systems development!*`,
      topic: "Contact Details",
      suggestions: ["Summarize Om's AI Skills", "Tell me about the AI Website Builder", "What programming languages does he know?"]
    };
  }

  // 11. Projects Overview
  if (containsAny(["projects", "work", "portfolio", "showcase", "built"])) {
    return {
      answer: `### **Om's Projects Portfolio**
Om has engineered high-fidelity projects across multiple domains:

1. **AI - Website Builder**: A code generator pipeline using GPT-4o to stream functional Tailwind websites.
2. **DHRISHTI STICK (Patent Pending)**: An assistive smart IoT device using multi-sensor fusion on an ESP32 microchip.
3. **Blockchain Voting System**: A secure, decentralized web application for transparent ballot verification.
4. **Decentralized Cloud Storage**: A peer-to-peer AES-256 encrypted storage vault.

*Type any project name to query full architectural details, metrics, and technical bullet points!*`,
      topic: "Projects Overview",
      suggestions: ["Tell me about the AI Website Builder", "Tell me about the Drishti Stick", "Summarize Om's AI Skills"]
    };
  }

  // Fallback
  return {
    answer: `Hi there! 👋 I am Om's AI Portfolio Assistant. I have deep knowledge of his projects, technical skills, education, and achievements.

How can I help you today? You can type a question, or click one of the quick options below:`,
    topic: "Introduction",
    suggestions: [
      "Summarize Om's AI Skills",
      "Tell me about the Drishti Stick",
      "What is the AI Website Builder?",
      "How can I contact Om?"
    ]
  };
}
