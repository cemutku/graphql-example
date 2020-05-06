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

const addTodo = async function (todo) {
  try {
    const response = await axios.post(todosUrl, { ...todo, userId: 1 });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const updateTodo = async function (id, todo) {
  try {
    const response = await axios.put(`${todosUrl}${id}`, {
      ...todo,
      userId: 1,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const deleteTodo = async function (id) {
  try {
    const response = await axios.delete(`${todosUrl}${id}`);
    return {
      success: true,
      message: `Status : ${response.status} - Delete Successful`,
      id,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Delete failed', id: id };
  }
};

const markAsCompleted = async function (id) {
  try {
    const response = await axios.patch(`${todosUrl}${id}`, {
      completed: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getTodos,
  getUsers,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
  markAsCompleted,
};
