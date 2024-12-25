require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
import { connectToDatabase } from "./DB/dbConfig";
import cors from "cors";
import { router as authRouter } from "./routers/auth/auth";
import { router as tasksRouter } from "./routers/tasks/tasks";
import { router as usersRouter } from "./routers/user/users";
import { MAIN_PATH } from "./routes/routes";

const app = express();

// Enable CORS for specific origin
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
  })
);

// Or, enable CORS for all origins (not recommended for production)
app.use(cors());

// midleware
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.path, req.method);
  next();
});

app.use(MAIN_PATH, authRouter);
app.use(MAIN_PATH, tasksRouter);
app.use(MAIN_PATH, usersRouter);

connectToDatabase()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port:", process.env.PORT);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database. Server not started.");
  });
