import express, { json, urlencoded } from "express";
import { PORT } from "./Config/env.js";
import cookieParser from "cookie-parser";
import connectToDB from "./Config/Database/db.js";
import userRoute from "./Routes/UserRoute.js";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", userRoute)

app.get('/',(req, res)=> {res.send('Hello World welcome to api')})

app.listen(PORT, async () => {
  await connectToDB();
  console.log(`api running on http://localhost:${PORT}`);
});

