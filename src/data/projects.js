export const projects = [
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
},
  {
  id: "flipkart-review-analysis",
  name: "Flipkart Review Analysis",
  icon: "🛒",
    repoUrl: "https://github.com/anish170805/FlipkartReviewAnalysis",
  shortDesc: "Machine learning pipeline that analyzes Flipkart product reviews and predicts sentiment.",
  tags: ["Python", "NLP", "Flask", "Pandas", "Scikit-learn"],
  conversationFlow: {
    start: {
      message: "This project analyzes Flipkart product reviews and predicts whether a review expresses positive or negative sentiment. It demonstrates a full machine learning workflow from data ingestion to model deployment.",
      options: ["ML Pipeline", "Dataset", "Model", "API Usage"]
    },

    "ML Pipeline": {
      message: "The system follows a structured ML pipeline including data ingestion, validation, transformation, model training, and evaluation. Each stage is implemented as modular components to keep the workflow reproducible and organized.",
      options: ["Dataset", "Model", "API Usage", "← Start over"]
    },

    "Dataset": {
      message: "The dataset comes from Kaggle and contains Flipkart product reviews along with associated metadata. The data is downloaded, validated, cleaned, and transformed before being used for model training.",
      options: ["ML Pipeline", "Model", "← Start over"]
    },

    "Model": {
      message: "The project applies natural language processing techniques to convert text reviews into machine-readable features and trains a machine learning model to classify sentiment.",
      options: ["Dataset", "API Usage", "← Start over"]
    },

    "API Usage": {
      message: "A Flask API exposes endpoints such as /predict for real-time sentiment prediction and /train to retrain the model. This allows the model to be used as a service by other applications.",
      options: ["ML Pipeline", "Model", "← Start over"]
    }
  }
}
];