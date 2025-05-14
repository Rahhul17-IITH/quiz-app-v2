import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../config';

function Dashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuizzes = () => {
    axios
      .get(`${apiUrl}/api/quizzes`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      })
      .then(res => setQuizzes(res.data))
      .catch(() => setQuizzes([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.location = '/login';
  };

  const handleDelete = async (quizId) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      await axios.delete(`${apiUrl}/api/quizzes/${quizId}`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      });
      fetchQuizzes();
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Quiz Dashboard</h2>
        <div>
          <a href="/create" className="add-question-btn" style={{ marginRight: 12 }}>
            + Create New Quiz
          </a>
          <button onClick={handleSignOut} style={{
            background: '#e53e3e',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 18px',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer'
          }}>
            Sign Out
          </button>
        </div>
      </div>
      <h4 style={{ marginBottom: '18px', color: '#4a5568' }}>Your Quizzes</h4>
      {loading ? (
        <div style={{ textAlign: 'center', color: '#888' }}>Loading...</div>
      ) : quizzes.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#888', marginTop: 24 }}>
          No quizzes found. Click "Create New Quiz" to add your first quiz!
        </div>
      ) : (
        <ul className="quiz-list">
          {quizzes.map(q => (
            <li key={q.quizId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 500, fontSize: '1.1rem' }}>{q.title}</span>
              <div>
                <a href={`/edit/${q.quizId}`} style={{ marginRight: 10 }}>Edit</a>
                <button
                  className="remove-question-btn"
                  style={{ padding: '7px 16px', fontSize: '0.98rem' }}
                  onClick={() => handleDelete(q.quizId)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;


