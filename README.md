# SystemCanvas: System Design Playground

A modern web application for **learning, visualizing, designing, and simulating** distributed systems through interactive architecture diagrams and real-time simulations.

---

## Features

- **Interactive Canvas** — Drag-and-drop system design components onto a React Flow canvas
- **Real-time Simulation** — Watch particles flow through your system architecture
- **Multiple Components** — Clients, load balancers, API gateways, servers, caches, databases, message queues, CDNs, and more
- **Pre-built Templates** — Quickly start with popular architectures (URL Shortener, Instagram Clone, WhatsApp Clone, Netflix Clone, Uber Clone)
- **Learning Center** — Comprehensive resources on system design concepts
- **Metrics Dashboard** — Live metrics for requests/sec, latency, cache hit/miss, and more
- **Project Management** — Save, load, delete, and export your system designs to Supabase
- **Import/Export** — Export as JSON or PNG, import existing designs
- **Authentication** — Email/password, Google, and GitHub login

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 19 + Vite |
| Styling | Tailwind CSS |
| State Management | Zustand |
| Diagramming | React Flow |
| Routing | React Router DOM |
| Icons | Lucide React |
| Backend-as-a-Service | Supabase (Auth + PostgreSQL + Storage) |

---

## System Architecture

```mermaid
flowchart TB
    %% ── USER ENTRY ──────────────────────────────────────────────
    User(["User"])

    %% ── DELIVERY LAYER ──────────────────────────────────────────
    subgraph DELIVERY ["Delivery Layer"]
        direction LR
        CDN["CDN\nStatic Assets"]
        Browser["Web Browser"]
    end

    %% ── FRONTEND PAGES ──────────────────────────────────────────
    subgraph PAGES ["Frontend Pages  ·  React 19 + Vite"]
        direction TB
        Home["Home"]
        Login["Login"]
        Register["Register"]
        ResetPwd["Reset Password"]
        Dashboard["Dashboard"]
        Templates["Templates"]
        Playground["Playground"]
        LearningCenter["Learning Center"]
    end

    %% ── STATE MANAGEMENT ────────────────────────────────────────
    subgraph STATE ["State Management  ·  Zustand"]
        direction LR
        AuthStore["useAuthStore\n(session, user, role)"]
        CanvasStore["useCanvasStore\n(nodes, edges, simulation)"]
    end

    %% ── PLAYGROUND ENGINE ───────────────────────────────────────
    subgraph ENGINE ["Playground Engine  ·  React Flow"]
        direction TB
        ReactFlowCanvas["React Flow Canvas"]

        subgraph NODES ["Custom Nodes"]
            SystemNode["SystemNode\n(Client, Server, LB, Cache...)"]
            AnimatedEdge["AnimatedEdge\n(directional flow)"]
        end

        subgraph PANELS ["UI Panels"]
            ComponentLibrary["Component Library\n(drag palette)"]
            PropertiesPanel["Properties Panel\n(node config)"]
            ContextMenu["Context Menu\n(right-click actions)"]
        end

        subgraph SIM ["Simulation"]
            SimulationEngine["Simulation Engine\n(request routing logic)"]
            SimulationParticles["Simulation Particles\n(animated traffic)"]
        end

        ReactFlowCanvas --> SystemNode
        ReactFlowCanvas --> AnimatedEdge
        ReactFlowCanvas --> ComponentLibrary
        ReactFlowCanvas --> PropertiesPanel
        ReactFlowCanvas --> ContextMenu
        ReactFlowCanvas --> SimulationEngine
        SimulationEngine --> SimulationParticles
    end

    %% ── DATA LAYER ──────────────────────────────────────────────
    subgraph DATA ["Static Data Layer  ·  /src/data"]
        direction LR
        LearningTopics["learning-topics.js"]
        TemplatesData["templates.js"]
    end

    %% ── SUPABASE BACKEND ────────────────────────────────────────
    subgraph SUPABASE ["Supabase BaaS  ·  /src/lib/supabase.js"]
        direction TB
        SupabaseClient["Supabase JS Client"]

        subgraph SUPABASE_SERVICES ["Supabase Services"]
            direction LR
            SupaAuth["Supabase Auth\n(Email / Google / GitHub)"]
            SupaDB[("PostgreSQL DB\n(projects, users)")]
            SupaStorage["Supabase Storage\n(exports, assets)"]
        end

        SupabaseClient --> SupaAuth
        SupabaseClient --> SupaDB
        SupabaseClient --> SupaStorage
        SupaAuth <--> SupaDB
    end

    %% ── CONNECTIONS ─────────────────────────────────────────────
    User --> Browser
    Browser <--> CDN
    Browser --> PAGES

    Home --> Login
    Home --> Register
    Register --> Dashboard
    Login --> Dashboard
    ResetPwd --> Login
    Dashboard --> Templates
    Dashboard --> LearningCenter
    Dashboard --> Playground

    Playground --> ENGINE
    LearningCenter --> LearningTopics
    Templates --> TemplatesData

    PAGES --> STATE
    ENGINE --> CanvasStore
    STATE --> SUPABASE
    Dashboard --> SUPABASE

    %% ── STYLES ──────────────────────────────────────────────────
    classDef user        fill:#3b82f6,stroke:#1d4ed8,stroke-width:3px,color:#fff,font-weight:bold
    classDef delivery    fill:#0f172a,stroke:#334155,stroke-width:2px,color:#94a3b8
    classDef page        fill:#1e1b4b,stroke:#6366f1,stroke-width:2px,color:#c7d2fe
    classDef state       fill:#134e4a,stroke:#14b8a6,stroke-width:2px,color:#ccfbf1
    classDef engine      fill:#1a1a2e,stroke:#8b5cf6,stroke-width:2px,color:#ddd6fe
    classDef simulation  fill:#2d1b69,stroke:#a78bfa,stroke-width:2px,color:#ede9fe
    classDef data        fill:#1c1917,stroke:#f97316,stroke-width:2px,color:#fed7aa
    classDef supabase    fill:#003322,stroke:#10b981,stroke-width:2px,color:#a7f3d0
    classDef supaService fill:#004d33,stroke:#34d399,stroke-width:2px,color:#d1fae5

    class User user
    class CDN,Browser delivery
    class Home,Login,Register,ResetPwd,Dashboard,Templates,Playground,LearningCenter page
    class AuthStore,CanvasStore state
    class ReactFlowCanvas,SystemNode,AnimatedEdge,ComponentLibrary,PropertiesPanel,ContextMenu engine
    class SimulationEngine,SimulationParticles simulation
    class LearningTopics,TemplatesData data
    class SupabaseClient supabase
    class SupaAuth,SupaDB,SupaStorage supaService
```

