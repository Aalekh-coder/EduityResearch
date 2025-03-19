import { config } from "dotenv";

config({ path: ".env" });

export const {PORT,DB_URL,NODE_ENV,JWT_SECRET} = process.env;
