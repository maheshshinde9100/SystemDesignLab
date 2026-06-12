import { useCanvasStore } from '../store/useCanvasStore';
import { useState, useEffect, useRef } from 'react';

export const PropertiesPanel = () => {
  const { selectedNode, updateNodeData } = useCanvasStore();
  const [label, setLabel] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const labelInputRef = useRef(null);
  const subtitleInputRef = useRef(null);

  // Update local state when selected node changes
  useEffect(() => {
    if (selectedNode) {
      setLabel(selectedNode.data.label || '');
      setSubtitle(selectedNode.data.subtitle || '');
    }
  }, [selectedNode?.id]); // Only update when selected node ID changes

  if (!selectedNode) {
    return (
      <div className="bg-gray-800 border-l border-gray-700 w-64 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-bold text-white">Properties</h2>
        </div>
        <div className="p-4 flex-1 flex items-center justify-center text-gray-500">
          Select a component to edit
        </div>
      </div>
      );
    }

  const handleLabelBlur = () => {
    updateNodeData(selectedNode.id, { label: label });
  };

  const handleSubtitleBlur = () => {
    updateNodeData(selectedNode.id, { subtitle: subtitle });
  };

  const handleLabelKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLabelBlur();
    }
  };

  const handleSubtitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubtitleBlur();
    }
  };

  return (
    <div className="bg-gray-800 border-l border-gray-700 w-64 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-bold text-white">Properties</h2>
      </div>
      <div className="p-4 flex-1 overflow-y-auto space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Label</label>
          <input
            type="text"
            ref={labelInputRef}
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onBlur={handleLabelBlur}
            onKeyDown={handleLabelKeyDown}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Subtitle</label>
          <input
            type="text"
            ref={subtitleInputRef}
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            onBlur={handleSubtitleBlur}
            onKeyDown={handleSubtitleKeyDown}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="e.g., 100 RPS"
          />
        </div>
      </div>
    </div>
  );
};
