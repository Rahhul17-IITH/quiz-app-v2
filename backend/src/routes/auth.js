const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// Health check for ALB
router.get('/login', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;

