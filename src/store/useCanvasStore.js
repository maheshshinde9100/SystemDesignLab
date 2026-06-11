import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import { supabase } from '../lib/supabase';

let nodeIdCounter = 0;
const getNodeId = () => `node_${nodeIdCounter++}`;

export const useCanvasStore = create((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
  currentProject: null,
  projects: [],
  loadingProjects: false,
  isSimulating: false,
  simulationSpeed: 1,
  contextMenu: null,
  clipboard: null,
  
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  setSelectedNode: (node) => set({ selectedNode: node }),
  setCurrentProject: (project) => set({ currentProject: project }),
  setIsSimulating: (val) => set({ isSimulating: val }),
  setSimulationSpeed: (speed) => set({ simulationSpeed: speed }),
  setContextMenu: (menu) => set({ contextMenu: menu }),
  
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

    if (result.error) throw result.error;
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
      console.error('Error fetching projects:', error);
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

    if (error) throw error;
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

  startSimulation: () => set({ isSimulating: true }),
  stopSimulation: () => set({ isSimulating: false }),
}));
