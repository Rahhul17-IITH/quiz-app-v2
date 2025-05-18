const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: '*', // For production, restrict to your frontend ALB DNS
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/quizzes', require('./routes/quiz'));


const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on ${PORT}`));

//For testing purposes
// const express = require('express');
// const cors = require('cors');
// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/quizzes', require('./routes/quiz'));
// module.exports = app;

// if (require.main === module) {
//   const PORT = process.env.PORT || 3001;
//   app.listen(PORT, '0.0.0.0', () => console.log(`Server running on ${PORT}`));
// }
