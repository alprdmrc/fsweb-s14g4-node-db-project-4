const router = require("express").Router();
const Recipes = require("./recipe_model");
const mw = require("./recipe_middleware");

router.get("/:recipe_id", mw.checkId, (req, res, next) => {
  try {
    res.json(req.currentRecipe);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
