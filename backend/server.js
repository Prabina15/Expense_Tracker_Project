import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { connectDB } from './config/db.js'
import userRouter from './routes/userRoute.js';
import incomeRouter from "./routes/incomeRoute.js";

const app = express();
const port = 5000;

//Middlewares

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));






//Db 
connectDB();






// Routes
app.use('/api/users', userRouter);
app.use('/api/income', incomeRouter);


app.get('/', (req, res) => {
    res.send('API WORKING')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})