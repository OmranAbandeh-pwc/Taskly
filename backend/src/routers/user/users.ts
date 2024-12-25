import express from "express";
import { verifyToken } from "../../Functions/VerifyToken";
import { userDetailsController } from "../../controllers/user/users";
import { USERS_API } from "../../routes/routes";

export const router = express.Router();

router.get(USERS_API.GET_USER_DETAILS, verifyToken, userDetailsController);
