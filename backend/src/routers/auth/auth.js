const express = require("express");
const router = express.Router();
const { SIGN_UP, SIGN_IN } = require("../../routes/routes");
const { signupController } = require("../../controllers/auth/signup");
const { signinController } = require("../../controllers/auth/signin");

// Create User a POST route
router.post(SIGN_UP, signupController);

// Create User a POST route
router.post(SIGN_IN, signinController);

module.exports = router;
