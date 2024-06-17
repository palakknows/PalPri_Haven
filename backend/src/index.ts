import cors from 'cors';
import "dotenv/config";
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/users';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string) ;

const app = express();//create a new app
app.use(express.json());//convert body of API automatically to json
app.use(express.urlencoded({ extended: true }));//parse the url
app.use(cors())//prevents request from certain urls

app.use("/api/users", userRoutes);

app.listen(7000,()=>{
console.log("Server is running on localhost: 7000");
});