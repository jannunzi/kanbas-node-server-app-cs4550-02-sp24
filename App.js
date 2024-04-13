// const express = require("express");
import { join } from "path";
import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./Courses/routes.js";
import cors from "cors";
import session from "express-session";
import SessionRoutes from "./SessionRoutes.js";
import UsersRoutes from "./Users/routes.js";
import mongoose from "mongoose";
import LikesRoutes from "./Likes/routes.js";
import AlbumRoutes from "./Napster/albums/routes.js";
import ChatCompletionRoutes from "./openai/chat/routes.js";
import ImageGenerationRoutes from "./openai/images/routes.js";
import VisionRoutes from "./openai/vision/routes.js";

// mongoose.connect("mongodb://localhost:27017/kanbas-sp24-wed");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use("/speech", express.static(join(process.cwd(), "openai/tts")));

Hello(app);
Lab5(app);
CourseRoutes(app);
SessionRoutes(app);
UsersRoutes(app);
LikesRoutes(app);
AlbumRoutes(app);
ChatCompletionRoutes(app);
ImageGenerationRoutes(app);
VisionRoutes(app);

app.listen(4000);
