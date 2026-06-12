import { useEffect, useRef } from 'react';
import { useCanvasStore } from '../store/useCanvasStore';

let particleIdCounter = 0;
const getParticleId = () => `particle_${particleIdCounter++}`;

export const SimulationEngine = () => {
  const getStore = useCanvasStore.getState;
  const isSimulating = useCanvasStore(state => state.isSimulating);
  
  const lastTimeRef = useRef(Date.now());
  const spawnTimerRef = useRef(0);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!isSimulating) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    const runSimulation = () => {
      const store = getStore();
      const { 
        nodes, 
        edges, 
        isPaused, 
        simulationSpeed, 
        particles, 
        setParticles, 
        updateMetrics, 
        updateSimulationStats,
        simulationStats 
      } = store;

      const now = Date.now();
      const deltaTime = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      if (!isPaused) {
        // Spawn new particles from client nodes
        spawnTimerRef.current += deltaTime * simulationSpeed;
        const clientNodes = nodes.filter(n => n.data.type === 'client');
        
        if (spawnTimerRef.current > 0.3 && clientNodes.length > 0) {
          spawnTimerRef.current = 0;
          const randomClient = clientNodes[Math.floor(Math.random() * clientNodes.length)];
          const outgoingEdges = edges.filter(e => e.source === randomClient.id);
          
          if (outgoingEdges.length > 0) {
            const randomEdge = outgoingEdges[Math.floor(Math.random() * outgoingEdges.length)];
            const newParticle = {
              id: getParticleId(),
              edgeId: randomEdge.id,
              progress: 0,
              sourceId: randomEdge.source,
              targetId: randomEdge.target,
              color: getNodeColor(randomClient.data.type),
              createdAt: now
            };
            setParticles([...particles, newParticle]);
            const newTotalRequests = simulationStats.totalRequests + 1;
            updateSimulationStats({ 
              totalRequests: newTotalRequests,
              activeRequests: simulationStats.activeRequests + 1
            });
            // Update metrics immediately when spawning
            updateMetrics({
              requestsPerSecond: Math.min(10, simulationSpeed * 3),
              throughput: newTotalRequests
            });
          }
        }

        // Update existing particles
        const updatedParticles = [];
        let completedRequests = 0;
        let totalLatency = 0;
        let newCacheHits = 0;
        let newCacheMisses = 0;
        let queueSize = 0;
        let currentActiveRequests = simulationStats.activeRequests;
        let currentTotalRequests = simulationStats.totalRequests;
        let currentCacheHits = simulationStats.cacheHits;
        let currentCacheMisses = simulationStats.cacheMisses;

        particles.forEach(particle => {
          const speed = 1.5 * simulationSpeed;
          const newProgress = particle.progress + deltaTime * speed;

          if (newProgress >= 1) {
            // Particle reached target node
            const targetNode = nodes.find(n => n.id === particle.targetId);
            if (targetNode) {
              const outgoingEdges = edges.filter(e => e.source === targetNode.id);
              
              // Component-specific behavior
              if (targetNode.data.type === 'cache') {
                if (Math.random() > 0.3) {
                  newCacheHits++;
                } else {
                  newCacheMisses++;
                }
              } else if (targetNode.data.type === 'queue') {
                queueSize++;
              }

              // Route to next node if available
              if (outgoingEdges.length > 0) {
                const nextEdge = outgoingEdges[Math.floor(Math.random() * outgoingEdges.length)];
                updatedParticles.push({
                  ...particle,
                  id: particle.id,
                  edgeId: nextEdge.id,
                  progress: 0,
                  sourceId: nextEdge.source,
                  targetId: nextEdge.target,
                  color: getNodeColor(targetNode.data.type)
                });
              } else {
                // End of path
                completedRequests++;
                totalLatency += (now - particle.createdAt) / 1000;
                currentActiveRequests = Math.max(0, currentActiveRequests - 1);
              }
            } else {
              completedRequests++;
              currentActiveRequests = Math.max(0, currentActiveRequests - 1);
            }
          } else {
            updatedParticles.push({
              ...particle,
              progress: newProgress
            });
          }
        });

        // Update particles
        setParticles(updatedParticles);

        // Update simulation stats
        const updatedStats = {
          activeRequests: currentActiveRequests,
          cacheHits: currentCacheHits + newCacheHits,
          cacheMisses: currentCacheMisses + newCacheMisses
        };
        
        if (newCacheHits > 0 || newCacheMisses > 0) {
          updateSimulationStats(updatedStats);
        } else if (completedRequests > 0) {
          updateSimulationStats({ activeRequests: currentActiveRequests });
        }

        // Update metrics - always update them while simulating
        const newMetrics = {
          requestsPerSecond: Math.min(10, simulationSpeed * 3),
          throughput: currentTotalRequests,
          queueSize: queueSize
        };

        if (completedRequests > 0) {
          const avgLatency = totalLatency / completedRequests;
          newMetrics.averageLatency = avgLatency * 1000;
        } else if (simulationStats.averageLatency > 0) {
          // Keep existing latency if no new completions
          newMetrics.averageLatency = simulationStats.averageLatency;
        }

        const totalCacheAccess = (currentCacheHits + newCacheHits) + (currentCacheMisses + newCacheMisses);
        const cacheHitRatio = totalCacheAccess > 0 
          ? (currentCacheHits + newCacheHits) / totalCacheAccess 
          : 0;
        newMetrics.cacheHitRatio = cacheHitRatio;
        newMetrics.errorRate = simulationStats.errorRate;
        
        updateMetrics(newMetrics);
      }

      animationRef.current = requestAnimationFrame(runSimulation);
    };

    animationRef.current = requestAnimationFrame(runSimulation);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isSimulating]); // Only trigger when isSimulating changes

  return null;
};

function getNodeColor(type) {
  const colors = {
    client: '#60a5fa',
    loadBalancer: '#a78bfa',
    apiGateway: '#f472b6',
    server: '#4ade80',
    cache: '#facc15',
    database: '#fb923c',
    readReplica: '#fbbf24',
    queue: '#22d3ee',
    microservice: '#fb7185',
    cdn: '#818cf8'
  };
  return colors[type] || '#60a5fa';
}
