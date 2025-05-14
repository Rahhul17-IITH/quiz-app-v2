const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createUser, getUser } = require('../models/User');

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    await createUser(username, password);
    res.json({ message: 'Signup successful! Please login.' });
  } catch (err) {
    res.status(400).json({ error: 'User already exists' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await getUser(username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ message: 'Login successful!', token });
};
