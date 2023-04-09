import express from "express";
import {
  AddBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
  getUserBlogs,
  updateBlog,
} from "../controllers/blogController.js";
export const router = express.Router();

router.get("/", getAllBlogs);

router.post("/add", AddBlog);

router.put("/update/:id", updateBlog);

router.get("/:id", getBlog);

router.delete("/:id", deleteBlog);

router.get("/user/:id", getUserBlogs);
