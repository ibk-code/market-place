import express from "express";
import { signUp, login } from "./controller";

const authRouter = express.Router();

authRouter.post("/auth/signup", signUp);
authRouter.post("/auth/login", login);

export default authRouter;
