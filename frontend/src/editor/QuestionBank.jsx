// // import React, { useState, useMemo, useEffect } from 'react';
// // import { useLocation, useNavigate } from 'react-router-dom';
// // import { FaPlus, FaHeart } from 'react-icons/fa';
// // import { mockProblems } from './mockData';
// // import { useDataContext } from '../store/DataContext';

// // const getDifficultyConfig = (difficulty) => {
// //   switch (difficulty) {
// //     case 'easy': return 'bg-green-500/10 text-green-400';
// //     case 'medium': return 'bg-yellow-500/10 text-yellow-400';
// //     case 'hard': return 'bg-red-500/10 text-red-400';
// //     default: return 'bg-slate-500/10 text-slate-400';
// //   }
// // };

// // const QuestionBank = () => {

// //   const [questions, setQuestions] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [difficultyFilter, setDifficultyFilter] = useState('all');
// //   const [isModalOpen, setIsModalOpen] = useState(false);

// //   const {email} = useDataContext();

// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   useEffect(() => {
// //     const formattedData = mockProblems.map(q => ({
// //       ...q,
// //       problem_id: q.id,
// //       created_at: new Date().toISOString(),
// //     }));
// //     setQuestions(formattedData);
// //   }, []);

// //   const filteredQuestions = useMemo(() => {
// //     return questions
// //       .filter(q => q.title.toLowerCase().includes(searchTerm.toLowerCase()))
// //       .filter(q => difficultyFilter === 'all' || q.difficulty === difficultyFilter);
// //   }, [questions, searchTerm, difficultyFilter]);

// //   return (
// //     <>
// //       <div className="min-h-screen bg-slate-900 text-slate-200 p-8">
// //         <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
// //           <div>
// //             <h1 className="text-3xl font-bold text-white">Question Bank</h1>
// //             <p className="text-slate-400">Select a problem to start practicing.</p>
// //           </div>
// //           {location.pathname === '/company/questions' && (
// //             <button
// //               onClick={() => setIsModalOpen(true)}
// //               className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-5 rounded-lg flex items-center mt-4 md:mt-0"
// //             >
// //               <FaPlus className="mr-2 text-xs" />
// //               <span>Add New Question</span>
// //             </button>
// //           )}
// //         </header>

// //         <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
// //           {/* Filter inputs can go here */}
// //         </div>

// //         <div className="bg-slate-800/50 rounded-xl shadow-lg border border-slate-700">
// //           <div className="divide-y divide-slate-700/50">
// //             {filteredQuestions.map(question => (
// //               <div
// //                 key={question.problem_id}
// //                 className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-slate-800 transition-colors duration-200"
// //               >
// //                 <div>
// //                   <h3 className="font-semibold text-white">{question.title}</h3>
// //                   <p className="text-sm text-slate-400">
// //                     Created on:{' '}
// //                     {new Date(question.created_at).toLocaleDateString('en-US', {
// //                       day: 'numeric',
// //                       month: 'short',
// //                       year: 'numeric'
// //                     })}
// //                   </p>
// //                 </div>
// //                 <div className="flex items-center gap-4 mt-3 sm:mt-0">
// //                   <span
// //                     className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${getDifficultyConfig(
// //                       question.difficulty
// //                     )}`}
// //                   >
// //                     {question.difficulty}
// //                   </span>
// //                   {/* Solve button now green */}
// //                   <button
// //                     onClick={() => navigate(`/practise/${question.problem_id}`)}
// //                     className="text-sm bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-4 rounded-lg"
// //                   >
// //                     Solve
// //                   </button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //           {filteredQuestions.length === 0 && (
// //             <div className="p-8 text-center text-slate-400">
// //               No questions found.
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       <footer className="text-center text-slate-400 text-sm mt-8 pb-4">
// //         Made with <FaHeart className="inline-block text-red-500 mx-1" /> by Issa Team
// //       </footer>

