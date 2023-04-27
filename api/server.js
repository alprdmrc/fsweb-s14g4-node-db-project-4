const express = require("express");
const recipeRoute = require("./recipes/recipe_router");

const server = express();

server.use(express.json());

server.use("/api/recipes", recipeRoute);

server.get("/", (req, res, next) => {
  res.send("<h1>Merhaba Dunya</h1>");
});

module.exports = server;
