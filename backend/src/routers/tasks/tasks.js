const express = require("express");
const router = express.Router();
const {
  addNewTaskController,
  getAllTasksController,
  getTaskController,
  updateTaskController,
  deleteTaskController,
} = require("../../controllers/tasks/tasks");

const { userDetailsController } = require("../../controllers/user/user");
const {
  ADD_TASK,
  GET_ALL_TASKS,
  GET_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  GET_USER_DETAILS,
} = require("../../routes/routes");
const { verifyToken } = require("../../VerifyToken");

// Create task a POST route
router.post(ADD_TASK, verifyToken, addNewTaskController);

// Get All Tasks
router.get(GET_ALL_TASKS, verifyToken, getAllTasksController);

// Get a task
router.get(GET_TASK, getTaskController);

// Update a task
router.put(UPDATE_TASK, updateTaskController);

// Delete a task
router.delete(DELETE_TASK, deleteTaskController);

router.get(GET_USER_DETAILS, verifyToken, userDetailsController);

module.exports = router;
