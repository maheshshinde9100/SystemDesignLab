import { useCanvasStore } from '../store/useCanvasStore';
import { Trash2, Copy, Clipboard, CopyPlus } from 'lucide-react';

export const ContextMenu = () => {
  const { contextMenu, selectedNode, copyNode, pasteNode, duplicateNode, deleteNode, setContextMenu } = useCanvasStore();

  if (!contextMenu) return null;

  const handleCopy = () => {
    if (selectedNode) {
      copyNode(selectedNode);
    }
    setContextMenu(null);
  };

  const handlePaste = () => {
    pasteNode({ x: contextMenu.x, y: contextMenu.y });
    setContextMenu(null);
  };

  const handleDuplicate = () => {
    if (selectedNode) {
      duplicateNode(selectedNode);
    }
    setContextMenu(null);
  };

  const handleDelete = () => {
    if (selectedNode) {
      deleteNode(selectedNode.id);
    }
    setContextMenu(null);
  };

  return (
    <div
      className="fixed bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 min-w-[160px"
      style={{ left: contextMenu.x, top: contextMenu.y }}
    >
      {selectedNode && (
        <>
          <button
            onClick={handleCopy}
            className="w-full flex items-center gap-2 px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white text-sm"
          >
            <Copy className="w-4 h-4" /> Copy
          </button>
          <button
            onClick={handleDuplicate}
            className="w-full flex items-center gap-2 px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white text-sm"
          >
            <CopyPlus className="w-4 h-4" /> Duplicate
          </button>
          <button
            onClick={handleDelete}
            className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-gray-700 hover:text-red-300 text-sm"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </>
      )}
      {!selectedNode && (
        <button
          onClick={handlePaste}
          className="w-full flex items-center gap-2 px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white text-sm"
        >
          <Clipboard className="w-4 h-4" /> Paste
        </button>
      )}
    </div>
  );
};
