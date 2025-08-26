
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import QuestionBank from './editor/QuestionBank'; // Adjust path as needed
import CodingInterface from './editor/CodingInterface'; // Adjust path as needed
import { useDataContext } from './store/DataContext';
import Login from './components/Login';
import './App.css'; // Assuming you have a main CSS file
import DSAContestGuard from './components/DSAContestGuard';
function App() {
  const { token } = useDataContext();

  return (
    <div className="bg-slate-900 min-h-screen text-white p-4 sm:p-6 lg:p-8">
      {/* {token && <DSAContestGuard />} */}
      <Router>
        <Routes>
          
          {/* Public route */}
          <Route path="/" element={token ? <Navigate to="/questions" /> : <Login />} />

          {/* Protected routes */}
          {token && (
            <>
              <Route path="/questions" element={<QuestionBank />} />
              <Route path="/practise/:problemId" element={<CodingInterface />} />
              {/* Catch-all: redirect unknown paths back to /questions */}
              <Route path="*" element={<Navigate to="/questions" replace />} />
            </>
          )}

          {/* If no token and user tries a protected route, send back to login */}
          {!token && (
            <Route path="*" element={<Navigate to="/" replace />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
