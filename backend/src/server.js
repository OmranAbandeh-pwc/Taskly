require("dotenv").config();
const express = require("express");
const authRouters = require("./routers/auth/auth");
const tasksRouters = require("./routers/tasks/tasks");
const { connectToDatabase } = require("./dbConfig");
const { MAIN_API } = require("./routes/routes");

// express app
const app = express();

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
