export interface Project {
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  bulletPoints: string[];
  patentStatus?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface TimelineEvent {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  type: 'education' | 'achievement' | 'certification';
}

export interface ResumeData {
  name: string;
  title: string;
  tagline: string;
  contact: {
    email: string;
    location: string;
    github: string;
    linkedin: string;
  };
  skills: SkillCategory[];
  projects: Project[];
  timeline: TimelineEvent[];
}

export const resumeData: ResumeData = {
  name: "Om Mahindroo",
  title: "AI Engineer & Intelligent Systems Developer",
  tagline: "Building aesthetic, high-performance systems at the intersection of Generative AI, IoT, and Decentralized Networks.",
  contact: {
    email: "mahindrooom@gmail.com",
    location: "KanjurMarg, Mumbai, 400042",
    github: "https://github.com/OmMahindroo",
    linkedin: "https://www.linkedin.com/in/om-mahindroo"
  },
  skills: [
    {
      category: "Core AI/ML",
      skills: [
        "Large Language Models (LLMs)",
        "OpenAI GPT-4o API",
        "YOLOv8",
        "CNNs & GANs",
        "Prompt Engineering",
        "Model Inference Optimization"
      ]
    },
    {
      category: "Languages",
      skills: ["Python", "TypeScript", "SQL", "C++", "C"]
    },
    {
      category: "Infrastructure & Web",
      skills: ["Next.js", "Node.js", "Express", "Tailwind CSS", "shadcn/ui", "Git & Docker"]
    }
  ],
  projects: [
    {
      title: "AI - Website Builder",
      tagline: "Generative AI Code Pipeline",
      description: "A state-of-the-art Generative AI pipeline utilizing OpenAI's GPT-4o model to turn natural language instructions into fully functional structured code in real-time.",
      longDescription: "Engineered an intelligent website creation platform using Next.js. The backend harnesses the GPT-4o engine via custom prompt flows, managing multi-step code generation. Implemented visual trees, automated preview renders, and granular state synchronization.",
      techStack: ["Next.js", "TypeScript", "OpenAI GPT-4o API", "Node.js", "Tailwind CSS", "Zustand"],
      metrics: [
        { label: "Generation Speed", value: "< 4.5s" },
        { label: "Code Accuracy", value: "94.2%" },
        { label: "User Satisfaction", value: "4.8/5" }
      ],
      bulletPoints: [
        "Architected an prompt execution environment optimized to generate clean, compilation-free JSX/TSX layout code.",
        "Implemented real-time component streaming and visual trees rendering on the client side.",
        "Integrated dynamic state preservation and recursive component adjustments.",
        "Designed custom prompt filters to eliminate LLM hallucinations and enforce strict tailwind styles."
      ]
    },
    {
      title: "DHRISHTI STICK",
      patentStatus: "Patent Pending",
      tagline: "IoT Assistive Smart Device",
      description: "An innovative IoT-driven smart stick for visually impaired individuals, utilizing hardware-software data fusion and low-latency obstacle processing.",
      longDescription: "Developed an advanced IoT assistive device featuring multi-sensor integration (ultrasonic, LiDAR/infrared) running on ESP32. Operates real-time feedback loops via haptic vibrations and audio prompts to ensure seamless navigation.",
      techStack: ["ESP32 Microcontroller", "C++", "FreeRTOS", "Sensor Fusion", "Hardware-Software Data Fusion", "IoT"],
      metrics: [
        { label: "Obstacle Latency", value: "12ms" },
        { label: "Battery Life", value: "14 hrs" },
        { label: "Detection Range", value: "3.5m" }
      ],
      bulletPoints: [
        "Filed a patent for the unique multi-sensor feedback looping mechanism.",
        "Programmed efficient C++ firmware on ESP32 with FreeRTOS multi-threading to handle sensory inputs simultaneously.",
        "Achieved a sub-15ms response latency for haptic alerts to prevent high-speed collisions.",
        "Configured Bluetooth and Wi-Fi capability to feed real-time coordinates to a companion mobile application."
      ]
    },
    {
      title: "Blockchain Voting System",
      tagline: "Decentralized & Immutable Elections",
      description: "A secure, transparent, and decentralized electronic voting application designed using Ethereum smart contracts to prevent database tempering.",
      longDescription: "Designed an immutable voting system ensuring one-vote-per-citizen verification using decentralized cryptography. Votes are cryptographically sealed, eliminating centralized data leaks and single points of failure.",
      techStack: ["Solidity", "Ethereum Smart Contracts", "Web3.js", "Next.js", "Cryptography"],
      metrics: [
        { label: "Gas Optimization", value: "-22%" },
        { label: "Audit Rating", value: "Secured" },
        { label: "Verification Latency", value: "< 2s" }
      ],
      bulletPoints: [
        "Wrote secure Solidity contracts, fully optimized to lower gas fees during voter registration and ballot submission.",
        "Implemented decentralized verification via MetaMask web wallets and cryptographic proofs.",
        "Constructed a clean, fully responsive Next.js frontend showing live, audit-ready election charts."
      ]
    },
    {
      title: "Decentralized Cloud Storage",
      tagline: "P2P Cryptographic File Vault",
      description: "A peer-to-peer distributed storage platform that splits, encrypts, and distributes user files across a nodes network.",
      longDescription: "Constructed a decentralized cloud network where files are chunked, encrypted with AES-256, and distributed using redundant hash storage systems to guarantee maximum uptime and total data privacy.",
      techStack: ["Node.js", "IPFS / Web3 Storage", "AES-256 Encryption", "TypeScript", "React"],
      metrics: [
        { label: "Uptime Guarantee", value: "99.99%" },
        { label: "Chunk Integrity", value: "100%" },
        { label: "Encryption Type", value: "AES-256" }
      ],
      bulletPoints: [
        "Built custom hashing algorithms to index file chunks across IPFS/decentralized storage gateways.",
        "Integrated client-side AES-256 cryptographic keys ensuring that storage operators have zero knowledge of file content.",
        "Implemented parity checks to automatically reconstruct files from available sibling nodes in case of node offline events."
      ]
    }
  ],
  timeline: [
    {
      year: "2026",
      title: "2nd Runner-up at XZIBIT 2026",
      subtitle: "National Level Project Competition",
      description: "Awarded top ranks out of hundreds of entries nationwide for the DHRISHTI STICK IoT system.",
      type: "achievement"
    },
    {
      year: "2022 - 2026",
      title: "K.C. College of Engineering",
      subtitle: "B.E. in Computer Engineering",
      description: "Currently pursuing a Bachelor of Engineering in Computer Engineering. Deep-diving into neural networks, distributed databases, and internet-of-things architecture. Expected Graduation: May 2026.",
      type: "education"
    },
    {
      year: "2025",
      title: "Deep-Tech Certifications",
      subtitle: "Natural Language Processing (NLP), AI, & Blockchain",
      description: "Acquired industry-recognized certifications validating expertise in neural sequence models, prompt engineering, smart contract security, and cryptographic hashing.",
      type: "certification"
    }
  ]
};
