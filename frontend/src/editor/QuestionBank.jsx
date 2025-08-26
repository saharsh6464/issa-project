import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { mockProblems } from './mockData';

// Helper function for styling difficulty tags
const getDifficultyConfig = (difficulty) => {
  switch (difficulty) {
    case 'easy': return 'bg-green-500/10 text-green-400';
    case 'medium': return 'bg-yellow-500/10 text-yellow-400';
    case 'hard': return 'bg-red-500/10 text-red-400';
    default: return 'bg-slate-500/10 text-slate-400';
  }
};

const QuestionBank = () => {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Load mock data and format it to be consistent
    const formattedData = mockProblems.map(q => ({
      ...q,
      problem_id: q.id, // Ensure a consistent ID key
      created_at: new Date().toISOString(), // Add a placeholder date
    }));
    setQuestions(formattedData);
  }, []);

  const filteredQuestions = useMemo(() => {
    return questions
      .filter(q => q.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(q => difficultyFilter === 'all' || q.difficulty === difficultyFilter);
  }, [questions, searchTerm, difficultyFilter]);

  return (
    <>
      <div>
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Question Bank</h1>
            <p className="text-slate-400">Select a problem to start practicing.</p>
          </div>
          {location.pathname === '/company/questions' && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-5 rounded-lg flex items-center"
            >
              <FaPlus className="mr-2 text-xs" />
              <span>Add New Question</span>
            </button>
          )}
        </header>

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
          {/* ... filter inputs ... */}
        </div>

        {/* Questions List */}
        <div className="bg-slate-800/50 rounded-xl shadow-lg border border-slate-700">
          <div className="divide-y divide-slate-700/50">
            {filteredQuestions.map(question => (
              <div
                key={question.problem_id}
                className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-slate-800 transition-colors duration-200"
              >
                <div>
                  <h3 className="font-semibold text-white">{question.title}</h3>
                  <p className="text-sm text-slate-400">
                    Created on:{' '}
                    {new Date(question.created_at).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-3 sm:mt-0">
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${getDifficultyConfig(
                      question.difficulty
                    )}`}
                  >
                    {question.difficulty}
                  </span>
                  <button
                    onClick={() => navigate(`/practise/${question.problem_id}`)}
                    className="text-sm text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    View Problem
                  </button>
                </div>
              </div>
            ))}
          </div>
          {filteredQuestions.length === 0 && (
            <div className="p-8 text-center text-slate-400">
              No questions found.
            </div>
          )}
        </div>
      </div>
      {/* Modal placeholder */}
      {/* {isModalOpen && <AddQuestion onClose={() => setIsModalOpen(false)} />} */}
    </>
  );
};

export default QuestionBank;
