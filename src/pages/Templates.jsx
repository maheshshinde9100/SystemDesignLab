import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useCanvasStore } from '../store/useCanvasStore';
import { templates } from '../data/templates';
import { ArrowLeft, LogOut, PlaySquare } from 'lucide-react';

export const Templates = () => {
  const { user, signOut } = useAuthStore();
  const { clearCanvas, setNodes, setEdges, setCurrentProject } = useCanvasStore();
  const navigate = useNavigate();

  const useTemplate = (template) => {
    clearCanvas();
    setNodes(template.nodes);
    setEdges(template.edges);
    setCurrentProject(null);
    navigate('/playground');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </Link>
            <h1 className="text-2xl font-bold text-white">System Design Playground</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-sm">{user?.email}</span>
            </div>
            <button
              onClick={signOut}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-white mb-2">Templates</h2>
          <p className="text-gray-400 text-lg">Choose a pre-built system design template to get started</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template) => {
            const Icon = PlaySquare;
            return (
              <div
                key={template.id}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="w-10 h-10 text-purple-400" />
                  <h3 className="text-xl font-semibold text-white">{template.name}</h3>
                </div>
                <p className="text-gray-400 mb-4">{template.description}</p>
                <button
                  onClick={() => useTemplate(template)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Use Template
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
