import express from "express";
import mongoose from "mongoose";
import "dotenv/config.js";
import { router as userRoute } from "./routes/userRoutes.js";
import { router as blogRoute } from "./routes/blogRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
const port = process.env.PORT;
const db_URI = process.env.DB_URI;

mongoose
  .connect(db_URI, { dbName: "BlogData" })
  .then(() => {
    console.log("DB Connected");
  })
  .then(() => {
    app.listen(port, () => {
      console.log("server start hua bhai");
    });
  });

app.use("/api/user", userRoute);
app.use("/api/blog", blogRoute);
