const db = require("../../data/db-config");

const findById = async (recipe_id) => {
  const data = await db("recipes as rc")
    .leftJoin("steps as st", "rc.recipeId", "st.recipeId")
    .leftJoin("step_ingredients as st_ing", "st.stepId", "st_ing.stepId")
    .leftJoin("ingredients as ing", "st_ing.ingredientId", "ing.ingredientId")
    .select(
      "rc.recipeId",
      "rc.recipeName",
      "rc.createdAt",
      "st.stepId",
      "st.stepNumber",
      "st.stepInstruction",
      "ing.ingredientId",
      "ing.ingredientName",
      "st_ing.ingredientAmount"
    )
    .where("rc.recipeId", recipe_id);

  if (data.length > 0) {
    let recipeObj = {
      recipeId: recipe_id,
      recipeName: data[0].recipeName,
      createdAt: data[0].createdAt,
      steps: [],
    };

    data.forEach((e) => {
      let step = recipeObj.steps.find((obj) => obj.stepId === e.stepId);
      let ingredient = {
        ingredientId: e.ingredientId,
        ingredientName: e.ingredientName,
        ingredientAmount: e.ingredientAmount,
      };
      if (!step) {
        let newStep = {
          stepId: e.stepId,
          stepNumber: e.stepNumber,
          stepInstruction: e.stepInstruction,
          ingredients: [],
        };
        if (e.ingredientId) {
          newStep.ingredients.push(ingredient);
        }
        recipeObj.steps.push(newStep);
      } else {
        step.ingredients.push(ingredient);
      }
    });
    return recipeObj;
  } else {
    return null;
  }
};

module.exports = {
  findById,
};
