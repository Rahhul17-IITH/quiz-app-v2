const { dynamoDb } = require('../config');
const bcrypt = require('bcryptjs');

const USERS_TABLE = 'QuizAppUsers';

async function createUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const params = {
    TableName: USERS_TABLE,
    Item: { username, password: hashedPassword },
    ConditionExpression: 'attribute_not_exists(username)',
  };
  await dynamoDb.put(params).promise();
}

async function getUser(username) {
  const params = {
    TableName: USERS_TABLE,
    Key: { username },
  };
  const result = await dynamoDb.get(params).promise();
  return result.Item;
}

module.exports = { createUser, getUser };
