import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">System Design Playground</h1>
        <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Learn, visualize, design, and simulate distributed systems with interactive architecture diagrams and real-time simulations
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Get Started
          </Link>
          <Link
            to="/register"
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};
