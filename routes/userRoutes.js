import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import { updateUserControllers } from "../controllers/userControllers.js";

const router = express.Router();

//routes

//UPDATE USER || PUT
router.put("/updateUser", userAuth, updateUserControllers);

export default router;
