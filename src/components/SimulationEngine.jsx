import { useEffect, useRef } from 'react';
import { useCanvasStore } from '../store/useCanvasStore';

export const SimulationEngine = () => {
  const { nodes, edges, isSimulating } = useCanvasStore();
  const animationRef = useRef(null);
  
  // We'll manage particles via Zustand or local storage for now

  useEffect(() => {
    if (!isSimulating) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const runSimulation = () => {
      animationRef.current = requestAnimationFrame(runSimulation);
    };

    animationRef.current = requestAnimationFrame(runSimulation);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isSimulating, nodes, edges]);

  return null;
};
