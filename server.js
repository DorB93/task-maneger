require("dotenv").config({ path: ".env" });
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");

// create the app
const app = express();

// global middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Connecting to MongoDB
mongoose.connect("mongodb://localhost:27017/JWT_HW").then(() => {
	console.log("MongoDB connected successfully!");
});

// the route that i am using
app.use("/api/users", userRoutes);

app.listen(2020, () => {
	console.log(`App running on port: 127.0.0.1:2020...`);
});
