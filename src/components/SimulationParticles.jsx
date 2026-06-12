import React, { useRef, useEffect } from 'react';
import { useStore } from 'reactflow';
import { useCanvasStore } from '../store/useCanvasStore';

export function SimulationParticles() {
  const { particles, edges } = useCanvasStore();
  const { nodeInternals } = useStore((state) => ({
    nodeInternals: state.nodeInternals,
  }));

  const getEdgeCenter = (edge) => {
    const sourceNode = nodeInternals.get(edge.source);
    const targetNode = nodeInternals.get(edge.target);
    
    if (!sourceNode || !targetNode) return null;

    const sourceX = sourceNode.position.x + sourceNode.width / 2;
    const sourceY = sourceNode.position.y + sourceNode.height / 2;
    const targetX = targetNode.position.x + targetNode.width / 2;
    const targetY = targetNode.position.y + targetNode.height / 2;

    return { sourceX, sourceY, targetX, targetY };
  };

  return (
    <svg className="absolute inset-0 pointer-events-none z-10" style={{ overflow: 'visible' }}>
      {particles.map((particle) => {
        const edge = edges.find((e) => e.id === particle.edgeId);
        if (!edge) return null;

        const center = getEdgeCenter(edge);
        if (!center) return null;

        const { sourceX, sourceY, targetX, targetY } = center;
        const x = sourceX + (targetX - sourceX) * particle.progress;
        const y = sourceY + (targetY - sourceY) * particle.progress;

        return (
          <g key={particle.id}>
            <circle
              cx={x}
              cy={y}
              r={6}
              fill={particle.color}
              style={{
                filter: 'drop-shadow(0 0 4px ' + particle.color + ')',
              }}
            />
            <circle
              cx={x}
              cy={y}
              r={4}
              fill="white"
            />
          </g>
        );
      })}
    </svg>
  );
}
