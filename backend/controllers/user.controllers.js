import { User } from "../models/user.models.js";
import { signinBody, signupBody, updateBody } from "../schema/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
  try {
    const { username, firstName, lastName, password } = signupBody.safeParse(
      req.body
    );
    if (!username || !firstName || !lastName || !password) {
      return res.status(401).json("Invalid inputs / username already taken");
    }

    const existingUser = await User.findOne({
      username,
    });
    if (existingUser) {
      return res.staus(401).json("User already exit with this username");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: username,
      firstName: firstName,
      lastName: lastName,
      passoword: hashPassword,
    });

    if (!newUser) {
      return res.status(400).json("somthing went wrong");
    }
    const userId = newUser._id;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);

    return res.staus(201).json({ token, message: "User signup successfully" });
  } catch (error) {
    console.log(error, "User Signup Error");
    return res.status(500).json("Internal seerver error");
  }
};

export const signin = async (req, res) => {
  try {
    const { username, password } = signinBody.safeParse(req.body);
    if (!username || !password) {
      return res
        .staus(400)
        .json("Input is wrong or user already exit with this username");
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json("User is not found");
    }
    const userId = user._id;

    const correctPassword = await bcrypt.compare(user.password, password);
    if (!correctPassword) {
      return res.status(400).json("Password is incorrect");
    }

    const token = jwt.sign({ userId }, process.env.JWT_SECRET);

    return res.status(200).json({ token, message: "User logged in" });
  } catch (error) {
    console.log(error, "Sigin error");
    return res.status(500).json("internal server error");
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.userId;
    const { firstName, lastName, password } = updateBody.safeParse(req.body);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json("user not found");
    }
    const hashPassword = bcrypt.hash(password, 10);
    await User.updateOne({ _id: userId }, firstName, lastName, password);
  } catch (error) {
    console.log("Error while updating the user", error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const filter = req.query.filter || "";
    const users = await User.find({
      $or: [
        {
          firstName: {
            $regex: filter,
          },
        },
        {
          lastName: {
            $regex: filter,
          },
        },
      ],
    });

    res.json({
      user: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (error) {
    console.log("Error while getting the users", error);
  }
};
