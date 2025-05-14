const express = require('express');
const router = express.Router();
const { createQuiz, getQuizzes, getQuiz, updateQuiz } = require('../controllers/quizController');
const { authMiddleware } = require('../middleware/auth');
const { deleteQuiz } = require('../controllers/quizController');


router.post('/', authMiddleware, createQuiz);
router.get('/', authMiddleware, getQuizzes);
router.get('/:quizId', authMiddleware, getQuiz);
router.put('/:quizId', authMiddleware, updateQuiz);
router.delete('/:quizId', authMiddleware, deleteQuiz);
module.exports = router;
