import express from "express"
import userAuth from "../middleware/authMiddleware.js";
import { createJobController, deleteJobControllers, getAllJobControllers, jobStatsController, updateJobControllers } from "../controllers/jobsControllers.js";

const router = express.Router();

//routes
//Create JOB || POST

router.post('/createJob',userAuth, createJobController)

//GET JOB || GET
router.get('/getJob', userAuth, getAllJobControllers)

//UPdate jobs || PUTN \ PATCH

router.put('/updateJob/:id', userAuth, updateJobControllers)

//delete
router.delete('/deleteJob/:id', userAuth, deleteJobControllers)

//jobs STATS || FILTER || GET-MWETHOD
router.get('/statsJob', userAuth, jobStatsController)


export default router;