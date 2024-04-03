import db from "../Database/index.js";
import * as dao from "./dao.js";
export default function UsersRoutes(app) {
  app.get("/api/users", async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser || currentUser.role !== "ADMIN") {
      res.status(401).send("Unauthorized");
      return;
    }

    // res.json(db.users);
    const users = await dao.findAllUsers();
    res.json(users);
  });
  app.get("/api/users/:id", async (req, res) => {
    const id = req.params.id;
    // res.json(db.users.find((user) => user._id === id));
    const user = await dao.findUserById(id);
    res.json(user);
  });
  app.post("/api/users", async (req, res) => {
    const user = req.body;
    delete user._id;
    // db.users.push(user);
    const newUser = await dao.createUser(user);
    res.json(newUser);
  });
  app.put("/api/users/:id", async (req, res) => {
    const id = req.params.id;
    const user = req.body;
    delete user._id;

    // db.users = db.users.map((u) => (u._id === id ? user : u));
    // res.send(db.users);
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      req.session["currentUser"] = user;
    }
    const status = await dao.updateUser(id, user);
    res.json(status);
  });
  app.delete("/api/users/:id", async (req, res) => {
    const id = req.params.id;
    // db.users = db.users.filter((u) => u._id !== id);
    const status = await dao.deleteUser(id);
    res.send(status);
  });
  app.post("/api/users/register", async (req, res) => {
    const user = req.body;
    // const existingUser = db.users.find((u) => u.username === user.username);
    const existingUser = await dao.findUserByUsername(user.username);
    if (existingUser) {
      res.status(400).send("Username already exists");
      return;
    }
    // user._id = Date.now().toString();
    // db.users.push(user);
    const newUser = await dao.createUser(user);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  });
  app.post("/api/users/profile", (req, res) => {
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      res.json(currentUser);
    } else {
      res.status(401).send("Unauthorized");
    }
  });
  app.post("/api/users/login", async (req, res) => {
    const credentials = req.body;
    // const existingUser = db.users.find(
    //   (u) =>
    //     u.username === credentials.username &&
    //     u.password === credentials.password
    // );
    const existingUser = await dao.findUserByCredentials(
      credentials.username,
      credentials.password
    );
    if (existingUser) {
      req.session["currentUser"] = existingUser;
      res.json(existingUser);
    } else {
      res.status(401).send("Invalid credentials");
    }
  });
  app.post("/api/users/logout", (req, res) => {
    req.session.destroy();
    res.send("Logged out");
  });
}
