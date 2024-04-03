// import db from "../Database/index.js";
import * as dao from "./dao.js";

export default function CourseRoutes(app) {
  // CRUD
  const findAllCouses = async (req, res) => {
    // res.json(db.courses);
    const courses = await dao.findAllCourses();
    res.json(courses);
  };
  const findCourseById = async (req, res) => {
    const id = req.params.id;
    // const course = db.courses.find((course) => course._id === id);
    const course = await dao.findCourseById(id);
    res.json(course);
  };
  const createCourse = (req, res) => {
    const course = { ...req.body, _id: Date.now().toString() };
    db.courses.push(course);
    res.json(db.courses);
  };
  const updateCourse = (req, res) => {};
  const deleteCourse = (req, res) => {
    const id = req.params.id;
    db.courses = db.courses.filter((course) => course._id !== id);
    res.json(db.courses);
  };

  app.get("/api/courses", findAllCouses);
  app.get("/api/courses/:id", findCourseById);
  app.post("/api/courses", createCourse);
  app.put("/api/courses/:id", updateCourse);
  app.delete("/api/courses/:id", deleteCourse);
}
