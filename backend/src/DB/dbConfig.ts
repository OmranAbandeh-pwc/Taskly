import sql, { ConnectionPool } from "mssql";

// Define your database configuration
const config: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER!, // e.g., "localhost" or a remote IP
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
  options: {
    encrypt: true, // Use encryption (required for Azure SQL)
    trustServerCertificate: true, // Trust self-signed certificates (for development)
  },
};

// Create a connection pool
let pool: ConnectionPool;

export const connectToDatabase = async (): Promise<ConnectionPool> => {
  if (!pool) {
    try {
      pool = await sql.connect(config);
      console.log("Connected to SQL database successfully!");
    } catch (err) {
      if (err instanceof Error) {
        console.error("Database connection failed:", err.message);
      } else {
        console.error("Unknown error:", err);
      }
      throw err; // Rethrow error for the caller to handle
    }
  }
  return pool;
};
