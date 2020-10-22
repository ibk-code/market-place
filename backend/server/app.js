import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import logger from "morgan";

import dbConnect from "./configuration";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import authRouter from "./auth/route";
import adminRouter from "./market/route";

let app = express();
dotenv.config();
app.use(logger("dev"));
app.use("/uploads", express.static("uploads"));
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

dbConnect();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/", indexRouter);
app.use("/v1", authRouter);
app.use("/v1", adminRouter);
app.use("/users", usersRouter);

export default app;
