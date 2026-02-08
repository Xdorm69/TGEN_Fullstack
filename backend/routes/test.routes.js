import router from "express";
import { getAllTests, getTestById } from "../controllers/test.controller.js";

const testRouter = router();

testRouter.get("/all", getAllTests);
testRouter.get("/:id", getTestById);

export default testRouter;
