export const learningTopics = [
  {
    id: "load-balancers",
    title: "Load Balancers",
    description: "Distribute traffic across servers to improve reliability and performance.",
    explanation: "A load balancer acts as a 'traffic cop' sitting in front of your servers and routing client requests across all servers capable of fulfilling those requests in a way that maximizes speed and capacity utilization and ensures that no one server is overworked, which could degrade performance.",
    advantages: [
      "Increased availability and reliability of applications",
      "Scalability: can add/remove servers as demand changes",
      "Redundancy: if one server fails, load balancer routes to others"
    ],
    disadvantages: [
      "Single point of failure (unless multiple load balancers are used)",
      "Complexity in configuration and management"
    ],
    useCases: [
      "High-traffic web applications",
      "Distributed systems with multiple backend services"
    ],
    interviewQuestions: [
      "What's the difference between round-robin and least-connections algorithms?",
      "How would you handle SSL termination at the load balancer?"
    ],
    realWorldExamples: ["AWS Application Load Balancer", "NGINX", "HAProxy"]
  },
  {
    id: "caching",
    title: "Caching",
    description: "Store frequently accessed data in fast-access memory to reduce load on databases.",
    explanation: "Caching is the process of storing copies of files in a cache, or temporary storage location, so that they can be accessed more quickly. A cache hit occurs when the requested data can be found in a cache, while a cache miss occurs when it cannot.",
    advantages: [
      "Improved application performance",
      "Reduced database load",
      "Lower latency"
    ],
    disadvantages: [
      "Data inconsistency between cache and database",
      "Memory overhead"
    ],
    useCases: [
      "Frequently accessed product pages in e-commerce",
      "User sessions and preferences"
    ],
    interviewQuestions: [
      "What's the difference between cache-aside and write-through?",
      "How do you handle cache invalidation?"
    ],
    realWorldExamples: ["Redis", "Memcached", "CDNs like Cloudflare"]
  },
  {
    id: "database-replication",
    title: "Database Replication",
    description: "Copy data from primary database to one or more secondary databases.",
    explanation: "Database replication is the frequent electronic copying of data from a database in one computer or server to a database in another so that all users share the same level of information.",
    advantages: [
      "Improved read scalability",
      "Enhanced data durability and availability",
      "Disaster recovery"
    ],
    disadvantages: [
      "Replication lag (delay in updates reaching replicas)",
      "Increased write latency on primary"
    ],
    useCases: [
      "Read-heavy applications",
      "Business continuity planning"
    ],
    interviewQuestions: [
      "What are the main replication strategies?",
      "How do you resolve data conflicts in multi-master replication?"
    ],
    realWorldExamples: ["MySQL Replication", "PostgreSQL Streaming Replication"]
  },
  {
    id: "database-sharding",
    title: "Database Sharding",
    description: "Split large databases into smaller, faster, more manageable parts.",
    explanation: "Sharding is a type of database partitioning that separates very large databases into smaller, faster, more easily managed parts called data shards. Each shard is independent and contains a subset of the overall data.",
    advantages: [
      "Increased query performance",
      "Horizontal scaling of database",
      "Improved fault isolation"
    ],
    disadvantages: [
      "Increased complexity in application logic",
      "Difficulty in rebalancing shards"
    ],
    useCases: [
      "Social media platforms with millions of users",
      "E-commerce sites with large product catalogs"
    ],
    interviewQuestions: [
      "What are common sharding strategies?",
      "How do you handle joins between shards?"
    ],
    realWorldExamples: ["MongoDB Sharding", "Google Cloud Spanner"]
  },
  {
    id: "cap-theorem",
    title: "CAP Theorem",
    description: "In distributed systems, you can only choose two of Consistency, Availability, and Partition Tolerance.",
    explanation: "CAP Theorem states that in a distributed system, you can only achieve two out of three of the following: Consistency (all nodes see the same data at the same time), Availability (every request receives a response), Partition Tolerance (system continues to operate despite network failures).",
    advantages: [
      "Helps in making architectural decisions",
      "Clarifies trade-offs in distributed systems"
    ],
    disadvantages: [
      "Is a theoretical model, not a strict rule",
      "Over-simplifies complex trade-offs"
    ],
    useCases: [
      "Designing any distributed system",
      "Choosing between databases"
    ],
    interviewQuestions: [
      "Which two would you choose for a social media platform?",
      "What's the difference between CP and AP systems?"
    ],
    realWorldExamples: ["MongoDB (CP)", "Cassandra (AP)", "DynamoDB (AP)"]
  },
  {
    id: "consistent-hashing",
    title: "Consistent Hashing",
    description: "Distribute keys across nodes with minimal rehashing when nodes change.",
    explanation: "Consistent hashing is a special kind of hashing such that when a hash table is resized, only K/n keys need to be remapped on average, where K is the number of keys, and n is the number of slots.",
    advantages: [
      "Minimal data migration when nodes are added/removed",
      "Even distribution of keys across nodes"
    ],
    disadvantages: [
      "Higher complexity in implementation",
      "May require virtual nodes to handle uneven distribution"
    ],
    useCases: [
      "Distributed caching systems",
      "Load balancing across servers"
    ],
    interviewQuestions: [
      "How does consistent hashing differ from traditional hashing?",
      "What are virtual nodes in consistent hashing?"
    ],
    realWorldExamples: ["Amazon DynamoDB", "Cassandra", "Chord"]
  },
  {
    id: "message-queues",
    title: "Message Queues",
    description: "Decouple sender and receiver to handle workload asynchronously.",
    explanation: "Message queues provide an asynchronous communications protocol, meaning that the sender and receiver of the message do not need to interact with the message queue at the same time. Messages are stored until the recipient retrieves them.",
    advantages: [
      "Decoupling of services",
      "Ability to handle traffic spikes",
      "Improved reliability"
    ],
    disadvantages: [
      "Increased system complexity",
      "Potential for message duplication"
    ],
    useCases: [
      "Order processing in e-commerce",
      "Asynchronous notifications"
    ],
    interviewQuestions: [
      "What's the difference between at-least-once and exactly-once delivery?",
      "How do you handle dead-letter queues?"
    ],
    realWorldExamples: ["RabbitMQ", "Kafka", "AWS SQS"]
  },
  {
    id: "microservices",
    title: "Microservices",
    description: "Build an application as a collection of small, independent services.",
    explanation: "Microservices is an architectural style that structures an application as a collection of loosely coupled services, which implement business capabilities. Each service runs in its own process and communicates with lightweight mechanisms, often an HTTP resource API.",
    advantages: [
      "Independent deployment and scaling of services",
      "Technology diversity",
      "Better fault isolation"
    ],
    disadvantages: [
      "Complexity in distributed systems",
      "Operational overhead"
    ],
    useCases: [
      "Large-scale applications with multiple teams",
      "E-commerce platforms"
    ],
    interviewQuestions: [
      "How do microservices communicate?",
      "What are common patterns for microservices?"
    ],
    realWorldExamples: ["Netflix", "Uber", "Amazon"]
  }
];
