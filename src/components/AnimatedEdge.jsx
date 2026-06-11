import { useRef, useEffect, useState } from 'react';
import { getBezierPath, EdgeProps } from 'reactflow';
import { useCanvasStore } from '../store/useCanvasStore';

export const AnimatedEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: EdgeProps) => {
  const [path, setPath] = useState('');
  const [particles, setParticles] = useState<{ id: string; progress: number }[]>([]);
  const { isSimulating, nodes } = useCanvasStore();
  
  const svgRef = useRef<SVGGElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const [bezierPath] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });
    setPath(bezierPath);
  }, [sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition]);

  useEffect(() => {
    if (!isSimulating) {
      setParticles([]);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      // Check if we should generate a new particle from a client
      const sourceNode = nodes.find(n => n.id === data?.sourceNodeId);
      if (sourceNode?.data.type === 'client' && Math.random() > 0.99) {
        setParticles(prev => [
          ...prev,
          { id: `p-${Date.now()}-${Math.random()}`, progress: 0 }
        ]);
      }

      // Update existing particles
      setParticles(prev => 
        prev.map(p => ({ ...p, progress: p.progress + delta * 0.5 }))
            .filter(p => p.progress <= 1)
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isSimulating, nodes, data]);

  const getPointOnPath = (progress: number) => {
    if (!svgRef.current) return { x: sourceX, y: sourceY };
    const pathEl = svgRef.current.querySelector('path');
    if (!pathEl) return { x: sourceX, y: sourceY };
    const length = pathEl.getTotalLength();
    const point = pathEl.getPointAtLength(progress * length);
    return { x: point.x, y: point.y };
  };

  return (
    <g ref={svgRef}>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={path}
        markerEnd={markerEnd}
        stroke="#3b82f6"
        strokeWidth={2}
        fill="none"
      />
      {particles.map(particle => {
        const point = getPointOnPath(particle.progress);
        return (
          <circle
            key={particle.id}
            cx={point.x}
            cy={point.y}
            r={5}
            fill="#3b82f6"
            className="drop-shadow-lg"
          />
        );
      })}
    </g>
  );
};
