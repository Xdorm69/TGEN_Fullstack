import dotenv from "dotenv";

dotenv.config();

const {PORT, MONGODB_URI, JWT_SECRET} = process.env;
export default {PORT, MONGODB_URI, JWT_SECRET};