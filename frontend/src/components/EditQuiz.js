import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { apiUrl } from '../config';

function EditQuiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/quizzes/${quizId}`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      })
      .then(res => {
        setTitle(res.data.title);
        setQuestions(res.data.questions);
      })
      .finally(() => setLoading(false));
  }, [quizId]);

  const handleChange = (idx, field, value) => {
    const updated = [...questions];
    if (field === 'text') updated[idx].text = value;
    else if (field.startsWith('option')) updated[idx].options[parseInt(field.slice(-1))] = value;
    else if (field === 'correct') updated[idx].correct = parseInt(value);
    setQuestions(updated);
  };

  const addQuestion = () =>
    setQuestions([...questions, { text: '', options: ['', '', '', ''], correct: 0 }]);

  const removeQuestion = idx =>
    setQuestions(questions.filter((_, i) => i !== idx));

  const handleSubmit = async e => {
    e.preventDefault();
    setUpdating(true);
    await axios.put(
      `${apiUrl}/api/quizzes/${quizId}`,
      {
        title,
        questions
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
    );
    setUpdating(false);
    alert('Quiz updated!');
    navigate('/dashboard');
  };

  if (loading) return <div className="create-quiz-container">Loading...</div>;

  return (
    <div className="create-quiz-container">
      <div className="create-quiz-title">Edit Quiz</div>
      <form className="quiz-form" onSubmit={handleSubmit}>
        <input
          className="quiz-input"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Quiz Title"
          required
        />
        {questions.map((q, idx) => (
          <div className="question-block" key={idx}>
            <div className="question-label">Question {idx + 1}</div>
            <input
              className="quiz-input"
              value={q.text}
              onChange={e => handleChange(idx, 'text', e.target.value)}
              placeholder="Question Text"
              required
            />
            <div className="question-options">
              {[0, 1, 2, 3].map(i => (
                <input
                  key={i}
                  className="quiz-input"
                  value={q.options[i]}
                  onChange={e => handleChange(idx, `option${i}`, e.target.value)}
                  placeholder={`Option ${i + 1}`}
                  required
                />
              ))}
            </div>
            <div>
              <label style={{ fontWeight: 500, color: '#4a5568' }}>
                Correct Answer (0-3):
              </label>
              <input
                className="quiz-input"
                type="number"
                min="0"
                max="3"
                value={q.correct}
                onChange={e => handleChange(idx, 'correct', e.target.value)}
                required
                style={{ width: '80px', display: 'inline-block', marginLeft: '10px' }}
              />
            </div>
            {questions.length > 1 && (
              <button
                type="button"
                className="remove-question-btn"
                onClick={() => removeQuestion(idx)}
              >
                Remove Question
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="add-question-btn"
          onClick={addQuestion}
        >
          Add Question
        </button>
        <button
          type="submit"
          className="create-quiz-btn"
          disabled={updating}
        >
          {updating ? 'Updating...' : 'Update Quiz'}
        </button>
      </form>
    </div>
  );
}

export default EditQuiz;

