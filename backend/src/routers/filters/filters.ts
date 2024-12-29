import express from "express";
import { searchController } from "../../controllers/filters/filters";
import { verifyToken } from "../../Functions/VerifyToken";
import { FILTERS_API } from "../../routes/routes";

export const router = express.Router();

// Create task a POST route
router.post(FILTERS_API.POST_SEARCH_TASKS, verifyToken, searchController);
