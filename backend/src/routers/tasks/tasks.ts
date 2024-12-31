import express from "express";
import { verifyToken } from "../../Functions/VerifyToken";
import {
  addNewTaskController,
  getTasksFilterController,
  getTaskController,
  updateTaskController,
  deleteTaskController,
} from "../../controllers/tasks/tasks";
import { TASK_API } from "../../routes/routes";
import multer from "multer";

export const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true); // Accept only image files
    } else {
      cb(new Error("Invalid file type. Only image files are allowed."));
    }
  },
});

// Create task a POST route
router.post(
  TASK_API.ADD_TASK,
  upload.single("image"),
  verifyToken,
  addNewTaskController
);

// Get All Tasks
router.get(TASK_API.GET_ALL_TASKS, verifyToken, getTasksFilterController);

// Get a task
router.get(TASK_API.GET_TASK, getTaskController);

// Update a task
router.put(TASK_API.UPDATE_TASK, updateTaskController);

// Delete a task
router.delete(TASK_API.DELETE_TASK, deleteTaskController);
