import dotenv from "dotenv";
import express from "express";
import mongoose, { mongo } from "mongoose";

import { app } from "./app.js";
import userRouter from "./routes/user.route.js";
import connectDb from "./db/index.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 4000;
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Sever is running at PORT ${port}`);
    });
  })
  .catch((err) => {
    console.log("Mongo connection fail", err);
  });
