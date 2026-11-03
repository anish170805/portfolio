export type ProjectStatus = "Deployed" | "In Progress";
export type ProjectQuestion = {
  id: string;
  label: string;
  answer: string;
};
export type ProjectId =
  | "gyanpath"
  | "eera"
  | "screen-crawlers"
  | "nobrac"
  | "ret-jet"
  | "FlipkartReviewAnalysis"
  | "Supervisore"
  | "Anveshak-AI"
  | "Trading_bot"
  | "front9";

export type Project = {
  id: ProjectId;
  name: string;
  /** Card subtitle (README §9). */
  description?: string;
  status?: ProjectStatus;
  /** Opening line of the project chat panel. */
  summary?: string;
  /** Features / architecture bullets. Empty until project details are supplied. */
  features?: string[];
  chatQuestions?: ProjectQuestion[];
  /** Optional external links. A button is dimmed ("coming soon") until its URL is set. */
  links?: {
    live?: string;
    liveLabel?: string;
    github?: string;
    demo?: string;
    flowchart?: string;
  };
};

export type ChatProject = Project & {
  summary: string;
  features: string[];
  chatQuestions: ProjectQuestion[];
};

export const SCREEN_CRAWLERS_URL =
  "https://microsoftedge.microsoft.com/addons/detail/screen-crawlers/mjlbakegdpnahlabemcohoggnopebkdo";

