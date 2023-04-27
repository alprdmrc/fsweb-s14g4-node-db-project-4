const router = require("express").Router();
const Recipes = require("./recipe_model");

router.get("/:recipe_id", async (req, res, next) => {
  try {
    const recipe = await Recipes.findById(req.params.recipe_id);
    res.json(recipe);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
