const { dynamoDb } = require('../config');
const QUIZZES_TABLE = 'QuizAppQuizzes';

async function createQuiz(quiz) {
  const params = {
    TableName: QUIZZES_TABLE,
    Item: quiz,
  };
  await dynamoDb.put(params).promise();
}

async function getQuizzesByUser(username) {
  const params = {
    TableName: QUIZZES_TABLE,
    IndexName: 'username-index',
    KeyConditionExpression: 'username = :u',
    ExpressionAttributeValues: { ':u': username },
  };
  const result = await dynamoDb.query(params).promise();
  return result.Items;
}

async function getQuizById(quizId) {
  const params = {
    TableName: QUIZZES_TABLE,
    Key: { quizId },
  };
  const result = await dynamoDb.get(params).promise();
  return result.Item;
}

async function updateQuiz(quizId, quiz) {
  const params = {
    TableName: QUIZZES_TABLE,
    Key: { quizId },
    UpdateExpression: 'set #title = :t, questions = :q',
    ExpressionAttributeNames: { '#title': 'title' },
    ExpressionAttributeValues: { ':t': quiz.title, ':q': quiz.questions },
    ReturnValues: 'UPDATED_NEW',
  };
  await dynamoDb.update(params).promise();
}

module.exports = { createQuiz, getQuizzesByUser, getQuizById, updateQuiz };
