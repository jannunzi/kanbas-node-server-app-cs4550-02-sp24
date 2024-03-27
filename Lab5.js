const assignment = {
  id: 5,
  name: "Lab 5",
  dueDate: "2021-10-15",
  points: 10,
};

let courses = [
  {
    id: 1,
    name: "CSE 110",
    instructor: "Dr. M",
    assignments: [assignment],
  },
  {
    id: 2,
    name: "CSE 120",
    instructor: "Dr. N",
    assignments: [assignment],
  },
  {
    id: 3,
    name: "CSE 130",
    instructor: "Dr. M",
    assignments: [assignment],
  },
];

function Lab5(app) {
  //   app.delete("/a5/courses/:id", (req, res) => {
  //     const id = parseInt(req.params.id);
  //     const course = courses.find((c) => c.id === id);
  //     res.json(course);
  //   });
  app.get("/a5/courses/:id/delete", (req, res) => {
    const id = parseInt(req.params.id);
    courses = courses.filter((c) => c.id !== id);
    res.json(courses);
  });
  app.get("/a5/courses/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const course = courses.find((c) => c.id === id);
    res.json(course);
  });

  app.get("/a5/courses", (req, res) => {
    const instructor = req.query.instructor;
    if (instructor) {
      const cs = courses.filter((c) => c.instructor === instructor);
      res.json(cs);
      return;
    }
    res.json(courses);
  });
  app.get("/a5/assignment/points/:points", (req, res) => {
    assignment.points = req.params.points;
    res.send(assignment);
  });
  app.get("/a5/assignment/name/:name", (req, res) => {
    assignment.name = req.params.name;
    res.send(assignment);
  });
  app.get("/a5/assignment/name", (req, res) => {
    res.send(assignment.name);
  });
  app.get("/a5/assignment", (req, res) => {
    res.json(assignment);
  });
  app.get("/a5/calculator", (req, res) => {
    // res.send(req.query);
    const num1 = parseInt(req.query.num1);
    const num2 = parseInt(req.query.num2);
    const operation = req.query.operation;
    switch (operation) {
      case "add":
        res.send(`The sum of ${num1} and ${num2} is ${num1 + num2}`);
        break;
      case "sub":
        res.send(`The difference of ${num1} and ${num2} is ${num1 - num2}`);
        break;
      default:
        res.send("Invalid operation");
    }
  });
  app.get("/a5/add/:num1/:num2", (req, res) => {
    const num1 = parseInt(req.params.num1);
    const num2 = parseInt(req.params.num2);
    const sum = num1 + num2;
    res.send(`The sum of ${num1} and ${num2} is ${sum}`);
    // res.send(req.params);
  });

  app.get("/a5/welcome", (req, res) => {
    res.send("<h1>This is lab 5</h1>");
  });
}

export default Lab5;
