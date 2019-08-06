const express = require("express");

const DeveloperController = require("./controllers/developerController");
const LikeController = require("./controllers/likeController");
const DislikeController = require("./controllers/dislikeController");

const routes = express.Router();

routes.get("/", (request, response) => {
  return response.json({ message: `Hello, ${request.query.name}` });
});

routes.get("/devs", DeveloperController.index);
routes.post("/devs", DeveloperController.store);
routes.post("/devs/:devId/likes", LikeController.store);
routes.post("/devs/:devId/dislikes", DislikeController.store);

module.exports = routes;
