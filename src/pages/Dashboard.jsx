import { useAuthStore } from '../store/useAuthStore';
import { LogOut, User } from 'lucide-react';

export const Dashboard = () => {
  const { user, signOut } = useAuthStore();

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
        <h2 className="text-3xl font-bold text-white mb-4">Welcome to System Design Playground!</h2>
        <p className="text-gray-400 text-lg">This is your dashboard. More features coming soon...</p>
      </main>
    </div>
  );
};
