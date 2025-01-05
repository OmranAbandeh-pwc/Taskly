import { Response, Request } from "express";
import { connectToDatabase } from "../../DB/dbConfig";
import RequestWithUserRole from "../../types/user";
import sql from "mssql";

// Search API
export const searchController = async (
  req: RequestWithUserRole,
  res: Response
): Promise<Response> => {
  const { title } = req.query; // Extract the title from query parameters
  const userid = req.userid;

  if (!title || typeof title !== "string") {
    return res.status(400).json({
      status: 400,
      message: "Title query parameter is required and should be a string",
    });
  }

  try {
    const pool = await connectToDatabase();
    const query = `
        SELECT id, title, subTitle, importance, startDate, endDate, imageName, imageUrl
        FROM Tasks 
        WHERE userid = @userid AND title LIKE @title
      `;
    const result = await pool
      .request()
      .input("userid", sql.NVarChar, userid)
      .input("title", sql.NVarChar, `%${title}%`) // Use LIKE for partial match
      .query(query);

    if (result.recordset.length === 0) {
      return res
        .status(404)
        .json({ status: 404, message: "No tasks found with the given title" });
    }

    return res.status(200).json({
      status: 200,
      message: "Tasks found",
      tasks: result.recordset,
    });
  } catch (error: any) {
    console.error("Error searching tasks:", error.message);
    return res.status(500).json({
      status: 500,
      message: "Failed to search tasks",
      details: error.message,
    });
  }
};
