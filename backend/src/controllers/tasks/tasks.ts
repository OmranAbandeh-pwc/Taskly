import { Request, Response } from "express";
import RequestWithUserRole from "../../types/user";
import { connectToDatabase } from "../../DB/dbConfig";
import sql from "mssql";
import sharp from "sharp";
import { BlobServiceClient } from "@azure/storage-blob";

// Azure Blob Storage setup
const AZURE_STORAGE_CONNECTION_STRING = `${process.env.AZURE_STORAGE_CONNECTION_STRING}`;
const containerName = `${process.env.CONTAINER_NAME}`; // Name of the container where images will be stored

const blobServiceClient = BlobServiceClient.fromConnectionString(
  AZURE_STORAGE_CONNECTION_STRING
);
const containerClient = blobServiceClient.getContainerClient(containerName);

// Ensure the container exists
async function ensureContainerExists() {
  const exists = await containerClient.exists();
  if (!exists) {
    await containerClient.create();
  }
}
ensureContainerExists();

// Add a new task ----------------------------------------------------------------------
export const addNewTaskController = async (
  req: RequestWithUserRole,
  res: Response
): Promise<Response> => {
  const userid = req.userid;
  const image = req.file;
  const { title, subTitle, importance, startDate, endDate } = req.body;

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        status: 400,
        message: "Invalid date format. Use 'YYYY-MM-DD'.",
      });
    }

    if (end < start) {
      return res.status(400).json({
        status: 400,
        message: "endDate cannot be earlier than startDate",
      });
    }

    let imageUrl: string | null = null;

    if (image) {
      const { originalname, buffer } = image;
      const blobName = `${Date.now()}-${originalname}`; // Unique blob name with timestamp
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      // Upload the image
      await blockBlobClient.uploadData(buffer);

      // Get the URL of the uploaded image
      imageUrl = blockBlobClient.url;
    }

    const pool = await connectToDatabase();
    const query = `
        INSERT INTO Tasks (userid, title, subTitle, importance, startDate, endDate, image)
        VALUES (@userid, @title, @subTitle, @importance, @startDate, @endDate, @image)
      `;
    await pool
      .request()
      .input("userid", sql.NVarChar, userid)
      .input("title", sql.NVarChar, title)
      .input("subTitle", sql.NVarChar, subTitle || null) // Allow null subtitles
      .input("importance", sql.NVarChar, importance)
      .input("startDate", sql.Date, startDate) // Ensure dates are passed correctly
      .input("endDate", sql.Date, endDate)
      .input("image", sql.NVarChar, imageUrl)
      .query(query);

    return res
      .status(200)
      .json({ status: 200, message: "Task added successfully" });
  } catch (error: any) {
    console.error("Error adding task:", error.message);
    return res.status(500).json({
      status: 500,
      message: "Failed to add task",
      details: error.message,
    });
  }
};

// Get all tasks for a specific user ----------------------------------------------------------------------
export const getTasksFilterController = async (
  req: RequestWithUserRole,
  res: Response
): Promise<Response> => {
  const { importance } = req.query; // Extract importance from query parameters
  const userid = req.userid;

  if (!importance) {
    return res.status(400).json({
      status: 400,
      message: "Importance is required as a query parameter.",
    });
  }

  try {
    const pool = await connectToDatabase();
    const query =
      importance === "all"
        ? `
          SELECT id, title, subTitle, importance, startDate, endDate
          FROM Tasks
          WHERE userid = @userid
        `
        : `
          SELECT id, title, subTitle, importance, startDate, endDate
          FROM Tasks
          WHERE userid = @userid AND importance = @importance
        `;

    const result = await pool
      .request()
      .input("userid", sql.NVarChar, userid)
      .input("importance", sql.NVarChar, importance) // Bind importance parameter
      .query(query);

    if (result.recordset.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No tasks found with " + importance + " Importance",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Tasks filtered by importance retrieved successfully",
      tasks: result.recordset,
    });
  } catch (error: any) {
    console.error("Error filtering tasks by importance:", error.message);
    return res.status(500).json({
      status: 500,
      message: "Failed to filter tasks by importance",
      details: error.message,
    });
  }
};

// Get task for a specific user
export const getTaskController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params; // Extract 'id' from URL params

  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ status: 400, message: "Invalid task ID" });
  }

  try {
    const pool = await connectToDatabase();
    const query =
      "SELECT title, subTitle, importance, startDate, endDate, image FROM Tasks WHERE id = @id";
    const result = await pool
      .request()
      .input("id", sql.Int, id) // Ensure 'id' is treated as an integer
      .query(query);

    if (result.recordset.length === 0) {
      return res.status(404).json({ status: 404, message: "Task not found" });
    }

    return res
      .status(200)
      .json({ status: 200, message: "", task: result.recordset[0] }); // Return the task object
  } catch (error: any) {
    console.error("Error fetching task:", error.message);
    return res.status(500).json({
      status: 500,
      message: "Failed to fetch task",
      details: error.message,
    });
  }
};

// Update a task ----------------------------------------------------------------------
export const updateTaskController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { title, subTitle, importance, startDate, endDate } = req.body;

  try {
    const pool = await connectToDatabase();
    const query = `
      UPDATE Tasks
      SET title = @title, 
          subTitle = @subTitle, 
          importance = @importance, 
          startDate = @startDate, 
          endDate = @endDate
      WHERE id = @id
    `;
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("title", sql.NVarChar, title)
      .input("subTitle", sql.NVarChar, subTitle || null)
      .input("importance", sql.NVarChar, importance)
      .input("startDate", sql.DateTime, startDate) // Ensure startDate is passed as DateTime
      .input("endDate", sql.DateTime, endDate)
      .query(query);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ status: 404, message: "Task not found" });
    }

    return res
      .status(200)
      .json({ status: 200, message: "Task updated successfully" });
  } catch (error: any) {
    console.error("Error updating task:", error.message);
    return res.status(500).json({
      status: 500,
      message: "Failed to update task",
      details: error.message,
    });
  }
};

// Delete a task ----------------------------------------------------------------------
export const deleteTaskController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const pool = await connectToDatabase();
    const query = "DELETE FROM Tasks WHERE id = @id";
    const result = await pool.request().input("id", sql.Int, id).query(query);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ status: 404, message: "Task not found" });
    }

    return res
      .status(200)
      .json({ status: 200, message: "Task deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting task:", error.message);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete task",
      details: error.message,
    });
  }
};
