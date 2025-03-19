import asyncHandler from "express-async-handler";
import User from "../Models/UserModel.js";
import { compare, genSalt, hash } from "bcryptjs";
import createToken from "../Utils/createToken.js";

export const register = asyncHandler(async (req, res) => {
  const { username, email, password, phoneNo } = req.body;

  if (!username || !email || !password || !phoneNo) {
    throw new Error("Please fill all the input");
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    res.status(400).send("User already exist");
    return;
  }
  const salt = await genSalt(10);
  const hasedPassword = await hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hasedPassword,
    phoneNo,
  });

  try {
    await newUser.save();
    const token = createToken(res, newUser._id);
    res.status(201).json({
      message: "User registered successfully",
      newUser,
      token,
    });
  } catch (error) {
    res.status(400);
    console.log(error, "error while registering the user");
    throw new Error("Invaild user data");
  }
});

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
        const isPasswordVaild = await compare(
            password,
            existUser.password
        )
        if (isPasswordVaild) {
            createToken(res, existUser._id);

            res.status(200).json({
                message: "loggin user successfully",
                existUser
            })
            return
        }
    };
});


export const logout = asyncHandler(async (req,res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout Successfully" });
})

