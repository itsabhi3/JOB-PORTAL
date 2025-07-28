// const express = require ('express');

//import
import express from 'express';
import dotenv from 'dotenv';
import  colors from 'colors';
import cors from "cors"
import morgan from 'morgan';
// import  "express-async-errors";

// files IMPO4RT
import connectDB from './config/db.js';



//
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import errorMiddleware from './middleware/errorMiddleware.js';
import jobsRoutes from './routes/jobsRoutes.js'
import userRoutes from "./routes/userRoutes.js"

//config dot env
dotenv.config();

//mongoDB Connection
connectDB();



//rest object
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))


// route
app.use('/api/v1/test', testRoutes)
app.use('/api/v1/auth', authRoutes)
app.use("/api/v1/user", userRoutes);
app.use('/api/v1/job', jobsRoutes)




//validation middleware
app.use(errorMiddleware);
// app.use(authMiddleware);



//port
const PORT = process.env.PORT || 3000

//listen
app.listen(PORT, () =>{
    console.log(`Server Running on ${PORT}`);  
})