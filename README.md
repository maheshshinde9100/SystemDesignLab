# SystemDesignLab - System Design Playground

A modern web application for learning, visualizing, designing, and simulating distributed systems through interactive architecture diagrams and real-time simulations.

## Features

- **Interactive Canvas**: Drag-and-drop system design components onto a React Flow canvas
- **Real-time Simulation**: Watch particles flow through your system architecture
- **Multiple Components**: Clients, load balancers, API gateways, servers, caches, databases, message queues, CDNs, and more
- **Pre-built Templates**: Quickly start with popular architectures (URL Shortener, Instagram Clone, WhatsApp Clone, Netflix Clone, Uber Clone)
- **Learning Center**: Comprehensive resources on system design concepts
- **Metrics Dashboard**: Live metrics for requests/sec, latency, cache hit/miss, and more
- **Project Management**: Save, load, delete, and export your system designs to Supabase
- **Import/Export**: Export as JSON or PNG, import existing designs
- **Authentication**: Email/password, Google, and GitHub login

## Tech Stack

### Frontend
- React 19
- Vite (build tool)
- Tailwind CSS (styling)
- Zustand (state management)
- React Flow (diagramming)
- React Router DOM (routing)
- Lucide React (icons)
- Supabase JavaScript Client (BaaS)

## System Architecture

```mermaid
flowchart TB
    User(User)
    Browser[Web Browser]
    CDN{CDN}
    Browser <--> CDN
    Browser <--> AppFrontend[React App]
    AppFrontend <--> Supabase[Supabase BaaS]
    Supabase --> Auth[Supabase Auth]
    Supabase --> DB[(PostgreSQL DB)]
    Supabase --> Storage[Supabase Storage]
    Auth <--> DB

    %% Apply new, colorful styles with thicker strokes and rounded corners where applicable
    classDef mainUser fill:#3b82f6,stroke:#1d4ed8,stroke-width:3px,color:white;
    classDef mainUI fill:#a78bfa,stroke:#7c3aed,stroke-width:3px,color:white,rx:10,ry:10;
    classDef mainGCP fill:#10b981,stroke:#047857,stroke-width:3px,color:white;
    classDef mainDB fill:#f97316,stroke:#c2410c,stroke-width:3px,color:white,shape:cylinder;
    classDef mainStorage fill:#f59e0b,stroke:#b45309,stroke-width:3px,color:white,shape:rect,rx:10;
    classDef subPage fill:#ddd6fe,stroke:#a78bfa,stroke-width:1.5px,color:#3730a3,rx:8,ry:8;
    classDef subFlow fill:#a7f3d0,stroke:#10b981,stroke-width:1.5px,color:#064e3b,rx:8,ry:8;

    %% Apply the styles to primary nodes
    class User mainUser;
    class Browser mainUI;
    class CDN mainGCP;
    class AppFrontend mainUI;
    class Supabase mainGCP;
    class Auth mainGCP;
    class DB mainDB;
    class Storage mainStorage;

    subgraph Frontend_Group [Frontend Components]
        Home[Home Page]
        Login[Login Page]
        Register[Register Page]
        ResetPassword[Reset Password Page]
        Dashboard[Dashboard Page]
        Templates[Templates Page]
        Playground[Playground Page]
        LearningCenter[Learning Center Page]
        
        %% Style all frontend pages consistently
        class Home subPage;
        class Login subPage;
        class Register subPage;
        class ResetPassword subPage;
        class Dashboard subPage;
        class Templates subPage;
        class Playground subPage;
        class LearningCenter subPage;
    end

    subgraph SM [State Management]
        ReactFlow[React Flow Components]
        SystemNode[System Node]
        AnimatedEdge[Animated Edge]
        ComponentLibrary[Component Library]
        PropertiesPanel[Properties Panel]
        SimulationEngine[Simulation Engine]
        SimulationParticles[Simulation Particles]
        ContextMenu[Context Menu]
        
        %% Style all logic and flow components consistently
        class ReactFlow subFlow;
        class SystemNode subFlow;
        class AnimatedEdge subFlow;
        class ComponentLibrary subFlow;
        class PropertiesPanel subFlow;
        class SimulationEngine subFlow;
        class SimulationParticles subFlow;
        class ContextMenu subFlow;
    end

    User --> Browser
    Home --> Login
    Home --> Register
    Register --> Dashboard
    Dashboard --> Templates
    Dashboard --> LearningCenter
    Dashboard --> Playground
    Playground --> ReactFlow
    ReactFlow --> SystemNode
    ReactFlow --> AnimatedEdge
    ReactFlow --> ComponentLibrary
    ReactFlow --> PropertiesPanel
    ReactFlow --> SimulationEngine
    ReactFlow --> SimulationParticles
    ReactFlow --> ContextMenu
```

## Project Structure

```
system-canvas/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── AnimatedEdge.jsx
│   │   ├── AuthListener.jsx
│   │   ├── ComponentLibrary.jsx
│   │   ├── ContextMenu.jsx
│   │   ├── ProjectList.jsx
│   │   ├── PropertiesPanel.jsx
│   │   ├── SimulationEngine.jsx
│   │   ├── SimulationParticles.jsx
│   │   └── SystemNode.jsx
│   ├── data/
│   │   ├── learning-topics.js
│   │   └── templates.js
│   ├── lib/
│   │   └── supabase.js
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── LearningCenter.jsx
│   │   ├── Login.jsx
│   │   ├── Playground.jsx
│   │   ├── Register.jsx
│   │   └── ResetPassword.jsx
│   ├── store/
│   │   ├── useAuthStore.js
│   │   └── useCanvasStore.js
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

## Mermaid Diagrams: System Components

### Client Node Types

```mermaid
flowchart LR
    Client[Client]
    LB[Load Balancer]
    APIGateway[API Gateway]
    Server[Server]
    Cache[Cache]
    Database[(Database)]
    Queue[Queue]
    Microservice[Microservice]
    CDN[CDN]

    style Client fill:#60a5fa
    style LB fill:#a78bfa
    style APIGateway fill:#f472b6
    style Server fill:#4ade80
    style Cache fill:#facc15
    style Database fill:#fb923c
    style Queue fill:#22d3ee
    style Microservice fill:#fb7185
    style CDN fill:#818cf8
```

## Connect with Me

- GitHub: https://github.com/maheshshinde9100
- LinkedIn: https://www.linkedin.com/in/maheshshinde9100
- LeetCode: https://leetcode.com/u/code-with-mahesh/

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
