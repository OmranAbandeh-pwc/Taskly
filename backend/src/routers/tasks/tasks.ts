import express from "express";
import { verifyToken } from "../../Functions/VerifyToken";
import {
  addNewTaskController,
  getAllTasksController,
  getTaskController,
  updateTaskController,
  deleteTaskController,
} from "../../controllers/tasks/tasks";
import { TASK_API } from "../../routes/routes";

export const router = express.Router();

// Create task a POST route
router.post(TASK_API.ADD_TASK, verifyToken, addNewTaskController);

// Get All Tasks
router.get(TASK_API.GET_ALL_TASKS, verifyToken, getAllTasksController);

// Get a task
router.get(TASK_API.GET_TASK, getTaskController);

// Update a task
router.put(TASK_API.UPDATE_TASK, updateTaskController);

// Delete a task
router.delete(TASK_API.DELETE_TASK, deleteTaskController);

// router.get(GET_USER_DETAILS, verifyToken, userDetailsController);
