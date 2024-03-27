import db from "../Database/index.js";
export default function UsersRoutes(app) {
  app.get("/api/users", (req, res) => {
    // const currentUser = req.session["currentUser"];
    // if (currentUser.roles.includes("admin")) {
    res.json(db.users);
    // } else {
    //   res.status(401).send("Unauthorized");
    // }
  });
  app.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    res.json(db.users.find((user) => user._id === id));
  });
  app.post("/api/users", (req, res) => {
    const user = req.body;
    db.users.push(user);
    res.json(db.users);
  });
  app.put("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const user = req.body;
    db.users = db.users.map((u) => (u._id === id ? user : u));
    res.send(db.users);
  });
  app.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
    db.users = db.users.filter((u) => u._id !== id);
    res.send(db.users);
  });
  app.post("/api/users/register", (req, res) => {
    const user = req.body;
    const existingUser = db.users.find((u) => u.username === user.username);
    if (existingUser) {
      res.status(400).send("Username already exists");
      return;
    }
    user._id = Date.now().toString();
    req.session["currentUser"] = user;
    db.users.push(user);
    res.json(db.users);
  });
  app.post("/api/users/profile", (req, res) => {
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      res.json(currentUser);
    } else {
      res.status(401).send("Unauthorized");
    }
  });
  app.post("/api/users/login", (req, res) => {
    const user = req.body;
    const existingUser = db.users.find(
      (u) => u.username === user.username && u.password === user.password
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
