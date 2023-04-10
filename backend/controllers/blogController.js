import mongoose from "mongoose";
import blogModel from "../models/blogModel.js";
import userModel from "../models/userModel.js";
import { json } from "express";

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel
      .find({})
      .sort({ createdAt: -1 })
      .populate("author");
    res.status(200).json(blogs);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const AddBlog = async (req, res, next) => {
  const { title, description, image, author } = req.body;
  let doesUserExist;
  try {
    doesUserExist = await userModel.findById({ _id: author });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  if (!doesUserExist) {
    return res.status(400).json({ message: "Unable to find user by this id" });
  }
  const newBlog = new blogModel({
    title: title,
    description: description,
    image: image,
    author: author,
  });
  try {
    //   await newBlog.save();

    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    doesUserExist.blogs.push(newBlog);
    try {
      await doesUserExist.save({ session });
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      res.status(500).json({ message: error.message });
    }

    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBlog = async (req, res, next) => {
  const { id } = req.params;
  //   const { title, description } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Failed to update!" });
  }
  try {
    const newBlog = await blogModel.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Failed to update the Blog" });
  }

  if (!newBlog) {
    return res.status(400).json({ message: "Failed to update the Blog" });
  }
  res.status(200).json(newBlog);
};

export const getBlog = async (req, res, next) => {
  const { id } = req.params;
  try {
    const newBlog = await blogModel.findById({ _id: id });
    if (!newBlog) {
      return res.status(400).json({ message: "Blog not found" });
    }
    res.status(200).json(newBlog);
  } catch (error) {
    res.status(400).json({ message: "Blog not found" });
  }
};

export const deleteBlog = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Failed to delete blog" });
    }

    const blog = await blogModel
      .findByIdAndDelete({ _id: id })
      .populate("author");

    if (!blog) {
      return res.status(500).json({ message: "Cannot find the blog" });
    }

    await blog.author.blogs.pull(blog);
    await blog.author.save();
    res.status(200).json({ message: "Delete successfully", blog });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserBlogs = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userBlogs = await userModel.findById({ _id: id }).populate("blogs");
    if (!userBlogs) {
      return res
        .status(400)
        .json({ message: "Failed to find blog of this user id" });
    }
    // res.status(200).json({ blogs: userBlogs });
    res.status(200).json(userBlogs);
  } catch (error) {
    res.status(400).json({
      message: "Failed to find blog of this user id",
      error: error.message,
    });
  }
};
