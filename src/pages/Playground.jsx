import { useRef, useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useCanvasStore } from '../store/useCanvasStore';
import { SystemNode } from '../components/SystemNode';
import { ComponentLibrary } from '../components/ComponentLibrary';
import { PropertiesPanel } from '../components/PropertiesPanel';
import { LogOut, ArrowLeft, Trash2, Play, Save } from 'lucide-react';

const nodeTypes = {
  system: SystemNode,
};

let nodeId = 0;
const getNodeId = () => `node_${nodeId++}`;

export const Playground = () => {
  const reactFlowWrapper = useRef(null);
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect, 
    addNode, 
    setSelectedNode,
    clearCanvas 
  } = useCanvasStore();
  const [, setNodes, onNodesChangeInternal] = useNodesState(nodes);
  const [, setEdges, onEdgesChangeInternal] = useEdgesState(edges);

  const handleNodesChange = useCallback(
    (changes) => {
      onNodesChange(changes);
      onNodesChangeInternal(changes);
      const deleteChange = changes.find(c => c.type === 'remove');
      if (deleteChange) {
        setSelectedNode(null);
      }
    },
    [onNodesChange, onNodesChangeInternal, setSelectedNode]
  );

  const handleEdgesChange = useCallback(
    (changes) => {
      onEdgesChange(changes);
      onEdgesChangeInternal(changes);
    },
    [onEdgesChange, onEdgesChangeInternal]
  );

  const handleConnect = useCallback(
    (params) => {
      onConnect(params);
    },
    [onConnect]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow/type');
      if (!type) return;

      const position = { x: event.clientX - 100, y: event.clientY - 50 };
      const newNode = {
        id: getNodeId(),
        type: 'system',
        position,
        data: { type, label: '' },
      };

      addNode(newNode);
    },
    [addNode]
  );

  const onNodeClick = useCallback(
    (_event, node) => {
      setSelectedNode(node);
    },
    [setSelectedNode]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700 px-6 py-3 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-xl font-bold text-white">System Design Playground</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={clearCanvas}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors">
            <Play className="w-4 h-4" />
            Simulate
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
            <Save className="w-4 h-4" />
            Save
          </button>
          <div className="h-6 w-px bg-gray-600 mx-2" />
          <div className="flex items-center gap-2 text-gray-300">
            <span className="text-sm">{user?.email}</span>
          </div>
          <button
            onClick={signOut}
            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        <ComponentLibrary />
        
        <div className="flex-1" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={handleNodesChange}
            onEdgesChange={handleEdgesChange}
            onConnect={handleConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            fitView
            className="bg-gray-900"
          >
            <Background color="#374151" gap={20} />
            <Controls className="bg-gray-800 border border-gray-700" />
            <MiniMap
              className="bg-gray-800 border border-gray-700"
              nodeColor={(node) => {
                const colors = {
                  client: '#60a5fa',
                  loadBalancer: '#a78bfa',
                  apiGateway: '#f472b6',
                  server: '#4ade80',
                  cache: '#facc15',
                  database: '#fb923c',
                  readReplica: '#fbbf24',
                  queue: '#22d3ee',
                };
                return colors[node.data.type] || '#60a5fa';
              }}
            />
          </ReactFlow>
        </div>

        <PropertiesPanel />
      </div>
    </div>
  );
};
