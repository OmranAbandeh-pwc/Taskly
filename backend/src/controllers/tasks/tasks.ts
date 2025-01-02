import { Request, Response } from "express";
import RequestWithUserRole from "../../types/user";
import { connectToDatabase } from "../../DB/dbConfig";
import sql from "mssql";
<<<<<<< HEAD
import { BlobServiceClient } from "@azure/storage-blob";

interface ImageInfo {
  imageName: string;
  imageUrl: string;
}

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

// Add a new task Controller------------------------------------------------------------------
=======

// TODO add date to the task
// Add a new task ----------------------------------------------------------------------
>>>>>>> bef383bd9cdb2974c0cb83e853976afd462cd95a
export const addNewTaskController = async (
  req: RequestWithUserRole,
  res: Response
): Promise<Response> => {
  const userid = req.userid;
<<<<<<< HEAD
  const image = req.file;
=======
>>>>>>> bef383bd9cdb2974c0cb83e853976afd462cd95a
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

<<<<<<< HEAD
    let imageInfo: ImageInfo | null = null;

    if (image) {
      const { originalname, buffer } = image;
      const blobName = `${Date.now()}-${originalname}`; // Unique blob name with timestamp
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      // Upload the image
      await blockBlobClient.uploadData(buffer);

      // Get the URL of the uploaded image
      imageInfo = {
        imageName: blockBlobClient.name,
        imageUrl: blockBlobClient.url,
      };
    }

    const pool = await connectToDatabase();
    const query = `
        INSERT INTO Tasks (userid, title, subTitle, importance, startDate, endDate,imageName, imageUrl)
        VALUES (@userid, @title, @subTitle, @importance, @startDate, @endDate,@imageName, @imageUrl)
=======
    const pool = await connectToDatabase();
    const query = `
        INSERT INTO Tasks (userid, title, subTitle, importance, startDate, endDate)
        VALUES (@userid, @title, @subTitle, @importance, @startDate, @endDate)
>>>>>>> bef383bd9cdb2974c0cb83e853976afd462cd95a
      `;
    await pool
      .request()
      .input("userid", sql.NVarChar, userid)
      .input("title", sql.NVarChar, title)
      .input("subTitle", sql.NVarChar, subTitle || null) // Allow null subtitles
      .input("importance", sql.NVarChar, importance)
      .input("startDate", sql.Date, startDate) // Ensure dates are passed correctly
      .input("endDate", sql.Date, endDate)
<<<<<<< HEAD
      .input("imageUrl", sql.NVarChar, imageInfo?.imageUrl)
      .input("imageName", sql.NVarChar, imageInfo?.imageName)
=======
>>>>>>> bef383bd9cdb2974c0cb83e853976afd462cd95a
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

<<<<<<< HEAD
// Get all tasks for a specific user Controller ----------------------------------------------
=======
// Get all tasks for a specific user ----------------------------------------------------------------------
>>>>>>> bef383bd9cdb2974c0cb83e853976afd462cd95a
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
<<<<<<< HEAD
          SELECT id, title, subTitle, importance, startDate, endDate, imageName, imageUrl
=======
          SELECT id, title, subTitle, importance, startDate, endDate
>>>>>>> bef383bd9cdb2974c0cb83e853976afd462cd95a
          FROM Tasks
          WHERE userid = @userid
        `
        : `
<<<<<<< HEAD
          SELECT id, title, subTitle, importance, startDate, endDate, imageName, imageUrl
=======
          SELECT id, title, subTitle, importance, startDate, endDate
>>>>>>> bef383bd9cdb2974c0cb83e853976afd462cd95a
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

<<<<<<< HEAD
// Get task for a specific user Controller ---------------------------------------------------
=======
// Get task for a specific user
>>>>>>> bef383bd9cdb2974c0cb83e853976afd462cd95a
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
<<<<<<< HEAD
      "SELECT title, subTitle, importance, startDate, endDate, imageName, imageUrl FROM Tasks WHERE id = @id";
=======
      "SELECT title, subTitle, importance, startDate, endDate FROM Tasks WHERE id = @id";
>>>>>>> bef383bd9cdb2974c0cb83e853976afd462cd95a
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

<<<<<<< HEAD
// Update Task Controller --------------------------------------------------------------------
=======
// Update a task ----------------------------------------------------------------------
>>>>>>> bef383bd9cdb2974c0cb83e853976afd462cd95a
export const updateTaskController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { title, subTitle, importance, startDate, endDate } = req.body;
<<<<<<< HEAD
  const file = req.file; // Check if a new image is uploaded

  try {
    const pool = await connectToDatabase();

    let imageInfo: ImageInfo | null = null;

    // Handle image upload if a new file is provided
    if (file) {
      const { originalname, buffer } = file;
      const blobName = `${Date.now()}-${originalname}`; // Generate a unique name for the blob
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      // Upload the new image to Azure Blob Storage
      await blockBlobClient.uploadData(buffer);
      imageInfo = {
        imageName: blockBlobClient.name,
        imageUrl: blockBlobClient.url,
      }; // Get the URL of the uploaded image
    }

    // SQL query to update the task
=======

  try {
    const pool = await connectToDatabase();
>>>>>>> bef383bd9cdb2974c0cb83e853976afd462cd95a
    const query = `
      UPDATE Tasks
      SET title = @title, 
          subTitle = @subTitle, 
          importance = @importance, 
          startDate = @startDate, 
<<<<<<< HEAD
          endDate = @endDate,
          imageName = CASE WHEN @imageName IS NOT NULL THEN @imageName ELSE imageName END,
          imageUrl = CASE WHEN @imageUrl IS NOT NULL THEN @imageUrl ELSE imageUrl END
=======
          endDate = @endDate
>>>>>>> bef383bd9cdb2974c0cb83e853976afd462cd95a
      WHERE id = @id
    `;
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("title", sql.NVarChar, title)
      .input("subTitle", sql.NVarChar, subTitle || null)
      .input("importance", sql.NVarChar, importance)
<<<<<<< HEAD
      .input("startDate", sql.DateTime, startDate)
      .input("endDate", sql.DateTime, endDate)
      .input("imageName", sql.NVarChar, imageInfo?.imageName || null) // Pass the new image URL or null
      .input("imageUrl", sql.NVarChar, imageInfo?.imageUrl || null) // Pass the new image URL or null
=======
      .input("startDate", sql.DateTime, startDate) // Ensure startDate is passed as DateTime
      .input("endDate", sql.DateTime, endDate)
>>>>>>> bef383bd9cdb2974c0cb83e853976afd462cd95a
      .query(query);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ status: 404, message: "Task not found" });
    }

<<<<<<< HEAD
    return res.status(200).json({
      status: 200,
      message: "Task updated successfully",
    });
=======
    return res
      .status(200)
      .json({ status: 200, message: "Task updated successfully" });
>>>>>>> bef383bd9cdb2974c0cb83e853976afd462cd95a
  } catch (error: any) {
    console.error("Error updating task:", error.message);
    return res.status(500).json({
      status: 500,
      message: "Failed to update task",
      details: error.message,
    });
  }
};

<<<<<<< HEAD
// Delete Task Controller --------------------------------------------------------------------
=======
// Delete a task ----------------------------------------------------------------------
>>>>>>> bef383bd9cdb2974c0cb83e853976afd462cd95a
export const deleteTaskController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const pool = await connectToDatabase();
<<<<<<< HEAD

    // Step 1: Retrieve the image URL from the database
    const selectQuery = "SELECT imageName, imageUrl FROM Tasks WHERE id = @id";
    const selectResult = await pool
      .request()
      .input("id", sql.Int, id)
      .query(selectQuery);

    if (selectResult.recordset.length === 0) {
      return res.status(404).json({ status: 404, message: "Task not found" });
    }

    const imageUrl = selectResult.recordset[0].image;

    // Step 2: Delete the image from Azure Blob Storage (if it exists)
    if (imageUrl) {
      try {
        const blobName = decodeURIComponent(imageUrl.split("/").pop());

        if (blobName) {
          const blockBlobClient = containerClient.getBlockBlobClient(blobName);
          const deleteResponse = await blockBlobClient.deleteIfExists();
        } else {
          console.warn(
            "Blob name could not be determined from imageUrl:",
            imageUrl
          );
        }
      } catch (blobError: any) {
        console.error("Error deleting blob:", blobError.message);
      }
    }

    // Step 3: Delete the task from the database
    const deleteQuery = "DELETE FROM Tasks WHERE id = @id";
    await pool.request().input("id", sql.Int, id).query(deleteQuery);

    return res.status(200).json({
      status: 200,
      message: "Task and associated image deleted successfully",
    });
=======
    const query = "DELETE FROM Tasks WHERE id = @id";
    const result = await pool.request().input("id", sql.Int, id).query(query);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ status: 404, message: "Task not found" });
    }

    return res
      .status(200)
      .json({ status: 200, message: "Task deleted successfully" });
>>>>>>> bef383bd9cdb2974c0cb83e853976afd462cd95a
  } catch (error: any) {
    console.error("Error deleting task:", error.message);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete task",
      details: error.message,
    });
  }
};
