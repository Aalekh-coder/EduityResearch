import jwt from "jsonwebtoken";
import {JWT_SECRET,NODE_ENV} from "../Config/env.js"

const createToken = (res, userId) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "30d",
  });

  //set jwt as an http-only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  return token;
};

export default createToken;
