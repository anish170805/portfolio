export const projects = [
  {
    id: "ease",
    name: "EASE Voice Sales Agent",
    icon: "🎙️",
    repoUrl: "https://github.com/anish170805/EASE",
    liveUrl: "https://ease-weld.vercel.app/",
    shortDesc: "AI-powered voice sales agent that qualifies leads and captures contact info through real-time conversation using LiveKit, LangGraph, and Groq.",
    tags: ["Python", "LiveKit", "LangGraph", "Voice AI", "LLM Agents", "Sales Automation"],

    conversationFlow: {
      start: {
        message: "EASE is a real-time voice sales agent that conducts natural phone-style conversations to qualify leads. It listens to users via speech, extracts their details intelligently, and saves structured lead profiles — all without any human rep involved.",
        options: ["Overview", "How It Works", "Features", "Tech Stack", "Status"]
      },

      Overview: {
        message: "Sales teams often lose leads because follow-up is slow or inconsistent. EASE automates the first touchpoint — it joins a LiveKit room, talks to a prospect in real time, collects their name, company, service interest, budget, and contact info, then stores a scored lead profile automatically.",
        options: ["How It Works", "Features", "Tech Stack", "← Start over"]
      },

      "How It Works": {
        message: "User speech is transcribed by Deepgram STT. Each turn is routed through a LangGraph state machine where a Groq LLM decides what fields are still missing and asks one targeted follow-up question at a time. Once all fields are collected, a closing flow confirms the lead, saves it to leads.json with a computed lead score, and gracefully ends the call.",
        options: ["Features", "Tech Stack", "← Start over"]
      },

      Features: {
        message: "EASE handles the full lead capture cycle: real-time STT/TTS via Deepgram, stateful multi-turn conversation via LangGraph, intelligent field extraction that avoids re-asking collected info, a closing confirmation flow, lead scoring based on completeness and priority, and a FastAPI token server exposing /token and /leads endpoints for frontend integration.",
        options: ["Overview", "Tech Stack", "Status", "← Start over"]
      },

      "Tech Stack": {
        message: "Built entirely in Python. Core stack: LiveKit Agents for real-time audio rooms, LangGraph for the stateful conversation graph, Groq LLM (via langchain-groq) for response generation and extraction, Deepgram for both STT and TTS, Pydantic for typed state, and FastAPI for the token server. Config via .env with dotenv.",
        options: ["Overview", "Status", "← Start over"]
      },

      Status: {
        message: "EASE is a working prototype with the full lead capture pipeline functional. The repo includes experimental nodes (router, extract_lead, finalize_lead) for alternate workflows. Potential next steps include a live dashboard UI, CRM integrations, and multi-language support.",
        options: ["Overview", "← Start over"]
      }
    }
  },
  {
    id: "gyanpath",
    name: "GyanPath AI Roadmap Agent",
    icon: "🧭",
    repoUrl: "https://github.com/anish170805/gyanpath",
    liveUrl: "https://gyanpath-five.vercel.app/",
    shortDesc: "AI-powered learning roadmap generator that creates structured paths, resources, and quizzes for any skill.",
    tags: ["Python", "GenAI", "LLM Agents", "Learning Systems", "Education AI"],

    conversationFlow: {
      start: {
        message: "GyanPath is an AI learning roadmap generator that helps users plan how to learn any skill. Instead of manually searching for tutorials and courses, users simply specify what they want to learn and the system generates a structured roadmap.",
        options: ["Overview", "How It Works", "Features", "Tech Stack", "Status"]
      },

      Overview: {
        message: "The goal of GyanPath is to simplify self-learning. Users often struggle with figuring out what to learn first, which resources to follow, and how to practice. GyanPath solves this by generating a clear step-by-step roadmap tailored to the topic.",
        options: ["How It Works", "Features", "Tech Stack", "← Start over"]
      },

      "How It Works": {
        message: "The user provides a skill or domain they want to learn. The AI agent generates a structured roadmap including topics, recommended resources, and practice tasks. The system organizes the content in a logical progression so learners can move from basics to advanced concepts.",
        options: ["Features", "Tech Stack", "← Start over"]
      },

      Features: {
        message: "GyanPath focuses on structured learning. It generates topic-wise learning paths, suggests learning resources, recommends projects to build skills, and can include quizzes to test understanding.",
        options: ["Overview", "Tech Stack", "Status", "← Start over"]
      },

      "Tech Stack": {
        message: "The project uses Python and LLM APIs to generate structured learning plans. The system relies on prompt engineering and agent workflows to organize topics, resources, and exercises into a coherent roadmap.",
        options: ["Overview", "Status", "← Start over"]
      },

      Status: {
        message: "This project is currently a prototype focused on building the core roadmap generation workflow. Future improvements could include personalized learning paths, progress tracking, and a full user interface.",
        options: ["Overview", "← Start over"]
      }
    }
  },
  {
    id: "anveshak-ai",
    name: "Anveshak AI",
    icon: "🔍",
    repoUrl: "https://github.com/anish170805/Anveshak-AI",
    shortDesc: "AI-powered search engine for precise, context-aware answers from a knowledge base.",
    tags: ["Python", "Streamlit", "LangChain", "OpenAI", "FAISS"],
    conversationFlow: {
      start: {
        message: "Hello! I'm the assistant for Anveshak AI 🔍. It's a custom-trained search engine that gives precise answers from a knowledge base. What would you like to know?",
        options: ["What is it?", "Tech Architecture", "Key Challenge", "How is it different?"]
      },
      "What is it?": {
        message: "Anveshak AI is a retrieval-augmented generation (RAG) system. It ingests documents, creates vector embeddings, and uses them to find the most relevant context for a user's query before generating a precise answer.",
        options: ["Tech Architecture", "Key Challenge", "How is it different?", "← Start over"]
      },
      "Tech Architecture": {
        message: "The frontend is built with Streamlit. The core uses Python, LangChain for orchestration, OpenAI for the LLM, and a FAISS vector database to store and retrieve document embeddings.",
        options: ["What is it?", "Key Challenge", "How is it different?", "← Start over"]
      },
      "Key Challenge": {
        message: "The main challenge was tuning the retrieval step. Ensuring the system pulls the *most* relevant document chunks, without being too broad or too narrow, was key to the quality of the final answer. We used and tweaked a multi-query retriever to address this.",
        options: ["What is it?", "Tech Architecture", "How is it different?", "← Start over"]
      },
      "How is it different?": {
        message: "Unlike a standard search engine that just gives you links, Anveshak provides a direct, synthesized answer based on the source documents, complete with citations. It's designed for expert domains where accuracy is critical.",
        options: ["What is it?", "Tech Architecture", "Key Challenge", "← Start over"]
      }
    }
  },

  {
  id: "ret-jet",
  name: "Ret-Jet Data Agent",
  icon: "📊",
    repoUrl: "https://github.com/anish170805/ret-jet",
  shortDesc: "LLM-powered data analytics agent that answers questions about datasets and generates visualizations.",
  tags: ["Python", "LangChain", "LLM Agents", "Pandas", "Data Analysis"],
  conversationFlow: {
    start: {
      message: "Ret-Jet is a data analytics agent that allows users to explore datasets using natural language. Instead of writing Python or SQL manually, users can ask questions and the agent analyzes the data automatically.",
      options: ["Overview", "How It Works", "Tech Stack", "Status"]
    },

    Overview: {
      message: "The goal of Ret-Jet is to simplify data exploration. A user provides a dataset and asks questions such as 'Show the top selling products' or 'Plot sales over time'. The agent processes the request and returns insights or visualizations.",
      options: ["How It Works", "Tech Stack", "Status", "← Start over"]
    },

    "How It Works": {
      message: "The system uses an LLM agent to interpret the user's query and determine the required data operations. The agent executes data processing using Python libraries and then generates the corresponding analysis or chart.",
      options: ["Overview", "Tech Stack", "← Start over"]
    },

    "Tech Stack": {
      message: "Ret-Jet is built using Python and LangChain for agent orchestration. Data processing is handled using Pandas, while visualizations are generated dynamically from the processed dataset.",
      options: ["Overview", "Status", "← Start over"]
    },

    Status: {
      message: "This project is currently a prototype focused on building the core agent workflow. Future improvements could include better data cleaning, vector-based dataset search, and a user interface.",
      options: ["Overview", "← Start over"]
    }
  }
}
];