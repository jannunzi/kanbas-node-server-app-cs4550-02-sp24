// const express = require("express");
import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./Courses/routes.js";
import cors from "cors";
import session from "express-session";
import SessionRoutes from "./SessionRoutes.js";
import UsersRoutes from "./Users/routes.js";

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

Hello(app);
Lab5(app);
CourseRoutes(app);
SessionRoutes(app);
UsersRoutes(app);

app.listen(4000);
