import express from "express";
import morgan from "morgan";
import userRouter from "../routes/user.routes.js";
import connectDB from "../lib/db.js";
import cookieParser from "cookie-parser";
import config from "../lib/config.js";
import authRouter from "../routes/auth.routes.js";
import cors from "cors";
import testRouter from "../routes/test.routes.js";

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors({ origin: config.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tests", testRouter);

app.listen(config.PORT, () => {
  console.log(`Server is running on port http://localhost:${config.PORT}`);
});
