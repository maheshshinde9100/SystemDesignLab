import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import { supabase } from '../lib/supabase';

let nodeIdCounter = 0;
const getNodeId = () => `node_${nodeIdCounter++}`;

let particleIdCounter = 0;
const getParticleId = () => `particle_${particleIdCounter++}`;

export const useCanvasStore = create((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
  currentProject: null,
  projects: [],
  loadingProjects: false,
  isSimulating: false,
  isPaused: false,
  simulationSpeed: 1,
  contextMenu: null,
  clipboard: null,
  particles: [],
  simulationStats: {
    totalRequests: 0,
    cacheHits: 0,
    cacheMisses: 0,
    queueMessages: 0,
    activeRequests: 0
  },
  metrics: {
    requestsPerSecond: 0,
    averageLatency: 0,
    throughput: 0,
    errorRate: 0,
    queueSize: 0,
    cacheHitRatio: 0
  },

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  setSelectedNode: (node) => set({ selectedNode: node }),
  setCurrentProject: (project) => set({ currentProject: project }),
  setIsSimulating: (val) => set({ isSimulating: val }),
  setIsPaused: (val) => set({ isPaused: val }),
  setSimulationSpeed: (speed) => set({ simulationSpeed: speed }),
  setContextMenu: (menu) => set({ contextMenu: menu }),
  setParticles: (particles) => set({ particles }),
  updateMetrics: (newMetrics) => set({ metrics: { ...get().metrics, ...newMetrics } }),
  updateSimulationStats: (newStats) => set({ simulationStats: { ...get().simulationStats, ...newStats } }),
  
  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },
  
  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },
  
  onConnect: (params) => {
    set({ edges: addEdge({ 
      ...params, 
      animated: true,
      data: { sourceNodeId: params.source }
    }, get().edges) });
  },
  
  addNode: (node) => {
    set({ nodes: [...get().nodes, node] });
  },
  
  updateNodeData: (nodeId, data) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
      ),
    });
  },
  
  clearCanvas: () => {
    set({ nodes: [], edges: [], selectedNode: null, currentProject: null });
  },

  saveProject: async (name) => {
    const { nodes, edges, currentProject } = get();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('Not authenticated');

    const projectData = {
      user_id: user.id,
      name,
      nodes,
      edges,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (currentProject) {
      result = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', currentProject.id)
        .select()
        .single();
    } else {
      result = await supabase
        .from('projects')
        .insert([{ ...projectData, created_at: new Date().toISOString() }])
        .select()
        .single();
    }

    if (result.error) throw new Error(result.error.message);
    set({ currentProject: result.data });
    return result.data;
  },

  loadProject: (project) => {
    set({
      nodes: project.nodes || [],
      edges: project.edges || [],
      currentProject: project,
      selectedNode: null,
    });
  },

  fetchProjects: async () => {
    set({ loadingProjects: true });
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      set({ loadingProjects: false });
      return;
    }

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (error) {
      // Silently fail or track externally in production
    } else {
      set({ projects: data || [] });
    }
    set({ loadingProjects: false });
  },

  deleteProject: async (projectId) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (error) throw new Error(error.message);
    set((state) => ({
      projects: state.projects.filter(p => p.id !== projectId),
      currentProject: state.currentProject?.id === projectId ? null : state.currentProject,
    }));
  },

  copyNode: (node) => {
    set({ clipboard: { ...node } });
  },

  pasteNode: (position) => {
    const { clipboard, addNode } = get();
    if (clipboard) {
      const newNode = {
        ...clipboard,
        id: getNodeId(),
        position: { x: position.x + 20, y: position.y + 20 },
      };
      addNode(newNode);
    }
  },

  duplicateNode: (node) => {
    const newNode = {
      ...node,
      id: getNodeId(),
      position: { x: node.position.x + 30, y: node.position.y + 30 },
    };
    set({ nodes: [...get().nodes, newNode], selectedNode: newNode });
  },

  deleteNode: (nodeId) => {
    set((state) => ({
      nodes: state.nodes.filter(n => n.id !== nodeId),
      edges: state.edges.filter(e => e.source !== nodeId && e.target !== nodeId),
      selectedNode: state.selectedNode?.id === nodeId ? null : state.selectedNode,
    }));
  },

  addParticle: (particle) => {
    set({ particles: [...get().particles, particle] });
  },

  removeParticle: (particleId) => {
    set({ particles: get().particles.filter(p => p.id !== particleId) });
  },

  startSimulation: () => set({ 
    isSimulating: true, 
    isPaused: false, 
    particles: [],
    simulationStats: {
      totalRequests: 0,
      cacheHits: 0,
      cacheMisses: 0,
      queueMessages: 0,
      activeRequests: 0
    },
    metrics: {
      requestsPerSecond: 0,
      averageLatency: 0,
      throughput: 0,
      errorRate: 0,
      queueSize: 0,
      cacheHitRatio: 0
    }
  }),
  pauseSimulation: () => set({ isPaused: true }),
  resumeSimulation: () => set({ isPaused: false }),
  stopSimulation: () => set({ isSimulating: false, isPaused: false, particles: [] }),
  resetSimulation: () => set({ 
    isSimulating: false, 
    isPaused: false, 
    particles: [],
    simulationStats: {
      totalRequests: 0,
      cacheHits: 0,
      cacheMisses: 0,
      queueMessages: 0,
      activeRequests: 0
    },
    metrics: {
      requestsPerSecond: 0,
      averageLatency: 0,
      throughput: 0,
      errorRate: 0,
      queueSize: 0,
      cacheHitRatio: 0
    }
  }),
}));