---

## System Node Components

```mermaid
flowchart LR
    Client["Client"]
    LB["Load Balancer"]
    AGW["API Gateway"]
    Server["Server"]
    Cache["Cache"]
    Database[("Database")]
    Queue["Message Queue"]
    Micro["Microservice"]
    CDN["CDN"]
    Search["Search Engine"]

    Client -->|HTTP / WS| LB
    LB -->|Route| AGW
    AGW -->|Forward| Server
    Server -->|Read / Write| Cache
    Server -->|Query| Database
    Server -->|Publish| Queue
    Queue -->|Consume| Micro
    Micro -->|Query| Database
    Client -->|Static Assets| CDN
    Server -->|Index / Query| Search

    style Client    fill:#3b82f6,stroke:#1d4ed8,color:#fff,stroke-width:2px
    style LB        fill:#8b5cf6,stroke:#6d28d9,color:#fff,stroke-width:2px
    style AGW       fill:#ec4899,stroke:#be185d,color:#fff,stroke-width:2px
    style Server    fill:#22c55e,stroke:#15803d,color:#fff,stroke-width:2px
    style Cache     fill:#eab308,stroke:#a16207,color:#000,stroke-width:2px
    style Database  fill:#f97316,stroke:#c2410c,color:#fff,stroke-width:2px
    style Queue     fill:#06b6d4,stroke:#0e7490,color:#fff,stroke-width:2px
    style Micro     fill:#f43f5e,stroke:#be123c,color:#fff,stroke-width:2px
    style CDN       fill:#6366f1,stroke:#4338ca,color:#fff,stroke-width:2px
    style Search    fill:#14b8a6,stroke:#0f766e,color:#fff,stroke-width:2px
```

---

## Project Structure

```
system-canvas/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AnimatedEdge.jsx        # Directional animated edges
│   │   ├── AuthListener.jsx        # Supabase auth state sync
│   │   ├── ComponentLibrary.jsx    # Drag palette for system nodes
│   │   ├── ContextMenu.jsx         # Right-click canvas actions
│   │   ├── ProjectList.jsx         # Saved project management UI
│   │   ├── PropertiesPanel.jsx     # Node configuration sidebar
│   │   ├── SimulationEngine.jsx    # Request routing simulation logic
│   │   ├── SimulationParticles.jsx # Animated traffic particles
│   │   └── SystemNode.jsx          # Polymorphic system node renderer
│   ├── data/
│   │   ├── learning-topics.js      # Learning Center content
│   │   └── templates.js            # Pre-built architecture templates
│   ├── lib/
│   │   └── supabase.js             # Supabase client initialisation
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── LearningCenter.jsx
│   │   ├── Login.jsx
│   │   ├── Playground.jsx
│   │   ├── Register.jsx
│   │   └── ResetPassword.jsx
│   ├── store/
│   │   ├── useAuthStore.js         # Auth state (Zustand)
│   │   └── useCanvasStore.js       # Canvas + simulation state (Zustand)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── eslint.config.js
└── LICENSE
```

---

## Connect with Me

| Platform | Link |
|---|---|
| GitHub | https://github.com/maheshshinde9100 |
| LinkedIn | https://www.linkedin.com/in/maheshshinde9100 |
| LeetCode | https://leetcode.com/u/code-with-mahesh |

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
