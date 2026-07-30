
---

<h1 align="center">🤖 AgentBuilder</h1>

<p align="center">
  <strong>Design AI agents that understand, think, and take action — without writing a single line of code.</strong>
</p>

<p align="center">
  <em>A no-code, visual workflow builder for creating intelligent AI agents powered by Google Gemini.</em>
</p>

---

## ✨ Overview

**AgentBuilder** is a full-stack SaaS platform that empowers users to create, configure, and deploy custom AI agents through an intuitive visual drag-and-drop workflow editor. Built on top of **Google Gemini AI**, it enables anyone — from developers to non-technical users — to build sophisticated AI-powered chatbots and task automators without writing code.

Think of it as a **Zapier meets ChatGPT builder** — visually wire up logic flows with AI reasoning, conditional branching, API integrations, and human-in-the-loop approvals, then deploy your agent with a single click.

---

## 🚀 Key Features

### 🎨 Visual Workflow Editor
- **Drag-and-drop** node-based canvas powered by [React Flow](https://reactflow.dev/)
- Connect nodes with edges to define agent execution pipelines
- Real-time editing with auto-save to Convex backend

### 🧠 AI-Powered Agents
- Backed by **Google Gemini 2.5 Flash** for fast, intelligent responses
- Custom system instructions per agent for specialized behavior
- Built-in function calling / tool use support

### 🔧 Rich Node Types
| Node | Description |
|------|-------------|
| **🟢 Start** | Entry point of the workflow |
| **🤖 Agent** | AI reasoning node with custom instructions & model config |
| **🔌 API** | HTTP request node for external API integrations |
| **🔀 If/Else** | Conditional branching logic |
| **🔁 While** | Looping construct for iterative tasks |
| **👤 User Approval** | Human-in-the-loop decision gate |
| **🔴 End** | Terminal node of the workflow |

### 🔐 Authentication & Security
- **Clerk** integration for secure user authentication (Sign In / Sign Up)
- Protected routes via Next.js middleware
- **Arcjet** rate limiting with token-bucket algorithm (5,000 requests/month)

### 📡 Agent SDK API
- RESTful API endpoint (`/api/agent-sdk`) to interact with published agents externally
- Streaming responses for real-time chat experiences
- Conversation persistence via Convex

### 📊 Dashboard
- View and manage all your AI agents in one place
- Create new agents with a single click
- Agent publishing workflow (draft → published)

### 💰 Pricing & Subscriptions
- Built-in pricing page for monetization
- Token-based usage tracking per user
- Subscription tier management

---

## 🏗️ Architecture

```
agentbuilder/
├── app/
│   ├── (auth)/                  # Clerk auth pages (sign-in, sign-up)
│   ├── agent-builder/           # Visual workflow editor
│   │   ├── [agentId]/           # Dynamic agent editor page
│   │   ├── _components/         # Builder UI (Header, SettingPanel, ToolsPanel)
│   │   ├── _customNodes/        # Node components (Agent, API, IfElse, While, etc.)
│   │   └── _nodeSettings/       # Per-node configuration panels
│   ├── api/
│   │   ├── agent-chat/          # Internal chat API route
│   │   └── agent-sdk/           # External SDK API endpoint
│   ├── dashboard/
│   │   ├── _components/         # Dashboard UI components
│   │   ├── my-agents/           # Agent management page
│   │   ├── pricing/             # Pricing page
│   │   └── profile/             # User profile page
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Landing page (hero section)
│   └── provider.tsx             # Theme & context providers
├── components/
│   └── ui/                      # Reusable shadcn/ui components
├── config/
│   ├── Arject.ts                # Arcjet rate-limiting configuration
│   └── OpenAiModel.ts           # OpenAI client setup
├── context/
│   ├── UserDetailContext.tsx     # User state context
│   └── WorkflowContext.tsx      # Workflow nodes/edges state
├── convex/
│   ├── schema.ts                # Database schema (Users, Agents, Conversations)
│   ├── agent.ts                 # Agent CRUD mutations & queries
│   ├── conversation.ts          # Conversation management
│   └── user.ts                  # User management
├── hooks/
│   └── use-mobile.ts            # Responsive breakpoint hook
├── lib/
│   └── utils.ts                 # Utility functions (cn, etc.)
├── types/
│   └── AgentType.tsx            # TypeScript type definitions
├── middleware.ts                 # Clerk auth middleware
└── package.json
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Frontend** | [React 19](https://react.dev/), [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives) |
| **Workflow Canvas** | [@xyflow/react](https://reactflow.dev/) (React Flow) |
| **Backend / DB** | [Convex](https://www.convex.dev/) (real-time serverless backend) |
| **AI Engine** | [Google Gemini 2.5 Flash](https://ai.google.dev/) |
| **Authentication** | [Clerk](https://clerk.com/) |
| **Rate Limiting** | [Arcjet](https://arcjet.com/) |
| **Charts** | [Recharts](https://recharts.org/) |
| **Form Handling** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** or **yarn** or **pnpm**
- A [Convex](https://www.convex.dev/) account
- A [Clerk](https://clerk.com/) account
- A [Google AI Studio](https://aistudio.google.com/) API key (Gemini)
- An [Arcjet](https://arcjet.com/) account (optional, for rate limiting)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/agentbuilder.git
cd agentbuilder
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Convex
CONVEX_DEPLOYMENT=dev:your-deployment-slug
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Google Gemini AI
GEMINI_API_KEY=your-gemini-api-key

# Arcjet Rate Limiting
ARCJET_KEY=your-arcjet-key
```

### 4. Start the Convex Backend

```bash
npx convex dev
```

### 5. Run the Development Server

In a separate terminal:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint for code quality checks |
| `npx convex dev` | Start the Convex development backend |

---

## 🗄️ Database Schema

AgentBuilder uses **Convex** as its real-time backend with the following tables:

```typescript
// UserTable — Stores authenticated user profiles
{
  name: string,
  email: string,
  imageUrl: string,
  subscription: string,    // "free" | "pro" | "enterprise"
  token: number            // Usage token balance
}

// AgentTable — Stores agent configurations & workflows
{
  agentId: string,         // Unique agent identifier
  name: string,            // Agent display name
  instruction?: string,    // System prompt / persona
  config?: any,            // Model configuration
  nodes?: any,             // React Flow nodes (workflow)
  edges?: any,             // React Flow edges (connections)
  published: boolean,      // Deployment status
  userId: Id<"UserTable">, // Owner reference
  agentToolConfig?: any    // Tool/function definitions
}

// ConversationTable — Tracks chat sessions
{
  conversationId: string,
  agentId: Id<"AgentTable">,
  userId: Id<"UserTable">
}
```

---

## 🔌 API Reference

### Agent Chat (Internal)

```
POST /api/agent-chat
```

| Field | Type | Description |
|-------|------|-------------|
| `messages` | `Array<{role, content}>` | Chat history |
| `agentToolConfig` | `{agents, tools}` | Agent & tool configuration |

**Response**: Streaming text (`text/plain`)

---

### Agent SDK (External)

```
POST /api/agent-sdk
```

| Field | Type | Description |
|-------|------|-------------|
| `userId` | `string` | User identifier |
| `agentId` | `string` | Target agent ID |
| `messages` | `Array<{role, content}>` | Chat history |
| `agentToolConfig` | `{tools}` | Tool definitions |

**Response**: Streaming text (`text/plain; charset=utf-8`)

> 💡 Use this endpoint to embed your published agents into any external application.

---

## 🧩 Creating Your First Agent

1. **Sign up** at [localhost:3000/sign-up](http://localhost:3000/sign-up)
2. Navigate to the **Dashboard**
3. Click **"Create New Agent"**
4. You'll be taken to the **Visual Workflow Editor**
5. Drag nodes from the toolbox onto the canvas:
   - Add a **Start** node → connect to an **Agent** node
   - Configure the Agent with custom instructions
   - Add **API** nodes for external integrations
   - Use **If/Else** for conditional logic
   - Add **User Approval** for human-in-the-loop
   - End with an **End** node
6. Configure each node's settings in the side panel
7. **Publish** your agent to make it available via the SDK API

---

## 🚢 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Import the repo on [Vercel](https://vercel.com)
3. Add all environment variables from `.env.local`
4. Deploy!

### Deploy Convex Backend

```bash
npx convex deploy
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a **Pull Request**

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---


