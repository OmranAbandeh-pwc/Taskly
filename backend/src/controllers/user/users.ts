import { Response } from "express";
import { connectToDatabase } from "../../DB/dbConfig";
import sql from "mssql";
import RequestWithUserRole from "../../types/user";

export const userDetailsController = async (
  req: RequestWithUserRole,
  res: Response
): Promise<Response> => {
  const userid = req.userid;

  try {
    const pool = await connectToDatabase();
    const query = `
        SELECT firstName, secondName, userImageName, userImageUrl, birthday, email FROM USERS WHERE id = @userid
      `;

    const result = await pool
      .request()
      .input("userid", sql.NVarChar, userid)
      .query(query);

    return res.status(200).json({
      status: 200,
      message: "Successfull got user details",
      user: result.recordset,
    });
  } catch (error: any) {
    console.error("Error fetching user:", error.message);
    return res.status(500).json({
      status: 500,
      message: "Failed to fetch user",
      details: error.message,
    });
  }
};