// //       {/* Modal placeholder */}
// //       {/* {isModalOpen && <AddQuestion onClose={() => setIsModalOpen(false)} />} */}
// //     </>
// //   );
// // };

// // export default QuestionBank;
// import React, { useState, useMemo, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { FaPlus, FaHeart } from 'react-icons/fa';
// import { mockProblems } from './mockData';
// import { useDataContext } from '../store/DataContext';

// const getDifficultyConfig = (difficulty) => {
//   switch (difficulty) {
//     case 'easy': return 'bg-green-500/10 text-green-400';
//     case 'medium': return 'bg-yellow-500/10 text-yellow-400';
//     case 'hard': return 'bg-red-500/10 text-red-400';
//     default: return 'bg-slate-500/10 text-slate-400';
//   }
// };

// const QuestionBank = () => {
//   const [questions, setQuestions] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [difficultyFilter, setDifficultyFilter] = useState('all');
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const { email } = useDataContext();  // 👈 gets email from context
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const formattedData = mockProblems.map(q => ({
//       ...q,
//       problem_id: q.id,
//       created_at: new Date().toISOString(),
//     }));
//     setQuestions(formattedData);
//   }, []);

//   const filteredQuestions = useMemo(() => {
//     return questions
//       .filter(q => q.title.toLowerCase().includes(searchTerm.toLowerCase()))
//       .filter(q => difficultyFilter === 'all' || q.difficulty === difficultyFilter);
//   }, [questions, searchTerm, difficultyFilter]);

//   return (
//     <>
//       <div className="min-h-screen bg-slate-900 text-slate-200 p-8">
//         {/* Header */}
//         <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
//           <div>
// <h1 className="text-4xl md:text-6xl font-black uppercase tracking-widest 
//   text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] text-center">
//   Big-O-Battle 
//   <span className="block text-indigo-400 mt-2 text-2xl md:text-3xl">DSA Contest</span>
// </h1>
//             {email && (
//               <p className="mt-2 text-sm text-indigo-400 font-medium">
//                 Logged in as: <span className="font-semibold text-white">{email}</span>
//               </p>
//             )}
//           </div>
//           {location.pathname === '/company/questions' && (
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-5 rounded-lg flex items-center mt-4 md:mt-0"
//             >
//               <FaPlus className="mr-2 text-xs" />
//               <span>Add New Question</span>
//             </button>
//           )}
//         </header>

//         {/* Filter Section */}
//         <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
//           {/* Filters go here later */}
//         </div>

//         {/* Question List */}
//         <div className="bg-slate-800/50 rounded-xl shadow-lg border border-slate-700">
//           <div className="divide-y divide-slate-700/50">
//             {filteredQuestions.map(question => (
//               <div
//                 key={question.problem_id}
//                 className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-slate-800 transition-colors duration-200"
//               >
//                 <div>
//                   <h3 className="font-semibold text-white">{question.title}</h3>
//                   <p className="text-sm text-slate-400">
//                     Created on:{' '}
//                     {new Date(question.created_at).toLocaleDateString('en-US', {
//                       day: 'numeric',
//                       month: 'short',
//                       year: 'numeric'
//                     })}
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-4 mt-3 sm:mt-0">
//                   <span
//                     className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${getDifficultyConfig(
//                       question.difficulty
//                     )}`}
//                   >
//                     {question.difficulty}
//                   </span>
//                   <button
//                     onClick={() => navigate(`/practise/${question.problem_id}`)}
//                     className="text-sm bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-4 rounded-lg"
//                   >
//                     Solve
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//           {filteredQuestions.length === 0 && (
//             <div className="p-8 text-center text-slate-400">
//               No questions found.
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="text-center text-slate-400 text-base mt-8 pb-4">
//         Made with <FaHeart className="inline-block text-red-500 mx-1 text-lg" /> 
//         <span className="font-semibold text-white text-lg">by Issa Team — keep it up 🚀</span>
//       </footer>

//       {/* Modal placeholder */}
//       {/* {isModalOpen && <AddQuestion onClose={() => setIsModalOpen(false)} />} */}
//     </>
//   );
// };

// export default QuestionBank;
import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaPlus, FaHeart, FaGamepad } from 'react-icons/fa';
import { mockProblems } from './mockData';
import { useDataContext } from '../store/DataContext';

const getDifficultyConfig = (difficulty) => {
  switch (difficulty) {
    case 'easy': return 'bg-green-600/10 text-green-400 border border-green-500/20';
    case 'medium': return 'bg-yellow-600/10 text-yellow-400 border border-yellow-500/20';
    case 'hard': return 'bg-red-600/10 text-red-400 border border-red-500/20';
    default: return 'bg-slate-600/10 text-slate-400 border border-slate-500/20';
  }
};

const QuestionBank = () => {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { email } = useDataContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const formattedData = mockProblems.map(q => ({
      ...q,
      problem_id: q.id,
      created_at: new Date().toISOString(),
    }));
    setQuestions(formattedData);
  }, []);

  const filteredQuestions = useMemo(() => {
    return questions
      .filter(q => q.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(q => difficultyFilter === 'all' || q.difficulty === difficultyFilter);
  }, [questions, searchTerm, difficultyFilter]);

  return (
    <div className="bg-slate-900 font-sans text-gray-200 h-screen flex flex-col p-8 md:p-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12">
        <div className="text-center md:text-left">
          <h1 className="text-6xl md:text-7xl font-extrabold uppercase tracking-widest text-white">
            Big-O-Battle
          </h1>
          <span className="block text-teal-400 mt-2 text-2xl md:text-3xl font-bold tracking-wider">
            ⚔️ DSA Contest Arena ⚔️
          </span>
          {email && (
            <p className="mt-2 text-sm text-teal-300 font-medium">
              <FaGamepad className="inline mr-2 text-teal-400" />
              Logged in as: <span className="font-bold text-white">{email}</span>
            </p>
          )}
        </div>
        {location.pathname === '/company/questions' && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-cyan-600 hover:to-blue-600 
            text-white font-semibold py-2.5 px-6 rounded-lg flex items-center shadow-lg shadow-blue-500/20 
            mt-6 md:mt-0 transition-transform transform hover:scale-105"
          >
            <FaPlus className="mr-2 text-sm" />
            Add New Question
          </button>
        )}
      </header>

      {/* Question List Container */}
      <div className="flex-grow overflow-hidden bg-slate-800/50 rounded-lg shadow-xl border border-slate-700">
        <div className="h-full overflow-y-auto divide-y divide-slate-700/50">
          {filteredQuestions.map(question => (
            <div
              key={question.problem_id}
              className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center 
              hover:bg-slate-700/50 transition-colors duration-200 cursor-pointer group"
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-100 group-hover:text-cyan-400 transition-colors">
                  {question.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
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
                  className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider 
                    ${getDifficultyConfig(question.difficulty)}`}
                >
                  {question.difficulty}
                </span>
                <button
                  onClick={() => navigate(`/practise/${question.problem_id}`)}
                  className="text-sm bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-md 
                  shadow-md shadow-green-500/20 transition-transform transform hover:scale-105"
                >
                  Play
                </button>
              </div>
            </div>
          ))}
          {filteredQuestions.length === 0 && (
            <div className="p-10 text-center text-slate-400 font-semibold tracking-wide">
              🎮 No challenges found — Ready up, warrior!
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-slate-400 text-sm mt-8 pb-4 tracking-wide">
        Made with <FaHeart className="inline-block text-red-500 mx-1 text-base" /> 
        <span className="font-semibold text-gray-100">by Issa Team</span> ⚡ Leveling up daily 🚀
      </footer>
    </div>
  );
};

export default QuestionBank;