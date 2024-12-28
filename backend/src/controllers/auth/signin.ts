import bcrypt from "bcrypt";
import { connectToDatabase } from "../../DB/dbConfig";
import sql from "mssql";
import jwt from "jsonwebtoken";
import express, { Request, Response } from "express";

export const signinController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body;
  try {
    const pool = await connectToDatabase();

    // Check if the user exists by email
    const userQuery = "SELECT * FROM USERS WHERE email = @Email";
    const result = await pool
      .request()
      .input("Email", sql.NVarChar, email)
      .query(userQuery);

    if (result.recordset.length === 0) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    const user = result.recordset[0];

    // Compare the provided password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ status: 401, message: "Invalid Password" });
    }
    const jsonTokenSecretKey = process.env.JWT_SECRET;
    if (!jsonTokenSecretKey) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }
    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        secondName: user.secondName,
      },
      jsonTokenSecretKey,
    );

    // Successful signin
    return res.status(200).json({
      status: 200,
      message: "Signin successful",
      token,
      user: {
        firstName: user.firstName,
        secondName: user.secondName,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.error("Error during signin:", error.message);
    return res
      .status(500)
      .json({ status: 500, message: "Signin failed", details: error.message });
  }
};
