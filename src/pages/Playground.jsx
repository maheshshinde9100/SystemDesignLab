import { useRef, useCallback, useState, useEffect } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap,
  useReactFlow,
} from 'reactflow';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useCanvasStore } from '../store/useCanvasStore';
import { SystemNode } from '../components/SystemNode';
import { ComponentLibrary } from '../components/ComponentLibrary';
import { PropertiesPanel } from '../components/PropertiesPanel';
import { ContextMenu } from '../components/ContextMenu';
import { AnimatedEdge } from '../components/AnimatedEdge';
import { SimulationEngine } from '../components/SimulationEngine';
import { SimulationParticles } from '../components/SimulationParticles';
import { LogOut, ArrowLeft, Trash2, Play, Square, Save, X, Pause, RotateCcw, Download, Upload } from 'lucide-react';

const nodeTypes = {
  system: SystemNode,
};

const edgeTypes = {
  default: AnimatedEdge,
};

let nodeIdCounter = 0;
const getNodeId = () => `node_${nodeIdCounter++}`;

export const Playground = () => {
  const reactFlowWrapper = useRef(null);
  const reactFlowInstance = useRef(null);
  const navigate = useNavigate();
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [saveError, setSaveError] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const { screenToFlowPosition } = useReactFlow();
  
  const { user, signOut } = useAuthStore();
  const { 
    nodes, 
    edges, 
    currentProject,
    isSimulating,
    isPaused,
    simulationSpeed,
    metrics,
    onNodesChange, 
    onEdgesChange, 
    onConnect, 
    addNode, 
    setSelectedNode,
    clearCanvas,
    saveProject,
    fetchProjects,
    copyNode,
    pasteNode,
    duplicateNode,
    deleteNode,
    setContextMenu,
    startSimulation,
    pauseSimulation,
    resumeSimulation,
    stopSimulation,
    resetSimulation,
    setSimulationSpeed,
    setNodes,
    setEdges,
  } = useCanvasStore();

  const handleNodesChange = useCallback(
    (changes) => {
      onNodesChange(changes);
      const deleteChange = changes.find(c => c.type === 'remove');
      if (deleteChange) {
        setSelectedNode(null);
      }
    },
    [onNodesChange, setSelectedNode]
  );

  const handleEdgesChange = useCallback(
    (changes) => {
      onEdgesChange(changes);
    },
    [onEdgesChange]
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

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getNodeId(),
        type: 'system',
        position,
        data: { type, label: '' },
      };

      addNode(newNode);
    },
    [addNode, screenToFlowPosition]
  );

  const onNodeClick = useCallback(
    (_event, node) => {
      setSelectedNode(node);
    },
    [setSelectedNode]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setContextMenu(null);
  }, [setSelectedNode, setContextMenu]);

  const onContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      setContextMenu({ x: event.clientX, y: event.clientY });
    },
    [setContextMenu]
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      const selectedNode = useCanvasStore.getState().selectedNode;

      if (event.ctrlKey || event.metaKey) {
        if (event.key === 'c' && selectedNode) {
          copyNode(selectedNode);
        }
        if (event.key === 'v') {
          pasteNode({ x: 100, y: 100 });
        }
        if (event.key === 'd' && selectedNode) {
          duplicateNode(selectedNode);
        }
      }
      if (event.key === 'Delete' && selectedNode) {
        deleteNode(selectedNode.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [copyNode, pasteNode, duplicateNode, deleteNode]);

  const handleOpenSaveModal = () => {
    setProjectName(currentProject?.name || '');
    setSaveError('');
    setSaveSuccess(false);
    setIsSaveModalOpen(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!projectName.trim()) {
      setSaveError('Please enter a project name');
      return;
    }

    setSaving(true);
    setSaveError('');
    setSaveSuccess(false);
    try {
      const savedProject = await saveProject(projectName.trim());
      setSaveSuccess(true);
      await fetchProjects();
      setTimeout(() => setIsSaveModalOpen(false), 1500);
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleExportJSON = () => {
    const data = JSON.stringify({ nodes, edges }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentProject?.name || 'system-design'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.nodes && data.edges) {
          setNodes(data.nodes);
          setEdges(data.edges);
        }
      } catch (err) {
        console.error('Error importing JSON:', err);
      }
    };
    reader.readAsText(file);
  };

  const handleExportPNG = async () => {
    if (!reactFlowInstance.current) return;
    const svg = await reactFlowInstance.current.toSVG();
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#111827';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        const pngUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = pngUrl;
        a.download = `${currentProject?.name || 'system-design'}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(pngUrl);
      });
    };
    img.src = url;
  };

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
          <div>
            <h1 className="text-xl font-bold text-white">System Design Playground</h1>
            {currentProject && (
              <p className="text-sm text-gray-400">{currentProject.name}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={clearCanvas}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
            >
              <Upload className="w-4 h-4" />
              Import
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept="application/json"
              className="hidden"
              onChange={handleImportJSON}
            />
            <button
              onClick={handleExportJSON}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
            >
              <Download className="w-4 h-4" />
              Export JSON
            </button>
            <button
              onClick={handleExportPNG}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
            >
              <Download className="w-4 h-4" />
              Export PNG
            </button>
          </div>
          <button
            onClick={handleOpenSaveModal}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          >
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

      <div className="bg-gray-800 border-b border-gray-700 px-6 py-3 flex items-center gap-4 shrink-0">
        <span className="text-gray-300 font-semibold">Simulation:</span>
        <button
          onClick={isSimulating ? (isPaused ? resumeSimulation : pauseSimulation) : startSimulation}
          className={`flex items-center gap-2 ${
            isSimulating ? (isPaused ? 'bg-green-600 hover:bg-green-700' : 'bg-yellow-600 hover:bg-yellow-700') : 'bg-green-600 hover:bg-green-700'
          } text-white px-4 py-2 rounded transition-colors`}
        >
          {isSimulating ? (isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />) : <Play className="w-4 h-4" />}
          {isSimulating ? (isPaused ? 'Resume' : 'Pause') : 'Start'}
        </button>
        <button
          onClick={stopSimulation}
          disabled={!isSimulating}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-900 text-white px-4 py-2 rounded transition-colors"
        >
          <Square className="w-4 h-4" />
          Stop
        </button>
        <button
          onClick={resetSimulation}
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
        <div className="flex items-center gap-2">
          <span className="text-gray-300 text-sm">Speed:</span>
          <select
            value={simulationSpeed}
            onChange={(e) => setSimulationSpeed(Number(e.target.value))}
            className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
          >
            <option value={1}>1x</option>
            <option value={2}>2x</option>
            <option value={5}>5x</option>
            <option value={10}>10x</option>
          </select>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <ComponentLibrary />
        
        <div className="flex-1" ref={reactFlowWrapper}>
          <ReactFlow
            ref={reactFlowInstance}
            nodes={nodes}
            edges={edges}
            onNodesChange={handleNodesChange}
            onEdgesChange={handleEdgesChange}
            onConnect={handleConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onContextMenu={onContextMenu}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
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
                  microservice: '#fb7185',
                  cdn: '#818cf8',
                };
                return colors[node.data.type] || '#60a5fa';
              }}
            />
            <SimulationParticles />
          </ReactFlow>
        </div>

        <div className="w-72 bg-gray-800 border-l border-gray-700 flex flex-col">
          <PropertiesPanel />
          {isSimulating && (
            <div className="border-t border-gray-700 p-4">
              <h3 className="text-white font-semibold mb-4">Metrics</h3>
              <div className="space-y-3">
                <div className="bg-gray-700 p-3 rounded-lg">
                  <span className="text-gray-300 text-xs">Requests/sec</span>
                  <p className="text-white text-lg font-bold">{metrics.requestsPerSecond.toFixed(1)}</p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <span className="text-gray-300 text-xs">Avg Latency</span>
                  <p className="text-white text-lg font-bold">{metrics.averageLatency.toFixed(1)} ms</p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <span className="text-gray-300 text-xs">Throughput</span>
                  <p className="text-white text-lg font-bold">{metrics.throughput.toFixed(1)}</p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <span className="text-gray-300 text-xs">Error Rate</span>
                  <p className="text-white text-lg font-bold">{(metrics.errorRate * 100).toFixed(1)}%</p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <span className="text-gray-300 text-xs">Queue Size</span>
                  <p className="text-white text-lg font-bold">{metrics.queueSize}</p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <span className="text-gray-300 text-xs">Cache Hit Ratio</span>
                  <p className="text-white text-lg font-bold">{(metrics.cacheHitRatio * 100).toFixed(1)}%</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ContextMenu />
      <SimulationEngine />

      {isSaveModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Save Project</h2>
              <button
                onClick={() => setIsSaveModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Project Name</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
                  placeholder="My Awesome System"
                  autoFocus
                />
              </div>
              {saveError && (
                <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-2 rounded-lg text-sm">
                  {saveError}
                </div>
              )}
              {saveSuccess && (
                <div className="bg-green-900/50 border border-green-500 text-green-200 px-4 py-2 rounded-lg text-sm">
                  Project saved successfully!
                </div>
              )}
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsSaveModalOpen(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg transition-colors"
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
