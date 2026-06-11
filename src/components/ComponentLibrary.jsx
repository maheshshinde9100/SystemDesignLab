import { 
  Monitor, 
  Server, 
  Database, 
  HardDrive, 
  RadioTower, 
  MessageSquare, 
  Layers 
} from 'lucide-react';

const components = [
  { type: 'client', icon: Monitor, label: 'Client', color: 'text-blue-400' },
  { type: 'loadBalancer', icon: RadioTower, label: 'Load Balancer', color: 'text-purple-400' },
  { type: 'apiGateway', icon: Layers, label: 'API Gateway', color: 'text-pink-400' },
  { type: 'server', icon: Server, label: 'Backend Server', color: 'text-green-400' },
  { type: 'cache', icon: Layers, label: 'Cache', color: 'text-yellow-400' },
  { type: 'database', icon: Database, label: 'Database', color: 'text-orange-400' },
  { type: 'readReplica', icon: HardDrive, label: 'Read Replica', color: 'text-amber-400' },
  { type: 'queue', icon: MessageSquare, label: 'Message Queue', color: 'text-cyan-400' },
];

export const ComponentLibrary = ({ onAddNode }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow/type', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="bg-gray-800 border-r border-gray-700 w-64 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-bold text-white">Components</h2>
      </div>
      <div className="p-4 flex-1 overflow-y-auto space-y-2">
        {components.map((comp) => {
          const Icon = comp.icon;
          return (
            <div
              key={comp.type}
              onDragStart={(e) => onDragStart(e, comp.type)}
              draggable
              className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-grab flex items-center gap-3 transition-colors"
            >
              <Icon className={`w-5 h-5 ${comp.color}`} />
              <span className="text-sm text-gray-200">{comp.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
