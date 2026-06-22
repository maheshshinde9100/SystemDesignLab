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
      link: '/templates',
      color: 'bg-purple-600 hover:bg-purple-700',
    },
    {
      title: 'Learning Center',
      description: 'Learn about system design concepts',
      icon: BookOpen,
      link: '/learning-center',
      color: 'bg-green-600 hover:bg-green-700',
    },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black">
      <nav className="bg-gray-800/50 backdrop-blur-md border-b border-gray-700/50 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">System Design Lab</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-300">
              <User className="w-5 h-5" />
              <span>{user?.email}</span>
            </div>
            <button
              onClick={signOut}
              className="bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-6 py-12 relative">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px] pointer-events-none"></div>
        <div className="mb-12 relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Welcome back!</h2>
          <p className="text-gray-400 text-lg">Design, visualize, and simulate distributed systems</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <Link
                key={idx}
                to={action.link}
                className={`${action.color} p-6 rounded-2xl transition-all hover:-translate-y-1 shadow-lg group relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-wide">{action.title}</h3>
                </div>
                <p className="text-gray-100/90 leading-relaxed relative z-10">{action.description}</p>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
              Recent Projects
            </h3>
            <ProjectList />
          </div>
          <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-purple-500 rounded-full"></span>
              Favorites
            </h3>
            <div className="flex flex-col items-center justify-center h-48 text-gray-400 bg-gray-800/30 rounded-xl border border-dashed border-gray-700">
              <p>No favorites yet.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
