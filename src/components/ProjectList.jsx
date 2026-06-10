import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCanvasStore } from '../store/useCanvasStore';
import { Trash2, Edit3, Calendar } from 'lucide-react';

export const ProjectList = () => {
  const { projects, loadingProjects, fetchProjects, loadProject, deleteProject } = useCanvasStore();
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleOpenProject = async (project) => {
    loadProject(project);
    navigate('/playground');
  };

  const handleDeleteProject = async (projectId) => {
    setDeletingId(projectId);
    try {
      await deleteProject(projectId);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString();
  };

  if (loadingProjects) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-400">Loading projects...</div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400 mb-4">No projects yet</p>
        <Link
          to="/playground"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg"
        >
          Create your first project
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-gray-700 rounded-lg p-4 flex items-center justify-between group"
        >
          <div
            className="flex-1 cursor-pointer"
            onClick={() => handleOpenProject(project)}
          >
            <h3 className="font-medium text-white">{project.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
              <Calendar className="w-4 h-4" />
              Updated {formatDate(project.updated_at)}
            </div>
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => handleOpenProject(project)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded-lg"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDeleteProject(project.id)}
              disabled={deletingId === project.id}
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-600 rounded-lg disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
