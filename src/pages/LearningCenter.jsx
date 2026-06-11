import { Link, useParams } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { learningTopics } from '../data/learning-topics';
import { ArrowLeft, LogOut, BookOpen, CheckCircle, AlertCircle, Briefcase, MessageSquare } from 'lucide-react';

export const LearningCenter = () => {
  const { user, signOut } = useAuthStore();
  const { topicId } = useParams();
  const selectedTopic = learningTopics.find(t => t.id === topicId);

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
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {selectedTopic ? (
          <TopicDetail topic={selectedTopic} />
        ) : (
          <TopicsList />
        )}
      </main>
    </div>
  );
};

const TopicsList = () => {
  return (
    <>
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-white mb-2">Learning Center</h2>
        <p className="text-gray-400 text-lg">Explore system design concepts and prepare for interviews</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningTopics.map((topic) => (
          <Link
            key={topic.id}
            to={`/learning-center/${topic.id}`}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <BookOpen className="w-8 h-8 text-green-400" />
              <h3 className="text-xl font-semibold text-white">{topic.title}</h3>
            </div>
            <p className="text-gray-400">{topic.description}</p>
          </Link>
        ))}
      </div>
    </>
  );
};

const TopicDetail = ({ topic }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/learning-center"
        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to all topics
      </Link>

      <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-10 h-10 text-green-400" />
          <h2 className="text-3xl font-bold text-white">{topic.title}</h2>
        </div>

        <p className="text-gray-300 text-lg mb-8">{topic.description}</p>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            Explanation
          </h3>
          <p className="text-gray-300">{topic.explanation}</p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <section className="bg-gray-700 rounded-lg p-5">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Advantages
            </h4>
            <ul className="text-gray-300 space-y-2">
              {topic.advantages.map((adv, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  {adv}
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-gray-700 rounded-lg p-5">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              Disadvantages
            </h4>
            <ul className="text-gray-300 space-y-2">
              {topic.disadvantages.map((disadv, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  {disadv}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-400" />
            Use Cases
          </h3>
          <ul className="text-gray-300 space-y-2">
            {topic.useCases.map((useCase, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                {useCase}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-purple-400" />
            Interview Questions
          </h3>
          <ul className="text-gray-300 space-y-3">
            {topic.interviewQuestions.map((q, i) => (
              <li key={i} className="p-4 bg-gray-700 rounded-lg border-l-4 border-purple-500">
                {q}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            Real World Examples
          </h3>
          <div className="flex flex-wrap gap-3">
            {topic.realWorldExamples.map((example, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-full border border-blue-500/30"
              >
                {example}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
