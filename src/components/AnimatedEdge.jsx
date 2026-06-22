import { useEffect, useState } from 'react';
import { getBezierPath } from 'reactflow';
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
}) => {
  const [path, setPath] = useState('');
  const { isSimulating } = useCanvasStore();
  
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

  const simulatingStyle = {
    ...style,
    strokeDasharray: '5,5',
    animation: 'dashdraw 1s linear infinite',
  };

  return (
    <path
      id={id}
      style={isSimulating ? simulatingStyle : style}
      className={`react-flow__edge-path`}
      d={path}
      markerEnd={markerEnd}
      stroke="#3b82f6"
      strokeWidth={2}
      fill="none"
    />
  );
};
