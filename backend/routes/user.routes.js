import { Router } from "express";
import {
  userProfile,
  updateUser,
  deleteUser,
  getMe,
  getUser,
} from "../controllers/user.controller.js";

const userRouter = Router();


userRouter.get("/profile", userProfile);
userRouter.put("/profile", updateUser);
userRouter.delete("/profile", deleteUser);
userRouter.get("/all", getUser);
userRouter.get("/me", getMe);

export default userRouter;
