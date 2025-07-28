import express from "express";
import testPostController from "../controllers/testcontrollers.js";
import userAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/testPost", userAuth, testPostController);

export default router;
