import { Handle, Position } from 'reactflow';
import { 
  Monitor, 
  Server, 
  Database, 
  HardDrive, 
  RadioTower, 
  MessageSquare, 
  Layers,
  Cpu,
  Cloud,
  Shield,
  ShieldAlert,
  Box,
  Network,
  Hexagon
} from 'lucide-react';

const componentConfigs = {
  client: { icon: Monitor, color: 'text-blue-400', bg: 'bg-blue-900/30', label: 'Client' },
  loadBalancer: { icon: RadioTower, color: 'text-purple-400', bg: 'bg-purple-900/30', label: 'Load Balancer' },
  apiGateway: { icon: Layers, color: 'text-pink-400', bg: 'bg-pink-900/30', label: 'API Gateway' },
  server: { icon: Server, color: 'text-green-400', bg: 'bg-green-900/30', label: 'Backend' },
  cache: { icon: Layers, color: 'text-yellow-400', bg: 'bg-yellow-900/30', label: 'Cache' },
  database: { icon: Database, color: 'text-orange-400', bg: 'bg-orange-900/30', label: 'Database' },
  readReplica: { icon: HardDrive, color: 'text-amber-400', bg: 'bg-amber-900/30', label: 'Read Replica' },
  queue: { icon: MessageSquare, color: 'text-cyan-400', bg: 'bg-cyan-900/30', label: 'Queue' },
  microservice: { icon: Cpu, color: 'text-rose-400', bg: 'bg-rose-900/30', label: 'Microservice' },
  cdn: { icon: Cloud, color: 'text-indigo-400', bg: 'bg-indigo-900/30', label: 'CDN' },
  firewall: { icon: Shield, color: 'text-red-400', bg: 'bg-red-900/30', label: 'Firewall' },
  waf: { icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-900/50', label: 'WAF' },
  s3: { icon: Box, color: 'text-emerald-400', bg: 'bg-emerald-900/30', label: 'S3 Bucket' },
  nat: { icon: Network, color: 'text-teal-400', bg: 'bg-teal-900/30', label: 'NAT Gateway' },
  graphql: { icon: Hexagon, color: 'text-fuchsia-400', bg: 'bg-fuchsia-900/30', label: 'GraphQL API' },
};

export const SystemNode = ({ data, selected }) => {
  const config = componentConfigs[data.type] || componentConfigs.server;
  const Icon = config.icon;

  return (
    <div className={`shadow-lg rounded-lg border-2 ${selected ? 'border-blue-500' : 'border-gray-600'} bg-gray-800 min-w-[160px]`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-blue-500" />
      <div className={`p-3 flex items-center gap-2 ${config.bg} rounded-t-lg`}>
        <Icon className={`w-5 h-5 ${config.color}`} />
        <span className="font-semibold text-white text-sm">{data.label || config.label}</span>
      </div>
      {data.subtitle && (
        <div className="p-2 text-xs text-gray-400 text-center border-t border-gray-700">
          {data.subtitle}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-blue-500" />
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-green-500" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-green-500" />
    </div>
  );
};
