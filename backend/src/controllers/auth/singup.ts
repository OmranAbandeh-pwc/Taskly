import bcrypt from "bcrypt";
import { connectToDatabase } from "../../DB/dbConfig";
import sql from "mssql";
import express, { Request, Response } from "express";
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

export const signupController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const image = req.file;
  const { firstName, secondName, birthday, email, password, confirmPassword } =
    req.body;

  try {
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

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ status: 400, message: "Passwords do not match" });
    }

    const pool = await connectToDatabase();

    // Check if the email already exists
    const emailCheckQuery =
      "SELECT COUNT(*) AS count FROM USERS WHERE email = @Email";
    const emailCheckResult = await pool
      .request()
      .input("Email", sql.NVarChar, email)
      .query(emailCheckQuery);

    if (emailCheckResult.recordset[0].count > 0) {
      return res
        .status(400)
        .json({ status: 400, message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Assume db connection is established
    const query = `
         INSERT INTO USERS (id, firstName, secondName, userImageName, userImageUrl, birthday, email, password)
      VALUES (NEWID(), @firstName, @secondName, @userImageName, @userImageUrl, @birthday, @email, @password);
        `;

    await pool
      .request()
      .input("firstName", sql.NVarChar, firstName)
      .input("secondName", sql.NVarChar, secondName)
      .input("userImageName", sql.NVarChar, imageInfo?.imageName)
      .input("userImageUrl", sql.NVarChar, imageInfo?.imageUrl)
      .input("birthday", sql.Date, birthday)
      .input("email", sql.NVarChar, email)
      .input("password", sql.NVarChar, hashedPassword) // Ensure this is hashed for security in real applications
      .query(query);

    return res
      .status(200)
      .json({ status: 200, message: "Data inserted successfully" });
  } catch (error: any) {
    console.error("Error inserting data:", error.message);
    return res.status(500).json({
      status: 500,
      message: "Failed to insert data",
      details: error.message,
    });
  }
};
