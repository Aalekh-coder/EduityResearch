import { Router } from "express"
import { register,login, logout } from "../Controllers/UserController.js";

const userRoute = Router();

userRoute.post("/", register);
userRoute.post("/login", login);
userRoute.post("/logout", logout);


export default userRoute