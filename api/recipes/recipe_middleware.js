const recipeModel = require("./recipe_model");

const checkId = async (req, res, next) => {
  try {
    let { recipe_id } = req.params;
    const recipe = await recipeModel.findById(recipe_id);
    if (recipe) {
      req.currentRecipe = recipe;
      next();
    } else {
      res.status(404).json({ message: `${recipe_id} id'li tarif bulunamadi` });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkId,
};
