const express = require("express");

const tasksController = require("../controllers/tasksController");
const userController = require("../controllers/usersController");

const router = express.Router();

router.use(userController.authorization);
router.get("/", tasksController.getUserTasks);
router.post("/", tasksController.createTask);

module.exports = router;
