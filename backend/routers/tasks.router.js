const express = require('express');
const {
  getAllTasks,
  getOneTask,
  addNewTask,
  getEditTask,
  getDeleteTask,
} = require('../controllers/tasks.controller');
const verifyToken = require('../middleware/verifyToken'); // ✅ fixed path (services → middleware)

const taskRouter = express.Router();

// All task routes are protected
taskRouter.get('/', verifyToken, getAllTasks);
taskRouter.get('/:taskId', verifyToken, getOneTask);
taskRouter.post('/', verifyToken, addNewTask);
taskRouter.put('/:taskId', verifyToken, getEditTask);
taskRouter.delete('/:taskId', verifyToken, getDeleteTask);

module.exports = taskRouter;
