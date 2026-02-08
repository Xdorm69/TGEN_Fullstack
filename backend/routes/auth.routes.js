import { Router } from "express";
import { loginUser, registerUser, logoutUser } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);
authRouter.post("/logout", logoutUser);

export default authRouter;