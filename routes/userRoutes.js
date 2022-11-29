const express = require("express");

const usersController = require("../controllers/usersController");

const router = express.Router();

router.post("/signup", usersController.signup);
router.post("/login", usersController.login);

// users must be log in to get here
router.use(usersController.authorization);

router.get("/logout", usersController.logOut);

module.exports = router;
