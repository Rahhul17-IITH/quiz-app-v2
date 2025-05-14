const { createQuiz, getQuizzesByUser, getQuizById, updateQuiz } = require('../models/Quiz');
const { v4: uuidv4 } = require('uuid');
const { dynamoDb } = require('../config');
const QUIZZES_TABLE = 'QuizAppQuizzes';

exports.createQuiz = async (req, res) => {
  const { title, questions } = req.body;
  const username = req.user.username;
  const quiz = { quizId: uuidv4(), username, title, questions };
  await createQuiz(quiz);
  res.json({ message: 'Quiz created!' });
};

exports.getQuizzes = async (req, res) => {
  const username = req.user.username;
  const quizzes = await getQuizzesByUser(username);
  res.json(quizzes);
};

exports.getQuiz = async (req, res) => {
  const { quizId } = req.params;
  const quiz = await getQuizById(quizId);
  if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
  res.json(quiz);
};

exports.updateQuiz = async (req, res) => {
  const { quizId } = req.params;
  const { title, questions } = req.body;
  await updateQuiz(quizId, { title, questions });
  res.json({ message: 'Quiz updated!' });
};

exports.deleteQuiz = async (req, res) => {
  const { quizId } = req.params;
  try {
    await dynamoDb.delete({
      TableName: QUIZZES_TABLE,
      Key: { quizId }
    }).promise();
    res.json({ message: 'Quiz deleted!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
};