// Order follows the mockup: GyanPath, Eera (active), NOBRAC, Ret-Jet.
export const PROJECTS: Project[] = [
  {
    id: "gyanpath",
    name: "GyanPath",
    description: "AI learning agent for editable roadmaps, sourced lessons, quizzes, and projects.",
    status: "Deployed",
    summary:
      "GyanPath turns a topic into an editable course roadmap, then teaches each step with real learning resources, source-grounded lessons, graded quizzes, and hands-on projects.",
    features: [
      "Creates 6–10 step learning roadmaps with human review and editing",
      "Finds articles and YouTube resources with Exa and YouTube search",
      "Generates source-grounded lessons with relevant video timestamps",
      "Provides three-question quizzes and evaluates learner answers",
      "Creates practical project briefs for each learning step",
      "Next.js frontend with a FastAPI and LangGraph backend",
      "Groq LLM, Exa search, and LangGraph human-in-the-loop checkpoints",
    ],
    chatQuestions: [
      {
        id: "how-it-works",
        label: "How does the learning flow work?",
        answer:
          "GyanPath creates a roadmap for a topic, then guides the learner through sourced lessons, quizzes, and practical projects one step at a time.",
      },
      {
        id: "features",
        label: "What are its key features?",
        answer:
          "Roadmaps can be reviewed and edited. Lessons use real web and video resources, followed by short quizzes and hands-on project briefs.",
      },
      {
        id: "technology",
        label: "What technologies does it use?",
        answer:
          "It combines a Next.js frontend with a FastAPI and LangGraph backend, using Groq for the LLM and Exa plus YouTube search for learning resources.",
      },
      {
        id: "status",
        label: "What is its current status?",
        answer:
          "GyanPath is a deployed, end-to-end prototype. Session persistence and user accounts are among the possible next steps.",
      },
    ],
    links: {
      github: "https://github.com/anish170805/gyanpath",
      live: "https://gyanpath-five.vercel.app/",
      flowchart: "/flowcharts/gyanpath_fc.svg",
    },
  },
  {
    id: "eera",
    name: "Eera",
    description: "AI sales lead qualification voice agent",
    status: "Deployed",
    summary: "Eera is an AI-powered voice agent that qualifies sales leads in real time.",
    features: [
      "LiveKit voice pipeline",
      "Deepgram STT/TTS",
      "LangGraph decision making",
      "Supabase lead storage",
      "FastAPI backend",
    ],
    chatQuestions: [
      {
        id: "how-it-works",
        label: "How does the voice agent work?",
        answer:
          "It transcribes a caller’s speech, asks targeted follow-up questions for missing lead details, then confirms and saves the completed lead profile.",
      },
      {
        id: "features",
        label: "What are its key features?",
        answer:
          "Eera captures lead details through a real-time conversation, avoids asking for information already collected, and scores the resulting lead.",
      },
      {
        id: "technology",
        label: "What technologies does it use?",
        answer:
          "The project uses LiveKit for voice rooms, Deepgram for speech recognition and synthesis, LangGraph and Groq for conversation logic, and FastAPI for its API.",
      },
      {
        id: "status",
        label: "What is its current status?",
        answer:
          "Eera is a working prototype with the lead-capture pipeline implemented.",
      },
    ],
    links: {
      github: "https://github.com/anish170805/EASE",
      live: "https://ease-weld.vercel.app/",
      flowchart: "/flowcharts/eera_fc.svg",
    },
  },
  {
    id: "screen-crawlers",
    name: "Screen Crawlers",
    description: "A browser add-on published on Microsoft Edge Add-ons.",
    status: "Deployed",
    links: {
      live: SCREEN_CRAWLERS_URL,
      liveLabel: "Microsoft Edge Add-ons",
    },
  },
  {
    id: "nobrac",
    name: "NOBRAC Carbon Offset Agent",
    description: "Carbon-credit portfolio agent for compliance gaps, risk, and approved offset actions.",
    status: "In Progress",
    summary:
      "NOBRAC (Net-zero Offset Brokerage & Retirement Automation Control) tracks carbon-credit holdings against offset commitments, assesses credit and climate risks, proposes buy or retire actions, and executes only after explicit human approval.",
    features: [
      "LangGraph workflow checks offset gaps, audit urgency, and holding risk",
      "Scores climate hazards and credit credibility on a 0–100 severity scale",
      "Ranks buy/retire recommendations against portfolio needs and wallet balance",
      "Requires explicit approval through Telegram or an email-linked review page",
      "FastAPI simulator tracks the wallet, holdings, retirements, and certificates",
      "Python, LangGraph, FastAPI, Telegram, APScheduler, and Carbonmark MCP",
      "Working prototype; uses a simulated wallet and does not interact with a blockchain",
    ],
    chatQuestions: [
      {
        id: "how-it-works",
        label: "How does NOBRAC work?",
        answer:
          "It checks the offset gap and audit deadline, assesses holding risks, proposes portfolio-aware actions, and pauses for human approval before execution.",
      },
      {
        id: "features",
        label: "What are its key features?",
        answer:
          "NOBRAC scores climate and credibility risks, ranks buy/retire actions against the wallet balance, and supports approval through Telegram or an email review page.",
      },
      {
        id: "technology",
        label: "What technologies does it use?",
        answer:
          "The workflow uses Python and LangGraph, with a FastAPI simulator, Telegram frontend, APScheduler, and a Carbonmark MCP server.",
      },
      {
        id: "status",
        label: "What is its current status?",
        answer:
          "It is a feature-complete working prototype. Its wallet is simulated and it does not interact with a blockchain.",
      },
    ],
    links: {
      github: "https://github.com/anish170805/Nobrac",
      demo: "https://drive.google.com/file/d/1sYKLAULpzfZ_zEDAHJhL124OOuoI6frw/view",
      flowchart: "/flowcharts/flowchart.svg",
    },
  },
  {
    id: "ret-jet",
    name: "Ret-Jet",
    description: "Ask questions about uploaded CSV data and turn answers into on-demand charts.",
    status: "In Progress",
    summary:
      "Ret-Jet is a Streamlit data-analysis agent: upload a CSV, ask questions in plain language, and get analysis or dynamically generated visualizations from the dataset.",
    features: [
      "Loads CSV files and surfaces row counts, columns, and dataset shape",
      "Uses a Groq-powered LangChain agent with tools registered against the active dataframe",
      "Runs pandas-based analysis for natural-language data questions",
      "Generates Matplotlib charts and dashboards on request",
      "Keeps chat history in the Streamlit session for follow-up questions",
    ],
    chatQuestions: [
      {
        id: "how-it-works",
        label: "How does Ret-Jet work?",
        answer:
          "Upload a CSV in the Streamlit app. Ret-Jet loads the dataframe, registers it with its analysis tools, and creates a Groq-powered agent that answers questions and can generate charts or dashboards.",
      },
      {
        id: "features",
        label: "What can it do?",
        answer:
          "It reports dataset shape and columns, answers questions with pandas-based analysis, and can create Matplotlib visualizations or multi-chart dashboards.",
      },
      {
        id: "technology",
        label: "What technologies does it use?",
        answer:
          "The project uses Python, Streamlit, Pandas, a LangChain agent with Groq, and Matplotlib-based visualization tools.",
      },
      {
        id: "status",
        label: "What is its current status?",
        answer:
          "Ret-Jet is an interactive prototype for CSV analysis, conversational questions, and on-demand charts.",
      },
    ],
    links: {
      github: "https://github.com/anish170805/Ret-Jet",
      flowchart: "/flowcharts/ret-jet_fc.svg",
    },
  },
  {
    id: "FlipkartReviewAnalysis",
    name: "Flipkart Review Sentiment Analysis",
    description: "Train and compare review classifiers, then predict sentiment from a Streamlit app.",
    summary:
      "A reproducible sentiment-analysis pipeline for Flipkart product reviews. It preprocesses review text, compares TF-IDF classifiers, tracks experiments, and serves predictions through Streamlit.",
    features: [
      "Cleans and normalizes reviews, then tokenizes, lemmatizes, and preprocesses text",
      "Trains Logistic Regression, Linear SVM, and Naive Bayes TF-IDF pipelines",
      "Uses cross-validated hyperparameter search and selects the best model by F1",
      "Tracks metrics, parameters, reports, and confusion matrices with MLflow",
      "Orchestrates training with Prefect and saves the selected model with joblib",
      "Predicts positive or negative sentiment in Streamlit, with confidence when supported",
    ],
    chatQuestions: [
      {
        id: "how-it-works",
        label: "How does the sentiment pipeline work?",
        answer:
          "A Prefect flow loads and cleans the review dataset, preprocesses the text, then trains and compares TF-IDF pipelines. The chosen model is saved locally and its run details are recorded in MLflow.",
      },
      {
        id: "features",
        label: "Which models and features are included?",
        answer:
          "The training workflow compares Logistic Regression, Linear SVM, and Multinomial Naive Bayes with cross-validated tuning. The Streamlit app predicts positive or negative sentiment and shows confidence when the selected model supports it.",
      },
      {
        id: "technology",
        label: "What technologies does it use?",
        answer:
          "It uses Python, scikit-learn, TF-IDF, Prefect, MLflow, joblib, and Streamlit, with Pandas and NumPy for data handling.",
      },
      {
        id: "status",
        label: "How can I explore the results?",
        answer:
          "Training metrics and artifacts are logged to MLflow for comparison, while the Streamlit interface accepts review text for an individual prediction.",
      },
    ],
    links: {
      github: "https://github.com/anish170805/FlipkartReviewAnalysis",
      flowchart: "/flowcharts/flipkart-rev-fc.svg",
    },
  },
  {
    id: "Supervisore",
    name: "Supervisore",
    description: "Durable AI order supervision with Temporal workflows and a LangGraph decision agent.",
    summary:
      "Supervisore monitors an order over time with one durable Temporal workflow per order. A LangGraph agent evaluates relevant incoming events and scheduled wake-ups, chooses actions, and recommends what should happen next; the workflow owns waiting, state transitions, and completion.",
    features: [
      "Next.js dashboard to create supervisors and inspect runs, timelines, memory, and activities",
      "FastAPI starts workflows and exposes supervisor and run APIs",
      "Temporal keeps each order workflow durable while waiting for events or scheduled wake-ups",
      "LangGraph main agent evaluates order context, recent events, and stored instructions",
      "Five action tools record intervention results through the Supabase PostgreSQL persistence layer",
      "Pause, resume, event, instruction, feedback, and termination controls",
      "Gemini Flash primary model with Groq and NVIDIA fallbacks",
      "Mainline proof of concept with more than 200 tests documented in the repository",
    ],
    chatQuestions: [
      {
        id: "how-it-works",
        label: "How does Supervisore work?",
        answer:
          "The API starts one long-running Temporal workflow for an order. The workflow retains its state, waits for a relevant event or scheduled wake-up, then runs the LangGraph agent through an activity. The agent evaluates the order and can select an action; Temporal handles waiting and workflow completion.",
      },
      {
        id: "architecture",
        label: "How do the components fit together?",
        answer:
          "The Next.js dashboard talks to FastAPI. The API persists supervisor and run records in Supabase PostgreSQL and starts workflows through the Temporal client. A Temporal worker executes each durable order workflow, which calls agent and action activities.",
      },
      {
        id: "events",
        label: "How can an active run be controlled?",
        answer:
          "Callers can signal an order event, add an instruction, pause or resume a run, submit feedback, or request termination. Wake-worthy events can trigger the agent; instructions are stored for the next real wake-up.",
      },
      {
        id: "technology",
        label: "What technologies does it use?",
        answer:
          "The frontend uses Next.js, TypeScript, and Tailwind. The backend uses FastAPI, Temporal, LangGraph, and Supabase PostgreSQL, with Gemini Flash as the primary model and Groq and NVIDIA as fallbacks.",
      },
    ],
    links: {
      github: "https://github.com/anish170805/Supervisore",
      demo: "https://drive.google.com/file/d/1sJAIaf28nXF9VAqiS2VfX7O7WuqogWRE/view?usp=drive_link",
      flowchart: "/flowcharts/supervisore_fc.svg",
    },
  },
  {
    id: "Anveshak-AI",
    name: "Anveshak AI",
    description: "Search and summarize documents with retrieval-augmented generation.",
    summary:
      "Anveshak AI is a document-analysis tool that ingests supported files, builds a persistent FAISS index, and uses retrieved passages to answer questions. It also supports forensic analysis, entity relationships, and PDF reports.",
    features: [
      "Loads PDFs, text, spreadsheets, JSON, and forensic UFDR archives",
      "Extracts document text, creates overlapping chunks, and embeds them with SentenceTransformers",
      "Persists embeddings and metadata in a FAISS vector store for similarity search",
      "Retrieves relevant passages and uses a Groq-hosted language model to summarize answers",
      "Includes user authentication, entity-relationship analysis, and PDF report generation",
      "Built with Python, Streamlit, LangChain, FAISS, SentenceTransformers, and Groq",
    ],
    chatQuestions: [
      {
        id: "how-it-works",
        label: "How does Anveshak AI answer questions?",
        answer:
          "It extracts text from supported documents, splits it into overlapping chunks, and indexes their embeddings in FAISS. A question retrieves the closest passages, which are supplied as context to a Groq language model for a grounded summary.",
      },
      {
        id: "features",
        label: "What kinds of analysis does it support?",
        answer:
          "The project supports document search and summarization, forensic UFDR ingestion, entity-relationship analysis, and PDF report generation, alongside user authentication.",
      },
      {
        id: "technology",
        label: "What technologies does it use?",
        answer:
          "It is built with Python and Streamlit, using LangChain document loaders, SentenceTransformers embeddings, FAISS retrieval, and Groq for language-model responses.",
      },
      {
        id: "status",
        label: "How are documents indexed?",
        answer:
          "Anveshak builds a local FAISS index and saves both the index and chunk metadata so a later run can reuse the existing vector store.",
      },
    ],
    links: {
      github: "https://github.com/anish170805/Anveshak-AI",
      flowchart: "/flowcharts/anveshak-ai.svg",
    },
  },
  {
    id: "Trading_bot",
    name: "Binance Futures Testnet Bot",
    description: "A Python CLI for validating and routing market, limit, and stop orders.",
    summary:
      "A modular command-line trading bot for Binance Futures Testnet. It validates order details, routes supported order types to the REST client, and reports and logs the exchange response.",
    features: [
      "Supports BUY and SELL orders for USDT-margined futures symbols",
      "Routes MARKET, LIMIT, and STOP orders through dedicated client methods",
      "Validates symbols, sides, quantities, and order-specific price inputs before submission",
      "Supports interactive and command-line operation",
      "Logs API requests, responses, errors, and network exceptions",
      "Uses environment-based API configuration and targets the Binance Futures Testnet",
    ],
    chatQuestions: [
      {
        id: "how-it-works",
        label: "How does the bot place an order?",
        answer:
          "The CLI collects an order request, validates its symbol, side, quantity, and any required prices, then routes it to the matching market, limit, or stop method on the Binance client. The response is summarized and logged.",
      },
      {
        id: "features",
        label: "Which order types are supported?",
        answer:
          "The bot supports BUY and SELL market, limit, and stop orders, with separate client methods for each order type.",
      },
      {
        id: "technology",
        label: "What technologies does it use?",
        answer:
          "It is a modular Python CLI using the requests library to call the Binance Futures REST API, with dotenv-based configuration and structured logging.",
      },
      {
        id: "safety",
        label: "Does it place live trades?",
        answer:
          "The repository is configured for Binance Futures Testnet. It is intended for testing and does not represent a production trading system.",
      },
    ],
    links: {
      github: "https://github.com/anish170805/Trading_bot",
      flowchart: "/flowcharts/trading-bot_fc.svg",
    },
  },
  {
    id: "front9",
    name: "front9",
    description: "LangGraph multi-agent system that plans and generates software projects from prompts.",
    summary:
      "Front9 turns a natural-language prompt into a software project through three cooperating agents: a Planner defines the project, an Architect breaks it into tasks, and a Coder creates the files.",
    features: [
      "Planner produces a structured project plan and file list",
      "Architect creates dependency-ordered implementation tasks",
      "Coder reads existing files and implements tasks step by step",
      "LangGraph workflow with structured Pydantic outputs and resumable progress",
      "Restricted file tools prevent writes outside the generated project folder",
      "Python, LangGraph, LangChain, Groq, and Pydantic",
      "Working prototype; prompt is currently hardcoded and there is no automated test pipeline",
    ],
    chatQuestions: [
      {
        id: "how-it-works",
        label: "How does Front9 work?",
        answer:
          "A Planner turns the prompt into a project plan, an Architect decomposes it into implementation tasks, and a Coder creates the files in sequence.",
      },
      {
        id: "features",
        label: "What are its key features?",
        answer:
          "It uses structured planning, task dependencies, step-by-step progress, and restricted file tools that keep generated writes inside the project directory.",
      },
      {
        id: "technology",
        label: "What technologies does it use?",
        answer:
          "Front9 is built with Python, LangGraph, LangChain, Groq, and Pydantic.",
      },
      {
        id: "status",
        label: "What is its current status?",
        answer:
          "It is a working prototype. Its prompt is currently hardcoded, and it does not yet include automated tests or streaming output.",
      },
    ],
    links: {
      github: "https://github.com/anish170805/front9",
      flowchart: "/flowcharts/front9_fc.svg",
    },
  },
];

export const DEFAULT_PROJECT_INDEX = PROJECTS.findIndex((p) => p.id === "eera");
