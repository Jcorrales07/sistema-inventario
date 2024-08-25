const authController = require("../controllers/auth.controllers");

const { Router } = require("express");

const router = Router();

router.post("/login/", authController.loginController);

module.exports = router;