import router from "express";
import { getAllTests, getTestById, getLeaderboard, takeTest, submitTest } from "../controllers/test.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const testRouter = router();

testRouter.get("/all", getAllTests);
testRouter.get("/:id", getTestById);
testRouter.get("/:id/leaderboard", protect, getLeaderboard);
testRouter.get("/:id/taketest", protect, takeTest);
testRouter.post("/:id/submit", protect, submitTest);

export default testRouter;
