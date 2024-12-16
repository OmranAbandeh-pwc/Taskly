require("dotenv").config();
const cors = require("cors");
const express = require("express");
const authRouters = require("./routers/auth/auth");
const tasksRouters = require("./routers/tasks/tasks");
const { connectToDatabase } = require("./dbConfig");
const { MAIN_API } = require("./routes/routes");

// express app
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
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(MAIN_API, authRouters);
app.use(MAIN_API, tasksRouters);

// Connect to the database and start the server
connectToDatabase()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port:", process.env.PORT);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database. Server not started.");
  });
