import express from "express";
import { signinController } from "../../controllers/auth/signin";
import { signupController } from "../../controllers/auth/singup";
export const router = express.Router();

router.post("/signin", signinController);

router.post("/signup", signupController);
