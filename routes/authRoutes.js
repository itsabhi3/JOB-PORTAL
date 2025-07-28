import express from "express";
import { loginController, registercontroller } from "../controllers/authController.js";


//router object

const router = express.Router()


//routes
//Register || POST
router.post('/register', registercontroller)

// ??LOGIN POST 
router.post('/login',loginController)



//export
export default router



