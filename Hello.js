export default function Hello(app) {
  function sayHello(req, res) {
    res.send("Hello World");
  }

  function lifeIsGood(req, res) {
    res.send("Life is good");
  }

  app.get("/", sayHello);
  app.get("/life-is-good", lifeIsGood);
  app.get("two-plus-two", (req, res) => {
    res.send("2 + 2 = 4");
  });
}
