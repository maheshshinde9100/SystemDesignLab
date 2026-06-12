# System Design Playground

A modern web application for learning, visualizing, designing, and simulating distributed systems through interactive architecture diagrams and real-time simulations.

## Features

- **Interactive Canvas**: Drag-and-drop system design components
- **Real-time Simulation**: Watch how your system behaves with animated particles
- **Multiple Components**: Clients, load balancers, API gateways, servers, caches, databases, and more
- **Templates**: Pre-built system design templates to get started quickly
- **Learning Center**: Comprehensive tutorials and resources for system design
- **Metrics Dashboard**: Live metrics including requests per second, latency, and cache hit ratios
- **Project Management**: Save, load, and export your system designs
- **Import/Export**: Export as JSON or PNG, and import existing designs

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Zustand (State Management)
- React Flow (Diagramming)
- Lucide React (Icons)
- React Router DOM

### Backend & Infrastructure
- Supabase (Authentication, Database, Storage)

## Architecture Overview

```mermaid
graph TD
    A[Client] -->|Requests| B[Load Balancer]
    B --> C[API Gateway]
    C --> D1[Microservice 1]
    C --> D2[Microservice 2]
    D1 --> E[Cache]
    D2 --> E
    E --> F[(Database)]
    
    style A fill:#60a5fa
    style B fill:#a78bfa
    style C fill:#f472b6
    style D1 fill:#fb7185
    style D2 fill:#fb7185
    style E fill:#facc15
    style F fill:#fb923c
```

## Components

### Client
Represents end-users sending requests to your system.

```mermaid
flowchart LR
    Client[Client]
    
    style Client fill:#60a5fa,color:white,stroke:#3b82f6
```

### Load Balancer
Distributes traffic across servers to ensure no single server is overloaded.

```mermaid
flowchart LR
    LB[Load Balancer]
    
    style LB fill:#a78bfa,color:white,stroke:#8b5cf6
```

### API Gateway
Handles request routing, authentication, and rate limiting.

```mermaid
flowchart LR
    APIGateway[API Gateway]
    
    style APIGateway fill:#f472b6,color:white,stroke:#db2777
```

### Server
Backend servers processing requests.

```mermaid
flowchart LR
    Server[Server]
    
    style Server fill:#4ade80,color:white,stroke:#16a34a
```

### Cache
Stores frequently accessed data for faster retrieval.

```mermaid
flowchart LR
    Cache[Cache]
    
    style Cache fill:#facc15,color:#1f2937,stroke:#eab308
```

### Database
Persists and retrieves data.

```mermaid
flowchart LR
    Database[(Database)]
    
    style Database fill:#fb923c,color:white,stroke:#ea580c
```

### Message Queue
Decouples services using asynchronous messaging.

```mermaid
flowchart LR
    Queue[Queue]
    
    style Queue fill:#22d3ee,color:#1f2937,stroke:#06b6d4
```

## Example Architecture: URL Shortener

```mermaid
flowchart LR
    Clients[Clients] --> LB[Load Balancer]
    LB --> Servers[Backend Servers]
    Servers --> Cache[Redis Cache]
    Servers --> DB[(PostgreSQL)]
    
    style Clients fill:#60a5fa
    style LB fill:#a78bfa
    style Servers fill:#4ade80
    style Cache fill:#facc15
    style DB fill:#fb923c
```

## Simulation Flow

```mermaid
sequenceDiagram
    autonumber
    participant Client as Client
    participant LB as Load Balancer
    participant Server as Server
    participant Cache as Cache
    participant DB as Database
    
    Client->>LB: Request
    LB->>Server: Forward
    Server->>Cache: Check Cache
    alt Cache Hit
        Cache-->>Server: Cached Data
        Server-->>Client: Response
    else Cache Miss
        Server->>DB: Query Data
        DB-->>Server: Results
        Server->>Cache: Store Results
        Server-->>Client: Response
    end
```

## Getting Started

### Prerequisites
- Node.js
- npm or yarn
- A Supabase account

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the local development URL (typically `http://localhost:5173`)

### Build for Production
```bash
npm run build
```

## Project Structure

```
system-canvas/
├── public/
├── src/
│   ├── assets/
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
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## License

MIT License
