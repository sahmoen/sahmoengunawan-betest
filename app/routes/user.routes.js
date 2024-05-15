module.exports = (app) => {
  const user = require("../controllers/userData.controller");
  const router = require("express").Router();

  router.get("/", user.findAll);
  router.post("/register", user.create);
  router.post("/login", user.login);
  router.get("/:id", user.findJustOne);
  router.put("/:id", user.update);
  router.delete("/:id", user.delete);

  app.use("/user", router);
};
