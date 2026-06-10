import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { ProjectList } from '../components/ProjectList';
import { LogOut, User, PlaySquare, BookOpen, Plus } from 'lucide-react';

export const Dashboard = () => {
  const { user, signOut } = useAuthStore();

  const quickActions = [
    {
      title: 'New Playground',
      description: 'Start designing a new system architecture',
      icon: Plus,
      link: '/playground',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      title: 'Templates',
      description: 'Browse pre-built system design templates',
      icon: PlaySquare,
      link: '#',
      color: 'bg-purple-600 hover:bg-purple-700',
    },
    {
      title: 'Learning Center',
      description: 'Learn about system design concepts',
      icon: BookOpen,
      link: '#',
      color: 'bg-green-600 hover:bg-green-700',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">System Design Playground</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-300">
              <User className="w-5 h-5" />
              <span>{user?.email}</span>
            </div>
            <button
              onClick={signOut}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-white mb-2">Welcome back!</h2>
          <p className="text-gray-400 text-lg">Design, visualize, and simulate distributed systems</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <Link
                key={idx}
                to={action.link}
                className={`${action.color} p-6 rounded-xl transition-colors group`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="w-8 h-8 text-white" />
                  <h3 className="text-xl font-semibold text-white">{action.title}</h3>
                </div>
                <p className="text-gray-100 opacity-80">{action.description}</p>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Projects</h3>
            <ProjectList />
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Favorites</h3>
            <p className="text-gray-400">No favorites yet.</p>
          </div>
        </div>
      </main>
    </div>
  );
};
