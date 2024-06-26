import cookieParser from "cookie-parser";
//import cors from "cors";
import "dotenv/config";
//import express from "express";
import mongoose from "mongoose";
import path from "path";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
const express = require('express');
const cors = require('cors');

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const frontendUrl = process.env.FRONTEND_URL || '';
app.use(cors({
    origin: frontendUrl,
    credentials:true,
})
);

app.use(express.static(path.join(__dirname,"../..frontend/dist")))

app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);


app.listen(7000, () => {
    //server running on localhost:7000
    console.log('server running on http://localhost:7000');
});



