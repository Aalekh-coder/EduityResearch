import { connect } from "mongoose";
import { DB_URL, NODE_ENV } from "../env.js";

if (!DB_URL) {
  throw new Error("Please define the Mongodb_url environment variable inside .env");
}

const connectToDB = async () => {
  try {
    await connect(DB_URL, { dbName: "EqityResearch" });
    console.log(`Connected to DB in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("Error connecting to DB:", error);
    process.exit(1);
  }
};

export default connectToDB;

