import express from "express";
import {
  getAUser,
  getAllUser,
  login,
  signIn,
} from "../controllers/userController.js";

export const router = express.Router();

router.get("/", getAllUser);

router.get("/:id", getAUser);

router.post("/signin", signIn);

router.post("/login", login);
