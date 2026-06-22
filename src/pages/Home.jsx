import { Link } from 'react-router-dom';
import { Layers, Play, BookOpen } from 'lucide-react';

export const Home = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black flex items-center justify-center relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] pointer-events-none"></div>

      <div className="text-center px-4 z-10 max-w-4xl pt-16">
        <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mb-6 tracking-tight">
          System Design Lab
        </h1>
        
        <p className="text-gray-300 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
          Learn, visualize, design, and simulate distributed systems with interactive architecture diagrams and real-time traffic simulations.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Link
            to="/login"
            className="group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg shadow-blue-900/50 hover:shadow-blue-900/80 hover:-translate-y-1 w-full sm:w-auto"
          >
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Launch Playground
          </Link>
          <Link
            to="/learning-center"
            className="group flex items-center justify-center gap-2 bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur-md border border-gray-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:-translate-y-1 w-full sm:w-auto"
          >
            <BookOpen className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
            Learning Center
          </Link>
        </div>
      </div>
    </div>
  );
};
