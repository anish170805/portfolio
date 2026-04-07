export const projects = [
  {
    id: "gyanpath",
    name: "GyanPath AI Roadmap Agent",
    icon: "🧭",
    repoUrl: "https://github.com/anish170805/gyanpath",
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
  id: "front9",
  name: "Front9",
  icon: "⚙️",
    repoUrl: "https://github.com/anish170805/front9",
  shortDesc: "Agentic frontend builder that generates complete web project files in your local system.",
  tags: ["Python", "LangChain", "LangGraph", "LLM Agents", "Code Generation"],
  conversationFlow: {
    start: {
      message: "Front9 is an experimental agent that generates frontend project files based on a prompt. Instead of manually setting up folders and files, the agent creates a complete project structure directly in your local system.",
      options: ["How It Works", "Tech Stack", "Capabilities", "Status"]
    },
    "How It Works": {
      message: "The agent takes a description of a website and plans the required structure. Using LangGraph workflows, it generates folders and code files, then writes them into a new directory called 'generated_project' in the local environment.",
      options: ["Tech Stack", "Capabilities", "Status", "← Start over"]
    },
    "Tech Stack": {
      message: "The project is built entirely as a backend agent using Python, LangChain, and LangGraph. The agent orchestrates LLM reasoning steps to determine project structure and generate the necessary code files.",
      options: ["How It Works", "Capabilities", "← Start over"]
    },
    "Capabilities": {
      message: "Currently the agent focuses on basic frontend scaffolding. It can generate folder structures and starter files for websites based on user prompts. The generated project is saved locally so developers can immediately start editing or running it.",
      options: ["How It Works", "Tech Stack", "Status", "← Start over"]
    },
    "Status": {
      message: "This project is currently a prototype. It focuses on backend agent orchestration and file generation. Future improvements could include UI integration, better planning agents, and support for multiple frameworks.",
      options: ["How It Works", "Capabilities", "← Start over"]
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