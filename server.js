require("dotenv").config({ path: ".env" });
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

const userRoutes = require("./routes/userRoutes");
const tasksRoutes = require("./routes/tasksRoutes");

// create the app
const app = express();

// global middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));

// Connecting to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/taskManager").then(() => {
	console.log("MongoDB connected successfully!");
});

// the route that i am using
app.use("/api/users", userRoutes);
app.use("/api/tasks", tasksRoutes);

app.listen(2020, () => {
	console.log(`App running on port: https://127.0.0.1:2020...`);
});
