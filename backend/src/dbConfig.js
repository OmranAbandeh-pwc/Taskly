require("dotenv").config();
const sql = require("mssql");

// Database configuration from environment variables
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true, // Use false for local development, true for Azure
    trustServerCertificate: true, // For self-signed certificates
  },
  port: 1433,
};

// Connect to the database
const connectToDatabase = async () => {
  try {
    const pool = await sql.connect(dbConfig);
    console.log("Connected to SQL Server");
    return pool; // Return the connection pool
  } catch (err) {
    console.error("Database connection failed:", err.message);
    throw err;
  }
};

module.exports = { sql, connectToDatabase };
