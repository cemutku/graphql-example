const axios = require('axios');

const todosUrl = 'http://localhost:3000/todos/';
const usersUrl = 'http://localhost:3000/users/';

const getTodos = async function () {
  try {
    const response = await axios.get(todosUrl);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getTodosByUserId = async function (userId) {
  try {
    const response = await axios.get(`${usersUrl}${userId}/todos`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getTodo = async function (id) {
  try {
    const response = await axios.get(`${todosUrl}${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getUsers = async function () {
  try {
    const response = await axios.get(usersUrl);
    return response.data.map(async (user) => {
      const todos = await getTodosByUserId(user.id);
      return { ...user, todos };
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getTodos, getUsers, getTodo };
