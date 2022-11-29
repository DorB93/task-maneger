const express = require("express");

const routesHandler = require("../controllers/routesHandler");

const router = express.Router();

router.post("/signup", routesHandler.signup);
router.post("/login", routesHandler.login);
router.get("/secret", routesHandler.authorization, routesHandler.showSecret);
router.get("/logout", routesHandler.authorization, routesHandler.logOut);

module.exports = router;
