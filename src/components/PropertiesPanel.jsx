import { useCanvasStore } from '../store/useCanvasStore';

export const PropertiesPanel = () => {
  const { selectedNode, updateNodeData } = useCanvasStore();

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

  const handleChange = (key, value) => {
    updateNodeData(selectedNode.id, { [key]: value });
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
            value={selectedNode.data.label || ''}
            onChange={(e) => handleChange('label', e.target.value)}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Subtitle</label>
          <input
            type="text"
            value={selectedNode.data.subtitle || ''}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="e.g., 100 RPS"
          />
        </div>
      </div>
    </div>
  );
};
