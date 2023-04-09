import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res, next) => {
  try {
    const users = await userModel.find({});
    if (users.length === 0) {
      return res.status(200).json({ message: "No user found" });
    }
    res.status(200).json({ users: users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userData = await userModel.findById({ _id: id });
    res.status(200).json({ user: userData });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const doesUserExist = await userModel.find({ email: email });
    if (doesUserExist.length != 0) {
      return res.status(400).json({ message: "User already exists!" });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const newUser = new userModel({
        name,
        email,
        password: hashedPassword,
        blogs: [],
      });

      try {
        await newUser.save();
        res.status(201).json({ user: newUser });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const doesUserExist = await userModel.findOne({ email: email });
    if (!doesUserExist) {
      return res
        .status(400)
        .json({ message: "User DB me nahi hai lodu, register kr phele bkl" });
    }
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      doesUserExist.password
    );
    if (isPasswordCorrect) {
      return res.json("Same passcode hai bro, login Successfull");
    } else {
      return res.json("password incorrect");
    }
    // res.status(200).json(doesUserExist);
  } catch (error) {
    res.json({ message: error.message });
  }
};
